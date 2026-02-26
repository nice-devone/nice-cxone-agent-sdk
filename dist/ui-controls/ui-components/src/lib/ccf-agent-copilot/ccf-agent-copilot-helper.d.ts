import { copilotAdaptiveCardIcon } from './ccf-agent-copilot-container.slice';
import { Dispatch, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CopilotMessageData, OverallContactFeedbackData, GuidanceFeedbackData, CopilotAdaptiveCard, IntentConfig, TaskAssistConfig, ValidationInfo } from '@nice-devone/common-sdk';
/**
 * This is enum for adaptive card types
 */
export declare enum AdaptiveCardType {
    /**
     * The card type for textblock
     */
    TEXTBLOCK = "TextBlock",
    /**
     * The card type for container
     */
    CONTAINER = "Container",
    /**
     * The card type for columnset
     */
    COLUMNSET = "ColumnSet",
    /**
     * The card type for column
     */
    COLUMN = "Column",
    /**
     * The card type for image
     */
    IMAGE = "Image",
    /**
     * The card type for icons
     */
    ICONS = "Icons"
}
/**
 * This is enum for actions in adaptive cards
 */
export declare enum CardActions {
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
     * The action type for insert link
     */
    INSERT_LINK = "insertLink",
    /**
     * The action type for send link
     */
    SEND_LINK = "sendLink",
    /**
     * The action type for open internal use container
     */
    OPEN_INTERNAL_USE_CONTAINER = "openInternalUseContainer",
    /**
     * The action type for open image container
     */
    OPEN_IMAGES_CONTAINER = "openImagesContainer",
    /**
     * The action type for open web container
     */
    OPEN_LINKS_CONTAINER = "openWebLinksContainer",
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
     * The action type for insert step
     */
    INSERT_STEP = "insertStep",
    /**
     * The action type for send step
     */
    SEND_STEP = "sendStep",
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
     * The action type for generate email
     */
    GENERATE_EMAIL = "generateEmail",
    /**
     * The action type for like
     */
    LIKE = "likeArticle",
    /**
     * The action type for dislike
     */
    DISLIKE = "dislikeArticle",
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
    RETRY_AUTOSUMMARY = "retryAutoSummary"
}
/**
 * This is enum for container id in adaptive card
 */
export declare enum ContainerId {
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
     * The container id type for process steps
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
     * The container id type for kb images
     */
    KB_IMAGES = "kbImages",
    /**
     * The container id type for kb process steps
     */
    KB_PROCESS_STEPS = "kbProcessSteps",
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
    AUTO_SUMMARY_CONTAINER = "autoSummaryContainer"
}
/**
 * This is type for actions in adaptive card
 */
export declare type ActionMetaData = {
    /**
     * The type for data in actions
     */
    data: {
        /**
         * The name of action
         */
        name: string;
        /**
         * The url for image to be replaced
         */
        newImageUrl?: string;
        /**
         * The index of action
         */
        index?: string;
        /**
         * The link of action
         */
        link?: string;
        /**
         * The flag for visibility of container
         */
        isVisible?: boolean;
        /**
         * An email topics with their IDs and content.
         */
        emailTopics?: {
            topicId: string;
            content: string;
        }[];
        /**
         * A custom option for the email topics.
         */
        customOption?: string;
        /**
         * The first custom topic.
         */
        customTopics0?: string;
        /**
         * The second custom topic.
         */
        customTopics1?: string;
        /**
         * The third custom topic.
         */
        customTopics2?: string;
        /**
         * The ID of the text input.
         */
        textInputId: string;
        /**
         * The value of the text input.
         */
        value?: string;
        /**
         * id of on clicked container.
         */
        containerId: string;
        /**
         * contact number
         */
        contactNumber: string;
        /**
         * The configuration for intent.
         */
        intentConfig: IntentConfig;
        /**
         * The configuration for edited summary.
         */
        editedSummary: string;
        /**
         * The intent name for task assist.
         */
        intentName?: string;
        /**
         * Indicates whether the final summary has been generated.
         */
        isFinalSummaryGenerated: boolean;
    };
    /**
     * The title of action
     */
    title?: string;
    /**
     * The type of action
     */
    type: string;
};
/**
 * This is interface for image object in adaptive card
 */
