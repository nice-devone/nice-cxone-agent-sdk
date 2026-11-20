/**
 * Model Interface for current Copilot Interaction
 */
export interface CopilotInteraction {
    /**
     * ContactID of the interaction
     */
    contactId: string;
    /**
     * Agent Assist ID of the interaction
     */
    agentAssistId: string;
    /**
     * Media type of the interaction (e.g., 'chat', 'voice')
     */
    mediaType: string;
    /**
     *  Agent User ID associated with the interaction
     */
    agentUid: string;
    /**
     *  Direction of the interaction (e.g., 'inbound', 'outbound')
     */
    direction: string;
    /**
     *  Event of the interaction (e.g., 'start', 'end')
     */
    event: string;
    /**
     *  Contact Start Time
     */
    contactStartTime: Date;
    /**
     *  Contact End Time
     */
    contactEndTime: Date;
    /**
     * CustomerId of the interaction
     */
    customerId: string;
}
