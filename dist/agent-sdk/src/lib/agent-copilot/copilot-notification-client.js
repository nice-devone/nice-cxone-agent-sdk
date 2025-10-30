import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CopilotMessageResponse, CXoneLeaderElector, MessageBus, MessageType, AgentAssistConnect, AgentAssistUnsubscribe, VoiceTranscriptionResponse, } from '@nice-devone/common-sdk';
import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
/**
 *  web socket class for agent copilot
 */
export class CopilotNotificationClient extends AgentAssistNotificationService {
    constructor() {
        super(...arguments);
        this.agentId = '';
        this.webSocketUri = '';
        this.subscriptionTopics = [];
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
        // Use a Set for efficient duplicate prevention
        const currentTopics = new Set(this.subscriptionTopics);
        // Always include these default topics
        const defaultTopics = [
            `${this.agentId}_agentcopilot`,
            `${this.agentId}_agentcopilot_health`
        ];
        // Merge defaults and additional subscriptions
        [...defaultTopics, ...subscriptions].forEach(topic => currentTopics.add(topic));
        // Update the original array (maintain reference)
        this.subscriptionTopics.length = 0;
        this.subscriptionTopics.push(...currentTopics);
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
                if (!this.subscriptionTopics.includes(subscription)) {
                    this.subscriptionTopics.push(subscription);
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
        if (this.subscriptionTopics.includes(topic)) {
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
                    subscriptions: this.subscriptionTopics,
                };
                this.subscribe(agentCopilotInput);
                break;
            }
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    const isTranscriptMessageType = ((_a = msgResponse.body) === null || _a === void 0 ? void 0 : _a.messageType) === MessageType.VOICE_TRANSCRIPT;
                    if (msgResponse.command === AgentAssistCommand.subscribed) {
                        this.connectionId = msgResponse.headers.connectionId;
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
                if (this.subscriptionTopics.includes(msgResponse.body.topic)) {
                    this.subscriptionTopics.splice(this.subscriptionTopics.indexOf(msgResponse.body.topic), 1);
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
        this.connectionId = '';
        this.connect(this.webSocketUri, this.agentId);
    }
}
//# sourceMappingURL=copilot-notification-client.js.map