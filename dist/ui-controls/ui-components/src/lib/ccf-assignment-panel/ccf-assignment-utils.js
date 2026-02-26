import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CcfLogger } from '@nice-devone/agent-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { DigitalContactStatus, DigitalContactDirection, SLAIndicatorType, UIStorageKeys, MessageSendStatusType, DigitalMessageContentTypes, MediaType } from '@nice-devone/common-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CcfAssignmentAction, deFocusContact, PREVIEW_CASES } from './ccf-assignment-panel.slice';
import { CXoneDigitalClient, CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { uuid } from 'uuidv4';
import { getDispositionLocalStorageData } from '../ccf-disposition/ccf-disposition-slice';
const cxoneClient = CXoneDigitalClient.instance;
const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-assignment-utils');
/**
 * method to check whether draft outbound contacts present inside LocalStorage or not
 * @example checkForDraftContact('123');
 */
export const checkForDraftContact = (contactIdToMatch) => {
    const outboundContacts = LocalStorageHelper.getItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, true);
    const isDraftContactMatched = outboundContacts && (outboundContacts === null || outboundContacts === void 0 ? void 0 : outboundContacts.length) > 0 && outboundContacts.some((contact) => contact.caseId === contactIdToMatch && contact.status === DigitalContactStatus.DRAFT) ? true : false;
    return isDraftContactMatched;
};
export var SortingCriteria;
(function (SortingCriteria) {
    SortingCriteria["LASTUPDATED"] = "lastUpdated";
    SortingCriteria["CREATEDDATE"] = "createDate";
})(SortingCriteria || (SortingCriteria = {}));
export var TimerTitle;
(function (TimerTitle) {
    TimerTitle["AGENT_TIMER"] = "agentTimer";
    TimerTitle["CUSTOMER_TIMER"] = "customerTimer";
    TimerTitle["AGENT"] = "agentLabel";
    TimerTitle["CUSTOMER"] = "customer";
})(TimerTitle || (TimerTitle = {}));
/**
 * Enum for popover item selection action
 */
export var MessageKebabMenu;
(function (MessageKebabMenu) {
    MessageKebabMenu["DELETE_AUTHOR_NAME"] = "deleteAuthorName";
    MessageKebabMenu["DELETE_CONTENT"] = "deleteContent";
    MessageKebabMenu["REPLY"] = "reply";
    MessageKebabMenu["DELETE_ENTIRE_MESSAGE"] = "deleteEntireMessage";
    MessageKebabMenu["PREVIEW"] = "preview";
})(MessageKebabMenu || (MessageKebabMenu = {}));
/**
 * Enum for Digital contact user saved properties
 */
export var DigitalSavedProperties;
(function (DigitalSavedProperties) {
    /**
     * @remarks - Receiver BCC
     */
    DigitalSavedProperties["RECEIVER_BCC"] = "receiverBcc";
    /**
     * @remarks - Receiver CC
     */
    DigitalSavedProperties["RECEIVER_CC"] = "receiverCc";
    /**
     * @remarks - Receiver To
     */
    DigitalSavedProperties["RECEIVER_TO"] = "receiverTo";
})(DigitalSavedProperties || (DigitalSavedProperties = {}));
/**
 * Used to add message reaction
 * @param args -  messageId, reactionType, interactionId, caseId, isSelected
 * * @example
*  dispatch(
     addMessageReaction()
   );
 */
export const addMessageReaction = createAsyncThunk('inbox/addMessageReaction', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClient.digitalService.addMessageReaction(data.messageId, data.reactionType)
        .then(() => {
        thunkAPI.dispatch(CcfAssignmentAction.updateReactionDetails(data));
    }).catch(() => {
        thunkAPI.dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'reactionError' }));
    });
}));
/**
   * Used to remove reaction for message
   * @param args -  interactionId, caseId, messageId, isDeleted
   * * @example
  *  dispatch(
       removeMessageReactions()
     );
   */
