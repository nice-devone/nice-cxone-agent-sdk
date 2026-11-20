"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCopilotContainerId = void 0;
/**
 * This is enum for container id in adaptive card
 */
var AgentCopilotContainerId;
(function (AgentCopilotContainerId) {
    /**
     * The container id type for internal use
     */
    AgentCopilotContainerId["INTERNAL_USE_CONTAINER"] = "internalUseContainer";
    /**
     * The container id type for web links
     */
    AgentCopilotContainerId["WEB_CONTAINER"] = "webLinksContainer";
    /**
     * The container id type for image conatiner
     */
    AgentCopilotContainerId["IMAGES_CONTAINER"] = "imagesContainer";
    /**
     * The container id type for  secondary web links
     */
    AgentCopilotContainerId["PRIVATE_WEB_CONTAINER"] = "privateWebLinksContainer";
    /**
     * The container id type for secondary image conatiner
     */
    AgentCopilotContainerId["PRIVATE_IMAGES_CONTAINER"] = "privateImagesContainer";
    /**
     * The container id type for process tseps
     */
    AgentCopilotContainerId["PROCESS_STEPS_CONTAINER"] = "processStepsContainer";
    /**
    * The container id type for private process steps
    */
    AgentCopilotContainerId["PRIVATE_PROCESS_STEPS_CONTAINER"] = "privateProcessStepsContainer";
    /**
     * The container id type for kb answers
     */
    AgentCopilotContainerId["KB_ANSWERS"] = "kbAnswers";
    /**
     * The container id type for kb internal use
     */
    AgentCopilotContainerId["CUSTOM_CARD"] = "customCard";
    /**
     * The container id type for kb internal use
     */
    AgentCopilotContainerId["KB_INTERNAL"] = "kbInternalUse";
    /**
     * The container id type for kb links
     */
    AgentCopilotContainerId["KB_LINKS"] = "kbLinks";
    /**
    * The container id type for kb private links
    */
    AgentCopilotContainerId["KB_PRIVATE_LINKS"] = "kbInternalUseLinks";
    /**
     * The container id type for kb images
     */
    AgentCopilotContainerId["KB_IMAGES"] = "kbImages";
    /**
    * The container id type for kb private images
    */
    AgentCopilotContainerId["KB_PRIVATE_IMAGES"] = "kbInternalUseImages";
    /**
     * The container id type for kb process steps
     */
    AgentCopilotContainerId["KB_PROCESS_STEPS"] = "kbProcessSteps";
    /**
     * The container id type for information container
     */
    AgentCopilotContainerId["INFORMATION_CONTAINER"] = "informationContainer";
    /**
     * The container id type for email generating container
     */
    AgentCopilotContainerId["REPLY_GENERATING_CONTAINER"] = "replyGeneratingContainer";
    /**
     * The container id for showing the topic container
     */
    AgentCopilotContainerId["SHOW_TOPIC_CONTAINER"] = "showTopicContainer";
    /**
     * The container id for adding a topic action container
     */
    AgentCopilotContainerId["ADD_TOPIC_ACTION_CONTAINER"] = "addTopicActionContainer";
    /**
     * The container id for set of response topics
     */
    AgentCopilotContainerId["RESPONSE_OPTION_CONTAINER"] = "responseOptionsContainer";
    /**
     * The container id for add topics button
     */
    AgentCopilotContainerId["TOPIC_CONTAINER"] = "topicContainer";
    /**
     * The container id for error message container
     */
    AgentCopilotContainerId["ERROR_MESSAGE_CONTAINER"] = "errorMessageContainer";
    /**
     * The container id for initial container
     */
    AgentCopilotContainerId["INITIAL_CONTAINER"] = "initialContainer";
    /**
    * The container id for new added topics
    */
    AgentCopilotContainerId["ADD_TOPICS_CONTAINER"] = "addTopicActionContainer,";
    /**
    * The container id for feedback suggestion container
    */
    AgentCopilotContainerId["FEEDBACK_SUGGESTION_CONTAINER"] = "suggestionsContainer";
    /**
     * The container id for comprehensive feedback card
     */
    AgentCopilotContainerId["COMPREHENSIVE_FEEDBACK_CONTAINER"] = "comprehensiveFeedback";
    /**
     * Container for comprehensive feedback like
     */
    AgentCopilotContainerId["FEEDBACK_LIKE_CONTAINER"] = "feedbackLike";
    /**
     * Container for comprehensive feedback dislike
     */
    AgentCopilotContainerId["FEEDBACK_DISLIKE_CONTAINER"] = "feedbackDislike";
    /**
     * Container for feedbacks of overall subcard
     */
    AgentCopilotContainerId["FEEDBACK_CONTAINER"] = "feedback";
    /**
     * Container for feedbacks of individual subcards
     */
    AgentCopilotContainerId["FEEDBACK_TOPICS_CONTAINER"] = "feedbackTopicsContainer";
    /**
     * The container id type for filters used container
     */
    AgentCopilotContainerId["FILTERS_USED"] = "filtersUsedContainer";
    /**
     * The container id type for filters title container
     */
    AgentCopilotContainerId["FILTERS_TITLE_CONTAINER"] = "filtersTitleContainer";
    /**
     * The container id type for filters container
     */
    AgentCopilotContainerId["FILTERS_CONTAINER"] = "filtersContainer";
    /**
     * The container id mofify filters button container
     */
    AgentCopilotContainerId["MODIFY_FILTERS_CONTAINER"] = "buttonContainer";
    /**
     * The container ID for custom options.
     */
    AgentCopilotContainerId["CUSTOM_OPTION_CONTAINER"] = "customOption";
    /**
     *  The container id type for collapse Journey Summary Container
     */
    AgentCopilotContainerId["JOURNEY_SUMMARY_CONTAINER"] = "collapseJourneySummaryContainer";
    /**
    *  The container id type for Expand Journey Summary Container
    */
    AgentCopilotContainerId["JOURNEY_SUMMARY"] = "expandJourneySummaryContainer";
    /**
    *  The container id type for summary Detail Containers
    */
    AgentCopilotContainerId["SUMMARY_DETAILS_CONTAINER"] = "summaryDetailContainers";
    /**
    *  The container id type for view Details Container
    */
    AgentCopilotContainerId["VIEW_DETAILS_CONTAINER"] = "viewDetailsContainer";
    /**
    *  The container id type for hide Details Container
    */
    AgentCopilotContainerId["HIDE_DETAILS_CONTAINER"] = "hideDetailsContainer";
    /**
    *  The container id type for interaction Data Container
    */
    AgentCopilotContainerId["INTERACTION_DETAILS_CONTAINER"] = "interactionDataContainer";
    /**
    *  The container id type for task assist Data Container
    */
    AgentCopilotContainerId["TASK_ASSIST_CONTAINER"] = "taskAssist";
    /**
     * The container id type for private kb process steps
     */
    AgentCopilotContainerId["KB_PRIVATE_PROCESS_STEPS"] = "KbPrivateProcessSteps";
    /**
     * The container id type for autoSummary card container
     */
    AgentCopilotContainerId["AUTO_SUMMARY_CONTAINER"] = "autoSummaryContainer";
    /**
    * The container id type for checklist card container
    */
    AgentCopilotContainerId["CHECKLIST_CONTAINER"] = "informationContainer";
})(AgentCopilotContainerId = exports.AgentCopilotContainerId || (exports.AgentCopilotContainerId = {}));
//# sourceMappingURL=agent-copilot-container-id.js.map