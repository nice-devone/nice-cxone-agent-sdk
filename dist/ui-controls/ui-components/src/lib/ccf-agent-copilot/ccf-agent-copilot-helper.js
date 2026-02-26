import { __awaiter } from "tslib";
import { CcfCopilotActions, replaceAllUrls } from './ccf-agent-copilot-container.slice';
import { updateFileToBeUploaded, getContactDetailsForSelectedContact } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { globalActions } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { sendCopilotReply, generateEmail, executeTaskAssist, saveEditedSummary, getTaskAssistFormSchema, getTaskAssistFormPreFilledData, fetchGeneratedFinalSummary, getDecisionTreeElement } from './ccf-agent-copilot-middleware';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { ActionIconType } from '../../enums/agent-copilot-action-icon-type';
import { copilotActionIcons } from './ccf-agent-copilot-icons';
import { FeedbackTags, TASK_ASSIST_STATUS } from '@nice-devone/common-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { debounce } from '../../hooks/useDebounce';
import encodeSVG from '../ccf-app-space/ccf-customer-card/ccf-customer-card-contact-history/ccf-encode-svg';
import * as ACData from 'adaptivecards-templating';
const logger = new Logger('ui-components', 'ccfAgentCopilotHelper');
/**
 * This is enum for adaptive card types
 */
export var AdaptiveCardType;
(function (AdaptiveCardType) {
    /**
     * The card type for textblock
     */
    AdaptiveCardType["TEXTBLOCK"] = "TextBlock";
    /**
     * The card type for container
     */
    AdaptiveCardType["CONTAINER"] = "Container";
    /**
     * The card type for columnset
     */
    AdaptiveCardType["COLUMNSET"] = "ColumnSet";
    /**
     * The card type for column
     */
    AdaptiveCardType["COLUMN"] = "Column";
    /**
     * The card type for image
     */
    AdaptiveCardType["IMAGE"] = "Image";
    /**
     * The card type for icons
     */
    AdaptiveCardType["ICONS"] = "Icons";
})(AdaptiveCardType || (AdaptiveCardType = {}));
/**
 * This is enum for actions in adaptive cards
 */
export var CardActions;
(function (CardActions) {
    /**
     * The action type for expand image
     */
    CardActions["EXPAND_IMAGE"] = "expandImage";
    /**
     * The action type for insert image
     */
    CardActions["INSERT_IMAGE"] = "insertImage";
    /**
     * The action type for send image
     */
    CardActions["SEND_IMAGE"] = "sendImage";
    /**
     * The action type for insert article
     */
    CardActions["INSERT_ARTICLE"] = "insertArticle";
    /**
     * The action type for send article
     */
    CardActions["SEND_ARTICLE"] = "sendArticle";
    /**
     * The action type for insert private article
     */
    CardActions["INSERT_PRIVATE_ARTICLE"] = "insertPrivateArticle";
    /**
     * The action type for send private article
     */
    CardActions["SEND_PRIVATE_ARTICLE"] = "sendPrivateArticle";
    /**
     * The action type for insert link
     */
    CardActions["INSERT_LINK"] = "insertLink";
    /**
     * The action type for send link
     */
    CardActions["SEND_LINK"] = "sendLink";
    /**
     * The action type for open internal use container
     */
    CardActions["OPEN_INTERNAL_USE_CONTAINER"] = "openInternalUseContainer";
    /**
     * The action type for open image container
     */
    CardActions["OPEN_IMAGES_CONTAINER"] = "openImagesContainer";
    /**
     * The action type for open web container
     */
    CardActions["OPEN_LINKS_CONTAINER"] = "openWebLinksContainer";
    /**
     * The action type for open process steps container
     */
    CardActions["OPEN_PROCESS_STEPS_CONTAINER"] = "openProcessStepsContainer";
    /**
     * The action type for open private process steps container
     */
    CardActions["OPEN_PRIVATE_PROCESS_STEPS_CONTAINER"] = "openPrivateProcessStepsContainer";
    /**
     * The action type for insert steps
     */
    CardActions["INSERT_STEPS"] = "insertSteps";
    /**
     * The action type for send steps
     */
    CardActions["SEND_STEPS"] = "sendSteps";
    /**
     * The action type for insert step
     */
    CardActions["INSERT_STEP"] = "insertStep";
    /**
     * The action type for send step
     */
    CardActions["SEND_STEP"] = "sendStep";
    /**
     * The action type for insert internal use steps
     */
    CardActions["INSERT_PRIVATE_STEPS"] = "insertPrivateSteps";
    /**
     * The action type for send internal use steps
     */
    CardActions["SEND_PRIVATE_STEPS"] = "sendPrivateSteps";
    /**
     * The action type for insert internal use step
     */
    CardActions["INSERT_PRIVATE_STEP"] = "insertPrivateStep";
    /**
     * The action type for send internal use step
     */
    CardActions["SEND_PRIVATE_STEP"] = "sendPrivateStep";
    /**
     * The action type for generate email
     */
    CardActions["GENERATE_EMAIL"] = "generateEmail";
    /**
     * The action type for like
     */
    CardActions["LIKE"] = "likeArticle";
    /**
     * The action type for dislike
     */
    CardActions["DISLIKE"] = "dislikeArticle";
    /** The action type for adding new email topic
     *
     */
    CardActions["ADD_NEW_TOPICS"] = "addNewTopics";
    /**
     * The action type for clearing text
     */
    CardActions["CLEAR_TEXT"] = "clearText";
    /**
     * The action type for feedback submit data
     */
    CardActions["SUBMIT_FEEDBACK_DATA"] = "submitFeedbackData";
    /**
     * The action type for like overall subcard
     */
    CardActions["LIKE_OVERALL_SUBCARD"] = "likeOverallSubcard";
    /**
     * The action type for dislike overall subcard
     */
    CardActions["DISLIKE_OVERALL_SUBCARD"] = "dislikeOverallSubcard";
    /**
     * The action type for like individual subcards
     */
    CardActions["LIKE_INDIVIDUAL_SUBCARDS"] = "likeIndividualCards";
    /**
     * The action type for dislike individual feedback
     */
    CardActions["DISLIKE_INDIVIDUAL_SUBCARDS"] = "dislikeIndividualCards";
    /**
     * The action type for open information container
     */
    CardActions["OPEN_INFO_CONTAINER"] = "openInfoContainer";
    /**
     * The action type for mofifying filters by opening copilot filter popover
     */
    CardActions["MODIFY_FILTERS"] = "modifyFilters";
    /**
     * The action type for expand summary
     */
    CardActions["EXPAND_SUMMARY"] = "expandSummary";
    /**
     * The action type for view summary details
     */
    CardActions["VIEW_DETAILS_CONTAINER"] = "viewDetailsContainer";
    /**
     * The action type for hide summary details
     */
    CardActions["HIDE_DETAILS_CONTAINER"] = "hideDetailsContainer";
    /**
     * The action type for checking contact history
     */
    CardActions["CHECK_CONTACT_HISTORY"] = "contactHistory";
    /**
     * The action type for task assist form submit
     */
    CardActions["TASK_ASSIST_FORM_SUBMIT"] = "onTaskAssistSubmit";
    /**
     * The action type for cancel running task
     */
    CardActions["CANCEL_TASK"] = "cancelTask";
    /**
     * The action type for run task
     */
    CardActions["RUN_TASK"] = "runTask";
    /**
     * The action type for open task
     */
    CardActions["OPEN_TASK"] = "openTask";
    /**
     * The action type for copy summary
     */
    CardActions["COPY_SUMMARY"] = "copySummary";
    /**
     * The action type for edit summary
     */
    CardActions["EDIT_SUMMARY"] = "editSummary";
    /**
     * The action type for save summary
     */
    CardActions["SAVE_SUMMARY"] = "saveSummary";
    /**
     * The action type for expand auto summary
     */
    CardActions["EXPAND_AUTOSUMMARY"] = "expandAutoSummary";
    /**
     * The action type for retry auto summary
     */
    CardActions["RETRY_AUTOSUMMARY"] = "retryAutoSummary";
})(CardActions || (CardActions = {}));
/**
 * This is enum for container id in adaptive card
 */
export var ContainerId;
(function (ContainerId) {
    /**
     * The container id type for internal use
     */
    ContainerId["INTERNAL_USE_CONTAINER"] = "internalUseContainer";
    /**
     * The container id type for web links
     */
    ContainerId["WEB_CONTAINER"] = "webLinksContainer";
    /**
     * The container id type for image conatiner
     */
    ContainerId["IMAGES_CONTAINER"] = "imagesContainer";
    /**
     * The container id type for process steps
     */
    ContainerId["PROCESS_STEPS_CONTAINER"] = "processStepsContainer";
    /**
     * The container id type for private process steps
     */
    ContainerId["PRIVATE_PROCESS_STEPS_CONTAINER"] = "privateProcessStepsContainer";
    /**
     * The container id type for kb answers
     */
    ContainerId["KB_ANSWERS"] = "kbAnswers";
    /**
     * The container id type for kb internal use
     */
    ContainerId["CUSTOM_CARD"] = "customCard";
    /**
     * The container id type for kb internal use
     */
    ContainerId["KB_INTERNAL"] = "kbInternalUse";
    /**
     * The container id type for kb links
     */
    ContainerId["KB_LINKS"] = "kbLinks";
    /**
     * The container id type for kb images
     */
    ContainerId["KB_IMAGES"] = "kbImages";
    /**
     * The container id type for kb process steps
     */
    ContainerId["KB_PROCESS_STEPS"] = "kbProcessSteps";
    /**
     * The container id type for email generating container
     */
    ContainerId["REPLY_GENERATING_CONTAINER"] = "replyGeneratingContainer";
    /**
     * The container id for showing the topic container
     */
    ContainerId["SHOW_TOPIC_CONTAINER"] = "showTopicContainer";
    /**
     * The container id for adding a topic action container
     */
    ContainerId["ADD_TOPIC_ACTION_CONTAINER"] = "addTopicActionContainer";
    /**
     * The container id for set of response topics
     */
    ContainerId["RESPONSE_OPTION_CONTAINER"] = "responseOptionsContainer";
    /**
     * The container id for add topics button
     */
    ContainerId["TOPIC_CONTAINER"] = "topicContainer";
    /**
     * The container id for error message container
     */
    ContainerId["ERROR_MESSAGE_CONTAINER"] = "errorMessageContainer";
    /**
     * The container id for initial container
     */
    ContainerId["INITIAL_CONTAINER"] = "initialContainer";
    /**
    * The container id for new added topics
    */
    ContainerId["ADD_TOPICS_CONTAINER"] = "addTopicActionContainer,";
    /**
    * The container id for feedback suggestion container
    */
    ContainerId["FEEDBACK_SUGGESTION_CONTAINER"] = "suggestionsContainer";
    /**
     * The container id for comprehensive feedback card
     */
    ContainerId["COMPREHENSIVE_FEEDBACK_CONTAINER"] = "comprehensiveFeedback";
    /**
     * Container for comprehensive feedback like
     */
    ContainerId["FEEDBACK_LIKE_CONTAINER"] = "feedbackLike";
    /**
     * Container for comprehensive feedback dislike
     */
    ContainerId["FEEDBACK_DISLIKE_CONTAINER"] = "feedbackDislike";
    /**
     * Container for feedbacks of overall subcard
     */
    ContainerId["FEEDBACK_CONTAINER"] = "feedback";
    /**
     * Container for feedbacks of individual subcards
     */
    ContainerId["FEEDBACK_TOPICS_CONTAINER"] = "feedbackTopicsContainer";
    /**
     * The container id type for filters used container
     */
    ContainerId["FILTERS_USED"] = "filtersUsedContainer";
    /**
     * The container id type for filters title container
     */
    ContainerId["FILTERS_TITLE_CONTAINER"] = "filtersTitleContainer";
    /**
     * The container id type for filters container
     */
    ContainerId["FILTERS_CONTAINER"] = "filtersContainer";
    /**
     * The container id mofify filters button container
     */
    ContainerId["MODIFY_FILTERS_CONTAINER"] = "buttonContainer";
    /**
     * The container ID for custom options.
     */
    ContainerId["CUSTOM_OPTION_CONTAINER"] = "customOption";
    /**
     *  The container id type for collapse Journey Summary Container
     */
    ContainerId["JOURNEY_SUMMARY_CONTAINER"] = "collapseJourneySummaryContainer";
    /**
    *  The container id type for Expand Journey Summary Container
    */
    ContainerId["JOURNEY_SUMMARY"] = "expandJourneySummaryContainer";
    /**
    *  The container id type for summary Detail Containers
    */
    ContainerId["SUMMARY_DETAILS_CONTAINER"] = "summaryDetailContainers";
    /**
    *  The container id type for view Details Container
    */
    ContainerId["VIEW_DETAILS_CONTAINER"] = "viewDetailsContainer";
    /**
    *  The container id type for hide Details Container
    */
    ContainerId["HIDE_DETAILS_CONTAINER"] = "hideDetailsContainer";
    /**
    *  The container id type for interaction Data Container
    */
    ContainerId["INTERACTION_DETAILS_CONTAINER"] = "interactionDataContainer";
    /**
    *  The container id type for task assist Data Container
    */
    ContainerId["TASK_ASSIST_CONTAINER"] = "taskAssist";
    /**
    * The container id type for private kb process steps
    */
    ContainerId["KB_PRIVATE_PROCESS_STEPS"] = "KbPrivateProcessSteps";
    /**
     * The container id type for autoSummary card container
     */
    ContainerId["AUTO_SUMMARY_CONTAINER"] = "autoSummaryContainer";
})(ContainerId || (ContainerId = {}));
/**
 * This are actions which are excluded in sm view
 */