/**
 * Used to remove reaction for message
 * @param args -  interactionId, caseId, messageId, isDeleted
 * * @example
*  dispatch(
     removeMessageReaction()
   );
 */
export const removeMessageReaction = createAsyncThunk('inbox/removeMessageReaction', (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    yield cxoneClient.digitalService.removeMessageReaction(data.messageId)
        .then(() => {
        thunkAPI.dispatch(CcfAssignmentAction.updateReactionDetails(data));
    }).catch(() => {
        thunkAPI.dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'reactionError' }));
    });
}));
/**
  * Thunk action creator to interact with SDK and  call hide/unhide API
  *
  * @param args -  interactionId, caseId, messageId, isHidden
  * ```
  * @example
  *  dispatch(
       messageShowHide()
     );
  * ```
  */
/**
* Thunk action creator to interact with SDK and  call hide/unhide API
*
* @param args -  interactionId, caseId, messageId, isHidden
* ```
* @example
*  dispatch(
     messageShowHide()
   );
* ```
*/
export const messageShowHide = createAsyncThunk('', (messageDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new CXoneDigitalContact().hideUnhideMessage({
            msgId: messageDetails.messageId,
            isHidden: messageDetails.isHidden,
        });
        dispatch(CcfAssignmentAction.toggleMessageHide(messageDetails));
        if (messageDetails.isHidden) {
            dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: false, messageKey: 'unhidePublicMessageSuccess' }));
        }
        else {
            dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: false, messageKey: 'hidePublicMessageSuccess' }));
        }
    }
    catch (_a) {
        if (messageDetails.isHidden) {
            dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'unHideMessageError' }));
        }
        else {
            dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'hideMessageError' }));
        }
    }
}));
/**
* Thunk action creator to interact with SDK and delete message API
*
* @param args -  interactionId, caseId, messageId, isDeleted
* ```
* @example
*  dispatch(
     deleteMessage(argument)
   );
* ```
*/
export const deleteMessage = createAsyncThunk('', (messageDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new CXoneDigitalContact().deleteMessage(messageDetails.messageId);
        dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: false, messageKey: 'messageDeleteSuccess' }));
        dispatch(CcfAssignmentAction.toggleMessageDelete(messageDetails));
    }
    catch (_b) {
        dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'deleteError' }));
    }
}));
/**
* Thunk action creator to interact with SDK and delete message content API
* @param messageDetails -  message details
* ```
* @example
*  dispatch(deleteMessageContent(messageDetails));
* ```
*/
export const deleteMessageContent = createAsyncThunk('', (messageDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cxoneClient.digitalService.deleteMessageContent(messageDetails.messageId);
        dispatch(CcfAssignmentAction.updateMessageContentORAuthorNameDelete(messageDetails));
        dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: false, messageKey: 'deleteMessageContentSuccess' }));
    }
    catch (error) {
        ccfLogger.error('deleteMessageContent', JSON.stringify(error));
        dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'deleteMessageContentFailed' }));
    }
}));
/**
* Thunk action creator to interact with SDK delete message author name API
*
* @param messageDetails -  message details
* ```
* @example
*  dispatch(deleteMessageAuthorName(messageDetails));
* ```
*/
export const deleteMessageAuthorName = createAsyncThunk('', (messageDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cxoneClient.digitalService.deleteMessageAuthorName(messageDetails.messageId);
        dispatch(CcfAssignmentAction.updateMessageContentORAuthorNameDelete(messageDetails));
        dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: false, messageKey: 'deleteMessageAuthorSuccess' }));
    }
    catch (error) {
        ccfLogger.error('deleteMessageAuthorName', JSON.stringify(error));
        dispatch(CcfAssignmentAction.updateMessageActionResponse({ isError: true, messageKey: 'deleteMessageAuthorFailed' }));
    }
}));
/**
 * method to remove focused Outbound draft contact id from LocalStorage
 * @example removeObDraft('123', 'draft');
 */
