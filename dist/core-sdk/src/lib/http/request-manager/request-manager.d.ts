import { ManagedRequest } from '../model/managed-request';
/**
 * Coordinates execution, tracking, and cancellation of API requests.
 * Multiple API calls can run for the same identifier.
 * @example
 * const manager = RequestManager.getInstance();
 * manager.register('123::GetData', request);
 */
export declare class RequestManager {
    private static instance;
    private readonly logger;
    /** Request tracker lifetime (30 minutes) */
    private static readonly REQUEST_TRACKER_TTL;
    /** Cleanup interval */
    private static readonly CLEANUP_INTERVAL;
    /**
     * Dictionary tracking active requests.
     * Key format: `${requestId}:${executorContext}`.
     */
    private readonly requestTracker;
    /**
     * Timer used to periodically clean expired request tracker entries.
     */
    private cleanupTimer?;
    /**
     * Default Delay time if request is delay only or default type request(both delay and abort)
     */
    private static readonly DEFAULT_DELAY;
    /**
     * Private constructor to enforce the Singleton pattern.
     */
    private constructor();
    /**
     * Returns the singleton instance of RequestManager.
     * @example
      * const manager = RequestManager.getInstance();
      * manager.abortGroup('12345');
    */
    static getInstance(): RequestManager;
    /**
     * Starts periodic cleanup of expired request trackers.
     * @example this.startRequestTrackerCleanup()
     */
    private startRequestTrackerCleanup;
    /**
     * Abort all requests belonging to a specific identifier.
     * @example abortNonActiveRequest('requestid') - Aborts all requests except the most recent one
     */
    abortNonActiveRequest(requestId: string): void;
    /**
     * Executes a managed request and tracks its lifecycle.
     * @example manager.execute()
     */
    execute<T>(requestId: string, request: ManagedRequest, executor: (request: ManagedRequest) => Promise<T>, executorContext: string, delayTime?: number): Promise<T>;
    /**
     * Aborts all active requests.
     * @example manager.abortAll()
     */
    abortAll(): void;
    /**
     * Helper function for creating a delayed execution for a request
      * @typeParam T - The expected response type of the request.
      * @param trackerEntry - The tracker entry associated with the request, used to manage delay state and timer.
      * @param request - The managed request instance containing abort state.
      * @param executor - Function responsible for executing the request.
      * @param key - Unique identifier for logging and debugging.
      * @param delayTime - Optional delay duration in milliseconds before executing the request.
      * @example return this.createDelayedExecution(trackerEntry, request, executor, key, delayTime )
    */
    private createDelayedExecution;
    /**
     * Forcefully removes all tracker entries for a given requestId and clears delay timers.
     * @param requestId - The request identifier to remove from dictionary.
     * @example manager.hardAbort('123')
     */
    hardAbort(requestId: string): void;
}
