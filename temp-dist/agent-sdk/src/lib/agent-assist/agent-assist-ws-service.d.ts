import { Subject } from 'rxjs';
import { AgentAssistBaseResponse, AgentAssistWSRequest } from '@nice-devone/common-sdk';
import { AgentAssistInput } from './agent-assist-notification-service';
import { AgentAssistProcessorService } from './agent-assist-processor-service';
import { Logger, WebsocketClient } from '@nice-devone/core-sdk';
/**
 * web socket class for agent assist
 */
export declare class AgentAssistWSService extends WebsocketClient {
    wssWorker: any;
    connectionId: string;
    WS_INTERVAL_HEARTBEAT: number;
    private serviceName;
    private hearbeatTimer;
    private hearbeatSubscription;
    isWSConnected: boolean;
    onMessageNotification: Subject<AgentAssistBaseResponse>;
    agentAssistProcessorService: AgentAssistProcessorService;
    logger: Logger;
    /**
     * constructor for AgentAssistWSService
     * @example - new AgentAssistWSService();
     */
    constructor();
    /**
     * load feature toggles with Feature toggle service
     * @example
     * ```
     * this.loadFeatureToggles();
     * ```
     */
    loadFeatureToggles(): Promise<void>;
    /**
     * used to register subscription to the agentAssistGetNextEventSubject for getting the AgentAssist getnext event
     * @example -
     * ```
     * this.registerAgentAssistGetNextSubject();
     * ```
     */
    registerAgentAssistGetNextSubject(): Promise<void>;
    /**
     * used to register subscription to the agentAssistWSSubject for connect and subscribe to websocket
     * @example -
     * ```
     * this.registerWebSocketConnectionRequest();
     * ```
     */
    registerWebSocketConnectionRequest(): Promise<void>;
    /**
     * used to register subscription to the websocket onMessageNotification subject
     * @example -
     * ```
     * this.registerWebSocketOnMessageNotification();
     * ```
     */
    registerWebSocketOnMessageNotification(): void;
    /**
     * used to register subscription to the agentAssistWebSocketUnsubsribeSubject for unsubscribing topics for a contact Id
     * @example -
     * ```
     * this.registerWebSocketCloseRequest();
     * ```
     */
    registerWebSocketCloseRequest(): Promise<void>;
    /**
     * used to connect to the socket.
     * @param websocketServerUri - websocketServer uri
     * @example -
     * ```
     * this.connect('ws://localhost:8080');
     * ```
     */
    connect(websocketServerUri: string): void;
    /**
     * Subscribe to websocket topic
     * @param topic - topic to subscribe
     * @example -
     * ```
     * this.subscribe('topic');
     * ```
     */
    subscribe(agentAssistWSInput: AgentAssistInput): boolean;
    /**
     * used to send heart beat to websocket
     * @example -
     * ```
     * this.sendHeartbeat();
     * ```
    */
    sendHeartbeat(): void;
    /**
     * unsubscribe from websocket for a contact Id
     * @param contactId - contact Id
     * @param getNextDataForContactId - get next data for contact Id
     * @example -
     * ```
     * this.unsubscribeFromWebSocketForContactId(contactId);
     * ```
     */
    unsubscribeFromWebSocketForContactId(contactId: string, getNextDataForContactId: AgentAssistWSRequest[]): void;
    /**
     * on websocket message received
     * @param message - message
     * @example -  this.onMessage(message);
     */
    onMessage(message: any): void;
    /**
     * method to parse the response
     * @param response - response
     * @example -
     * ```
     * this.parse(response);
     * ```
     */
    parse(response: any): AgentAssistBaseResponse;
    /**
     * used to broadcast the acp messages to other tabs.
     * @param message - message to broadcast
     * @example
     *```
     * this.broadcastWSMessage(message);
     * ```
     */
    broadcastWSMessage(message: any): void;
    /**
     * generate topic for WebSocket for given provider ws input
     * @param agentAssistWSInput - agent assist WebSocket input
     * @example
     * ```
     * const topic = this.generateTopicForProvider(agentAssistWSInput);
     * ```
     */
    private generateTopicForProvider;
    /**
     * Use to close the web socket
     * @example
     * ```
     * this.closeWebsocket();
     * ```
    */
    closeWebsocket(): void;
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
     * @example -  unsubscribeAllActiveTopicsFromtWebsocket();
    */
    resubscribeAllActiveTopicsToWebSocket(): Promise<void>;
    /**
     * callback for when the socket closed.
     * @example
     * ```
     * onClosed();
     * ```
    */
    onClosed(): void;
    /**
     * Use to attempt to reconnect and resubscribe active topics to the web socket worker
     * @example
     * ```
     * this.attemptToReSubscribe();
     * ```
    */
    attemptToReSubscribe(): void;
    /**
     * callback for when error received
     * ```
     * @example -  onError();
     * ```
    */
    onError(): void;
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
     * @example
     * ```
     * this.initWebSocketWorker();
     * ```
     */
    protected initWebSocketWorker(workerName: string): void;
    /**
     * Use to initializing the logger
    * @param className -  name of class for logger
    * @example
    * ```
    * this.initLogger('agent-assist');
    * ```
    */
    protected initLogger(className: string): void;
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
}
