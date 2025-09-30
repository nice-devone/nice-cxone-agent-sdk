import { Subject } from 'rxjs';
import { AgentAssistBaseResponse, VoiceTranscriptionResponse } from '@nice-devone/common-sdk';
import { AgentAssistInput, AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
/**
 *  web socket class for agent copilot
 */
export declare class CopilotNotificationClient extends AgentAssistNotificationService {
    private agentId;
    private webSocketUri;
    private subscriptionTopics;
    onMessageNotification: Subject<AgentAssistBaseResponse>;
    onVoiceTranscriptionMessage: Subject<VoiceTranscriptionResponse>;
    /**
     * used to connect to the socket.
     * @example -  connect('ws://localhost:8080', 1011, 123_subscription);
     * @param websocketServerUri - websocketServer uri
     */
    connect(websocketServerUri: string, agentId: string, agentCopilotInput?: AgentAssistInput): boolean;
    /**
     * Adds default subscriptions for agent copilot, and any additional passed subscriptions.
     * This method ensures that the agent copilot and health topics are included in the subscription list.
     * @example -  addSubscriptionTopics();
     */
    private addSubscriptionTopics;
    /**
     * Subscribe to events.
     * @example -  subscribe('topic');
     * @param topic - topic to subscribe
     */
    subscribe(agentCopilotInput: AgentAssistInput): boolean;
    /**
     * Unsubscribe from a specific topic.
     * @example -  unsubscribe('topic');
     * @param subscriptionTopics - subscriptionTopics to unsubscribe
     */
    unsubscribe(topic: string): boolean;
    /**
     * on websocket close.
     * @example -  onClosed();
     */
    onClosed(): boolean;
    /**
     *
     * @param message - message
     * @example
     */
    protected onMessage(message: any): void;
    /**
     * method to parse the response
     * ```
     * @example
     * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
     * ```
     */
    protected parse(response: any): AgentAssistBaseResponse;
    /**
     * used to broadcast the acp messages to other tabs.
     * @example -  broadcastCopilotNotifications();
     * @param message - message to broadcast
     */
    broadcastCopilotNotifications(message: any): void;
    /**
     * Callback method when a connection is open and ready to send and receive data
     * @example - onOpen()
     */
    protected onOpen(): void;
    /**
     * Callback method triggered when the WebSocket connection needs to be re-established.
     * Resets the connection ID and reconnects using the stored WebSocket URI and provider ID.
     * @example - onReconnect()
     */
    protected onReconnect(): void;
}