export const removeObDraft = (caseId, caseStatus) => {
    const currentFocusedContact = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) ? LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) : null;
    if (currentFocusedContact && caseId === currentFocusedContact && caseStatus === DigitalContactStatus.DRAFT) {
        LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_ID);
        LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE);
    }
};
/**
 * method to get digitalContactSavedProps from localStorage
 * @example getDigitalContactSavedPropsFromLocalStorage();
 */
export const getDigitalContactSavedPropsFromLocalStorage = () => {
    const digitalContactUserSavedPropertiesFromStorage = localStorage.getItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS);
    let parsedDigitalContactUserSavedProperties = {};
    try {
        if (digitalContactUserSavedPropertiesFromStorage)
            parsedDigitalContactUserSavedProperties = JSON.parse(digitalContactUserSavedPropertiesFromStorage);
    }
    catch (error) {
        ccfLogger.error('getDigitalContactSavedPropsFromLocalStorage', JSON.stringify(error));
        parsedDigitalContactUserSavedProperties = {};
    }
    return parsedDigitalContactUserSavedProperties;
};
/**
 * Method to get SLA Details from localStorage
 * @example -
 * ```
 * getSLADetailsFromLocalStorage();
 * ```
 */
export const getSLADetailsFromLocalStorage = () => {
    let parsedDataFromLocalStorage = {
        slaContactDetails: {},
    };
    const dataFromLocalStorage = LocalStorageHelper.getItem(UIStorageKeys.SLA_CONTACT_DETAILS, true);
    try {
        if (dataFromLocalStorage)
            parsedDataFromLocalStorage = dataFromLocalStorage;
    }
    catch (error) {
        ccfLogger.error('getSLADetailsFromLocalStorage', JSON.stringify(error));
    }
    return parsedDataFromLocalStorage;
};
/**
 * method to get ResetCRTFromLocalStorage from localStorage
 * @param caseId -  case Id
 * @example getResetCRTFromLocalStorage('2344442');
 */
export const getResetCRTFromLocalStorage = (caseId) => {
    var _a, _b;
    const parsedDataFromLocalStorage = getSLADetailsFromLocalStorage();
    const slaContactDetails = (_a = parsedDataFromLocalStorage === null || parsedDataFromLocalStorage === void 0 ? void 0 : parsedDataFromLocalStorage.slaContactDetails) !== null && _a !== void 0 ? _a : undefined;
    return slaContactDetails ? (((_b = slaContactDetails[caseId]) === null || _b === void 0 ? void 0 : _b.resetCRT) || undefined) : undefined;
};
/**
 * Calculates the SLA indicator based on the message time, current time, and timer duration.
 * @param messageTime - The time when the message was sent.
 * @param currentTime - The current time.
 * @param timerInMilliSeconds - The duration of the timer in milliseconds.
 * @example calculateSLAIndicator
 * @returns The SLA indicator type.
 */
function calculateSLAIndicator(messageTime, currentTimeInMilliSeconds, timerInMilliSeconds) {
    if ((messageTime - currentTimeInMilliSeconds) > 0) {
        if ((messageTime - currentTimeInMilliSeconds) <= timerInMilliSeconds / 2) {
            return SLAIndicatorType.WARNING;
        }
    }
    else {
        return SLAIndicatorType.CRITICAL;
    }
    return SLAIndicatorType.NORMAL;
}
/**
   * method to get sla timer details depending on message direction
   * @param slaTimerDetails - TimerDetails
   * @example getSLATimerDetails(slaTimerDetails);
   */
