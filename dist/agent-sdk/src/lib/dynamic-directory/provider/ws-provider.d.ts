import { DynamicDirectoyMessage, WsReconnectResponse } from '@nice-devone/common-sdk';
import { WebsocketClient } from '@nice-devone/core-sdk';
import { CXoneDynamicDirectory } from '../cxone-dynamic-directory';
/**
 * This is the base class for WSProvider
 */
export declare class WSProvider extends WebsocketClient {
    wsWorker: any;
    private logger;
    private wsService;
    private heartbeatTimer;
    private connected;
    private dynamicDirectory;
    private auth;
    private subscribed;
    /**
     * Create instance for dynamic directory WSProvider
     * @param directory - Instance of CXoneDynamicDirectory class
     * @example
     * ```
     * new WSProvider(CXoneDynamicDirectory);
     * ```
     */
    constructor(directory: CXoneDynamicDirectory);
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
     * @example
     * ```
     * this.initAgentStateSocketWorker();
     * ```
     */
    initAgentStateSocketWorker(): any;
    /**
     * Use to close the web socket worker
     * @example
     * ```
     * this.close();
     * ```
     */
    close(): void;
    /**
     * Use to start heartbeat comment for websocket
     * @example
     * ```
     * this.runHeartbeat();
     * ```
     */
    private runHeartbeat;
    /**
     * Method used to receive message from WebSocket
     * @param msg - WebSocket Messages exchange format
     * @example
     * ```
     * onMessage(msg);
     * ```
     */
    protected onMessage(msg: DynamicDirectoyMessage): DynamicDirectoyMessage;
    /**
     * Method used to receive the WebSocket Error and ReConnect the WebSocket
     * @example
     * ```
     * onError();
     * ```
     */
    protected onError(): void;
    /**
     * Used to receive WebSocket connection closed
     * @example
     * ```
     * onClosed();
     * ```
     */
    protected onClosed(): void;
    /**
     * Method used to send message websocket worker
     * @example
     * ```
     * onOpen();
     * ```
     */
    protected onOpen(): void;
    /**
     * Method used to reconnect the WebSocket
     * @param msg - Websocket Reconnect response
     * @example
     * ```
     * onReconnect(msg);
     * ```
     */
    protected onReconnect(msg?: WsReconnectResponse): void;
    /**
     * Method used to receive ws reconnect attempts are completed
     * @example
     * ```
     * onReconnectComplete();
     * ```
     */
    protected onReconnectComplete(): void;
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    connectSocket(): void;
    /**
     * Use to subscribe to search results
     * @example
     * ```
     * this.subscribeSearch(subscriptionId);
     * ```
     */
    subscribeSearch(subscriptionId: string): void;
    /**
     * Use to unsubscribe from websocket
     * @example
     * ```
     * this.unsubscribeSearch(subscriptionID);
     * ```
     */
    unsubscribeSearch(subscriptionId: string): void;
}