const excludedActionsForSmView = [
    CardActions.EXPAND_IMAGE,
    CardActions.OPEN_INTERNAL_USE_CONTAINER,
    CardActions.OPEN_LINKS_CONTAINER,
    CardActions.OPEN_IMAGES_CONTAINER,
    CardActions.OPEN_PROCESS_STEPS_CONTAINER,
    CardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER,
    CardActions.OPEN_INFO_CONTAINER,
    CardActions.MODIFY_FILTERS,
    CardActions.LIKE,
    CardActions.DISLIKE,
    CardActions.SUBMIT_FEEDBACK_DATA,
    CardActions.EXPAND_SUMMARY,
    CardActions.VIEW_DETAILS_CONTAINER,
    CardActions.HIDE_DETAILS_CONTAINER,
    CardActions.CHECK_CONTACT_HISTORY,
    CardActions.EDIT_SUMMARY,
    CardActions.SAVE_SUMMARY,
    CardActions.COPY_SUMMARY,
    CardActions.EXPAND_AUTOSUMMARY
];
/**
 * This are actions for open container
 */
export const actionsForOpenContainer = [
    CardActions.OPEN_INTERNAL_USE_CONTAINER,
    CardActions.OPEN_LINKS_CONTAINER,
    CardActions.OPEN_IMAGES_CONTAINER,
    CardActions.OPEN_PROCESS_STEPS_CONTAINER,
    CardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER,
    CardActions.ADD_NEW_TOPICS,
    CardActions.CLEAR_TEXT,
    CardActions.OPEN_INFO_CONTAINER
];
/**
 * This is enum for current status
 */
export var ContentCurrentStatus;
(function (ContentCurrentStatus) {
    /**
    * The type for in progress status of content
    */
    ContentCurrentStatus["IN_PROGRESS"] = "In-Progress";
})(ContentCurrentStatus || (ContentCurrentStatus = {}));
/**
 * These are actions corresponding to containers id
 */
export const actionToContainerId = {
    [CardActions.INSERT_ARTICLE]: ContainerId.KB_ANSWERS,
    [CardActions.SEND_ARTICLE]: ContainerId.KB_ANSWERS,
    [CardActions.SEND_PRIVATE_ARTICLE]: ContainerId.KB_INTERNAL,
    [CardActions.INSERT_PRIVATE_ARTICLE]: ContainerId.KB_INTERNAL,
    [CardActions.INSERT_LINK]: ContainerId.KB_LINKS,
    [CardActions.SEND_LINK]: ContainerId.KB_LINKS,
    [CardActions.INSERT_IMAGE]: ContainerId.KB_IMAGES,
    [CardActions.SEND_IMAGE]: ContainerId.KB_IMAGES,
    [CardActions.EXPAND_IMAGE]: ContainerId.KB_IMAGES,
    [CardActions.INSERT_STEP]: ContainerId.KB_PROCESS_STEPS,
    [CardActions.SEND_STEP]: ContainerId.KB_PROCESS_STEPS,
    [CardActions.INSERT_STEPS]: ContainerId.KB_PROCESS_STEPS,
    [CardActions.SEND_STEPS]: ContainerId.KB_PROCESS_STEPS,
    [CardActions.INSERT_PRIVATE_STEP]: ContainerId.KB_PRIVATE_PROCESS_STEPS,
    [CardActions.SEND_PRIVATE_STEP]: ContainerId.KB_PRIVATE_PROCESS_STEPS,
    [CardActions.INSERT_PRIVATE_STEPS]: ContainerId.KB_PRIVATE_PROCESS_STEPS,
    [CardActions.SEND_PRIVATE_STEPS]: ContainerId.KB_PRIVATE_PROCESS_STEPS,
    [CardActions.GENERATE_EMAIL]: ContainerId.REPLY_GENERATING_CONTAINER,
    [CardActions.LIKE]: ContainerId.KB_ANSWERS,
    [CardActions.DISLIKE]: ContainerId.KB_ANSWERS,
    [CardActions.OPEN_INTERNAL_USE_CONTAINER]: ContainerId.KB_INTERNAL,
    [CardActions.OPEN_LINKS_CONTAINER]: ContainerId.KB_LINKS,
    [CardActions.OPEN_IMAGES_CONTAINER]: ContainerId.KB_IMAGES,
    [CardActions.OPEN_PROCESS_STEPS_CONTAINER]: ContainerId.KB_PROCESS_STEPS,
    [CardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER]: ContainerId.KB_PRIVATE_PROCESS_STEPS,
    [CardActions.ADD_NEW_TOPICS]: ContainerId.SHOW_TOPIC_CONTAINER,
    [CardActions.CLEAR_TEXT]: ContainerId.SHOW_TOPIC_CONTAINER,
    [CardActions.SUBMIT_FEEDBACK_DATA]: ContainerId.FEEDBACK_SUGGESTION_CONTAINER,
    [CardActions.LIKE_OVERALL_SUBCARD]: ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [CardActions.DISLIKE_OVERALL_SUBCARD]: ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [CardActions.LIKE_INDIVIDUAL_SUBCARDS]: ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [CardActions.DISLIKE_INDIVIDUAL_SUBCARDS]: ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [CardActions.OPEN_INFO_CONTAINER]: ContainerId.FILTERS_USED,
    [CardActions.MODIFY_FILTERS]: ContainerId.MODIFY_FILTERS_CONTAINER,
    [CardActions.EXPAND_SUMMARY]: ContainerId.JOURNEY_SUMMARY,
    [CardActions.VIEW_DETAILS_CONTAINER]: ContainerId.JOURNEY_SUMMARY,
    [CardActions.HIDE_DETAILS_CONTAINER]: ContainerId.JOURNEY_SUMMARY,
    [CardActions.CHECK_CONTACT_HISTORY]: ContainerId.INTERACTION_DETAILS_CONTAINER,
    [CardActions.TASK_ASSIST_FORM_SUBMIT]: ContainerId.TASK_ASSIST_CONTAINER,
    [CardActions.CANCEL_TASK]: ContainerId.TASK_ASSIST_CONTAINER,
    [CardActions.RUN_TASK]: ContainerId.TASK_ASSIST_CONTAINER,
    [CardActions.OPEN_TASK]: ContainerId.TASK_ASSIST_CONTAINER,
    [CardActions.COPY_SUMMARY]: ContainerId.AUTO_SUMMARY_CONTAINER,
    [CardActions.EDIT_SUMMARY]: ContainerId.AUTO_SUMMARY_CONTAINER,
    [CardActions.SAVE_SUMMARY]: ContainerId.AUTO_SUMMARY_CONTAINER,
    [CardActions.EXPAND_AUTOSUMMARY]: ContainerId.AUTO_SUMMARY_CONTAINER,
    [CardActions.RETRY_AUTOSUMMARY]: ContainerId.AUTO_SUMMARY_CONTAINER,
};
/**
 * The actions for like/dislike
 */
export const likeDislikeActions = [
    CardActions.LIKE,
    CardActions.DISLIKE
];
/**
 * The actions for like/dislike/send/insert private cards
 */
export const privateArticleActions = [
    CardActions.INSERT_PRIVATE_ARTICLE,
    CardActions.SEND_PRIVATE_ARTICLE,
    ...likeDislikeActions
];
/**
 * The actions for like/dislike/send/insert public cards
 */
export const publicArticleActions = [
    CardActions.INSERT_ARTICLE,
    CardActions.SEND_ARTICLE
];
/**
 * These are actions with citations in text
 */
export const actionsWithCitationText = [
    CardActions.INSERT_ARTICLE,
    CardActions.SEND_ARTICLE,
    CardActions.INSERT_STEP,
    CardActions.SEND_STEP,
    CardActions.INSERT_STEPS,
    CardActions.SEND_STEPS,
    CardActions.INSERT_PRIVATE_STEP,
    CardActions.SEND_PRIVATE_STEP,
    CardActions.INSERT_PRIVATE_STEPS,
    CardActions.SEND_PRIVATE_STEPS
];
/**
 * These are containers in Autosummary card
 */
export const autoSummaryContainers = {
    SUMMARY_HEADER: 'summaryHeader',
    ACTIONS_ROW: 'actionsRow',
    SUMMARY_TEXT: 'summaryText',
    SUMMARY_COLUMN: 'summaryColumn',
    FINAL_SUMMARY_TEXT: 'finalSummaryText',
    EDITED_SUMMARY: 'editedSummary',
    EDIT_ICON: 'editIcon',
    COPY_ICON: 'copyIcon',
    SAVE_BUTTON_COLUMN: 'saveButtonColumn',
    EXPAND_ICON_COLUMN: 'expandIconColumn',
    COLLAPSE_AUTO_SUMMARY_ICON: 'collapseAutoSummaryIcon',
};
/**
 * Function to get url extension of image
 * @param url - url of image
 * @example
 * ```
 * getUrlExtension(url)
 * ```
 */
