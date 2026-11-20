"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCopilotCardActions = void 0;
/**
 * This is enum for actions in adaptive cards
 */
var AgentCopilotCardActions;
(function (AgentCopilotCardActions) {
    /**
     * The action type for expand image
     */
    AgentCopilotCardActions["EXPAND_IMAGE"] = "expandImage";
    /**
     * The action type for insert image
     */
    AgentCopilotCardActions["INSERT_IMAGE"] = "insertImage";
    /**
     * The action type for send image
     */
    AgentCopilotCardActions["SEND_IMAGE"] = "sendImage";
    /**
     * The action type for expand private image
     */
    AgentCopilotCardActions["EXPAND_PRIVATE_IMAGE"] = "expandPrivateImage";
    /**
     * The action type for insert private image
     */
    AgentCopilotCardActions["INSERT_PRIVATE_IMAGE"] = "insertPrivateImage";
    /**
     * The action type for send private image
     */
    AgentCopilotCardActions["SEND_PRIVATE_IMAGE"] = "sendPrivateImage";
    /**
     * The action type for insert article
     */
    AgentCopilotCardActions["INSERT_ARTICLE"] = "insertArticle";
    /**
     * The action type for send article
     */
    AgentCopilotCardActions["SEND_ARTICLE"] = "sendArticle";
    /**
     * The action type for insert private article
     */
    AgentCopilotCardActions["INSERT_PRIVATE_ARTICLE"] = "insertPrivateArticle";
    /**
     * The action type for send private article
     */
    AgentCopilotCardActions["SEND_PRIVATE_ARTICLE"] = "sendPrivateArticle";
    /**
     * The action type for copy private article
     */
    AgentCopilotCardActions["COPY_PRIVATE_ARTICLE"] = "copyPrivateArticle";
    /**
     * The action type for insert link
     */
    AgentCopilotCardActions["INSERT_LINK"] = "insertLink";
    /**
     * The action type for send link
     */
    AgentCopilotCardActions["SEND_LINK"] = "sendLink";
    /**
    * The action type for insert private link
    */
    AgentCopilotCardActions["INSERT_PRIVATE_LINK"] = "insertPrivateLink";
    /**
     * The action type for send private link
     */
    AgentCopilotCardActions["SEND_PRIVATE_LINK"] = "sendPrivateLink";
    /**
     * The action type for send link
     */
    AgentCopilotCardActions["COPY_LINK"] = "copyLink";
    /**
     * The action type for open internal use container
     */
    AgentCopilotCardActions["OPEN_INTERNAL_USE_CONTAINER"] = "openInternalUseContainer";
    /**
     * The action type for open image container
     */
    AgentCopilotCardActions["OPEN_IMAGES_CONTAINER"] = "openImagesContainer";
    /**
     * The action type for open private image container
     */
    AgentCopilotCardActions["OPEN_PRIVATE_IMAGES_CONTAINER"] = "openPrivateImagesContainer";
    /**
     * The action type for open web container
     */
    AgentCopilotCardActions["OPEN_LINKS_CONTAINER"] = "openWebLinksContainer";
    /**
     * The action type for open private web container
     */
    AgentCopilotCardActions["OPEN_PRIVATE_LINKS_CONTAINER"] = "openPrivateWebLinksContainer";
    /**
     * The action type for open process steps container
     */
    AgentCopilotCardActions["OPEN_PROCESS_STEPS_CONTAINER"] = "openProcessStepsContainer";
    /**
     * The action type for open private process steps container
     */
    AgentCopilotCardActions["OPEN_PRIVATE_PROCESS_STEPS_CONTAINER"] = "openPrivateProcessStepsContainer";
    /**
     * The action type for insert steps
     */
    AgentCopilotCardActions["INSERT_STEPS"] = "insertSteps";
    /**
     * The action type for send steps
     */
    AgentCopilotCardActions["SEND_STEPS"] = "sendSteps";
    /**
     * The action type for insert internal use steps
     */
    AgentCopilotCardActions["INSERT_PRIVATE_STEPS"] = "insertPrivateSteps";
    /**
     * The action type for send internal use steps
     */
    AgentCopilotCardActions["SEND_PRIVATE_STEPS"] = "sendPrivateSteps";
    /**
     * The action type for insert internal use step
     */
    AgentCopilotCardActions["INSERT_PRIVATE_STEP"] = "insertPrivateStep";
    /**
     * The action type for send internal use step
     */
    AgentCopilotCardActions["SEND_PRIVATE_STEP"] = "sendPrivateStep";
    /**
     * The action type for copy individual kb process step
     */
    AgentCopilotCardActions["COPY_STEPS"] = "copySteps";
    /**
     * The action type for copy individual kb private process step
     */
    AgentCopilotCardActions["COPY_PRIVATE_STEPS"] = "copyPrivateSteps";
    /**
     * The action type for insert step
     */
    AgentCopilotCardActions["INSERT_STEP"] = "insertStep";
    /**
     * The action type for send step
     */
    AgentCopilotCardActions["SEND_STEP"] = "sendStep";
    /**
     * The action type for copy individual kb process step
     */
    AgentCopilotCardActions["COPY_STEP"] = "copyStep";
    /**
     * The action type for copy individual kb private process step
     */
    AgentCopilotCardActions["COPY_PRIVATE_STEP"] = "copyPrivateStep";
    /**
     * The action type for generate email
     */
    AgentCopilotCardActions["GENERATE_EMAIL"] = "generateEmail";
    /**
     * The action type for like
     */
    AgentCopilotCardActions["LIKE"] = "like";
    /**
     * The action type for dislike
     */
    AgentCopilotCardActions["DISLIKE"] = "dislike";
    /** The action type for adding new email topic
     *
     */
    AgentCopilotCardActions["ADD_NEW_TOPICS"] = "addNewTopics";
    /**
     * The action type for clearing text
     */
    AgentCopilotCardActions["CLEAR_TEXT"] = "clearText";
    /**
     * The action type for feedback submit data
     */
    AgentCopilotCardActions["SUBMIT_FEEDBACK_DATA"] = "submitFeedbackData";
    /**
     * The action type for like overall subcard
     */
    AgentCopilotCardActions["LIKE_OVERALL_SUBCARD"] = "likeOverallSubcard";
    /**
     * The action type for dislike overall subcard
     */
    AgentCopilotCardActions["DISLIKE_OVERALL_SUBCARD"] = "dislikeOverallSubcard";
    /**
     * The action type for like individual subcards
     */
    AgentCopilotCardActions["LIKE_INDIVIDUAL_SUBCARDS"] = "likeIndividualCards";
    /**
     * The action type for dislike individual feedback
     */
    AgentCopilotCardActions["DISLIKE_INDIVIDUAL_SUBCARDS"] = "dislikeIndividualCards";
    /**
     * The action type for open information container
     */
    AgentCopilotCardActions["OPEN_INFO_CONTAINER"] = "openInfoContainer";
    /**
     * The action type for mofifying filters by opening copilot filter popover
     */
    AgentCopilotCardActions["MODIFY_FILTERS"] = "modifyFilters";
    /**
     * The action type for expand summary
     */
    AgentCopilotCardActions["EXPAND_SUMMARY"] = "expandSummary";
    /**
     * The action type for view summary details
     */
    AgentCopilotCardActions["VIEW_DETAILS_CONTAINER"] = "viewDetailsContainer";
    /**
     * The action type for hide summary details
     */
    AgentCopilotCardActions["HIDE_DETAILS_CONTAINER"] = "hideDetailsContainer";
    /**
     * The action type for checking contact history
     */
    AgentCopilotCardActions["CHECK_CONTACT_HISTORY"] = "contactHistory";
    /**
     * The action type for task assist form submit
     */
    AgentCopilotCardActions["TASK_ASSIST_FORM_SUBMIT"] = "onTaskAssistSubmit";
    /**
     * The action type for cancel running task
     */
    AgentCopilotCardActions["CANCEL_TASK"] = "cancelTask";
    /**
     * The action type for run task
     */
    AgentCopilotCardActions["RUN_TASK"] = "runTask";
    /**
     * The action type for open task
     */
    AgentCopilotCardActions["OPEN_TASK"] = "openTask";
    /**
     * The action type copies the article
     */
    AgentCopilotCardActions["COPY_ARTICLE"] = "copyArticle";
    /**
    * The action type copies information from the article
    */
    AgentCopilotCardActions["COPY_INFORMATION"] = "copyInformation";
    /**
     * The action type for copy summary
     */
    AgentCopilotCardActions["COPY_SUMMARY"] = "copySummary";
    /**
     * The action type for edit summary
     */
    AgentCopilotCardActions["EDIT_SUMMARY"] = "editSummary";
    /**
     * The action type for save summary
     */
    AgentCopilotCardActions["SAVE_SUMMARY"] = "saveSummary";
    /**
     * The action type for expand auto summary
     */
    AgentCopilotCardActions["EXPAND_AUTOSUMMARY"] = "expandAutoSummary";
    /**
     * The action type for retry auto summary
     */
    AgentCopilotCardActions["RETRY_AUTOSUMMARY"] = "retryAutoSummary";
    /**
     * The action type for opening checklist
     */
    AgentCopilotCardActions["OPEN_CHECKLIST"] = "openChecklist";
    /**
     * The action type for closing checklist
     */
    AgentCopilotCardActions["CLOSE_CHECKLIST"] = "closeChecklist";
})(AgentCopilotCardActions = exports.AgentCopilotCardActions || (exports.AgentCopilotCardActions = {}));
//# sourceMappingURL=agent-copilot-card-actions.js.map