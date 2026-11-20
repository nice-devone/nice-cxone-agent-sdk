/**
 * This is enum for container id in adaptive card
 */
export declare enum AgentCopilotContainerId {
    /**
     * The container id type for internal use
     */
    INTERNAL_USE_CONTAINER = "internalUseContainer",
    /**
     * The container id type for web links
     */
    WEB_CONTAINER = "webLinksContainer",
    /**
     * The container id type for image conatiner
     */
    IMAGES_CONTAINER = "imagesContainer",
    /**
     * The container id type for  secondary web links
     */
    PRIVATE_WEB_CONTAINER = "privateWebLinksContainer",
    /**
     * The container id type for secondary image conatiner
     */
    PRIVATE_IMAGES_CONTAINER = "privateImagesContainer",
    /**
     * The container id type for process tseps
     */
    PROCESS_STEPS_CONTAINER = "processStepsContainer",
    /**
    * The container id type for private process steps
    */
    PRIVATE_PROCESS_STEPS_CONTAINER = "privateProcessStepsContainer",
    /**
     * The container id type for kb answers
     */
    KB_ANSWERS = "kbAnswers",
    /**
     * The container id type for kb internal use
     */
    CUSTOM_CARD = "customCard",
    /**
     * The container id type for kb internal use
     */
    KB_INTERNAL = "kbInternalUse",
    /**
     * The container id type for kb links
     */
    KB_LINKS = "kbLinks",
    /**
    * The container id type for kb private links
    */
    KB_PRIVATE_LINKS = "kbInternalUseLinks",
    /**
     * The container id type for kb images
     */
    KB_IMAGES = "kbImages",
    /**
    * The container id type for kb private images
    */
    KB_PRIVATE_IMAGES = "kbInternalUseImages",
    /**
     * The container id type for kb process steps
     */
    KB_PROCESS_STEPS = "kbProcessSteps",
    /**
     * The container id type for information container
     */
    INFORMATION_CONTAINER = "informationContainer",
    /**
     * The container id type for email generating container
     */
    REPLY_GENERATING_CONTAINER = "replyGeneratingContainer",
    /**
     * The container id for showing the topic container
     */
    SHOW_TOPIC_CONTAINER = "showTopicContainer",
    /**
     * The container id for adding a topic action container
     */
    ADD_TOPIC_ACTION_CONTAINER = "addTopicActionContainer",
    /**
     * The container id for set of response topics
     */
    RESPONSE_OPTION_CONTAINER = "responseOptionsContainer",
    /**
     * The container id for add topics button
     */
    TOPIC_CONTAINER = "topicContainer",
    /**
     * The container id for error message container
     */
    ERROR_MESSAGE_CONTAINER = "errorMessageContainer",
    /**
     * The container id for initial container
     */
    INITIAL_CONTAINER = "initialContainer",
    /**
    * The container id for new added topics
    */
    ADD_TOPICS_CONTAINER = "addTopicActionContainer,",
    /**
    * The container id for feedback suggestion container
    */
    FEEDBACK_SUGGESTION_CONTAINER = "suggestionsContainer",
    /**
     * The container id for comprehensive feedback card
     */
    COMPREHENSIVE_FEEDBACK_CONTAINER = "comprehensiveFeedback",
    /**
     * Container for comprehensive feedback like
     */
    FEEDBACK_LIKE_CONTAINER = "feedbackLike",
    /**
     * Container for comprehensive feedback dislike
     */
    FEEDBACK_DISLIKE_CONTAINER = "feedbackDislike",
    /**
     * Container for feedbacks of overall subcard
     */
    FEEDBACK_CONTAINER = "feedback",
    /**
     * Container for feedbacks of individual subcards
     */
    FEEDBACK_TOPICS_CONTAINER = "feedbackTopicsContainer",
    /**
     * The container id type for filters used container
     */
    FILTERS_USED = "filtersUsedContainer",
    /**
     * The container id type for filters title container
     */
    FILTERS_TITLE_CONTAINER = "filtersTitleContainer",
    /**
     * The container id type for filters container
     */
    FILTERS_CONTAINER = "filtersContainer",
    /**
     * The container id mofify filters button container
     */
    MODIFY_FILTERS_CONTAINER = "buttonContainer",
    /**
     * The container ID for custom options.
     */
    CUSTOM_OPTION_CONTAINER = "customOption",
    /**
     *  The container id type for collapse Journey Summary Container
     */
    JOURNEY_SUMMARY_CONTAINER = "collapseJourneySummaryContainer",
    /**
    *  The container id type for Expand Journey Summary Container
    */
    JOURNEY_SUMMARY = "expandJourneySummaryContainer",
    /**
    *  The container id type for summary Detail Containers
    */
    SUMMARY_DETAILS_CONTAINER = "summaryDetailContainers",
    /**
    *  The container id type for view Details Container
    */
    VIEW_DETAILS_CONTAINER = "viewDetailsContainer",
    /**
    *  The container id type for hide Details Container
    */
    HIDE_DETAILS_CONTAINER = "hideDetailsContainer",
    /**
    *  The container id type for interaction Data Container
    */
    INTERACTION_DETAILS_CONTAINER = "interactionDataContainer",
    /**
    *  The container id type for task assist Data Container
    */
    TASK_ASSIST_CONTAINER = "taskAssist",
    /**
     * The container id type for private kb process steps
     */
    KB_PRIVATE_PROCESS_STEPS = "KbPrivateProcessSteps",
    /**
     * The container id type for autoSummary card container
     */
    AUTO_SUMMARY_CONTAINER = "autoSummaryContainer",
    /**
    * The container id type for checklist card container
    */
    CHECKLIST_CONTAINER = "informationContainer"
}
