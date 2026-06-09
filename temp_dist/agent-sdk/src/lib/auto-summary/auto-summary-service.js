import { timer, Subject } from 'rxjs';
import { WebsocketClient, Logger, LoadWorker } from '@nice-devone/core-sdk';
import { AgentAssistSubscribe, AgentAssistConnect, AgentAssistUnsubscribe, AgentAssistHeartbeat, AgentAssistCommand, AgentAssistMessageResponse, MessageBus, MessageType, CXoneLeaderElector } from '@nice-devone/common-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
 *  web socket class for auto summary
 */
export class AutoSummaryService extends WebsocketClient {
    constructor() {
        super(...arguments);
        this.IsSubscribeDummyResponse = true;
        this.WS_INTERVAL_HEARTBEAT = 10000;
        this.auth = CXoneAuth.instance;
        this.contactId = '0';
        this.connectionId = '';
        this.websocketUri = '';
        this.subscriptions = [];
        this.autoSummaryInput = { webSocketUri: '', contactId: '0', subscriptions: [] };
        this.logger = new Logger('Sdk', 'CxoneAutoSummaryWebsocket');
        /**
         * used to send emitted websocket events data.
        */
        this.onAutoSummaryReceived = new Subject();
    }
    /**
     * Used to open the webSocket data and subscribe to it.
     * @example -
     * ```
     * subscribe();
     * @param webSocketUri - webSocketUri for auto summary
     * @param contactId - contactId for auto summary
     * @param subscriptions - subscriptions for auto summary
     * ```
    */
    subscribe(autoSummaryInput) {
        var _a;
        this.logger.info('subscribe', 'subscribe for AutoSummary ');
        this.subscriptions = autoSummaryInput.subscriptions;
        this.autoSummaryInput = autoSummaryInput;
        if (autoSummaryInput.webSocketUri && autoSummaryInput.webSocketUri != '') {
            if (this.connectionId == '' || this.websocketUri !== autoSummaryInput.webSocketUri) {
                this.websocketUri = autoSummaryInput.webSocketUri;
                this.contactId = autoSummaryInput.contactId;
                const authToken = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
                this.initWebSocketWorker();
                if (this.websocketUri && authToken) {
                    this.wssWorker.onmessage = (response) => {
                        this.checkWSEvent(response.data);
                    };
                    this.connect(this.websocketUri);
                }
            }
            else {
                if (this.contactId != autoSummaryInput.contactId) {
                    this.contactId = autoSummaryInput.contactId;
                    this.subscribeToSocket(this.subscriptions[0].toString());
                }
            }
        }
        else {
            this.logger.info('subscribe', 'WebSocketUri is empty');
        }
    }
    /**
     * used to unsubscribe events and clear props.
     * @example -  close()
    */
    close() {
        var _a;
        (_a = this.hearbeatSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.connectionId = '';
        this.websocketUri = '';
        this.autoSummaryInput = { webSocketUri: '', contactId: '0', subscriptions: [] };
        if (this.wssWorker) {
            super.close(this.wssWorker);
        }
    }
    /**
     * used to broadcast the message to other tabs.
     * @example -  broadcastAutoSummary();
     * @param message - message to broadcast
    */
    broadcastAutoSummary(message) {
        var _a;
        const msgResponse = AgentAssistMessageResponse.parse(message);
        const broadcastMessage = {
            contactId: this.contactId,
            type: msgResponse.command,
        };
        switch (msgResponse.command) {
            case AgentAssistCommand.message:
                broadcastMessage.data = msgResponse.body.autoSummary;
                broadcastMessage.contactId = this.contactId;
                this.onAutoSummaryReceived.next(broadcastMessage);
                break;
            case AgentAssistCommand.subscribed:
                broadcastMessage.data = msgResponse.body.topic;
                broadcastMessage.contactId = this.contactId;
                this.onAutoSummaryReceived.next(broadcastMessage);
                break;
            case AgentAssistCommand.connected:
                this.connectionId = ((_a = msgResponse.headers) === null || _a === void 0 ? void 0 : _a.connectionId) || '';
                this.onAutoSummaryReceived.next(broadcastMessage);
                break;
            default:
                break;
        }
    }
    /**
     * used to connect to the socket.
     * @example -  connect();
     * @param websocketServerUri - websocketServer uri
    */
    connect(websocketServerUri) {
        var _a;
        super.connect(websocketServerUri, this.wssWorker);
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistConnect(cx1Token);
        this.sendMessage(req, this.wssWorker);
        this.logger.info('Connect', 'Connecting to WebSocket in AutoSummary');
        return true;
    }
    /**
     * used to Reconnect to the socket.
     * @example -  reConnectToSocket();
    */
    reconnectWebsocket() {
        this.connectionId = '';
        this.subscribe(this.autoSummaryInput);
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
        }
    }
    /**
     * used to unsubscribe and disconnect to socket events.
     * @example -  disconnectWebsocket();
    */
    disconnectWebsocket() {
        var _a, _b;
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistUnsubscribe(cx1Token, (_b = this.subscriptions[0]) === null || _b === void 0 ? void 0 : _b.toString());
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
     * used to send heart beat to socket.
     * @example -  sendHeartbeat();
    */
    sendHeartbeat() {
        var _a;
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistHeartbeat(cx1Token);
        this.sendMessage(req, this.wssWorker);
    }
    /**
     * callback for when message received
     * @example -  onMessage(msg);
     * @param message - Response Message
    */
    onMessage(responseMessage) {
        var _a, _b, _c, _d, _e;
        const msgResponse = AgentAssistMessageResponse.parse(responseMessage);
        switch (msgResponse.command) {
            case AgentAssistCommand.error:
                if (msgResponse.body.topic === 'No CONNECT message received') {
                    this.connectionId = '';
                    (_a = this.hearbeatSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                    if (((_b = this.autoSummaryInput) === null || _b === void 0 ? void 0 : _b.contactId) !== '0') {
                        this.subscribe(this.autoSummaryInput);
                    }
                }
                break;
            case AgentAssistCommand.connected:
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    if (msgResponse.command === AgentAssistCommand.connected) {
                        this.connectionId = ((_c = msgResponse.headers) === null || _c === void 0 ? void 0 : _c.connectionId) || '';
                        (_d = this.hearbeatSubscription) === null || _d === void 0 ? void 0 : _d.unsubscribe();
                        this.hearbeatTimer = timer(this.WS_INTERVAL_HEARTBEAT, this.WS_INTERVAL_HEARTBEAT);
                        this.hearbeatSubscription = this.hearbeatTimer.subscribe(() => this.sendHeartbeat());
                        this.subscribeToSocket(this.subscriptions[0].toString());
                    }
                    const postResponseMessage = {
                        type: MessageType.AUTO_SUMMARY_RESPONSE,
                        data: responseMessage,
                    };
                    if (CXoneLeaderElector.instance.isLeader) {
                        const broadcastMessage = {
                            contactId: this.contactId,
                            type: msgResponse.command,
                            data: msgResponse.body.autoSummary,
                        };
                        this.onAutoSummaryReceived.next(broadcastMessage);
                        MessageBus.instance.postResponse(postResponseMessage);
                    }
                }
                break;
            case AgentAssistCommand.unsubscribed:
                {
                    this.connectionId = '';
                    (_e = this.hearbeatSubscription) === null || _e === void 0 ? void 0 : _e.unsubscribe();
                    this.contactId = '0';
                    this.autoSummaryInput = { webSocketUri: '', contactId: '0', subscriptions: [] };
                    this.wssWorker.postMessage({ type: 'close' });
                }
                break;
            default:
                break;
        }
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
        this.onAutoSummaryReceived.next(postResponseMessage);
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
        const postResponseMessage = {
            contactId: this.contactId,
            type: AgentAssistCommand.open,
            data: 'WebSocket connection is ready to send and receive data',
        };
        this.onAutoSummaryReceived.next(postResponseMessage);
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
    initWebSocketWorker() {
        const loader = new LoadWorker();
        this.wssWorker = loader.getWorker('ws-worker', 'ccf-auto-summary-wss-worker');
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
        if (this.connectionId != '') {
            (_a = this.hearbeatSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this.reconnectWebsocket();
        }
    }
}
//# sourceMappingURL=auto-summary-service.js.map