const getUrlExtension = (url) => {
    var _a, _b, _c;
    // extracting image extension from url ex - jpg, png
    return (_c = (_b = (_a = url === null || url === void 0 ? void 0 : url.split(/[#?]/)[0]) === null || _a === void 0 ? void 0 : _a.split('.')) === null || _b === void 0 ? void 0 : _b.pop()) === null || _c === void 0 ? void 0 : _c.trim();
};
/**
 * Function to extract Data from card schema
 * @param element  - CardData
 * @param dataType  - string
 * @param action  - ActionMetaData
 * @example
 * ```
 * extractDataFromCardSchema(element, dataType, action)
 * ```
 */
const extractDataFromCardSchema = (element, dataType, action) => {
    const dataBlocks = [];
    extractDataFromElements(element, dataType, dataBlocks, action);
    return dataBlocks;
};
/**
 * Function to extract data from elements schema
 * @param cardSchema  - CardData
 * @param dataType  - string
 * @param dataBlocks  - Array
 * @param action  - ActionMetaData
 * @example
 * ```
 * extractDataFromElements(cardSchema)
 * ```
 */
const extractDataFromElements = (element, dataType, dataBlocks, action) => {
    switch (element.type) {
        case AdaptiveCardType.TEXTBLOCK:
            if (dataType === AdaptiveCardType.TEXTBLOCK && element.text && element.weight !== 'Bolder') {
                if (action && actionsWithCitationText.includes(action)) {
                    const updatedText = element.text.replace(/\*\*\[.*?\]\(.*?\)\*\*/g, '.');
                    dataBlocks.push(updatedText);
                }
                else {
                    dataBlocks.push(element.text);
                }
            }
            break;
        case AdaptiveCardType.IMAGE:
            if (dataType === AdaptiveCardType.IMAGE && element.id === 'images') {
                dataBlocks.push(element);
            }
            if (dataType === AdaptiveCardType.ICONS &&
                action &&
                element.selectAction &&
                element.selectAction.data &&
                (element.selectAction.data.name === action)) {
                dataBlocks.push(element);
            }
            break;
        case AdaptiveCardType.CONTAINER:
            if (element.items) {
                for (const item of element.items) {
                    extractDataFromElements(item, dataType, dataBlocks, action);
                }
            }
            break;
        case AdaptiveCardType.COLUMNSET:
            if (element.columns) {
                for (const column of element.columns) {
                    extractDataFromElements(column, dataType, dataBlocks, action);
                }
            }
            break;
        case AdaptiveCardType.COLUMN:
            if (element.items) {
                for (const item of element.items) {
                    extractDataFromElements(item, dataType, dataBlocks, action);
                }
            }
            break;
        default:
            break;
    }
};
/**
 * Function to get containerId from action
 * @param action - string
 * @example
 * ```
 * getContainerIdFromAction(action)
 * ```
 */
const getContainerIdFromAction = (action) => {
    return actionToContainerId[action] || '';
};
/**
 * Function to format textBlocks array's elements
 * @param textBlocks - Array of strings
 * @example
 * ```
 * formatTextBlocks(textBlocks)
 * ```
 */
const formatTextBlocks = (textBlocks) => {
    if (textBlocks.length === 0) {
        return '';
    }
    return textBlocks
        .map((block) => {
        const match = block.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
            const title = match[1];
            const url = match[2];
            return `${title}: ${url}`;
        }
        return block;
    })
        .join('\n \n');
};
/**
 * Function to execute card action
 * @param data - ClickHandlerData
 * @param handleIconChange - any
 * @param handleExpandImageClick - any
 * @param dispatch - any
 * @example
 * ```
 * executeCardAction(data, containerId , handleIconChange, handleExpandImageClick, dispatch)
 * ```
 */
const executeCardAction = ({ action, cardItem, caseId, cardId, emailIdentifier, isSmView, objectIdValue, kbInternalObjectIdValue, individualObjectId, isVoiceContact, hasCopyIcon }, containerId, handleIconChange, handleExpandImageClick, dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40;
    const cardContainer = (cardItem.body && individualObjectId && getContainerById(cardItem.body, individualObjectId)) || (cardItem.body && getContainerById(cardItem.body, containerId));
    switch ((_a = action.data) === null || _a === void 0 ? void 0 : _a.name) {
        case CardActions.INSERT_ARTICLE:
        case CardActions.INSERT_PRIVATE_ARTICLE:
        case CardActions.SEND_PRIVATE_ARTICLE:
        case CardActions.SEND_ARTICLE: {
            const textBlocks = extractDataFromCardSchema(cardContainer, AdaptiveCardType.TEXTBLOCK, (_b = action.data) === null || _b === void 0 ? void 0 : _b.name);
            const kbAnswerCard = cardItem.body && ((_c = cardItem.body) === null || _c === void 0 ? void 0 : _c.find((item) => item.id === 'kbAnswers'));
            const privateKbAnswerCard = cardItem.body && ((_d = cardItem.body) === null || _d === void 0 ? void 0 : _d.find((item) => item.id.includes('kbInternalUse')));
            const internalContainer = (_e = privateKbAnswerCard === null || privateKbAnswerCard === void 0 ? void 0 : privateKbAnswerCard.items) === null || _e === void 0 ? void 0 : _e.find((item) => item.id === ContainerId.INTERNAL_USE_CONTAINER);
            let privateAnswerTitle = '';
            if (internalContainer) {
                privateAnswerTitle = (internalContainer === null || internalContainer === void 0 ? void 0 : internalContainer.items) && ((_h = (_g = (_f = internalContainer === null || internalContainer === void 0 ? void 0 : internalContainer.items) === null || _f === void 0 ? void 0 : _f.find(privateElement => privateElement.text !== null && privateElement.text !== '')) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.split('.')[0]) || '';
            }
            else {
                privateAnswerTitle = (_m = (_l = (_k = (_j = privateKbAnswerCard === null || privateKbAnswerCard === void 0 ? void 0 : privateKbAnswerCard.items) === null || _j === void 0 ? void 0 : _j.find(el => el.id === 'privateDescription')) === null || _k === void 0 ? void 0 : _k.text) === null || _l === void 0 ? void 0 : _l.split('.')[0]) !== null && _m !== void 0 ? _m : '';
            }
            const kbAnswerTitle = (_t = (((_p = (_o = kbAnswerCard === null || kbAnswerCard === void 0 ? void 0 : kbAnswerCard.items) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.text) || ((_s = (_r = (_q = kbAnswerCard === null || kbAnswerCard === void 0 ? void 0 : kbAnswerCard.items) === null || _q === void 0 ? void 0 : _q[1]) === null || _r === void 0 ? void 0 : _r.text) === null || _s === void 0 ? void 0 : _s.split('.')[0]))) !== null && _t !== void 0 ? _t : '';
            const articleResponse = containerId === ContainerId.CUSTOM_CARD ? formatTextBlocks(textBlocks) : `${textBlocks[0]}`;
            const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
            handleInsertOrSendData(articleResponse, (_u = action.data) === null || _u === void 0 ? void 0 : _u.name, caseId, dispatch);
            (((_v = action.data) === null || _v === void 0 ? void 0 : _v.name) === CardActions.INSERT_ARTICLE || ((_w = action.data) === null || _w === void 0 ? void 0 : _w.name) === CardActions.SEND_ARTICLE) && dispatch(CcfCopilotActions.updateFeedbackData({ feedback: 'likeArticle', caseId: caseId, objectId: (_x = (objectIdValue)) !== null && _x !== void 0 ? _x : '', contactId: caseId, agentId: agentId, agentContactId: 'agentContactId', title: kbAnswerTitle }));
            (((_y = action.data) === null || _y === void 0 ? void 0 : _y.name) === CardActions.INSERT_PRIVATE_ARTICLE || ((_z = action.data) === null || _z === void 0 ? void 0 : _z.name) === CardActions.SEND_PRIVATE_ARTICLE) && dispatch(CcfCopilotActions.updateFeedbackData({ feedback: 'likeArticle', caseId: caseId, objectId: `${objectIdValue}_${kbInternalObjectIdValue}` || '', contactId: caseId, agentId: agentId, agentContactId: 'agentContactId', title: privateAnswerTitle }));
            break;
        }
        case CardActions.INSERT_LINK:
        case CardActions.SEND_LINK: {
            const linkResponse = ((_0 = action.data) === null || _0 === void 0 ? void 0 : _0.link) || '';
            handleInsertOrSendData(linkResponse, (_1 = action.data) === null || _1 === void 0 ? void 0 : _1.name, caseId, dispatch);
            break;
        }
        case CardActions.EXPAND_IMAGE: {
            const imagesArray = extractDataFromCardSchema(cardContainer, AdaptiveCardType.IMAGE);
            const imageIndex = +((_3 = (_2 = action.data) === null || _2 === void 0 ? void 0 : _2.index) !== null && _3 !== void 0 ? _3 : 0);
            const kbImage = imagesArray[imageIndex !== null && imageIndex !== void 0 ? imageIndex : 0];
            const kbImgUrl = `${(kbImage === null || kbImage === void 0 ? void 0 : kbImage.url) || ''}`;
            const kbImgAltText = `${(kbImage === null || kbImage === void 0 ? void 0 : kbImage.url) || ''}`;
            handleExpandImageClick(kbImgUrl, kbImgAltText);
            return;
        }
        case CardActions.INSERT_IMAGE:
        case CardActions.SEND_IMAGE: {
            const imagesArray = extractDataFromCardSchema(cardContainer, AdaptiveCardType.IMAGE);
            const imagesIndex = +((_5 = (_4 = action.data) === null || _4 === void 0 ? void 0 : _4.index) !== null && _5 !== void 0 ? _5 : 0);
            const imageToAdd = yield getImageDetails(imagesArray, imagesIndex);
            if (((_6 = action.data) === null || _6 === void 0 ? void 0 : _6.name) === CardActions.SEND_IMAGE) {
                const imageResponse = { friendlyName: imageToAdd.file.name, url: imageToAdd.imgUrl };
                dispatch(sendCopilotReply({ caseId, response: imageResponse }));
            }
            else {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(imageToAdd.file);
                dispatch(updateFileToBeUploaded({ fileList: dataTransfer.files }));
            }
            break;
        }
        case CardActions.INSERT_STEP:
        case CardActions.SEND_STEP:
        case CardActions.SEND_PRIVATE_STEP:
        case CardActions.INSERT_PRIVATE_STEP: {
            const textIndex = +((_8 = (_7 = action.data) === null || _7 === void 0 ? void 0 : _7.index) !== null && _8 !== void 0 ? _8 : 0);
            const cardContainer = getContainerById(cardItem.body, ContainerId.KB_PROCESS_STEPS);
            if (cardContainer && cardContainer.items) {
                const textBlocks = extractDataFromCardSchema(cardContainer.items[textIndex + 1], AdaptiveCardType.TEXTBLOCK, (_9 = action.data) === null || _9 === void 0 ? void 0 : _9.name);
                let stepResponse = '';
                if (textBlocks) {
                    const separator = ((((_10 = action.data) === null || _10 === void 0 ? void 0 : _10.name) === CardActions.SEND_STEP || ((_11 = action.data) === null || _11 === void 0 ? void 0 : _11.name) === CardActions.SEND_PRIVATE_STEP || isSmView) ? '\n' : '<br>') + '- ';
                    stepResponse = textBlocks.join(separator);
                }
                handleInsertOrSendData(stepResponse, (_12 = action.data) === null || _12 === void 0 ? void 0 : _12.name, caseId, dispatch);
            }
            break;
        }
        case CardActions.INSERT_STEPS:
        case CardActions.SEND_STEPS:
        case CardActions.SEND_PRIVATE_STEPS:
        case CardActions.INSERT_PRIVATE_STEPS: {
            const textBlocks = extractDataFromCardSchema(cardContainer, AdaptiveCardType.TEXTBLOCK, (_13 = action.data) === null || _13 === void 0 ? void 0 : _13.name);
            const stepsResponse = getProcessSteps(textBlocks, (_14 = action.data) === null || _14 === void 0 ? void 0 : _14.name, isSmView);
            handleInsertOrSendData(stepsResponse, (_15 = action.data) === null || _15 === void 0 ? void 0 : _15.name, caseId, dispatch);
            break;
        }
        case CardActions.GENERATE_EMAIL: {
            const { comments, updatedCopilotCard, filteredEmailTopics } = extractTopicsFromAction(action, cardItem);
            const emptyCommentCheck = comments === null || comments === void 0 ? void 0 : comments.every((comment) => { var _a; return ((_a = comment === null || comment === void 0 ? void 0 : comment.content) === null || _a === void 0 ? void 0 : _a.trim().length) === 0; });
            if ((filteredEmailTopics === null || filteredEmailTopics === void 0 ? void 0 : filteredEmailTopics.length) !== 0 || ((comments === null || comments === void 0 ? void 0 : comments.length) !== 0 && !emptyCommentCheck)) {
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard, caseId, cardId, containerId }));
                const combinedTopics = filteredEmailTopics.concat(comments);
                if (((_16 = action === null || action === void 0 ? void 0 : action.data) === null || _16 === void 0 ? void 0 : _16.emailTopics) && emailIdentifier) {
                    dispatch(generateEmail({ contactId: caseId, emailIdentifier: emailIdentifier, topics: combinedTopics }));
                }
            }
            else {
                const updatedCopilotCard = (_17 = cardItem === null || cardItem === void 0 ? void 0 : cardItem.body) === null || _17 === void 0 ? void 0 : _17.map((item) => {
                    if (item.id === ContainerId.INITIAL_CONTAINER) {
                        const items = item.items || [];
                        return Object.assign(Object.assign({}, item), { items: updateTopicsCardItems(items) });
                    }
                    return item;
                });
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard, caseId, cardId, containerId }));
            }
            return;
        }
        case CardActions.CLEAR_TEXT: {
            const checkedBoxed = (_19 = (_18 = action === null || action === void 0 ? void 0 : action.data) === null || _18 === void 0 ? void 0 : _18.customOption) !== null && _19 !== void 0 ? _19 : '';
            const textInputId = (_20 = action === null || action === void 0 ? void 0 : action.data) === null || _20 === void 0 ? void 0 : _20.textInputId;
            const lastElementId = textInputId[(textInputId === null || textInputId === void 0 ? void 0 : textInputId.length) - 1];
            const updatedCopilotCard = modifyCopilotCardTopics(cardItem, action, checkedBoxed);
            const finalUpdatedCopilotCard = updateAdaptiveCardforEmail(updatedCopilotCard, +lastElementId, textInputId, action);
            finalUpdatedCopilotCard &&
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard: finalUpdatedCopilotCard, caseId, cardId, containerId }));
            break;
        }
        case CardActions.ADD_NEW_TOPICS: {
            const checkedBoxed = (_22 = (_21 = action === null || action === void 0 ? void 0 : action.data) === null || _21 === void 0 ? void 0 : _21.customOption) !== null && _22 !== void 0 ? _22 : '';
            const updatedCopilotCard = modifyCopilotCardTopics(cardItem, action, checkedBoxed);
            const finalUpdatedCopilotCard = updateAdaptiveCardforEmail(updatedCopilotCard, -1, '', action);
            finalUpdatedCopilotCard &&
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard: finalUpdatedCopilotCard, caseId, cardId, containerId }));
            break;
        }
        case CardActions.MODIFY_FILTERS: {
            dispatch(CcfCopilotActions.setShouldOpenFilterPopoverForCase({ caseId, shouldOpenFilterPopover: true }));
            dispatch(CcfCopilotActions.updateAndHideFilterCard({ caseId, isFilterCardShown: true }));
            break;
        }
        case CardActions.EXPAND_SUMMARY: {
            if (cardItem.body) {
                const collapseJourneySummary = getContainerById(cardItem.body, ContainerId.JOURNEY_SUMMARY_CONTAINER);
                const updatedCollapseJourneySummary = toggleJourneySummaryVisibility(collapseJourneySummary);
                const expandJourneySummary = getContainerById(cardItem.body, ContainerId.JOURNEY_SUMMARY);
                if (collapseJourneySummary && expandJourneySummary) {
                    expandJourneySummary.isVisible = !expandJourneySummary.isVisible;
                    dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard: [updatedCollapseJourneySummary, expandJourneySummary], caseId, cardId, containerId, isJourneySummaryExpanded: expandJourneySummary.isVisible }));
                }
            }
            return;
        }
        case CardActions.VIEW_DETAILS_CONTAINER:
        case CardActions.HIDE_DETAILS_CONTAINER: {
            const interactionIindex = +((_24 = (_23 = action.data) === null || _23 === void 0 ? void 0 : _23.index) !== null && _24 !== void 0 ? _24 : 0);
            const updatedCardDetails = toggleSummaryDetailsContainerVisibility(cardItem.body, interactionIindex);
            dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard: updatedCardDetails, caseId, cardId, containerId, isJourneySummaryExpanded: true }));
            return;
        }
        case CardActions.CHECK_CONTACT_HISTORY: {
            dispatch(getContactDetailsForSelectedContact({ contactId: (_26 = (_25 = action.data) === null || _25 === void 0 ? void 0 : _25.contactNumber) === null || _26 === void 0 ? void 0 : _26.toString(), isAssignedToAgentInbox: false }));
            return;
        }
        case CardActions.TASK_ASSIST_FORM_SUBMIT: {
            dispatch(executeTaskAssist({
                intentConfig: (_27 = action === null || action === void 0 ? void 0 : action.data) === null || _27 === void 0 ? void 0 : _27.intentConfig,
                formCapturedata: action === null || action === void 0 ? void 0 : action.data,
                activeCaseId: caseId,
                taskSessionUid: objectIdValue,
            }));
            return;
        }
        case CardActions.CANCEL_TASK: {
            dispatch(CcfCopilotActions.removeTaskAssistCard({ contactId: caseId, objectId: objectIdValue !== null && objectIdValue !== void 0 ? objectIdValue : '' }));
            return;
        }
        case CardActions.RUN_TASK: {
            const matchedIntent = getMatchedIntent(caseId, { intentName: (_28 = action === null || action === void 0 ? void 0 : action.data) === null || _28 === void 0 ? void 0 : _28.intentName });
            dispatch(executeTaskAssist({ intentConfig: matchedIntent, activeCaseId: caseId, taskSessionUid: objectIdValue }));
            const decisionTreeId = (_30 = (_29 = matchedIntent === null || matchedIntent === void 0 ? void 0 : matchedIntent.elements) === null || _29 === void 0 ? void 0 : _29.success) === null || _30 === void 0 ? void 0 : _30.value;
            if (decisionTreeId) {
                try {
                    const decisionTreeElementResponse = yield dispatch(getDecisionTreeElement(decisionTreeId));
                    const apiResponse = decisionTreeElementResponse === null || decisionTreeElementResponse === void 0 ? void 0 : decisionTreeElementResponse.payload;
                    const config = (_31 = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.config) !== null && _31 !== void 0 ? _31 : {};
                    const { sections = [], title = '', icon = '', completeBtnTitle = '' } = config;
                    dispatch(CcfCopilotActions.updateDecisionTreeSectionsState({
                        contactId: caseId,
                        updates: { sections, title, icon, completeBtnTitle },
                    }));
                }
                catch (_41) {
                    console.error('executeCardAction/Error fetching decision tree element');
                }
            }
            return;
        }
        case CardActions.OPEN_TASK: {
            const matchedIntent = getMatchedIntent(caseId, { intentName: (_32 = action === null || action === void 0 ? void 0 : action.data) === null || _32 === void 0 ? void 0 : _32.intentName });
            const allAdaptiveCardSchemas = JSON.parse(LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS) || '{}');
            if (((_33 = action === null || action === void 0 ? void 0 : action.data) === null || _33 === void 0 ? void 0 : _33.intentName) && !allAdaptiveCardSchemas[action.data.intentName]) {
                yield dispatch(getTaskAssistFormSchema({ intentName: action.data.intentName, contactId: caseId }));
            }
            let preFilledData = { objectId: objectIdValue !== null && objectIdValue !== void 0 ? objectIdValue : '', intentName: '', data: {}, status: '' };
            try {
                const preFilledDataRaw = yield dispatch(getTaskAssistFormPreFilledData({
                    intentConfig: matchedIntent,
                    activeCaseId: caseId,
                    objectId: objectIdValue !== null && objectIdValue !== void 0 ? objectIdValue : '',
                }));
                preFilledData = preFilledDataRaw === null || preFilledDataRaw === void 0 ? void 0 : preFilledDataRaw.payload;
            }
            catch (error) {
                console.error('Error fetching pre-filled data:', error);
            }
            const data = (_34 = preFilledData === null || preFilledData === void 0 ? void 0 : preFilledData.data) !== null && _34 !== void 0 ? _34 : {};
            const taskAssistFormData = {
                intentName: matchedIntent === null || matchedIntent === void 0 ? void 0 : matchedIntent.intentName,
                formCapture: true,
                objectId: objectIdValue !== null && objectIdValue !== void 0 ? objectIdValue : '',
                status: TASK_ASSIST_STATUS.LOADING,
                data: Object.assign({}, data),
            };
            dispatch(CcfCopilotActions.addTaskAssistFormCard({ contactId: caseId, taskAssistFormData: taskAssistFormData }));
            return;
        }
        case CardActions.EDIT_SUMMARY: {
            if (cardItem.body) {
                const autoSummaryContainer = getContainerById(cardItem.body, ContainerId.AUTO_SUMMARY_CONTAINER);
                const updatedItems = getSummaryCardItems(cardItem.body, (_35 = cardItem.summary) !== null && _35 !== void 0 ? _35 : (_36 = action.data) === null || _36 === void 0 ? void 0 : _36.editedSummary, true, hasCopyIcon);
                const isExpanded = getAutoSummaryExpandedState(autoSummaryContainer);
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard: updatedItems, caseId, cardId, containerId, isAutoSummaryExpanded: isExpanded }));
            }
            return;
        }
        case CardActions.SAVE_SUMMARY: {
            if (cardItem.body) {
                const autoSummaryContainer = getContainerById(cardItem.body, ContainerId.AUTO_SUMMARY_CONTAINER);
                const editedSummary = (_38 = (_37 = action.data) === null || _37 === void 0 ? void 0 : _37.editedSummary) !== null && _38 !== void 0 ? _38 : cardItem.summary;
                const channel = isVoiceContact ? 'voice' : 'digital';
                const updatedItems = getSummaryCardItems(cardItem.body, editedSummary, false, hasCopyIcon);
                const isExpanded = getAutoSummaryExpandedState(autoSummaryContainer);
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard: updatedItems, caseId, cardId, containerId, isAutoSummaryExpanded: isExpanded }));
                dispatch(CcfCopilotActions.updateAutoSummaryCardContent({ contactId: caseId, summary: editedSummary }));
                const contactNumber = Number(caseId);
                dispatch(saveEditedSummary({ channel, contactNumber, summary: editedSummary }));
            }
            return;
        }
        case CardActions.COPY_SUMMARY: {
            const editedSummary = (_39 = cardItem.summary) !== null && _39 !== void 0 ? _39 : (_40 = action.data) === null || _40 === void 0 ? void 0 : _40.editedSummary;
            const textToCopy = containerId === ContainerId.AUTO_SUMMARY_CONTAINER ? editedSummary || '' : '';
            if (textToCopy) {
                try {
                    yield copyTextToClipboard(textToCopy);
                }
                catch (error) {
                    console.error('Failed to copy summary:', error);
                }
            }
            break;
        }
        case CardActions.EXPAND_AUTOSUMMARY: {
            if (cardItem.body) {
                const autoSummaryContainer = getContainerById(cardItem.body, ContainerId.AUTO_SUMMARY_CONTAINER);
                const updatedcard = toggleAutoSummaryHeaderVisibility(autoSummaryContainer);
                const isExpanded = getAutoSummaryExpandedState(autoSummaryContainer);
                dispatch(CcfCopilotActions.updateAdaptiveCardSchema({
                    updatedCopilotCard: [updatedcard],
                    caseId,
                    cardId,
                    containerId,
                    isAutoSummaryExpanded: isExpanded,
                }));
            }
            return;
        }
        case CardActions.RETRY_AUTOSUMMARY: {
            dispatch(CcfCopilotActions.addAutoSummaryErrorCard({ contactId: caseId, isLoading: true }));
            dispatch(fetchGeneratedFinalSummary({ contactId: caseId }));
            //  dispatch with isLoading: false after 10 seconds
            setTimeout(() => {
                var _a;
                !((_a = action === null || action === void 0 ? void 0 : action.data) === null || _a === void 0 ? void 0 : _a.isFinalSummaryGenerated) && dispatch(CcfCopilotActions.addAutoSummaryErrorCard({ contactId: caseId, isLoading: false }));
            }, 10000);
            return;
        }
    }
    handleIconChange(cardContainer, action, cardId, caseId, containerId, dispatch, individualObjectId);
});
/**
 * Function to handle on click event for actions
 * @param data - ClickHandlerData
 * @param handleIconChange - any
 * @param handleExpandImageClick - any
 * @param dispatch - any
 * @example
 * ```
 * handleClickActions(data, handleIconChange, handleExpandImageClick, dispatch)
 * ```
 */