const getSLATimerDetails = (slaTimerDetails) => {
    const { direction, timestamp, isFollowOnResponse, skillDetails, resetCRT } = slaTimerDetails;
    const isOutbound = direction === DigitalContactDirection.OUTBOUND;
    const title = isOutbound ? TimerTitle.CUSTOMER_TIMER : TimerTitle.AGENT_TIMER;
    let timerInSeconds = null;
    if (isOutbound && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled)) {
        timerInSeconds = skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerIdleTime; //If last message outbound then setting customer response time value
    }
    else {
        timerInSeconds = isFollowOnResponse && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled) //If last message inbound then setting time as agent first_response/follow_on time
            ? skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentFollowOnResponseTime
            : skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentFirstResponseTime;
    }
    let messageTime = Date.parse(timestamp.toString());
    // We allowed Reset customer response timer (resetCRT) if customer response is enabled only for "customer timer" and if it's greater than last message timestamp then replace reset customer response timestamp with messageTime
    if (isOutbound && (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled) && resetCRT && resetCRT > messageTime) {
        messageTime = resetCRT;
    }
    const timerInMilliSeconds = timerInSeconds * 1000;
    messageTime += timerInMilliSeconds;
    let slaIndicator = SLAIndicatorType.NORMAL;
    const currentTimeInMilliSeconds = Date.now();
    if (isOutbound) {
        slaIndicator = ((skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled)
            ? // If customer response is enabled, calculate SLA indicator, else retain the current slaIndicator value
                calculateSLAIndicator(messageTime, currentTimeInMilliSeconds, timerInMilliSeconds)
            : slaIndicator);
    }
    else {
        slaIndicator = ((skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled)
            ? // If agent response is enabled, calculate SLA indicator, else retain the current slaIndicator value
                calculateSLAIndicator(messageTime, currentTimeInMilliSeconds, timerInMilliSeconds)
            : slaIndicator);
    }
    return {
        title,
        messageTime,
        slaIndicator,
    };
};
/**
   * method that determines the title and time left for the particular timer
   * @param messages - CXoneMessage[]
   * @param caseAssignedAt - Date
   * @param skillDetails - CXoneRoutingQueue
   * @example calculateSLATime(messages,caseAssignedAt,skillDetails);
   */
