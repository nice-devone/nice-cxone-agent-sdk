import { WebsocketClient, LoadWorker, WebsocketStatusCode, } from '@nice-devone/core-sdk';
import { CXoneLeaderElector, MessageBus, MessageType } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
const AUTHORIZED = 'authorized'; // message from server when websocket registration is successful
const PONG = 'pong'; // message from server when pong is received
const INTERVAL_TIMER = 5000; // setinterval time in milliseconds
const PENDING_PONG_DEFAULT_VALUE = 0; // default value of pending pong
const PENDING_PONG_MAX_VALUE = 5; // max value of pending pong
const PENDING_PONG_NOTIFY_VALUE = 4; // value of pending pong when we will notify user that we are trying to reconnect
const RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED';
/**
 * digital web socket Class also implements websocket client abstract methods
 */
export class CXoneDigitalWebsocket extends WebsocketClient {
    constructor() {
        super(...arguments);
        this.logger = new CcfLogger('SDK', 'CXoneDigitalWebsocket');
        this.auth = CXoneAuth.instance;
        this.maxReconnectAttempt = 10;
        this.retryIntervalInMs = 6000;
        this.heartBeatTimer = undefined; // to store the heartbeat (ping/pong) request timer
        this.internetCheckTimer = undefined; // to store the internet check timer
        this.pendingPong = PENDING_PONG_DEFAULT_VALUE;
        /**
         * used to send emitted websocket events data.
         */
        this.onMessageReceived = new Subject();
        /**
         * used for sending websocket connection status like success, error etc.
         */
        this.onWebSocketConnectionStatus = new Subject();
        /**
         *  Method to check the internet connection and handle the ping pong
         * @example - this.handleInternetDisruption();
         */
        this.handleInternetDisruption = () => {
            if (this.heartBeatTimer)
                clearInterval(this.heartBeatTimer); // if internet is not working then no need to send stale ping request
            if (this.internetCheckTimer)
                clearInterval(this.internetCheckTimer); // before starting the internet check we should clear the previous internet check timer
            // will start the internet connection check 
            this.internetCheckTimer = setInterval(() => {
                if (navigator === null || navigator === void 0 ? void 0 : navigator.onLine) { // if internet is working then we will stop the internet check and start the heartbeat check
                    this.checkWssHeartBeat(INTERVAL_TIMER);
                    clearInterval(this.internetCheckTimer);
                }
            }, INTERVAL_TIMER);
        };
    }
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const cxoneDigitalWebsocket = CXoneDigitalWebsocket.instance;
     * ```
     */
    static get instance() {
        if (!CXoneDigitalWebsocket.cxoneDigitalWebsocket) {
            CXoneDigitalWebsocket.cxoneDigitalWebsocket = new CXoneDigitalWebsocket();
        }
        return CXoneDigitalWebsocket.cxoneDigitalWebsocket;
    }
    /**
     * Used to open the webSocket data
     * @example -
     * ```
     * startWebSocket();
     * @param heartBeatIntervalMilliSec - time in milliseconds(Default = 5000 miliseconds)
     * ```
     */
    startWebSocket() {
        var _a, _b;
        this.logger.info('startWebSocket', 'startWebSocket in CXoneDigitalWebsocket ');
        const wssUri = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getCXoneConfig().dfoWssUri;
        const authToken = (_b = this.auth) === null || _b === void 0 ? void 0 : _b.getAuthToken().accessToken;
        this.terminateWebSocketWorker();
        if (wssUri && authToken && !this.wssWorker) {
            this.initWebSocketWorker();
            this.wssWorker.onmessage = (response) => {
                this.checkWSEvent(response.data);
            };
            this.connect(wssUri, this.wssWorker);
        }
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
        this.wssWorker = loader.getWorker('ws-worker', 'ccf-digital-wss-worker');
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
            this.wssWorker = undefined;
        }
    }
    /**
     * Use to attempt to reconnect to the web socket worker
     * @example
     * ```
     * this.attemptToReconnect();
     * ```
     */
    attemptToReconnect(retryOptions) {
        var _a;
        const wssUri = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getCXoneConfig().dfoWssUri;
        this.attemptReconnect({
            retryOptions: retryOptions ? retryOptions : {
                retryIntervalInMs: this.retryIntervalInMs,
                maxRetryAttempts: this.maxReconnectAttempt,
            },
            url: wssUri,
        }, this.wssWorker);
    }
    /***
     * Callback method when a message received from websocket server
     *
     * @param msg -  message from server
     * @example - this.onMessage
     */
    onMessage(msg) {
        if (msg === null || msg === void 0 ? void 0 : msg.data) {
            if (CXoneLeaderElector.instance.isLeader) {
                const message = {
                    type: MessageType.DIGITAL_WEBSOCKET_RESPONSE,
                    data: msg,
                };
                MessageBus.instance.postResponse(message);
            }
            this.onMessageReceived.next(msg);
        }
        else {
            if (msg === AUTHORIZED) { // only when websocket registration is successful and we get 'authorized' message then only we will start the heartbeat check(ping pong)
                this.pendingPong = PENDING_PONG_DEFAULT_VALUE; // as soon as the connection is authorized we will reset the pendingPong count to 0
                this.checkWssHeartBeat(INTERVAL_TIMER);
            }
            if (msg === PONG) { // if we receive the pong successfully we will reduce the pendingPong count by 1
                if (this.pendingPong > PENDING_PONG_DEFAULT_VALUE)
                    this.pendingPong--;
            }
            if (msg === RATE_LIMIT_EXCEEDED) {
                this.onWebSocketConnectionStatus.next(WebsocketStatusCode.RECONNECT);
                // first retry attempt will be made after 30 seconds, then next after 1 minute, then 2 minutes of receiving this message
                this.attemptToReconnect({ retryIntervalInMs: 30000, maxRetryAttempts: 3 });
            }
        }
    }
    /**
     * Error callback method for websocket Subscription
     * @example - this.onError
     */
    onError() {
        this.onWebSocketConnectionStatus.next(WebsocketStatusCode.ERROR);
        this.onMessageReceived.next(['onError']);
    }
    /**
     * Completed callback method for websocket Subscription
     * @example - this.onClosed
     */
    onClosed() {
        if (this.heartBeatTimer)
            clearInterval(this.heartBeatTimer); // if connection is closed then in that case we should stopped the heartbeat check(ping/pong) request to avoid unnecessary hits without WS registration success
        if (this.internetCheckTimer)
            clearInterval(this.internetCheckTimer); // if connection is closed then in that case we should stopped the internet check request
        this.onMessageReceived.next(['onClosed']);
        this.attemptToReconnect();
        this.pendingPong = PENDING_PONG_DEFAULT_VALUE; // as soon as the connection is closed we will reset the pendingPong count to 0
    }
    /**
     * Callback method when a connection is ready to send and receive data
     * @example - this.onOpen
     */
    onOpen() {
        this.registerDigitalWebSocket();
        this.onMessageReceived.next(['onOpen']);
    }
    /**
     * Callback method when a ws reconnect attempts in progress
     * @param msg -  message from server
     * @example - this.onReconnect
     */
    onReconnect(msg) {
        this.onMessageReceived.next(msg);
    }
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete
     */
    onReconnectComplete() {
        //will inform the user that the reconnection attempt is completed but still not able to connect try after sometime
        this.onWebSocketConnectionStatus.next(WebsocketStatusCode.RECONNECT_UNSUCCESSFUL);
        this.onMessageReceived.next(['onReconnectcomplete']);
    }
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete
     */
    onReconnectSuccess() {
        //will inform the user that the reconnection attempt is successful and now you can start using the real time data
        this.onWebSocketConnectionStatus.next(WebsocketStatusCode.OK);
        this.onMessageReceived.next(['onReconnectSuccess']);
    }
    /**
     * Method to keep WSS connection alive
     * @example - this.checkWssHeartBeat
     */
    checkWssHeartBeat(heartBeatIntervalMilliSec) {
        if (this.heartBeatTimer)
            clearInterval(this.heartBeatTimer); // when in case of reconnect after disconnection we should clear out the previous running heartbeat timer and then start the new with the new connection object
        const action = { 'action': 'heartbeat' };
        this.heartBeatTimer = setInterval(() => {
            if (this.pendingPong < PENDING_PONG_MAX_VALUE) { // we will send the ping only if we have missed less than 3 consecutive pong
                // Heartbeat Timer runs & even comes back up for SLEEP mode scenario as well
                // So this interval need to be reviewed again if any network or internet usecase comes up again
                this.sendMessage(action, this.wssWorker);
                this.pendingPong++;
                if (!(navigator === null || navigator === void 0 ? void 0 : navigator.onLine)) { // if internet is not working then we will just reset the pendingPong count to 0 and start the internet check
                    this.handleInternetDisruption();
                    this.pendingPong = PENDING_PONG_DEFAULT_VALUE; // as soon as the internet is not working we will reset the pendingPong count to 0
                }
                else { // if internet is working and we still have missed pong then we let user know that we are trying to reconnect
                    if (this.pendingPong === PENDING_PONG_NOTIFY_VALUE)
                        this.onWebSocketConnectionStatus.next(WebsocketStatusCode.RECONNECT);
                }
            }
            else {
                if (this.heartBeatTimer)
                    clearInterval(this.heartBeatTimer); // on more than 3 pong miss we will stop sending ping
                // this.close(this.wssWorker); // and also we will close the connection
                this.attemptToReconnect();
            }
        }, heartBeatIntervalMilliSec);
    }
    /**
     * Method to broadcast websocket data to non-leader tab
     * @example - this.broadcastWsData
     */
    broadcastWsData(msg) {
        this.onMessageReceived.next(msg);
    }
    /**
     * Method to registerDigitalWebSocket
     * @example - this.registerDigitalWebSocket
     */
    registerDigitalWebSocket() {
        var _a, _b;
        if (!((_a = this.auth) === null || _a === void 0 ? void 0 : _a.isTokenExpired())) {
            const accessToken = (_b = this.auth) === null || _b === void 0 ? void 0 : _b.getAuthToken().accessToken;
            if (accessToken) {
                const action = {
                    'action': 'register',
                    'payload': {
                        'token': accessToken,
                    },
                };
                this.sendMessage(action, this.wssWorker);
            }
        }
        else {
            this.logger.error('registerDigitalWebSocket', 'Unable to register WebSocket due to Expired Token');
        }
    }
}
//# sourceMappingURL=cxone-digital-websocket.js.map