import { __awaiter } from "tslib";
import { RequestControlMode } from '@nice-devone/common-sdk';
import { Logger } from '../../../logger/logger';
/**
 * Coordinates execution, tracking, and cancellation of API requests.
 * Multiple API calls can run for the same identifier.
 * @example
 * const manager = RequestManager.getInstance();
 * manager.register('123::GetData', request);
 */
export class RequestManager {
    /**
     * Private constructor to enforce the Singleton pattern.
     */
    constructor() {
        /**
         * Dictionary tracking active requests.
         * Key format: `${requestId}:${executorContext}`.
         */
        this.requestTracker = {};
        this.logger = new Logger('SDK', 'RequestManager');
    }
    /**
     * Returns the singleton instance of RequestManager.
     * @example
      * const manager = RequestManager.getInstance();
      * manager.abortGroup('12345');
    */
    static getInstance() {
        if (!RequestManager.instance) {
            RequestManager.instance = new RequestManager();
        }
        return RequestManager.instance;
    }
    /**
     * Starts periodic cleanup of expired request trackers.
     * @example this.startRequestTrackerCleanup()
     */
    startRequestTrackerCleanup() {
        if (this.cleanupTimer)
            return;
        this.cleanupTimer = setInterval(() => {
            try {
                const now = Date.now();
                Object.entries(this.requestTracker).forEach(([key, entry]) => {
                    if (now - entry.firstSeen >= RequestManager.REQUEST_TRACKER_TTL) {
                        this.logger.debug('cleanup', `Removing expired request tracker → ${key}`);
                        if (entry.delayTimer) {
                            clearTimeout(entry.delayTimer);
                            this.logger.debug('delayTimer', `Cleared during cleanup → ${key}`);
                            entry.delayTimer = undefined;
                        }
                        delete this.requestTracker[key];
                    }
                });
                if (Object.keys(this.requestTracker).length === 0 && this.cleanupTimer) {
                    clearInterval(this.cleanupTimer);
                    this.cleanupTimer = undefined;
                    this.logger.debug('cleanup', 'No active request trackers. Cleanup timer stopped.');
                }
            }
            catch (error) {
                this.logger.error('cleanup', 'Error occurred during request tracker cleanup' + error);
            }
        }, RequestManager.CLEANUP_INTERVAL);
        this.logger.debug('cleanupTimer', 'Cleanup timer started');
    }
    /**
     * Abort all requests belonging to a specific identifier.
     * @example abortNonActiveRequest('requestid') - Aborts all requests except the most recent one
     */
    abortNonActiveRequest(requestId) {
        var _a;
        try {
            for (const [key, requestData] of Object.entries(this.requestTracker)) {
                const [id] = key.split(':');
                //Current active id
                if (id === requestId)
                    continue;
                const request = requestData.request;
                //Increment on switch
                requestData.seenCount++;
                const type = (_a = request.requestType) !== null && _a !== void 0 ? _a : RequestControlMode.DELAY_AND_ABORT;
                // Only abort case
                if (type === RequestControlMode.ONLY_ABORT) {
                    if (requestData.seenCount > 1 && !request.aborted) {
                        request.abort(RequestControlMode.ONLY_ABORT);
                        this.logger.debug('abortNonActiveRequest', `Aborted (ONLY_ABORT) → ${key}`);
                    }
                    continue;
                }
                if (type === RequestControlMode.DELAY_AND_ABORT || type === RequestControlMode.ONLY_DELAY) {
                    if (requestData.seenCount === 1) {
                        this.logger.debug('abortNonActiveRequest', `Protected first delay → ${key}`);
                        continue;
                    }
                    //  Abort only if pending or active
                    if (!request.aborted) {
                        request.abort(type);
                        //  Clear delay timer safely
                        if (requestData.delayTimer) {
                            clearTimeout(requestData.delayTimer);
                            requestData.delayTimer = undefined;
                        }
                        requestData.isDelayed = true;
                        this.logger.debug('abortNonActiveRequest', `Aborted (${type}) → ${key}`);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error('abortNonActiveRequest', `Error while aborting requests for requestId: ${requestId}`);
            throw error;
        }
    }
    /**
     * Executes a managed request and tracks its lifecycle.
     * @example manager.execute()
     */
    execute(requestId, request, executor, executorContext, delayTime) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${requestId}:${executorContext}`;
            let trackerEntry = this.requestTracker[key];
            if (!trackerEntry) {
                trackerEntry = {
                    firstSeen: Date.now(),
                    seenCount: 0,
                    request,
                    isDelayed: false,
                };
                this.requestTracker[key] = trackerEntry;
                this.logger.debug('execute', `Tracker created → key: ${key}`);
                this.startRequestTrackerCleanup();
            }
            trackerEntry.request = request;
            const type = (_a = request.requestType) !== null && _a !== void 0 ? _a : RequestControlMode.DELAY_AND_ABORT;
            const seen = trackerEntry.seenCount;
            try {
                // First request - Execute immediately
                if (seen === 0) {
                    this.logger.debug('execute', `First call → ${key}`);
                    return executor(request);
                }
                //Only abort
                if (type === RequestControlMode.ONLY_ABORT) {
                    this.logger.debug('execute', `Abort requestType → ${key}`);
                    return executor(request);
                }
                //Only delay or BOTH
                if (type === RequestControlMode.ONLY_DELAY || type === RequestControlMode.DELAY_AND_ABORT) {
                    trackerEntry.isDelayed = false;
                    request.isDelayed = false;
                    if (trackerEntry.delayTimer) {
                        clearTimeout(trackerEntry.delayTimer);
                        this.logger.debug('delayTimer', `Cleared existing delay (execute) → ${key}`);
                    }
                    return this.createDelayedExecution(trackerEntry, request, executor, key, delayTime);
                }
                return executor(request);
            }
            catch (error) {
                this.logger.error('execute', `Execution failed → ${key}`);
                throw error;
            }
        });
    }
    /**
     * Aborts all active requests.
     * @example manager.abortAll()
     */
    abortAll() {
        try {
            for (const [key, entry] of Object.entries(this.requestTracker)) {
                const request = entry.request;
                //Abort active request
                if (!request.aborted) {
                    request.abort('abort_all');
                    this.logger.debug('abortAll', `Aborted → ${key} (requestId: ${request.id})`);
                }
                // Clear delay timer if any 
                if (entry.delayTimer) {
                    clearTimeout(entry.delayTimer);
                    this.logger.debug('delayTimer', `Cleared during abortAll → ${key}`);
                    entry.delayTimer = undefined;
                }
                //delete tracker entry
                entry.isDelayed = false;
                //Remove tracker entry
                delete this.requestTracker[key];
            }
            this.logger.debug('abortAll', 'All tracked requests cleared');
        }
        catch (error) {
            this.logger.error('abortAll', `Error occurred while aborting all requests → error: ${error}`);
        }
    }
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
    createDelayedExecution(trackerEntry, request, executor, key, delayTime) {
        return new Promise((resolve, reject) => {
            const effectiveDelay = delayTime !== null && delayTime !== void 0 ? delayTime : RequestManager.DEFAULT_DELAY;
            this.logger.debug('delayTimer', `Scheduled delay → ${key}, delay: ${effectiveDelay}ms`);
            trackerEntry.delayTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                //Prevent executing requests that were aborted during the delay window
                if (request.aborted) {
                    this.logger.debug('execute', `Skipped aborted → ${key}`);
                    this.logger.debug('delayTimer', `Cleared after abort → ${key}`);
                    trackerEntry.delayTimer = undefined;
                    request.isDelayed = false;
                    return reject('Aborted before execution due to request cancellation during delay');
                }
                try {
                    const result = yield executor(request);
                    this.logger.debug('execute', `Delayed success → ${key}`);
                    this.logger.debug('delayTimer', `Cleared after success → ${key}`);
                    request.isDelayed = true;
                    trackerEntry.delayTimer = undefined;
                    resolve(result);
                }
                catch (error) {
                    this.logger.error('execute', `Failed → ${key}`);
                    this.logger.debug('delayTimer', `Cleared after failure → ${key}`);
                    trackerEntry.delayTimer = undefined;
                    request.isDelayed = false;
                    reject(error);
                }
            }), effectiveDelay);
        });
    }
    /**
     * Forcefully removes all tracker entries for a given requestId and clears delay timers.
     * @param requestId - The request identifier to remove from dictionary.
     * @example manager.hardAbort('123')
     */
    hardAbort(requestId) {
        try {
            for (const [key, entry] of Object.entries(this.requestTracker)) {
                const [id] = key.split(':');
                if (id !== requestId)
                    continue;
                // Clear delay timer if exists
                if (entry.delayTimer) {
                    clearTimeout(entry.delayTimer);
                    this.logger.debug('delayTimer', `Cleared during hardAbort → ${key}`);
                    entry.delayTimer = undefined;
                }
                // Remove tracker entry
                delete this.requestTracker[key];
                this.logger.debug('hardAbort', `Tracker entry removed → ${key}`);
            }
        }
        catch (error) {
            this.logger.error('hardAbort', `Error while clearing request from list → requestId: ${requestId}`);
            throw error;
        }
    }
}
/** Request tracker lifetime (30 minutes) */
RequestManager.REQUEST_TRACKER_TTL = 30 * 60 * 1000;
/** Cleanup interval */
RequestManager.CLEANUP_INTERVAL = 5 * 60 * 1000;
/**
 * Default Delay time if request is delay only or default type request(both delay and abort)
 */
RequestManager.DEFAULT_DELAY = 3000;
//# sourceMappingURL=request-manager.js.map