export interface AdaptiveCardImageObject {
    /**
     * The type of image object
     */
    type: string;
    /**
     * The url of image
     */
    url?: string;
    /**
     * The height of image
     */
    height: string;
    /**
     * id of the image
     */
    id?: string;
    /**
     * The action for image
     */
    selectAction: {
        /**
         * The type of action
         */
        type: string;
        /**
         * The title of action
         */
        title: string;
        /**
         * The type of image object
         */
        data: {
            /**
             *  The name of action
             */
            name: string;
            /**
             *  The type for data in actions
             */
            action: string;
            /**
             * The index of action
             */
            index: number;
            /**
             * The url for image to be replaced
             */
            newImageUrl: string;
        };
    };
}
/**
 * This is interface for elements in adaptive card
 */
export interface CardElement {
    /**
     * The type of element in adaptive card
     */
    type?: string;
    /**
     * The url of image
     */
    url?: string;
    /**
     * The altText of image
     */
    altText?: string;
    /**
     * The text in card element
     */
    text?: string;
    /**
     * The weight of text
     */
    weight?: string;
    /**
     * The items in card element
     */
    items?: CardElement[];
    /**
     * The columns in card element
     */
    columns?: CardElement[];
    /**
     * The flag for visibility of card element
     */
    isVisible?: boolean;
    /**
     * The id of card element
     */
    id?: string;
    /**
     * The action object for card element
     */
    selectAction?: ActionMetaData;
    /**
     * Title of the Icon
     */
    title?: string;
    /**
     * The value of a card element
     */
    value?: string;
}
/**
 * This is interface for adaptive card data
 */
export interface CardData {
    /**
     * The summary of autoSummary adaptive card
     */
    summary?: string | undefined;
    /**
     * The body object for adaptive card
     */
    body: CardElement[];
}
/**
 * This is interface for containers in combo card
 */
export interface ComboCard {
    [key: string]: Record<string, string> | Record<string, string>[];
}
/**
 * This is interfae for click event for actions in adaptive card
 */
interface ClickHandlerData {
    /**
    * The action for click event
    */
    action: ActionMetaData;
    /**
    * The card item in adaptive crad
    */
    cardItem: CardData;
    /**
    * The case id of active contact
    */
    caseId: string;
    /**
    * The flag for sm view
    */
    isSmView: boolean;
    /**
    * The id for card
    */
    cardId: number;
    /**
     * The email identifier
     */
    emailIdentifier?: string;
    /**
     * ObjectId of the card
     */
    objectIdValue?: string;
    /**
     * ObjectId of the kb internal card
     */
    kbInternalObjectIdValue?: string;
    /**
     * object id for comprehensive per suggested card
     */
    individualObjectId?: string;
    /**
     * The unique task session uid
     */
    taskSessionUid?: string;
    /**
     * Whether the contact is a voice contact
     */
    isVoiceContact?: boolean;
    /**
     * Controls the visibility of the copy icon based on the copyToClipboard configuration setting.
     */
    hasCopyIcon: boolean;
}
/**
 * Intent parameter metadata used to map adaptive card inputs to expected data types.
 */
export interface IntentParam {
    /**
     * The slot name (field identifier) to match against adaptive card input IDs.
     */
    slotName?: string;
    /**
     * The target data type for conversion (e.g., 'Input.Number', 'Input.Text', 'Input.Toggle', 'Input.Date').
     */
    dataType?: string;
}
/**
 * Shape of submit action data payload emitted by adaptive cards.
 * Extends Record to allow arbitrary custom properties from Studio scripts.
 */
export interface SubmitActionData extends Record<string, unknown> {
    /**
     * Optional intent configuration containing parameter type mappings for Task Assist.
     */
    intentConfig?: {
        /**
         * Array of intent parameter definitions for type conversion.
         */
        intentParams?: IntentParam[];
    };
}
/**
 * Minimal shape of adaptive card inputs required for conversion.
 */
export interface AdaptiveCardInput {
    /**
     * The input field identifier matching intentParam slotName.
     */
    id?: string;
    /**
     * The raw input value to be converted based on intentConfig mapping.
     */
    value?: unknown;
}
/**
 * This are actions for open container
 */
export declare const actionsForOpenContainer: string[];
/**
 * This is enum for current status
 */