export const calculateSLATime = (messages, caseAssignedAt, skillDetails, resetCRT) => {
    var _a;
    if (messages === null || messages === void 0 ? void 0 : messages.length) {
        const messagesAfterAssignment = [];
        const messagesBeforeAssignment = [];
        const messagesArray = [...messages];
        let inboundMessages = 0, outboundMessages = 0;
        messagesArray.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }); // sorting messages based on createdAt property with message arrived most recently as first element
        messagesArray.forEach((message) => {
            if (new Date(message.createdAt) > caseAssignedAt) {
                if (message.direction === DigitalContactDirection.INBOUND) {
                    inboundMessages++;
                }
                else {
                    outboundMessages++;
                }
                messagesAfterAssignment.push(message);
            }
            else {
                messagesBeforeAssignment.push(message);
            }
        });
        const isFollowOnResponse = inboundMessages > 0 && outboundMessages > 0; //check if it's agent first response or follow_on response
        const messageDirectionForLastMessage = (_a = messagesBeforeAssignment[0]) === null || _a === void 0 ? void 0 : _a.direction;
        if ((messagesAfterAssignment === null || messagesAfterAssignment === void 0 ? void 0 : messagesAfterAssignment.length) > 0) {
            if ((messagesAfterAssignment === null || messagesAfterAssignment === void 0 ? void 0 : messagesAfterAssignment.length) === 1) {
                const [message] = messagesAfterAssignment;
                return message.direction !== messageDirectionForLastMessage //if first message direction after case assignment is different than last message direction then set timer acc to message sent after assignment direction
                    ? getSLATimerDetails({
                        direction: message.direction,
                        timestamp: message.createdAt,
                        isFollowOnResponse,
                        skillDetails,
                        resetCRT,
                    })
                    : getSLATimerDetails({
                        //if first message after assignment has direction same as last message before assignment then set timer acc to case assigned time
                        direction: messagesBeforeAssignment[0].direction,
                        timestamp: caseAssignedAt,
                        isFollowOnResponse,
                        skillDetails,
                        resetCRT,
                    });
            }
            else {
                for (let index = 0; index < messagesAfterAssignment.length - 1; index++) {
                    const currentMessage = messagesAfterAssignment[index];
                    const nextMessage = messagesAfterAssignment[index + 1];
                    const areConsecutiveMessagesOutbound = currentMessage.direction === DigitalContactDirection.OUTBOUND && nextMessage.direction === DigitalContactDirection.OUTBOUND;
                    const areConsecutiveMessagesInbound = currentMessage.direction === DigitalContactDirection.INBOUND && nextMessage.direction === DigitalContactDirection.INBOUND;
                    const isNextMessageLast = index + 1 === messagesAfterAssignment.length - 1;
                    if ((areConsecutiveMessagesOutbound || areConsecutiveMessagesInbound) &&
                        !isNextMessageLast) {
                        // if two consecutive messages are of same direction and second message is not the last in the array then continue
                        continue;
                    }
                    else if (
                    // if two consecutive messages are of same direction and second message is the last in the array then set timer acc to the last message createdAt time and direction
                    (areConsecutiveMessagesOutbound || areConsecutiveMessagesInbound) &&
                        isNextMessageLast) {
                        return getSLATimerDetails({
                            direction: nextMessage.direction,
                            timestamp: nextMessage.createdAt,
                            isFollowOnResponse,
                            skillDetails,
                            resetCRT,
                        });
                    }
                    else if ((currentMessage.direction === DigitalContactDirection.OUTBOUND && nextMessage.direction === DigitalContactDirection.INBOUND) ||
                        (currentMessage.direction === DigitalContactDirection.INBOUND && nextMessage.direction === DigitalContactDirection.OUTBOUND)) {
                        // if two consecutive messages are of different direction then set timer acc to latest message createdAt time and direction
                        return getSLATimerDetails({
                            direction: currentMessage.direction,
                            timestamp: currentMessage.createdAt,
                            isFollowOnResponse,
                            skillDetails,
                            resetCRT,
                        });
                    }
                }
            }
        }
        else { // if no conversion happened after case assigment then set timer acc to case assigned time and last message direction
            return getSLATimerDetails({
                direction: messagesBeforeAssignment[0].direction,
                timestamp: caseAssignedAt,
                isFollowOnResponse,
                skillDetails,
                resetCRT,
            });
        }
    }
    return;
};
/**
   * Used to changes the case status to resolve of the contact details object provided and then unassign them
   * @param contactDetails - contact detail object
   * @param handleToast - callback to show toast on success or error of status change and unassign
   * @example resolveAndUnassignContacts(['123234']);
   */
export const resolveAndUnassignContacts = (contactDetails, handleToast) => {
    contactDetails.forEach((contactDetail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield contactDetail.changeStatus(DigitalContactStatus.RESOLVED);
            handleToast(false, 'caseStatusChanged', DigitalContactStatus.RESOLVED);
            try { // once the case status is changed to resolved successfully then only we will unassign
                yield contactDetail.unassign();
                handleToast(false, 'caseUnassigned', contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.caseId);
            }
            catch (_a) {
                handleToast(false, 'unableToUnassignCase', contactDetail === null || contactDetail === void 0 ? void 0 : contactDetail.caseId);
            }
        }
        catch (_b) {
            handleToast(true, 'unableToChangeCaseStatus', DigitalContactStatus.RESOLVED);
        }
    }));
};
/**
 * Method to invoke de focus event of previous active contact
 * @param dispatch- Dispatch object to be passed for further actions
 * @example removePreviousContactFocus(dispatch);
 */
