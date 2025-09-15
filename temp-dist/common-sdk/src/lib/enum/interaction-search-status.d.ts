/**
 * Enum for Interaction Search status
 */
export declare enum InteractionSearchStatus {
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
    CLOSED = "closed"
}
