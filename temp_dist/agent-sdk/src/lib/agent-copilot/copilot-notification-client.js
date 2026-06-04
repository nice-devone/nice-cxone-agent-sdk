import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CopilotMessageResponse, CXoneLeaderElector, MessageBus, MessageType, AgentAssistConnect, AgentAssistUnsubscribe, VoiceTranscriptionResponse, } from '@nice-devone/common-sdk';
import { FeatureToggleService } from '../feature-toggle';
import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
const HEARTBEAT_INTERVAL = 20000;
const HEARTBEAT_MISS_THRESHOLD = 3;
/**
 *  web socket class for agent copilot
 */
export class CopilotNotificationClient extends AgentAssistNotificationService {
    constructor() {
        super(...arguments);
        this.agentId = '';
        this.webSocketUri = '';
        this.subscriptionTopics = new Set();
        this.heartbeatAckReceived = true;
        this.heartbeatMissCount = 0;
        this.lastHeartbeatReceivedAt = 0;
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
        this.addSubscriptionTopics((agentCopilotInput === null || agentCopilotInput === void 0 ? void 0 : agentCopilotInput.subscriptions) || []);
        this.initLogger('agentCopilot');
        this.initWebSocketWorker('agentCopilot');
        super.connect(websocketServerUri, 'Agent-Copilot');
        this.logger.info('Connect', 'Connecting to WebSocket for Agent-Copilot');
        return true;
    }
    /**
     * Adds default subscriptions for agent copilot, and any additional passed subscriptions.
     * This method ensures that the agent copilot and health topics are included in the subscription list.
     * @example -  addSubscriptionTopics();
     */
    addSubscriptionTopics(subscriptions) {
        // Always include these default topics
        const defaultTopics = [
            `${this.agentId}_agentcopilot`,
            `${this.agentId}_agentcopilot_health`
        ];
        // Merge defaults and additional subscriptions into Set
        [...defaultTopics, ...subscriptions].forEach(topic => this.subscriptionTopics.add(topic));
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
            this.stopHeartbeatMonitor();
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
                    this.handleHeartbeatAck();
                }
                break;
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    const isTranscriptMessageType = ((_a = msgResponse.body) === null || _a === void 0 ? void 0 : _a.messageType) === MessageType.VOICE_TRANSCRIPT;
                    if (msgResponse.command === AgentAssistCommand.subscribed) {
                        this.connectionId = msgResponse.headers.connectionId;
                        if (this.isHeartbeatMonitorEnabled()) {
                            this.startHeartbeatMonitor();
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
     * Starts monitoring heartbeat acknowledgments for the active connection.
     * If three consecutive acknowledgment windows are missed, the connection is closed and reconnected.
     * @example - startHeartbeatMonitor()
     */
    startHeartbeatMonitor() {
        this.stopHeartbeatMonitor();
        this.lastHeartbeatReceivedAt = Date.now();
        this.heartbeatAckReceived = false;
        this.heartbeatMonitorTimer = setInterval(() => {
            if (this.heartbeatAckReceived) {
                this.heartbeatMissCount = 0;
            }
            else {
                this.heartbeatMissCount += 1;
            }
            this.heartbeatAckReceived = false;
            if (this.heartbeatMissCount >= HEARTBEAT_MISS_THRESHOLD) {
                this.logger.warn('Heartbeat', `Missed ${this.heartbeatMissCount} consecutive HEARTBEAT_ACK messages. Triggering reconnect.`);
                this.onClosed();
            }
        }, HEARTBEAT_INTERVAL);
    }
    /**
     * Stops the heartbeat monitor timer and resets its state.
     * @example - stopHeartbeatMonitor()
     */
    stopHeartbeatMonitor() {
        if (this.heartbeatMonitorTimer) {
            clearInterval(this.heartbeatMonitorTimer);
            this.heartbeatMonitorTimer = undefined;
        }
        this.heartbeatAckReceived = false;
        this.heartbeatMissCount = 0;
    }
    /**
     * Handles a HEARTBEAT_ACK message received from the server.
     * Resets the missed heartbeat count for the active connection.
     * @example - handleHeartbeatAck()
     */
    handleHeartbeatAck() {
        this.lastHeartbeatReceivedAt = Date.now();
        this.heartbeatAckReceived = true;
        this.heartbeatMissCount = 0;
        this.logger.info('Heartbeat', 'Received HEARTBEAT_ACK from server.');
    }
    /**
     * Returns whether the heartbeat monitor logic is enabled for agent copilot websocket reconnects.
     * @example - isHeartbeatMonitorEnabled()
     */
    isHeartbeatMonitorEnabled() {
        return FeatureToggleService.instance.getFeatureToggleSync("release-agentcopilot-ws-CSA-61650" /* FeatureToggles.AGENT_COPILOT_WEBSOCKET_HEARTBEAT_MONITOR */) || false;
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
            this.stopHeartbeatMonitor();
        this.connectionId = '';
        this.connect(this.webSocketUri, this.agentId);
    }
}
//# sourceMappingURL=copilot-notification-client.js.map