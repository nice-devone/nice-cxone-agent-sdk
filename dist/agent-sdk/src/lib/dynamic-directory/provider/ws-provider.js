import { CXoneAuth } from '@nice-devone/auth-sdk';
import { WSCommand, } from '@nice-devone/common-sdk';
import { ApiUriConstants, Logger, WebsocketClient, LoadWorker } from '@nice-devone/core-sdk';
import { WSService } from '../service/ws-service';
/**
 * This is the base class for WSProvider
 */
export class WSProvider extends WebsocketClient {
    /**
     * Create instance for dynamic directory WSProvider
     * @param directory - Instance of CXoneDynamicDirectory class
     * @example
     * ```
     * new WSProvider(CXoneDynamicDirectory);
     * ```
     */
    constructor(directory) {
        super();
        this.logger = new Logger('SDK', 'WSProvider');
        this.wsService = new WSService();
        this.connected = false;
        this.subscribed = false;
        this.dynamicDirectory = directory;
        this.auth = CXoneAuth.instance;
    }
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentStateSocketWorker();
     * ```
     */
    initAgentStateSocketWorker() {
        const loader = new LoadWorker();
        if (!this.wsWorker)
            this.wsWorker = loader.getWorker('ws-worker', 'ccf-agent-directory-ws-worker');
        this.wsWorker.onmessage = (response) => {
            this.checkWSEvent(response.data);
        };
        return this.wsWorker;
    }
    /**
     * Use to close the web socket worker
     * @example
     * ```
     * this.close();
     * ```
     */
    close() {
        super.close(this.initAgentStateSocketWorker());
        this.connected = false;
    }
    /**
     * Use to start heartbeat comment for websocket
     * @example
     * ```
     * this.runHeartbeat();
     * ```
     */
    runHeartbeat() {
        if (this.connected === true) {
            clearTimeout(this.heartbeatTimer);
            const heartbeat = this.wsService.getConnectionMessage('heartbeat');
            super.sendMessage(heartbeat, this.initAgentStateSocketWorker());
            this.heartbeatTimer = setTimeout(this.runHeartbeat.bind(this), 10000);
        }
    }
    /**
     * Method used to receive message from WebSocket
     * @param msg - WebSocket Messages exchange format
     * @example
     * ```
     * onMessage(msg);
     * ```
     */
    onMessage(msg) {
        this.logger.debug('onMessage ', '[WSProvider] ' + JSON.stringify(msg));
        if (msg.command === WSCommand.SUBSCRIBED) {
            this.subscribed = true;
        }
        if (msg.command === WSCommand.UNSUBSCRIBED) {
            this.subscribed = false;
        }
        if (msg.command === WSCommand.CONNECTED) {
            this.connected = true;
            this.runHeartbeat();
            this.dynamicDirectory.onMessageReceived.next(msg);
        }
        else {
            this.dynamicDirectory.onMessageReceived.next(msg);
        }
        return msg;
    }
    /**
     * Method used to receive the WebSocket Error and ReConnect the WebSocket
     * @example
     * ```
     * onError();
     * ```
     */
    onError() {
        this.logger.debug('onError ', '[WSProvider] Try to reconnect WS');
        this.connected = false;
        const errorReconnectingMessage = this.wsService.getErrorMessage('DynamicDirectory - Error on WS Connection. Trying to Reconnect');
        this.dynamicDirectory.onMessageReceived.next(errorReconnectingMessage);
    }
    /**
     * Used to receive WebSocket connection closed
     * @example
     * ```
     * onClosed();
     * ```
     */
    onClosed() {
        this.logger.debug('onClosed ', '[WSProvider] WS closed');
        this.connected = false;
        const connectionClosed = this.wsService.getErrorMessage('DynamicDirectory - Closed WS Connection');
        this.dynamicDirectory.onMessageReceived.next(connectionClosed);
    }
    /**
     * Method used to send message websocket worker
     * @example
     * ```
     * onOpen();
     * ```
     */
    onOpen() {
        const connectMsg = this.wsService.getConnectionMessage('connect');
        super.sendMessage(connectMsg, this.initAgentStateSocketWorker());
    }
    /**
     * Method used to reconnect the WebSocket
     * @param msg - Websocket Reconnect response
     * @example
     * ```
     * onReconnect(msg);
     * ```
     */
    onReconnect(msg) {
        this.logger.debug('onReconnect ', '[WSProvider] ' + JSON.stringify(msg));
        this.connected = false;
        const cxOneConfig = this.auth.getCXoneConfig();
        if (cxOneConfig.presenceSyncWebSocketUrl) {
            const reConnect = {
                retryOptions: {
                    maxRetryAttempts: 3,
                    retryInterval: 3000,
                },
                url: cxOneConfig.presenceSyncWebSocketUrl +
                    ApiUriConstants.PRESENCE_SYNC_WEBSOCKET,
            };
            super.attemptReconnect(reConnect, this.initAgentStateSocketWorker());
        }
    }
    /**
     * Method used to receive ws reconnect attempts are completed
     * @example
     * ```
     * onReconnectComplete();
     * ```
     */
    onReconnectComplete() {
        this.logger.info('onReconnect ', '[WSProvider] Reconnect completed');
        this.connected = false;
    }
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    connectSocket() {
        const cxOneConfig = this.auth.getCXoneConfig();
        if (cxOneConfig === null || cxOneConfig === void 0 ? void 0 : cxOneConfig.presenceSyncWebSocketUrl) {
            if (!this.connected) {
                const agentStateSocketWorker = this.initAgentStateSocketWorker();
                this.connect(cxOneConfig.presenceSyncWebSocketUrl + ApiUriConstants.PRESENCE_SYNC_WEBSOCKET, agentStateSocketWorker);
            }
            else {
                const connectedMessage = this.wsService.getConnectedMessage();
                this.onMessage(connectedMessage);
            }
        }
        else {
            this.logger.error('cxone-dynamic-directory', 'websocket url not available');
        }
    }
    /**
     * Use to subscribe to search results
     * @example
     * ```
     * this.subscribeSearch(subscriptionId);
     * ```
     */
    subscribeSearch(subscriptionId) {
        if (this.subscribed)
            return;
        const subscribe = this.wsService.getSubscriptionMessage(subscriptionId);
        super.sendMessage(subscribe, this.initAgentStateSocketWorker());
    }
    /**
     * Use to unsubscribe from websocket
     * @example
     * ```
     * this.unsubscribeSearch(subscriptionID);
     * ```
     */
    unsubscribeSearch(subscriptionId) {
        if (this.connected) {
            const unsubscribe = this.wsService.getUnsubscribeMessage(subscriptionId);
            super.sendMessage(unsubscribe, this.initAgentStateSocketWorker());
        }
    }
}
//# sourceMappingURL=ws-provider.js.map