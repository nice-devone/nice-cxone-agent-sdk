/**
 * model interface for agent assist payload data
 */
export interface GuidanceFeedbackData {
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
    /**
     * title of the kbAnswer
     */
    title: string;
    /**
     * tagEnum for the feedback
     */
    tag?: string;
    /**
     * comment given on the feedback
     */
    comment?: string;
}
/**
 * model interface for overall subcards
 */
export interface ContactFeedbackData {
    /**
     * overall feedback title
     */
    overallFeedbackTitle: string;
    /**
     * overall feedback selected
     */
    feedback: string;
    /**
     * tag selected for the overall feedback
     */
    tag?: string;
    /**
     * comment given on the overall feedback
     */
    comment?: string;
}
/**
 * model interface for Comprehensive Feedback Data
 */
export interface OverallContactFeedbackData {
    /**
     * individual feedback data
     */
    guidanceFeedbacks: GuidanceFeedbackData[];
    /**
     * Overall subcard feedback
     */
    contactFeedbackCard: ContactFeedbackData;
}
