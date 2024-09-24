import { CXoneAuth } from '@nice-devone/auth-sdk';
import { Subject } from 'rxjs';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistConnectedResponse, AgentAssistSubscribedResponse, AgentAssistErrorResponse, CopilotMessageResponse, CXoneLeaderElector, MessageBus, MessageType, } from '@nice-devone/common-sdk';
import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
/**
 *  web socket class for agent copilot
 */
export class CopilotNotificationClient extends AgentAssistNotificationService {
    constructor() {
        super(...arguments);
        this.topic = '';
        this.onMessageNotification = new Subject();
    }
    /**
     * used to connect to the socket.
     * @example -  connect('ws://localhost:8080');
     * @param websocketServerUri - websocketServer uri
     */
    connect(websocketServerUri) {
        this.initLogger('agentCopilot');
        this.initWebSocketWorker('agentCopilot');
        super.connect(websocketServerUri, 'Agent-Copilot');
        return true;
    }
    /**
     * Subscribe to events.
     * @example -  subscribe('topic');
     * @param topic - topic to subscribe
     */
    subscribe(agentCopilotInput) {
        this.agentAssistInput = agentCopilotInput;
        this.topic = `${agentCopilotInput.contactId}`;
        const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
        const req = new AgentAssistSubscribe(accessToken, this.topic);
        this.sendMessage(req, this.wssWorker);
        if (this.wssWorker) {
            this.wssWorker.onmessage = (response) => {
                this.checkWSEvent(response === null || response === void 0 ? void 0 : response.data);
            };
            this.wssWorker.onerror = (error) => {
                this.logger.error('wssWorker-subscribe', 'Error occured on wssWorker', error);
            };
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
            case AgentAssistCommand.connected:
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
        // TODO: For now we don't want these postResponseMessage() but in future will uncomment.
        // const postResponseMessage = {
        //     contactId: ``,
        //     type: AgentAssistCommand.open,
        //     data: 'WebSocket connection is ready to send and receive data',
        // };
        // this.onMessageNotification.next(postResponseMessage);
    }
}
//# sourceMappingURL=copilot-notification-client.js.map