export const removePreviousContactFocus = (dispatch, removeLS = true, isAssignedSelected = false) => {
    var _a, _b, _c;
    const contactIdToDefocus = (_a = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID)) !== null && _a !== void 0 ? _a : null;
    const mediaTypeToDefocus = (_b = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE)) !== null && _b !== void 0 ? _b : null;
    const previewCases = (_c = LocalStorageHelper.getItem(UIStorageKeys.PREVIEW_CASES)) !== null && _c !== void 0 ? _c : null;
    const isPreviewContact = previewCases && (previewCases === null || previewCases === void 0 ? void 0 : previewCases.length) > 0 && previewCases.includes(contactIdToDefocus);
    // If contactIdToDefocus is present and it is not a draft contact or if it is not a preview contact then dispatch deFocusContact action
    // If removeLS is true then remove focused contact id and media type from local storage
    if (contactIdToDefocus) {
        const isDraftContactFound = checkForDraftContact(contactIdToDefocus);
        if (!isDraftContactFound && mediaTypeToDefocus === MediaType.DIGITAL && !isPreviewContact && isAssignedSelected) {
            dispatch(deFocusContact(contactIdToDefocus));
        }
        if (removeLS) {
            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_ID);
            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE);
        }
    }
};
/**
 * Method to set the custom event data in localstorage for custom Event
 * @example - setAgentWorkflowResponseDetails(eventData, currentContact)
 */
export const setAgentWorkflowResponseDetails = (eventData, currentContact) => {
    const isDataAvailable = eventData === null || eventData === void 0 ? void 0 : eventData.find((item) => {
        return (item === null || item === void 0 ? void 0 : item.contactId) === (currentContact === null || currentContact === void 0 ? void 0 : currentContact.contactId) || (item === null || item === void 0 ? void 0 : item.contactId) === (currentContact === null || currentContact === void 0 ? void 0 : currentContact.caseId);
    });
    return isDataAvailable;
};
/**
 * Method to set the DigitalUserSavedProperties from local storage to state
 * @param digitalContactUserSavedProperties - saved contact user properties from state
 * @param dispatch - dispatch function to update the state
 * @example - saveContactUserSavedPropertiesFromLS(digitalContactUserSavedProperties, dispatch)
 */
export const saveContactUserSavedPropertiesFromLS = (digitalContactUserSavedProperties, dispatch) => {
    var _a, _b;
    const digitalContactUserSavedPropertiesFromStorage = localStorage.getItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS);
    let parsedDigitalContactUserSavedProperties = {};
    try {
        if (digitalContactUserSavedPropertiesFromStorage)
            parsedDigitalContactUserSavedProperties = JSON.parse(digitalContactUserSavedPropertiesFromStorage);
    }
    catch (_e) {
        parsedDigitalContactUserSavedProperties = {};
    }
    // Dev Note: To fix blank editor on draft screen added condition to check if state is not empty 
    // and if it is not empty then only update the data from state or else get data from local storage
    if (((_a = Object.keys(digitalContactUserSavedProperties)) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
        digitalContactUserSavedPropertiesFromStorage !==
            JSON.stringify(digitalContactUserSavedProperties)) {
        dispatch(CcfAssignmentAction.replaceDigitalUserSavedPropertiesOfACase(digitalContactUserSavedProperties));
    }
    else if (((_b = Object.keys(parsedDigitalContactUserSavedProperties)) === null || _b === void 0 ? void 0 : _b.length) > 0 &&
        digitalContactUserSavedPropertiesFromStorage !==
            JSON.stringify(digitalContactUserSavedProperties)) {
        dispatch(CcfAssignmentAction.replaceDigitalUserSavedPropertiesOfACase(parsedDigitalContactUserSavedProperties));
    }
};
/**
 * Method to remove and update contact SLA details from localStorage
 * @param caseId -  case Id
 * @example -
 * ```
 * updateSLADetailsInLocalStorage('2344442');
 * ```
 */
export const updateSLADetailsInLocalStorage = (caseId) => {
    const slaDetailsFromLocalStorage = getSLADetailsFromLocalStorage();
    slaDetailsFromLocalStorage === null || slaDetailsFromLocalStorage === void 0 ? true : delete slaDetailsFromLocalStorage.slaContactDetails[caseId];
    LocalStorageHelper.setItem(UIStorageKeys.SLA_CONTACT_DETAILS, slaDetailsFromLocalStorage);
};
/**
 * Method to clear contact details from localStorage
 * @param caseId -  case Id
 * @example -
 * ```
 * clearContactDetailsFromLocalStorage('2344442');
 * ```
 */
