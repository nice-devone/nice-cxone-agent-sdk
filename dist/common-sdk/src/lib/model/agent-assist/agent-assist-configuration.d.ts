/**
 * model interface for agent assist Configuration
 */
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
    PRIVATE_FEEDBACK = "privateFeedback",
    EMAIL_CHANNEL = "emailChannel",
    EMAIL_CHANNEL_SIMPLIFY = "emailChannelSimplify",
    EMAIL_CHANNEL_EXPAND = "emailChannelExpand",
    EMAIL_CHANNEL_REPHRASE = "emailChannelRephrase",
    OVERALL_SUBCARD = "overallSubcard",
    PER_SUGGESTION_SUBCARDS = "perSuggestionSubcards",
    POSITIVE_FEEDBACK = "positiveFeedback",
    POSITIVE_FEEDBACK_ENABLED = "positiveFeedbackEnabled",
    POSITIVE_COMMENT = "positiveComment",
    POSITIVE_COMMENT_ENABLED = "positiveCommentEnabled",
    POSITIVE_TAG = "positiveTag",
    POSITIVE_TAG_ENABLED = "positiveTagEnabled",
    POSITIVE_TAGS = "positiveTags",
    NEGATIVE_FEEDBACK = "negativeFeedback",
    NEGATIVE_FEEDBACK_ENABLED = "negativeFeedbackEnabled",
    NEGATIVE_COMMENT = "negativeComment",
    NEGATIVE_COMMENT_ENABLED = "negativeCommentEnabled",
    NEGATIVE_TAG = "negativeTag",
    NEGATIVE_TAG_ENABLED = "negativeTagEnabled",
    NEGATIVE_TAGS = "negativeTags",
    UNRATED_FEEDBACK = "unratedFeedback",
    GUIDANCE_FEEDBACK_CARDS = "guidanceFeedbackCards",
    JOURNEY_SUMMARY = "journeySummary",
    LEGAL_DISCLOSURE = "legalDisclosure",
    DISCLOSURE_CARD_TITLE = "disclosureCardTitle",
    DISCLOSURE_DESCRIPTION = "disclosureDescription"
}
export interface CopilotProfileConfig {
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
        /**
         * Determines if public feedback is enabled
         */
        publicFeedback: boolean;
        /**
         *Determines if private feedback is enabled
         */
        privateFeedback: boolean;
        /**
         * Determines if there is an overall subcard present.
         */
        overallSubcard: boolean;
        /**
         * Determines if there are subcards per suggestion is enable.
         */
        guidanceFeedbackCards: boolean;
        /**
         * Determines if the positive tags are enable
         */
        positiveTagEnabled: boolean;
        /**
         * Determines if the negative tags are enable
         */
        negativeTagEnabled: boolean;
        /**
         * Contains an array of positive feedback tags.
         */
        positiveTags: string[];
        /**
         * Contains an array of negative feedback tags.
         */
        negativeTags: string[];
        /**
         * Determines if the Like is enable
         */
        positiveFeedbackEnabled: boolean;
        /**
         *  Determines if the dislike is enable
         */
        negativeFeedbackEnabled: boolean;
        /**
         *  Determines if the comment section for the positive feedback is enable
         */
        positiveCommentEnabled: boolean;
        /**
         *  Determines if the comment section for the negative feedback is enable
         */
        negativeCommentEnabled: boolean;
        /**
         * Indicates if the feedback is unrated.
         */
        unratedFeedback: boolean;
        /**
         * Indicates language.
         */
        language: string;
        /**
         * Indicates generative response tone.
         */
        generativeResponseTone: string;
        /**
         * Indicates if journey summary is enabled.
         */
        journeySummary: boolean;
        /**
         * Indicates the count of the journey summary interaction.
         */
        journeySummaryInteractionCount: number;
        /**
         * Indicates the period of the journey summary interaction.
         */
        journeySummaryInteractionPeriod: number;
        /**
         * Indicates the length of the journey summary response.
         */
        journeySummaryResponseLength: number;
        /**
         * Indicates if the journey summary detail view is enabled.
         */
        journeySummaryDetailView: boolean;
    };
}