export declare enum ContentCurrentStatus {
    /**
    * The type for in progress status of content
    */
    IN_PROGRESS = "In-Progress"
}
/**
 * These are actions corresponding to containers id
 */
export declare const actionToContainerId: Record<CardActions, ContainerId>;
/**
 * The actions for like/dislike
 */
export declare const likeDislikeActions: string[];
/**
 * The actions for like/dislike/send/insert private cards
 */
export declare const privateArticleActions: string[];
/**
 * The actions for like/dislike/send/insert public cards
 */
export declare const publicArticleActions: string[];
/**
 * These are sub-containers in kb combo card
 */
export declare type kbComboCardActions = CardActions.OPEN_INTERNAL_USE_CONTAINER | CardActions.OPEN_LINKS_CONTAINER | CardActions.OPEN_IMAGES_CONTAINER | CardActions.OPEN_PROCESS_STEPS_CONTAINER | CardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER;
/**
 * These are actions with citations in text
 */
export declare const actionsWithCitationText: string[];
/**
 * These are containers in Autosummary card
 */
export declare const autoSummaryContainers: {
    SUMMARY_HEADER: string;
    ACTIONS_ROW: string;
    SUMMARY_TEXT: string;
    SUMMARY_COLUMN: string;
    FINAL_SUMMARY_TEXT: string;
    EDITED_SUMMARY: string;
    EDIT_ICON: string;
    COPY_ICON: string;
    SAVE_BUTTON_COLUMN: string;
    EXPAND_ICON_COLUMN: string;
    COLLAPSE_AUTO_SUMMARY_ICON: string;
};
/**
 * Function to update an email Adaptive Card
 * @param card - Array of CardElement objects representing the current state of the card
 * @param action - The action to be performed on the card
 * @returns An array of CardElement objects representing the updated state of the card
 * @example
 * ```
 * const updatedCard = updateAdaptiveCardforEmail(card, action);
 * ```
 */
declare function updateAdaptiveCardforEmail(card: CardElement[], topicContainerIndex?: number, textInputId?: string, action?: ActionMetaData): CardElement[];
/**
 * Function to map selected email topics based on a custom option
 * @param customOption - A string of comma-separated topic IDs
 * @param emailTopics - An array of objects, each containing a topicId and content
 * @returns An array of objects, each containing a topicId and content, filtered based on the customOption
 * @example
 * ```
 * const filteredTopics = mapSelectedEmailTopics(customOption, emailTopics);
 * ```
 */
declare function mapSelectedEmailTopics(customOption: string, emailTopics: {
    topicId: string;
    content: string;
}[]): {
    topicId: string;
    content: string;
}[];
/**
 * Retrieves an adaptive card schema based on the provided content type and content,
 * expands the schema using the Adaptive Cards templating engine, and replaces all URLs in the expanded card.
 *
 * @param contentType - The type of content for which the adaptive card is requested.
 * @param content - The content data to be injected into the adaptive card template.
 * @returns The expanded and processed adaptive card, or `undefined` if the schema is not found.
 *
 * @example
 * const updatedItems = getSaveSummaryCardItems(cardItem.body, editedValue);
 * dispatch(CcfCopilotActions.updateAdaptiveCardSchema( updatedCopilotCard: updatedItems, caseId, cardId, containerId ));
 *
 * @returns The updated array of CardElement with modifications for the save summary.
 */
export declare const getSaveSummaryCardItems: (cardBody: CardElement[], editedAutoSummary?: string) => CardElement[];
/**
 * Adds `isfinalsummarygeneretd: true` to the `selectAction.data` object
 * of any node in an AdaptiveCard JSON that matches:
 *   - horizontalAlignment === "Right"
 *   - containerId === "customCard"
 *   - name === "retryAutoSummary"
 *
 * It returns a deep-cloned updated object, leaving the original untouched.
 *
 * @param card - The AdaptiveCard JSON object.
 * @returns  - A new AdaptiveCard JSON object with the update applied.
 * @example
 * const updated = addIsFinalSummaryGenerated(adaptiveCardJson);
 */
