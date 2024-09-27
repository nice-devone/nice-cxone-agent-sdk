/**
 * model interface for agent assist Configuration
 */
export interface AgentAssistConfig {
    /**
     * Full app title
     */
    AppTitle: string;
    /**
     * The ID of the contact.
     */
    ContactId: string;
    /**
     * Parameters
     */
    Params: {
        /**
         * Id of event provider like agentCopilot
         */
        providerId: string;
        publicFeedback?: boolean;
        privateFeedback?: boolean;
    };
}
/**
 * Enum for Agent Assist App Settings
 */
export declare enum AgentAssistSettings {
    CCAI_MAX_ARTICLES_LIMIT = 30,
    RTIG_MAX_NOTIFICATIONS_LIMIT = 50
}
/**
 * Enum for ACP Configuration Param Keys
 */
export declare enum AgentAssistConfigACPParamsKeys {
    AGENT_COPILOT_PERSONA = "agentCopilotPersona",
    BEHAVIORAL_GUIDANCE = "behavioralGuidance",
    BEHAVIORAL_GUIDANCE_RESPONSE_LENGTH = "behavioralGuidanceResponseLength",
    BEHAVIORAL_GUIDANCE_NUMBER_OF_RESPONSE = "behavioralGuidanceNumberOfResponse",
    CHANNELS = "channels",
    ENABLE_EXPERT_COPILOT_INTEGRATION = "enableExpertCopilotIntegration",
    ENABLE_SENTIMENT = "enableSentiment",
    EXPERT_COPILOT_DEFAULT_PATH = "expertCopilotDefaultPath",
    EXPERT_COPILOT_URL = "expertCopilotURL",
    FINAL_SUMMARY = "finalSummary",
    FINAL_SUMMARY_RESPONSE_LENGTH = "finalSummaryResponseLength",
    GENERATIVE_RESPONSE_TONE = "generativeResponseTone",
    KERNEL_LIMIT = "kernelLimit",
    KERNEL_THRESHOLD = "kernelThreshold",
    KNOWLEDGE_BASE_AGENT_MANUAL_QUERY_INPUT = "knowledgeBaseAgentManualQueryInput",
    KNOWLEDGE_BASE_ARTICLES = "knowledgeBaseArticles",
    KNOWLEDGE_BASE_ARTICLES_RESPONSE_LENGTH = "knowledgeBaseArticlesResponseLength",
    KNOWLEDGE_BASE_IMAGES = "knowledgeBaseImages",
    KNOWLEDGE_BASE_MAXIMUM_IMAGES = "knowledgeBaseMaximumImages",
    KNOWLEDGE_BASE_MAXIMUM_WEB_LINKS = "knowledgeBaseMaximumWebLinks",
    KNOWLEDGE_BASE_PROCESS_STEPS = "knowledgeBaseProcessSteps",
    KNOWLEDGE_BASE_WEB_LINKS = "knowledgeBaseWebLinks",
    LANGUAGE = "language",
    NEXT_BEST_NUMBER_OF_RESPONSE = "nextBestNumberOfResponse",
    NEXT_BEST_RESPONSE = "nextBestResponse",
    NEXT_BEST_RESPONSE_LENGTH = "nextBestResponseLength",
    PROVIDER_ID = "providerId",
    REAL_TIME_SUMMARY = "realTimeSummary",
    REAL_TIME_SUMMARY_RESPONSE_LENGTH = "realTimeSummaryResponseLength",
    SCRIPT_PARAMS = "scriptParams",
    SENTIMENT_RESPONSE_LENGTH = "sentimentResponseLength",
    TRANSCRIPTION_PROFILE_NAME = "transcriptionProfileName",
    PUBLIC_FEEDBACK = "publicFeedback",
    PRIVATE_FEEDBACK = "privateFeedback"
}