export const clearContactDetailsFromLocalStorage = (caseId) => {
    updateSLADetailsInLocalStorage(caseId);
};
/**
 * Function to get draft message from active contact and reply object data
 * @param activeContact -The active contact.
 * @param sendReplyObj -The reply object.
 * @param xTraceId -The xTraceId.
 * @example getDraftMessage()
 */
export const getDraftMessage = (activeContact, sendReplyObj, xTraceId) => {
    var _a, _b, _c, _d;
    if (!activeContact)
        return;
    const activeAttachments = sendReplyObj.attachments;
    const attachments = activeAttachments === null || activeAttachments === void 0 ? void 0 : activeAttachments.map((attachment) => {
        return {
            id: '',
            fileName: attachment.friendlyName || null,
            friendlyName: attachment.friendlyName || '',
            previewUrl: attachment.url || null,
            securedPermanentUrl: attachment.url || '',
            blobUrl: attachment.url || null,
            canBeStored: false,
            isInline: false,
            url: attachment.url || '',
        };
    });
    const messageContent = Object.assign({ 
        // if the message type is not TEXT then message content text is empty.
        text: (IsExternalPlatformTemplateMessageContent(sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.messageContent) || ((_a = sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.messageContent) === null || _a === void 0 ? void 0 : _a.type) !== DigitalMessageContentTypes.TEXT)
            ? ''
            : ((_c = (_b = sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.messageContent) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.text) || '' }, sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.messageContent);
    const newDraftMessage = {
        id: uuid(),
        idOnExternalPlatform: ((_d = sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.thread) === null || _d === void 0 ? void 0 : _d.idOnExternalPlatform) || '',
        postId: '',
        threadId: '',
        threadIdOnExternalPlatform: '',
        messageContent: messageContent,
        createdAt: new Date().toString(),
        authorUser: activeContact.inboxAssignee,
        isRead: true,
        attachments: attachments || [],
        tags: [],
        isDeletedOnExternalPlatform: false,
        isHiddenOnExternalPlatform: false,
        reactionStatistics: null,
        replyToMessage: null,
        readAt: '',
        title: '',
        recipients: [],
        url: '',
        replyChannel: null,
        channel: {
            id: '',
        },
        contactNumber: '',
        isReplyAllowed: true,
        deviceFingerprint: null,
        forward: {
            message: null,
        },
        hasAdditionalMessageContent: false,
        messageNotes: [],
        isRelatedMessage: false,
        _changes: [],
        channelName: '',
        channelType: '',
        direction: 'outbound',
        authorEndUserIdentity: '',
        sentStatus: MessageSendStatusType.DELAYED,
        xTraceId: xTraceId,
        contentRemoved: null,
        authorNameRemoved: null,
        delivered: [],
        customerStatistics: null,
        isReplyToSpecificMessage: false,
    };
    const currentUser = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    const previewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true);
    const isCurrentCaseInPreviewMode = previewCases && previewCases.length > 0 && previewCases.includes(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) ? true : false;
    if (currentUser && (!activeContact.inboxAssignee || isCurrentCaseInPreviewMode)) {
        const user = {
            id: currentUser.userId,
            emailAddress: '',
            firstName: currentUser.firstName,
            surname: currentUser.lastName,
        };
        newDraftMessage.authorUser = user;
    }
    return newDraftMessage;
};
/**
 * Function to check the type of message content
 * @param content - message content
 * @returns boolean value
 * @example isExternalPlatformTemplateMessageContent(messageContent)
 */
export const IsExternalPlatformTemplateMessageContent = (content) => {
    var _a;
    // Adjust the condition based on what differentiates ExternalPlatformTemplateMessageContent
    return content && ((_a = content.payload) === null || _a === void 0 ? void 0 : _a.elements) !== undefined;
};
/**
 * Method to check whether the user can delete the message content or not
 * @example -
 * ```
 * canDeleteMessageContent(true);
 * ```
 */
