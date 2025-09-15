import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CopilotMessageResponse, CXoneLeaderElector, MessageBus, MessageType, AgentAssistConnect, } from '@nice-devone/common-sdk';
import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
/**
 *  web socket class for agent copilot
 */
export class CopilotNotificationClient extends AgentAssistNotificationService {
    constructor() {
        super(...arguments);
        this.agentId = '';
        this.webSocketUri = '';
        this.topic = '';
        this.onMessageNotification = new Subject();
    }
    /**
     * used to connect to the socket.
     * @example -  connect('ws://localhost:8080');
     * @param websocketServerUri - websocketServer uri
     */
    connect(websocketServerUri, agentId) {
        if (this.agentAssistInput.webSocketUri === websocketServerUri && this.connectionId) {
            this.logger.info('Already connected', ' skipping reconnect.');
            return true;
        }
        this.webSocketUri = websocketServerUri;
        this.agentId = agentId;
        this.initLogger('agentCopilot');
        this.initWebSocketWorker('agentCopilot');
        super.connect(websocketServerUri, 'Agent-Copilot');
        this.logger.info('Connect', 'Connecting to WebSocket for Agent-Assist');
        return true;
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
                this.topic = subscription;
                const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
                const req = new AgentAssistSubscribe(accessToken, this.topic);
                this.sendMessage(req, this.wssWorker);
            });
        }
        return true;
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
        const msgResponse = this.parse(message);
        switch (msgResponse.command) {
            case AgentAssistCommand.connected: {
                const agentCopilotInput = {
                    webSocketUri: this.webSocketUri,
                    contactId: `${this.agentId}_agentcopilot`,
                    providerId: 'agentCopilot',
                    subscriptions: [`${this.agentId}_agentcopilot`, `${this.agentId}_agentcopilot_health`],
                };
                this.subscribe(agentCopilotInput);
                break;
            }
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    if (msgResponse.command === AgentAssistCommand.subscribed) {
                        this.connectionId = msgResponse.headers.connectionId;
                    }
                    const postResponseMessage = {
                        type: MessageType.AGENT_COPILOT_RESPONSE,
                        data: message,
                    };
                    if (CXoneLeaderElector.instance.isLeader) {
                        this.onMessageNotification.next(msgResponse);
                        MessageBus.instance.postResponse(postResponseMessage);
                    }
                }
                break;
            case AgentAssistCommand.unsubscribed:
                {
                    this.topic = '';
                    this.wssWorker.postMessage({ type: 'close' });
                }
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
        this.connect(this.agentAssistInput.webSocketUri, this.agentId);
    }
}
//# sourceMappingURL=copilot-notification-client.js.map