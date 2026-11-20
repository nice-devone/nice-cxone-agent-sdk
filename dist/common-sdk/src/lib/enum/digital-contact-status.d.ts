/**
 * Enum for Digital Case Status
 */
export declare enum DigitalContactStatus {
    /**
    * Initial Case Status when the contact is accepted by agent
    */
    NEW = "new",
    /**
    * Contact is being handled by agent
    */
    OPEN = "open",
    /**
    * The communication is still in progress for the contact
    */
    PENDING = "pending",
    /**
    * The contact is escalated to some other agent
    */
    ESCALATED = "escalated",
    /**
    * The contact is resolved after communication
    */
    RESOLVED = "resolved",
    /**
    * The contact is closed when there is no further communication
    */
    CLOSED = "closed",
    /**
    * The contact is initiated but not yet accepted
    */
    INCOMING = "Incoming",
    /**
     * Initial status for outbound operations till the communication is not established
     */
    DRAFT = "draft"
}
/**
 * Enum for Digital Case End Reason
 */
export declare enum DigitalContactEndReason {
    /**
     * The agent closed the contact from Agent Workspace.
     */
    AGENT_ENDED = "AGENT_ENDED",
    /**
     * The contact was closed via Interaction Search
     */
    ADMIN_TERMINATED = "ADMIN_TERMINATED"
}