const handleClickActions = ({ action, cardItem, caseId, isSmView, cardId, emailIdentifier, objectIdValue, kbInternalObjectIdValue, individualObjectId, isVoiceContact, hasCopyIcon }, handleIconChange, handleExpandImageClick, dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    var _42;
    const actionsofAdaptiveCard = [
        CardActions.INSERT_ARTICLE,
        CardActions.SEND_ARTICLE,
        CardActions.SEND_PRIVATE_ARTICLE,
        CardActions.INSERT_PRIVATE_ARTICLE,
        CardActions.INSERT_LINK,
        CardActions.SEND_LINK,
        CardActions.INSERT_IMAGE,
        CardActions.SEND_IMAGE,
        CardActions.EXPAND_IMAGE,
        CardActions.INSERT_STEP,
        CardActions.SEND_STEP,
        CardActions.INSERT_STEPS,
        CardActions.SEND_STEPS,
        CardActions.INSERT_PRIVATE_STEP,
        CardActions.SEND_PRIVATE_STEP,
        CardActions.INSERT_PRIVATE_STEPS,
        CardActions.SEND_PRIVATE_STEPS,
        CardActions.GENERATE_EMAIL,
        CardActions.LIKE,
        CardActions.DISLIKE,
        CardActions.ADD_NEW_TOPICS,
        CardActions.CLEAR_TEXT,
        CardActions.SUBMIT_FEEDBACK_DATA,
        CardActions.MODIFY_FILTERS,
        CardActions.VIEW_DETAILS_CONTAINER,
        CardActions.HIDE_DETAILS_CONTAINER,
        CardActions.EXPAND_SUMMARY,
        CardActions.CHECK_CONTACT_HISTORY,
        CardActions.TASK_ASSIST_FORM_SUBMIT,
        CardActions.CANCEL_TASK,
        CardActions.RUN_TASK,
        CardActions.OPEN_TASK,
        CardActions.EDIT_SUMMARY,
        CardActions.SAVE_SUMMARY,
        CardActions.COPY_SUMMARY,
        CardActions.EXPAND_AUTOSUMMARY,
        CardActions.RETRY_AUTOSUMMARY
    ];
    actionsofAdaptiveCard.forEach((actionName) => {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = action.data) === null || _a === void 0 ? void 0 : _a.name) === actionName) {
            const containerId = likeDislikeActions.includes((_b = action.data) === null || _b === void 0 ? void 0 : _b.name) || ((_c = action === null || action === void 0 ? void 0 : action.data) === null || _c === void 0 ? void 0 : _c.containerId) === ContainerId.CUSTOM_CARD || ((_d = action === null || action === void 0 ? void 0 : action.data) === null || _d === void 0 ? void 0 : _d.containerId) === ContainerId.TASK_ASSIST_CONTAINER || ((_e = action === null || action === void 0 ? void 0 : action.data) === null || _e === void 0 ? void 0 : _e.containerId) === ContainerId.AUTO_SUMMARY_CONTAINER ? (_f = action.data) === null || _f === void 0 ? void 0 : _f.containerId : getContainerIdFromAction(actionName);
            executeCardAction({ action, cardItem, caseId, isSmView, cardId, emailIdentifier, objectIdValue, kbInternalObjectIdValue, individualObjectId, isVoiceContact, hasCopyIcon }, containerId, handleIconChange, handleExpandImageClick, dispatch);
        }
    });
    if (isSmView && action.data && !excludedActionsForSmView.includes((_42 = action.data) === null || _42 === void 0 ? void 0 : _42.name)) {
        dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
    }
});
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
function updateAdaptiveCardforEmail(card, topicContainerIndex = -1, textInputId, action) {
    var _a, _b, _c, _d, _e, _f, _g;
    const container = (_e = (_d = (_c = (_b = (_a = card[0]) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.find((item) => item.id === ContainerId.RESPONSE_OPTION_CONTAINER)) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.find((item) => item.id === ContainerId.TOPIC_CONTAINER)) !== null && _e !== void 0 ? _e : null;
    let filteredTopic = container === null || container === void 0 ? void 0 : container.items;
    if (topicContainerIndex >= 0 && (container === null || container === void 0 ? void 0 : container.items)) {
        filteredTopic = (_f = container === null || container === void 0 ? void 0 : container.items) === null || _f === void 0 ? void 0 : _f.filter(item => (item === null || item === void 0 ? void 0 : item.id) !== textInputId);
    }
    else {
        const existingTopicContainers = (_g = filteredTopic === null || filteredTopic === void 0 ? void 0 : filteredTopic.filter((item) => { var _a; return (_a = item.id) === null || _a === void 0 ? void 0 : _a.startsWith(ContainerId.SHOW_TOPIC_CONTAINER); })) !== null && _g !== void 0 ? _g : [];
        const showTopicContainerIndex = existingTopicContainers.length;
        const actionData = action === null || action === void 0 ? void 0 : action.data;
        const customKey = `customTopics${showTopicContainerIndex}`;
        const customTopicValue = actionData ? actionData[customKey] : '';
        if (filteredTopic && showTopicContainerIndex < 3) {
            const newColumnSet = {
                type: 'ColumnSet',
                id: `showTopicContainer${showTopicContainerIndex}`,
                columns: [
                    {
                        type: 'Column',
                        width: 'auto',
                        items: [
                            {
                                type: 'Input.Toggle',
                                id: `checkbox${showTopicContainerIndex}`,
                                value: 'true',
                            }
                        ],
                        value: 'customTopics0, customTopics1, customTopics2',
                        verticalContentAlignment: 'Center',
                    },
                    {
                        type: 'Column',
                        width: 'stretch',
                        id: `inputText${showTopicContainerIndex}`,
                        items: [
                            {
                                type: 'Input.Text',
                                id: `customTopics${showTopicContainerIndex}`,
                                placeholder: 'adp_enterNewTopic',
                                value: customTopicValue,
                            }
                        ],
                    },
                    {
                        type: 'Column',
                        width: 'auto',
                        id: `clearButton${showTopicContainerIndex}`,
                        items: [
                            {
                                type: 'ActionSet',
                                actions: [
                                    {
                                        type: 'Action.Submit',
                                        verticalContentAlignment: 'Center',
                                        iconUrl: copilotActionIcons.AdaptiveCardClearTextBlockIcon,
                                        data: {
                                            name: 'clearText',
                                            textInputId: `showTopicContainer${showTopicContainerIndex}`,
                                        },
                                    }
                                ],
                            }
                        ],
                    }
                ],
            };
            filteredTopic.splice(showTopicContainerIndex, 0, newColumnSet);
        }
    }
    if (filteredTopic) {
        filteredTopic = filteredTopic.map((item, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!((_a = item === null || item === void 0 ? void 0 : item.id) === null || _a === void 0 ? void 0 : _a.startsWith(ContainerId.SHOW_TOPIC_CONTAINER))) {
                return item;
            }
            item.id = `showTopicContainer${index}`;
            const columns = item.columns;
            if (!columns || !((_c = (_b = columns[0]) === null || _b === void 0 ? void 0 : _b.items) === null || _c === void 0 ? void 0 : _c[0]) || !((_e = (_d = columns[1]) === null || _d === void 0 ? void 0 : _d.items) === null || _e === void 0 ? void 0 : _e[0]) || !((_g = (_f = columns[2]) === null || _f === void 0 ? void 0 : _f.items) === null || _g === void 0 ? void 0 : _g[0])) { // This check ensures that the columns array and the first item in each column are defined to avoid runtime errors.
                return item;
            }
            columns[0].items[0].id = `checkbox${index}`;
            columns[1].items[0].id = `customTopics${index}`;
            const actionSet = columns[2].items[0];
            const actions = actionSet.actions;
            if ((_h = actions === null || actions === void 0 ? void 0 : actions[0]) === null || _h === void 0 ? void 0 : _h.data) {
                actions[0].data.textInputId = `showTopicContainer${index}`;
            }
            return item;
        });
    }
    if (container) {
        container.items = filteredTopic;
    }
    const totalBlocks = (filteredTopic === null || filteredTopic === void 0 ? void 0 : filteredTopic.filter(item => (item === null || item === void 0 ? void 0 : item.id) && item.id.startsWith(ContainerId.SHOW_TOPIC_CONTAINER)).length) || 0;
    const addTopicButton = filteredTopic === null || filteredTopic === void 0 ? void 0 : filteredTopic.find((item) => item.id === ContainerId.ADD_TOPIC_ACTION_CONTAINER);
    if (addTopicButton) {
        addTopicButton.isVisible = totalBlocks <= 2;
    }
    return card;
}
/**
 * Modifies the topics in the Copilot card based on the provided action and checkedBoxed value.
 * @param cardData - The data of the card to be modified.
 * @param action - The action containing data to update the card.
 * @returns The updated card data with modified topics.
 * @example
 * ```
 * const updatedCard = modifyCopilotCardTopics(card, action);
 * ```
 */
const modifyCopilotCardTopics = (cardItem, action, checkedBoxed) => {
    var _a;
    return (_a = cardItem === null || cardItem === void 0 ? void 0 : cardItem.body) === null || _a === void 0 ? void 0 : _a.map((item) => {
        if (item.id === ContainerId.INITIAL_CONTAINER) {
            const items = item.items || [];
            const updatedItems = items.map((subItem) => {
                if (subItem.id === ContainerId.RESPONSE_OPTION_CONTAINER) {
                    const responseItems = subItem.items || [];
                    return Object.assign(Object.assign({}, subItem), { items: responseItems.map((innerItem) => {
                            if (innerItem.id === ContainerId.CUSTOM_OPTION_CONTAINER) {
                                return Object.assign(Object.assign({}, innerItem), { value: checkedBoxed });
                            }
                            if (innerItem.id === ContainerId.TOPIC_CONTAINER) {
                                const topicItems = innerItem.items || [];
                                const updatedTopicItems = topicItems.map((topicItem, index) => {
                                    if (topicItem.id === `showTopicContainer${index}`) {
                                        const columns = topicItem.columns || [];
                                        const updatedColumns = columns.map((column) => {
                                            const columnItems = column.items || [];
                                            const actionData = action === null || action === void 0 ? void 0 : action.data;
                                            const customKey = `customTopics${index}`;
                                            const customOptionText = actionData ? actionData[customKey] : '';
                                            const updatedColumnItems = columnItems.map((columnItem) => {
                                                if (columnItem.id === `customTopics${index}`) {
                                                    return Object.assign(Object.assign({}, columnItem), { value: customOptionText });
                                                }
                                                return columnItem;
                                            });
                                            return Object.assign(Object.assign({}, column), { items: updatedColumnItems });
                                        });
                                        return Object.assign(Object.assign({}, topicItem), { columns: updatedColumns });
                                    }
                                    return topicItem;
                                });
                                return Object.assign(Object.assign({}, innerItem), { items: updatedTopicItems });
                            }
                            return innerItem;
                        }) });
                }
                return subItem;
            });
            return Object.assign(Object.assign({}, item), { items: updatedItems });
        }
        return item;
    });
};
/**
 * Function to update card items by setting visibility and values for specific containers.
 * @param items - The card items to be updated.
 * @returns The updated card items.
 * @example
 * ```typescript
 * const result = updateTopicsCardItems(items);
 * ```
 */
const updateTopicsCardItems = (items) => {
    return items.map((subItem) => {
        if (subItem.id === ContainerId.ERROR_MESSAGE_CONTAINER) {
            return Object.assign(Object.assign({}, subItem), { isVisible: true });
        }
        if (subItem.id === ContainerId.RESPONSE_OPTION_CONTAINER) {
            const responseItems = subItem.items || [];
            return Object.assign(Object.assign({}, subItem), { items: responseItems.map((innerItem) => {
                    if (innerItem.id === 'customOption') {
                        return Object.assign(Object.assign({}, innerItem), { value: '' });
                    }
                    return innerItem;
                }) });
        }
        return subItem;
    });
};
/**
 * Function to extract topics and id from an action
 * @param data - The data object containing comments and other relevant data
 * @param cardItem - The card item to be updated
 * @returns An object containing comments, updatedCopilotCard, and filteredEmailTopics
 * @example
 * ```
 * const result = extractTopicsFromAction(data, cardItem);
 * ```
 */
const extractTopicsFromAction = (action, cardItem) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const comments = [(_a = action === null || action === void 0 ? void 0 : action.data) === null || _a === void 0 ? void 0 : _a.customTopics0, (_b = action === null || action === void 0 ? void 0 : action.data) === null || _b === void 0 ? void 0 : _b.customTopics1, (_c = action === null || action === void 0 ? void 0 : action.data) === null || _c === void 0 ? void 0 : _c.customTopics2]
        .reduce((topic, comment) => {
        if (comment) {
            topic.push({
                topicId: `topic${topic.length}`,
                content: comment,
            });
        }
        return topic;
    }, []);
    const updatedCopilotCard = (_d = cardItem === null || cardItem === void 0 ? void 0 : cardItem.body) === null || _d === void 0 ? void 0 : _d.map((item) => {
        return Object.assign(Object.assign({}, item), { isVisible: !item.isVisible });
    });
    let filteredEmailTopics = [];
    if ((_e = action.data) === null || _e === void 0 ? void 0 : _e.customOption) {
        filteredEmailTopics = mapSelectedEmailTopics((_f = action.data) === null || _f === void 0 ? void 0 : _f.customOption, (_h = (_g = action.data) === null || _g === void 0 ? void 0 : _g.emailTopics) !== null && _h !== void 0 ? _h : []);
    }
    return { comments, updatedCopilotCard, filteredEmailTopics };
};
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
function mapSelectedEmailTopics(customOption, emailTopics) {
    const customOptionArray = customOption.split(',').map(option => option.trim());
    return emailTopics.reduce((filteredTopics, currentTopic) => {
        if (customOptionArray.includes(currentTopic.topicId)) {
            filteredTopics.push({
                topicId: currentTopic === null || currentTopic === void 0 ? void 0 : currentTopic.topicId,
                content: currentTopic === null || currentTopic === void 0 ? void 0 : currentTopic.content,
            });
        }
        return filteredTopics;
    }, []);
}
/**
 * Function to handle insert or send action
 * @param response - string
 * @param action - action name
 * @param caseId - string
 * @param dispatch - any
 * @example
 * ```
 * handleInsertOrSendData(response, action, handleExpandImageClick, dispatch)
 * ```
 */
