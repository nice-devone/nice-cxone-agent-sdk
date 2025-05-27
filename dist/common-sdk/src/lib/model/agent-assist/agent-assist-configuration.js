"use strict";
/**
 * model interface for agent assist Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistConfigACPParamsKeys = exports.AgentAssistSettings = void 0;
/**
 * Enum for Agent Assist App Settings
 */
var AgentAssistSettings;
(function (AgentAssistSettings) {
    AgentAssistSettings[AgentAssistSettings["CCAI_MAX_ARTICLES_LIMIT"] = 30] = "CCAI_MAX_ARTICLES_LIMIT";
    AgentAssistSettings[AgentAssistSettings["RTIG_MAX_NOTIFICATIONS_LIMIT"] = 50] = "RTIG_MAX_NOTIFICATIONS_LIMIT";
})(AgentAssistSettings = exports.AgentAssistSettings || (exports.AgentAssistSettings = {}));
/**
 * Enum for ACP Configuration Param Keys
 */
var AgentAssistConfigACPParamsKeys;
(function (AgentAssistConfigACPParamsKeys) {
    AgentAssistConfigACPParamsKeys["AGENT_COPILOT_PERSONA"] = "agentCopilotPersona";
    AgentAssistConfigACPParamsKeys["BEHAVIORAL_GUIDANCE"] = "behavioralGuidance";
    AgentAssistConfigACPParamsKeys["BEHAVIORAL_GUIDANCE_RESPONSE_LENGTH"] = "behavioralGuidanceResponseLength";
    AgentAssistConfigACPParamsKeys["BEHAVIORAL_GUIDANCE_NUMBER_OF_RESPONSE"] = "behavioralGuidanceNumberOfResponse";
    AgentAssistConfigACPParamsKeys["CHANNELS"] = "channels";
    AgentAssistConfigACPParamsKeys["ENABLE_EXPERT_COPILOT_INTEGRATION"] = "enableExpertCopilotIntegration";
    AgentAssistConfigACPParamsKeys["ENABLE_SENTIMENT"] = "enableSentiment";
    AgentAssistConfigACPParamsKeys["EXPERT_COPILOT_DEFAULT_PATH"] = "expertCopilotDefaultPath";
    AgentAssistConfigACPParamsKeys["EXPERT_COPILOT_URL"] = "expertCopilotURL";
    AgentAssistConfigACPParamsKeys["FINAL_SUMMARY"] = "finalSummary";
    AgentAssistConfigACPParamsKeys["FINAL_SUMMARY_RESPONSE_LENGTH"] = "finalSummaryResponseLength";
    AgentAssistConfigACPParamsKeys["GENERATIVE_RESPONSE_TONE"] = "generativeResponseTone";
    AgentAssistConfigACPParamsKeys["KERNEL_LIMIT"] = "kernelLimit";
    AgentAssistConfigACPParamsKeys["KERNEL_THRESHOLD"] = "kernelThreshold";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_AGENT_MANUAL_QUERY_INPUT"] = "knowledgeBaseAgentManualQueryInput";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_ARTICLES"] = "knowledgeBaseArticles";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_ARTICLES_RESPONSE_LENGTH"] = "knowledgeBaseArticlesResponseLength";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_IMAGES"] = "knowledgeBaseImages";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_MAXIMUM_IMAGES"] = "knowledgeBaseMaximumImages";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_MAXIMUM_WEB_LINKS"] = "knowledgeBaseMaximumWebLinks";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_PROCESS_STEPS"] = "knowledgeBaseProcessSteps";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_BASE_WEB_LINKS"] = "knowledgeBaseWebLinks";
    AgentAssistConfigACPParamsKeys["LANGUAGE"] = "language";
    AgentAssistConfigACPParamsKeys["NEXT_BEST_NUMBER_OF_RESPONSE"] = "nextBestNumberOfResponse";
    AgentAssistConfigACPParamsKeys["NEXT_BEST_RESPONSE"] = "nextBestResponse";
    AgentAssistConfigACPParamsKeys["NEXT_BEST_RESPONSE_LENGTH"] = "nextBestResponseLength";
    AgentAssistConfigACPParamsKeys["PROVIDER_ID"] = "providerId";
    AgentAssistConfigACPParamsKeys["REAL_TIME_SUMMARY"] = "realTimeSummary";
    AgentAssistConfigACPParamsKeys["REAL_TIME_SUMMARY_RESPONSE_LENGTH"] = "realTimeSummaryResponseLength";
    AgentAssistConfigACPParamsKeys["SCRIPT_PARAMS"] = "scriptParams";
    AgentAssistConfigACPParamsKeys["SENTIMENT_RESPONSE_LENGTH"] = "sentimentResponseLength";
    AgentAssistConfigACPParamsKeys["TRANSCRIPTION_PROFILE_NAME"] = "transcriptionProfileName";
    AgentAssistConfigACPParamsKeys["PUBLIC_FEEDBACK"] = "publicFeedback";
    AgentAssistConfigACPParamsKeys["PRIVATE_FEEDBACK"] = "privateFeedback";
    AgentAssistConfigACPParamsKeys["EMAIL_CHANNEL"] = "emailChannel";
    AgentAssistConfigACPParamsKeys["EMAIL_CHANNEL_SIMPLIFY"] = "emailChannelSimplify";
    AgentAssistConfigACPParamsKeys["EMAIL_CHANNEL_EXPAND"] = "emailChannelExpand";
    AgentAssistConfigACPParamsKeys["EMAIL_CHANNEL_REPHRASE"] = "emailChannelRephrase";
    AgentAssistConfigACPParamsKeys["OVERALL_SUBCARD"] = "overallSubcard";
    AgentAssistConfigACPParamsKeys["PER_SUGGESTION_SUBCARDS"] = "perSuggestionSubcards";
    AgentAssistConfigACPParamsKeys["POSITIVE_FEEDBACK"] = "positiveFeedback";
    AgentAssistConfigACPParamsKeys["POSITIVE_FEEDBACK_ENABLED"] = "positiveFeedbackEnabled";
    AgentAssistConfigACPParamsKeys["POSITIVE_COMMENT"] = "positiveComment";
    AgentAssistConfigACPParamsKeys["POSITIVE_COMMENT_ENABLED"] = "positiveCommentEnabled";
    AgentAssistConfigACPParamsKeys["POSITIVE_TAG"] = "positiveTag";
    AgentAssistConfigACPParamsKeys["POSITIVE_TAG_ENABLED"] = "positiveTagEnabled";
    AgentAssistConfigACPParamsKeys["POSITIVE_TAGS"] = "positiveTags";
    AgentAssistConfigACPParamsKeys["NEGATIVE_FEEDBACK"] = "negativeFeedback";
    AgentAssistConfigACPParamsKeys["NEGATIVE_FEEDBACK_ENABLED"] = "negativeFeedbackEnabled";
    AgentAssistConfigACPParamsKeys["NEGATIVE_COMMENT"] = "negativeComment";
    AgentAssistConfigACPParamsKeys["NEGATIVE_COMMENT_ENABLED"] = "negativeCommentEnabled";
    AgentAssistConfigACPParamsKeys["NEGATIVE_TAG"] = "negativeTag";
    AgentAssistConfigACPParamsKeys["NEGATIVE_TAG_ENABLED"] = "negativeTagEnabled";
    AgentAssistConfigACPParamsKeys["NEGATIVE_TAGS"] = "negativeTags";
    AgentAssistConfigACPParamsKeys["UNRATED_FEEDBACK"] = "unratedFeedback";
    AgentAssistConfigACPParamsKeys["GUIDANCE_FEEDBACK_CARDS"] = "guidanceFeedbackCards";
    AgentAssistConfigACPParamsKeys["JOURNEY_SUMMARY"] = "journeySummary";
    AgentAssistConfigACPParamsKeys["LEGAL_DISCLOSURE"] = "legalDisclosure";
    AgentAssistConfigACPParamsKeys["DISCLOSURE_CARD_TITLE"] = "disclosureCardTitle";
    AgentAssistConfigACPParamsKeys["DISCLOSURE_DESCRIPTION"] = "disclosureDescription";
    AgentAssistConfigACPParamsKeys["ENABLE_INPUT_JSON_FILE"] = "enableInputJsonFile";
    AgentAssistConfigACPParamsKeys["KNOWLEDGE_HUB_CONFIG"] = "knowledgeHubConfig";
})(AgentAssistConfigACPParamsKeys = exports.AgentAssistConfigACPParamsKeys || (exports.AgentAssistConfigACPParamsKeys = {}));
//# sourceMappingURL=agent-assist-configuration.js.map