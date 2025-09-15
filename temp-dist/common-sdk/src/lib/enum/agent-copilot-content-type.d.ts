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
    COMPREHENSIVE_FEEDBACK = "comprehensiveFeedback",
    /**
     * Represents the copilot filter card content type.
     */
    COPILOT_FILTER_CARD = "filtersCard",
    /**
     * Represents the copilot journey summary content type.
     */
    JOURNEY_SUMMARY = "journeySummary",
    /**
    * Represents the copilot disclosure card content type.
    */
    DISCLOSURE = "disclosure",
    /**
     * Represents the Autopilot transfer summary content type.
     */
    AUTOPILOT_TRANSFER_SUMMARY = "autopilotTransferSummary",
    /**
     * Represents the copilot custom card content type.
     */
    CUSTOM_CARD = "customCard",
    /**
     * Represents the copilot Task asist Request State content type.
     */
    TASK_ASSIST = "taskAssist"
}