const handleInsertOrSendData = (response, action, caseId, dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    if (action.startsWith('send')) {
        dispatch(sendCopilotReply({ caseId, response }));
    }
    else {
        insertTextInEditor(response, caseId, dispatch);
    }
});
/**
 * Function to handle on click for icons
 * @param containerCard - CardElement
 * @param action - ActionMetaData
 * @param cardId - number
 * @param caseId - string
 * @param containerId - string
 * @param dispatch - any
 * @example
 * ```
 * handleIconChange(containerCard, action, cardId, caseId, containerId, dispatch)
 * ```
 */
const handleIconChange = (containerCard, action, cardId, caseId, containerId, dispatch) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const icons = extractDataFromCardSchema(containerCard, AdaptiveCardType.ICONS, (_a = action.data) === null || _a === void 0 ? void 0 : _a.name);
    if (icons.length > 0) {
        let imageIndex = 0;
        if (((_b = action.data) === null || _b === void 0 ? void 0 : _b.name) !== CardActions.INSERT_ARTICLE &&
            ((_c = action.data) === null || _c === void 0 ? void 0 : _c.name) !== CardActions.SEND_ARTICLE &&
            ((_d = action.data) === null || _d === void 0 ? void 0 : _d.name) !== CardActions.COPY_SUMMARY) {
            imageIndex = +((_f = (_e = action.data) === null || _e === void 0 ? void 0 : _e.index) !== null && _f !== void 0 ? _f : 0);
        }
        const updatedImage = (_g = action.data) === null || _g === void 0 ? void 0 : _g.newImageUrl;
        const iconToUpdate = containerId === ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER ? icons[0] : icons[imageIndex];
        iconToUpdate.url = updatedImage;
        if (privateArticleActions.includes((_h = action.data) === null || _h === void 0 ? void 0 : _h.name)) {
            const containerCardItems = containerCard.items;
            const internalUseContainer = containerCardItems.find(item => item.id === ContainerId.INTERNAL_USE_CONTAINER);
            if (internalUseContainer) {
                containerCard = internalUseContainer;
            }
        }
        if (containerCard && containerCard.items) {
            const updatedItems = (_j = containerCard === null || containerCard === void 0 ? void 0 : containerCard.items) === null || _j === void 0 ? void 0 : _j.map((item, index) => {
                var _a, _b, _c, _d;
                if (item.type === AdaptiveCardType.IMAGE && index === imageIndex) {
                    return Object.assign(Object.assign({}, item), { url: updatedImage });
                }
                if (likeDislikeActions.includes((_a = action.data) === null || _a === void 0 ? void 0 : _a.name) || publicArticleActions.includes((_b = action.data) === null || _b === void 0 ? void 0 : _b.name) || privateArticleActions.includes((_c = action.data) === null || _c === void 0 ? void 0 : _c.name) || containerId === ContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER) {
                    toggleLikeDislikeButton(item, action);
                }
                //For Task Assist, update the header icon to the sent icon
                if (containerId === ContainerId.TASK_ASSIST_CONTAINER && item.type === 'ColumnSet' && index === imageIndex) {
                    const updatedColumns = (_d = item.columns) === null || _d === void 0 ? void 0 : _d.map((column) => {
                        if (Array.isArray(column.items)) {
                            const updatedItems = column.items.map((innerItem) => {
                                var _a, _b;
                                if (innerItem.type === AdaptiveCardType.IMAGE && ((_b = (_a = innerItem.selectAction) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.newImageUrl)) {
                                    return Object.assign(Object.assign({}, innerItem), { url: innerItem.selectAction.data.newImageUrl });
                                }
                                return innerItem;
                            });
                            return Object.assign(Object.assign({}, column), { items: updatedItems });
                        }
                        return column;
                    });
                    return Object.assign(Object.assign({}, item), { columns: updatedColumns });
                }
                return item;
            });
            // For AUTO_SUMMARY_CONTAINER, preserve the outer container structure
            let updatedCopilotCard;
            if (containerId === ContainerId.AUTO_SUMMARY_CONTAINER) {
                updatedCopilotCard = [Object.assign(Object.assign({}, containerCard), { items: updatedItems })];
            }
            else {
                updatedCopilotCard = updatedItems;
            }
            const containerCardId = containerCard === null || containerCard === void 0 ? void 0 : containerCard.id;
            dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard, caseId, cardId, containerId, containerCardId }));
        }
    }
};
/**
 * Function to handle on click for container
 * @param containerCard - CardElement
 * @param cardId - number
 * @param containerId - string
 * @param caseId - string
 * @param dispatch - any
 * @example
 * ```
 * handleContainerOpen(containerCard, cardId, containerId, caseId, dispatch)
 * ```
 */
