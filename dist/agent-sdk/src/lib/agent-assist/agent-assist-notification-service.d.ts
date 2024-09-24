import { WebsocketClient, Logger } from '@nice-devone/core-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
export interface AgentAssistInput {
    webSocketUri: string;
    contactId: string;
    providerId: string;
    subscriptions: string[];
}
/**
 *  web socket base class for Agent assist notification
 */
export declare abstract class AgentAssistNotificationService extends WebsocketClient {
    IsSubscribeDummyResponse: boolean;
    auth: CXoneAuth;
    wssWorker: any;
    private contactId;
    protected connectionId: string;
    protected subscriptions: string[];
    protected agentAssistInput: AgentAssistInput;
    logger: Logger;
    /**
     * Used to open the webSocket data and subscribe to it.
     * @example -
     * ```
     * subscribe();
     * @param agentAssistInput - input for subscribing to wwebscket comprising of webSocketUri,contactId, subscriptions & providerId
     * ```
    */
    abstract subscribe(agentAssistInput: AgentAssistInput): boolean;
    /**
     * function to recieve websocket messages
     * @param responseMessage - message
     * @example
     */
    protected abstract onMessage(responseMessage: any): void;
    /**
     * used to unsubscribe events and clear props.
     * @example -  close()
    */
    close(): void;
    /**
     * used to connect to the socket.
     * @example -  connect();
     * @param websocketServerUri - websocketServer uri
    */
    connect(websocketServerUri: string, providerId?: string): boolean;
    /**
     * used to Reconnect to the socket.
     * @example -  reConnectToSocket();
    */
    reconnectWebsocket(): void;
    /**
     * Use to terminate the web socket worker
     * @example
     * ```
     * this.terminateWebSocketWorker();
     * ```
    */
    terminateWebSocketWorker(): void;
    /**
     * used to unsubscribe and disconnect to socket events.
     * @example -  disconnectWebsocket();
    */
    disconnectWebsocket(): void;
    /**
     * used to subscribe to socket events.
     * @example -  subscribeToSocket('');
     * @param topic - topic to subscribe
    */
    protected subscribeToSocket(topic: string): boolean;
    /**
     * callback for when error received
     * @example -  onError();
    */
    protected onError(): void;
    /**
     * callback for when the socket closed.
     * @example -  onClosed();
    */
    protected onClosed(): void;
    /**
     * Callback method when a connection is open and ready to send and receive data
     * @example - onOpen()
    */
    protected onOpen(): void;
    /**
     * Callback method when a ws reconnect attempts in progress
     * @param msg -  message from server
     * @example - this.onReconnect()
    */
    protected onReconnect(_msg: any): void;
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete()
    */
    protected onReconnectComplete(): void;
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
    * @example
    * ```
    * this.initWebSocketWorker();
    * ```
    */
    protected initWebSocketWorker(providerId: string): void;
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
    * @param providerId -  AAH provider
    * @example
    * ```
    * this.initLogger('ccai');
    * ```
    */
    protected initLogger(providerId: string): void;
    /**
     * Use to attempt to reconnect to the web socket worker
     * @example
     * ```
     * this.attemptToReconnect();
     * ```
     */
    private attemptToReconnect;
}
