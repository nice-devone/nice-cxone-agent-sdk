import { WsReconnectInfo, WsResponse, WsReconnectResponse } from '@nice-devone/common-sdk';
/**
 * This is a base class to implement websocket
 */
export declare abstract class WebsocketClient {
    /**
     * This function used to make connection with websocket server
     *
     * @param  websocketServer  - websocket url
     * @example
     *
     * ```
     * connect('ws://localhost:8089');
     * ```
     */
    connect(websocketUrl: string, wsWorker?: any): void;
    /**
     * This function used to close connection with websocket server
     *
     * @example
     *
     * ```
     * close();
     * ```
    */
    close(wsWorker?: any): void;
    /**
     * @example
     *
     * ```
     * attemptReconnect({reconnectInterval: 300, reconnectAttempts:4});
     * ```
     * @param  reconnectInfo - reconnectIntervalInMs in millisecond, maxReconnectAttempts in number and ws url
     *
    */
    attemptReconnect(reconnectInfo: WsReconnectInfo, wsWorker?: any): void;
    /**
     * Method to send to websocket worker
     * @param msg - message send to websocket
     * @example
     * ```
     * sendMessage('hi');
     * ```
     */
    sendMessage(msg: unknown, wsWorker: any): void;
    /**
     * Callback method when a message received from websocket server
     *
     * @param msg -  message from server
     */
    protected abstract onMessage(msg: any): void;
    /**
     * Error callback method for websocket Subscription
     */
    protected abstract onError(): void;
    /**
     * Completed callback method for websocket Subscription
     */
    protected abstract onClosed(): void;
    /**
     * Callback method when a connection is ready to send and receive data
    */
    protected abstract onOpen(): void;
    /**
   * Callback method when a ws reconnect attempts in progress
  */
    protected abstract onReconnect(msg?: WsReconnectResponse): void;
    /**
     * Callback method when a ws reconnect attempts are completed
    */
    protected abstract onReconnectComplete(): void;
    /**
     * Callback method when a ws reconnect attempts was successful
     * @example - this.onReconnectSuccess()
    */
    protected onReconnectSuccess(): void;
    /**
     * This method to perform the different actions on callback response
     * @param event - ws response
     * @example
     * ```
     * checkWSEvent(event);
     * ```
     */
    checkWSEvent(wsResponse: WsResponse): void;
}
