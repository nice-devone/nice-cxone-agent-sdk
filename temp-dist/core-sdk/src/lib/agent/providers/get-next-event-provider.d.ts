import { Logger } from '../../../logger/logger';
import { HttpUtilService } from '../../http/http-util-service';
/**
 * GetNextEventProvider to perform getNextEvent polling
 */
export declare class GetNextEventProvider {
    private static singleton;
    private getNextPollingWorker;
    private baseUri;
    logger: Logger;
    protected utilService: HttpUtilService;
    private getNextEventAdapter;
    private agentSession;
    private getNextEventHandler;
    private isRestartGetNextEventEnabled;
    private isCustomGetNextEventPollingTimeoutEnabled;
    private getNextEventTimeout;
    /**
     * constructor which sets agent session instance
     */
    private constructor();
    /**
     * The static method that controls the access to the singleton instance.
     * @example
     * ```
     * const getNextEventProvider = GetNextEventProvider.instance();
     * ```
     */
    static get instance(): GetNextEventProvider;
    /**
     * Starts GetNextEvents for specified agent session
     * @example
     * ```
     * this.startGetNextEvents();
     * ```
     */
    startGetNextEvents(sessionId?: string): void;
    /**
     * Calls get-next-event api on worker thread
     * @example
     * ```
     * this.getNextEvents(retryOptions, '12345');
     * ```
     */
    private getNextEvents;
    /**
     * Captures data returned from get-next-event api
     * @param response - collection of events
     */
    private onPollingExecuted;
    /**
     * Captures data returned from get-next-event api after successful retry
     * @param data - collection of events
     */
    private onPollingRetrySuccess;
    /**
     * @example -This is used to post message to other tab in case of network error
     */
    postNetworkFailure(event: any): void;
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initUtilWorker();
     * ```
     */
    initUtilWorker(): void;
    /**
     * Use to terminate the util worker instance
     * @example
     * ```
     * this.terminateUtilWorker();
     * ```
     */
    terminateUtilWorker(): void;
}
