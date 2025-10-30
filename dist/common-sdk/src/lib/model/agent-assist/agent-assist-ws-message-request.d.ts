/**
 * AgentAssistWSRequest is the request object for the Agent Assist WebSocket connection.
 */
export interface AgentAssistWSRequest {
    webSocketUri: string;
    contactId: string;
    subscriptions: string[];
    providerId: string;
    metadata?: any;
    subCategory?: string;
}