declare function addIsFinalSummaryGenerated(card: CopilotAdaptiveCard | undefined, isFinalSummaryGenerated: boolean): CopilotAdaptiveCard | undefined;
export declare const CcfAgentCopilotContainerFunctions: {
    getUrlExtension: (url: string) => string | undefined;
    extractDataFromCardSchema: (element: CardElement, dataType: AdaptiveCardType.TEXTBLOCK | AdaptiveCardType.IMAGE | AdaptiveCardType.ICONS, action?: string) => (string | CardElement)[];
    extractDataFromElements: (element: CardElement, dataType: AdaptiveCardType.TEXTBLOCK | AdaptiveCardType.IMAGE | AdaptiveCardType.ICONS, dataBlocks: Array<string | CardElement>, action?: string) => void;
    handleClickActions: ({ action, cardItem, caseId, isSmView, cardId, emailIdentifier, objectIdValue, kbInternalObjectIdValue, individualObjectId, isVoiceContact, hasCopyIcon }: ClickHandlerData, handleIconChange: any, handleExpandImageClick: any, dispatch: Dispatch<AnyAction>) => Promise<void>;
    handleIconChange: (containerCard: CardElement, action: ActionMetaData, cardId: number, caseId: string, containerId: string, dispatch: any) => void;
    handleContainerOpen: (containerCard: CardElement, cardId: number, containerId: string, caseId: string, dispatch: any) => void;
    getImageDetails: (imagesArray: CardElement[], imagesIndex: number) => Promise<{
        file: File;
        imgUrl: string;
    }>;
    getProcessSteps: (textBlocks: string[], action: string, isSmView: boolean) => string;
    getContainerById: (cardData: CardElement[], id: string) => CardElement;
    insertTextInEditor: (response: string, caseId: string, dispatch: Dispatch<AnyAction>) => void;
    getContainerIdFromAction: (action: CardActions) => ContainerId;
    executeCardAction: ({ action, cardItem, caseId, cardId, emailIdentifier, isSmView, objectIdValue, kbInternalObjectIdValue, individualObjectId, isVoiceContact, hasCopyIcon }: ClickHandlerData, containerId: string, handleIconChange: any, handleExpandImageClick: any, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;
    handleInsertOrSendData: (response: string, action: string, caseId: string, dispatch: any) => Promise<void>;
    toggleLikeDislikeButton: (item: CardElement, action: ActionMetaData) => void;
    mapSelectedEmailTopics: typeof mapSelectedEmailTopics;
    updateAdaptiveCardforEmail: typeof updateAdaptiveCardforEmail;
    dispatchFeedbackCardActions: (feedbackActions: {
        feedback: string;
        objectIdValue: string;
        kbInternalObjectIdValue: string;
        agentId: string;
        caseId: string;
        individualObjectId: string;
        cardItem: CardData;
        comprehensiveFeedbackData: OverallContactFeedbackData;
        containerId: string;
    }, dispatch: Dispatch<AnyAction>) => void;
    updateCopilotCard: (copilotCard: CopilotAdaptiveCard, updatedAdaptiveCardToAdd: {
        [x: string]: CopilotMessageData;
    }, contactId: string, iconsList: copilotAdaptiveCardIcon) => CopilotAdaptiveCard;
    extractTopicsFromAction: (action: ActionMetaData, cardItem: CardData) => {
        comments: {
            topicId: string;
            content: string;
        }[];
        updatedCopilotCard: {
            isVisible: boolean;
            /**
             * The type of element in adaptive card
             */
            type?: string | undefined;
            /**
             * The url of image
             */
            url?: string | undefined;
            /**
             * The altText of image
             */
            altText?: string | undefined;
            /**
             * The text in card element
             */
            text?: string | undefined;
            /**
             * The weight of text
             */
            weight?: string | undefined;
            /**
             * The items in card element
             */
            items?: CardElement[] | undefined;
            /**
             * The columns in card element
             */
            columns?: CardElement[] | undefined;
            /**
             * The id of card element
             */
            id?: string | undefined;
            /**
             * The action object for card element
             */
            selectAction?: ActionMetaData | undefined;
            /**
             * Title of the Icon
             */
            title?: string | undefined;
            /**
             * The value of a card element
             */
            value?: string | undefined;
        }[];
        filteredEmailTopics: {
            topicId: string;
            content: string;
        }[];
    };
    updateTopicsCardItems: (items: CardElement[]) => CardElement[];
    modifyCopilotCardTopics: (cardItem: CardData, action: ActionMetaData, checkedBoxed: string) => (CardElement | {
        items: (CardElement | {
            items: (CardElement | {
                items: (CardElement | {
                    columns: {
                        items: (CardElement | {
                            value: string | boolean | IntentConfig | {
                                topicId: string;
                                content: string;
                            }[] | undefined;
                            /**
                             * The type of element in adaptive card
                             */
                            type?: string | undefined;
                            /**
                             * The url of image
                             */
                            url?: string | undefined;
                            /**
                             * The altText of image
                             */
                            altText?: string | undefined;
                            /**
                             * The text in card element
                             */
                            text?: string | undefined;
                            /**
                             * The weight of text
                             */
                            weight?: string | undefined;
                            /**
                             * The items in card element
                             */
                            items?: CardElement[] | undefined;
                            /**
                             * The columns in card element
                             */
                            columns?: CardElement[] | undefined;
                            /**
                             * The flag for visibility of card element
                             */
                            isVisible?: boolean | undefined;
                            /**
                             * The id of card element
                             */
                            id?: string | undefined;
                            /**
                             * The action object for card element
                             */
                            selectAction?: ActionMetaData | undefined;
                            /**
                             * Title of the Icon
                             */
                            title?: string | undefined;
                        })[];
                        /**
                         * The type of element in adaptive card
                         */
                        type?: string | undefined;
                        /**
                         * The url of image
                         */
                        url?: string | undefined;
                        /**
                         * The altText of image
                         */
                        altText?: string | undefined;
                        /**
                         * The text in card element
                         */
                        text?: string | undefined;
                        /**
                         * The weight of text
                         */
                        weight?: string | undefined;
                        /**
                         * The columns in card element
                         */
                        columns?: CardElement[] | undefined;
                        /**
                         * The flag for visibility of card element
                         */
                        isVisible?: boolean | undefined;
                        /**
                         * The id of card element
                         */
                        id?: string | undefined;
                        /**
                         * The action object for card element
                         */
                        selectAction?: ActionMetaData | undefined;
                        /**
                         * Title of the Icon
                         */
                        title?: string | undefined;
                        /**
                         * The value of a card element
                         */
                        value?: string | undefined;
                    }[];
                    /**
                     * The type of element in adaptive card
                     */
                    type?: string | undefined;
                    /**
                     * The url of image
                     */
                    url?: string | undefined;
                    /**
                     * The altText of image
                     */
                    altText?: string | undefined;
                    /**
                     * The text in card element
                     */
                    text?: string | undefined;
                    /**
                     * The weight of text
                     */
                    weight?: string | undefined;
                    /**
                     * The items in card element
                     */
                    items?: CardElement[] | undefined;
                    /**
                     * The flag for visibility of card element
                     */
                    isVisible?: boolean | undefined;
                    /**
                     * The id of card element
                     */
                    id?: string | undefined;
                    /**
                     * The action object for card element
                     */
                    selectAction?: ActionMetaData | undefined;
                    /**
                     * Title of the Icon
                     */
                    title?: string | undefined;
                    /**
                     * The value of a card element
                     */
                    value?: string | undefined;
                })[];
                /**
                 * The type of element in adaptive card
                 */
                type?: string | undefined;
                /**
                 * The url of image
                 */
                url?: string | undefined;
                /**
                 * The altText of image
                 */
                altText?: string | undefined;
                /**
                 * The text in card element
                 */
                text?: string | undefined;
                /**
                 * The weight of text
                 */
                weight?: string | undefined;
                /**
                 * The columns in card element
                 */
                columns?: CardElement[] | undefined;
                /**
                 * The flag for visibility of card element
                 */
                isVisible?: boolean | undefined;
                /**
                 * The id of card element
                 */
                id?: string | undefined;
                /**
                 * The action object for card element
                 */
                selectAction?: ActionMetaData | undefined;
                /**
                 * Title of the Icon
                 */
                title?: string | undefined;
                /**
                 * The value of a card element
                 */
                value?: string | undefined;
            })[];
            /**
             * The type of element in adaptive card
             */
            type?: string | undefined;
            /**
             * The url of image
             */
            url?: string | undefined;
            /**
             * The altText of image
             */
            altText?: string | undefined;
            /**
             * The text in card element
             */
            text?: string | undefined;
            /**
             * The weight of text
             */
            weight?: string | undefined;
            /**
             * The columns in card element
             */
            columns?: CardElement[] | undefined;
            /**
             * The flag for visibility of card element
             */
            isVisible?: boolean | undefined;
            /**
             * The id of card element
             */
            id?: string | undefined;
            /**
             * The action object for card element
             */
            selectAction?: ActionMetaData | undefined;
            /**
             * Title of the Icon
             */
            title?: string | undefined;
            /**
             * The value of a card element
             */
            value?: string | undefined;
        })[];
        /**
         * The type of element in adaptive card
         */
        type?: string | undefined;
        /**
         * The url of image
         */
        url?: string | undefined;
        /**
         * The altText of image
         */
        altText?: string | undefined;
        /**
         * The text in card element
         */
        text?: string | undefined;
        /**
         * The weight of text
         */
        weight?: string | undefined;
        /**
         * The columns in card element
         */
        columns?: CardElement[] | undefined;
        /**
         * The flag for visibility of card element
         */
        isVisible?: boolean | undefined;
        /**
         * The id of card element
         */
        id?: string | undefined;
        /**
         * The action object for card element
         */
        selectAction?: ActionMetaData | undefined;
        /**
         * Title of the Icon
         */
        title?: string | undefined;
        /**
         * The value of a card element
         */
        value?: string | undefined;
    })[];
    debounce: <T extends (...args: any[]) => void>(func: T, delay: number) => (this: ThisParameterType<T>, ...args: Parameters<T>) => void;
    sendFeedbackData: (contactId: string, data: OverallContactFeedbackData, dispatch: Dispatch<AnyAction>) => void;
    handleLikeDislike: (event: {
        stopPropagation: () => void;
    }, data: {
        feedback: string;
        objectId?: string;
        contactId?: string;
        agentContactId?: string;
        agentId?: string;
        kbAnswerUid?: string;
        utteranceId?: string;
        title?: string;
    }, dispatch: Dispatch<AnyAction>) => void;
    handleSelectedChip: (data: {
        tag: string;
        objectId: string;
        contactId: string;
        feedback: string;
        agentId: string;
        agentContactId: string;
        utteranceId: string;
        kbAnswerUid: string;
        title: string;
    }, dispatch: Dispatch<AnyAction>) => void;
    debouncedDispatch: (this: unknown, value: string, data: {
        objectId: string;
        contactId: string;
        feedback: string;
        tag?: string | undefined;
        agentId?: string | undefined;
        agentContactId?: string | undefined;
        utteranceId?: string | undefined;
        kbAnswerUid?: string | undefined;
        title?: string | undefined;
    }, dispatch: any) => void;
    toggleJourneySummaryVisibility: (containerCard: CardElement) => CardElement;
    shouldExpandGuidanceCard: (isFeedbackEnabled: boolean, isCommentEnabled: boolean, isTagEnabled: boolean) => boolean;
    checkFeedback: (feedback: string, actions: string[]) => boolean;
    getChipVariant: (guidanceFeedbackTag: string, selectedTag: string) => "filled" | "outlined";
    filterGuidanceFeedbacks: (data: GuidanceFeedbackData[], isUnratedFeedbackEnabled: boolean, isPositiveFeedbackEnabled: boolean, isNegativeFeedbackEnabled: boolean) => GuidanceFeedbackData[];
    formatTextBlocks: (textBlocks: string[]) => string;
    isFormCaptureEnabled: (intentName: string, taskAssistConfig: TaskAssistConfig) => boolean;
    getAdaptiveCardsByContentType: (contentType: string, content: {
        [key: string]: string | number | boolean | string[] | ValidationInfo | Record<string, string | boolean> | undefined;
    }) => CopilotAdaptiveCard | undefined;
    toggleAutoSummaryHeaderVisibility: (container: CardElement) => CardElement;
    addIsFinalSummaryGenerated: typeof addIsFinalSummaryGenerated;
    copyTextToClipboard: (textToCopy: string) => Promise<void>;
    buildSubmitActionFinalData: (inputs: AdaptiveCardInput[], actionData: SubmitActionData) => Record<string, unknown>;
};
export {};
