import { Subject } from 'rxjs';
import { WebsocketClient, Logger } from '@nice-devone/core-sdk';
import { AutoSummaryBroadcastData } from '@nice-devone/common-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
 *  web socket class for auto summary
 */
export declare class AutoSummaryService extends WebsocketClient {
    IsSubscribeDummyResponse: boolean;
    private WS_INTERVAL_HEARTBEAT;
    private hearbeatTimer;
    private hearbeatSubscription;
    auth: CXoneAuth;
    wssWorker: any;
    private contactId;
    private connectionId;
    private websocketUri;
    private subscriptions;
    private autoSummaryInput;
    logger: Logger;
    /**
     * used to send emitted websocket events data.
    */
    onAutoSummaryReceived: Subject<AutoSummaryBroadcastData>;
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
    subscribe(autoSummaryInput: {
        webSocketUri: string;
        contactId: string;
        subscriptions: string[];
    }): void;
    /**
     * used to unsubscribe events and clear props.
     * @example -  close()
    */
    close(): void;
    /**
     * used to broadcast the message to other tabs.
     * @example -  broadcastAutoSummary();
     * @param message - message to broadcast
    */
    broadcastAutoSummary(message: any): void;
    /**
     * used to connect to the socket.
     * @example -  connect();
     * @param websocketServerUri - websocketServer uri
    */
    connect(websocketServerUri: string): boolean;
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
     * used to send heart beat to socket.
     * @example -  sendHeartbeat();
    */
    protected sendHeartbeat(): void;
    /**
     * callback for when message received
     * @example -  onMessage(msg);
     * @param message - Response Message
    */
    protected onMessage(responseMessage: any): void;
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
    private initWebSocketWorker;
    /**
     * Use to attempt to reconnect to the web socket worker
     * @example
     * ```
     * this.attemptToReconnect();
     * ```
     */
    private attemptToReconnect;
}
