import { Subject } from 'rxjs';
import { SkillAgentsApiResponse } from '@nice-devone/common-sdk';
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
    private currentUpdatedSince;
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
     * Filter the IDB-cached full list by search string and emit the first page.
     * @param searchString - Agent name filter string (e.g. 'ab')
     * @example -
     * ```
     * searchAgents('ab')
     * ```
     */
    searchAgents(searchString: string): Promise<void>;
    /**
     * Expand the visible page by DEFAULT_PAGE_SIZE, reading the next slice from IDB.
     * @example -
     * ```
     * startPolling(skillId);  // shows first 25
     * loadMore();             // shows first 50
     * ```
     */
    loadMore(): Promise<void>;
    /**
     * Stop the current polling worker, reset all state, and clear the IDB cache so the next
     * drill-down starts fresh
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
     * Handles the worker response: fetches the full active list, merges with any existing IDB
     * cache (so polling updates state in-place), writes the full list back to IDB
     * @param skillAgentsData - The `Map<id, {status, value}>` posted by the worker
     */
    private handleSkillAgentsApiResp;
    /**
     * Merges fresh API assignments into the existing IDB list so polling updates agent state
     * @param incoming - Fresh enriched assignments from the latest API poll
     * @returns Merged list: all existing agents retained, changed agents updated in-place, new agents appended
     */
    private mergeWithExistingIdb;
    /**
     * Filters an assignment list by agent name search string (case-insensitive).
     * Returns the full list unchanged when searchString is empty.
     */
    private applySearchFilter;
    /**
     * Reads the full skill-agent list from IDB.
     * @returns The stored list, or null if nothing is cached yet.
     */
    private readFromIdb;
    /**
     * Persists the full skill-agent list to IDB.
     */
    private writeToIdb;
    /**
     * Removes the IDB cache entry. Called on stopPolling so the next drill-down
     * starts fresh rather than showing a stale list from a previous skill.
     */
    private clearIdb;
    /**
     * Reads the IDB agent list, attaches the full `AgentStateResponse` record as `idbAgentData`
     * on each matching assignment, and re-orders assignments to match the IDB sort order
     * (state-based, then alphabetical). Assignments not found in IDB retain their relative order at the end.
     * @param assignments - Active skill-agent assignments from the API
     * @returns Assignments enriched with `idbAgentData` and IDB-ordered
     */
    private syncSkillAgentsWithIdbAgentData;
}
