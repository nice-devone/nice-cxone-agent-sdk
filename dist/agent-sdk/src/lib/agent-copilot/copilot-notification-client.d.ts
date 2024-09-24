import { Subject } from 'rxjs';
import { AgentAssistBaseResponse } from '@nice-devone/common-sdk';
import { AgentAssistInput, AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
/**
 *  web socket class for agent copilot
 */
export declare class CopilotNotificationClient extends AgentAssistNotificationService {
    private topic;
    onMessageNotification: Subject<AgentAssistBaseResponse>;
    /**
     * used to connect to the socket.
     * @example -  connect('ws://localhost:8080');
     * @param websocketServerUri - websocketServer uri
     */
    connect(websocketServerUri: string): boolean;
    /**
     * Subscribe to events.
     * @example -  subscribe('topic');
     * @param topic - topic to subscribe
     */
    subscribe(agentCopilotInput: AgentAssistInput): boolean;
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
}
