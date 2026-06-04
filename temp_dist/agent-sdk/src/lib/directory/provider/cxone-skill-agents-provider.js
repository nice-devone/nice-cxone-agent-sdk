import { __awaiter } from "tslib";
import { Subject } from 'rxjs';
import { ACDSessionManager, ApiUriConstants, HttpUtilService, LoadWorker, Logger, UrlUtilsService, dbInstance, IndexDBStoreNames, } from '@nice-devone/core-sdk';
import { DirectoryEntities, MessageBus, MessageType } from '@nice-devone/common-sdk';
import { AuthStatus } from '@nice-devone/auth-sdk';
import { SkillApiParser } from '../util/skill-api-parser';
import { FeatureToggleService } from '../../feature-toggle/feature-toggle-services';
const DEFAULT_PAGE_SIZE = 25;
const SKILL_AGENTS_WORKER_ID = 'skill-agents';
/**
 * Provider that polls the CMA skill-agents API via a shared `util-worker` web worker and emits
 * paged results via `skillAgentsEvent`.
 * Using the worker offloads the HTTP fetch and JSON parsing off the main thread, preventing
 * UI jank when the assigned-agents list is large (hundreds or thousands of agents).
 * @example
 * ```
 * provider.startPolling(skillId);
 * provider.skillAgentsEvent.subscribe((response) => { ... });
 * provider.stopPolling();
 * ```
 */
