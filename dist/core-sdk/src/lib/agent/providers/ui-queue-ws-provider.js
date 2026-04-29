import { __awaiter } from "tslib";
import { DefaultHttpClient, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { AdminService } from '../../admin';
import { CXoneGetNextAdapter } from '../../adapter/cxone-get-next-adapter';
import { CXoneLeaderElector, CXoneSdkError, CXoneSdkErrorType, MessageBus, MessageType, RetryOptions } from '@nice-devone/common-sdk';
import { Logger } from '../../../logger/logger';
import { LoadWorker } from '../../worker/load-worker';
import { ACDSessionManager } from '../session/acd-session-manager';
import { ApiUriConstants } from '../../../constants/api-uri-constants';
import { HttpClient, HttpUtilService } from '../../http';
import { UIQEventType } from '../../../enum/uiq-event-type';
import { ValidationUtils } from '../../../util/validation-utils';
import { FeatureToggleService } from '../../../util/feature-toggle-services';
/** Custom HttpClient to handle uiq websocket connection */
class CustomHttpClient extends DefaultHttpClient {
    /**
     * constructor to initialise the data members for CustomHttpClient
     * @param accessToken - accessToken
     * @example
     * ```
     * new CustomHttpClient('accessToken')
     * ```
     */
    constructor(accessToken) {
        super(console);
        this.accessToken = accessToken;
    }
    /**
     * Method to override send method of DefaultHttpClient
     * @param request - http request object
     * @example
     * ```
     * send(request)
     * ```
     */
    send(request) {
        request.headers = Object.assign(Object.assign({}, request.headers), { 'Authorization': `Bearer ${this.accessToken}`, 'IsMaxAgent': 'True' });
        return super.send(request);
    }
}
/**
 * Class to connect UI Queue web socket
 */
export class UIQueueWsProvider {
    /**
   * constructor which sets agent session instance
   * @example
   * ```
   * UIQueueWsProvider();
   * ```
   */
    constructor() {
        this.baseUri = '';
        this.hubUrl = '';
        this.receivedEvents = [];
        this.getNextEventAdapter = new CXoneGetNextAdapter();
        this.missedPongCount = 0;
        this.MAX_MISSED_PONGS = 3;
        this.logger = new Logger('uiQueueWsProvider', 'UIQueueWsProvider');
        this.getkeepAlivePollingisActive = false;
        this.utilService = new HttpUtilService();
        this.loader = new LoadWorker();
        this.validationUtils = new ValidationUtils();
        this.isUIQDegraded = false;
        this.internetCheckTimer = undefined; // to store the internet check timer
        this.isCustomKeepAlivePollingTimeoutEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-get-next-events-timeout-update-AW-45121" /* FeatureToggles.GET_NEXT_EVENT_POLLING_TIMEOUT_FEATURE_TOGGLE */);
        this.isAutoLogoutEnabled = FeatureToggleService.instance.getFeatureToggleSync("utility-cxa-cleanup-inactive-agent-sessions-AW-52454" /* FeatureToggles.CLEANUP_OF_INACTIVE_AGENT_SESSIONS_FEATURE_TOGGLE */);
        this.keepAliveTimeout = this.isCustomKeepAlivePollingTimeoutEnabled ? 15000 : 120000;
        this.isConnectionInProgress = false; // Flag to track connection attempt in progress
        this.listenersAttached = false; // Flag to prevent duplicate onreconnected/onclose registrations
        this.agentId = '';
        this.tenantId = '';
        this.agentSession = ACDSessionManager.instance;
        this.adminService = AdminService.instance;
        window.addEventListener('RefreshTokenSuccess', () => {
            this.restartWorker();
            this.sendRefreshToken();
        });
    }
    /**
     * Starts KeepAlivePolling for specified agent session
     * @param sessionId - sessionid
     * @example
     * ```
     * this.startKeepAlivePolling();
     * ```
     */
    startKeepAlivePolling(sessionId) {
        this.logger.debug('startKeepAlivePolling', `startKeepAlivePolling in UIQueueWsProvider ${this.agentContext}`);
        this.baseUri = this.agentSession.cxOneConfig.apiFacadeBaseUri;
        if (sessionId) {
            if (this.keepAlivePollingWorker)
                this.terminatePolling();
            this.keepAlivePolling(sessionId);
        }
        if (!this.keepAlivePollingWorker)
            this.keepAlivePolling();
    }
    /**
     * Calls keepalive api on worker thread
     * @param sessionId - sessionid
     * @example
     * ```
     * this.keepAlivePolling('12345');
     * ```
     */
    keepAlivePolling(sessionId) {
        var _a, _b;
        if (!sessionId) {
            sessionId = this.agentSession.getSessionId();
        }
        if (!sessionId) {
            return;
        }
        const keepAlivePath = ApiUriConstants.KEEP_ALIVE_URI.replace('{sessionId}', sessionId);
        const authToken = this.agentSession.accessToken;
        const endpoint = this.baseUri + keepAlivePath;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        const pollingOptions = { isPolling: false, pollingInterval: this.keepAliveTimeout };
        if (!this.keepAlivePollingWorker) {
            this.initAgentKeepAliveWorker();
            this.keepAlivePollingWorker.onmessage = (response) => {
                var _a, _b;
                if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.type) === 'retry') {
                    this.logger.debug('keepAlivePolling', `Polling called successfully ${this.agentContext}`);
                }
                if (((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.status) === 302) {
                    this.isUIQDegraded = true;
                    this.disconnectConsumerAgent();
                    this.failoverToGetNext(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Keep alive API failed with 302 status'));
                    this.logger.error('keepAlivePolling', `Switching to get-next polling as keep alive API returned 302 status ${this.agentContext}`);
                    this.logger.debug('keepAlivePolling', `Switching to get-next polling as keep alive API returned 302 status ${this.agentContext}`);
                }
            };
        }
        (_a = this.keepAlivePollingWorker) === null || _a === void 0 ? void 0 : _a.postMessage({ type: 'startAgentKeepAlivePolling', requestParams: { url: endpoint, request: reqInit, method: 'POST' }, pollingOptions, isLeader: (_b = CXoneLeaderElector.instance) === null || _b === void 0 ? void 0 : _b.isLeader });
        this.getkeepAlivePollingisActive = true;
    }
    /**
     * Use to initializing the user slot worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentKeepAliveWorker();
     * ```
     */
    initAgentKeepAliveWorker() {
        this.keepAlivePollingWorker = this.loader.getWorker('user-slot-worker', 'ccf-agent-keep-alive-polling-worker');
    }
    /**
     * Method to call the get-next API once (in order to flush the initial renew-state event from the agent state)
     * @param sessionId - sessionid
     * @returns Promise that resolves when the API call is successful
     * @example
     * ```
     * getInitialGetNextEvent('12345');
     * ```
     */
    getInitialGetNextEvent(sessionId) {
        return new Promise((resolve, reject) => {
            if (!sessionId) {
                sessionId = this.agentSession.getSessionId();
            }
            if (!sessionId) {
                return;
            }
            const getNextPath = ApiUriConstants.GET_NEXT_EVENT_URI.replace('{sessionId}', sessionId).replace('{timeoutSec}', '1');
            const authToken = this.agentSession.accessToken;
            this.baseUri = this.agentSession.cxOneConfig.apiFacadeBaseUri;
            const endpoint = this.baseUri + getNextPath;
            const reqInit = {
                headers: this.utilService.initHeader(authToken).headers,
            };
            HttpClient.get(endpoint, reqInit).then((response) => {
                var _a, _b, _c, _d;
                if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.events) && ((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.events.length) > 0) {
                    this.getNextEventAdapter.handleGetNextResponse((_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.events);
                    const msg = {
                        type: MessageType.GET_NEXT_EVENT_RESPONSE,
                        data: (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.events,
                    };
                    MessageBus.instance.postResponse(msg);
                    this.logger.debug('getInitialGetNextEvent', `Get next event called successfully ${this.agentContext}`);
                }
                resolve();
            }, (error) => {
                this.logger.error('getInitialGetNextEvent', `Failed to call get next events: ${error.toString()} ${this.agentContext}`);
                this.logger.debug('getInitialGetNextEvent', `Failed to call get next events: ${error.toString()} ${this.agentContext}`);
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, error === null || error === void 0 ? void 0 : error.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * The static method that controls the access to the singleton instance.
     * @example
     * ```
     * const uiQueueWsProvider = UIQueueWsProvider.instance();
     * ```
     */
    static get instance() {
        if (!UIQueueWsProvider.singleton) {
            UIQueueWsProvider.singleton = new UIQueueWsProvider();
        }
        return UIQueueWsProvider.singleton;
    }
    /**
     * Returns a consistent debug context tag with agentId and tenantId for log messages.
     */
    get agentContext() {
        return `[${this.tenantId}:${this.agentId}]`;
    }
    /**
     * Method to get hub url
     * @returns hub url
     * @example
     * ```
     * getHubUrl();
     * ```
     */
    getHubUrl() {
        return new Promise((resolve, reject) => {
            this.adminService.getUiqHubUrl().then((response) => {
                if ('aggregatorServiceNodeURL' in response) {
                    this.hubUrl = response.aggregatorServiceNodeURL;
                }
                resolve(this.hubUrl);
            }, (err) => {
                this.logger.error('getHubUrl', `Failed to get hub url: ${err.toString()} ${this.agentContext}`);
                this.logger.debug('getHubUrl', `Failed to get hub url: ${err.toString()} ${this.agentContext}`);
                reject(this.hubUrl);
            });
        });
    }
    /**
     * Method to get valid access token
     * @returns  access token
     * @example
     * ```
     * getValidAccessToken();
     * ```
     */
    getValidAccessToken() {
        let accessToken = this.agentSession.accessToken;
        if (!accessToken || !this.validationUtils.validateToken(accessToken)) {
            throw new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Invalid access token');
        }
        return accessToken;
    }
    /**
     * Method to establish connection
     * @param userInfo - user info object
     * @param invokeSnapshot - flag to invoke snapshot request
     * @example
     * ```
     * connectAgent(userInfo, invokeSnapshot)
     * ```
     */
    connectAgent(userInfo, invokeSnapshot, sessionId) {
        this.agentId = userInfo.icAgentId;
        this.tenantId = userInfo.tenantId;
        // Check if connection is already established, in progress, or being attempted
        if (this.isConnectionInProgress) {
            this.logger.debug('connectAgent', `UIQ Connection already established or in progress. Skipping connection attempt. ${this.agentContext}`);
            return;
        }
        this.isConnectionInProgress = true;
        this.establishSocketConnection(userInfo, invokeSnapshot, sessionId)
            .catch((error) => {
            this.failoverToGetNext(error);
        })
            .finally(() => {
            this.isConnectionInProgress = false;
        });
    }
    /**
     * Method to get new hub connection
     * @param userInfo - user info object used to establish the connection
     * @param retryOptions - retry options for establishing the connection
     * @param sessionId - optional session identifier for the hub connection
     * @returns hub connection
     * @example
     * ```
     * getNewHubConnection(userInfo, retryOptions, sessionId)
     * ```
     */
    getNewHubConnection(userInfo, retryOptions, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = this.getValidAccessToken();
            let attempt = 0;
            /**
             * Attempts to establish a new hub connection with retry logic.
             * @returns A promise that resolves when the connection is successfully established.
             * @example
             * ```
             * await establishHubConnectionWithRetry();
             * ```
             */
            const establishHubConnectionWithRetry = () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (((_a = this.hubConnection) === null || _a === void 0 ? void 0 : _a.state) === HubConnectionState.Connected || ((_b = this.hubConnection) === null || _b === void 0 ? void 0 : _b.state) === HubConnectionState.Connecting)
                    return;
                try {
                    yield this.getHubUrl();
                    const hubUrlObject = new URL(this.hubUrl);
                    hubUrlObject.searchParams.set('sessionId', sessionId || this.agentSession.getSessionId());
                    hubUrlObject.searchParams.set('isAutoLogout', this.isAutoLogoutEnabled ? 'true' : 'false');
                    const hubUrlWithParams = hubUrlObject.toString();
                    this.hubConnection = new HubConnectionBuilder()
                        .withUrl(hubUrlWithParams, { httpClient: new CustomHttpClient(accessToken), accessTokenFactory: () => `Bearer ${accessToken}` })
                        .withAutomaticReconnect([0])
                        .build();
                    this.hubConnection.serverTimeoutInMilliseconds = 30000;
                    this.listenersAttached = false;
                    yield this.startConnection(userInfo);
                }
                catch (error) {
                    if (++attempt <= retryOptions.maxRetryAttempts) {
                        this.logger.error('getNewHubConnection', `Attempt ${attempt} failed: ${error} ${this.agentContext}`);
                        this.logger.debug('getNewHubConnection', `Attempt ${attempt} failed: ${error} ${this.agentContext}`);
                        this.logger.debug('getNewHubConnection', `Retrying... Attempts left: ${retryOptions.maxRetryAttempts - attempt} ${this.agentContext}`);
                        yield new Promise(resolve => setTimeout(resolve, retryOptions.retryInterval));
                        yield establishHubConnectionWithRetry();
                    }
                    else {
                        throw new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, 'Max retry attempts reached. Failed to establish socket connection.');
                    }
                }
            });
            yield establishHubConnectionWithRetry();
        });
    }
    /**
     * Method to establish connection
     * @param userInfo - user info object
     * @param invokeSnapshot - flag to invoke snapshot request
     * @example
     * ```
     * establishSocketConnection(userInfo, invokeSnapshot)
     * ```
     */
    establishSocketConnection(userInfo, _invokeSnapshot = false, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const retryOptions = RetryOptions.default();
                yield this.getNewHubConnection(userInfo, retryOptions, sessionId);
                this.logger.debug('establishSocketConnection', `UIQ Connection established ${this.agentContext}`);
                if (!this.isAutoLogoutEnabled) {
                    yield this.getInitialGetNextEvent(sessionId);
                    this.startKeepAlivePolling();
                }
                this.addEventListeners(userInfo);
            }
            catch (error) {
                this.logger.error('establishSocketConnection', `Failed to establish connection: ${error} ${this.agentContext}`);
                this.logger.debug('establishSocketConnection', `Failed to establish connection: ${error} ${this.agentContext}`);
                throw new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, 'Failed to establish socket connection.');
            }
            ;
            // TODO: Removing temporarily as it is not required for now, will enable it in next release when UIQ is ready
            // if(invokeSnapshot) {
            //   this.invokeUIQEventSnapshotRequest();
            // }
        });
    }
    /**
      * Method to add event listeners
      * @param events - recieved events
      * @example
      * ```
      * handleReceivedEvents(events)
      * ```
      */
    handleReceivedEvents(events) {
        if (CXoneLeaderElector.instance.isLeader) {
            const msg = {
                type: MessageType.UI_QUEUE_EVENT_RESPONSE,
                data: [events],
            };
            MessageBus.instance.postResponse(msg);
        }
        this.getNextEventAdapter.handleGetNextResponse([events]);
    }
    /**
       * Method to add event listeners
       * @param accessToken - accesstoken
       * @param userInfo - user info object
       * @example
       * ```
       * addEventListeners(userInfo)
       * ```
       */
    addEventListeners(userInfo) {
        // Remove existing listeners before re-registering to prevent duplicate handlers
        this.hubConnection.off(UIQEventType.RECEIVE_EVENTS);
        this.hubConnection.off(UIQEventType.PONG);
        this.hubConnection.off(UIQEventType.RECONNECT_WHEN_POSSIBLE);
        this.hubConnection.off(UIQEventType.CUSTOM_DEGRADATION);
        if (!this.isAutoLogoutEnabled) {
            this.hubConnection.on(UIQEventType.RECEIVE_EVENTS, (receivedData) => {
                if (!receivedData) {
                    this.logger.error('addEventListeners', `Received empty or undefined data from UIQ event. ${this.agentContext}`);
                    this.logger.debug('addEventListeners', `Received empty or undefined data from UIQ event. ${this.agentContext}`);
                    return;
                }
                try {
                    this.receivedEvents = JSON.parse(receivedData);
                    this.handleReceivedEvents(this.receivedEvents);
                }
                catch (err) {
                    this.logger.error('addEventListeners', `Failed to parse received UIQ event data: ${String(err)} ${this.agentContext}`);
                    this.logger.debug('addEventListeners', `Failed to parse received UIQ event data: ${String(err)} ${this.agentContext}`);
                }
            });
        }
        this.hubConnection.on(UIQEventType.PONG, () => {
            if (this.missedPongCount > 0) {
                this.logger.debug('Pong', `Pong received from server. Resetting missed pong counter. ${this.agentContext}`);
            }
            this.missedPongCount = 0;
        });
        this.hubConnection.on(UIQEventType.RECONNECT_WHEN_POSSIBLE, (shouldReconnect, _agentId, expiryTimeoutToEpoch) => {
            this.logger.debug('ReconnectWhenPossible', `UIQ Received ReconnectWhenPossible notification for agent Id: ${_agentId} ${this.agentContext}`);
            if (shouldReconnect && expiryTimeoutToEpoch > Math.floor(Date.now() / 1000)) {
                this.hubConnection.stop()
                    .then(() => {
                    this.logger.debug('On ReconnectWhenPossible', `Connection stopped. Waiting for onclose to reconnect. ${this.agentContext}`);
                })
                    .catch((err) => {
                    this.logger.error('On ReconnectWhenPossible', `Error while stopping connection before reconnect: ${String(err)} ${this.agentContext}`);
                    this.logger.debug('On ReconnectWhenPossible', `Error while stopping connection before reconnect: ${String(err)} ${this.agentContext}`);
                });
            }
        });
        this.hubConnection.on(UIQEventType.CUSTOM_DEGRADATION, () => {
            this.logger.debug('CustomDegradation', `Received Custom Degradation event ${this.agentContext}`);
            this.isUIQDegraded = true;
            // Keeping connection alive so that the agent does not get logged out
            if (!this.isAutoLogoutEnabled) {
                this.disconnectConsumerAgent();
                this.logger.error('CustomDegradation', `Switching to get-next polling as UIQ is degraded ${this.agentContext}`);
                this.logger.debug('CustomDegradation', `Switching to get-next polling as UIQ is degraded ${this.agentContext}`);
            }
            this.failoverToGetNext(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'UIQ is degraded'));
        });
        if (!this.listenersAttached) {
            this.hubConnection.onreconnected((connectionId) => {
                this.logger.debug('onreconnected', `UIQ Connection reestablished. Connected with connectionId ${connectionId}. ${this.agentContext}`);
                this.missedPongCount = 0;
                if (this.hubConnection.state === HubConnectionState.Connected && !this.isAutoLogoutEnabled) {
                    // TODO: Removing temporarily as it is not required for now, will enable it in next release when UIQ is ready
                    // this.invokeUIQEventSnapshotRequest();
                    // Adding get-next call to flush the initial renew-state event from the agent state
                    this.getInitialGetNextEvent();
                }
            });
            this.hubConnection.onclose(() => this.closeHandler(userInfo));
            this.listenersAttached = true;
        }
    }
    /**
         * Method to handle close event
         * @param userInfo - current logged in user information
         * @example
         * ```
         * closeHandler(userInfo)
         * ```
         */
    closeHandler(userInfo) {
        this.logger.debug('onclose', `UIQ Connection state closed event triggered. ${this.agentContext}`);
        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.onLine)) {
            this.handleInternetDisruption();
            // send custom event to show network error message
            const networkErrorEvent = {
                Type: UIQEventType.NETWORK_OFFLINE_EVENT,
                totalNetworkRequestExecuted: String(1),
                retryStatus: CXoneSdkErrorType.WEBSOCKET_ERROR,
            };
            this.handleReceivedEvents(networkErrorEvent);
        }
        else if (this.agentSession.getSessionId() && !this.isUIQDegraded) {
            this.connectAgent(userInfo);
        }
        else {
            this.stopHeartbeatWorker();
        }
    }
    /**
         * Method to send heartbeat
         * @param agentId - Agent ID
         * @param tenantId - tenant ID
         * @example
         * ```
         * startSocketHeartBeat(agentId, tenantId)
         * ```
        */
    startSocketHeartBeat(agentId, tenantId) {
        if (this.hubConnection.state === HubConnectionState.Connected) {
            this.missedPongCount++;
            if (this.missedPongCount > this.MAX_MISSED_PONGS) {
                this.logger.error('startSocketHeartBeat', `${this.missedPongCount} consecutive Pong responses missed. Stopping connection to trigger reconnect. ${this.agentContext}`);
                this.logger.debug('startSocketHeartBeat', `${this.missedPongCount} consecutive Pong responses missed. Stopping connection to trigger reconnect. ${this.agentContext}`);
                this.disconnectConsumerAgent();
                return;
            }
            this.hubConnection.invoke(UIQEventType.HEARTBEAT_FROM_AGENT, agentId, tenantId, 'Ping')
                .then(() => {
                this.logger.debug('startSocketHeartBeat', `UIQ Heartbeat successful ${this.agentContext}`);
            }).catch((err) => {
                if (err instanceof Error) {
                    this.logger.error('startSocketHeartBeat', `Error while sending heartbeat: ${new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err.message)} ${this.agentContext}`);
                    this.logger.debug('startSocketHeartBeat', `Error while sending heartbeat: ${new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err.message)} ${this.agentContext}`);
                }
            });
        }
    }
    ;
    /**
     *  Method to check the internet connection and handle the disruption
     * This method will start a timer to check the internet connection every 10 seconds.
     * @example
     * ```
     * this.handleInternetDisruption();
     * ```
     */
    handleInternetDisruption() {
        this.stopHeartbeatWorker();
        if (this.internetCheckTimer)
            clearInterval(this.internetCheckTimer);
        // will start the internet connection check 
        const startTime = Date.now();
        this.internetCheckTimer = setInterval(() => {
            if (Date.now() - startTime > 10 * 60 * 1000) { // 10 minutes in milliseconds
                this.logger.error('handleInternetDisruption', `Internet check exceeded 10 minutes. Stopping the timer. ${this.agentContext}`);
                this.logger.debug('handleInternetDisruption', `Internet check exceeded 10 minutes. Stopping the timer. ${this.agentContext}`);
                const networkErrorEvent = {
                    Type: UIQEventType.NETWORK_OFFLINE_EVENT,
                    totalNetworkRequestExecuted: String(0),
                    retryStatus: CXoneSdkErrorType.WEBSOCKET_ERROR,
                };
                this.handleReceivedEvents(networkErrorEvent);
                clearInterval(this.internetCheckTimer);
                return;
            }
            if (navigator === null || navigator === void 0 ? void 0 : navigator.onLine) {
                this.logger.debug('handleInternetDisruption', `Internet connection is back online. ${this.agentContext}`);
                const networkEvent = {
                    Type: UIQEventType.NETWORK_OFFLINE_EVENT,
                    retryStatus: '',
                };
                this.handleReceivedEvents(networkEvent);
                this.agentSession.establishUIQSocketConnection();
                clearInterval(this.internetCheckTimer);
            }
        }, 10000);
    }
    /**
         * Method to start connection
         * @param userInfo - current logged in user information
         * @example
         * ```
         * startConnection(userInfo)
         * ```
         */
    startConnection(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.hubConnection.start();
            this.initHeartbeatWorker(userInfo);
        });
    }
    /**
     * Use to initialize the heartbeat worker and start heartbeat tick polling on a worker thread
     * @param userInfo - user info object containing agentId and tenantId
     * @example
     * ```
     * this.initHeartbeatWorker(userInfo);
     * ```
     */
    initHeartbeatWorker(userInfo) {
        if (this.heartbeatWorker) {
            this.heartbeatWorker.terminate();
        }
        this.missedPongCount = 0;
        const heartbeatWorker = this.loader.getWorker('uiq-worker', 'ccf-agent-uiq-ws-heartbeat-worker');
        if (!heartbeatWorker) {
            this.logger.error('initHeartbeatWorker', `Failed to initialize heartbeat worker. getWorker returned undefined for uiq-worker/ccf-agent-uiq-ws-heartbeat-worker. ${this.agentContext}`);
            this.logger.debug('initHeartbeatWorker', `Failed to initialize heartbeat worker. getWorker returned undefined for uiq-worker/ccf-agent-uiq-ws-heartbeat-worker. ${this.agentContext}`);
            return;
        }
        heartbeatWorker.onmessage = (response) => {
            var _a;
            if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.type) === 'heartbeatTick') {
                this.startSocketHeartBeat(userInfo.icAgentId, userInfo.tenantId);
            }
        };
        heartbeatWorker.postMessage({ type: 'startHeartbeatPolling', pollingInterval: 10000 });
        this.heartbeatWorker = heartbeatWorker;
    }
    /**
         * Method to send refresh token
         * @example
         * ```
         * sendRefreshToken()
         * ```
         */
    sendRefreshToken() {
        if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
            const accessToken = this.getValidAccessToken();
            this.hubConnection.invoke(UIQEventType.RECEIVE_TOKEN_BEFORE_EXPIRY, accessToken)
                .then(() => {
                this.logger.debug('sendRefreshToken', `Token Refresh successful ${this.agentContext}`);
            }).catch((err) => {
                this.logger.error('sendRefreshToken', `Error while refreshing the token: ${new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err instanceof Error ? err.message : String(err))} ${this.agentContext}`);
                this.logger.debug('sendRefreshToken', `Error while refreshing the token: ${new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err instanceof Error ? err.message : String(err))} ${this.agentContext}`);
            });
        }
    }
    ;
    /**
         * Method to invoke snapshot request
         * @example
         * ```
         * invokeUIQEventSnapshotRequest()
         * ```
         */
    invokeUIQEventSnapshotRequest() {
        if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
            this.hubConnection.invoke(UIQEventType.SNAPSHOT_REQUEST)
                .then(() => {
                this.logger.debug('invokeSnapshot', `Snapshot Request successful ${this.agentContext}`);
            }).catch((err) => {
                this.logger.error('invokeSnapshot', `Error while invoking snapshot request: ${new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err instanceof Error ? err.message : String(err))} ${this.agentContext}`);
                this.logger.debug('invokeSnapshot', `Error while invoking snapshot request: ${new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err instanceof Error ? err.message : String(err))} ${this.agentContext}`);
            });
        }
    }
    /**
         * Method to disconnectAgent
         * @example
         * ```
         * disconnectConsumerAgent()
         * ```
         */
    disconnectConsumerAgent() {
        if (this.hubConnection) {
            this.stopHeartbeatWorker();
            this.hubConnection.stop()
                .then(() => {
                this.logger.debug('disconnectConsumerAgent', `UIQ Disconnected ${this.agentContext}`);
            })
                .catch((err) => {
                this.logger.error('disconnectConsumerAgent', `Error while stopping connection: ${String(err)} ${this.agentContext}`);
                this.logger.debug('disconnectConsumerAgent', `Error while stopping connection: ${String(err)} ${this.agentContext}`);
            });
            this.terminatePolling();
        }
    }
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker() {
        if (this.keepAlivePollingWorker) {
            this.terminatePolling(true);
            this.getkeepAlivePollingisActive && this.startKeepAlivePolling();
        }
    }
    /**
     * Used to terminate the polling of get-next api
     * @example -
     * ```
     * this.terminatePolling();
     * ```
     */
    terminatePolling(ifRestart) {
        var _a;
        (_a = this.keepAlivePollingWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.keepAlivePollingWorker = undefined;
        if (!ifRestart) {
            this.getkeepAlivePollingisActive = false;
        }
    }
    /**
     * Stops the heartbeat worker, sends a stop message, and clears the reference.
     * @example
     * ```
     * this.stopHeartbeatWorker();
     * ```
     */
    stopHeartbeatWorker() {
        if (this.heartbeatWorker) {
            this.heartbeatWorker.postMessage({ type: 'stopHeartbeatPolling' });
            this.heartbeatWorker.terminate();
            this.heartbeatWorker = undefined;
        }
    }
    /**
     * Method to failover to get-next polling
     * @param error - error object
     * @example
     * ```
     * failoverToGetNext(error)
     * ```
     */
    failoverToGetNext(error) {
        // Skipping failover to get-next polling if auto-logout is enabled as agent is already on get-next polling in that case, so no need to make additional API calls.
        if (!this.isAutoLogoutEnabled) {
            const randomDelay = Math.floor(Math.random() * 2000);
            setTimeout(() => {
                this.terminatePolling();
                this.agentSession.startGetNextEvents();
                this.logger.error('failoverToGetNext', `Switching to get-next polling as websocket connection failed: ${error.toString()} ${this.agentContext}`);
                this.logger.debug('failoverToGetNext', `Switching to get-next polling as websocket connection failed: ${error.toString()} ${this.agentContext}`);
            }, randomDelay);
        }
        else {
            this.logger.error('failoverToGetNext', `UIQ Websocket connection failed and auto-logout is enabled, skipping failover to get-next polling: ${error.toString()} ${this.agentContext}`);
            this.logger.debug('failoverToGetNext', `UIQ Websocket connection failed and auto-logout is enabled, skipping failover to get-next polling: ${error.toString()} ${this.agentContext}`);
        }
    }
}
//# sourceMappingURL=ui-queue-ws-provider.js.map