const handleContainerOpen = (containerCard, cardId, containerId, caseId, dispatch) => {
    let updatedCopilotCard = [];
    const containerIds = [
        ContainerId.INTERNAL_USE_CONTAINER,
        ContainerId.WEB_CONTAINER,
        ContainerId.IMAGES_CONTAINER,
        ContainerId.PROCESS_STEPS_CONTAINER,
        ContainerId.FILTERS_TITLE_CONTAINER,
        ContainerId.FILTERS_CONTAINER,
        ContainerId.PRIVATE_PROCESS_STEPS_CONTAINER
    ];
    if (containerCard.items) {
        updatedCopilotCard = containerCard === null || containerCard === void 0 ? void 0 : containerCard.items.map((item) => {
            const itemId = item.id;
            if (itemId !== undefined && containerIds.includes(itemId)) {
                return Object.assign(Object.assign({}, item), { isVisible: !item.isVisible });
            }
            return item;
        });
    }
    dispatch(CcfCopilotActions.updateAdaptiveCardSchema({ updatedCopilotCard, caseId, cardId, containerId }));
};
/**
 * Function to handle on click for Journey Summary container
 * @param containerCard - CardElement
 * @example
 * ```
 * toggleJourneySummaryVisibility(containerCard)
 * ```
 */
const toggleJourneySummaryVisibility = (containerCard) => {
    if (!containerCard || !containerCard.items)
        return containerCard;
    containerCard.items.forEach((item) => {
        if (item.isVisible !== undefined) {
            item.isVisible = !item.isVisible;
        }
        if (item.type === 'Container' && item.items !== undefined) {
            toggleJourneySummaryVisibility(item);
        }
        if (item.type === 'ColumnSet' && item.columns !== undefined) {
            item.columns.forEach((column) => {
                if (column.items !== undefined) {
                    toggleJourneySummaryVisibility(column);
                }
            });
        }
    });
    return containerCard;
};
/**
   * Function to toggle visibility of summaryHeader container and its children
   * @param containerCard - CardElement
   * @returns updated containerCard
   * @example
   * toggleAutoSummaryHeaderVisibility(containerCard)
   */
const toggleAutoSummaryHeaderVisibility = (container) => {
    if (!container || !Array.isArray(container.items))
        return container;
    const summaryHeader = container.items.find((item) => item.type === AdaptiveCardType.COLUMNSET && item.id === autoSummaryContainers.SUMMARY_HEADER);
    if (!summaryHeader || !Array.isArray(summaryHeader.columns))
        return container;
    const expandIconColumn = summaryHeader.columns.find((col) => col.id === autoSummaryContainers.EXPAND_ICON_COLUMN);
    if (!expandIconColumn || !Array.isArray(expandIconColumn.items))
        return container;
    expandIconColumn.items.forEach((item) => {
        item.isVisible = !item.isVisible;
    });
    return container;
};
/**
 * Function to get image details, file and url
 * @param imagesArray - array of CardElement
 * @param imagesIndex - number
 * @example
 * ```
 * getImageDetails(url)
 * ```
 */
const getImageDetails = (imagesArray, imagesIndex) => __awaiter(void 0, void 0, void 0, function* () {
    const img = imagesArray[imagesIndex !== null && imagesIndex !== void 0 ? imagesIndex : 0];
    const imgUrl = `${(img === null || img === void 0 ? void 0 : img.url) || ''}`;
    const imgExt = getUrlExtension(imgUrl);
    const response = yield fetch(imgUrl);
    const blob = yield response.blob();
    const file = new File([blob], 'image.' + imgExt, {
        type: blob.type,
    });
    return { file, imgUrl };
});
/**
 * Function to get all process steps
 * @param textBlocks - array of steps
 * @param action - name of action
 * @returns - response
 * @example
 * ```
 * getProcessSteps(textBlocks, action)
 * ```
 */
const getProcessSteps = (textBlocks, action, isSmView) => {
    let steps = '';
    for (let textId = 0; textId < textBlocks.length; textId += 2) {
        const title = textBlocks[textId];
        const description = textBlocks[textId + 1];
        const separator = (action === CardActions.SEND_STEPS || action === CardActions.SEND_PRIVATE_STEPS || isSmView) ? '\n' : '<br>';
        steps += `${title}${separator}- ${description}${separator}`;
        const isLastStep = textId === textBlocks.length - 2;
        if (!isLastStep) {
            steps += `${separator}`;
        }
    }
    return steps;
};
/**
 * Function to get container body by id
 * @param cardData - adaptive card schema body
 * @param id - container id
 * @returns - container body
 * @example
 * ```
 * getContainerById(cardData, id)
 * ```
 */
const getContainerById = (cardData, id) => {
    for (const container of cardData) {
        if (container.id && container.id.includes(id) && container.type === AdaptiveCardType.CONTAINER) {
            return container;
        }
    }
    return {};
};
/**
 * Function to insert response in editor
 * @param response - string to be inserted in editor
 * @param caseId - string
 * @param dispatch - any
 * @example
 * ```
 * insertTextInEditor(response, caseId, dispatch)
 * ```
 */
const insertTextInEditor = (response, caseId, dispatch) => {
    dispatch(CcfCopilotActions.updateSentBestResponse({ response, caseId }));
    dispatch(CcfCopilotActions.updateIsBestResponseSent({ isResponseInserted: true, caseId }));
    setTimeout(() => {
        dispatch(CcfCopilotActions.updateIsBestResponseSent({ isResponseInserted: false, caseId }));
    }, 250);
};
/**
 * Function to handle toggle of like and dislike button
 * @param item - CardElement
 * @param action - ActionMetadata
 * @example
 * ```
 * toggleLikeDislikeButton(item, action)
 * ```
 */
