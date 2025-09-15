import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject, timer } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CXoneLeaderElector, MessageBus, MessageType, AgentAssistWSMessageResponse, AgentAssistUnsubscribe, AgentAssistHeartbeat, RtigTopic, AgentAssistConnect, } from '@nice-devone/common-sdk';
import { AgentAssistProcessorService } from './agent-assist-processor-service';
import { ACDSessionManager, LoadWorker, Logger, WebsocketClient } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../feature-toggle';
const agentAssistFeatureToggle = 'release-aah-cx1-native-support-aai-19195';
/**
 * web socket class for agent assist
 */
export class AgentAssistWSService extends WebsocketClient {
    /**
     * constructor for AgentAssistWSService
     * @example - new AgentAssistWSService();
     */
    constructor() {
        super();
        this.connectionId = '';
        this.WS_INTERVAL_HEARTBEAT = 10000;
        this.serviceName = 'agent-assist';
        this.isWSConnected = false;
        this.onMessageNotification = new Subject();
        this.agentAssistProcessorService = {};
        this.initLogger(this.serviceName);
        this.loadFeatureToggles();
        this.agentAssistProcessorService = new AgentAssistProcessorService();
        this.registerAgentAssistGetNextSubject();
        this.registerWebSocketConnectionRequest();
        this.registerWebSocketOnMessageNotification();
        this.registerWebSocketCloseRequest();
    }
    /**
     * load feature toggles with Feature toggle service
     * @example
     * ```
     * this.loadFeatureToggles();
     * ```
     */
    loadFeatureToggles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield FeatureToggleService.instance.loadFeatures();
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('loadFeatureToggles', error.message);
                }
            }
        });
    }
    /**
     * used to register subscription to the agentAssistGetNextEventSubject for getting the AgentAssist getnext event
     * @example -
     * ```
     * this.registerAgentAssistGetNextSubject();
     * ```
     */
    registerAgentAssistGetNextSubject() {
        return __awaiter(this, void 0, void 0, function* () {
            ACDSessionManager.instance.agentAssistGetNextEventSubject.subscribe((event) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                if (event) {
                    const agentAssistJson = JSON.parse(((_a = event === null || event === void 0 ? void 0 : event.allParams) === null || _a === void 0 ? void 0 : _a.AgentAssistAppConfigJson) || '{}');
                    const contactId = (_b = event === null || event === void 0 ? void 0 : event.allParams) === null || _b === void 0 ? void 0 : _b.ContactId;
                    const isAgentAssistAppEnabled = yield FeatureToggleService.instance.getFeatureToggle(agentAssistFeatureToggle);
                    if (isAgentAssistAppEnabled && contactId && agentAssistJson && (((_c = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _c === void 0 ? void 0 : _c.providerId) === 'ccai' || ((_d = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _d === void 0 ? void 0 : _d.providerId) === 'rtig')) {
                        if (typeof agentAssistJson.WebSocketUri === 'string' && agentAssistJson.WebSocketUri) {
                            const agentAssistWSStart = { webSocketUri: agentAssistJson.WebSocketUri, contactId: contactId, subscriptions: agentAssistJson.Subscriptions, providerId: (_e = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _e === void 0 ? void 0 : _e.providerId };
                            // break here as we are not handling custom URL in CCAI in this release
                            if (((_f = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _f === void 0 ? void 0 : _f.providerId) === 'ccai') {
                                if ((_g = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _g === void 0 ? void 0 : _g.customAppURL) {
                                    return;
                                }
                            }
                            // if 'Hide RTIG' is true, we should not show RTIG panel
                            if (((_h = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _h === void 0 ? void 0 : _h.providerId) === 'rtig') {
                                if ((_j = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _j === void 0 ? void 0 : _j.isHidden) {
                                    return;
                                }
                                const metaDataRtig = {
                                    contactId: contactId,
                                    rtigMetricConfigs: (_k = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _k === void 0 ? void 0 : _k.enlightenModels,
                                    configType: (_m = (_l = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _l === void 0 ? void 0 : _l.configType) === null || _m === void 0 ? void 0 : _m.toLowerCase(),
                                };
                                agentAssistWSStart.metadata = metaDataRtig;
                            }
                            ACDSessionManager.instance.agentAssistWSSubject.next(agentAssistWSStart);
                        }
                    }
                    else {
                        // this subject is used to show agent assist app in new tabs the old existing way
                        ACDSessionManager.instance.agentAssistSubject.next(event);
                    }
                }
            }));
        });
    }
    /**
     * used to register subscription to the agentAssistWSSubject for connect and subscribe to websocket
     * @example -
     * ```
     * this.registerWebSocketConnectionRequest();
     * ```
     */
    registerWebSocketConnectionRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            ACDSessionManager.instance.agentAssistWSSubject.subscribe((resp) => __awaiter(this, void 0, void 0, function* () {
                if (resp) {
                    try {
                        this.initWebSocketWorker(this.serviceName);
                        this.connect(resp.webSocketUri);
                        this.subscribe(resp);
                        // save getnext event data in index db, if not already exists for that contact Id
                        const { setAgentAssistGetNextInIndexDb } = this.agentAssistProcessorService;
                        setAgentAssistGetNextInIndexDb && setAgentAssistGetNextInIndexDb(resp);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            this.logger.error('registerWebSocketConnectionRequest', error.message);
                        }
                    }
                }
            }));
        });
    }
    /**
     * used to register subscription to the websocket onMessageNotification subject
     * @example -
     * ```
     * this.registerWebSocketOnMessageNotification();
     * ```
     */
    registerWebSocketOnMessageNotification() {
        this.onMessageNotification.subscribe(resp => {
            var _a, _b, _c;
            if (resp.command == AgentAssistCommand.message) {
                if ('topic' in resp.body) {
                    if (resp.body.topic === RtigTopic.RTG_UPDATES || resp.body.topic === RtigTopic.RTG_NOTIFICATIONS) {
                        this.agentAssistProcessorService.processRTIGWebSocketMessages(resp.body);
                    }
                    else {
                        if ((_a = resp === null || resp === void 0 ? void 0 : resp.body) === null || _a === void 0 ? void 0 : _a.data) {
                            const newMessage = JSON.parse((_b = resp === null || resp === void 0 ? void 0 : resp.body) === null || _b === void 0 ? void 0 : _b.data);
                            if (newMessage && ((_c = newMessage === null || newMessage === void 0 ? void 0 : newMessage.suggestionResults) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                                this.agentAssistProcessorService.processCCAIWebSocketMessages(resp, newMessage);
                            }
                        }
                    }
                }
            }
        });
    }
    /**
     * used to register subscription to the agentAssistWebSocketUnsubsribeSubject for unsubscribing topics for a contact Id
     * @example -
     * ```
     * this.registerWebSocketCloseRequest();
     * ```
     */
    registerWebSocketCloseRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            ACDSessionManager.instance.agentAssistWebSocketUnsubsribeSubject.subscribe((respContactId) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (respContactId) {
                    try {
                        const isAgentAssistAppEnabled = yield FeatureToggleService.instance.getFeatureToggle(agentAssistFeatureToggle);
                        if (isAgentAssistAppEnabled) {
                            const getNextDataForContactId = yield this.agentAssistProcessorService.getAgentAssistGetNextForContactIdFromIndexDb(respContactId);
                            if (getNextDataForContactId) {
                                this.unsubscribeFromWebSocketForContactId(respContactId, getNextDataForContactId);
                                yield this.agentAssistProcessorService.removeAgentAssistGetNextForContactIdFromIndexDb(respContactId);
                            }
                            const activeTopicsContacts = yield this.agentAssistProcessorService.getAllAgentAssistGetNextFromIndexDb();
                            if (activeTopicsContacts.length == 0) {
                                (_a = this.hearbeatSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                                this.closeWebsocket();
                            }
                        }
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            this.logger.error('registerWebSocketCloseRequest', error.message);
                        }
                    }
                }
            }));
        });
    }
    /**
     * used to connect to the socket.
     * @param websocketServerUri - websocketServer uri
     * @example -
     * ```
     * this.connect('ws://localhost:8080');
     * ```
     */
    connect(websocketServerUri) {
        if (this.isWSConnected) {
            return;
        }
        if (this.wssWorker) {
            super.connect(websocketServerUri, this.wssWorker);
            const cxoneToken = CXoneAuth.instance.getAuthToken().accessToken;
            const req = new AgentAssistConnect(cxoneToken);
            this.sendMessage(req, this.wssWorker);
            this.logger.info('Connect', 'Connecting to WebSocket for Agent Assist');
            this.isWSConnected = true;
        }
    }
    /**
     * Subscribe to websocket topic
     * @param topic - topic to subscribe
     * @example -
     * ```
     * this.subscribe('topic');
     * ```
     */
    subscribe(agentAssistWSInput) {
        if (this.isWSConnected && this.wssWorker) {
            const currentTopic = this.generateTopicForProvider(agentAssistWSInput);
            const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
            const req = new AgentAssistSubscribe(accessToken, currentTopic);
            this.sendMessage(req, this.wssWorker);
        }
        return true;
    }
    /**
     * used to send heart beat to websocket
     * @example -
     * ```
     * this.sendHeartbeat();
     * ```
    */
    sendHeartbeat() {
        if (this.wssWorker) {
            const cxoneToken = CXoneAuth.instance.getAuthToken().accessToken;
            const req = new AgentAssistHeartbeat(cxoneToken);
            this.sendMessage(req, this.wssWorker);
        }
    }
    /**
     * unsubscribe from websocket for a contact Id
     * @param contactId - contact Id
     * @param getNextDataForContactId - get next data for contact Id
     * @example -
     * ```
     * this.unsubscribeFromWebSocketForContactId(contactId);
     * ```
     */
    unsubscribeFromWebSocketForContactId(contactId, getNextDataForContactId) {
        const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
        if (this.wssWorker && getNextDataForContactId) {
            getNextDataForContactId.forEach((data) => {
                const topic = this.generateTopicForProvider(data);
                const req = new AgentAssistUnsubscribe(accessToken, topic);
                this.sendMessage(req, this.wssWorker);
                this.agentAssistProcessorService.removeInMemoryDataForContactId(contactId);
            });
        }
    }
    /**
     * on websocket message received
     * @param message - message
     * @example -  this.onMessage(message);
     */
    onMessage(message) {
        var _a, _b;
        const msgResponse = this.parse(message);
        switch (msgResponse.command) {
            case AgentAssistCommand.connected:
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    if (msgResponse.command === AgentAssistCommand.connected) {
                        (_a = this.hearbeatSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                        this.hearbeatTimer = timer(this.WS_INTERVAL_HEARTBEAT, this.WS_INTERVAL_HEARTBEAT);
                        this.hearbeatSubscription = this.hearbeatTimer.subscribe(() => this.sendHeartbeat());
                        this.connectionId = (_b = msgResponse === null || msgResponse === void 0 ? void 0 : msgResponse.headers) === null || _b === void 0 ? void 0 : _b.connectionId;
                    }
                    const postResponseMessage = {
                        type: MessageType.AGENT_ASSIST_WS_RESPONSE,
                        data: message,
                    };
                    if (CXoneLeaderElector.instance.isLeader) {
                        this.onMessageNotification.next(msgResponse);
                        MessageBus.instance.postResponse(postResponseMessage);
                    }
                }
                break;
            case AgentAssistCommand.unsubscribed:
                break;
            case AgentAssistCommand.error:
                this.onError();
                break;
            default:
                break;
        }
    }
    /**
     * method to parse the response
     * @param response - response
     * @example -
     * ```
     * this.parse(response);
     * ```
     */
    parse(response) {
        switch (response === null || response === void 0 ? void 0 : response.command) {
            case AgentAssistCommand.connected:
                return new AgentAssistConnectedResponse(response === null || response === void 0 ? void 0 : response.headers);
            case AgentAssistCommand.subscribed:
                return new AgentAssistSubscribedResponse(response === null || response === void 0 ? void 0 : response.headers, response === null || response === void 0 ? void 0 : response.body);
            case AgentAssistCommand.error:
                return new AgentAssistErrorResponse(response === null || response === void 0 ? void 0 : response.headers, response === null || response === void 0 ? void 0 : response.body);
            case AgentAssistCommand.message:
                return new AgentAssistWSMessageResponse(response === null || response === void 0 ? void 0 : response.headers, response === null || response === void 0 ? void 0 : response.body);
            default:
                return { command: response === null || response === void 0 ? void 0 : response.command, headers: response === null || response === void 0 ? void 0 : response.headers, body: response === null || response === void 0 ? void 0 : response.body };
        }
    }
    /**
     * used to broadcast the acp messages to other tabs.
     * @param message - message to broadcast
     * @example
     *```
     * this.broadcastWSMessage(message);
     * ```
     */
    broadcastWSMessage(message) {
        const msgResponse = this.parse(message);
        this.onMessageNotification.next(msgResponse);
    }
    /**
     * generate topic for WebSocket for given provider ws input
     * @param agentAssistWSInput - agent assist WebSocket input
     * @example
     * ```
     * const topic = this.generateTopicForProvider(agentAssistWSInput);
     * ```
     */
    generateTopicForProvider(agentAssistWSInput) {
        var _a, _b;
        let currentTopic = '';
        if (agentAssistWSInput.providerId == 'ccai') {
            currentTopic = (_a = agentAssistWSInput === null || agentAssistWSInput === void 0 ? void 0 : agentAssistWSInput.subscriptions[0]) === null || _a === void 0 ? void 0 : _a.replace('botassist', 'BotAssist');
        }
        if (agentAssistWSInput.providerId == 'rtig') {
            currentTopic = (_b = agentAssistWSInput === null || agentAssistWSInput === void 0 ? void 0 : agentAssistWSInput.subscriptions[0]) === null || _b === void 0 ? void 0 : _b.replace('rtig-', '');
        }
        return currentTopic;
    }
    /**
     * Use to close the web socket
     * @example
     * ```
     * this.closeWebsocket();
     * ```
    */
    closeWebsocket() {
        if (this.wssWorker) {
            super.close(this.wssWorker);
            this.connectionId = '';
        }
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
        (_a = this.wssWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.wssWorker = undefined;
        this.isWSConnected = false;
    }
    /**
     * used to unsubscribe and disconnect to socket events.
     * @example -  unsubscribeAllActiveTopicsFromtWebsocket();
    */
    resubscribeAllActiveTopicsToWebSocket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const completeGetNextData = yield this.agentAssistProcessorService.getAllAgentAssistGetNextFromIndexDb();
                if (completeGetNextData && completeGetNextData.length > 0) {
                    this.initWebSocketWorker(this.serviceName);
                    this.logger.info('resubscribeAllActiveTopicsToWebSocket', `Attempting to re-connect to web-socket for agent-assist for ${completeGetNextData.length} active connections`);
                    this.connect(completeGetNextData[0].webSocketUri);
                    completeGetNextData === null || completeGetNextData === void 0 ? void 0 : completeGetNextData.forEach((getNextData) => {
                        this.subscribe(getNextData);
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('resubscribeAllActiveTopicsToWebSocket', error.message);
                }
            }
        });
    }
    /**
     * callback for when the socket closed.
     * @example
     * ```
     * onClosed();
     * ```
    */
    onClosed() {
        this.terminateWebSocketWorker();
        if (this.connectionId !== '') {
            this.attemptToReSubscribe();
        }
    }
    /**
     * Use to attempt to reconnect and resubscribe active topics to the web socket worker
     * @example
     * ```
     * this.attemptToReSubscribe();
     * ```
    */
    attemptToReSubscribe() {
        this.resubscribeAllActiveTopicsToWebSocket();
    }
    /**
     * callback for when error received
     * ```
     * @example -  onError();
     * ```
    */
    onError() {
        const postResponseMessage = {
            type: AgentAssistCommand.error,
            data: 'WebSocket Error',
        };
        this.logger.error('onError', `Error: ${JSON.stringify(postResponseMessage)}`);
        this.terminateWebSocketWorker();
        this.attemptToReSubscribe();
    }
    /**
     * Use to initializing the web socket worker and will return the method inside the worker
     * @example
     * ```
     * this.initWebSocketWorker();
     * ```
     */
    initWebSocketWorker(workerName) {
        if (!this.wssWorker) {
            const webWorkerName = `ccf-${workerName}-wss-worker`;
            const loader = new LoadWorker();
            this.wssWorker = loader.getWorker('ws-worker-agent-assist', webWorkerName);
            this.wssWorker.onmessage = (response) => {
                this.checkWSEvent(response === null || response === void 0 ? void 0 : response.data);
            };
            this.wssWorker.onerror = (error) => {
                this.logger.error('subscribe', 'Error occured on wssWorker:' + error);
            };
        }
    }
    /**
     * Use to initializing the logger
    * @param className -  name of class for logger
    * @example
    * ```
    * this.initLogger('agent-assist');
    * ```
    */
    initLogger(className) {
        this.logger = new Logger('agent-sdk', `${className}-websocket-service`);
    }
    /**
     * Callback method when a connection is open and ready to send and receive data
     * @example - onOpen()
    */
    onOpen() {
        //no implementation is needed for this method as of now, need to add this due to inheritance and it is abstract in base class
    }
    /**
     * Callback method when a ws reconnect attempts in progress
     * @param msg -  message from server
     * @example - this.onReconnect()
    */
    onReconnect(_msg) {
        //no implementation is needed for this method as of now, need to add this due to inheritance and it is abstract in base class
    }
    /**
     * Callback method when a ws reconnect attempts are completed
     * @example - this.onReconnectComplete()
    */
    onReconnectComplete() {
        //no implementation is needed for this method as of now, need to add this due to inheritance and it is abstract in base class
    }
}
//# sourceMappingURL=agent-assist-ws-service.js.map