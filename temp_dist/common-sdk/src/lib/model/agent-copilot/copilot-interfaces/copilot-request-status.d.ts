/**
 * model interface for copilot current state
 */
export interface CopilotRequestStatus {
    /**
     * The ID of the contact.
     */
    contactId: string;
    /**
     * UUUID of the utterance
     */
    utteranceId: string;
    /**
     * current state In-Progress/Completed
     */
    currentState: string;
}