const toggleLikeDislikeButton = (item, action) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    let likeIndex = 0, dislikeIndex = 0;
    // Combine INSERT and SEND actions for public and private articles
    const validActions = new Set([
        CardActions.INSERT_ARTICLE,
        CardActions.INSERT_PRIVATE_ARTICLE,
        CardActions.SEND_ARTICLE,
        CardActions.SEND_PRIVATE_ARTICLE
    ]);
    const isInsertOrSendAction = validActions.has((_a = action.data) === null || _a === void 0 ? void 0 : _a.name);
    if (isInsertOrSendAction) {
        likeIndex = 1;
    }
    // Find columns based on like/dislike action names
    const articleColumn = (_b = item.columns) === null || _b === void 0 ? void 0 : _b.find((column) => { var _a, _b, _c, _d; return column.items && ((_c = (_b = (_a = column.items[0]) === null || _a === void 0 ? void 0 : _a.selectAction) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.name) === ((_d = action.data) === null || _d === void 0 ? void 0 : _d.name); });
    const actionName = (_f = (_e = (_d = (_c = articleColumn === null || articleColumn === void 0 ? void 0 : articleColumn.items) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.selectAction) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.name;
    if (articleColumn && actionName === CardActions.LIKE) {
        likeIndex++;
        dislikeIndex = 0;
    }
    else if (articleColumn && actionName === CardActions.DISLIKE) {
        dislikeIndex++;
        likeIndex = 0;
    }
    // Update icons based on dislikeIndex and likeIndex values
    if (dislikeIndex === 1) {
        const likeItem = (_g = item.columns) === null || _g === void 0 ? void 0 : _g.find(column => { var _a, _b, _c; return column.items && ((_c = (_b = (_a = column.items[0]) === null || _a === void 0 ? void 0 : _a.selectAction) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.name) === CardActions.LIKE; });
        if (likeItem && likeItem.items && likeItem.items[0]) {
            likeItem.items[0].url = encodeSVG(copilotActionIcons[ActionIconType.LIKE_ICON], true);
        }
    }
    if (likeIndex === 1) {
        const columns = item.columns || [];
        let dislikeItem, likeItem;
        for (const column of columns) {
            if (column.items && ((_k = (_j = (_h = column.items[0]) === null || _h === void 0 ? void 0 : _h.selectAction) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.name) === CardActions.DISLIKE) {
                dislikeItem = column;
            }
            if (column.items && ((_o = (_m = (_l = column.items[0]) === null || _l === void 0 ? void 0 : _l.selectAction) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.name) === CardActions.LIKE) {
                likeItem = column;
            }
            if (dislikeItem && likeItem)
                break;
        }
        if ((_p = dislikeItem === null || dislikeItem === void 0 ? void 0 : dislikeItem.items) === null || _p === void 0 ? void 0 : _p[0]) {
            dislikeItem.items[0].url = encodeSVG(copilotActionIcons[ActionIconType.DISLIKE_ICON], true);
        }
        if (isInsertOrSendAction && ((_q = likeItem === null || likeItem === void 0 ? void 0 : likeItem.items) === null || _q === void 0 ? void 0 : _q[0])) {
            likeItem.items[0].url = encodeSVG(copilotActionIcons[ActionIconType.DISABLED_LIKE_ICON], true);
        }
    }
};
/**
 * Function to dispatch actions for feedbackcard based on actions
 * @param action - string
 * @param objectIdValue - string
 * @param kbInternalObjectIdValue - string
 * @param agentId - string
 * @param caseId - string
 * @param individualObjectId - string
 * @param cardItem - CardData
 * @param comprehensiveFeedbackData - OverallContactFeedbackData
 * @param dispatch - any
 * @example -
 * ```
 * dispatchFeedbackCardActions('like', '123', '12', 'agent1', '123', '1234', {}, {}, dispatch)
 * ```
 */
const dispatchFeedbackCardActions = (feedbackActions, dispatch) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const { feedback, objectIdValue, kbInternalObjectIdValue, agentId, caseId, individualObjectId, cardItem, comprehensiveFeedbackData, containerId } = feedbackActions;
    const actionName = feedback;
    const kbAnswer = (_a = cardItem === null || cardItem === void 0 ? void 0 : cardItem.body) === null || _a === void 0 ? void 0 : _a.find(item => item.id === ContainerId.KB_ANSWERS);
    const privateKbAnswer = (_b = cardItem === null || cardItem === void 0 ? void 0 : cardItem.body) === null || _b === void 0 ? void 0 : _b.find(item => { var _a; return (_a = item.id) === null || _a === void 0 ? void 0 : _a.includes(ContainerId.KB_INTERNAL); });
    let title = '', privateAnswerTitle = '';
    // DEV Comment - This is for handling the case to fetch the title of the private kbAnswer container and fetch the container with id 'internalUseContainer' if it exists
    if (privateKbAnswer && ((_c = privateKbAnswer === null || privateKbAnswer === void 0 ? void 0 : privateKbAnswer.items) === null || _c === void 0 ? void 0 : _c.findIndex(item => item.id === ContainerId.INTERNAL_USE_CONTAINER)) !== -1) {
        privateAnswerTitle = ((_h = (_g = (_f = (_e = (_d = privateKbAnswer.items) === null || _d === void 0 ? void 0 : _d[1]) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.find(privateItem => privateItem.text !== '' && privateItem.text)) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.split('.')[0]) || '';
    }
    else {
        privateAnswerTitle = ((_l = (_k = (_j = privateKbAnswer === null || privateKbAnswer === void 0 ? void 0 : privateKbAnswer.items) === null || _j === void 0 ? void 0 : _j.find(item => item.id === 'privateDescription')) === null || _k === void 0 ? void 0 : _k.text) === null || _l === void 0 ? void 0 : _l.split('.')[0]) || '';
    }
    switch (actionName) {
        case CardActions.LIKE:
        case CardActions.DISLIKE:
            if ((kbAnswer === null || kbAnswer === void 0 ? void 0 : kbAnswer.items) && containerId === ContainerId.KB_ANSWERS) {
                if ((_m = kbAnswer === null || kbAnswer === void 0 ? void 0 : kbAnswer.items[0]) === null || _m === void 0 ? void 0 : _m.text) {
                    title = (_o = kbAnswer === null || kbAnswer === void 0 ? void 0 : kbAnswer.items[0]) === null || _o === void 0 ? void 0 : _o.text;
                }
                else {
                    title = ((_q = (_p = kbAnswer === null || kbAnswer === void 0 ? void 0 : kbAnswer.items[1]) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.split('.')[0]) || '';
                }
                dispatch(CcfCopilotActions.updateFeedbackData({ feedback: actionName, caseId: caseId, objectId: objectIdValue, contactId: caseId, agentId: agentId, agentContactId: 'agentContactId', title: title }));
            }
            if (kbInternalObjectIdValue && (privateKbAnswer === null || privateKbAnswer === void 0 ? void 0 : privateKbAnswer.items) && containerId === ContainerId.KB_INTERNAL) {
                dispatch(CcfCopilotActions.updateFeedbackData({ feedback: actionName, caseId: caseId, objectId: `${objectIdValue}_${kbInternalObjectIdValue}`, contactId: caseId, agentId: agentId, agentContactId: 'agentContactId', title: privateAnswerTitle }));
            }
            break;
    }
};
/**
   * Function to call API service to send feedback data
   * @param data - OverallContactFeedbackData
   * @example sendFeedbackData(data)
   */
const sendFeedbackData = (contactId, data, dispatch) => {
    const cxoneClientInstance = CXoneClient.instance;
    const { contactFeedbackCard, guidanceFeedbacks } = data;
    const filteredPerSuggestionsSubcard = [];
    guidanceFeedbacks.forEach((guidanceFeedback) => {
        const { feedback, objectId, contactId, agentContactId, agentId, kbAnswerUid, utteranceId, title, tag, comment } = guidanceFeedback;
        let tagEnum;
        if ((feedback === CardActions.LIKE || feedback === CardActions.LIKE_INDIVIDUAL_SUBCARDS) && tag === 'Other') {
            tagEnum = FeedbackTags['Positive_Other'];
        }
        else if ((feedback === CardActions.DISLIKE || feedback === CardActions.DISLIKE_INDIVIDUAL_SUBCARDS) && tag === 'Other') {
            tagEnum = FeedbackTags['Negative_Other'];
        }
        else {
            tagEnum = FeedbackTags[tag];
        }
        if (feedback) {
            filteredPerSuggestionsSubcard.push({
                feedback,
                objectId,
                contactId,
                agentContactId,
                agentId,
                kbAnswerUid,
                utteranceId,
                title,
                tag: tagEnum,
                comment,
            });
        }
    });
    filteredPerSuggestionsSubcard.length > 0 && cxoneClientInstance.copilotService.sendGuidanceFeedback(filteredPerSuggestionsSubcard);
    cxoneClientInstance.copilotService.sendContactFeedback(contactFeedbackCard);
    dispatch(CcfCopilotActions.setIsComprehensiveFeedbackSent({ caseId: contactId, isComprehensiveFeedbackSent: true }));
};
/**
   * Function to handle like/dislike of guidanceFeedbacks
   * @param event - event
   * @param data - GuidanceFeedback
   * @example handleLikeDislike(event, feedback)
   */
const handleLikeDislike = (event, data, dispatch) => {
    const { feedback, objectId, contactId, agentContactId, agentId, kbAnswerUid, utteranceId, title } = data;
    event.stopPropagation();
    if (objectId === 'overallSubcard') {
        dispatch(CcfCopilotActions.updateOverSubcardsFeedback({ caseId: contactId, feedback }));
    }
    else {
        const feedbackData = {
            feedback,
            objectId: objectId !== null && objectId !== void 0 ? objectId : '',
            contactId: contactId !== null && contactId !== void 0 ? contactId : '',
            agentId: agentId !== null && agentId !== void 0 ? agentId : '',
            agentContactId: agentContactId !== null && agentContactId !== void 0 ? agentContactId : '',
            utteranceId: utteranceId !== null && utteranceId !== void 0 ? utteranceId : '',
            kbAnswerUid: kbAnswerUid !== null && kbAnswerUid !== void 0 ? kbAnswerUid : '',
            title: title !== null && title !== void 0 ? title : '',
        };
        dispatch(CcfCopilotActions.updateComprehensiveSubcardsFeedback({ caseId: contactId, feedbackData }));
    }
};
/**
   * Function to store selected chip for individual card
   * @param data - GuidanceFeedbackData
   * @example handleSelectedChip(label, objectId)
   */
const handleSelectedChip = (data, dispatch) => {
    const { tag, objectId, contactId, feedback, agentId, agentContactId, utteranceId, kbAnswerUid, title } = data;
    const feedbackData = {
        feedback,
        objectId,
        contactId,
        agentId,
        agentContactId,
        utteranceId,
        kbAnswerUid,
        title,
        tag,
    };
    dispatch(CcfCopilotActions.updateComprehensiveSubcardsFeedback({ caseId: contactId, feedbackData }));
};
/**
 *
 * @param copilotCard - any
 * @param updatedAdaptiveCardToAdd - CopilotMessageData
 * @param contactId - string
 * @param iconsList - copilotAdaptiveCardIcon
 * @example
 * ```
 * updateCopilotCard(copilotCard, updatedAdaptiveCardToAdd, contactId, iconsList)
 * ```
 */
const updateCopilotCard = (copilotCard, updatedAdaptiveCardToAdd, contactId, iconsList) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    copilotCard.body.forEach((card) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (card.id.includes('overallSubcard')) {
            const feedbackContainer = card.items.find(cardItem => cardItem.id === ContainerId.FEEDBACK_TOPICS_CONTAINER);
            const overallLikeObject = (_a = feedbackContainer === null || feedbackContainer === void 0 ? void 0 : feedbackContainer.columns) === null || _a === void 0 ? void 0 : _a.find((feedback) => feedback.id === ContainerId.FEEDBACK_LIKE_CONTAINER);
            const overallDislikeObject = (_b = feedbackContainer === null || feedbackContainer === void 0 ? void 0 : feedbackContainer.columns) === null || _b === void 0 ? void 0 : _b.find((feedback) => feedback.id === ContainerId.FEEDBACK_DISLIKE_CONTAINER);
            const feedbackSelected = (_d = (_c = updatedAdaptiveCardToAdd[contactId].comprehensiveFeedback) === null || _c === void 0 ? void 0 : _c.contactFeedbackCard) === null || _d === void 0 ? void 0 : _d.feedback;
            if (feedbackSelected === CardActions.LIKE_OVERALL_SUBCARD) {
                overallLikeObject.items[0].url = iconsList[ActionIconType.DISABLED_LIKE_ICON];
            }
            else if (feedbackSelected === CardActions.DISLIKE_OVERALL_SUBCARD) {
                overallDislikeObject.items[0].url = iconsList[ActionIconType.DISABLED_DISLIKE_ICON];
            }
        }
        if (card.id.includes('perSuggestionSubcards')) {
            const feedbackCard = card.items.find(cardItem => cardItem.id === ContainerId.FEEDBACK_CONTAINER);
            const likeFeedbackObject = (_e = feedbackCard === null || feedbackCard === void 0 ? void 0 : feedbackCard.columns) === null || _e === void 0 ? void 0 : _e.find((feedback) => feedback.id === ContainerId.FEEDBACK_LIKE_CONTAINER);
            const dislikeFeedbackObject = (_f = feedbackCard === null || feedbackCard === void 0 ? void 0 : feedbackCard.columns) === null || _f === void 0 ? void 0 : _f.find((feedback) => feedback.id === ContainerId.FEEDBACK_DISLIKE_CONTAINER);
            const feedbackCardObjectId = likeFeedbackObject.items[0].objectId;
            const feedbackSelected = (_h = (_g = updatedAdaptiveCardToAdd[contactId].comprehensiveFeedback) === null || _g === void 0 ? void 0 : _g.guidanceFeedbacks) === null || _h === void 0 ? void 0 : _h.find((feedback) => feedback.objectId === feedbackCardObjectId);
            card.id = `${card.id}_${feedbackCardObjectId}`;
            if ((feedbackSelected === null || feedbackSelected === void 0 ? void 0 : feedbackSelected.feedback) === CardActions.LIKE || (feedbackSelected === null || feedbackSelected === void 0 ? void 0 : feedbackSelected.feedback) === CardActions.LIKE_INDIVIDUAL_SUBCARDS) {
                likeFeedbackObject.items[0].url = iconsList[ActionIconType.DISABLED_LIKE_ICON];
            }
            else if ((feedbackSelected === null || feedbackSelected === void 0 ? void 0 : feedbackSelected.feedback) === CardActions.DISLIKE || (feedbackSelected === null || feedbackSelected === void 0 ? void 0 : feedbackSelected.feedback) === CardActions.DISLIKE_INDIVIDUAL_SUBCARDS) {
                dislikeFeedbackObject.items[0].url = iconsList[ActionIconType.DISABLED_DISLIKE_ICON];
            }
        }
    });
    return copilotCard;
};
/**
 * Function to toggle summary details containers
 * @param cardBody - CardElement[]
 * @param index - number
 * @example
 * ```
 * toggleSummaryDetailsContainerVisibility(cardBody, index)
 * ```
 * @returns cardbody objects representing the updated state of the card
 */
const toggleSummaryDetailsContainerVisibility = (cardBody, index) => {
    cardBody = cardBody.map((item) => {
        var _a, _b;
        if (item.id === ContainerId.JOURNEY_SUMMARY && item.items) {
            const interactionDataContainers = item.items.filter((subItem) => subItem.id === ContainerId.INTERACTION_DETAILS_CONTAINER);
            if (interactionDataContainers.length > index && interactionDataContainers[index].items) {
                (_b = (_a = interactionDataContainers[index]) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.map((subItem) => {
                    if (subItem.id === ContainerId.SUMMARY_DETAILS_CONTAINER && subItem.columns) {
                        subItem.columns = subItem.columns.map((column) => {
                            var _a;
                            column.items = (_a = column === null || column === void 0 ? void 0 : column.items) === null || _a === void 0 ? void 0 : _a.map((columnItem) => {
                                if (columnItem.id === ContainerId.VIEW_DETAILS_CONTAINER || columnItem.id === ContainerId.HIDE_DETAILS_CONTAINER) {
                                    return Object.assign(Object.assign({}, columnItem), { isVisible: !columnItem.isVisible });
                                }
                                return columnItem;
                            });
                            return column;
                        });
                    }
                    return subItem;
                });
            }
        }
        return item;
    });
    return cardBody;
};
/**
 * Function to debounce the entered comment and dispatch the feedback data
 * @param value - string
 * @param data - FeedbackData
 * @param dispatch - any
 * @example
 * ```
 * debouncedDispatch(value, data, dispatch)
 * ```
 */
const debouncedDispatch = debounce((value, data, dispatch) => {
    const { objectId, contactId, feedback, tag, agentId, agentContactId, utteranceId, kbAnswerUid, title } = data;
    if (objectId === 'overallSubcard') {
        dispatch(CcfCopilotActions.updateOverSubcardsFeedback({ caseId: contactId, feedback, comment: value }));
    }
    else {
        const feedbackData = {
            feedback: feedback !== null && feedback !== void 0 ? feedback : '',
            objectId: objectId !== null && objectId !== void 0 ? objectId : '',
            contactId: contactId !== null && contactId !== void 0 ? contactId : '',
            comment: value,
            tag: tag !== null && tag !== void 0 ? tag : '',
            agentId: agentId !== null && agentId !== void 0 ? agentId : '',
            agentContactId: agentContactId !== null && agentContactId !== void 0 ? agentContactId : '',
            utteranceId: utteranceId !== null && utteranceId !== void 0 ? utteranceId : '',
            kbAnswerUid: kbAnswerUid !== null && kbAnswerUid !== void 0 ? kbAnswerUid : '',
            title: title !== null && title !== void 0 ? title : '',
        };
        dispatch(CcfCopilotActions.updateComprehensiveSubcardsFeedback({ caseId: contactId, feedbackData }));
    }
}, 1000);
/**
   * Function to determine if the guidance feedback card can be expanded
   * @param isFeedbackEnabled - check if feedback is given
   * @param isCommentEnabled - check if comment is enabled
   * @param isTagEnabled - check if tag is enabled
   * @example
   * ```
   * shouldExpandGuidanceCard(isFeedbackEnabled, isCommentEnabled, isTagEnabled)
   * ```
   */
const shouldExpandGuidanceCard = (isFeedbackEnabled, isCommentEnabled, isTagEnabled) => {
    return isFeedbackEnabled && (isCommentEnabled || isTagEnabled);
};
/**
   * Function to check if feedback is positive or negative
   * @param feedback - feedback string
   * @param actions - feedback actions array
   * @example
   * ```
   * checkFeedback(feedback, actions)
   * ```
   */
const checkFeedback = (feedback, actions) => {
    return actions.includes(feedback);
};
/**
 * Function to return the style of the tag for guidance feedback card
 * @param guidanceFeedbackTag - the tag in the state of the guidance feedback card
 * @param selectedTag - the selected tag label from the UI
 * @example
 * ```
 * getChipVariant(guidanceFeedbackTag, selectedTag)
 * ```
 */
const getChipVariant = (guidanceFeedbackTag, selectedTag) => {
    return guidanceFeedbackTag === selectedTag ? 'filled' : 'outlined';
};
/**
 * Function to filter guidance feedbacks based on the feedback and feedback settings
 * @param data - the data object containing guidance feedbacks
 * @param isUnratedFeedbackEnabled - boolean to check if unrated feedback is enabled
 * @param isPositiveFeedbackEnabled - boolean to check if positive feedback is enabled
 * @param isNegativeFeedbackEnabled - boolean to check if negative feedback is enabled
 * @example
 * ```
 * filterGuidanceFeedbacks(data, isUnratedFeedbackEnabled, isPositiveFeedbackEnabled, isNegativeFeedbackEnabled)
 * ```
 */
const filterGuidanceFeedbacks = (data, isUnratedFeedbackEnabled, isPositiveFeedbackEnabled, isNegativeFeedbackEnabled) => {
    return data.filter((guidanceFeedback) => {
        const feedback = guidanceFeedback.feedback;
        return ((isUnratedFeedbackEnabled || feedback !== '') &&
            (isPositiveFeedbackEnabled || feedback !== CardActions.LIKE) &&
            (isNegativeFeedbackEnabled || feedback !== CardActions.DISLIKE));
    });
};
/**
 * Checks if the given intent has form capture enabled in the Task Assist configuration.
 *
 * @param intentName - The unique name of the intent to check.
 * @param taskAssistConfig - The full Task Assist configuration object containing intent configurations.
 *
 * @returns `true` if the intent exists and `formCapture` is explicitly set to true, otherwise `false`.
 *
 * @example
 * ```
 * const isEnabled = isFormCaptureEnabled("Check_Account_Balance", taskAssistConfig);
 * console.log(isEnabled); // true or false
 * ```
 */
const isFormCaptureEnabled = (intentName, taskAssistConfig) => {
    const intent = taskAssistConfig.intentConfig.find((config) => config.intentName === intentName);
    return (intent === null || intent === void 0 ? void 0 : intent.formCapture) === true; // Returns true only if explicitly true, otherwise false
};
/**
 * Function to copy text to clipboard
 * @param textToCopy - The text to be copied to the clipboard
 * @example
 * ```
 * copyTextToClipboard(textToCopy)
 * ```
 */
const copyTextToClipboard = (textToCopy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield navigator.clipboard.writeText(textToCopy);
    }
    catch (error) {
        // Fallback for browsers/environments where Clipboard API is blocked
        logger.warn('Clipboard API failed, trying fallback method', JSON.stringify(error));
        const activeElement = document.activeElement;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
        textarea.style.opacity = '0';
        textarea.setAttribute('aria-hidden', 'true');
        document.body.appendChild(textarea);
        try {
            textarea.focus();
            textarea.setSelectionRange(0, textarea.value.length);
            document.execCommand('copy');
        }
        catch (copyError) {
            logger.error('Fallback: Copy command failed', JSON.stringify(copyError));
        }
        finally {
            document.body.removeChild(textarea);
            // Restore focus to the original active element
            if (activeElement && typeof activeElement.focus === 'function') {
                activeElement.focus();
            }
        }
    }
});
/**
 * Helper function to update card items for both EDIT_SUMMARY and SAVE_SUMMARY actions.
 *
 * This function traverses the card body, finds both the 'summaryHeader' and 'actionsRow' items,
 * and toggles the visibility and values for specific elements based on the action type.
 *
 * @param cardBody - The array of card elements representing the card body.
 * @param editedAutoSummary - The edited auto summary content to populate in the input.
 * @param isEditMode - Boolean to determine if it's edit mode (true) or save mode (false).
 *
 * @example
 * // For edit mode
 * const updatedItems = getSummaryCardItems(cardItem.body, editedAutoSummary, true);
 * // For save mode
 * const updatedItems = getSummaryCardItems(cardItem.body, editedAutoSummary, false);
 *
 * @returns The updated array of CardElement with modifications for the summary action.
 */
const getSummaryCardItems = (cardBody, editedAutoSummary, isEditMode, hasCopyIcon) => {
    return cardBody.map((item) => {
        if (item.id === ContainerId.AUTO_SUMMARY_CONTAINER && Array.isArray(item.items)) {
            item.items = item.items.map((subItem) => {
                if (subItem.id === autoSummaryContainers.SUMMARY_TEXT && Array.isArray(subItem.columns)) {
                    subItem.columns.forEach(column => {
                        if (column.id === autoSummaryContainers.SUMMARY_COLUMN && Array.isArray(column.items)) {
                            column.items.forEach(element => {
                                if (element.id === autoSummaryContainers.FINAL_SUMMARY_TEXT) {
                                    element.isVisible = !isEditMode;
                                    element.text = editedAutoSummary !== null && editedAutoSummary !== void 0 ? editedAutoSummary : '';
                                }
                                if (element.id === autoSummaryContainers.EDITED_SUMMARY) {
                                    element.isVisible = isEditMode;
                                    element.value = editedAutoSummary !== null && editedAutoSummary !== void 0 ? editedAutoSummary : '';
                                }
                            });
                        }
                    });
                }
                if (subItem.id === autoSummaryContainers.ACTIONS_ROW && Array.isArray(subItem.columns)) {
                    subItem.columns.forEach(column => {
                        if (column.id === autoSummaryContainers.EDIT_ICON) {
                            column.isVisible = !isEditMode;
                        }
                        if (column.id === autoSummaryContainers.COPY_ICON) {
                            column.isVisible = !isEditMode && hasCopyIcon;
                        }
                        if (column.id === autoSummaryContainers.SAVE_BUTTON_COLUMN) {
                            column.isVisible = isEditMode;
                        }
                    });
                }
                return subItem;
            });
        }
        return item;
    });
};
/**
 * Helper function to get the isVisible state of the collapse auto summary icon
 *
 * This function iterates through the auto summary container structure to find the
 * element with id 'collapseAutoSummaryIcon' and returns its visibility state.
 *
 * @param cardBody - The array of card elements representing the card body.
 *
 * @example
 * const isExpanded = getAutoSummaryExpandedState(cardItem.body);
 *
 * @returns Boolean indicating if the auto summary is expanded (collapse icon visible), defaults to false if not found.
 */
const getAutoSummaryExpandedState = (autoSummaryContainer) => {
    var _a;
    if (!autoSummaryContainer || !autoSummaryContainer.items) {
        return false;
    }
    // Iterate through the container items to find the collapse icon
    for (const item of autoSummaryContainer.items) {
        if (item.type === AdaptiveCardType.COLUMNSET && item.columns) {
            for (const column of item.columns) {
                if (column.items) {
                    for (const element of column.items) {
                        if (element.id === autoSummaryContainers.COLLAPSE_AUTO_SUMMARY_ICON) {
                            return (_a = element.isVisible) !== null && _a !== void 0 ? _a : false;
                        }
                    }
                }
            }
        }
    }
    return false;
};
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
export const getSaveSummaryCardItems = (cardBody, editedAutoSummary) => {
    return cardBody.map((item) => {
        if (item.id === 'autoSummaryContainer' && Array.isArray(item.items)) {
            item.items = item.items.map((subItem) => {
                var _a;
                if (subItem.id === 'summaryHeader' && Array.isArray(subItem.columns)) {
                    const summaryColumn = subItem.columns.find(column => column.id === 'summaryColumn');
                    const container = (_a = summaryColumn === null || summaryColumn === void 0 ? void 0 : summaryColumn.items) === null || _a === void 0 ? void 0 : _a[0];
                    const elements = (container === null || container === void 0 ? void 0 : container.items) || [];
                    elements.forEach(element => {
                        if (element.id === 'finalSummaryText') {
                            element.isVisible = true;
                            element.text = editedAutoSummary !== null && editedAutoSummary !== void 0 ? editedAutoSummary : '';
                        }
                        if (element.id === 'editedSummary') {
                            element.value = editedAutoSummary !== null && editedAutoSummary !== void 0 ? editedAutoSummary : '';
                            element.isVisible = false;
                        }
                    });
                }
                if (subItem.id === 'actionsRow' && Array.isArray(subItem.columns)) {
                    subItem.columns.forEach(column => {
                        if (column.id === 'editIcon' || column.id === 'copyIcon')
                            column.isVisible = true;
                        if (column.id === 'saveButtonColumn')
                            column.isVisible = false;
                    });
                }
                return subItem;
            });
        }
        return item;
    });
};
/**
 * Function to convert input values to string format for form prefill data
 * @param inputs - Record of input values
 * @returns Record with all values converted to strings
 * @example
 * ```
 * const stringifiedInputs = getAdaptiveCardsByContentType(inputs);
 * ```
 */
const getAdaptiveCardsByContentType = (contentType, content) => {
    const allAdaptiveCardSchemas = JSON.parse(LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS) || '{}');
    const taskAssistFormCard = allAdaptiveCardSchemas[contentType];
    if (!taskAssistFormCard) {
        return;
    }
    const template = new ACData.Template(taskAssistFormCard);
    let expandedCard = template.expand({
        $root: content,
    });
    expandedCard = replaceAllUrls(expandedCard);
    return expandedCard;
};
/**
 * Retrieves the matched IntentConfig based on the caseId and action data.
 *
 * @param caseId - The unique identifier of the case.
 * @param actionData - The action data object containing the intentName to match.
 * @example
 * ```
 * const matchedIntent = getMatchedIntent(caseId, { intentName: 'exampleIntent' });
 * ```
 * @returns The matched IntentConfig object, or an empty IntentConfig if none matched.
 */
const getMatchedIntent = (caseId, actionData) => {
    var _a, _b, _c, _d;
    const cxoneClientInstance = CXoneClient.instance;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aahConfiguration = getAgentAssistConfig === null || getAgentAssistConfig === void 0 ? void 0 : getAgentAssistConfig(caseId, true);
    const intentConfig = (_c = (_b = (_a = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _a === void 0 ? void 0 : _a.taskAssistConfig) === null || _b === void 0 ? void 0 : _b.intentConfig) !== null && _c !== void 0 ? _c : [];
    return (_d = intentConfig.find((config) => (config === null || config === void 0 ? void 0 : config.intentName) === (actionData === null || actionData === void 0 ? void 0 : actionData.intentName))) !== null && _d !== void 0 ? _d : {};
};
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
function addIsFinalSummaryGenerated(card, isFinalSummaryGenerated) {
    const clonedCard = JSON.parse(JSON.stringify(card));
    // Recursively walk through the card structure and update matching nodes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function updateIsFinalSummaryGenerated(node) {
        var _a, _b, _c, _d;
        if ((node === null || node === void 0 ? void 0 : node.horizontalAlignment) === 'Right' &&
            ((_b = (_a = node === null || node === void 0 ? void 0 : node.selectAction) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.containerId) === 'customCard' &&
            ((_d = (_c = node === null || node === void 0 ? void 0 : node.selectAction) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.name) === 'retryAutoSummary') {
            node.selectAction.data.isFinalSummaryGenerated = isFinalSummaryGenerated;
        }
        Object.values(node).forEach((value) => {
            if (Array.isArray(value)) {
                value.forEach(updateIsFinalSummaryGenerated);
            }
            else if (typeof value === 'object' && value !== null) {
                updateIsFinalSummaryGenerated(value);
            }
        });
    })(clonedCard);
    return clonedCard;
}
/**
 * Builds final submit action data by cloning `actionData` and (optionally) converting input values
 * based on `intentConfig.intentParams` slot-to-datatype mapping.
 * @param inputs - Array of adaptive card input values to be converted based on intentConfig mapping
 * @param actionData - Submit action data containing optional intentConfig for type conversion mapping
 * @returns A new object containing all properties from actionData (including intentConfig) with converted
 *          input values merged in. Inputs mapped in intentParams are type-converted; unmapped inputs pass through unchanged.
 * @example
 * ```ts
 * const finalData = buildSubmitActionFinalData(
 *   [{ id: 'age', value: '42' }],
 *   { intentConfig: { intentParams: [{ slotName: 'age', dataType: 'Input.Number' }] } }
 * );
 * // finalData.age === 42
 * // finalData.intentConfig is also present in the returned object
 * ```
 */
const buildSubmitActionFinalData = (inputs, actionData) => {
    var _a;
    const intentParams = (_a = actionData.intentConfig) === null || _a === void 0 ? void 0 : _a.intentParams;
    const finalData = Object.assign({}, actionData);
    if (Array.isArray(intentParams) && intentParams.length > 0) {
        const slotTypeMap = {};
        intentParams.forEach((param) => {
            if (param.slotName && param.dataType) {
                slotTypeMap[param.slotName] = param.dataType;
            }
        });
        inputs.forEach((input) => {
            if (!input.id)
                return;
            const rawValue = input.value;
            const dataType = slotTypeMap[input.id];
            let convertedValue = rawValue;
            switch (dataType) {
                case 'Input.Number': {
                    const parsedNumber = Number(rawValue);
                    convertedValue = Number.isNaN(parsedNumber) ? null : parsedNumber;
                    break;
                }
                case 'Input.Text':
                    convertedValue = rawValue !== undefined && rawValue !== null ? String(rawValue) : '';
                    break;
                case 'Input.Toggle':
                    convertedValue = Boolean(rawValue);
                    break;
                case 'Input.Date':
                    convertedValue = rawValue;
                    break;
                default:
                    // Unmapped inputs pass through unchanged for forward compatibility
                    // This allows custom fields and future inputs to work without schema updates
                    convertedValue = rawValue;
            }
            finalData[input.id] = convertedValue;
        });
    }
    return finalData;
};
export const CcfAgentCopilotContainerFunctions = {
    getUrlExtension,
    extractDataFromCardSchema,
    extractDataFromElements,
    handleClickActions,
    handleIconChange,
    handleContainerOpen,
    getImageDetails,
    getProcessSteps,
    getContainerById,
    insertTextInEditor,
    getContainerIdFromAction,
    executeCardAction,
    handleInsertOrSendData,
    toggleLikeDislikeButton,
    mapSelectedEmailTopics,
    updateAdaptiveCardforEmail,
    dispatchFeedbackCardActions,
    updateCopilotCard,
    extractTopicsFromAction,
    updateTopicsCardItems,
    modifyCopilotCardTopics,
    debounce,
    sendFeedbackData,
    handleLikeDislike,
    handleSelectedChip,
    debouncedDispatch,
    toggleJourneySummaryVisibility,
    shouldExpandGuidanceCard,
    checkFeedback,
    getChipVariant,
    filterGuidanceFeedbacks,
    formatTextBlocks,
    isFormCaptureEnabled,
    getAdaptiveCardsByContentType,
    toggleAutoSummaryHeaderVisibility,
    addIsFinalSummaryGenerated,
    copyTextToClipboard,
    buildSubmitActionFinalData,
};
//# sourceMappingURL=ccf-agent-copilot-helper.js.map