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
import { LocalStorageHelper } from '../../../util/storage-helper-local';
import { StorageKeys } from '../../../constants/storage-key';
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
     * @param request - http requet object
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
        this.logger = new Logger('uiQueueWsProvider', 'UIQueueWsProvider');
        this.getkeepAlivePollingisActive = false;
        this.utilService = new HttpUtilService();
        this.isUIQueueDegraded = false;
        this.loader = new LoadWorker();
        this.validationUtils = new ValidationUtils();
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
        this.logger.info('startKeepAlivePolling', 'startKeepAlivePolling in UIQueueWsProvider');
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
        var _a;
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
        const pollingOptions = { isPolling: false, pollingInterval: 120000 };
        if (!this.keepAlivePollingWorker) {
            this.initAgentKeepAliveWorker();
            this.keepAlivePollingWorker.onmessage = (response) => {
                var _a;
                if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.type) === 'retry') {
                    this.logger.info('getNextEvents', 'Polling called successfully');
                }
            };
        }
        this.keepAlivePollingWorker.postMessage({ type: 'startAgentKeepAlivePolling', requestParams: { url: endpoint, request: reqInit, method: 'POST' }, pollingOptions, isLeader: (_a = CXoneLeaderElector.instance) === null || _a === void 0 ? void 0 : _a.isLeader });
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
                    this.logger.info('getInitialGetNextEvent', 'Get next event called successfully');
                }
                resolve();
            }, (error) => {
                this.logger.error('getInitialGetNextEvent', 'Failed to call get next events: ' + error.toString());
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
                this.logger.error('getHubUrl', 'Failed to get hub url: ' + err.toString());
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
            accessToken = LocalStorageHelper.getItem(StorageKeys.AUTH_TOKEN, true).accessToken;
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
    connectAgent(userInfo, invokeSnapshot) {
        this.establishSocketConnection(userInfo, invokeSnapshot).catch((error) => {
            this.logger.error('connectAgent', 'establishSocketConnection failed:-' + error);
            this.logger.error('connectAgent', 'Switching to get-next polling as websocket connection failed');
            this.terminatePolling();
            this.agentSession.startGetNextEvents();
        });
    }
    /**
     * Method to get new hub connection
     * @param retryOptions  - retry options
     * @returns   hub connection
     * @example
     * ```
     * getNewHubConnection(retryOptions)
     * ```
     */
    getNewHubConnection(userInfo, retryOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = this.getValidAccessToken();
            try {
                if (!this.hubConnection || this.hubConnection.state !== HubConnectionState.Connected) {
                    yield this.getHubUrl();
                    this.hubConnection = new HubConnectionBuilder()
                        .withUrl(this.hubUrl, { httpClient: new CustomHttpClient(accessToken), accessTokenFactory: () => `Bearer ${accessToken}` })
                        .withAutomaticReconnect([1000])
                        .build();
                    this.hubConnection.serverTimeoutInMilliseconds = 60000;
                    yield this.startConnection(userInfo);
                }
            }
            catch (error) {
                if ((retryOptions === null || retryOptions === void 0 ? void 0 : retryOptions.maxRetryAttempts) > 0) {
                    retryOptions.maxRetryAttempts--;
                    this.logger.error('getNewHubConnection', 'getNewHubConnection failed:-' + error);
                    this.logger.info('getNewHubConnection', `Retrying to establish socket connection. Attempts left: ${retryOptions.maxRetryAttempts}`);
                    setTimeout(() => this.getNewHubConnection(userInfo, retryOptions).catch((error) => {
                        this.logger.error('getNewHubConnection', 'getNewHubConnection failed:-' + error);
                    }), retryOptions === null || retryOptions === void 0 ? void 0 : retryOptions.retryInterval);
                }
                else {
                    throw new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, 'Max retry attempts reached. Failed to establish socket connection.');
                }
            }
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
    establishSocketConnection(userInfo, _invokeSnapshot = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const retryOptions = RetryOptions.default();
            this.getNewHubConnection(userInfo, retryOptions).then(() => __awaiter(this, void 0, void 0, function* () {
                this.logger.info('establishSocketConnection', 'UIQ Connection established');
                yield this.getInitialGetNextEvent();
                this.addEventListeners(userInfo);
                this.startKeepAlivePolling();
            })).catch((error) => {
                this.logger.error('establishSocketConnection', 'establishSocketConnection failed:-' + error);
                this.logger.error('establishSocketConnection', 'Switching to get-next polling as websocket connection failed');
                this.terminatePolling();
                this.agentSession.startGetNextEvents();
            });
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
        this.hubConnection.on(UIQEventType.RECEIVE_EVENTS, (receivedData) => {
            this.receivedEvents = JSON.parse(receivedData);
            this.handleReceivedEvents(this.receivedEvents);
        });
        this.hubConnection.on(UIQEventType.RECONNECT_WHEN_POSSIBLE, (shouldReconnect, _agentId, expiryTimeoutToEpoch) => {
            this.logger.info('ReconnectWhenPossible', `UIQ Received ReconnectWhenPossible notification for agent Id: ${_agentId}`);
            if (shouldReconnect && expiryTimeoutToEpoch > Math.floor(Date.now() / 1000)) {
                this.hubConnection.stop();
                setTimeout(() => { this.logger.info('On ReconnectWhenPossible', 'Waiting for connection to stop.'); }, 5000);
                this.establishSocketConnection(userInfo, true).catch((error) => {
                    this.agentSession.startGetNextEvents();
                    this.logger.error('addEventListeners', 'establishSocketConnection failed:-' + error);
                    this.logger.error('addEventListeners', 'Switching to get-next polling as websocket connection failed');
                });
            }
        });
        this.hubConnection.on(UIQEventType.CUSTOM_DEGRADATION, () => {
            this.logger.info('CustomDegradation', 'Received Custom Degradation event');
            this.isUIQueueDegraded = true;
            this.terminatePolling();
            this.agentSession.startGetNextEvents();
            this.logger.error('CustomDegradation', 'Switching to get-next polling as UIQ is degraded');
        });
        this.hubConnection.on(UIQEventType.UIQ_HEALTHY, (receivedData) => {
            if (this.isUIQueueDegraded === true) {
                this.isUIQueueDegraded = false;
                this.agentSession.terminateGetNextPolling();
                this.startKeepAlivePolling();
                // TODO: Removing temporarily as it is not required for now, will enable it in next release when UIQ is ready
                // this.invokeUIQEventSnapshotRequest();
                //Adding get-next call to flush the initial renew-state event from the agent state
                this.getInitialGetNextEvent();
                this.logger.info('UIQueueHealthy', `Received UIQueue Healthy event: ${receivedData}`);
            }
        });
        this.hubConnection.onreconnected((connectionId) => {
            this.logger.info('onreconnected', `UIQ Connection reestablished. Connected with connectionId ${connectionId}.`);
            if (this.hubConnection.state === HubConnectionState.Connected) {
                // TODO: Removing temporarily as it is not required for now, will enable it in next release when UIQ is ready
                // this.invokeUIQEventSnapshotRequest();
                // Adding get-next call to flush the initial renew-state event from the agent state
                this.getInitialGetNextEvent();
            }
        });
        this.hubConnection.onclose(() => {
            this.logger.info('onclose', 'UIQ Connection state closed event triggered.');
            clearInterval(this.hearbeatPoller);
            this.disconnectConsumerAgent();
            if (this.agentSession.getSessionId()) {
                this.establishSocketConnection(userInfo, true).catch((error) => {
                    this.terminatePolling();
                    this.agentSession.startGetNextEvents();
                    this.logger.error('onclose', 'establishSocketConnection failed:-' + error);
                    this.logger.error('onclose', 'Switching to get-next polling as websocket connection closed');
                });
            }
        });
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
            this.hubConnection.invoke(UIQEventType.HEARTBEAT_FROM_AGENT, agentId, tenantId, 'Alive')
                .then(() => {
                this.logger.info('startSocketHeartBeat', 'UIQ Heartbeat successful');
            }).catch((err) => {
                this.disconnectConsumerAgent();
                clearInterval(this.hearbeatPoller);
                this.agentSession.startGetNextEvents();
                this.logger.error('startSocketHeartBeat', 'Switching to get-next polling as heartbeat failed');
                if (err instanceof Error) {
                    this.logger.error('startSocketHeartBeat', 'Error while sending heartbeat' + new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err.message));
                }
            });
        }
    }
    ;
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
            this.hearbeatPoller = setInterval(this.startSocketHeartBeat.bind(this), 5000, userInfo.icAgentId, userInfo.tenantId);
        });
    }
    /**
         * Method to invoke snapshot request
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
                this.logger.info('sendRefreshToken', 'Token Refresh successful');
            }).catch((err) => {
                this.logger.error('sendRefreshToken', 'Error while refreshing the token' + new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err.message));
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
        if (this.hubConnection && this.hubConnection.state == HubConnectionState.Connected) {
            this.hubConnection.invoke(UIQEventType.SNAPSHOT_REQUEST)
                .then(() => {
                this.logger.info('invokeSnapshot', 'Snapshot Request successful');
            }).catch((err) => {
                this.logger.error('invokeSnapshot', 'Error while invoking snapshot request' + new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, err.message));
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
            this.hubConnection.stop();
            this.terminatePolling();
            this.logger.info('disconnectConsumerAgent', 'UIQ Disconnected');
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
}
//# sourceMappingURL=ui-queue-ws-provider.js.map