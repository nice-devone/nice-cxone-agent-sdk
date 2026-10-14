import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CopilotMessageResponse, CXoneLeaderElector, MessageBus, MessageType, AgentAssistConnect, AgentAssistUnsubscribe, VoiceTranscriptionResponse, } from '@nice-devone/common-sdk';
import { LoadWorker, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../feature-toggle';
import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
import { CopilotService } from './service/copilot-service';
export const HEARTBEAT_INTERVAL = 20000;
export const AGENTIC_HEARTBEAT_INTERVAL = 20000;
export const HEARTBEAT_MISS_THRESHOLD = 3;
// Agentic reconnect tuning. The worker applies exponential backoff
// (retryInterval * 2^(attempt-1), capped at 60s) and gives up after
// maxRetryAttempts. These match the legacy ws-worker-acp defaults.
export const AGENTIC_RECONNECT_INTERVAL_MS = 2000;
export const AGENTIC_MAX_RECONNECT_ATTEMPTS = 10;
// Agentic URL cache lifetime. Keeps the URL stable across reconnects but
// guarantees a refetch at most once per day, so a backend cluster migration
// is picked up within the TTL window even without an explicit logout.
export const AGENTIC_URL_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
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
        this.cachedAgenticUrlExpiresAt = 0;
        // Prevents overlapping reconnect schedules when both the close event and a
        // missed-heartbeat threshold fire close together. Reset on 'open' or
        // 'reconnectComplete'.
        this.agenticReconnectInFlight = false;
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
            // Recovery: if the agentic toggle is now on but the worker was never initialised
            // (e.g. stale IndexDB replay called connect() before toggles finished loading),
            // create the worker here so it isn't silently missing for the rest of the session.
            if (this.isAgenticWsEnabled() && !this.agenticWssWorker) {
                this.initAgenticWorker();
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
        // Only create the agentic worker on the very first connect. The worker
        // then survives transient primary-socket errors (see terminateWebSocketWorker)
        // and drives its own reconnect cycle through scheduleAgenticReconnect.
        if (isAgenticWs && !this.agenticWssWorker) {
            this.initAgenticWorker();
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
     * Handles a decoded WS frame. `source` identifies which socket the frame
     * arrived on so heartbeat state mutations stay scoped to that socket.
     * @param message - raw decoded message
     * @param source - 'primary' (default) or 'agentic'
     * ```
     * @example
     * onMessage(message, 'primary');
     * ```
     */
    onMessage(message, source = 'primary') {
        var _a;
        const msgResponse = this.parse(message);
        const heartbeatState = source === 'agentic' ? this.agenticHeartbeatState : this.heartbeatState;
        const heartbeatLabel = source === 'agentic' ? 'AgenticHeartbeat' : 'Heartbeat';
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
                    this.handleHeartbeatAckFor(heartbeatState, heartbeatLabel);
                }
                break;
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    const isTranscriptMessageType = ((_a = msgResponse.body) === null || _a === void 0 ? void 0 : _a.messageType) === MessageType.VOICE_TRANSCRIPT;
                    if (msgResponse.command === AgentAssistCommand.subscribed) {
                        this.connectionId = msgResponse.headers.connectionId;
                        // Only the primary socket starts its heartbeat monitor here. The
                        // agentic socket's heartbeat is started on the worker 'open' event
                        // (see onAgenticWorkerMessage) so the agentic SUBSCRIBED frame must
                        // NOT perturb the primary heartbeat clock.
                        if (source === 'primary' && this.isHeartbeatMonitorEnabled()) {
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
     * Resolves the agentic WebSocket base URL using a two-tier cache:
     * 1. In-memory (fastest; no I/O)
     * 2. localStorage with TTL envelope
     * 3. REST round-trip (last resort)
     * Returns `null` if the REST call fails — caller must handle gracefully.
     */
    getAgenticWebSocketUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            if (this.cachedAgenticUrl && now < this.cachedAgenticUrlExpiresAt) {
                return this.cachedAgenticUrl;
            }
            const agenticUrl = LocalStorageHelper.getItem(StorageKeys.AGENTIC_COPILOT_WS_URL);
            if (agenticUrl) {
                try {
                    const parsed = JSON.parse(agenticUrl);
                    if ((parsed === null || parsed === void 0 ? void 0 : parsed.url) && typeof parsed.expiresAt === 'number' && now < parsed.expiresAt) {
                        this.cachedAgenticUrl = parsed.url;
                        this.cachedAgenticUrlExpiresAt = parsed.expiresAt;
                        return parsed.url;
                    }
                }
                catch (_a) {
                    this.logger.warn('getAgenticWebSocketUrl', 'Failed to parse cached agentic URL; ignoring cache entry.');
                }
            }
            try {
                const response = yield new CopilotService().fetchAgenticWebSocketUrl();
                const url = response === null || response === void 0 ? void 0 : response.agenticWebsocketURL;
                if (!url)
                    return null;
                const expiresAt = now + AGENTIC_URL_CACHE_TTL_MS;
                this.cachedAgenticUrl = url;
                this.cachedAgenticUrlExpiresAt = expiresAt;
                LocalStorageHelper.setItem(StorageKeys.AGENTIC_COPILOT_WS_URL, JSON.stringify({ url, expiresAt }));
                this.logger.info('getAgenticWebSocketUrl', 'Fetched and cached agentic WebSocket URL.');
                return url;
            }
            catch (error) {
                this.logger.error('getAgenticWebSocketUrl', 'Failed to fetch agentic WebSocket URL: ' + JSON.stringify(error));
                return null;
            }
        });
    }
    /**
     * Initialises or re-connects the agentic WebSocket worker.
     * Spawns the underlying Web Worker exactly once; subsequent calls reuse it
     * and only post a fresh `connect` frame with a freshly-read access token.
     * @example - initAgenticWorker()
     */
    initAgenticWorker() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = yield this.getAgenticWebSocketUrl();
                if (!baseUrl) {
                    this.logger.error('initAgenticWorker', 'Failed to initialise agentic worker: unable to resolve agentic WebSocket URL.');
                    return;
                }
                // Always re-read the token so that token rotations between connects
                // do not leave the worker handshaking with a stale credential.
                const token = (_a = CXoneAuth.instance.getAuthToken()) === null || _a === void 0 ? void 0 : _a.accessToken;
                if (!token) {
                    this.logger.error('initAgenticWorker', 'Missing access token — cannot connect agentic worker.');
                    return;
                }
                const fullUrl = `${baseUrl}?token=${token}&consumerId=agentcopilot`;
                if (!this.agenticWssWorker) {
                    const loader = new LoadWorker();
                    const worker = loader.getWorker('ws-worker-agentic', 'ccf-agentic-wss-worker');
                    this.agenticWssWorker = worker !== null && worker !== void 0 ? worker : null;
                    if (this.agenticWssWorker) {
                        // Bind the message handler to a method so it always reads the current
                        // `this.agentId` rather than capturing a stale value in a closure.
                        this.agenticWssWorker.onmessage = (response) => this.onAgenticWorkerMessage(response);
                        this.agenticWssWorker.onerror = (error) => {
                            this.logger.error('AgenticWssWorker.OnError', 'Connection Error: ' + JSON.stringify(error === null || error === void 0 ? void 0 : error.message));
                        };
                    }
                }
                // A fresh connect attempt resets the in-flight guard so any future
                // failure can schedule a new reconnect cycle.
                this.agenticReconnectInFlight = false;
                // Pass the access token alongside the URL so the worker can stamp it
                // into headers.sessionToken on every command frame it sends (HEARTBEAT
                // etc.) — the agentic gateway re-authorises per frame, not just on
                // the initial handshake.
                (_b = this.agenticWssWorker) === null || _b === void 0 ? void 0 : _b.postMessage({ type: 'connect', url: fullUrl, sessionToken: token });
            }
            catch (error) {
                this.logger.error('initAgenticWorker', 'Failed to initialise agentic worker: ' + JSON.stringify(error));
            }
        });
    }
    /**
     * Routes messages posted by the agentic worker to the appropriate handler.
     * Reads `this.agentId` dynamically so an agent change without page reload
     * does not leave the worker subscribing to stale topics.
     */
    onAgenticWorkerMessage(response) {
        var _a;
        const data = response === null || response === void 0 ? void 0 : response.data;
        switch (data === null || data === void 0 ? void 0 : data.type) {
            case 'open':
                this.agenticReconnectInFlight = false;
                this.subscribeAgenticTopics();
                this.startHeartbeatMonitorFor(this.agenticHeartbeatState, AGENTIC_HEARTBEAT_INTERVAL, 'AgenticHeartbeat', () => this.scheduleAgenticReconnect());
                return;
            case 'message':
                if (((_a = data.message) === null || _a === void 0 ? void 0 : _a.command) === 'HEARTBEAT_ACK') {
                    this.handleHeartbeatAckFor(this.agenticHeartbeatState, 'AgenticHeartbeat');
                }
                else {
                    // Route the agentic payload through the local message pipeline,
                    // tagging the source so heartbeat-state mutations stay scoped.
                    this.onMessage(data.message, 'agentic');
                }
                return;
            case 'close':
                // A genuine socket close — schedule a reconnect immediately rather
                // than waiting for the heartbeat-miss threshold. Detection latency
                // drops from ~90s to ~retryInterval.
                this.logger.warn('AgenticWss', 'Agentic WebSocket closed.');
                this.stopHeartbeatMonitorFor(this.agenticHeartbeatState);
                this.scheduleAgenticReconnect();
                return;
            case 'reconnect':
                this.logger.info('AgenticWss', 'Reconnect attempt scheduled: ' + JSON.stringify(data.message));
                this.initAgenticWorker();
                return;
            case 'reconnectComplete':
                this.logger.error('AgenticWss', 'Reconnect attempts exhausted for agentic worker.');
                this.agenticReconnectInFlight = false;
                this.stopHeartbeatMonitorFor(this.agenticHeartbeatState);
                return;
            case 'error':
                this.logger.warn('AgenticWss', `agentic socket error: ${JSON.stringify(data === null || data === void 0 ? void 0 : data.message)}`);
                return;
            default:
                return;
        }
    }
    /**
     * Schedules a reconnect through the worker's exponential-backoff path.
     * Guards against overlapping schedules. Caller should have already
     * stopped (or be prepared to stop) the heartbeat monitor.
     */
    scheduleAgenticReconnect() {
        if (this.agenticReconnectInFlight)
            return;
        if (!this.agenticWssWorker) {
            this.initAgenticWorker();
            return;
        }
        this.agenticReconnectInFlight = true;
        // Force the worker into a closed state so attemptReconnect's
        // `!isConnectionOpen` guard passes even if the socket is silently dead
        // (e.g. heartbeat-miss path where no close event fired yet).
        this.agenticWssWorker.postMessage({ type: 'close' });
        this.agenticWssWorker.postMessage({
            type: 'attemptReconnect',
            reconnectInfo: {
                retryOptions: {
                    retryInterval: AGENTIC_RECONNECT_INTERVAL_MS,
                    maxRetryAttempts: AGENTIC_MAX_RECONNECT_ATTEMPTS,
                },
            },
        });
    }
    /**
     * Sends SUBSCRIBE frames for the two agentic copilot topics to the agentic worker.
     * Called on the worker's 'open' event. Each frame carries the current
     * access token as `headers.sessionToken` — the agentic gateway requires it
     * for re-authorisation on every command, not just the initial handshake.
     * Also pushes the fresh token into the worker so subsequent HEARTBEAT
     * frames generated inside the worker pick up the latest credential.
     * @param agentId - the agent's identifier used to build the topic names
     * @example - subscribeAgenticTopics('12345')
     */
    subscribeAgenticTopics() {
        var _a, _b, _c, _d, _e;
        const sessionToken = (_b = (_a = CXoneAuth.instance.getAuthToken()) === null || _a === void 0 ? void 0 : _a.accessToken) !== null && _b !== void 0 ? _b : '';
        const { icAgentId, userId } = (_c = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)) !== null && _c !== void 0 ? _c : {};
        const isMultiACDWebsocketEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-multiacd-websocket-CSA-28481" /* FeatureToggles.MULTI_ACD_WEBSOCKET */);
        const connectionIdentifier = isMultiACDWebsocketEnabled ? userId : icAgentId;
        // Keep the worker's stored token in sync so its HEARTBEAT frames also
        // carry the latest credential (token may have rotated since 'connect').
        (_d = this.agenticWssWorker) === null || _d === void 0 ? void 0 : _d.postMessage({ type: 'updateToken', sessionToken });
        for (const topic of [`${connectionIdentifier}_agentcopilot`, `${connectionIdentifier}_agentcopilot_health`]) {
            (_e = this.agenticWssWorker) === null || _e === void 0 ? void 0 : _e.postMessage({
                type: 'send',
                message: { command: 'SUBSCRIBE', headers: { sessionToken }, body: { topic } },
            });
        }
    }
    /**
     * Tears down the primary WSS worker only. The agentic worker has an
     * independent lifecycle and is intentionally kept alive across transient
     * primary-socket errors. Call `terminateAgenticWorker()` explicitly on
     * logout, agent change, or toggle-off to release agentic resources.
     * @example - terminateWebSocketWorker()
     */
    terminateWebSocketWorker() {
        super.terminateWebSocketWorker();
    }
    /**
     * Tears down the agentic worker, heartbeat monitor, and URL cache.
     * Intended for end-of-session flows (logout, agent change). Not invoked
     * by transient error paths.
     * @example - terminateAgenticWorker()
     */
    terminateAgenticWorker() {
        this.stopHeartbeatMonitorFor(this.agenticHeartbeatState);
        if (this.agenticWssWorker) {
            this.agenticWssWorker.postMessage({ type: 'close' });
            this.agenticWssWorker.terminate();
            this.agenticWssWorker = null;
        }
        this.agenticReconnectInFlight = false;
        this.cachedAgenticUrl = undefined;
        this.cachedAgenticUrlExpiresAt = 0;
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
                // Stop the monitor — the reconnect path will restart it on 'open'.
                // Leaving it running while reconnect is in flight would fire spurious
                // threshold callbacks every ${interval * HEARTBEAT_MISS_THRESHOLD}ms.
                this.stopHeartbeatMonitorFor(state);
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