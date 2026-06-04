import { WebsocketClient } from '@nice-devone/core-sdk';
import { WsReconnectResponse } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
 * digital web socket Class also implements websocket client abstract methods
 */
export declare class CXoneDigitalWebsocket extends WebsocketClient {
    static cxoneDigitalWebsocket: CXoneDigitalWebsocket;
    private logger;
    wssWorker: any;
    auth: CXoneAuth;
    private maxReconnectAttempt;
    private retryIntervalInMs;
    private heartBeatTimer;
    private internetCheckTimer;
    private pendingPong;
    /**
     * used to send emitted websocket events data.
     */
    onMessageReceived: Subject<any>;
    /**
     * used for sending websocket connection status like success, error etc.
     */
    onWebSocketConnectionStatus: Subject<any>;
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const cxoneDigitalWebsocket = CXoneDigitalWebsocket.instance;
     * ```
     */
    static get instance(): CXoneDigitalWebsocket;
    /**
     * Used to open the webSocket data
     * @example -
     * ```
     * startWebSocket();
     * @param heartBeatIntervalMilliSec - time in milliseconds(Default = 5000 miliseconds)
     * ```
     */
    startWebSocket(): void;
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
     * @example
     * ```
     * this.initWebSocketWorker();
     * ```
     */
    private initWebSocketWorker;
    /**
     * Use to terminate the web socket worker
     * @example
     * ```
     * this.terminateWebSocketWorker();
     * ```
     */
    terminateWebSocketWorker(): void;
    /**
     * Use to attempt to reconnect to the web socket worker
     * @example
     * ```
     * this.attemptToReconnect();
     * ```
     */
    private attemptToReconnect;
    /***
     * Callback method when a message received from websocket server
     *
     * @param msg -  message from server
     * @example - this.onMessage
     */
    protected onMessage(msg: any): void;
    /**
     * Error callback method for websocket Subscription
     * @example - this.onError
     */
    protected onError(): void;
    /**
     * Completed callback method for websocket Subscription
     * @example - this.onClosed
     */
    protected onClosed(): void;
    /**
     * Callback method when a connection is ready to send and receive data
     * @example - this.onOpen
     */
    protected onOpen(): void;
    /**
     * Callback method when a ws reconnect attempts in progress
     * @param msg -  message from server
     * @example - this.onReconnect
     */
    protected onReconnect(msg?: WsReconnectResponse): void;
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete
     */
    protected onReconnectComplete(): void;
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete
     */
    protected onReconnectSuccess(): void;
    /**
     * Method to keep WSS connection alive
     * @example - this.checkWssHeartBeat
     */
    private checkWssHeartBeat;
    /**
     *  Method to check the internet connection and handle the ping pong
     * @example - this.handleInternetDisruption();
     */
    handleInternetDisruption: () => void;
    /**
     * Method to broadcast websocket data to non-leader tab
     * @example - this.broadcastWsData
     */
    broadcastWsData(msg: any): void;
    /**
     * Method to registerDigitalWebSocket
     * @example - this.registerDigitalWebSocket
     */
    private registerDigitalWebSocket;
}