export class CXoneSkillAgentsProvider {
    /**
     * Creates the provider and wires up a `REFRESH_TOKEN_SUCCESS` listener so the
     * worker is restarted whenever the auth token is refreshed.
     * @example -- const provider = new CXoneSkillAgentsProvider();
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneSkillAgentsProvider');
        /** Subject that emits the active agent list after each poll cycle. */
        this.skillAgentsEvent = new Subject();
        this.currentPageSize = DEFAULT_PAGE_SIZE;
        this.currentPollingInterval = 5000;
        this.currentSearchString = '';
        this.acdSession = ACDSessionManager.instance;
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.apiParser = new SkillApiParser();
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => {
            this.restartWorker();
            const msg = {
                type: MessageType.RESTART_SKILL_AGENT_POLLING,
            };
            MessageBus.instance.postResponse(msg);
        });
    }
    /**
     * Start polling for agents assigned to the given skill.
     * Any currently running poll (and its worker) is stopped first.
     * Page size starts at DEFAULT_PAGE_SIZE and only grows when `loadMore()` is called.
     * @param skillId - The skill identifier to poll agents for
     * @param pollingInterval - Milliseconds between polls (default 5000)
     * @example -
     * ```
     * startPolling(skillId, 5000)
     * ```
     */
    startPolling(skillId, pollingInterval = 5000) {
        this.stopPolling();
        this.currentSkillId = skillId;
        this.currentPageSize = DEFAULT_PAGE_SIZE;
        this.currentPollingInterval = pollingInterval;
        this.startWorkerPolling(skillId, pollingInterval);
    }
    /**
     * Restart polling with a new search string, resetting the page size to DEFAULT_PAGE_SIZE.
     * @param searchString - Agent name filter string (e.g. 'ab')
     * @example -
     * ```
     * searchAgents('ab')
     * ```
     */
    searchAgents(searchString) {
        if (this.currentSkillId === undefined)
            return;
        this.currentSearchString = searchString;
        this.currentPageSize = DEFAULT_PAGE_SIZE;
        this.totalRecords = undefined;
        this.terminateWorker();
        this.startWorkerPolling(this.currentSkillId, this.currentPollingInterval);
    }
    /**
     * Expand the page window by DEFAULT_PAGE_SIZE and restart polling with the new page size.
     * No-op if there is no active polling session or all records are already loaded.
     * @example -
     * ```
     * startPolling(skillId);  // top=25
     * loadMore();             // top=50  no-op if totalRecords <= 50; polling keeps running at top=50
     * ```
     */
    loadMore() {
        if (this.currentSkillId === undefined)
            return;
        if (this.totalRecords !== undefined && this.currentPageSize >= this.totalRecords)
            return;
        this.currentPageSize += DEFAULT_PAGE_SIZE;
    }
    /**
     * Stop the current polling worker and reset all state.
     * @example -
     * ```
     * stopPolling()
     * ```
     */
    stopPolling() {
        this.terminateWorker();
        this.currentSkillId = undefined;
        this.currentPageSize = DEFAULT_PAGE_SIZE;
        this.currentSearchString = '';
        this.totalRecords = undefined;
    }
    /**
     * Initialises the worker, fires an immediate request, then schedules a repeating poll.
     * @param skillId - Skill identifier to poll
     * @param pollingInterval - Poll interval in milliseconds
     * @example -
     * ```
     * this.startWorkerPolling(skillId, 5000)
     * ```
     */
    startWorkerPolling(skillId, pollingInterval) {
        this.initWorker();
        this.sendWorkerRequest(skillId);
        // Use a manual interval instead of the worker's built-in isPolling — the API requires
        // updatedSince=epoch on every request, which the worker would not preserve across ticks.
        // Cleared in terminateWorker().
        this.pollingTimer = setInterval(() => {
            this.sendWorkerRequest(skillId);
        }, pollingInterval);
    }
    /**
     * Sends a single (non-repeating) `directory-polling` message to the live worker.
     * Always re-builds the request params from scratch so `updatedSince` is fixed at epoch.
     * @param skillId - Skill identifier to fetch agents for
     * @example -
     * ```
     * this.sendWorkerRequest(skillId)
     * ```
     */
    sendWorkerRequest(skillId) {
        const requestParams = this.buildRequestParams(skillId);
        if (!requestParams || !this.pollingWorker)
            return;
        this.pollingWorker.postMessage({
            type: 'directory-polling',
            requestParams,
            pollingOptions: { isPolling: false },
            retryOptions: { maxRetryAttempts: 0, retryInterval: 0 },
        });
    }
    /**
     * Creates a new `util-worker` web worker and wires its `onmessage` / `onerror` handlers.
     * Does not send any messages — call `sendWorkerRequest` after this to trigger the first fetch.
     * @example -
     * ```
     * this.initWorker()
     * ```
     */
    initWorker() {
        const loader = new LoadWorker();
        this.pollingWorker = loader.getWorker('util-worker', 'ccf-skill-agents-polling-worker');
        this.pollingWorker.onmessage = (response) => {
            this.handleSkillAgentsApiResp(response.data);
        };
        this.pollingWorker.onerror = (error) => {
            this.logger.error('CXoneSkillAgentsProvider', `Worker error: ${error.message}`);
        };
    }
    /**
     * Restarts the worker when a new auth token is received from the refresh-token flow.
     * @example -
     * ```
     * this.restartWorker()
     * ```
     */
    restartWorker() {
        if (this.currentSkillId !== undefined) {
            this.terminateWorker();
            this.startWorkerPolling(this.currentSkillId, this.currentPollingInterval);
        }
    }
    /**
     * Clears the main-thread polling timer and terminates the web worker, resetting both references.
     * Safe to call when no polling is active.
     * @example -
     * ```
     * this.terminateWorker()
     * ```
     */
    terminateWorker() {
        var _a;
        if (this.pollingTimer !== undefined) {
            clearInterval(this.pollingTimer);
            this.pollingTimer = undefined;
        }
        (_a = this.pollingWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.pollingWorker = undefined;
    }
    /**
     * Builds the `requestParams` array expected by the `util-worker` `directory-polling` handler.
     * Constructs the skill-agents API URL with all required query params and the auth header.
     * @param skillId - Skill identifier for the query
     * @returns Array of one request descriptor, or null on failure
     * @example -
     * ```
     * this.buildRequestParams(skillId)
     * ```
     */
    buildRequestParams(skillId) {
        try {
            const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
            const cxOneConfig = this.acdSession.cxOneConfig;
            const baseUri = isTenantSegmentationEnabled ? cxOneConfig.apiFacadeBaseUri : cxOneConfig.acdApiBaseUri;
            const apiUri = isTenantSegmentationEnabled ? ApiUriConstants.GET_SKILL_AGENTS_URI_TS : ApiUriConstants.GET_SKILL_AGENTS_URI;
            const queryParams = Object.assign({ skills: JSON.stringify([{ skillId }]), skip: 0, top: this.currentPageSize, updatedSince: new Date(0).toISOString(), fields: 'agentId,agentName,isActive,lastUpdateTime,mediaType,mediaTypeName,skillId,skillName', orderby: 'agentName' }, (this.currentSearchString ? { searchString: this.currentSearchString } : {}));
            const url = this.urlUtilsService.appendQueryString(baseUri + apiUri, queryParams);
            const request = this.utilService.initHeader(this.acdSession.accessToken);
            return [{ url, request, id: SKILL_AGENTS_WORKER_ID }];
        }
        catch (error) {
            this.logger.error('CXoneSkillAgentsProvider', `buildRequestParams error: ${String(error)}`);
            return null;
        }
    }
    /**
     * Handles the worker response: parses assignments, filters to active, enriches from IDB, then emits via `skillAgentsEvent`.
     * @param skillAgentsData - The `Map<id, {status, value}>` posted by the worker
     */
    handleSkillAgentsApiResp(skillAgentsData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = skillAgentsData === null || skillAgentsData === void 0 ? void 0 : skillAgentsData.get(SKILL_AGENTS_WORKER_ID);
                if ((result === null || result === void 0 ? void 0 : result.status) !== 'fulfilled')
                    return;
                // 204 No Content — API found no agents for this search, emits empty result
                if (!result.value) {
                    this.totalRecords = 0;
                    this.skillAgentsEvent.next({ totalRecords: 0, agentSkillAssignments: [], shouldFetchMoreAgents: false });
                    return;
                }
                const parsed = this.apiParser.parseSkillAgentsResponse({ data: result.value });
                this.totalRecords = parsed.totalRecords;
                const activeAssignments = parsed.agentSkillAssignments.filter((assignment) => assignment.isActive);
                // Do not show the logged-in agent in the drill-down list.
                const loggedInAgentId = (_a = this.acdSession.userInfo) === null || _a === void 0 ? void 0 : _a.icAgentId;
                const visibleAssignments = loggedInAgentId
                    ? activeAssignments.filter((assignment) => { var _a; return ((_a = assignment.agentId) === null || _a === void 0 ? void 0 : _a.toString()) !== loggedInAgentId; })
                    : activeAssignments;
                const updatedSkillAgents = yield this.syncSkillAgentsWithIdbAgentData(visibleAssignments);
                this.skillAgentsEvent.next({
                    totalRecords: parsed.totalRecords,
                    agentSkillAssignments: updatedSkillAgents,
                    shouldFetchMoreAgents: this.currentPageSize < parsed.totalRecords,
                });
            }
            catch (error) {
                this.logger.error('CXoneSkillAgentsProvider', `handleSkillAgentsApiResp error: ${String(error)}`);
            }
        });
    }
    /**
     * Reads the IDB agent list, attaches the full `AgentStateResponse` record as `idbAgentData`
     * on each matching assignment, and re-orders assignments to match the IDB sort order
     * (state-based, then alphabetical). Assignments not found in IDB retain their relative order at the end.
     * @param assignments - Active skill-agent assignments from the API
     * @returns Assignments enriched with `idbAgentData` and IDB-ordered
     * @example -
     * ```
     * this.syncSkillAgentsWithIdbAgentData(activeAssignments)
     * ```
     */
    syncSkillAgentsWithIdbAgentData(assignments) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield dbInstance();
                const idbAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
                if (!idbAgentList.length)
                    return assignments;
                const agentMap = new Map(idbAgentList === null || idbAgentList === void 0 ? void 0 : idbAgentList.map((idbAgent) => [idbAgent === null || idbAgent === void 0 ? void 0 : idbAgent.agentId, idbAgent]));
                const agentPositionMap = new Map(idbAgentList === null || idbAgentList === void 0 ? void 0 : idbAgentList.map((idbAgent, index) => [idbAgent === null || idbAgent === void 0 ? void 0 : idbAgent.agentId, index]));
                const agentInfoUpdatedWithDb = assignments === null || assignments === void 0 ? void 0 : assignments.map((assignment) => {
                    const idbAgent = agentMap === null || agentMap === void 0 ? void 0 : agentMap.get(assignment === null || assignment === void 0 ? void 0 : assignment.agentId);
                    return idbAgent ? Object.assign(Object.assign({}, assignment), { idbAgentData: idbAgent }) : assignment;
                });
                // Re-order assignments to match the IDB position (state-priority then alphabetical),
                // Agents not found in IDB are pushed to the end via MAX_SAFE_INTEGER fallback.
                return [...agentInfoUpdatedWithDb].sort((assignmentA, assignmentB) => {
                    var _a, _b;
                    const posA = (_a = agentPositionMap.get(assignmentA.agentId)) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
                    const posB = (_b = agentPositionMap.get(assignmentB.agentId)) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER;
                    return posA - posB;
                });
            }
            catch (error) {
                this.logger.error('CXoneSkillAgentsProvider', `syncSkillAgentsWithIdbAgentData error: ${String(error)}`);
                return assignments;
            }
        });
    }
}
//# sourceMappingURL=cxone-skill-agents-provider.js.map