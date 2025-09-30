import { RetryOptions, UserInfo } from '@nice-devone/common-sdk';
import { HttpUtilService } from '../../http';
/**
 * Class to connect UI Queue web socket
 */
export declare class UIQueueWsProvider {
    private static singleton;
    private keepAlivePollingWorker;
    private hubConnection;
    private baseUri;
    private hubUrl;
    private agentSession;
    private adminService;
    private receivedEvents;
    private getNextEventAdapter;
    private hearbeatPoller;
    private logger;
    private getkeepAlivePollingisActive;
    protected utilService: HttpUtilService;
    private loader;
    private validationUtils;
    private isUIQDegraded;
    private internetCheckTimer;
    private isCustomKeepAlivePollingTimeoutEnabled;
    private keepAliveTimeout;
    /**
   * constructor which sets agent session instance
   * @example
   * ```
   * UIQueueWsProvider();
   * ```
   */
    constructor();
    /**
     * Starts KeepAlivePolling for specified agent session
     * @param sessionId - sessionid
     * @example
     * ```
     * this.startKeepAlivePolling();
     * ```
     */
    startKeepAlivePolling(sessionId?: string): void;
    /**
     * Calls keepalive api on worker thread
     * @param sessionId - sessionid
     * @example
     * ```
     * this.keepAlivePolling('12345');
     * ```
     */
    private keepAlivePolling;
    /**
     * Use to initializing the user slot worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentKeepAliveWorker();
     * ```
     */
    initAgentKeepAliveWorker(): void;
    /**
     * Method to call the get-next API once (in order to flush the initial renew-state event from the agent state)
     * @param sessionId - sessionid
     * @returns Promise that resolves when the API call is successful
     * @example
     * ```
     * getInitialGetNextEvent('12345');
     * ```
     */
    private getInitialGetNextEvent;
    /**
     * The static method that controls the access to the singleton instance.
     * @example
     * ```
     * const uiQueueWsProvider = UIQueueWsProvider.instance();
     * ```
     */
    static get instance(): UIQueueWsProvider;
    /**
     * Method to get hub url
     * @returns hub url
     * @example
     * ```
     * getHubUrl();
     * ```
     */
    private getHubUrl;
    /**
     * Method to get valid access token
     * @returns  access token
     * @example
     * ```
     * getValidAccessToken();
     * ```
     */
    private getValidAccessToken;
    /**
     * Method to establish connection
     * @param userInfo - user info object
     * @param invokeSnapshot - flag to invoke snapshot request
     * @example
     * ```
     * connectAgent(userInfo, invokeSnapshot)
     * ```
     */
    connectAgent(userInfo: UserInfo, invokeSnapshot?: boolean, sessionId?: string): void;
    /**
     * Method to get new hub connection
     * @param retryOptions  - retry options
     * @returns   hub connection
     * @example
     * ```
     * getNewHubConnection(retryOptions)
     * ```
     */
    getNewHubConnection(userInfo: UserInfo, retryOptions: RetryOptions): Promise<void>;
    /**
     * Method to establish connection
     * @param userInfo - user info object
     * @param invokeSnapshot - flag to invoke snapshot request
     * @example
     * ```
     * establishSocketConnection(userInfo, invokeSnapshot)
     * ```
     */
    establishSocketConnection(userInfo: UserInfo, _invokeSnapshot?: boolean, sessionId?: string): Promise<void>;
    /**
      * Method to add event listeners
      * @param events - recieved events
      * @example
      * ```
      * handleReceivedEvents(events)
      * ```
      */
    private handleReceivedEvents;
    /**
       * Method to add event listeners
       * @param accessToken - accesstoken
       * @param userInfo - user info object
       * @example
       * ```
       * addEventListeners(userInfo)
       * ```
       */
    private addEventListeners;
    /**
         * Method to handle close event
         * @param userInfo - current logged in user information
         * @example
         * ```
         * closeHandler(userInfo)
         * ```
         */
    private closeHandler;
    /**
         * Method to send heartbeat
         * @param agentId - Agent ID
         * @param tenantId - tenant ID
         * @example
         * ```
         * startSocketHeartBeat(agentId, tenantId)
         * ```
        */
    private startSocketHeartBeat;
    /**
     *  Method to check the internet connection and handle the disruption
     * This method will start a timer to check the internet connection every 10 seconds.
     * @example
     * ```
     * this.handleInternetDisruption();
     * ```
     */
    handleInternetDisruption(): void;
    /**
         * Method to start connection
         * @param userInfo - current logged in user information
         * @example
         * ```
         * startConnection(userInfo)
         * ```
         */
    startConnection(userInfo: UserInfo): Promise<void>;
    /**
         * Method to send refresh token
         * @example
         * ```
         * sendRefreshToken()
         * ```
         */
    sendRefreshToken(): void;
    /**
         * Method to invoke snapshot request
         * @example
         * ```
         * invokeUIQEventSnapshotRequest()
         * ```
         */
    invokeUIQEventSnapshotRequest(): void;
    /**
         * Method to disconnectAgent
         * @example
         * ```
         * disconnectConsumerAgent()
         * ```
         */
    disconnectConsumerAgent(): void;
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    private restartWorker;
    /**
     * Used to terminate the polling of get-next api
     * @example -
     * ```
     * this.terminatePolling();
     * ```
     */
    terminatePolling(ifRestart?: boolean): void;
    /**
     * Method to failover to get-next polling
     * @param error - error object
     * @example
     * ```
     * failoverToGetNext(error)
     * ```
     */
    private failoverToGetNext;
}
