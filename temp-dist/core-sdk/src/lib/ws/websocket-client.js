import { WSEventType } from './enum/ws-event-type';
/**
 * This is a base class to implement websocket
 */
export class WebsocketClient {
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
    connect(websocketUrl, wsWorker) {
        wsWorker.postMessage({
            type: 'connect',
            websocketUrl: websocketUrl,
        });
    }
    /**
     * This function used to close connection with websocket server
     *
     * @example
     *
     * ```
     * close();
     * ```
    */
    close(wsWorker) {
        wsWorker.postMessage({ type: 'close' });
    }
    /**
     * @example
     *
     * ```
     * attemptReconnect({reconnectInterval: 300, reconnectAttempts:4});
     * ```
     * @param  reconnectInfo - reconnectIntervalInMs in millisecond, maxReconnectAttempts in number and ws url
     *
    */
    attemptReconnect(reconnectInfo, wsWorker) {
        wsWorker.postMessage({ type: 'attemptReconnect',
            reconnectInfo: reconnectInfo,
            isConnectionOpen: false,
        });
    }
    /**
     * Method to send to websocket worker
     * @param msg - message send to websocket
     * @example
     * ```
     * sendMessage('hi');
     * ```
     */
    sendMessage(msg, wsWorker) {
        wsWorker.postMessage({ type: 'send', msg: msg });
    }
    /**
     * Callback method when a ws reconnect attempts was successful
     * @example - this.onReconnectSuccess()
    */
    onReconnectSuccess() {
        //class which extends this class can implement this method
    }
    ;
    /**
     * This method to perform the different actions on callback response
     * @param event - ws response
     * @example
     * ```
     * checkWSEvent(event);
     * ```
     */
    checkWSEvent(wsResponse) {
        const message = (wsResponse === null || wsResponse === void 0 ? void 0 : wsResponse.message) ? wsResponse === null || wsResponse === void 0 ? void 0 : wsResponse.message : null;
        switch (wsResponse.type) {
            case WSEventType.ERROR: {
                this.onError();
                break;
            }
            case WSEventType.OPEN: {
                this.onOpen();
                break;
            }
            case WSEventType.MESSAGE: {
                this.onMessage(message);
                break;
            }
            case WSEventType.RECONNECT: {
                this.onReconnect(message);
                break;
            }
            case WSEventType.RECONNECT_COMPLETE: {
                this.onReconnectComplete();
                break;
            }
            case WSEventType.RECONNECT_SUCCESS: {
                this.onReconnectSuccess();
                break;
            }
            case WSEventType.CLOSE: {
                this.onClosed();
                break;
            }
        }
    }
}
//# sourceMappingURL=websocket-client.js.map