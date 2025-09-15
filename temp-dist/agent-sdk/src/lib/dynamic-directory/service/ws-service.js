import { CXoneAuth } from '@nice-devone/auth-sdk';
import { WSCommand } from '@nice-devone/common-sdk';
/**
 * This is the base class for WebSocket Service
 */
export class WSService {
    /**
     * Create instance for websocket service
     * @example
     * ```
     * new WSService();
     * ```
     */
    constructor() {
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method used to get connection message with access token
     * @example
     * ```
     * this.getConnectionMessage('heartbeat');
     * ```
     * @returns - return the websocket request
     */
    getConnectionMessage(type) {
        const authToken = this.auth.getAuthToken().accessToken;
        let command;
        if (type === 'heartbeat') {
            command = WSCommand.HEARTBEAT;
        }
        else if (type === 'connect') {
            command = WSCommand.CONNECT;
        }
        const msg = {
            command: command,
            headers: {
                sessionToken: 'bearer ' + authToken,
            },
            body: {},
        };
        return msg;
    }
    /**
     * Method used to get subscribe message with subscriptionId
     * @example
     * ```
     * getSubscriptionMessage(subscriptionId);
     * ```
     * @returns - return the websocket subscription request
     */
    getSubscriptionMessage(subscriptionId) {
        const authToken = this.auth.getAuthToken().accessToken;
        const msg = {
            command: 'SUBSCRIBE',
            headers: {
                sessionToken: 'bearer ' + authToken,
            },
            body: {
                topic: subscriptionId,
            },
        };
        return msg;
    }
    /**
     * Method used to get unsubscribe from web socket
     * @example
     * ```
     * getUnsubscribeMessage(subscriptionId);
     * ```
     * @returns - return the websocket unsubscribe request
     */
    getUnsubscribeMessage(subscriptionId) {
        const authToken = this.auth.getAuthToken().accessToken;
        const msg = {
            command: 'UNSUBSCRIBE',
            headers: {
                sessionToken: 'bearer ' + authToken,
            },
            body: {
                topic: subscriptionId,
            },
        };
        return msg;
    }
    /**
     * Method used to get reconnected message with access token
     * @example
     * ```
     * getReconnectedMessage();
     * ```
     * @returns - return the websocket request
     */
    getReconnectedMessage() {
        const msg = {
            command: 'RECONNECTED',
            headers: {
                connectionId: '',
            },
            body: {},
        };
        return msg;
    }
    /**
     * Method used to get connected message
     * @example
     * ```
     * getConnectedMessage();
     * ```
     * @returns - return the websocket request
     */
    getConnectedMessage() {
        const msg = {
            command: 'CONNECTED',
            headers: {
                connectionId: '',
            },
            body: {},
        };
        return msg;
    }
    /**
     * Method used to get error message with error message
     * @example
     * ```
     * getErrorMessage('error message');
     * ```
     * @returns - return the error message
     */
    getErrorMessage(errorMessage) {
        const msg = {
            command: 'ERROR',
            headers: {
                connectionId: '',
            },
            body: {
                error: errorMessage,
            },
        };
        return msg;
    }
}
//# sourceMappingURL=ws-service.js.map