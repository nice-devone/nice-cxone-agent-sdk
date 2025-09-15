"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCopilotContentType = void 0;
/**
 * Enum representing different types of content from the agent copilot notification service.
 */
var AgentCopilotContentType;
(function (AgentCopilotContentType) {
    /**
     * Represents a real-time summary content type.
     */
    AgentCopilotContentType["RT_SUMMARY"] = "rtSummary";
    /**
     * Represents the Next Best Responses content type.
     */
    AgentCopilotContentType["NEXT_BEST_RESPONSE"] = "nextBestResponse";
    /**
     * Represents the Next Best Responses with LLM content type.
     */
    AgentCopilotContentType["NEXT_BEST_RESPONSE_LLM"] = "nextBestResponseLLM";
    /**
     * Represents the next best response from an expert content type.
     */
    AgentCopilotContentType["NEXT_BEST_RESPONSE_EXPERT"] = "nextBestResponseExpert";
    /**
     * Represents a Sentiment and Reason content type.
     */
    AgentCopilotContentType["SENTIMENT"] = "sentimentAndReason";
    /**
     * Represents the Final Summary notes content type.
     */
    AgentCopilotContentType["FINAL_SUMMARY_NOTES"] = "finalSummaryNotes";
    /**
     * Represents the Current Request State content type.
     */
    AgentCopilotContentType["COPILOT_REQUEST_STATUS"] = "currentRequestState";
    /**
     * Represents the knowledge base combo card content type.
     */
    AgentCopilotContentType["KB_COMBO"] = "kbCombo";
    /**
     * Represents the Transfer Summary contenttype.
     */
    AgentCopilotContentType["TRANSFER_SUMMARY"] = "transferSummary";
    /**
     * Represents the Email content type for email creation.
     */
    AgentCopilotContentType["EMAIL_CREATION_CARD"] = "emailCreationCard";
    /**
     * Represents the Email content type for email response.
     */
    AgentCopilotContentType["EMAIL_RESPONSE_CARD"] = "emailResponseCard";
    /**
     * Represents comprehensive feedback guidance content type
     */
    AgentCopilotContentType["COMPREHENSIVE_FEEDBACK"] = "comprehensiveFeedback";
    /**
     * Represents the copilot filter card content type.
     */
    AgentCopilotContentType["COPILOT_FILTER_CARD"] = "filtersCard";
    /**
     * Represents the copilot journey summary content type.
     */
    AgentCopilotContentType["JOURNEY_SUMMARY"] = "journeySummary";
    /**
    * Represents the copilot disclosure card content type.
    */
    AgentCopilotContentType["DISCLOSURE"] = "disclosure";
    /**
     * Represents the Autopilot transfer summary content type.
     */
    AgentCopilotContentType["AUTOPILOT_TRANSFER_SUMMARY"] = "autopilotTransferSummary";
    /**
     * Represents the copilot custom card content type.
     */
    AgentCopilotContentType["CUSTOM_CARD"] = "customCard";
    /**
     * Represents the copilot Task asist Request State content type.
     */
    AgentCopilotContentType["TASK_ASSIST"] = "taskAssist";
})(AgentCopilotContentType = exports.AgentCopilotContentType || (exports.AgentCopilotContentType = {}));
//# sourceMappingURL=agent-copilot-content-type.js.map