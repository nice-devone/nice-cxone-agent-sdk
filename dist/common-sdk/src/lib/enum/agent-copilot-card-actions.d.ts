/**
 * This is enum for actions in adaptive cards
 */
export declare enum AgentCopilotCardActions {
    /**
     * The action type for expand image
     */
    EXPAND_IMAGE = "expandImage",
    /**
     * The action type for insert image
     */
    INSERT_IMAGE = "insertImage",
    /**
     * The action type for send image
     */
    SEND_IMAGE = "sendImage",
    /**
     * The action type for expand private image
     */
    EXPAND_PRIVATE_IMAGE = "expandPrivateImage",
    /**
     * The action type for insert private image
     */
    INSERT_PRIVATE_IMAGE = "insertPrivateImage",
    /**
     * The action type for send private image
     */
    SEND_PRIVATE_IMAGE = "sendPrivateImage",
    /**
     * The action type for insert article
     */
    INSERT_ARTICLE = "insertArticle",
    /**
     * The action type for send article
     */
    SEND_ARTICLE = "sendArticle",
    /**
     * The action type for insert private article
     */
    INSERT_PRIVATE_ARTICLE = "insertPrivateArticle",
    /**
     * The action type for send private article
     */
    SEND_PRIVATE_ARTICLE = "sendPrivateArticle",
    /**
     * The action type for copy private article
     */
    COPY_PRIVATE_ARTICLE = "copyPrivateArticle",
    /**
     * The action type for insert link
     */
    INSERT_LINK = "insertLink",
    /**
     * The action type for send link
     */
    SEND_LINK = "sendLink",
    /**
    * The action type for insert private link
    */
    INSERT_PRIVATE_LINK = "insertPrivateLink",
    /**
     * The action type for send private link
     */
    SEND_PRIVATE_LINK = "sendPrivateLink",
    /**
     * The action type for send link
     */
    COPY_LINK = "copyLink",
    /**
     * The action type for open internal use container
     */
    OPEN_INTERNAL_USE_CONTAINER = "openInternalUseContainer",
    /**
     * The action type for open image container
     */
    OPEN_IMAGES_CONTAINER = "openImagesContainer",
    /**
     * The action type for open private image container
     */
    OPEN_PRIVATE_IMAGES_CONTAINER = "openPrivateImagesContainer",
    /**
     * The action type for open web container
     */
    OPEN_LINKS_CONTAINER = "openWebLinksContainer",
    /**
     * The action type for open private web container
     */
    OPEN_PRIVATE_LINKS_CONTAINER = "openPrivateWebLinksContainer",
    /**
     * The action type for open process steps container
     */
    OPEN_PROCESS_STEPS_CONTAINER = "openProcessStepsContainer",
    /**
     * The action type for open private process steps container
     */
    OPEN_PRIVATE_PROCESS_STEPS_CONTAINER = "openPrivateProcessStepsContainer",
    /**
     * The action type for insert steps
     */
    INSERT_STEPS = "insertSteps",
    /**
     * The action type for send steps
     */
    SEND_STEPS = "sendSteps",
    /**
     * The action type for insert internal use steps
     */
    INSERT_PRIVATE_STEPS = "insertPrivateSteps",
    /**
     * The action type for send internal use steps
     */
    SEND_PRIVATE_STEPS = "sendPrivateSteps",
    /**
     * The action type for insert internal use step
     */
    INSERT_PRIVATE_STEP = "insertPrivateStep",
    /**
     * The action type for send internal use step
     */
    SEND_PRIVATE_STEP = "sendPrivateStep",
    /**
     * The action type for copy individual kb process step
     */
    COPY_STEPS = "copySteps",
    /**
     * The action type for copy individual kb private process step
     */
    COPY_PRIVATE_STEPS = "copyPrivateSteps",
    /**
     * The action type for insert step
     */
    INSERT_STEP = "insertStep",
    /**
     * The action type for send step
     */
    SEND_STEP = "sendStep",
    /**
     * The action type for copy individual kb process step
     */
    COPY_STEP = "copyStep",
    /**
     * The action type for copy individual kb private process step
     */
    COPY_PRIVATE_STEP = "copyPrivateStep",
    /**
     * The action type for generate email
     */
    GENERATE_EMAIL = "generateEmail",
    /**
     * The action type for like
     */
    LIKE = "like",
    /**
     * The action type for dislike
     */
    DISLIKE = "dislike",
    /** The action type for adding new email topic
     *
     */
    ADD_NEW_TOPICS = "addNewTopics",
    /**
     * The action type for clearing text
     */
    CLEAR_TEXT = "clearText",
    /**
     * The action type for feedback submit data
     */
    SUBMIT_FEEDBACK_DATA = "submitFeedbackData",
    /**
     * The action type for like overall subcard
     */
    LIKE_OVERALL_SUBCARD = "likeOverallSubcard",
    /**
     * The action type for dislike overall subcard
     */
    DISLIKE_OVERALL_SUBCARD = "dislikeOverallSubcard",
    /**
     * The action type for like individual subcards
     */
    LIKE_INDIVIDUAL_SUBCARDS = "likeIndividualCards",
    /**
     * The action type for dislike individual feedback
     */
    DISLIKE_INDIVIDUAL_SUBCARDS = "dislikeIndividualCards",
    /**
     * The action type for open information container
     */
    OPEN_INFO_CONTAINER = "openInfoContainer",
    /**
     * The action type for mofifying filters by opening copilot filter popover
     */
    MODIFY_FILTERS = "modifyFilters",
    /**
     * The action type for expand summary
     */
    EXPAND_SUMMARY = "expandSummary",
    /**
     * The action type for view summary details
     */
    VIEW_DETAILS_CONTAINER = "viewDetailsContainer",
    /**
     * The action type for hide summary details
     */
    HIDE_DETAILS_CONTAINER = "hideDetailsContainer",
    /**
     * The action type for checking contact history
     */
    CHECK_CONTACT_HISTORY = "contactHistory",
    /**
     * The action type for task assist form submit
     */
    TASK_ASSIST_FORM_SUBMIT = "onTaskAssistSubmit",
    /**
     * The action type for cancel running task
     */
    CANCEL_TASK = "cancelTask",
    /**
     * The action type for run task
     */
    RUN_TASK = "runTask",
    /**
     * The action type for open task
     */
    OPEN_TASK = "openTask",
    /**
     * The action type copies the article
     */
    COPY_ARTICLE = "copyArticle",
    /**
    * The action type copies information from the article
    */
    COPY_INFORMATION = "copyInformation",
    /**
     * The action type for copy summary
     */
    COPY_SUMMARY = "copySummary",
    /**
     * The action type for edit summary
     */
    EDIT_SUMMARY = "editSummary",
    /**
     * The action type for save summary
     */
    SAVE_SUMMARY = "saveSummary",
    /**
     * The action type for expand auto summary
     */
    EXPAND_AUTOSUMMARY = "expandAutoSummary",
    /**
     * The action type for retry auto summary
     */
    RETRY_AUTOSUMMARY = "retryAutoSummary",
    /**
     * The action type for opening checklist
     */
    OPEN_CHECKLIST = "openChecklist",
    /**
     * The action type for closing checklist
     */
    CLOSE_CHECKLIST = "closeChecklist"
}
