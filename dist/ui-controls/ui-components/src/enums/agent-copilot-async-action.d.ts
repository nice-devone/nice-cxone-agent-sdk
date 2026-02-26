/**
 * Enum representing different functionalities of the Agent Copilot Async Action.
 */
export declare enum AgentCopilotAsyncAction {
    /**
     * Represents a search operation in the Copilot system.
     */
    COPILOT_SEARCH = "copilotSearch",
    /**
     * Represents a request to retrieve all Copilot adaptive card schemas.
     */
    GET_ALL_COPILOT_ADAPTIVE_CARD_SCHEMA = "getAllCopilotAdaptiveCardSchema",
    /**
     * Represents a health check operation for the Copilot service.
     */
    HEALTH_CHECK_FOR_COPILOT = "copilotHealthCheckService",
    /**
     * Represents an email operation in the Copilot system.
     */
    COPILOT_EMAIL = "copilotEmail",
    /**
     * Represents update filters operation in the Copilot system.
     */
    COPILOT_UPDATE_FILTERS = "copilotUpdateFilters",
    /**
     * Represents journey summary in the Copilot.
     */
    COPILOT_JOURNEY_SUMMARY = "copilotJourneySummary",
    /**
     * Represent final summary in the Copilot.
     */
    COPILOT_FINAL_SUMMARY = "copilotFinalSummary",
    /**
     * Represents task assist operation in the Copilot system.
     */
    COPILOT_TASK_ASSIST = "copilotTaskAssist",
    /**
     * Represents an auto summary operation in the Copilot system.
     */
    COPILOT_AUTO_SUMMARY = "copilotAutoSummary"
}
