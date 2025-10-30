import { WebsocketClient, Logger, LoadWorker } from '@nice-devone/core-sdk';
import { AgentAssistSubscribe, AgentAssistUnsubscribe, AgentAssistCommand, } from '@nice-devone/common-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { AgentAssistProvider } from '../enum/agent-assist-provider';
const empytyAgentAssistInput = { webSocketUri: '', contactId: '0', providerId: '', subscriptions: [], subCategory: '' };
const MAX_RETRY_ATTEMPTS = 10;
const RETRY_INTERVAL = 2000;
/**
 *  web socket base class for Agent assist notification
 */
export class AgentAssistNotificationService extends WebsocketClient {
    constructor() {
        super(...arguments);
        this.IsSubscribeDummyResponse = true;
        this.auth = CXoneAuth.instance;
        this.contactId = 0;
        this.connectionId = '';
        this.subscriptions = [];
        this.agentAssistInput = empytyAgentAssistInput;
        this.reconnectAttemptSource = null;
    }
    /**
     * used to unsubscribe events and clear props.
     * @example -  close()
    */
    close() {
        this.connectionId = '';
        this.agentAssistInput = empytyAgentAssistInput;
        if (this.wssWorker) {
            super.close(this.wssWorker);
        }
    }
    /**
     * used to connect to the socket.
     * @example -  connect();
     * @param websocketServerUri - websocketServer uri
    */
    connect(websocketServerUri, providerId = 'Agent-Assist') {
        this.agentAssistInput.webSocketUri = websocketServerUri;
        this.agentAssistInput.providerId = providerId;
        super.connect(websocketServerUri, this.wssWorker);
        return true;
    }
    /**
     * used to Reconnect to the socket.
     * @example -  reConnectToSocket();
    */
    reconnectWebsocket() {
        this.connectionId = '';
        this.connect(this.agentAssistInput.webSocketUri, this.agentAssistInput.providerId);
        this.subscribe(this.agentAssistInput);
    }
    /**
     * Use to terminate the web socket worker
     * @example
     * ```
     * this.terminateWebSocketWorker();
     * ```
    */
    terminateWebSocketWorker() {
        var _a;
        if (this.wssWorker) {
            this.wssWorker.postMessage({ type: 'close' });
            (_a = this.wssWorker) === null || _a === void 0 ? void 0 : _a.terminate();
            this.wssWorker = undefined;
        }
    }
    /**
     * used to unsubscribe and disconnect to socket events.
     * @example -  disconnectWebsocket();
    */
    disconnectWebsocket() {
        var _a, _b;
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistUnsubscribe(cx1Token, (_b = this.subscriptions) === null || _b === void 0 ? void 0 : _b.toString());
        this.sendMessage(req, this.wssWorker);
    }
    /**
     * used to subscribe to socket events.
     * @example -  subscribeToSocket('');
     * @param topic - topic to subscribe
    */
    subscribeToSocket(topic) {
        var _a;
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistSubscribe(cx1Token, topic);
        this.sendMessage(req, this.wssWorker);
        return true;
    }
    /**
     * callback for when error received
     * @example -  onError();
    */
    onError() {
        const postResponseMessage = {
            contactId: this.contactId,
            type: AgentAssistCommand.error,
            data: 'WebSocket Error',
        };
        this.logger.error('onError', `Error: ${JSON.stringify(postResponseMessage)}`);
    }
    /**
     * callback for when the socket closed.
     * @example -  onClosed();
    */
    onClosed() {
        this.wssWorker.postMessage({ type: 'close' });
        if (this.reconnectAttemptSource === 'fromOnError') {
            return;
        }
        this.reconnectAttemptSource = 'fromOnClosed';
        this.attemptToReconnect();
    }
    /**
     * Callback method when a connection is open and ready to send and receive data
     * @example - onOpen()
    */
    onOpen() {
        //
    }
    /**
     * Callback method when a ws reconnect attempts in progress
     * @param msg -  message from server
     * @example - this.onReconnect()
    */
    onReconnect(_msg) {
        //no implementation
    }
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete()
    */
    onReconnectComplete() {
        //no implementation
    }
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
    * @example
    * ```
    * this.initWebSocketWorker();
    * ```
    */
    initWebSocketWorker(providerId) {
        // check if the web socket worker is already initialized
        // if it is, do not initialize it again
        if (this.wssWorker) {
            return;
        }
        const webWorkerName = `ccf-${providerId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-wss-worker`;
        const loader = new LoadWorker();
        this.wssWorker = loader.getWorker(`ws-worker${providerId === AgentAssistProvider.AGENT_COPILOT ? '-acp' : ''}`, webWorkerName);
        if (this.wssWorker) {
            this.wssWorker.onmessage = (response) => {
                const data = response === null || response === void 0 ? void 0 : response.data;
                this.checkWSEvent(data);
            };
            this.wssWorker.onerror = (error) => {
                this.logger.error('WssWorker.OnError', 'Connection Error: ' + JSON.stringify(error));
                if (this.reconnectAttemptSource === 'fromOnClosed') {
                    return;
                }
                this.reconnectAttemptSource = 'fromOnError';
                this.attemptToReconnect();
            };
        }
    }
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
    * @param providerId -  AAH provider
    * @example
    * ```
    * this.initLogger('ccai');
    * ```
    */
    initLogger(providerId) {
        this.logger = new Logger('agent-sdk', `agent-assist-wesoscket-service-${providerId}`);
    }
    /**
     * Use to attempt to reconnect to the web socket worker
     * @example
     * ```
     * this.attemptToReconnect();
     * ```
     */
    attemptToReconnect() {
        var _a;
        const reConnect = {
            retryOptions: {
                maxRetryAttempts: MAX_RETRY_ATTEMPTS,
                retryInterval: RETRY_INTERVAL,
            },
            url: (_a = this.agentAssistInput) === null || _a === void 0 ? void 0 : _a.webSocketUri,
        };
        super.attemptReconnect(reConnect, this.wssWorker);
    }
}
//# sourceMappingURL=agent-assist-notification-service.js.map