import { DynamicDirectoyMessage, WsRequest } from '@nice-devone/common-sdk';
/**
 * This is the base class for WebSocket Service
 */
export declare class WSService {
    private auth;
    /**
     * Create instance for websocket service
     * @example
     * ```
     * new WSService();
     * ```
     */
    constructor();
    /**
     * Method used to get connection message with access token
     * @example
     * ```
     * this.getConnectionMessage('heartbeat');
     * ```
     * @returns - return the websocket request
     */
    getConnectionMessage(type: string): WsRequest;
    /**
     * Method used to get subscribe message with subscriptionId
     * @example
     * ```
     * getSubscriptionMessage(subscriptionId);
     * ```
     * @returns - return the websocket subscription request
     */
    getSubscriptionMessage(subscriptionId: string): WsRequest;
    /**
     * Method used to get unsubscribe from web socket
     * @example
     * ```
     * getUnsubscribeMessage(subscriptionId);
     * ```
     * @returns - return the websocket unsubscribe request
     */
    getUnsubscribeMessage(subscriptionId: string): WsRequest;
    /**
     * Method used to get reconnected message with access token
     * @example
     * ```
     * getReconnectedMessage();
     * ```
     * @returns - return the websocket request
     */
    getReconnectedMessage(): DynamicDirectoyMessage;
    /**
     * Method used to get connected message
     * @example
     * ```
     * getConnectedMessage();
     * ```
     * @returns - return the websocket request
     */
    getConnectedMessage(): DynamicDirectoyMessage;
    /**
     * Method used to get error message with error message
     * @example
     * ```
     * getErrorMessage('error message');
     * ```
     * @returns - return the error message
     */
    getErrorMessage(errorMessage: string): DynamicDirectoyMessage;
}
