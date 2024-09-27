/**
 * model interface for agent assist payload data
 */
export interface CopilotFeedbackData {
    /**
     * The ObjectId of the card
     */
    objectId: string;
    /**
     * The feedback given by the agent (like, dislike, etc)
     */
    feedback: string;
    /**
     * contactId of the chat/call
     */
    contactId: string;
    /**
     * agentId assigned to the chat/call
     */
    agentId: string;
    /**
     * agentContactId of the chat/call
    */
    agentContactId: string;
    /**
     * unique id for each utterance
     */
    utteranceId: string;
    /**
     * unique identifier for private/public kbAnswer
     */
    kbAnswerUid: string;
}
