/**
 * Enum representing different types of content from the agent copilot notification service.
 */
export declare enum AgentCopilotContentType {
    /**
     * Represents a real-time summary content type.
     */
    RT_SUMMARY = "rtSummary",
    /**
     * Represents the Next Best Responses content type.
     */
    NEXT_BEST_RESPONSE = "nextBestResponse",
    /**
     * Represents the Next Best Responses with LLM content type.
     */
    NEXT_BEST_RESPONSE_LLM = "nextBestResponseLLM",
    /**
     * Represents the next best response from an expert content type.
     */
    NEXT_BEST_RESPONSE_EXPERT = "nextBestResponseExpert",
    /**
     * Represents a Sentiment and Reason content type.
     */
    SENTIMENT = "sentimentAndReason",
    /**
     * Represents the Final Summary notes content type.
     */
    FINAL_SUMMARY_NOTES = "finalSummaryNotes",
    /**
     * Represents the Current Request State content type.
     */
    COPILOT_REQUEST_STATUS = "currentRequestState",
    /**
     * Represents the knowledge base combo card content type.
     */
    KB_COMBO = "kbCombo",
    /**
     * Represents the Transfer Summary contenttype.
     */
    TRANSFER_SUMMARY = "transferSummary",
    /**
     * Represents the Email content type for email creation.
     */
    EMAIL_CREATION_CARD = "emailCreationCard",
    /**
     * Represents the Email content type for email response.
     */
    EMAIL_RESPONSE_CARD = "emailResponseCard",
    /**
     * Represents comprehensive feedback guidance content type
     */
    COMP_FEEDBACK_GUIDANCE = "comprehensiveFeedback"
}
