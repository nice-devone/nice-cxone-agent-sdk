import { Subject } from 'rxjs';
import { SkillAgentsApiResponse } from '../interface/skill-agent-assignment';
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
export declare class CXoneSkillAgentsProvider {
    private readonly logger;
    /** Subject that emits the active agent list after each poll cycle. */
    skillAgentsEvent: Subject<SkillAgentsApiResponse>;
    /** The running web worker instance (util-worker). */
    pollingWorker: any;
    /** Timer handle for the main-thread polling interval (worker fires single-shot per tick). */
    private pollingTimer;
    private currentSkillId;
    private currentPageSize;
    private currentPollingInterval;
    private currentSearchString;
    private totalRecords;
    private readonly acdSession;
    private readonly utilService;
    private readonly urlUtilsService;
    private readonly apiParser;
    /**
     * Creates the provider and wires up a `REFRESH_TOKEN_SUCCESS` listener so the
     * worker is restarted whenever the auth token is refreshed.
     * @example -- const provider = new CXoneSkillAgentsProvider();
     */
    constructor();
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
    startPolling(skillId: number, pollingInterval?: number): void;
    /**
     * Restart polling with a new search string, resetting the page size to DEFAULT_PAGE_SIZE.
     * @param searchString - Agent name filter string (e.g. 'ab')
     * @example -
     * ```
     * searchAgents('ab')
     * ```
     */
    searchAgents(searchString: string): void;
    /**
     * Expand the page window by DEFAULT_PAGE_SIZE and restart polling with the new page size.
     * No-op if there is no active polling session or all records are already loaded.
     * @example -
     * ```
     * startPolling(skillId);  // top=25
     * loadMore();             // top=50  no-op if totalRecords <= 50; polling keeps running at top=50
     * ```
     */
    loadMore(): void;
    /**
     * Stop the current polling worker and reset all state.
     * @example -
     * ```
     * stopPolling()
     * ```
     */
    stopPolling(): void;
    /**
     * Initialises the worker, fires an immediate request, then schedules a repeating poll.
     * @param skillId - Skill identifier to poll
     * @param pollingInterval - Poll interval in milliseconds
     * @example -
     * ```
     * this.startWorkerPolling(skillId, 5000)
     * ```
     */
    private startWorkerPolling;
    /**
     * Sends a single (non-repeating) `directory-polling` message to the live worker.
     * Always re-builds the request params from scratch so `updatedSince` is fixed at epoch.
     * @param skillId - Skill identifier to fetch agents for
     * @example -
     * ```
     * this.sendWorkerRequest(skillId)
     * ```
     */
    private sendWorkerRequest;
    /**
     * Creates a new `util-worker` web worker and wires its `onmessage` / `onerror` handlers.
     * Does not send any messages — call `sendWorkerRequest` after this to trigger the first fetch.
     * @example -
     * ```
     * this.initWorker()
     * ```
     */
    initWorker(): void;
    /**
     * Restarts the worker when a new auth token is received from the refresh-token flow.
     * @example -
     * ```
     * this.restartWorker()
     * ```
     */
    restartWorker(): void;
    /**
     * Clears the main-thread polling timer and terminates the web worker, resetting both references.
     * Safe to call when no polling is active.
     * @example -
     * ```
     * this.terminateWorker()
     * ```
     */
    private terminateWorker;
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
    private buildRequestParams;
    /**
     * Handles the worker response: parses assignments, filters to active, enriches from IDB, then emits via `skillAgentsEvent`.
     * @param skillAgentsData - The `Map<id, {status, value}>` posted by the worker
     */
    private handleSkillAgentsApiResp;
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
    private syncSkillAgentsWithIdbAgentData;
}
