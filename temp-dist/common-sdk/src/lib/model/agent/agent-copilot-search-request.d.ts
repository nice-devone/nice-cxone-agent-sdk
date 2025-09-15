/**
 * Interface representing Copilot details.
 */
export interface AgentCopilotSearchRequest {
    /**
   * The ID of the agent.
   */
    agentId: number;
    /**
     * The ID of the contact.
     */
    contactId: string;
    /**
     * The ID of the connection.
     */
    connectionId: string;
    /**
     * The token ID.
     */
    tokenId: string;
    /**
     * The tenant ID.
     */
    tenantId: string;
}