export const canDeleteMessageContent = (isContentRemoved) => {
    const canEraseMessageContentAndUserNames = LocalStorageHelper.getItem(StorageKeys.ABLE_TO_ERASE_CONTENT_AUTHOR, true);
    // if canEraseMessageContentAndUserNames flag is true and message content is not removed then return true
    return Boolean(canEraseMessageContentAndUserNames && !isContentRemoved);
};
/**
 * Method to check whether the user can delete the message author's name or not
 * @example -
 * ```
 * canDeleteMessageAuthorName(true, 'inbound');
 * ```
 */
export const canDeleteMessageAuthorName = (isAuthorNameRemoved, messageDirection) => {
    const canEraseMessageContentAndUserNames = LocalStorageHelper.getItem(StorageKeys.ABLE_TO_ERASE_CONTENT_AUTHOR, true);
    // if canEraseMessageContentAndUserNames flag is true and message direction is inbound and message author name is not removed then return true
    return Boolean(messageDirection === DigitalContactDirection.INBOUND && !isAuthorNameRemoved && canEraseMessageContentAndUserNames);
};
/**
 * Method to get selected disposition
 * @param contactId -  contact Id
 * @param dispositions -  disposition of selected contact
 * @example -
 * ```
 * getSelectedDigitalDisposition(12345, dispositions)
 * ```
 */
export const getSelectedDigitalDisposition = (contactId, dispositions) => {
    var _a;
    let selectedDisposition = {};
    const parsedDataFromLocalStorage = getDispositionLocalStorageData();
    if (contactId) {
        const currentSelectedDispositionId = parsedDataFromLocalStorage.dispositionContacts[contactId];
        const updatedActivityConfig = JSON.parse(JSON.stringify(dispositions));
        const currentSelectedDispositionData = Object.keys(updatedActivityConfig).length !== 0 && ((_a = updatedActivityConfig[contactId]) === null || _a === void 0 ? void 0 : _a.dispositionData);
        if (currentSelectedDispositionData && currentSelectedDispositionData.length > 0) {
            // Get selected disposition from the current selected disposition data list
            selectedDisposition = currentSelectedDispositionData.find((dispositionData) => (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositionId) === (currentSelectedDispositionId === null || currentSelectedDispositionId === void 0 ? void 0 : currentSelectedDispositionId.dispositionId));
        }
    }
    return selectedDisposition;
};
/**
 * Method to get FileName for Audio Attachment
 * @example - getFileNameForAudioAttachment
 * ```
 * getFileNameForAudioAttachment()
 * ```
 */
export const getFileNameForAudioAttachment = () => {
    const date = new Date();
    const localString = date.toLocaleString().replace(/[,]/g, ' -'); // e.g., "2023-10-05T14:48:00.000Z"
    const filename = `audio-${localString}.mp3`;
    return filename;
};
/**
 * Method to get channel name for narration
 * @param isOutbound -  to check channel is IB or OB
 * @param channelName -  channel name
 * @example - getChannelNameForNarration(true, Chat)
 */
export const getChannelNameForNarration = (isOutbound, channelName) => {
    return isOutbound ? (channelName === null || channelName === void 0 ? void 0 : channelName.toUpperCase()) + '_OB' : (channelName === null || channelName === void 0 ? void 0 : channelName.toUpperCase()) + '_IB';
    ;
};
/**
   * Method to update selected digital contact user saved properties in redux store
   * @param dispatch -  dispatch function to update the state
   * @param selectedProp -  selected digital contact user saved properties
   * @param caseId -  case Id
   * @param value -  value to be updated
   * @example
   * ```
   * updateSelectedDigitalSavedProperties(dispatch, selectedProp, caseId, value);
   * ```
   */
export const updateSelectedDigitalSavedProperties = (dispatch, selectedProp, caseId, value) => {
    dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
        caseId,
        fieldsToUpdate: {
            [selectedProp]: value || '',
        },
    }));
};
//# sourceMappingURL=ccf-assignment-utils.js.map