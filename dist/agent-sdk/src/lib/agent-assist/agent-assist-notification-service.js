import { WebsocketClient, Logger, LoadWorker } from '@nice-devone/core-sdk';
import { AgentAssistSubscribe, AgentAssistConnect, AgentAssistUnsubscribe, AgentAssistCommand, } from '@nice-devone/common-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { AgentAssistProvider } from '../enum/agent-assist-provider';
const empytyAgentAssistInput = { webSocketUri: '', contactId: '0', providerId: '', subscriptions: [] };
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
        var _a;
        super.connect(websocketServerUri, this.wssWorker);
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistConnect(cx1Token);
        this.sendMessage(req, this.wssWorker);
        this.logger.info('Connect', `Connecting to WebSocket for ${providerId}`);
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
        const webWorkerName = `ccf-${providerId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-wss-worker`;
        const loader = new LoadWorker();
        this.wssWorker = loader.getWorker(`ws-worker${providerId === AgentAssistProvider.AGENT_COPILOT ? '-acp' : ''}`, webWorkerName);
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
        if (this.connectionId != '') {
            this.disconnectWebsocket();
            this.reconnectWebsocket();
        }
    }
}
//# sourceMappingURL=agent-assist-notification-service.js.map