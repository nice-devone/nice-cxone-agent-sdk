import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CopilotMessageResponse, CXoneLeaderElector, MessageBus, MessageType, AgentAssistConnect, AgentAssistUnsubscribe, VoiceTranscriptionResponse, } from '@nice-devone/common-sdk';
import { LoadWorker, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../feature-toggle';
import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
import { CopilotService } from './service/copilot-service';
export const HEARTBEAT_INTERVAL = 20000;
export const AGENTIC_HEARTBEAT_INTERVAL = 30000;
export const HEARTBEAT_MISS_THRESHOLD = 3;
/**
 *  web socket class for agent copilot
 */
export class CopilotNotificationClient extends AgentAssistNotificationService {
    constructor() {
        super(...arguments);
        this.agentId = '';
        this.webSocketUri = '';
        this.subscriptionTopics = new Set();
        this.lastHeartbeatReceivedAt = 0;
        this.heartbeatState = { timer: undefined, ackReceived: false, missCount: 0 };
        this.agenticHeartbeatState = { timer: undefined, ackReceived: false, missCount: 0 };
        this.agenticWssWorker = null;
        this.onMessageNotification = new Subject();
        this.onVoiceTranscriptionMessage = new Subject();
        this.onVoiceTranscriptionError = new Subject();
    }
    /**
     * used to connect to the socket.
     * @example -  connect('ws://localhost:8080', 1011, 123_subscription);
     * @param websocketServerUri - websocketServer uri
     */
    connect(websocketServerUri, agentId, agentCopilotInput) {
        if (this.webSocketUri === websocketServerUri && this.connectionId) {
            // New subscription request on connected socket
            if (agentCopilotInput) {
                this.subscribe(agentCopilotInput);
            }
            this.logger.info('Already connected', ' skipping reconnect.');
            return true;
        }
        this.webSocketUri = websocketServerUri;
        this.agentId = agentId;
        const isAgenticWs = this.isAgenticWsEnabled();
        this.addSubscriptionTopics((agentCopilotInput === null || agentCopilotInput === void 0 ? void 0 : agentCopilotInput.subscriptions) || [], isAgenticWs);
        this.initLogger('agentCopilot');
        this.initWebSocketWorker('agentCopilot');
        super.connect(websocketServerUri, 'Agent-Copilot');
        // Only create the agentic worker on the very first connect.
        // Once the worker exists it manages its own reconnect cycle via the
        // heartbeat threshold callback — calling initAgenticWorker again here
        // (e.g. from onReconnect triggered by the primary-worker heartbeat)
        // would interrupt a healthy agentic connection and cause a premature
        // reconnect unrelated to the agentic worker's own missed-ACK count.
        if (isAgenticWs && !this.agenticWssWorker) {
            this.initAgenticWorker(agentId);
        }
        this.logger.info('Connect', 'Connecting to WebSocket for Agent-Copilot');
        return true;
    }
    /**
     * Adds default subscriptions for agent copilot, and any additional passed subscriptions.
     * When the AGENTIC_WEBSOCKET toggle is ON the agenticWssWorker owns the copilot topics,
     * so they are skipped on the old worker.
     * @example -  addSubscriptionTopics([]);
     */
    addSubscriptionTopics(subscriptions, isAgenticWs) {
        if (!isAgenticWs) {
            // agenticWssWorker owns these topics when toggle is ON; skip them on the old worker
            this.subscriptionTopics.add(`${this.agentId}_agentcopilot`);
            this.subscriptionTopics.add(`${this.agentId}_agentcopilot_health`);
        }
        subscriptions.forEach(topic => this.subscriptionTopics.add(topic));
    }
    /**
     * Subscribe to events.
     * @example -  subscribe('topic');
     * @param topic - topic to subscribe
     */
    subscribe(agentCopilotInput) {
        this.agentAssistInput = agentCopilotInput;
        const subscriptions = agentCopilotInput.subscriptions;
        if (subscriptions) {
            subscriptions.forEach((subscription) => {
                if (!this.subscriptionTopics.has(subscription)) {
                    this.subscriptionTopics.add(subscription);
                }
                const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
                const req = new AgentAssistSubscribe(accessToken, subscription);
                this.sendMessage(req, this.wssWorker);
            });
        }
        return true;
    }
    /**
     * Unsubscribe from a specific topic.
     * @example -  unsubscribe('topic');
     * @param subscriptionTopics - subscriptionTopics to unsubscribe
     */
    unsubscribe(topic) {
        if (this.subscriptionTopics.has(topic)) {
            const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
            const req = new AgentAssistUnsubscribe(accessToken, topic);
            this.sendMessage(req, this.wssWorker);
            return true;
        }
        return false;
    }
    /**
     * on websocket close.
     * @example -  onClosed();
     */
    onClosed() {
        if (this.isHeartbeatMonitorEnabled())
            this.stopHeartbeatMonitorFor(this.heartbeatState);
        const postResponseMessage = {
            command: AgentAssistCommand.closed,
            headers: {
                connectionId: '',
            },
            body: 'websocket connection is closed. Trying to reconnect.',
        };
        this.onMessageNotification.next(postResponseMessage);
        super.onClosed();
        return true;
    }
    /**
     *
     * @param message - message
     * @example
     */
    onMessage(message) {
        var _a;
        const msgResponse = this.parse(message);
        switch (msgResponse.command) {
            case AgentAssistCommand.connected: {
                const agentCopilotInput = {
                    webSocketUri: this.webSocketUri,
                    contactId: `${this.agentId}_agentcopilot`,
                    providerId: 'agentCopilot',
                    subscriptions: Array.from(this.subscriptionTopics),
                };
                this.subscribe(agentCopilotInput);
                break;
            }
            case AgentAssistCommand.heartbeatAck:
                if (this.isHeartbeatMonitorEnabled()) {
                    this.lastHeartbeatReceivedAt = Date.now();
                    this.handleHeartbeatAckFor(this.heartbeatState, 'Heartbeat');
                }
                break;
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    const isTranscriptMessageType = ((_a = msgResponse.body) === null || _a === void 0 ? void 0 : _a.messageType) === MessageType.VOICE_TRANSCRIPT;
                    if (msgResponse.command === AgentAssistCommand.subscribed) {
                        this.connectionId = msgResponse.headers.connectionId;
                        if (this.isHeartbeatMonitorEnabled()) {
                            this.lastHeartbeatReceivedAt = Date.now();
                            this.startHeartbeatMonitorFor(this.heartbeatState, HEARTBEAT_INTERVAL, 'Heartbeat', () => this.onClosed());
                        }
                    }
                    const postResponseMessage = {
                        type: isTranscriptMessageType ? MessageType.VOICE_TRANSCRIPT : MessageType.AGENT_COPILOT_RESPONSE,
                        data: message,
                    };
                    if (CXoneLeaderElector.instance.isLeader) {
                        if (isTranscriptMessageType) {
                            this.onVoiceTranscriptionMessage.next(msgResponse);
                        }
                        else {
                            this.onMessageNotification.next(msgResponse);
                        }
                        MessageBus.instance.postResponse(postResponseMessage);
                    }
                }
                break;
            case AgentAssistCommand.unsubscribed:
                if (this.subscriptionTopics.has(msgResponse.body.topic)) {
                    this.subscriptionTopics.delete(msgResponse.body.topic);
                }
                break;
            case AgentAssistCommand.error:
                this.onVoiceTranscriptionError.next(msgResponse);
                break;
            default:
                break;
        }
    }
    /**
     * method to parse the response
     * ```
     * @example
     * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
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
                if (response.body.MessageType === MessageType.VOICE_TRANSCRIPT) {
                    return new VoiceTranscriptionResponse(response);
                }
                return new CopilotMessageResponse(response === null || response === void 0 ? void 0 : response.headers, response === null || response === void 0 ? void 0 : response.body);
            default:
                return { command: response === null || response === void 0 ? void 0 : response.command, headers: response === null || response === void 0 ? void 0 : response.headers, body: response === null || response === void 0 ? void 0 : response.body };
        }
    }
    /**
     * used to broadcast the acp messages to other tabs.
     * @example -  broadcastCopilotNotifications();
     * @param message - message to broadcast
     */
    broadcastCopilotNotifications(message) {
        const msgResponse = this.parse(message);
        this.onMessageNotification.next(msgResponse);
    }
    /**
     * Initialises the agentic WebSocket worker when the AGENTIC_WEBSOCKET toggle is ON.
     * Reuses an existing worker instance if already created (preserves reconnect state).
     * @example - initAgenticWorker('12345')
     */
    initAgenticWorker(agentId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agenticWebsocketURL = LocalStorageHelper.getItem(StorageKeys.AGENTIC_COPILOT_WS_URL);
                if (!agenticWebsocketURL) {
                    const response = yield new CopilotService().fetchAgenticWebSocketUrl();
                    agenticWebsocketURL = response.agenticWebsocketURL;
                    LocalStorageHelper.setItem(StorageKeys.AGENTIC_COPILOT_WS_URL, agenticWebsocketURL);
                    this.logger.info('initAgenticWorker', 'Fetched and cached agentic WebSocket URL.');
                }
                else {
                    this.logger.info('initAgenticWorker', 'Using cached agentic WebSocket URL from LocalStorage.');
                }
                const token = (_a = CXoneAuth.instance.getAuthToken()) === null || _a === void 0 ? void 0 : _a.accessToken;
                if (!token) {
                    this.logger.error('initAgenticWorker', 'Missing access token — cannot connect agentic worker.');
                    return;
                }
                const fullUrl = `${agenticWebsocketURL}?token=${token}&consumerId=agentcopilot`;
                if (!this.agenticWssWorker) {
                    const loader = new LoadWorker();
                    const worker = loader.getWorker('ws-worker-agentic', 'ccf-agentic-wss-worker');
                    this.agenticWssWorker = worker !== null && worker !== void 0 ? worker : null;
                    if (this.agenticWssWorker) {
                        this.agenticWssWorker.onmessage = (response) => {
                            var _a;
                            const data = response === null || response === void 0 ? void 0 : response.data;
                            // Each case is handled locally and returns early — checkWSEvent is NEVER
                            // called from the agentic worker because it is wired for the primary
                            // wssWorker and would corrupt its state (e.g. re-send AgentAssistConnect,
                            // trigger reconnect on the wrong socket).
                            switch (data === null || data === void 0 ? void 0 : data.type) {
                                case 'open':
                                    this.subscribeAgenticTopics(agentId);
                                    this.startHeartbeatMonitorFor(this.agenticHeartbeatState, AGENTIC_HEARTBEAT_INTERVAL, 'AgenticHeartbeat', () => {
                                        // 3 missed ACKs → reconnect immediately without waiting for a
                                        // close roundtrip.  initAgenticWorker posts close + connect in
                                        // sequence; the worker processes them in order so isConnectionOpen
                                        // is already false when the connect guard runs.
                                        this.initAgenticWorker(agentId);
                                    });
                                    return;
                                case 'message':
                                    if (((_a = data.message) === null || _a === void 0 ? void 0 : _a.command) === 'HEARTBEAT_ACK') {
                                        this.handleHeartbeatAckFor(this.agenticHeartbeatState, 'AgenticHeartbeat');
                                    }
                                    else {
                                        // Route the agentic payload through the local message pipeline.
                                        this.onMessage(data.message);
                                    }
                                    return;
                                case 'close':
                                    // Socket has closed (natural drop or after an explicit close posted
                                    // by initAgenticWorker).  The heartbeat monitor keeps running — it
                                    // is never stopped here.  If 3 consecutive ACK windows are missed
                                    // on a dead socket the threshold fires, resets missCount to 0, and
                                    // calls initAgenticWorker to reopen the connection.  The monitor
                                    // then continues without interruption for the next cycle.
                                    this.logger.warn('AgenticWss', 'Agentic WebSocket closed.');
                                    return;
                                case 'error':
                                    this.logger.warn('AgenticWss', `agentic socket error: ${JSON.stringify(data === null || data === void 0 ? void 0 : data.message)}`);
                                    return;
                                default:
                                    return;
                            }
                        };
                        this.agenticWssWorker.onerror = (error) => {
                            this.logger.error('AgenticWssWorker.OnError', 'Connection Error: ' + JSON.stringify(error === null || error === void 0 ? void 0 : error.message));
                        };
                    }
                }
                else {
                    // Worker already exists — close the current socket before reconnecting.
                    // Posting close + connect in immediate succession is safe because the
                    // worker processes messages sequentially: close sets isConnectionOpen=false
                    // synchronously before the connect guard is evaluated.
                    // The heartbeat monitor is NOT stopped here — it must keep running so
                    // that every subsequent HEARTBEAT_MISS_THRESHOLD missed ACKs triggers
                    // another reconnect automatically until the connection is restored.
                    this.agenticWssWorker.postMessage({ type: 'close' });
                }
                (_b = this.agenticWssWorker) === null || _b === void 0 ? void 0 : _b.postMessage({ type: 'connect', url: fullUrl });
            }
            catch (error) {
                this.logger.error('initAgenticWorker', 'Failed to initialise agentic worker: ' + JSON.stringify(error));
            }
        });
    }
    /**
     * Sends SUBSCRIBE frames for the two agentic copilot topics to the agentic worker.
     * Called on the worker's 'open' event.
     * @param agentId - the agent's identifier used to build the topic names
     * @example - subscribeAgenticTopics('12345')
     */
    subscribeAgenticTopics(agentId) {
        var _a;
        for (const topic of [`${agentId}_agentcopilot`, `${agentId}_agentcopilot_health`]) {
            (_a = this.agenticWssWorker) === null || _a === void 0 ? void 0 : _a.postMessage({
                type: 'send',
                message: { command: 'SUBSCRIBE', headers: {}, body: { topic } },
            });
        }
    }
    /**
     * Terminates both the primary wssWorker and the agenticWssWorker.
     * @example - terminateWebSocketWorker()
     */
    terminateWebSocketWorker() {
        super.terminateWebSocketWorker();
        this.stopHeartbeatMonitorFor(this.agenticHeartbeatState);
        if (this.agenticWssWorker) {
            this.agenticWssWorker.postMessage({ type: 'close' });
            this.agenticWssWorker.terminate();
            this.agenticWssWorker = null;
        }
        // Clear the cached agentic WebSocket base URL so the next session always
        // fetches a fresh URL from the API — prevents stale URLs surviving across
        // logout/login or cluster migrations.
        LocalStorageHelper.removeItem(StorageKeys.AGENTIC_COPILOT_WS_URL);
    }
    /**
     * Starts a heartbeat monitor for the given state object.
     * After HEARTBEAT_MISS_THRESHOLD consecutive missed acknowledgments, stops the monitor
     * and calls onThreshold to trigger the appropriate reconnect action.
     * @param state - mutable heartbeat state (timer, ackReceived, missCount)
     * @param interval - polling interval in milliseconds
     * @param label - log label used in warn/info messages
     * @param onThreshold - callback invoked when miss threshold is reached
     * @example - startHeartbeatMonitorFor(this.heartbeatState, HEARTBEAT_INTERVAL, 'Heartbeat', this.onClosed())
     */
    startHeartbeatMonitorFor(state, interval, label, onThreshold) {
        this.stopHeartbeatMonitorFor(state);
        state.ackReceived = false;
        state.missCount = 0;
        state.timer = setInterval(() => {
            if (state.ackReceived) {
                state.missCount = 0;
            }
            else {
                state.missCount += 1;
            }
            state.ackReceived = false;
            if (state.missCount >= HEARTBEAT_MISS_THRESHOLD) {
                this.logger.warn(label, `Missed ${state.missCount} consecutive HEARTBEAT_ACK messages. Triggering reconnect.`);
                // Reset miss count so the next cycle counts from scratch.
                // The timer is intentionally NOT stopped — the monitor must run
                // continuously so that each subsequent set of HEARTBEAT_MISS_THRESHOLD
                // missed ACKs triggers another reconnect automatically.
                state.missCount = 0;
                onThreshold();
            }
        }, interval);
    }
    /**
     * Clears the heartbeat monitor interval for the given state and resets its fields.
     * @param state - mutable heartbeat state to clear
     * @example - stopHeartbeatMonitorFor(this.heartbeatState)
     */
    stopHeartbeatMonitorFor(state) {
        if (state.timer) {
            clearInterval(state.timer);
            state.timer = undefined;
        }
        state.ackReceived = false;
        state.missCount = 0;
    }
    /**
     * Marks a HEARTBEAT_ACK as received for the given state and resets the miss counter.
     * @param state - mutable heartbeat state to update
     * @param label - log label used in the info message
     * @example - handleHeartbeatAckFor(this.heartbeatState, 'Heartbeat')
     */
    handleHeartbeatAckFor(state, label) {
        state.ackReceived = true;
        state.missCount = 0;
        this.logger.info(label, 'Received HEARTBEAT_ACK.');
    }
    /**
     * Returns whether the heartbeat monitor logic is enabled for agent copilot websocket reconnects.
     * @example - isHeartbeatMonitorEnabled()
     */
    isHeartbeatMonitorEnabled() {
        return FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-ws-CSA-61650" /* FeatureToggles.AGENT_COPILOT_WEBSOCKET_HEARTBEAT_MONITOR */) || false;
    }
    /**
     * Returns whether the agentic WebSocket feature toggle is enabled.
     * @example - isAgenticWsEnabled()
     */
    isAgenticWsEnabled() {
        return FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-websocket-CSA-69545" /* FeatureToggles.AGENTIC_WEBSOCKET */) || false;
    }
    /**
     * Callback method when a connection is open and ready to send and receive data
     * @example - onOpen()
     */
    onOpen() {
        var _a;
        this.reconnectAttemptSource = null;
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistConnect(cx1Token);
        this.sendMessage(req, this.wssWorker);
    }
    /**
     * Callback method triggered when the WebSocket connection needs to be re-established.
     * Resets the connection ID and reconnects using the stored WebSocket URI and provider ID.
     * @example - onReconnect()
     */
    onReconnect() {
        if (this.isHeartbeatMonitorEnabled())
            this.stopHeartbeatMonitorFor(this.heartbeatState);
        this.connectionId = '';
        this.connect(this.webSocketUri, this.agentId);
    }
}
//# sourceMappingURL=copilot-notification-client.js.map