import { __awaiter } from "tslib";
import { createSlice, createSelector, createAsyncThunk, current, } from '@reduxjs/toolkit';
import { globalActions } from '../global.app.slice';
import { VoiceContactStatus, MediaType, CXoneFileUploadRequest, AgentLegStatus, PermissionKeys, PermissionValues, ReactionType, SLAIndicatorType, WorkItemContactStatus, DigitalContactStatus, CXoneDigitalEventType, InteractionType, ElevatedFrom, MessageSendStatusType, } from '@nice-devone/common-sdk';
import { CXoneClient, CallType, } from '@nice-devone/agent-sdk';
import { toBase64 } from '../../util/fileUtils';
import { Logger, StorageKeys, LocalStorageHelper, NotificationSettings, CallContactEventStatus, getANI, } from '@nice-devone/core-sdk';
import { holdVoiceContact } from '../ccf-voice-contact/ccf-voice-contact-methods';
import { CXoneVoiceClientWrapper } from '../../services/cxone-voice-client-wrapper';
import { getParentChildMessageTree, getParentChildMap, getNewCommentPath, addNewMessageIntoMap } from '../ccf-digital/ccf-contact-public-post-container/ccf-contact-public-post-helper';
import { isFeatureEnabled } from '@nice-devone/ui-controls';
import { SortingCriteria, clearContactDetailsFromLocalStorage, MessageKebabMenu } from './ccf-assignment-utils';
import { ACDVoiceShowControlsStatus } from '../../enums/call-contact-active-status';
import { CXoneDigitalClient, CXoneDigitalContact, SortOrder } from '@nice-devone/digital-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { Navigation } from '../../enums/navigation-menus';
import { createForwardedEmailInHtml, getMessageAuthor } from '../../util/common';
import { dispositionInteractionActions } from '../ccf-disposition/ccf-disposition-slice';
import { stringCompareIgnoreCase } from '../../util/stringUtils';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { CcfRejectedReasonAction } from '../ccf-digital/ccf-approval-banner/ccf-rejected-reason/ccf-rejected-reason.slice';
export const ASSIGNMENT_KEY = 'inbox';
const SWITCH_AGENT_USER = 'switchAgentUser';
const AGENT_DETAILS_BY_AGENT_ID = 'agentDetailsByAgentId';
const ACCEPT_INCOMING_CONTACT = 'inbox/acceptIncomingContact';
const ACCEPT_INCOMING_DIGITAL_CONTACT = 'inbox/acceptIncomingDigitalContact';
const ACTIVATE_CONTACT = 'inbox/activateIncomingContact';
const REJECT_INCOMING_DIGITAL_CONTACT = 'inbox/rejectIncomingDigitalContact';
const REJECT_INCOMING_CONTACT = 'inbox/rejectIncomingContact';
const CALL_PLACED_PC_CONTACT = 'inbox/callPlacedPcContact';
const RESCHEDULE_PC_CONTACT = 'inbox/reschedulePcContact';
const SNOOZE_PC_CONTACT = 'inbox/snoozePcContact';
const OUTCOME_SELECTION = 'inbox/outcomeSelection';
export const PREVIEW_CASES = 'previewCases'; // localStorage key by which we will store the preview cases list so that we can load the preview cases on page reload
const cxoneAcdClient = CXoneAcdClient.instance;
const cxoneDigitalClient = CXoneDigitalClient.instance;
const logger = new Logger();
export const initialCallConferenceState = {
    status: CallType.CONSULT,
    text: 'Consult',
    usersInConference: [],
    tileDirection: false,
};
;
;
;
export const initialAssignmentState = {
    cxoneInteractions: {},
    assignmentPanelMetadata: {
        selectedInteractionId: '',
        voiceInteractionId: '',
        voiceMailInteractionId: '',
        incommingAcdInteractionId: '',
        incommingDfoInteractionId: '',
    },
    contactsActiveCollapse: [],
    selectedContactId: null,
    cxoneVoiceContactDetails: {},
    allCxoneVoiceContactDetails: {},
    cxoneVoiceMailContactEventDetails: {},
    cxoneVoiceMailContactDetails: {},
    cxoneDigitalContactDetails: {},
    isNewMessageAdded: '',
    cxoneWorkItemContactEventDetails: {},
    cxoneWorkItemContactDetails: {},
    cxoneWorkItemContacts: [],
    cxoneDigitalContactUserSavedProperties: {},
    agentLegStatus: null,
    agentLegId: '',
    isKeyPadOpen: false,
    callConferenceDetails: initialCallConferenceState,
    consultedAgents: [],
    isAgentLegAutoAcceptEnabled: false,
    ctdDisplayError: false,
    isEmailDraftSent: false,
    cxonePersonalQueue: [],
    newIncomingContact: null,
    networkSpeed: 0,
    isColdTransfer: false,
    messageActionResponse: {},
    digitalMessageTags: [],
    digitalMessageTagsCount: 0,
    digitalMessageTagsCurrentPage: 1,
    digitalMessageTagsByName: [],
    digitalMessageTagError: false,
    digitalTagLoading: false,
    newDigitalTagAddedDetails: {},
    digitalTagPopOverPosition: {},
    isDigitalTagsExpanded: false,
    updatedNoteValue: '',
    interactionFailedMessages: {},
    inboundCallingAgentInfo: {},
    activeThreadId: undefined,
    activeContactId: undefined,
    translatedMessages: {},
    translationSettings: {},
    draftMessageNotes: {},
    isInteractionNavigationKeyPressed: false,
    isInteractionAcceptKeyPressed: false,
    isInteractionRejectKeyPressed: false,
    interactionDraftMessages: {},
    cxoneVoiceBioHubData: {},
    isModalOpen: false,
    isExternalDirectoryTransfer: false,
    setContactHistoryInIndexDb: true,
};
/**
 * agentDetailsByAgentId asyncthunk used to get Agent Details by using agentId from sdk.
 * @example - `dispatch(agentDetailsByAgentId({agentId:123456}))`
 */
export const agentDetailsByAgentId = createAsyncThunk(AGENT_DETAILS_BY_AGENT_ID, (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield CXoneAcdClient.instance.agentDetailService
        .getAgentInfoByAgentId(data.agentId)
        .then((resp) => {
        thunkAPI.dispatch(CcfAssignmentAction.addConsultedAgentsDetails(resp));
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][agentDetailsByAgentId]', `payload: ${JSON.stringify(error)}`);
    });
}));
/**
 * function to update conversation messages for delete content or author name
 *
 * @param conversations - array of conversations
 * @param messageId - id of the message to be updated
 * @param isContentOrAuthorName - enum to check if content or author name is to be deleted
 * @param removedDetails - object containing reason and removedAt details
 * ```
 * @example
 *  updateConversationMessages(conversations, messageId, isContentOrAuthorName, removedDetails);
 * ```
 */
function updateConversationMessages(conversations, messageId, isContentOrAuthorName, removedDetails) {
    if (!conversations)
        return [];
    return conversations.map((conversation) => (Object.assign(Object.assign({}, conversation), { messages: conversation.messages.map((message) => {
            return (message === null || message === void 0 ? void 0 : message.id) === messageId ? Object.assign(Object.assign({}, message), { authorNameRemoved: isContentOrAuthorName === MessageKebabMenu.DELETE_AUTHOR_NAME
                    ? removedDetails
                    : message.authorNameRemoved, contentRemoved: isContentOrAuthorName === MessageKebabMenu.DELETE_CONTENT
                    ? removedDetails
                    : message.contentRemoved }) : message;
        }) })));
}
/**
 * Thunk action creator to fetch customer details by id
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getCustomerDetailsByIdForContactCard(customerID, props.contact)
    );
 * ```
 */
export const getCustomerDetailsByIdForContactCard = createAsyncThunk('', (args, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, contactId, interactionId } = args;
    try {
        const response = yield CXoneClient.instance.cxoneCustomerCard.getCustomerDetailsById(customerId);
        if (response === null || response === void 0 ? void 0 : response.fullName) {
            dispatch(CcfAssignmentAction.updateCxoneVoiceContactCustomerName({ interactionId, contactId: contactId, customerName: response.fullName }));
        }
    }
    catch (error) {
        logger.debug('[getCustomerDetailsById]', `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * function to return interaction type when voice or digital case is removed.
 * @param state - digital state
 * @param digit - payload
 * @returns - State
 * @example
 * ```
 * let interactionType = getInteractionType(state, interactionId)
 * ```
 */
const getInteractionType = (state, interactionId) => {
    let interactionType = InteractionType.ELEVATED;
    if (interactionId && state.cxoneInteractions[interactionId] && Object.keys(state.cxoneInteractions[interactionId]).length && state.cxoneInteractions[interactionId].interactionType === InteractionType.ELEVATED) {
        if (state.cxoneInteractions[interactionId].digitalContacts && Object.keys(state.cxoneInteractions[interactionId].digitalContacts).length === 1) {
            if (state.cxoneInteractions[interactionId].acdContacts && Object.keys(state.cxoneInteractions[interactionId].acdContacts).length === 0) {
                interactionType = InteractionType.DIGITAL;
            }
        }
        else if (state.cxoneInteractions[interactionId].digitalContacts && Object.keys(state.cxoneInteractions[interactionId].digitalContacts).length === 0) {
            if (state.cxoneInteractions[interactionId].acdContacts && Object.keys(state.cxoneInteractions[interactionId].acdContacts).length) {
                interactionType = InteractionType.VOICE;
            }
        }
    }
    return interactionType;
};
/**
 * Checks for case number in the state and if found will update the same state.
 * If not found then append for new case number
 * It also retains the isActive property while updating the state for a particular case
 * @param state - digital state
 * @param digit - payload
 * @returns - State
 * @example
 * ```
 * let newState = CXoneDigitalIdMap(state, digitalContact)
 * ```
 */
const CXoneDigitalIdMap = (state, eventData) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    let contactselection = false;
    let digitalState = {};
    digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
    if (!(Object.keys(digitalState).length && digitalState[eventData.interactionId])) {
        digitalState[eventData.interactionId] = {};
    }
    // create map for parent child message array positions for public channel
    const parentChildMapIterator = (_a = getParentChildMap(eventData.messages)) === null || _a === void 0 ? void 0 : _a.entries();
    if (parentChildMapIterator && eventData) {
        for (const item of parentChildMapIterator) {
            // in flat map item[0] will be parent and item[1] will be all its children
            if (item && eventData.publicMessagesParentChildMap)
                eventData.publicMessagesParentChildMap[item[0]] = item[1];
        }
    }
    // create parent child hierachy from messages for public channel
    eventData.publicMessagesTree = getParentChildMessageTree(eventData.messages);
    const currentContact = digitalState[eventData.interactionId][eventData.caseId];
    if (currentContact === null || currentContact === void 0 ? void 0 : currentContact.previousCaseId) {
        eventData.previousCaseId = currentContact === null || currentContact === void 0 ? void 0 : currentContact.previousCaseId;
    }
    if (currentContact === null || currentContact === void 0 ? void 0 : currentContact.previousConversationMessages) {
        eventData.previousConversationMessages = currentContact === null || currentContact === void 0 ? void 0 : currentContact.previousConversationMessages;
    }
    if (currentContact === null || currentContact === void 0 ? void 0 : currentContact.nextCaseId) {
        eventData.nextCaseId = currentContact === null || currentContact === void 0 ? void 0 : currentContact.nextCaseId;
    }
    if (currentContact === null || currentContact === void 0 ? void 0 : currentContact.nextConversationMessages) {
        eventData.nextConversationMessages = currentContact === null || currentContact === void 0 ? void 0 : currentContact.nextConversationMessages;
    }
    const detailedContact = (_c = (_b = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails) === null || _b === void 0 ? void 0 : _b[eventData.interactionId]) === null || _c === void 0 ? void 0 : _c[eventData.caseId];
    digitalState[eventData.interactionId][eventData.caseId] = eventData;
    setCoBrowseData(digitalState[eventData.interactionId][eventData.caseId]);
    // check to remove incoming digital cases present in redux using caseId temporarily for interaction id
    if (state.cxoneInteractions[eventData.caseId] && Object.keys(state.cxoneInteractions[eventData.caseId]).length) {
        delete state.cxoneInteractions[eventData.caseId];
        contactselection = true;
        logger.info('AW-25-CXoneDigitalIdMap', `Removing temporary incoming digital case from redux - caseId: ${eventData.caseId}`);
    }
    if ((_d = state.cxoneInteractions[eventData.interactionId]) === null || _d === void 0 ? void 0 : _d.digitalContacts[eventData.caseId]) {
        // if case already exist in inbox and not read /selected
        const digitalContact = Object.assign({}, (_e = state.cxoneInteractions[eventData.interactionId]) === null || _e === void 0 ? void 0 : _e.digitalContacts[eventData.caseId]);
        // If the case is assigned to the inbox, then the badge notification will not be reset while the agent is switching the case.
        if (!(digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.isAssignedToAgentInbox)) {
            digitalContact.showBadge = eventData.status.toLowerCase() !== 'resolved' && eventData.hasUnreadMessage && !(state.assignmentPanelMetadata.selectedInteractionId === eventData.interactionId && state.cxoneInteractions[eventData.interactionId].selectedContactId === eventData.caseId);
            digitalContact.hasUnreadMessage = eventData.status.toLowerCase() !== 'resolved' && eventData.hasUnreadMessage && state.cxoneInteractions[eventData.interactionId].selectedContactId !== eventData.caseId;
        }
        digitalContact.contactStatus = eventData.status.toLowerCase();
        digitalContact.contactReceivedTime = typeof eventData.startTime !== 'string' ? eventData.startTime.toISOString() : eventData.startTime;
        digitalContact.interactionId = eventData.interactionId;
        digitalContact.customerName = eventData.customerName;
        if (eventData === null || eventData === void 0 ? void 0 : eventData.contactID) {
            digitalContact.contactId = eventData.contactID; // To handle the accept-reject flow
            digitalContact.threadId = (_f = eventData.case) === null || _f === void 0 ? void 0 : _f.threadId;
        }
        digitalContact.isAssignedToAgentInbox = eventData === null || eventData === void 0 ? void 0 : eventData.isAssignedToAgentInbox;
        if (digitalContact)
            state.cxoneInteractions[eventData.interactionId].digitalContacts[eventData.caseId] = digitalContact; // update the existing case with new data
        logger.info('AW-25-CXoneDigitalIdMap', `Updating existing digital case in redux - interactionId: ${eventData.interactionId}, caseId: ${eventData.caseId}`);
    }
    else {
        const attachmentData = eventData.attachments;
        const incomingContact = {
            contactId: eventData.contactID && eventData.contactID,
            caseId: eventData.caseId,
            media: MediaType.DIGITAL,
            isOutbound: ((_g = eventData.case) === null || _g === void 0 ? void 0 : _g.direction) === 'outbound' ? true : false,
        };
        const digitalContact = {
            contactId: eventData.contactID && eventData.contactID,
            caseId: eventData.caseId,
            media: MediaType.DIGITAL,
            isOutbound: ((_h = eventData.case) === null || _h === void 0 ? void 0 : _h.direction) === 'outbound' ? true : false,
            isSelected: false,
            contactMode: '',
            contactStatus: (_j = eventData.status) === null || _j === void 0 ? void 0 : _j.toLowerCase(),
            skillOrQueueName: eventData.skill,
            customerName: eventData.customerName,
            channelName: ((_k = eventData.channelType) === null || _k === void 0 ? void 0 : _k.charAt(0).toUpperCase()) + ((_l = eventData.channelType) === null || _l === void 0 ? void 0 : _l.slice(1)),
            contactReceivedTime: typeof eventData.startTime !== 'string'
                ? (_m = eventData.startTime) === null || _m === void 0 ? void 0 : _m.toISOString()
                : eventData.startTime,
            refusalTimeOut: eventData.refusalTimeOut && eventData.refusalTimeOut,
            interactionId: eventData.interactionId,
            showBadge: ((_o = eventData.status) === null || _o === void 0 ? void 0 : _o.toLowerCase()) === 'incoming' ||
                ((_p = eventData.case) === null || _p === void 0 ? void 0 : _p.direction) === 'outbound' ||
                !eventData.hasUnreadMessage
                ? false
                : true,
            expandedViewDetails: false,
            attachments: attachmentData && ((_q = attachmentData.attachments) === null || _q === void 0 ? void 0 : _q.length) > 0
                ? attachmentData.attachments
                : undefined,
            isContactAccepted: false,
            hasUnreadMessage: ((_r = eventData.case) === null || _r === void 0 ? void 0 : _r.direction) === 'outbound' ? false : eventData.hasUnreadMessage,
            customerMessageUpdatedAt: ((_s = eventData.case) === null || _s === void 0 ? void 0 : _s.direction) === 'outbound' && eventData.customerMessageUpdatedAt === undefined ? new Date(eventData.startTime) : eventData.customerMessageUpdatedAt,
            createdAt: (_t = eventData.case) === null || _t === void 0 ? void 0 : _t.createdAt,
            slaIndicator: SLAIndicatorType.NORMAL,
            isPrivate: (_u = eventData.channel) === null || _u === void 0 ? void 0 : _u.isPrivate,
            threadId: (_v = eventData.case) === null || _v === void 0 ? void 0 : _v.threadId,
            isAssignedToAgentInbox: eventData === null || eventData === void 0 ? void 0 : eventData.isAssignedToAgentInbox,
            elevatedFrom: eventData.fromProvider,
            wysiwygEnabled: eventData.channel.wysiwygEnabled,
            realExternalPlatformId: eventData.channel.realExternalPlatformId,
            receivedInInboxTime: new Date().toISOString(),
        };
        if (eventData.interactionId === state.assignmentPanelMetadata.incommingDfoInteractionId) {
            state.assignmentPanelMetadata.incommingDfoInteractionId = '';
            logger.info('AW-25-CXoneDigitalIdMap', 'updating incommingDfoInteractionId to empty string');
        }
        if (state.cxoneInteractions[eventData.interactionId] && Object.keys(state.cxoneInteractions[eventData.interactionId]).length) {
            const interaction = Object.assign({}, state.cxoneInteractions[eventData.interactionId]);
            interaction.digitalContacts[eventData.caseId] = digitalContact;
            const isElevated = (Object.keys((_w = interaction === null || interaction === void 0 ? void 0 : interaction.digitalContacts) !== null && _w !== void 0 ? _w : {}).length + Object.keys((_x = interaction === null || interaction === void 0 ? void 0 : interaction.acdContacts) !== null && _x !== void 0 ? _x : {}).length) > 1;
            interaction.interactionType = isElevated ? InteractionType.ELEVATED : InteractionType.DIGITAL;
            interaction.slaIndicator = isElevated ? SLAIndicatorType.NORMAL : interaction.slaIndicator;
            interaction.interactionUpdatedTime = ((_y = eventData.case) === null || _y === void 0 ? void 0 : _y.direction) === 'outbound' && eventData.customerMessageUpdatedAt === undefined ? new Date(eventData.startTime).toISOString() : eventData.customerMessageUpdatedAt.toISOString();
            if (isElevated) {
                Object.values(interaction.digitalContacts).forEach(contact => { var _a; return contact.elevatedFrom = (_a = eventData.fromProvider) !== null && _a !== void 0 ? _a : ElevatedFrom.DFO; });
                Object.values(interaction.acdContacts).forEach(contact => contact.elevatedFrom = ElevatedFrom.DFO);
            }
            state.cxoneInteractions[eventData.interactionId] = interaction;
            logger.info('AW-25-CXoneDigitalIdMap', `Added new digital case in existing interaction - interactionId: ${eventData.interactionId}, caseId: ${eventData.caseId}`);
        }
        else {
            state.cxoneInteractions[eventData.interactionId] = {
                interactionId: eventData.interactionId,
                interactionReceivedTime: typeof eventData.startTime !== 'string' ? (_z = eventData.startTime) === null || _z === void 0 ? void 0 : _z.toISOString() : eventData.startTime,
                interactionUpdatedTime: ((_0 = eventData.case) === null || _0 === void 0 ? void 0 : _0.direction) === 'outbound' && eventData.customerMessageUpdatedAt === undefined ? new Date(eventData.startTime).toISOString() : eventData.customerMessageUpdatedAt.toISOString(),
                selectedContactId: '',
                interactionType: InteractionType.DIGITAL,
                slaIndicator: SLAIndicatorType.NORMAL,
                acdContacts: {},
                digitalContacts: { [eventData.caseId]: digitalContact },
            };
            logger.info('AW-25-CXoneDigitalIdMap', `Added new digital case in new interaction - interactionId: ${eventData.interactionId}, caseId: ${eventData.caseId}`);
            if (((_1 = eventData.case) === null || _1 === void 0 ? void 0 : _1.direction) === 'outbound' && eventData.status === DigitalContactStatus.DRAFT) {
                state.assignmentPanelMetadata.selectedInteractionId = eventData.interactionId;
                LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, state.assignmentPanelMetadata.selectedInteractionId);
            }
        }
        if (contactselection) {
            state.assignmentPanelMetadata.selectedInteractionId = eventData.interactionId;
            state.assignmentPanelMetadata.incommingDfoInteractionId = '';
            LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, state.assignmentPanelMetadata.selectedInteractionId);
        }
        state.newIncomingContact = incomingContact;
    }
    if (((_2 = eventData === null || eventData === void 0 ? void 0 : eventData.eventDetails) === null || _2 === void 0 ? void 0 : _2.eventType) === CXoneDigitalEventType.CASE_INBOX_ASSIGNED && !(eventData === null || eventData === void 0 ? void 0 : eventData.isAssignedToAgentInbox)) {
        if (!detailedContact) { // only if the preview case is not present then only we will set the selected interaction id
            LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, eventData.interactionId); // Setting the selected interaction id in local storage
            state.cxoneInteractions[eventData.interactionId].selectedContactId = eventData.caseId;
            state.assignmentPanelMetadata.selectedInteractionId = eventData.interactionId;
        }
    }
    state.cxoneDigitalContactDetails = digitalState;
    return state;
};
/**
 * Used to set coBrowse related data from local storage
 * @param digitalContact - digital contact data
 * @example -
 * ```
 * const setCoBrowseData(digitalContact)
 * ```
 */
const setCoBrowseData = (digitalContact) => {
    const cobrowseData = LocalStorageHelper.getItem(StorageKeys.COBROWSE_DATA);
    if (cobrowseData.length > 0) {
        const parsedDataCoBrowse = typeof cobrowseData === 'string' ? JSON.parse(cobrowseData) : undefined;
        const existingCardIndex = parsedDataCoBrowse instanceof Array ? parsedDataCoBrowse === null || parsedDataCoBrowse === void 0 ? void 0 : parsedDataCoBrowse.findIndex((data) => data.contactId === digitalContact.caseId) : -1;
        if (existingCardIndex !== -1) {
            digitalContact.isCoBrowseEnabled = true;
            digitalContact.coBrowseLink = parsedDataCoBrowse[existingCardIndex].url;
        }
    }
};
let thunkDispatch;
export const updateFileToBeUploaded = createAsyncThunk('inbox/updateFilesToBeUploaded', (data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    thunkDispatch = dispatch;
    const isCumulativeLimitEnabled = isFeatureEnabled("release-cxa-cumulative-file-size-limit-AW-43847" /* FeatureToggles.CUMULATIVE_FILE_SIZE_VALIDATION */);
    const state = getState();
    const { inbox } = state;
    const selectedInteractionId = inbox.assignmentPanelMetadata.selectedInteractionId || '';
    const selectedCaseId = inbox.assignmentPanelMetadata.selectedInteractionId && inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId] && Object.keys(inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId]).length ? inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId].selectedContactId : '';
    const parsedList = isCumulativeLimitEnabled ? yield parseFileListAndUploadWithCumulativeLimit(data.fileList, inbox, data.uuidList) : yield parseFileListAndUpload(data.fileList, inbox, data.uuidList);
    // In case of forwarded attachment set isForwardedAttachment prop to true
    if (data.isForwardedAttachment) {
        parsedList.forEach((attachment) => {
            attachment.isForwardedAttachment = true;
        });
    }
    dispatch(CcfAssignmentAction.updateAttachments({ caseId: selectedCaseId, interactionId: selectedInteractionId, attachments: parsedList }));
}));
/**
 * Used to parse FileList into attachmentType array
 * @param fileList - file list that needs to be parsed
 * @example -
 * ```
 * const attachmentList = await parseFileList(fileList);
 * ```
 */
const parseFileListAndUpload = (fileList, state, uuidList) => __awaiter(void 0, void 0, void 0, function* () {
    const files = [];
    for (const [index, file] of Array.from(fileList).entries()) {
        const fileSizeInMB = Math.ceil(file.size / 1024 / 1024);
        if (fileSizeInMB <= 40 && fileSizeInMB > 0) {
            // if file size is less than equal to 40 MB and greater than 0 bytes then only file will be uploaded
            const base64String = yield toBase64(file);
            /**
             * inline images will be stored after normal attachments
             * if the index crossed the normal attachments then storin UID
             */
            let uid;
            if (uuidList) {
                const isInlineFile = index >= fileList.length - (uuidList === null || uuidList === void 0 ? void 0 : uuidList.length);
                if (uuidList && isInlineFile) {
                    const inlineFileIndex = index - (fileList.length - (uuidList === null || uuidList === void 0 ? void 0 : uuidList.length));
                    uid = uuidList[inlineFileIndex];
                }
            }
            const nFile = {
                attachmentId: uid,
                id: `${file.name}${Date.now()}`,
                name: file.name,
                size: file.size,
                mimeType: file.type,
                uploaded: false,
                url: '',
                isInline: Boolean(uid),
            };
            uploadAttachment(base64String, nFile.mimeType, nFile.id, state);
            files.push(nFile);
        }
        else {
            if (fileSizeInMB === 0) {
                thunkDispatch(globalActions.setToastMsg({ msg: '0Mb' }));
                logger.error('parseFileListAndUpload', 'File size for ' + file.name + ' is of 0 bytes which has not met the allowed limit');
            }
            else {
                thunkDispatch(globalActions.setToastMsg({ msg: '40Mb' }));
                logger.error('parseFileListAndUpload', 'File size for ' + file.name + ' exceeded than allowed limit of 40MB');
            }
        }
    }
    return files;
});
/**
 * Used to parse FileList into attachmentType array with cumulative limit check
 * @param fileList - file list that needs to be parsed
 * @example -
 * ```
 * const attachmentList = await parseFileListAndUploadWithCumulativeLimit(fileList);
 * ```
 */
const parseFileListAndUploadWithCumulativeLimit = (fileList, state, uuidList) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const files = [];
    // calculating total size of incoming attachments
    const incomingAttachmentsTotalSize = Array.from(fileList).reduce((acc, file) => {
        return (acc + file.size);
    }, 0);
    const incomingAttachmentsTotalSizeInMB = Math.ceil(incomingAttachmentsTotalSize / 1024 / 1024);
    const activeContact = state.assignmentPanelMetadata.selectedInteractionId &&
        ((_a = state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId]);
    // calculating existing attachments size
    const existingAttachmentsSize = activeContact && activeContact.attachments
        ? activeContact.attachments.reduce((acc, attachment) => acc + attachment.size, 0)
        : 0;
    const existingAttachmentsSizeInMB = Math.ceil(existingAttachmentsSize / 1024 / 1024);
    // calculating existing inline attachments size
    const existingInlineImagesSize = activeContact && activeContact.inlineImages
        ? activeContact.inlineImages.reduce((acc, attachment) => acc + attachment.size, 0)
        : 0;
    const existingInlineImagesSizeInMB = Math.ceil(existingInlineImagesSize / 1024 / 1024);
    // cumulative limit as of 26.1 release 
    const cumulativeLimit = 100;
    if (incomingAttachmentsTotalSizeInMB + existingAttachmentsSizeInMB + existingInlineImagesSizeInMB > cumulativeLimit) {
        //will update message when we get the copy from Product 
        thunkDispatch(globalActions.setToastMsg({ msg: `${cumulativeLimit}Mb` }));
        logger.error('parseFileListAndUpload', 'Files exceed cumulative attachment size limit of ' + cumulativeLimit + 'MB');
    }
    else {
        for (const [index, file] of Array.from(fileList).entries()) {
            const fileSizeInMB = Math.ceil(file.size / 1024 / 1024);
            if (fileSizeInMB > 0) {
                // if file size is greater than 0 bytes then only file will be uploaded
                const base64String = yield toBase64(file);
                /**
                 * inline images will be stored after normal attachments
                 * if the index crossed the normal attachments then storin UID
                 */
                let uid;
                if (uuidList) {
                    const isInlineFile = index >= fileList.length - (uuidList === null || uuidList === void 0 ? void 0 : uuidList.length);
                    if (uuidList && isInlineFile) {
                        const inlineFileIndex = index - (fileList.length - (uuidList === null || uuidList === void 0 ? void 0 : uuidList.length));
                        uid = uuidList[inlineFileIndex];
                    }
                }
                const nFile = {
                    attachmentId: uid,
                    id: `${file.name}${Date.now()}`,
                    name: file.name,
                    size: file.size,
                    mimeType: file.type,
                    uploaded: false,
                    url: '',
                    isInline: Boolean(uid),
                };
                uploadAttachment(base64String, nFile.mimeType, nFile.id, state);
                files.push(nFile);
            }
            else if (fileSizeInMB === 0) {
                thunkDispatch(globalActions.setToastMsg({ msg: '0Mb' }));
                logger.error('parseFileListAndUpload', 'File size for ' + file.name + ' is of 0 bytes which has not met the allowed limit');
            }
        }
    }
    return files;
});
/**
 * Used to upload attachment
 * @param content - base64 file string
 * @param type - attachment type
 * @param id - attachment id
 * @param state - assignment state
 * @example -
 * ```
 * uploadAttachment(base64String, nFile.mimeType, nFile.id);
 * ```
 */
const uploadAttachment = (content, type, id, state) => {
    var _a;
    const fileUploadRequest = new CXoneFileUploadRequest();
    fileUploadRequest.content = content;
    fileUploadRequest.mimeType = type;
    const activeContact = state.assignmentPanelMetadata.selectedInteractionId &&
        ((_a = state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId]);
    if (activeContact && activeContact.caseId) {
        const digitalContact = activeContact.interactionId
            ? state.cxoneDigitalContactDetails[activeContact.interactionId][activeContact.caseId]
            : new CXoneDigitalContact();
        digitalContact
            .upload(fileUploadRequest, id)
            .then((response) => {
            thunkDispatch(CcfAssignmentAction.updateAttachmentStatusAndUrl({ id: response.uId, url: response.url, imageId: response.id }));
        })
            .catch((error) => {
            logger.error('uploadAttachment', 'Error while uploading file' + error.toString());
        });
    }
};
/**
 * updateInlineImageToBeUploaded is an asyncthunk used to handle the update of inline images to be uploaded in the inbox.
 * This thunk is typically dispatched to update the state with new inline images.
 * @example - dispatch(updateInlineImageToBeUploaded(parsedList));
 */
export const updateInlineImageToBeUploaded = createAsyncThunk('inbox/updateInlineImageToBeUploaded', (data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    thunkDispatch = dispatch;
    const state = getState();
    const { inbox } = state;
    const isCumulativeLimitEnabled = true;
    const parsedList = isCumulativeLimitEnabled ? yield parseFileListAndUploadWithCumulativeLimit(data, inbox) : yield parseFileListAndUpload(data, inbox);
    const isImageTypeNotSupported = parsedList === null || parsedList === void 0 ? void 0 : parsedList.filter((item) => !(item === null || item === void 0 ? void 0 : item.mimeType.includes('image/')));
    if ((isImageTypeNotSupported === null || isImageTypeNotSupported === void 0 ? void 0 : isImageTypeNotSupported.length) > 0) {
        dispatch(CcfAssignmentAction.updateImageTypeNotSupported(true));
    }
    else {
        dispatch(CcfAssignmentAction.updateInlineImages({ inlineImages: parsedList }));
        dispatch(CcfAssignmentAction.updateImageTypeNotSupported(false));
    }
}));
/**
 * switchAgentUser - asyncthunk used to switch lobby and consult
 * @example - dispatch(SwitchAgentUser(userInLobby,userInConsult))
 */
export const switchAgentUser = createAsyncThunk(SWITCH_AGENT_USER, (data, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    yield thunkAPI.dispatch(holdVoiceContact(data.userInConsult)).then(() => {
        thunkAPI
            .dispatch(holdVoiceContact(data.userInLobby))
            .then((success) => {
            logger.debug('[CcfCallConferenceSlice][SwitchAgentUser]', `status: ${JSON.stringify(success)}`);
        })
            .catch((error) => {
            logger.debug('[CcfCallConferenceSlice][SwitchAgentUser]', `payload: ${JSON.stringify(error)}`);
        });
    });
    return data;
}));
/**
 * getWebRtcServiceUrls async used to get service URLs for WebRTC
 * @example - dispatch(getWebRtcServiceUrls())
 */
export const getWebRtcServiceUrls = () => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    try {
        const agentSettings = (yield cxoneClient.agentSetting.getAgentSettings());
        const getUserInfo = (yield cxoneClient.cxoneUser.getUserDetails());
        if (agentSettings && getUserInfo.icAgentId) {
            return { agentId: getUserInfo.icAgentId, agentSettings: agentSettings, userInfo: getUserInfo };
        }
    }
    catch (error) {
        logger.error('[ccf-assignment-panel.slice][getWebRtcServiceUrls]', `payload: ${JSON.stringify(error)}`);
    }
    return null;
});
export const initiateWebRTC = createAsyncThunk('inbox/initiateWebRTC', (_data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const agentSettings = (yield getWebRtcServiceUrls());
        const audioElement = document.querySelector('audio');
        const storeState = getState();
        const app = (_c = (_b = storeState === null || storeState === void 0 ? void 0 : storeState.CcfAuthenticationSlice) === null || _b === void 0 ? void 0 : _b.authConfig) === null || _c === void 0 ? void 0 : _c.app;
        yield CXoneVoiceClientWrapper.instance.connectServer(agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.agentId, agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.agentSettings, audioElement, agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.userInfo, app);
        dispatch(globalActions.setIsWebRTCExtensionInstalled(CXoneVoiceClientWrapper.instance.isWebRTCExtensionInstalled));
        dispatch(globalActions.setIsNoiseCancellationExtInstalled(CXoneVoiceClientWrapper.instance.isNoiseCancellationExtInstalled));
    }
    catch (error) {
        logger.error('[ccf-assignment-panel.slice][initiateWebRTC] error on getting WebRTC Service URLs', `payload: ${JSON.stringify(error)}`);
    }
}));
export const agentLegAutoAcceptEnabledPermission = createAsyncThunk('voicePreference/agentLegAutoAcceptEnabledPermission', (_data) => __awaiter(void 0, void 0, void 0, function* () {
    const agentPermissions = CXoneClient.instance.agentPermission;
    const autoAcceptPermissionEnabled = yield agentPermissions.checkPermissions(PermissionKeys.AGENTLEG_AUTOACCEPT, PermissionValues.ENABLE);
    const autoAcceptPermissionAgentConfig = yield agentPermissions.checkPermissions(PermissionKeys.AGENTLEG_AUTOACCEPT, PermissionValues.AGENT_CONFIG);
    if (!autoAcceptPermissionEnabled) {
        if (!autoAcceptPermissionAgentConfig) {
            return false;
        }
        if (LocalStorageHelper.getItem(NotificationSettings.AUTO_ACCEPT) === 'true') {
            return true;
        }
        return false;
    }
    if (autoAcceptPermissionEnabled) {
        if (!autoAcceptPermissionAgentConfig) {
            return true;
        }
        if (LocalStorageHelper.getItem(NotificationSettings.AUTO_ACCEPT) === 'true') {
            return true;
        }
        return false;
    }
    return false;
}));
/*
 * acceptIncomingContact asyncthunk used to accept incoming voice, voicemail and workitem contacts
 * @example - dispatch(acceptContact(contactId))
 */
export const acceptContact = createAsyncThunk(ACCEPT_INCOMING_CONTACT, (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    acceptIncomingContact(contactId);
}));
/*
 * acceptAndActivateWorkItemContact asyncthunk used to accept and activate workitem contacts
 * @example - dispatch(acceptAndActivateWorkItemContact(contactId))
 */
export const acceptAndActivateWorkItemContact = createAsyncThunk(ACCEPT_INCOMING_CONTACT, (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger();
    cxoneAcdClient.contactManager.contactService
        .acceptContact(contactId)
        .then((res) => {
        activateContact(contactId);
        logger.debug('[CcfAssignmentPanelSlice][acceptAndActivateWorkItemContact]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][acceptAndActivateWorkItemContact]', `payload: ${JSON.stringify(error)}`);
    });
}));
/*
 * acceptIncomingDigitalContact asyncthunk used to accept incoming digital contact
 * @example - dispatch(acceptIncomingDigitalContact(contactId))
 */
export const acceptIncomingDigitalContact = createAsyncThunk(ACCEPT_INCOMING_DIGITAL_CONTACT, (args) => __awaiter(void 0, void 0, void 0, function* () {
    acceptIncomingContact(args.contactId);
}));
/*
 * activateContact asyncthunk used to activate contact
 * @example - dispatch(activateContact(contactId))
 */
export const activateContactAction = createAsyncThunk(ACTIVATE_CONTACT, (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    activateContact(contactId);
}));
/**
 * acceptIncomingContact - used to accept incoming contact
 * @example - acceptIncomingContact(contactId)
 */
const acceptIncomingContact = (contactId) => {
    const logger = new Logger();
    cxoneAcdClient.contactManager.contactService
        .acceptContact(contactId)
        .then((res) => {
        logger.debug('[CcfAssignmentPanelSlice][acceptIncomingDigitalContact]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][acceptIncomingDigitalContact]', `payload: ${JSON.stringify(error)}`);
    });
};
/**
 * activateContact - used to activate a contact
 * @example - activateContact(contactId)
 */
const activateContact = (contactId) => {
    const logger = new Logger();
    cxoneAcdClient.contactManager.contactService.activateContact(contactId)
        .then((res) => {
        logger.debug('[CcfAssignmentPanelSlice][activateContact]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][activateContact]', `payload: ${JSON.stringify(error)}`);
    });
};
/**
 * callPlaced asyncthunk used to set PC out of network contact status
 * @example - dispatch(callPlaced(contactId))
 */
export const callPlaced = createAsyncThunk(CALL_PLACED_PC_CONTACT, (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    pcCallPlaced(contactId);
}));
/**
 * pcCallPlaced - set PC out of network contact status
 * @example - pcCallPlaced(contactId)
 */
const pcCallPlaced = (contactId) => {
    const logger = new Logger();
    cxoneAcdClient.contactManager.personalConnectionService
        .callPlaced(contactId)
        .then((res) => {
        logger.debug('[CcfAssignmentPanelSlice][pcCallPlaced]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][pcCallPlaced]', `payload: ${JSON.stringify(error)}`);
    });
};
/**
 * outcomeSelection asyncthunk used to handle outcome selections.
 * @example - dispatch(outcomeSelection(\{outcome: 'Answered Call', contactId: 123456\}))
 */
export const outcomeSelection = createAsyncThunk(OUTCOME_SELECTION, (data) => __awaiter(void 0, void 0, void 0, function* () {
    pcOutcomeSelection(data);
}));
/**
 * pcOutcomeSelection - set PC out of network contact status
 * @example - pcOutcomeSelection(data: \{outcome, contactId\})
 */
const pcOutcomeSelection = (data) => {
    const logger = new Logger();
    cxoneAcdClient.contactManager.personalConnectionService
        .outcomeSelection(Object.assign(Object.assign({}, data), { contactId: data.contactId }))
        .then((res) => {
        logger.debug('[CcfAssignmentPanelSlice][pcOutcomeSelection]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][pcOutcomeSelection]', `payload: ${JSON.stringify(error)}`);
    });
};
/**
 * rescheduleCall asyncthunk used to reschedule out of network call
 * @example - dispatch(rescheduleCall(contactId))
 */
export const rescheduleCall = createAsyncThunk(RESCHEDULE_PC_CONTACT, (data) => __awaiter(void 0, void 0, void 0, function* () {
    reschedulePcContact(data);
}));
/**
 * reschedulePcContact - reschedules out of network call
 * @example - reschedulePcContact(contactId)
 */
const reschedulePcContact = (data) => {
    const logger = new Logger();
    cxoneAcdClient.contactManager.personalConnectionService
        .rescheduleCall(Object.assign(Object.assign({}, data), { contactId: data.contactId }))
        .then((res) => {
        logger.debug('[CcfAssignmentPanelSlice][reschedulePcContact]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][reschedulePcContact]', `payload: ${JSON.stringify(error)}`);
    });
};
/**
 * snoozePcContact asyncthunk used to snooze PC contact
 * @example - dispatch(snoozePcContact(contactId))
 */
export const snoozeContact = createAsyncThunk(SNOOZE_PC_CONTACT, (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    snoozePcContact(contactId);
}));
/**
 * reschedulePcContact - reschedules out of network call
 * @example - reschedulePcContact(contactId)
 */
const snoozePcContact = (contactId) => {
    const logger = new Logger();
    cxoneAcdClient.contactManager.personalConnectionService
        .snoozeContact(contactId)
        .then((res) => {
        logger.debug('[CcfAssignmentPanelSlice][snoozePcContact]', `payload: ${JSON.stringify(res)}`);
    })
        .catch((error) => {
        logger.debug('[CcfAssignmentPanelSlice][snoozePcContact]', `payload: ${JSON.stringify(error)}`);
    });
};
/**
 * rejectIncomingDigitalContact asyncthunk used to reject incoming digital contact
 * @example - dispatch(rejectIncomingDigitalContact(contactId))
 */
export const rejectIncomingDigitalContact = createAsyncThunk(REJECT_INCOMING_DIGITAL_CONTACT, (args) => __awaiter(void 0, void 0, void 0, function* () {
    rejectIncomingContact(args.contactId, MediaType.DIGITAL);
}));
/**
 * rejectIncomingContact asyncthunk used to reject incoming contact
 * @example - dispatch(rejectContact(contactId))
 */
export const rejectContact = createAsyncThunk(REJECT_INCOMING_CONTACT, (obj) => __awaiter(void 0, void 0, void 0, function* () {
    rejectIncomingContact(obj.contactId, obj.mediaType);
}));
/**
 * rejectIncomingContact - used to reject incoming contact
 * @example - rejectIncomingContact(contactId)
 */
const rejectIncomingContact = (contactId, mediaType) => {
    const logger = new Logger();
    if (mediaType === MediaType.VOICEMAIL) {
        cxoneAcdClient.agentLegService.endAgentLeg().then(res => {
            logger.debug('[CcfAssignmentPanelSlice][rejectIncomingContact]', `payload: ${JSON.stringify(res)}`);
        }).catch(error => {
            logger.debug('[CcfAssignmentPanelSlice][rejectIncomingContact]', `payload: ${JSON.stringify(error)}`);
        });
    }
    else {
        cxoneAcdClient.contactManager.contactService
            .rejectContact(contactId)
            .then((res) => {
            logger.debug('[CcfAssignmentPanelSlice][rejectIncomingContact]', `payload: ${JSON.stringify(res)}`);
        })
            .catch((error) => {
            logger.debug('[CcfAssignmentPanelSlice][rejectIncomingContact]', `payload: ${JSON.stringify(error)}`);
        });
    }
};
/**
 * calls a method to accept a call for consult
 * @param contactId -contactId
 * @returns - State
 * @example
 * ```
 * acceptConsultCall(contactId)
 * ```
 */
export const acceptConsultCall = (contactId) => {
    return new Promise((resolve, reject) => {
        cxoneAcdClient.contactManager.contactService.acceptConsultContact(contactId).then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
 * Get forward attachments as File
 * @param attachment - attachment reveived in message
 * @example
 * ```
 * getForwardedAttachments(attachment)
 * ```
 */
export const getForwardedAttachments = (attachment) => {
    return new Promise((resolve, reject) => {
        cxoneDigitalClient.digitalService.getAttachment(attachment).then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
 * Get blob data of attachment to be downloaded
 * Few channels like Instagram require no token due to open CDN
 * @param url - attachment accessing url
 * @example
 * ```
 * downloadAttachment(url, isTokenRequired)
 * ```
 */
export const downloadAttachment = (url, isTokenRequired) => {
    return new Promise((resolve, reject) => {
        cxoneDigitalClient.digitalService.downloadAttachment(url, isTokenRequired).then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
 * Get blob data of attachment to be downloaded
 * Few channels like Instagram require no token due to open CDN
 * @param attachmentIds - list of attachment ids
 * @example
 * ```
 * downloadAllAttachment(['5846adee-70de-4463-9755-ef23d006b67d','3fc84c90-3301-11ef-a1bf-c739f8d018c2'])
 * ```
 */
export const downloadAllAttachment = (attachmentIds) => {
    return new Promise((resolve, reject) => {
        cxoneDigitalClient.digitalService.downloadAllAttachment(attachmentIds).then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
 * Function to delete data from digital_contact_saved_props from local storage based on case id
 * @param caseId - string - this is case id of digital contact
 * @example
 * ```
 * deleteDigitalContactSavedPropsFromLS('203445080426')
 * ```
 */
export const deleteDigitalContactSavedPropsFromLS = (caseId) => {
    try {
        const digitalContactUserSavedPropertiesFromStorage = localStorage.getItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS);
        if (digitalContactUserSavedPropertiesFromStorage) {
            const digitalSavedProps = JSON.parse(digitalContactUserSavedPropertiesFromStorage);
            if (digitalSavedProps[caseId]) {
                delete digitalSavedProps[caseId];
            }
            if (digitalSavedProps && Object.keys(digitalSavedProps).length > 0) {
                LocalStorageHelper.setItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS, digitalSavedProps);
            }
            else {
                LocalStorageHelper.removeItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS);
            }
        }
    }
    catch (error) {
        logger.error('[ccf-assignment-panel.slice][deleteDigitalContactSavedPropsFromLS] unsuccessful in deleting digital contact saved props from local storage', `payload: ${JSON.stringify(error)}`);
    }
};
/**
 * This thunk calls the updateMessageReadStatus async method to mark isRead flag to true for a focused digital contact
 * @param args - interactionId and caseId of the selected contact
 * @example - dispatch(updateDigitalMessageReadStatus(interactionId: string, caseId: string)
 */
export const updateDigitalMessageReadStatus = createAsyncThunk('inbox/updateDigitalMessageReadStatus', (args, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inbox } = getState();
        if (inbox.cxoneInteractions[args === null || args === void 0 ? void 0 : args.interactionId] && Object.keys(inbox.cxoneInteractions[args === null || args === void 0 ? void 0 : args.interactionId]).length && Object.keys(inbox.cxoneInteractions[args === null || args === void 0 ? void 0 : args.interactionId].digitalContacts).length) {
            const currentContact = inbox.cxoneDigitalContactDetails[args === null || args === void 0 ? void 0 : args.interactionId][args === null || args === void 0 ? void 0 : args.caseId];
            dispatch(CcfAssignmentAction.updateReadStatusForSelectedDigitalContact({
                interactionId: currentContact.interactionId,
                caseId: currentContact.caseId,
            }));
        }
    }
    catch (error) {
        logger.error('[ccf-assignment-panel.slice][updateDigitalMessageReadStatus] Unsuccessful in marking read status', `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * This method fetchs list of all the message tags
 * @param state - InboxState
 * @returns array of all the digital message tags
 * @example getDigitalMessageTag
 */
export const getDigitalMessageTag = createAsyncThunk('inbox/getDigitalMessageTag', () => __awaiter(void 0, void 0, void 0, function* () {
    const messageTags = yield CXoneDigitalClient.instance.digitalService.getDigitalMessageTags();
    return messageTags;
}));
/**
 * This method fetchs list of all the message tags by page number
 * @param state - InboxState
 * @returns array of all the digital message tags
 * @example getDigitalMessageTagsByPageNumber(1)
 */
export const getDigitalMessageTagsByPageNumber = createAsyncThunk('inbox/getDigitalMessageTagsByPageNumber', (pageNumber, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const messageTags = yield CXoneDigitalClient.instance.digitalService.getDigitalMessageTagsByPage(pageNumber).catch((error) => {
        throw rejectWithValue(error);
    });
    return messageTags;
}));
/**
 * This method fetchs list of all the matching message tags
 * @param state - InboxState
 * @returns array of all matching digital message tags
 * @example searchDigitalMessageTagByName('test')
 */
export const searchDigitalMessageTagByName = createAsyncThunk('inbox/searchDigitalMessageTagByName', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const messageTags = yield CXoneDigitalClient.instance.digitalService.getDigitalMessageTagByName(data.tagName, '1').catch((error) => {
        throw rejectWithValue(error);
    });
    const totalMessageTags = messageTags.data.data;
    return totalMessageTags;
}));
/**
 * This method adds a tag to specific message id
 * @param state - InboxState
 * @example addDigitalMessageTag('675757575','9898')
 */
export const addDigitalMessageTag = createAsyncThunk('inbox/addDigitalMessageTag', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneDigitalClient.instance.digitalService.addDigitalMessageTag(data.messageId, data.tagId.toString()).catch((error) => {
        throw rejectWithValue(error);
    });
    return data.tagId;
}));
/**
 * This method removes a tag from specific message id
 * @param state - InboxState
 * @example removeDigitalMessageTag('675757575','9898')
 */
export const removeDigitalMessageTag = createAsyncThunk('inbox/removeDigitalMessageTag', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const messageResponse = yield CXoneDigitalClient.instance.digitalService.deleteDigitalMessageTag(data.messageId, data.tagId.toString())
        .catch((error) => {
        throw rejectWithValue(error);
    });
    return messageResponse;
}));
/**
 * call focus service for selected contact
 * @param contactId - string
 * @example
 * ```
 * dispatch(focusContact(contactId))
 * ```
 */
export const focusContact = createAsyncThunk('contact/focus', (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    (_e = (_d = cxoneDigitalClient === null || cxoneDigitalClient === void 0 ? void 0 : cxoneDigitalClient.digitalContactManager) === null || _d === void 0 ? void 0 : _d.digitalContactService) === null || _e === void 0 ? void 0 : _e.focusContact(contactId).catch((error) => {
        logger.error('[CcfAssignmentPanelSlice][focusContact]', `${JSON.stringify(error)}`);
    });
    activateContact(contactId);
}));
/**
 * call defocus service for selected contact
 * @param contactId - string
 * @example
 * ```
 * dispatch(deFocusContact(contactId))
 * ```
 */
export const deFocusContact = createAsyncThunk('contact/deFocusContact', (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    (_g = (_f = cxoneDigitalClient === null || cxoneDigitalClient === void 0 ? void 0 : cxoneDigitalClient.digitalContactManager) === null || _f === void 0 ? void 0 : _f.digitalContactService) === null || _g === void 0 ? void 0 : _g.deFocusContact(contactId).catch((error) => {
        logger.error('[CcfAssignmentPanelSlice][deFocusContact]', `${JSON.stringify(error)}`);
    });
}));
/**
 * This function is used to load previous case conversations
 * @param previousContactData - interactionId and selectedCaseId of the selected contact, contactId as the contactId whose previous case details needs to loaded
 * @example - dispatch(loadPreviousCaseConversations('123','234','456'))
 */
export const loadPreviousCaseConversations = createAsyncThunk('inbox/loadPreviousCaseConversations', (previousContactData, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { inbox } = getState();
    const { interactionId, selectedCaseId, contactId } = previousContactData;
    const currentContact = inbox.cxoneDigitalContactDetails[interactionId][selectedCaseId];
    currentContact.loadConversationHistory(contactId).then((response) => {
        dispatch(CcfAssignmentAction.updatePreviousCaseConversations({
            interactionId: currentContact.interactionId,
            caseId: currentContact.caseId,
            detail: response,
        }));
    });
    currentContact.loadRelatedDigitalContacts(contactId).then((response) => {
        const { previous } = response;
        dispatch(CcfAssignmentAction.updatePreviousAndNextCaseIdForSelectedContact({
            interactionId: currentContact.interactionId,
            caseId: currentContact.caseId,
            previousCaseId: previous,
            nextCaseId: currentContact.nextCaseId,
        }));
    });
}));
/**
 * This function is used to load next case conversations
 * @param nextContactData - interactionId and selectedCaseId of the selected contact, contactId as the contactId whose previous case details needs to loaded
 * @example - dispatch(loadNextCaseConversations('123','234','456'))
 */
export const loadNextCaseConversations = createAsyncThunk('inbox/loadPreviousCaseConversations', (nextContactData, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { inbox } = getState();
    const { interactionId, selectedCaseId, contactId } = nextContactData;
    const currentContact = inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactDetails[interactionId][selectedCaseId];
    currentContact.loadConversationHistory(contactId).then((response) => {
        dispatch(CcfAssignmentAction.updateNextCaseConversations({
            interactionId: currentContact.interactionId,
            caseId: currentContact.caseId,
            detail: response,
        }));
    });
    currentContact.loadRelatedDigitalContacts(contactId).then((response) => {
        const { next } = response;
        dispatch(CcfAssignmentAction.updatePreviousAndNextCaseIdForSelectedContact({
            interactionId: currentContact.interactionId,
            caseId: currentContact.caseId,
            previousCaseId: currentContact.previousCaseId,
            nextCaseId: next,
        }));
    });
}));
/**
 * This function is used to fetch previous and next caseIds for the current case
 * @param previousContactData - interactionId and selectedCaseId of the selected contact, contactId as the contactId whose previous and next caseIds needs to fetched
 * @example - dispatch(getPreviousAndNextCaseIds(interactionId, contactId, selectedCaseId)
 */
export const getPreviousAndNextCaseIds = createAsyncThunk('inbox/getPreviousAndNextCaseIds', (previousContactData, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { inbox } = getState();
    const { interactionId, selectedCaseId, contactId } = previousContactData;
    const currentContact = inbox.cxoneDigitalContactDetails[interactionId][selectedCaseId];
    currentContact.loadRelatedDigitalContacts(contactId).then((response) => {
        const { previous, next } = response;
        dispatch(CcfAssignmentAction.updatePreviousAndNextCaseIdForSelectedContact({
            interactionId: currentContact.interactionId,
            caseId: currentContact.caseId,
            previousCaseId: previous,
            nextCaseId: next,
        }));
    });
}));
/**
 * Get the details of calling agent in case of inbound voice interaction
 * @param ani - ani number(agent id)
 * @example
 * ```
 * getConsultingAgentDetails(ani)
 * ```
 */
export const getConsultingAgentDetails = createAsyncThunk('inbox/getConsultingAgentDetails', (ani, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneAcdClient = CXoneAcdClient.instance;
    const info = yield cxoneAcdClient.contactManager.getInboundAgentDetails(ani)
        .catch((error) => {
        throw rejectWithValue(error);
    });
    return info;
}));
/**
 * This function is used to fetch the contact details
 * @param contactId - contactId of the selected contact
 * @example - dispatch(getContactDetailsForSelectedContact(contactId = '123', isAssignedToAgentInbox = false))
 */
export const getContactDetailsForSelectedContact = createAsyncThunk('inbox/getContactDetailsForSelectedContact', (contactDetails, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId, isAssignedToAgentInbox, forceFetch } = contactDetails;
    if (forceFetch) { //call detail and event hub subscription only when contact is switched irrespective of assigned/unassigned
        cxoneDigitalClient.digitalContactManager.getContactDetails(contactId, isAssignedToAgentInbox);
    }
    else {
        const { inbox } = getState();
        const contactCards = digitalContactCardsSelector(inbox.cxoneInteractions);
        const existingContactCard = contactCards.find((contactCard) => contactCard.caseId === contactId); //finding if card already exists then not to make detail API call and update the redux store
        if (!existingContactCard) { //not to update the case when we click on row from interaction search/customer card of already assigned case just set that contact as active
            cxoneDigitalClient.digitalContactManager.getContactDetails(contactId, isAssignedToAgentInbox);
            // when we request for preview a case then we will update the localStorage so that we can have those preview cases on page reload
            const currentPreviewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true) || [];
            if (!currentPreviewCases.includes(contactId)) { // we will only push the contactId if they are already not present in the localStorage
                currentPreviewCases.push(contactId);
                LocalStorageHelper.setItem(PREVIEW_CASES, currentPreviewCases);
            }
        }
        else { //if contact is already present in the assignment space set that contact as active
            dispatch(CcfAssignmentAction.setSelectedContactId({ interactionId: existingContactCard.interactionId, contactId: existingContactCard.caseId }));
            setTimeout(() => {
                dispatch(CcfAssignmentAction.setSelectedInteraction(existingContactCard === null || existingContactCard === void 0 ? void 0 : existingContactCard.interactionId));
                dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION })); //opening that contact in interaction space and shifting interaction search part to app space
                if ((existingContactCard === null || existingContactCard === void 0 ? void 0 : existingContactCard.caseId) && (existingContactCard === null || existingContactCard === void 0 ? void 0 : existingContactCard.interactionId)) {
                    dispatch(updateDigitalMessageReadStatus({
                        interactionId: existingContactCard.interactionId,
                        caseId: existingContactCard.caseId,
                    }));
                }
            }, 0);
        }
    }
}));
/**
 * This function is used to dismiss the preview cases
 * @param contactDetails- contact details object
 * @example - dispatch(dismissPreviewContact(contactDetails))
 */
export const dismissPreviewContact = createAsyncThunk('inbox/dismissPreviewContact', (contactDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const { caseId } = contactDetails;
    dispatch(CcfAssignmentAction.handleCaseUnassignedDigitalContactEvent(contactDetails));
    cxoneDigitalClient.digitalContactManager.removePreviewContacts(caseId);
    // when we request for preview a case then we will update the localStorage so that we can have those preview cases on page reload
    const currentPreviewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true) || [];
    const isPreviewContactIdIndex = currentPreviewCases.findIndex((previewContactId) => previewContactId === caseId);
    if (isPreviewContactIdIndex >= 0) { // we will remove the contact id on dismiss from localStorage
        currentPreviewCases.splice(isPreviewContactIdIndex, 1);
        LocalStorageHelper.setItem(PREVIEW_CASES, currentPreviewCases);
    }
    //While closing the preview will remove the disposition details from redux store
    dispatch(dispositionInteractionActions.clearDispositionById(contactDetails.caseId));
    //Reset rejected reason state on dismissing preview contact
    const isRejectedReasonEnabled = isFeatureEnabled("release-cx-agent-Approval-flow-copy-reject-message-AW-47882" /* FeatureToggles.COPY_REJECT_MESSAGE_BUTTON */);
    if (isRejectedReasonEnabled) {
        dispatch(CcfRejectedReasonAction.resetRejectedReasonState({ caseId: contactDetails.caseId }));
    }
}));
/**
 * call for to get the response of voice bio hub
 * @param custID - string or number
 * @param requestType - number
 * @example
 * ```
 * dispatch(voiceBioHubData(custID, requestType))
 * ```
 */
export const getVoiceBioHubData = createAsyncThunk('inbox/cxoneVoiceBioHubData', ({ patronId, requestType, voiceBioConfigName, OptOutReason: optoutreason, contactId, CustomParams, stringParams }) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
    if (requestType === 3) {
        yield CXoneClient.instance.voiceBioHubService.voiceBioHubPatronActions({
            agentId: userInfo.icAgentId,
            personId: patronId,
            requestType: requestType,
            voiceBioConfigName: voiceBioConfigName,
            OptOutReason: optoutreason,
            contactId: contactId,
            CustomParams: CustomParams,
            stringParams: stringParams,
        });
    }
    else {
        yield CXoneClient.instance.voiceBioHubService.voiceBioHubPatronActions({
            agentId: userInfo.icAgentId,
            personId: patronId,
            requestType: requestType,
            voiceBioConfigName: voiceBioConfigName,
            contactId: contactId,
            CustomParams: CustomParams,
            stringParams: stringParams,
        });
    }
}));
/**
 * call for to get the response of voice bio hub
 * @param contactId - string or number
 * @param voiceBioConfigName - number
 * @example
 * ```
 * dispatch(voiceBioHubAgentLogin())
 * ```
 */
export const voiceBioHubAgentLogin = createAsyncThunk('inbox/voiceBioHubAgentLogin', ({ agentId, contactId, voiceBioConfigName, CustomParams }) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.voiceBioHubService.voiceBioAgentLogin({ agentId: agentId, contactId: contactId, voiceBioConfigName: voiceBioConfigName, CustomParams: CustomParams });
}));
/**
 * call for agent logout of voice bio hub
 * @param contactId - string or number
 * @param voiceBioConfigName - number
 * @example
 * ```
 * dispatch(voiceBioHubAgentLogout())
 * ```
 */
export const voiceBioHubAgentLogout = createAsyncThunk('inbox/voiceBioHubAgentLogout', ({ agentId, contactId, voiceBioConfigName, CustomParams }) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.voiceBioHubService.voiceBioAgentLogout({ agentId: agentId, contactId: contactId, voiceBioConfigName: voiceBioConfigName, CustomParams: CustomParams });
}));
export const AssignmentSlice = createSlice({
    name: ASSIGNMENT_KEY,
    initialState: initialAssignmentState,
    reducers: {
        /**
         * Used to clear the state on clearing of tags search
         * @param rootState - initialAssignmentState
        * @example - clearSearchDigitalMessageTag(state)
         */
        clearSearchDigitalMessageTag(state, action) {
            return Object.assign(Object.assign({}, state), { digitalMessageTagsByName: action.payload });
        },
        /**
         * @param state - CxOneVoiceEventState
         * @example - dispatch(setAutoAccept(false))
         * @returns - Existing state with updated AutoAccept value
         */
        setAutoAccept: (state, action) => {
            return Object.assign(Object.assign({}, state), { isAgentLegAutoAcceptEnabled: action.payload });
        },
        /**
         * @param state - AssignmentState
         * @example - dispatch(updateCxoneVoiceContactCustomerName(event, action));
         * @returns - this returns state
         */
        updateCxoneVoiceContactCustomerName(state, action) {
            if (action.payload.interactionId && action.payload.contactId) {
                if (state.cxoneInteractions[action.payload.interactionId].acdContacts[action.payload.contactId]) {
                    state.cxoneInteractions[action.payload.interactionId].acdContacts[action.payload.contactId].customerName = action.payload.customerName;
                }
                else if (state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.contactId]) {
                    state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.contactId].customerName = action.payload.customerName;
                }
            }
            return state;
        },
        /**
         * @param state - CxOneVoiceEventState
         * @example - dispatch(updateContact(event, action));
         * @returns - this returns state
         */
        handleCXoneVoiceContactSubscription(state, action) {
            var _a, _b, _c, _d;
            if (action.payload.ani !== 'REAGENT') {
                // if there is any existing active voice contact, we will update the interactionId of payload event 
                // to the one of existing active voice contact so as to club all the voice contacts under one interactionId.
                // https://nice-ce-cxone-prod.atlassian.net/browse/ORC-34638
                if (((_a = state.cxoneVoiceContactDetails) === null || _a === void 0 ? void 0 : _a.finalState) && ((_b = state.cxoneVoiceContactDetails) === null || _b === void 0 ? void 0 : _b.interactionId) === ((_c = state.assignmentPanelMetadata) === null || _c === void 0 ? void 0 : _c.voiceInteractionId)) {
                    state.assignmentPanelMetadata.voiceInteractionId = '';
                    logger.info('AW-25-handleCXoneVoiceContactSubscription', 'Emptying voiceInteractionId when voice contact is disconnected');
                }
                else if (((_d = state.assignmentPanelMetadata) === null || _d === void 0 ? void 0 : _d.voiceInteractionId) && action.payload.callType !== CallType.NATURAL_CALLING) {
                    logger.info('AW-25-handleCXoneVoiceContactSubscription', `Replacing interaction id: ${action.payload.interactionId} with active voice interaction id: ${state.assignmentPanelMetadata.voiceInteractionId}`);
                    action.payload.interactionId = state.assignmentPanelMetadata.voiceInteractionId;
                }
                state = addOrUpdateCXoneVoiceContact(state, action.payload);
            }
            return state;
        },
        /**
         * @param state - setVoiceBioHubData
         * @example - dispatch(setVoiceBioHubData(event, action));
         * @returns - this returns state
         */
        setVoiceBioHubData(state, action) {
            LocalStorageHelper.setItem(StorageKeys.VOICE_BIO_HUB_DATA, JSON.stringify(action.payload));
            return Object.assign(Object.assign({}, state), { cxoneVoiceBioHubData: Object.assign(Object.assign({}, state.cxoneVoiceBioHubData), { voiceBioHubStatus: action.payload.voiceBioHubStatus, voiceBioHubStatusMessage: action.payload.voiceBioHubStatusMessage, voiceBioHubCurrentRequestType: action.payload.voiceBioHubCurrentRequestType, isSuccessVoiceBioHubResponseType: action.payload.isSuccessVoiceBioHubResponseType, voiceBioHubPatronId: action.payload.voiceBioHubPatronId }) });
        },
        /**
         * @param state - setVoiceBioIsSilentANIAuth
         * @example - dispatch(setVoiceBioIsSilentANIAuth(event, action));
         * @returns - this returns state
         */
        setVoiceBioIsSilentANIAuth(state, action) {
            return Object.assign(Object.assign({}, state), { cxoneVoiceBioHubData: Object.assign(Object.assign({}, state.cxoneVoiceBioHubData), { isSilentANIAuthentication: action.payload }) });
        },
        /**
         * @param state - setVoiceBioIsSilentANIAuth
         * @example - dispatch(setVoiceBioIsSilentANIAuth(event, action));
         * @returns - this returns state
         */
        setVoiceBioIsRetryRequest(state, action) {
            return Object.assign(Object.assign({}, state), { cxoneVoiceBioHubData: Object.assign(Object.assign({}, state.cxoneVoiceBioHubData), { isRetry: action.payload }) });
        },
        updateModalIsOpen: (state, action) => {
            return Object.assign(Object.assign({}, state), { isModalOpen: action.payload });
        },
        /**
         * @param state - setVoiceBioHubPatronId
         * @example - dispatch(setVoiceBioHubPatronId(event, action));
         * @returns - this returns state
         */
        setVoiceBioHubPatronId(state, action) {
            return Object.assign(Object.assign({}, state), { cxoneVoiceBioHubData: Object.assign(Object.assign({}, state.cxoneVoiceBioHubData), { voiceBioHubPatronId: action.payload }) });
        },
        /**
         * @param state - CxOneVoiceEventState
         * @example - dispatch(updateContact(event, action));
         * @returns - this returns state
         */
        handleCxoneVoiceMailContactSubscription(state, action) {
            state = addOrUpdateCXoneVoiceMailContact(state, action.payload);
            return state;
        },
        /**
         * @param state - CxOneVoiceEventState
         * @example - dispatch(updateContact(event, action));
         * @returns - this returns state
         */
        handleCxoneWorkItemContactSubscription(state, action) {
            state = addOrUpdateCXoneWorkItemContact(state, action.payload);
            return state;
        },
        /**
         * @param state - CxOneVoiceEventState
         * @example - removeCXoneVoiceContact(event, action));
         * @returns - this returns state
         */
        removeCXoneVoiceContact(state, action) {
            var _a;
            const voiceContact = (_a = state.cxoneInteractions[action.payload.interactionId]) === null || _a === void 0 ? void 0 : _a.acdContacts[action.payload.contactID];
            if (voiceContact && voiceContact.contactStatus === VoiceContactStatus.DISCONNECTED && action.payload.finalState) {
                state = removeVoiceContact(state, action.payload);
                logger.info('AW-25-removeCXoneVoiceContact', `Removing voice contact from state as it is disconnected. ContactId: ${action.payload.contactID}`);
            }
            return state;
        },
        /**
         * @param state - CxOneVoiceMailEventState
         * @example - removeCXoneVoiceMailContact(event, action));
         * @returns - this returns state
         */
        removeCXoneVoiceMailContact(state, action) {
            delete state.cxoneInteractions[action.payload.contactID];
            state.assignmentPanelMetadata.voiceMailInteractionId = '';
            if (action.payload.contactID === state.cxoneVoiceMailContactDetails.contactID) {
                state.cxoneVoiceMailContactDetails = {};
            }
            if (!state.cxoneInteractions || (state.cxoneInteractions && Object.keys(state.cxoneInteractions).length === 0)) {
                state.assignmentPanelMetadata.selectedInteractionId = '';
            }
            return state;
        },
        /**
         * @param state - CxOneVoiceMailEventState
         * @example - setHasInitialPlayed(event, action));
         * @returns - this returns state
         */
        setHasInitialPlayed(state, action) {
            state.cxoneVoiceMailContactDetails.initialHasPlayed = action.payload;
            return state;
        },
        /**
         * @param state - CxOneWorkItemEventState
         * @example - removeCXoneWorkItemContact(event, action));
         * @returns - this returns state
         */
        removeCXoneWorkItemContact(state, action) {
            var _a, _b, _c;
            const contactId = action.payload.contactID;
            const contact = (_a = state.cxoneInteractions[contactId]) === null || _a === void 0 ? void 0 : _a.acdContacts[contactId];
            const workItemContactStatus = contact === null || contact === void 0 ? void 0 : contact.contactStatus;
            const isFinalState = contact === null || contact === void 0 ? void 0 : contact.finalState;
            const workItemIndex = (_b = state.cxoneWorkItemContacts) === null || _b === void 0 ? void 0 : _b.findIndex((item) => item.contactID === contactId);
            if (workItemContactStatus === WorkItemContactStatus.DISCONNECTED.toLowerCase() && isFinalState) {
                delete state.cxoneInteractions[contactId];
                if (workItemIndex >= 0) {
                    (_c = state.cxoneWorkItemContacts) === null || _c === void 0 ? void 0 : _c.splice(workItemIndex, 1);
                }
                if (action.payload.contactID === state.cxoneWorkItemContactDetails.contactID) {
                    state.cxoneWorkItemContactDetails = {};
                }
                if (!state.cxoneInteractions || (state.cxoneInteractions && Object.keys(state.cxoneInteractions).length === 0)) {
                    state.assignmentPanelMetadata.selectedInteractionId = '';
                }
            }
            return state;
        },
        /**
         * @param state - CxOneVoiceEventState
         * @example - setCtdDisplayError(event, action));
         * @returns - this returns state
         */
        setCtdDisplayError(state, action) {
            state.ctdDisplayError = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - setEmailDraftSent(event, action));
         * @returns - this returns state
         */
        setEmailDraftSent(state, action) {
            state.isEmailDraftSent = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - setInteractionKeyboardNavKeyPressed(true));
         * @returns - this returns state
         */
        setInteractionKeyboardNavKeyPressed(state, action) {
            state.isInteractionNavigationKeyPressed = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - setInteractionAcceptKeyPressed(event, action));
         * @returns - this returns state
         */
        setInteractionAcceptKeyPressed(state, action) {
            state.isInteractionAcceptKeyPressed = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - setInteractionRejectKeyPressed(event, action));
         * @returns - this returns state
         */
        setInteractionRejectKeyPressed(state, action) {
            state.isInteractionRejectKeyPressed = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - setCurrentDigitalTagsPage(event, action));
         * @returns - this returns state
         */
        setCurrentDigitalTagsPage(state, action) {
            state.digitalMessageTagsCurrentPage = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(handleCaseAssignedDigitalContactEvent(payload));
         * @returns - this returns state
         */
        handleCaseAssignedDigitalContactEvent(state, action) {
            const newState = CXoneDigitalIdMap(state, action.payload);
            return newState;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(handleNewMessageDigitalContactEvent(payload));
         * @returns - this returns state
         */
        handleNewMessageDigitalContactEvent(state, action) {
            var _a, _b;
            let digitalState = {};
            if (state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId]) {
                const ifMessageNotRead = action.payload.status.toLowerCase() !== 'resolved' && action.payload.hasUnreadMessage;
                state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].contactStatus = action.payload.status.toLowerCase();
                state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].showBadge = ifMessageNotRead && !(state.assignmentPanelMetadata.selectedInteractionId === action.payload.interactionId && state.cxoneInteractions[action.payload.interactionId].selectedContactId === action.payload.caseId);
                if (state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].channelName === 'Email' &&
                    state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].isOutbound === true) {
                    state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].customerName = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.customerName;
                }
                // eslint-disable-next-line no-nested-ternary
                const customerMessageUpdatedAt = Array.isArray(action.payload.messages) && action.payload.messages.length > 0 ?
                    (action.payload.messages[((_b = action.payload.messages) === null || _b === void 0 ? void 0 : _b.length) - 1].direction === 'inbound' ?
                        action.payload.customerMessageUpdatedAt : state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].customerMessageUpdatedAt) :
                    state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].customerMessageUpdatedAt;
                // eslint-disable-next-line no-nested-ternary
                state.cxoneInteractions[action.payload.interactionId].interactionUpdatedTime = customerMessageUpdatedAt ? typeof customerMessageUpdatedAt === 'string' ? customerMessageUpdatedAt : customerMessageUpdatedAt.toISOString() : '';
                state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].customerMessageUpdatedAt = customerMessageUpdatedAt;
                state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].hasUnreadMessage = ifMessageNotRead && state.cxoneInteractions[action.payload.interactionId].selectedContactId !== action.payload.caseId;
            }
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            digitalState[action.payload.interactionId][action.payload.caseId] = action.payload;
            digitalState[action.payload.interactionId][action.payload.caseId].messages = Array.isArray(action.payload.messages)
                ? [...action.payload.messages]
                : [];
            digitalState[action.payload.interactionId][action.payload.caseId].messageDrafts =
                Array.isArray(action.payload.messageDrafts) ? [...action.payload.messageDrafts] : [];
            state.cxoneDigitalContactDetails = digitalState;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(handleCaseStatusChangedDigitalContactEvent(payload));
         * @returns - this returns state
         */
        handleCaseStatusChangedDigitalContactEvent(state, action) {
            var _a;
            if ((_a = state.cxoneInteractions[action.payload.interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[action.payload.caseId]) {
                state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].contactStatus = action.payload.status.toLowerCase();
            }
            let digitalState = {};
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            digitalState[action.payload.interactionId][action.payload.caseId] = action.payload;
            state.cxoneDigitalContactDetails = digitalState;
            return state;
        },
        /**
         * Assign the give customerId to the active interaction. This will be used for
         * customer multimatch, when having an interaction that doesnt have customer id
         * the customer will be search by the interaction recipient to, which can be
         * en email or phone and if there are multiple matches, the user will select one of those
         * and this method will be triggered
         * @example
         * ```
         * dispatch(handleCustomerIdChangedContactEvent(payload));
         * ```
         * @returns - this returns state
         */
        handleCustomerIdChangedContactEvent(state, action) {
            var _a, _b, _c;
            const { caseId, customerId, interactionId, interactionType } = (_a = action === null || action === void 0 ? void 0 : action.payload) !== null && _a !== void 0 ? _a : {};
            // not taking into account customerId because we want to assign and unassign
            if (interactionId &&
                caseId) {
                if (interactionType === InteractionType.VOICE &&
                    ((_b = state.cxoneInteractions[interactionId]) === null || _b === void 0 ? void 0 : _b.acdContacts[caseId])) {
                    state.cxoneInteractions[interactionId].acdContacts[caseId].customerId = customerId;
                    state.cxoneVoiceContactDetails.customerId = customerId;
                }
                else if (interactionType === InteractionType.DIGITAL &&
                    ((_c = state.cxoneInteractions[interactionId]) === null || _c === void 0 ? void 0 : _c.digitalContacts[caseId])) {
                    let digitalState = {};
                    digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
                    // making sure that the customerId is assigner in cxoneDigitalContactDetails and also cxoneInteractions
                    digitalState[interactionId][caseId].customerId = customerId;
                    state.cxoneInteractions[interactionId].digitalContacts[caseId].customerId = customerId;
                    state.cxoneDigitalContactDetails = digitalState;
                }
            }
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(handleIncomingDigitalContactSdkEvent(payload));
         * @returns - this returns state
         */
        handleIncomingDigitalContactSdkEvent(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const id = (_a = action.payload.interactionId) !== null && _a !== void 0 ? _a : action.payload.caseId;
            const digitalContact = {
                contactId: action.payload.contactID && action.payload.contactID,
                caseId: action.payload.caseId,
                media: MediaType.DIGITAL,
                isOutbound: ((_b = action.payload.case) === null || _b === void 0 ? void 0 : _b.direction) === 'outbound' ? true : false,
                isSelected: false,
                contactMode: '',
                contactStatus: (_c = action.payload.status) === null || _c === void 0 ? void 0 : _c.toLowerCase(),
                skillOrQueueName: action.payload.skill,
                customerName: action.payload.customerName,
                channelName: ((_d = action.payload.channelType) === null || _d === void 0 ? void 0 : _d.charAt(0).toUpperCase()) +
                    ((_e = action.payload.channelType) === null || _e === void 0 ? void 0 : _e.slice(1)),
                contactReceivedTime: typeof action.payload.startTime !== 'string'
                    ? (_f = action.payload.startTime) === null || _f === void 0 ? void 0 : _f.toISOString()
                    : action.payload.startTime,
                refusalTimeOut: action.payload.refusalTimeOut && action.payload.refusalTimeOut,
                interactionId: id,
                showBadge: action.payload.hasUnreadMessage,
                isPrivate: (_g = action.payload.channel) === null || _g === void 0 ? void 0 : _g.isPrivate,
                receivedInInboxTime: new Date().toISOString(),
            };
            state.cxoneInteractions[id] = {
                interactionId: id,
                interactionReceivedTime: action.payload.startTime.toISOString(),
                interactionUpdatedTime: action.payload.startTime.toISOString(),
                selectedContactId: '',
                interactionType: InteractionType.DIGITAL,
                slaIndicator: SLAIndicatorType.NORMAL,
                acdContacts: {},
                digitalContacts: { [action.payload.caseId]: digitalContact },
            };
            if (((_h = action.payload.status) === null || _h === void 0 ? void 0 : _h.toLowerCase()) === 'incoming') {
                state.assignmentPanelMetadata.incommingDfoInteractionId = id;
            }
            else {
                state.assignmentPanelMetadata.incommingDfoInteractionId = '';
            }
            const digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            if (!(Object.keys(digitalState).length && digitalState[id])) {
                digitalState[id] = {};
            }
            digitalState[id][action.payload.caseId] = action.payload;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(handleCaseUnassignedDigitalContactEvent(payload));
         * @returns - this returns state
         */
        handleCaseUnassignedDigitalContactEvent(state, action) {
            var _a, _b, _c, _d;
            delete state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId];
            if (Object.keys(state.cxoneInteractions[action.payload.interactionId].acdContacts).length === 0 && Object.keys(state.cxoneInteractions[action.payload.interactionId].digitalContacts).length === 0) {
                delete state.cxoneInteractions[action.payload.interactionId];
                if (!state.cxoneInteractions || (state.cxoneInteractions && Object.keys(state.cxoneInteractions).length === 0)) {
                    state.assignmentPanelMetadata.selectedInteractionId = '';
                }
            }
            delete state.cxoneDigitalContactUserSavedProperties[action.payload.caseId];
            deleteDigitalContactSavedPropsFromLS(action.payload.caseId);
            const interactionType = getInteractionType(state, action.payload.interactionId);
            if (interactionType !== InteractionType.ELEVATED) {
                const interaction = state.cxoneInteractions[action.payload.interactionId];
                state.cxoneInteractions[action.payload.interactionId].interactionReceivedTime = interactionType === InteractionType.VOICE ? Object.values(interaction.acdContacts)[0].contactReceivedTime : Object.values(interaction.digitalContacts)[0].contactReceivedTime;
            }
            if (action.payload.interactionId && state.cxoneInteractions[action.payload.interactionId] && Object.keys(state.cxoneInteractions[action.payload.interactionId]).length) {
                state.cxoneInteractions[action.payload.interactionId].interactionType = interactionType;
                if (state.cxoneInteractions[action.payload.interactionId].selectedContactId === action.payload.caseId) {
                    if (state.cxoneInteractions[action.payload.interactionId].digitalContacts && Object.keys(state.cxoneInteractions[action.payload.interactionId].digitalContacts).length) {
                        state.cxoneInteractions[action.payload.interactionId].selectedContactId = (_a = Object.values(state.cxoneInteractions[action.payload.interactionId].digitalContacts)[0].caseId) !== null && _a !== void 0 ? _a : '';
                        if (interactionType !== InteractionType.ELEVATED) {
                            Object.values(state.cxoneInteractions[action.payload.interactionId].digitalContacts)[0].elevatedFrom = '';
                        }
                    }
                    else if (state.cxoneInteractions[action.payload.interactionId].acdContacts && Object.keys(state.cxoneInteractions[action.payload.interactionId].acdContacts).length) {
                        state.cxoneInteractions[action.payload.interactionId].selectedContactId = (_b = Object.values(state.cxoneInteractions[action.payload.interactionId].acdContacts)[0].contactId) !== null && _b !== void 0 ? _b : '';
                        if (interactionType !== InteractionType.ELEVATED) {
                            Object.values(state.cxoneInteractions[action.payload.interactionId].acdContacts)[0].elevatedFrom = '';
                        }
                    }
                }
            }
            const cxoneDigitalContactDetails = Object.assign({}, state.cxoneDigitalContactDetails);
            if (cxoneDigitalContactDetails &&
                cxoneDigitalContactDetails[action.payload.interactionId] &&
                cxoneDigitalContactDetails[action.payload.interactionId][action.payload.caseId]) {
                delete cxoneDigitalContactDetails[action.payload.interactionId][action.payload.caseId];
                if (Object.keys(cxoneDigitalContactDetails[action.payload.interactionId]).length === 0) {
                    delete cxoneDigitalContactDetails[action.payload.interactionId];
                }
                state.cxoneDigitalContactDetails = cxoneDigitalContactDetails;
            }
            const translatedMesages = Object.assign({}, state.translatedMessages);
            if (translatedMesages
                && translatedMesages[action.payload.interactionId]
                && translatedMesages[action.payload.interactionId][action.payload.caseId]) {
                delete translatedMesages[action.payload.interactionId][action.payload.caseId];
                if (Object.keys(translatedMesages[action.payload.interactionId]).length === 0) {
                    delete translatedMesages[action.payload.interactionId];
                }
            }
            state.translatedMessages = translatedMesages;
            const updatedDraftMessageNotes = Object.assign({}, state.draftMessageNotes);
            if (updatedDraftMessageNotes[action.payload.interactionId]) {
                delete updatedDraftMessageNotes[action.payload.interactionId];
            }
            state.draftMessageNotes = Object.assign({}, updatedDraftMessageNotes);
            //Will use this common utility method to remove the contact details from LS
            if ((_c = action === null || action === void 0 ? void 0 : action.payload) === null || _c === void 0 ? void 0 : _c.caseId)
                clearContactDetailsFromLocalStorage((_d = action === null || action === void 0 ? void 0 : action.payload) === null || _d === void 0 ? void 0 : _d.caseId); // After unassign will remove the contact details from LS.
            return state;
        },
        /**
         * Updates the selected contact id in an interaction
         * @param state  -InboxState
         * @param action -PayloadAction<Contact>
         * @example - dispatch(setSelectedContactId(interactionId: string, contactId: string))
         */
        setSelectedContactId(state, action) {
            var _a, _b;
            const metadata = state.assignmentPanelMetadata;
            if (action.payload.interactionId && action.payload.contactId) {
                const currentInteraction = state.cxoneInteractions[action.payload.interactionId];
                const isElevatedWithVoice = (currentInteraction === null || currentInteraction === void 0 ? void 0 : currentInteraction.interactionType) === InteractionType.ELEVATED &&
                    Object.keys(currentInteraction === null || currentInteraction === void 0 ? void 0 : currentInteraction.acdContacts).length > 0;
                const isVoiceSelected = (currentInteraction === null || currentInteraction === void 0 ? void 0 : currentInteraction.interactionType) === InteractionType.VOICE || isElevatedWithVoice;
                const isVoiceMailSelected = (currentInteraction === null || currentInteraction === void 0 ? void 0 : currentInteraction.interactionType) === InteractionType.VOICEMAIL;
                const isWorkItemSelected = (currentInteraction === null || currentInteraction === void 0 ? void 0 : currentInteraction.interactionType) === InteractionType.WORKITEM;
                if (metadata.voiceInteractionId && metadata.voiceMailInteractionId) {
                    if (isVoiceSelected) {
                        // If we are switching to a call from a voicemail, pause the voicemail.
                        placeVoiceMailOnPause(state.cxoneVoiceMailContactDetails);
                    }
                    else if (isVoiceMailSelected) {
                        // If we are switching to a voicemail from a call, place the call on hold.
                        placeVoiceCallOnHold(state.cxoneVoiceContactDetails);
                    }
                }
                if (isWorkItemSelected) {
                    const workItemContact = Object.values(currentInteraction === null || currentInteraction === void 0 ? void 0 : currentInteraction.acdContacts)[0];
                    // If switching to a work item contact, update contact status to active.
                    const findWorkItemContactInSlice = state.cxoneWorkItemContacts.find((contact) => contact.contactID === action.payload.contactId);
                    if (workItemContact.contactStatus === WorkItemContactStatus.INTERRUPTED.toLowerCase()) {
                        activateContact(action.payload.contactId);
                    }
                    else if (findWorkItemContactInSlice) {
                        state.cxoneWorkItemContactDetails = findWorkItemContactInSlice;
                    }
                }
                if (currentInteraction && Object.keys(currentInteraction).length) {
                    if (isElevatedWithVoice) {
                        if (Object.values(currentInteraction.acdContacts)[0].contactId.toString() !== action.payload.contactId) {
                            state.cxoneInteractions[action.payload.interactionId].selectedContactId = action.payload.contactId;
                        }
                    }
                    else {
                        state.cxoneInteractions[action.payload.interactionId].selectedContactId = action.payload.contactId;
                    }
                    if (currentInteraction.digitalContacts[action.payload.contactId]) {
                        state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.contactId].showBadge = false;
                    }
                }
                state.activeContactId = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.contactId;
                const eventArgs = {};
                eventArgs.detail = { contactId: (_b = action.payload) === null || _b === void 0 ? void 0 : _b.contactId };
                const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_CONTACT_SELECTION_EVENT, eventArgs);
                window.dispatchEvent(customEvent);
            }
            return state;
        },
        /**
         * Updates the selected interaction in assignment panel
         * @param state  -InboxState
         * @param action -PayloadAction<interactionId>
         * @example - dispatch(setSelectedInteraction(interactionId))
         */
        setSelectedContactRoot(state, action) {
            logger.info('AW-25-setSelectedInteraction', `Setting selected interaction id: ${action.payload}`);
            state.selectedContactId = action.payload;
            return state;
        },
        /**
         * Updates the selected interaction in assignment panel
         * @param state  -InboxState
         * @param action -PayloadAction<interactionId>
         * @example - dispatch(setSelectedInteraction(interactionId))
         */
        setSelectedInteraction(state, action) {
            logger.info('AW-25-setSelectedInteraction', `Setting selected interaction id: ${action.payload}`);
            state.assignmentPanelMetadata.selectedInteractionId = action.payload;
            return state;
        },
        /**
         * Updates the recipient name name for selected digital contact
         * @param state  -InboxState
         * @param action -PayloadAction<customerName>
         * @example - dispatch(updateDigitalRecipientName(Contact))
         */
        updateDigitalRecipientName(state, action) {
            state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].customerName = action.payload.recipientName;
            return state;
        },
        /**
         * Active the selected contact collapse details in customer card box
         * @param state  -InboxState
         * @param action -PayloadAction<Contact>
         * @example - dispatch(setSelectedContact(Contact))
         */
        setActiveCollapse(state, action) {
            return Object.assign(Object.assign({}, state), { contactsActiveCollapse: action.payload });
        },
        /**
         * Updates the selected contact collapse details in customer card box
         * @param state  -InboxState
         * @param action -PayloadAction<Contact>
         * @example - dispatch(setSelectedContact(Contact))
         */
        setUpdateCollapse(state, action) {
            return Object.assign(Object.assign({}, state), { contactsActiveCollapse: state.contactsActiveCollapse.map((values) => values.caseId === action.payload.caseId
                    ? Object.assign(Object.assign({}, values), action.payload.expandedCard) : Object.assign({}, values)) });
        },
        /**
         * Function sets assignmentbox collapsed/expanded state
         * @param state -InboxState
         * @param action -PayloadAction<boolean>
         * @example - dispatch(updateInboxCollapsed(booleanValue))
         */
        updateInboxCollapsed(state, action) {
            var _a, _b, _c;
            let haveCallInInbox = false;
            const isLargeView = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.isLargeView;
            if (isLargeView) {
                const incommingAcdInteractionId = state.assignmentPanelMetadata.incommingAcdInteractionId;
                const incommingDfoInteractionId = state.assignmentPanelMetadata.incommingDfoInteractionId;
                if (incommingAcdInteractionId && state.cxoneInteractions[incommingAcdInteractionId]) {
                    const contact = state.cxoneInteractions[incommingAcdInteractionId].acdContacts[Object.keys(state.cxoneInteractions[incommingAcdInteractionId].acdContacts)[0]];
                    if ((contact === null || contact === void 0 ? void 0 : contact.contactStatus) === VoiceContactStatus.INCOMING)
                        haveCallInInbox = true;
                }
                if (incommingDfoInteractionId && state.cxoneInteractions[incommingDfoInteractionId]) {
                    const contact = state.cxoneInteractions[incommingDfoInteractionId].digitalContacts[Object.keys(state.cxoneInteractions[incommingDfoInteractionId].digitalContacts)[0]];
                    if (contact.contactStatus === DigitalContactStatus.INCOMING)
                        haveCallInInbox = true;
                }
                if (haveCallInInbox) {
                    LocalStorageHelper.setItem(StorageKeys.ISINBOXCOLLAPSED, false);
                    return Object.assign(Object.assign({}, state), { isInboxCollapsed: false });
                }
            }
            LocalStorageHelper.setItem(StorageKeys.ISINBOXCOLLAPSED, (_b = action.payload) === null || _b === void 0 ? void 0 : _b.isInboxCollapsed);
            return Object.assign(Object.assign({}, state), { isInboxCollapsed: (_c = action.payload) === null || _c === void 0 ? void 0 : _c.isInboxCollapsed });
        },
        /**
         * Function that updates digital user saved properties state
         * @param state -InboxState
         * @param action -PayloadAction<CXoneUserSavedProperties>
         * @example - dispatch(updateDigitalUserSavedPropertiesOfACase(CXoneUserSavedProperties))
         */
        updateDigitalUserSavedPropertiesOfACase(state, action) {
            const updatedDigitalContactDetails = Object.assign(Object.assign({}, state.cxoneDigitalContactUserSavedProperties), { [action.payload.caseId]: Object.assign(Object.assign({}, state.cxoneDigitalContactUserSavedProperties[action.payload.caseId]), action.payload.fieldsToUpdate) });
            return Object.assign(Object.assign({}, state), { cxoneDigitalContactUserSavedProperties: updatedDigitalContactDetails });
        },
        /**
         * Function that deletes digital user saved properties state
         * @param state -InboxState
         * @param action -PayloadAction<CaseID>
         * @example - dispatch(deleteDigitalUserSavedPropertiesOfACase(caseId))
         */
        deleteDigitalUserSavedPropertiesOfACase(state, action) {
            const caseId = action.payload;
            const updatedDigitalContactDetails = Object.assign({}, state.cxoneDigitalContactUserSavedProperties);
            delete updatedDigitalContactDetails[caseId];
            return Object.assign(Object.assign({}, state), { cxoneDigitalContactUserSavedProperties: updatedDigitalContactDetails });
        },
        /**
         * Function that replaces digital user saved properties state
         * @param state -InboxState
         * @param action -PayloadAction<CXoneUserSavedProperties>
         * @example - dispatch(updateDigitalUserSavedPropertiesOfACase(CXoneUserSavedProperties))
         */
        replaceDigitalUserSavedPropertiesOfACase(state, action) {
            return Object.assign(Object.assign({}, state), { cxoneDigitalContactUserSavedProperties: Object.assign({}, action.payload) });
        },
        /**
         * Function sets network speed which is calculated as the average latency of last N API calls
         * @param state -InboxState
         * @param action -PayloadAction<number>
         * @example - dispatch(setNetworkSpeed(number))
         */
        setNetworkSpeed(state, action) {
            const networkSpeed = action.payload;
            return Object.assign(Object.assign({}, state), { networkSpeed });
        },
        /**
         * Function to get personal queue
         * @param state -InboxState
         * @param action -PayloadAction<string>
         * @returns - adds personal queue details
         * @example - dispatch(rejectACDCall(string))
         */
        setPersonalQueue(state, action) {
            return Object.assign(Object.assign({}, state), { cxonePersonalQueue: action.payload });
        },
        /**
         * Function to Accept or Reject Call
         * @param state -InboxState
         * @param action -PayloadAction<string>
         * @returns - removes voice interaction from store
         * @example - dispatch(rejectACDCall(string))
         */
        handleAgentLegEventSubscription(state, action) {
            CXoneVoiceClientWrapper.instance.handleAgentLegEvent(action.payload);
            const isCallContactAvailable = CXoneAcdClient.instance.contactManager.checkAcdContactsAvailable();
            if (action.payload.status === AgentLegStatus.DIALING &&
                (state.isAgentLegAutoAcceptEnabled || !isCallContactAvailable)) {
                CXoneVoiceClientWrapper.instance.connectAgentLeg(action.payload.agentLegId);
                return state;
            }
            else {
                return Object.assign(Object.assign({}, state), { agentLegStatus: action.payload.status === AgentLegStatus.DISCONNECTED ? null : action.payload.status, agentLegId: action.payload.status === AgentLegStatus.DISCONNECTED ? '' : action.payload.agentLegId });
            }
        },
        toggleIVRKeyPad: (state, action) => {
            return Object.assign(Object.assign({}, state), { isKeyPadOpen: action.payload });
        },
        /**
         * Used to update the attachments state
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(updateAttachments({
         * [contactId]: parsedList,
         * }))
         * ```
         */
        updateAttachments(state, action) {
            var _a;
            state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].attachments = state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].attachments
                ? (_a = state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].attachments) === null || _a === void 0 ? void 0 : _a.concat(action.payload.attachments) : action.payload.attachments;
            return state;
        },
        /**
         * Used to remove the attachment based on the attachment id received
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(removeAttachment(123456));
         * ```
         */
        removeAttachment(state, action) {
            var _a, _b, _c, _d, _e;
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            const caseId = state.assignmentPanelMetadata.selectedInteractionId && state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId] && Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]).length ? state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId : '';
            if (state.cxoneInteractions[interactionId] && ((_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) && ((_d = (_c = (_b = state.cxoneInteractions[interactionId]) === null || _b === void 0 ? void 0 : _b.digitalContacts[caseId]) === null || _c === void 0 ? void 0 : _c.attachments) === null || _d === void 0 ? void 0 : _d.length)) {
                state.cxoneInteractions[interactionId].digitalContacts[caseId].attachments = (_e = state.cxoneInteractions[interactionId].digitalContacts[caseId].attachments) === null || _e === void 0 ? void 0 : _e.filter((item) => item.id !== action.payload);
            }
            return state;
        },
        /**
         * Used to save if the audio recording is removed from editor
         * @param state - file upload state
         * @param action - action payload
         *  @example - removeAudioRecording(true);
         */
        removeAudioRecording(state, action) {
            var _a, _b, _c, _d;
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            //get case id from selected interaction
            const caseId = state.assignmentPanelMetadata.selectedInteractionId && state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId] && Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]).length ? state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId : '';
            if (state.cxoneInteractions[interactionId] && ((_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) && ((_d = (_c = (_b = state.cxoneInteractions[interactionId]) === null || _b === void 0 ? void 0 : _b.digitalContacts[caseId]) === null || _c === void 0 ? void 0 : _c.attachments) === null || _d === void 0 ? void 0 : _d.length)) {
                state.cxoneInteractions[interactionId].digitalContacts[caseId].isAudioRecordingRemoved = action.payload;
            }
            return state;
        },
        /**
         * Used to save the state of audio recording (inprogress/stopped)
         * @param state - file upload state
         * @param action - action payload
         *  @example - setAudioRecordingState(true);
         */
        setAudioRecordingState(state, action) {
            var _a;
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            //get case id from selected interaction
            const caseId = state.assignmentPanelMetadata.selectedInteractionId && state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId] && Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]).length ? state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId : '';
            if (state.cxoneInteractions[interactionId] && ((_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId])) {
                state.cxoneInteractions[interactionId].digitalContacts[caseId].isRecordingInProgress = action.payload;
            }
            return state;
        },
        /**
         * Used to remove the inline image based on the inline image id received
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(removeInlineImage('123456'));
         * ```
         */
        removeInlineImage(state, action) {
            var _a, _b, _c, _d, _e;
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            const caseId = interactionId && state.cxoneInteractions[interactionId] && Object.keys(state.cxoneInteractions[interactionId]).length ? state.cxoneInteractions[interactionId].selectedContactId : '';
            if (caseId) {
                if ((_b = (_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.inlineImages) {
                    state.cxoneInteractions[interactionId].digitalContacts[caseId].inlineImages =
                        (_e = (_d = (_c = state.cxoneInteractions[interactionId]) === null || _c === void 0 ? void 0 : _c.digitalContacts[caseId]) === null || _d === void 0 ? void 0 : _d.inlineImages) === null || _e === void 0 ? void 0 : _e.filter((item) => item.imageId !== action.payload);
                }
            }
            return state;
        },
        /**
         * Used to update attachment upload status and url
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(updateAttachmentStatusAndUrl({id: 123456, url: "url"}));
         * ```
         */
        updateAttachmentStatusAndUrl(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            const caseId = state.assignmentPanelMetadata.selectedInteractionId && state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId] && Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]).length ? state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId : '';
            if ((_c = (_b = (_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.attachments) === null || _c === void 0 ? void 0 : _c.length) {
                state.cxoneInteractions[interactionId].digitalContacts[caseId].attachments = (_f = (_e = (_d = state.cxoneInteractions[interactionId]) === null || _d === void 0 ? void 0 : _d.digitalContacts[caseId]) === null || _e === void 0 ? void 0 : _e.attachments) === null || _f === void 0 ? void 0 : _f.map((item) => {
                    var _a, _b;
                    return item.id === action.payload.id
                        ? Object.assign(Object.assign({}, item), { uploaded: true, url: (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.url, isInline: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.isInline }) : item;
                });
            }
            if ((_j = (_h = (_g = state.cxoneInteractions[interactionId]) === null || _g === void 0 ? void 0 : _g.digitalContacts[caseId]) === null || _h === void 0 ? void 0 : _h.inlineImages) === null || _j === void 0 ? void 0 : _j.length) {
                state.cxoneInteractions[interactionId].digitalContacts[caseId].inlineImages = (_m = (_l = (_k = state.cxoneInteractions[interactionId]) === null || _k === void 0 ? void 0 : _k.digitalContacts[caseId]) === null || _l === void 0 ? void 0 : _l.inlineImages) === null || _m === void 0 ? void 0 : _m.map((item) => item.id === action.payload.id
                    ? Object.assign(Object.assign({}, item), { uploaded: true, url: action.payload.url, imageId: action.payload.imageId, isInline: true }) : item);
            }
            return state;
        },
        /**
         * Used to remove the attachments for the current selected  contact
         * @param state - assignment state
         * @example -
         * ```
         * dispatch(removeAttachmentsForSelectedContact());
         * ```
         */
        removeAttachmentsForSelectedContact(state, action) {
            var _a, _b, _c, _d, _e, _f;
            if (action.payload.caseId && action.payload.interactionId) {
                if ((_c = (_b = (_a = state.cxoneInteractions[action.payload.interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[action.payload.caseId]) === null || _b === void 0 ? void 0 : _b.attachments) === null || _c === void 0 ? void 0 : _c.length) {
                    state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].attachments = [];
                }
                if ((_f = (_e = (_d = state.cxoneInteractions[action.payload.interactionId]) === null || _d === void 0 ? void 0 : _d.digitalContacts[action.payload.caseId]) === null || _e === void 0 ? void 0 : _e.inlineImages) === null || _f === void 0 ? void 0 : _f.length) {
                    state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].inlineImages = [];
                }
            }
        },
        /**
         * Used to update the inline images state
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(updateInlineImages({
         * [contactId]: parsedList,
         * }))
         * ```
         */
        updateInlineImages(state, action) {
            var _a;
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            const caseId = interactionId && state.cxoneInteractions[interactionId] && Object.keys(state.cxoneInteractions[interactionId]).length ? state.cxoneInteractions[interactionId].selectedContactId : '';
            if (caseId) {
                const selectedtDigitalContact = (_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId];
                if (action.payload.isLoadFromLocalStorage) {
                    //inline images doesn't exist in the state, so directly assigning the payload value
                    selectedtDigitalContact['inlineImages'] = action.payload.inlineImages;
                }
                else {
                    selectedtDigitalContact['inlineImages'] = selectedtDigitalContact.inlineImages
                        ? [...selectedtDigitalContact.inlineImages, ...action.payload.inlineImages]
                        : action.payload.inlineImages;
                }
                state.cxoneInteractions[interactionId].digitalContacts[caseId] = selectedtDigitalContact;
            }
            return state;
        },
        /**
         * Used to update for the files which are not images
         * @param state -assignment state
         * @example
         * ```
         * dispatch(CcfAssignmentAction.updateImageTypeNotSupported(false));
         * ```
         */
        updateImageTypeNotSupported(state, action) {
            const interactionId = state.assignmentPanelMetadata.selectedInteractionId || '';
            const caseId = interactionId && state.cxoneInteractions[interactionId] && Object.keys(state.cxoneInteractions[interactionId]).length ? state.cxoneInteractions[interactionId].selectedContactId : '';
            if (caseId) {
                state.cxoneInteractions[interactionId].digitalContacts[caseId].isImageTypeNotSupported = action.payload;
            }
            return state;
        },
        /**
         * Used to toggle viewDetails for selected contact
         * @param state -assignment state
         * @example
         * ```
         * dispatch(CcfAssignmentAction.toggleViewDetails());
         * ```
         */
        toggleViewDetails(state, action) {
            if (action.payload.caseId && action.payload.interactionId)
                state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].expandedViewDetails = !state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].expandedViewDetails;
            return state;
        },
        /**
         * action to update the slaIndicator flag for the provided casesIds
         * @param state - inbox state
         * @example
         * ```
         * dispatch(CcfAssignmentAction.updateSlaIndicator({'2333': 'normal'}));
         * ```
         */
        updateSlaIndicator(state, action) {
            Object.keys(action.payload).forEach((interactionId) => {
                if (Object.keys(state.cxoneInteractions[interactionId].digitalContacts).length === 1) {
                    state.cxoneInteractions[interactionId].slaIndicator = action.payload[interactionId];
                }
            });
            return state;
        },
        /**
         * Function to Reject Digital Contact
         * @param state -InboxState
         * @param action -PayloadAction<string>
         * @returns - removes voice interaction from store
         * @example - dispatch(rejectACDCall(string))
         */
        removeCXoneDigitalContact(state, action) {
            var _a, _b, _c;
            if (action.payload.interactionId && action.payload.contactId && state.cxoneInteractions[action.payload.interactionId]
                && Object.keys(state.cxoneInteractions[action.payload.interactionId]).length
                && state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.contactId]
                && Object.keys(state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.contactId]).length) {
                delete state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.contactId];
                if (Object.keys(state.cxoneInteractions[action.payload.interactionId].acdContacts).length === 0 && Object.keys(state.cxoneInteractions[action.payload.interactionId].digitalContacts).length === 0) {
                    delete state.cxoneInteractions[action.payload.interactionId];
                    if (!state.cxoneInteractions || (state.cxoneInteractions && Object.keys(state.cxoneInteractions).length === 0)) {
                        state.assignmentPanelMetadata.selectedInteractionId = '';
                        LocalStorageHelper.removeItem(StorageKeys.SELECTED_INTERACTION_ID);
                    }
                }
                delete state.cxoneDigitalContactUserSavedProperties[action.payload.contactId];
                deleteDigitalContactSavedPropsFromLS(action.payload.contactId);
            }
            const interactionType = getInteractionType(state, action.payload.interactionId);
            if (action.payload.interactionId) {
                if (interactionType !== InteractionType.ELEVATED) {
                    state.cxoneInteractions[(_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.interactionId].interactionReceivedTime = interactionType === InteractionType.VOICE ? Object.values(state.cxoneInteractions[action.payload.interactionId].acdContacts)[0].contactReceivedTime : Object.values(state.cxoneInteractions[action.payload.interactionId].digitalContacts)[0].contactReceivedTime;
                }
            }
            if (action.payload.interactionId && state.cxoneInteractions[action.payload.interactionId] && Object.keys(state.cxoneInteractions[action.payload.interactionId]).length) {
                state.cxoneInteractions[action.payload.interactionId].interactionType = interactionType;
                if (state.cxoneInteractions[action.payload.interactionId].selectedContactId === action.payload.contactId) {
                    if (state.cxoneInteractions[action.payload.interactionId].digitalContacts && Object.keys(state.cxoneInteractions[action.payload.interactionId].digitalContacts).length) {
                        state.cxoneInteractions[action.payload.interactionId].selectedContactId = (_b = Object.values(state.cxoneInteractions[action.payload.interactionId].digitalContacts)[0].caseId) !== null && _b !== void 0 ? _b : '';
                        if (interactionType !== InteractionType.ELEVATED) {
                            Object.values(state.cxoneInteractions[action.payload.interactionId].digitalContacts)[0].elevatedFrom = '';
                        }
                    }
                    else if (state.cxoneInteractions[action.payload.interactionId].acdContacts && Object.keys(state.cxoneInteractions[action.payload.interactionId].acdContacts).length) {
                        state.cxoneInteractions[action.payload.interactionId].selectedContactId = (_c = Object.values(state.cxoneInteractions[action.payload.interactionId].acdContacts)[0].contactId) !== null && _c !== void 0 ? _c : '';
                        if (interactionType !== InteractionType.ELEVATED) {
                            Object.values(state.cxoneInteractions[action.payload.interactionId].acdContacts)[0].elevatedFrom = '';
                        }
                    }
                }
            }
            if (action.payload.interactionId === state.assignmentPanelMetadata.incommingDfoInteractionId) {
                state.assignmentPanelMetadata.incommingDfoInteractionId = '';
            }
            return state;
        },
        /**
         * Function adds consulted agent details
         * @param state -InboxState
         * @param action - `PayloadAction<AgentDetails[]>`
         * @example - dispatch(addConsultedAgentsDetails(AgentDetails))
         */
        addConsultedAgentsDetails(state, action) {
            const agentDetail = action.payload[0];
            let consultAgents = [...state.consultedAgents];
            const findAgent = consultAgents.find((agent) => agent.agentId === agentDetail.agentId);
            if (!findAgent) {
                consultAgents = [...consultAgents, ...action.payload];
            }
            return Object.assign(Object.assign({}, state), { consultedAgents: [...consultAgents] });
        },
        /**
         * Function resets incomingContact details
         * @param state -
         * @param action -
         * @example - dispatch(resetIncomingContactDetails())
         */
        resetIncomingContactDetails(state) {
            state.newIncomingContact = null;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(addNewMessageInPublicMessageTree(payload));
         * @returns - updates state with newly arrived message
         */
        addNewMessageInPublicMessageTree(state, action) {
            var _a, _b, _c;
            const digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            const { caseId, newMessage, interactionId } = action.payload;
            const currentContact = digitalState[interactionId][caseId];
            // 1. get exisiting message map of parent child messages
            const exisitingMessageMap = new Map(Object.entries(currentContact.publicMessagesParentChildMap));
            // 2. update map for new message
            const updatedParentChildMap = addNewMessageIntoMap(newMessage, exisitingMessageMap);
            const parentChildMapIterator = updatedParentChildMap === null || updatedParentChildMap === void 0 ? void 0 : updatedParentChildMap.entries();
            if (parentChildMapIterator) {
                for (const item of parentChildMapIterator) {
                    // 3. item[0] => parentId item[1] => all children Id's
                    currentContact.publicMessagesParentChildMap[item[0]] = item[1];
                }
            }
            // 4. here we get array of message id's sorted from child to parent
            let newCommentPath = getNewCommentPath(newMessage.id, newMessage.replyToMessage.id, exisitingMessageMap);
            let targetedMessageObject = {};
            if (newCommentPath.length === 1 && newCommentPath[0] === ((_a = currentContact === null || currentContact === void 0 ? void 0 : currentContact.publicMessagesTree) === null || _a === void 0 ? void 0 : _a.id)) {
                // if replied to original post
                targetedMessageObject = currentContact === null || currentContact === void 0 ? void 0 : currentContact.publicMessagesTree;
            }
            else {
                // so to insert in tree we need to reverse array from parent to child and remove parent entry which is id of original post
                newCommentPath = newCommentPath.reverse().slice(1);
                // identify root level comment of post and assign it to targetMessageObject
                (_c = (_b = currentContact === null || currentContact === void 0 ? void 0 : currentContact.publicMessagesTree) === null || _b === void 0 ? void 0 : _b.children) === null || _c === void 0 ? void 0 : _c.forEach((currentChildren) => {
                    if (newCommentPath[0] === currentChildren.id) {
                        targetedMessageObject = currentChildren;
                    }
                });
            }
            // get message object where we need to insert new message, which initially is original posts children
            newCommentPath.forEach((currentMessageId) => {
                var _a;
                const childObj = (_a = targetedMessageObject === null || targetedMessageObject === void 0 ? void 0 : targetedMessageObject.children) === null || _a === void 0 ? void 0 : _a.find((children) => currentMessageId === children.id);
                if (childObj) {
                    targetedMessageObject = childObj;
                }
            });
            if (targetedMessageObject && targetedMessageObject.children) {
                newMessage['children'] = [];
                // we are adding toggle false for view more message functionality
                newMessage.toggle = false;
                targetedMessageObject.children.push(newMessage);
            }
            digitalState[interactionId][caseId] = currentContact;
            state.cxoneDigitalContactDetails = Object.assign({}, digitalState);
            state.isNewMessageAdded = newMessage.id;
            return state;
        },
        /**
         * @param state - CxOneDigitalEventState
         * @example - dispatch(viewMoreMessagesInPublicMessageTree(payload));
         * @returns - updates state with additional message toggle flag to true
         */
        viewMoreMessagesInPublicMessageTree(state, action) {
            var _a, _b, _c, _d, _e;
            let activeContact;
            if (state.assignmentPanelMetadata.selectedInteractionId && state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId] && Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]).length) {
                const selectedContactId = state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId].selectedContactId;
                if (selectedContactId && ((_a = state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[selectedContactId]) && Object.keys((_b = state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]) === null || _b === void 0 ? void 0 : _b.digitalContacts[selectedContactId]).length) {
                    activeContact = (_c = state.cxoneInteractions[state.assignmentPanelMetadata.selectedInteractionId]) === null || _c === void 0 ? void 0 : _c.digitalContacts[selectedContactId];
                }
            }
            let digitalState = {};
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) && activeContact.interactionId) {
                const currentContact = digitalState[activeContact.interactionId][activeContact.caseId];
                const parentChildMessages = Object.assign(Object.assign({}, currentContact.publicMessagesTree), { children: (_e = (_d = currentContact === null || currentContact === void 0 ? void 0 : currentContact.publicMessagesTree) === null || _d === void 0 ? void 0 : _d.children) === null || _e === void 0 ? void 0 : _e.map((publicMessage) => {
                        var _a;
                        publicMessage.children = (_a = publicMessage === null || publicMessage === void 0 ? void 0 : publicMessage.children) === null || _a === void 0 ? void 0 : _a.map((child) => {
                            const newChild = Object.assign({}, child);
                            if (newChild.id === action.payload.messageId)
                                newChild.toggle = !newChild.toggle;
                            return newChild;
                        });
                        return Object.assign({}, publicMessage);
                    }) });
                currentContact.publicMessagesTree = parentChildMessages;
                digitalState[activeContact.interactionId][activeContact.caseId] = currentContact;
            }
            state.cxoneDigitalContactDetails = Object.assign({}, digitalState);
            return state;
        },
        /**Used to delete the draft message from the draft message array for the casedId provided
         * @param state - inbox state
         * @param action - `PayloadAction<{ interactionId: string; caseId: string; messageDraftId: string }>`
         * @example -
         * ```
         * dispatch(deleteDraftMessage({interactionId: '12', caseId: '123', messageDraftId: '456'}));
         * ```
         */
        deleteDraftMessage(state, action) {
            var _a;
            const { interactionId, caseId, draftMessageId: messageDraftId } = action.payload;
            let digitalState = {};
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            // this will filter out the draft message which needs to be deleted
            const filteredMessageDrafts = (_a = state.cxoneDigitalContactDetails[interactionId][caseId].messageDrafts) === null || _a === void 0 ? void 0 : _a.filter((item) => item.id !== messageDraftId);
            digitalState[interactionId][caseId].messageDrafts = filteredMessageDrafts;
            state.cxoneDigitalContactDetails = Object.assign({}, digitalState);
            return state;
        },
        /**Used to update reaction details
    * @param state - inbox state
    * @param action - `PayloadAction<{interactionId: string; caseId: string; messageId: string, isSelected: boolean, reactionType: ReactionType }>`
    * @example -
    * ```
    * dispatch(updateReactionDetails({interactionId: '23'; caseId: '21'; messageId: '67677', isSelected: true, reactionType: like }));
    * ```
    */
        updateReactionDetails(state, action) {
            var _a, _b, _c, _d;
            const { interactionId, caseId, messageId, isSelected, reactionType } = action.payload;
            const digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            // this will get selected message
            const filteredMessage = (_a = digitalState[interactionId][caseId].messages) === null || _a === void 0 ? void 0 : _a.find((message) => message.id === messageId);
            const updatedMessage = Object.assign(Object.assign({}, filteredMessage), { reactionStatistics: Object.assign(Object.assign({}, filteredMessage === null || filteredMessage === void 0 ? void 0 : filteredMessage.reactionStatistics), { isSharedByChannel: reactionType === ReactionType.SHARE ? isSelected : (_b = filteredMessage === null || filteredMessage === void 0 ? void 0 : filteredMessage.reactionStatistics) === null || _b === void 0 ? void 0 : _b.isSharedByChannel, isLikedByChannel: reactionType === ReactionType.LIKE ? isSelected : (_c = filteredMessage === null || filteredMessage === void 0 ? void 0 : filteredMessage.reactionStatistics) === null || _c === void 0 ? void 0 : _c.isSharedByChannel }) });
            digitalState[interactionId][caseId].messages = (_d = digitalState[interactionId][caseId].messages) === null || _d === void 0 ? void 0 : _d.map((message) => message.id === messageId ? updatedMessage : message);
            state.cxoneDigitalContactDetails = Object.assign({}, digitalState);
            return state;
        },
        /**
      * Function change  hide/unhide flag
      * @param state - inbox state
      * @param action - action - `PayloadAction<{interactionId: string; caseId: string; messageId: string, isHidden: boolean }>`
      * @example - dispatch(toggleMessageHide())
      */
        toggleMessageHide(state, action) {
            var _a, _b;
            const { interactionId, caseId, messageId, isHidden } = action.payload;
            // this will get selected message
            const filteredMessage = (_a = state.cxoneDigitalContactDetails[interactionId][caseId].messages) === null || _a === void 0 ? void 0 : _a.find((message) => message.id === messageId);
            const updatedMessage = Object.assign(Object.assign({}, filteredMessage), { isHiddenOnExternalPlatform: !isHidden });
            state.cxoneDigitalContactDetails[interactionId][caseId].messages = (_b = state.cxoneDigitalContactDetails[interactionId][caseId].messages) === null || _b === void 0 ? void 0 : _b.map((message) => message.id === messageId ? updatedMessage : message);
        },
        /**
      * Function change delete message
      * @param state - inbox state
      * @param action  - `PayloadAction<{interactionId: string; caseId: string; messageId: string, isDeleted: boolean }>`
      * @example - dispatch(toggleMessageDelete())
      */
        toggleMessageDelete(state, action) {
            var _a, _b;
            const { interactionId, caseId, messageId, isDeleted } = action.payload;
            // this will get selected message
            const filteredMessage = (_a = state.cxoneDigitalContactDetails[interactionId][caseId].messages) === null || _a === void 0 ? void 0 : _a.find((message) => message.id === messageId);
            const updatedMessage = Object.assign(Object.assign({}, filteredMessage), { isDeletedOnExternalPlatform: !isDeleted });
            state.cxoneDigitalContactDetails[interactionId][caseId].messages = (_b = state.cxoneDigitalContactDetails[interactionId][caseId].messages) === null || _b === void 0 ? void 0 : _b.map((message) => message.id === messageId ? updatedMessage : message);
        },
        /**
      * Function update the content or author name delete details
      * @param state - inbox state
      * @param action  - `PayloadAction<{interactionId: string; caseId: string; messageId: string, isContentORAuthorName: boolean, isPreviousCaseMessage?: boolean }>`
      * @example - dispatch(updateMessageContentORAuthorNameDelete('1234','4566','7899',true, false))
      */
        updateMessageContentORAuthorNameDelete(state, action) {
            var _a;
            const { interactionId, caseId, messageId, isContentORAuthorName, isPreviousCaseMessage, isNextCaseMessage } = action.payload;
            const removedDetails = { reason: 'GDPR', removedAt: new Date().toISOString() };
            const { previousConversationMessages, messages, nextConversationMessages } = (_a = state.cxoneDigitalContactDetails[interactionId][caseId]) !== null && _a !== void 0 ? _a : {};
            // Dev comment : - we are maintaining the previous case and current case messages in separate array hence we need to update the message in respective array.
            if (isPreviousCaseMessage) {
                state.cxoneDigitalContactDetails[interactionId][caseId].previousConversationMessages =
                    updateConversationMessages(previousConversationMessages, messageId, isContentORAuthorName, removedDetails);
            }
            else if (isNextCaseMessage) {
                state.cxoneDigitalContactDetails[interactionId][caseId].nextConversationMessages =
                    updateConversationMessages(nextConversationMessages, messageId, isContentORAuthorName, removedDetails);
            }
            else {
                state.cxoneDigitalContactDetails[interactionId][caseId].messages = messages === null || messages === void 0 ? void 0 : messages.map((message) => {
                    return message.id === messageId ? Object.assign(Object.assign({}, message), { authorNameRemoved: isContentORAuthorName === MessageKebabMenu.DELETE_AUTHOR_NAME ? removedDetails : message.authorNameRemoved, contentRemoved: isContentORAuthorName === MessageKebabMenu.DELETE_CONTENT ? removedDetails : message.contentRemoved }) : message;
                });
            }
        },
        /**
      * Function to update message action response
      * @param state - inbox state
      * @param action -  `PayloadAction<MessageActionResponse>`
      * @example - dispatch(updateMessageActionResponse())
      */
        updateMessageActionResponse: (state, action) => {
            return Object.assign(Object.assign({}, state), { messageActionResponse: action.payload });
        },
        /**
      * Function to spinner for digital message tag
      * @param state - inbox state
      * @param action -  `PayloadAction<showDigitalTagLoading>`
      * @example - dispatch(showDigitalTagLoading())
      */
        showDigitalTagLoading: (state, action) => {
            state.digitalTagLoading = action.payload;
        },
        /**
        * Function to clear message action response
        * @param state - inbox state
        * @example - dispatch(clearMessageActionResponse())
        */
        clearMessageActionResponse: (state) => {
            return Object.assign(Object.assign({}, state), { messageActionResponse: {} });
        },
        /**
         * Toggles the value of  cold transfer flag
         * @param state -
         * @param action -
         * @example - dispatch(toggleColdTransferFlag(state, action: PayloadAction<boolean>))
         */
        toggleColdTransferFlag(state, action) {
            state.isColdTransfer = action.payload;
        },
        /**
      * Function to set new message tag added
      * @param state - inbox state
      * @param action -  `PayloadAction<boolean>`
      * @example - dispatch(setDigitalTagAddedState())
      */
        setDigitalTagAddedState: (state, action) => {
            return Object.assign(Object.assign({}, state), { newDigitalTagAddedDetails: action.payload });
        },
        /**
      * Function to set digital tag error state
      * @param state - inbox state
      * @param action -  `PayloadAction<boolean>`
      * @example - dispatch(setDigitalTagErrorState())
      */
        setDigitalTagErrorState: (state, action) => {
            return Object.assign(Object.assign({}, state), { digitalMessageTagError: action.payload });
        },
        /* Function to store position of digital tag popover
      * @param state - inbox state
      * @param action -  `PayloadAction<digitalTagPopOverPositionAttributes>`
      * @example - dispatch(setDigitalTagsPopOverState())
      */
        setDigitalTagsPopOverState: (state, action) => {
            return Object.assign(Object.assign({}, state), { digitalTagPopOverPosition: action.payload });
        },
        /* Function to set expanded state of digital message tags
      * @param state - inbox state
      * @param action -  `PayloadAction<boolean>`
      * @example - dispatch(setDigitalTagsExpandedState())
      */
        setDigitalTagsExpandedState: (state, action) => {
            return Object.assign(Object.assign({}, state), { isDigitalTagsExpanded: action.payload });
        },
        /**
        * This method is to update total tags to max 100
        
        *
        * @returns state
        * @example - setMax100DigitalTags(state)
        **/
        setMax100DigitalTags(state) {
            state.digitalMessageTags = state.digitalMessageTags.slice(0, 100);
            let totalPages = Math.floor(state.digitalMessageTags.length / 50);
            totalPages = state.digitalMessageTags.length % 50 === 0 ? totalPages : totalPages + 1;
            state.digitalMessageTagsCurrentPage = totalPages;
        },
        /**
        * This method is to update the status of message note for the selected digital case
        in  conversation entity
        * @param caseId - selected caseId for cotact
        * @param interactionId - selected interactionId for caseId
        * @param status - boolean value to update note state
        * @returns conversationNote for selected case
        * @example - updateContactMessageNoteStatus(MessageNoteAttributes)
        **/
        updateContactMessageNoteStatus(state, action) {
            const { interactionId, caseId, isNoteOpen, content, noteId } = action.payload;
            if (isNoteOpen !== undefined) {
                if (!state.draftMessageNotes[interactionId]) {
                    state.draftMessageNotes[interactionId] = {};
                    state.draftMessageNotes[interactionId][caseId] = {
                        status: isNoteOpen,
                        content: content || '',
                        noteId,
                    };
                }
                else {
                    const conversationNote = state.draftMessageNotes[interactionId][caseId];
                    const updatedNote = Object.assign(Object.assign({}, conversationNote), { status: isNoteOpen, content: content || '', noteId });
                    state.draftMessageNotes[interactionId][caseId] = updatedNote;
                }
                state.updatedNoteValue = `${isNoteOpen}`;
            }
        },
        /**
         * This method used to update the content or message of the note set against the case
        * @param caseId - selected caseId for cotact
        * @param interactionId - selected interactionId for caseId
        * @param content - string value to update note content
        * * @example -updateContactMessageNoteContent(MessageNoteAttributes)
        */
        updateContactMessageNoteContent(state, action) {
            const { interactionId, caseId, content } = action.payload;
            const conversationNote = state.draftMessageNotes[interactionId][caseId];
            const updatedNote = Object.assign(Object.assign({}, conversationNote), { content: content ? content : '' });
            state.draftMessageNotes[interactionId][caseId] = updatedNote;
            state.updatedNoteValue = updatedNote.content;
        },
        /**
         * This method used to update the error state of the note set against the case
        * @param caseId - selected caseId for cotact
        * @param interactionId - selected interactionId for caseId
        * @param hasError - string value to update note content
        * @example -updateContactMessageNoteErrorState(MessageNoteAttributes)
        */
        updateContactMessageNoteErrorState(state, action) {
            const { interactionId, caseId, hasError } = action.payload;
            const conversationNote = state.draftMessageNotes[interactionId][caseId];
            const updatedNote = Object.assign(Object.assign({}, conversationNote), { hasError });
            state.updatedNoteValue = `hasError:${hasError}`;
            state.draftMessageNotes[interactionId][caseId] = updatedNote;
        },
        /**
         * Sets the isRead flag to true for selected digital contact
         * @param state -
         * @param action -
         * @example - dispatch(updateReadStatusForSelectedDigitalContact(state, action: PayloadAction\<\{intereactionId: string, caseId: string\}\>))
         */
        updateReadStatusForSelectedDigitalContact(state, action) {
            var _a;
            state.cxoneDigitalContactDetails[action.payload.interactionId][action.payload.caseId].hasUnreadMessage = false;
            (_a = state.cxoneDigitalContactDetails[action.payload.interactionId][action.payload.caseId].messages) === null || _a === void 0 ? void 0 : _a.every(message => message.isRead = true);
            state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].hasUnreadMessage = false;
            state.cxoneInteractions[action.payload.interactionId].digitalContacts[action.payload.caseId].showBadge = false;
        },
        /**
         * Sets the coBrowse related data to digital contact
         * @param state -
         * @param action -
         * @example - dispatch(updateCoBrowseStatus(state, action: PayloadAction\<\{intereactionId: string, caseId: string\,url: string\}\>))
         */
        updateCoBrowseStatus(state, action) {
            state.cxoneDigitalContactDetails[action.payload.interactionId][action.payload.caseId].isCoBrowseEnabled = true;
            state.cxoneDigitalContactDetails[action.payload.interactionId][action.payload.caseId].coBrowseLink = action.payload.url;
        },
        /**
         * Function that adds previous case conversation in redux
         * @param caseId - caseId for selected contact
         * @param interactionId - interactionId for selected contact
         * @example updatePreviousCaseConversations(state,action)
         */
        updatePreviousCaseConversations(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            let digitalState = {};
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            const previousConversations = (_c = digitalState[(_a = action.payload) === null || _a === void 0 ? void 0 : _a.interactionId][(_b = action.payload) === null || _b === void 0 ? void 0 : _b.caseId]) === null || _c === void 0 ? void 0 : _c.previousConversationMessages;
            if ((previousConversations === null || previousConversations === void 0 ? void 0 : previousConversations.length) > 0) {
                digitalState[(_d = action === null || action === void 0 ? void 0 : action.payload) === null || _d === void 0 ? void 0 : _d.interactionId][(_e = action === null || action === void 0 ? void 0 : action.payload) === null || _e === void 0 ? void 0 : _e.caseId].previousConversationMessages = [(_f = action === null || action === void 0 ? void 0 : action.payload) === null || _f === void 0 ? void 0 : _f.detail, ...previousConversations];
            }
            else {
                digitalState[(_g = action === null || action === void 0 ? void 0 : action.payload) === null || _g === void 0 ? void 0 : _g.interactionId][(_h = action === null || action === void 0 ? void 0 : action.payload) === null || _h === void 0 ? void 0 : _h.caseId].previousConversationMessages = [(_j = action === null || action === void 0 ? void 0 : action.payload) === null || _j === void 0 ? void 0 : _j.detail];
            }
            state.cxoneDigitalContactDetails = digitalState;
            return state;
        },
        /**
         * Function that adds next case conversation in redux
         * @param caseId - caseId for selected contact
         * @param interactionId - interactionId for selected contact
         * @example updateNextCaseConversations(state,action)
         */
        updateNextCaseConversations(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            let digitalState = {};
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            const nextConversations = (_c = digitalState[(_a = action.payload) === null || _a === void 0 ? void 0 : _a.interactionId][(_b = action.payload) === null || _b === void 0 ? void 0 : _b.caseId]) === null || _c === void 0 ? void 0 : _c.nextConversationMessages;
            if ((nextConversations === null || nextConversations === void 0 ? void 0 : nextConversations.length) > 0) {
                digitalState[(_d = action === null || action === void 0 ? void 0 : action.payload) === null || _d === void 0 ? void 0 : _d.interactionId][(_e = action === null || action === void 0 ? void 0 : action.payload) === null || _e === void 0 ? void 0 : _e.caseId].nextConversationMessages = [(_f = action === null || action === void 0 ? void 0 : action.payload) === null || _f === void 0 ? void 0 : _f.detail, ...nextConversations];
            }
            else {
                digitalState[(_g = action === null || action === void 0 ? void 0 : action.payload) === null || _g === void 0 ? void 0 : _g.interactionId][(_h = action === null || action === void 0 ? void 0 : action.payload) === null || _h === void 0 ? void 0 : _h.caseId].nextConversationMessages = [(_j = action === null || action === void 0 ? void 0 : action.payload) === null || _j === void 0 ? void 0 : _j.detail];
            }
            state.cxoneDigitalContactDetails = digitalState;
            return state;
        },
        /**
         * Function that stores previous caseId in redux
         * @param previousCaseId - previousCaseId for selected contact
         * @example updatePreviousAndNextCaseIdForSelectedContact(state,action)
         */
        updatePreviousAndNextCaseIdForSelectedContact(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            let digitalState = {};
            digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            //check if previous conversation messages are already there
            const existingPreviousData = digitalState[(_a = action.payload) === null || _a === void 0 ? void 0 : _a.interactionId][(_b = action.payload) === null || _b === void 0 ? void 0 : _b.caseId].previousConversationMessages;
            //check if we have previous caseId already in previous conversation messages, if yes then don't store it again
            //if not then store it
            const isPrevious = existingPreviousData === null || existingPreviousData === void 0 ? void 0 : existingPreviousData.find(item => { var _a, _b; return ((_a = item === null || item === void 0 ? void 0 : item.case) === null || _a === void 0 ? void 0 : _a.id) === ((_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.previousCaseId); });
            //check if next conversation messages are already there
            const existingNextData = digitalState[(_c = action.payload) === null || _c === void 0 ? void 0 : _c.interactionId][(_d = action.payload) === null || _d === void 0 ? void 0 : _d.caseId].nextConversationMessages;
            //check if we have next caseId already in next conversation messages, if yes then don't store it again
            //if not then store it
            const isNext = existingNextData === null || existingNextData === void 0 ? void 0 : existingNextData.find(item => { var _a, _b; return ((_a = item === null || item === void 0 ? void 0 : item.case) === null || _a === void 0 ? void 0 : _a.id) === ((_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.nextCaseId); });
            if (!isPrevious) {
                digitalState[(_e = action.payload) === null || _e === void 0 ? void 0 : _e.interactionId][(_f = action.payload) === null || _f === void 0 ? void 0 : _f.caseId].previousCaseId = (_g = action === null || action === void 0 ? void 0 : action.payload) === null || _g === void 0 ? void 0 : _g.previousCaseId;
            }
            if (!isNext) {
                digitalState[(_h = action.payload) === null || _h === void 0 ? void 0 : _h.interactionId][(_j = action.payload) === null || _j === void 0 ? void 0 : _j.caseId].nextCaseId = (_k = action === null || action === void 0 ? void 0 : action.payload) === null || _k === void 0 ? void 0 : _k.nextCaseId;
            }
            state.cxoneDigitalContactDetails = digitalState;
            return state;
        },
        /**
         * sets the failed to send message from interaction space into redux state
         * @param state  -InboxState
         * @param action -PayloadAction(caseId: string, xTraceId: string,  sendReplyObj?: CXoneDigitalReplyRequest, messageAuthor: string, draftMessageForApproval?: CXoneDigitalCreateDraftRequest)
         * @example - dispatch(setInteractionFailedMessage(caseId, xTraceId, sendReplyObj, messageAuthor, draftMessageForApproval))
         */
        setInteractionFailedMessage(state, action) {
            const { caseId, sendReplyObj, xTraceId, messageAuthor, draftMessageForApproval, wysiwygEnabled, fromAddress } = action.payload;
            const failedMessageObject = {
                sendReplyObj,
                xTraceId,
                parentId: '',
                messageAuthor,
                draftMessageForApproval,
                wysiwygEnabled,
                fromAddress,
            };
            const digitalState = Object.assign({}, state.cxoneDigitalContactDetails);
            const interactionFailedMessages = state.interactionFailedMessages[caseId] || [];
            interactionFailedMessages.push(failedMessageObject);
            state.interactionFailedMessages[caseId] = interactionFailedMessages;
            state.cxoneDigitalContactDetails = digitalState;
            return state;
        },
        /**
         * Toggles the value of  external directory transfer flag
         * @param state -
         * @param action -
         * @example - dispatch(setExternalDirectoryTransfer(state, action: PayloadAction<boolean>))
         */
        setExternalDirectoryTransfer(state, action) {
            state.isExternalDirectoryTransfer = action.payload;
        },
        /**
         * removes the failed to send message from interaction space
         * @param state  -InboxState
         * @param action -PayloadAction(caseId: string, failedXTraceId: string)
         * @example - dispatch(setInteractionFailedMessage(caseId, xTraceId))
         */
        removeInteractionFailedMessage(state, action) {
            var _a, _b;
            const interactionFailedMessages = state.interactionFailedMessages[(_a = action.payload) === null || _a === void 0 ? void 0 : _a.caseId] || [];
            const indexToRemoveOfFailedMessage = interactionFailedMessages.findIndex((failedMessageObject) => failedMessageObject.xTraceId === action.payload.failedXTraceId);
            // after successfult retry of failed messages we will remove that failed message from interactionFailedMessages array 
            interactionFailedMessages.splice(indexToRemoveOfFailedMessage, 1);
            state.interactionFailedMessages[(_b = action.payload) === null || _b === void 0 ? void 0 : _b.caseId] = interactionFailedMessages;
            return state;
        },
        /**
         * copies the failed messages if any from indexedDB on page reload
         * @param state  -InboxState
         * @param action -PayloadAction<FailedMessageDetails>
         * @example - dispatch(copyFailedMessagesFromIndexedDB())
         */
        copyFailedMessagesFromIndexedDB(state, action) {
            state.interactionFailedMessages = action === null || action === void 0 ? void 0 : action.payload;
            return state;
        },
        /**
         * set the threadid to store
         * @param state  -InboxState
         * @param action -PayloadAction<threadId>
         * @example - dispatch(setThreadId("52e41b89-43ec-4eab-88b4-2ad7b7d43341"))
         */
        setThreadId(state, action) {
            state.activeThreadId = action === null || action === void 0 ? void 0 : action.payload;
            return state;
        },
        /* Function to set true if there is active conference
      * @param state - inbox state
      * @param action -  `PayloadAction<boolean>`
      * @example - dispatch(setIsActiveConference())
      */
        setIsActiveConference: (state, action) => {
            return Object.assign(Object.assign({}, state), { callConferenceDetails: Object.assign(Object.assign({}, state.callConferenceDetails), { isActiveConference: action.payload }) });
        },
        /* Function to set the users in conference
      * @param state - inbox state
      * @param action -  `PayloadAction<Participant[]>`
      * @example - dispatch(setUsersInConference())
      */
        setUsersInConference: (state, action) => {
            return Object.assign(Object.assign({}, state), { callConferenceDetails: Object.assign(Object.assign({}, state.callConferenceDetails), { usersInConference: action.payload }) });
        },
        /* Function to set the users in consult
      * @param state - inbox state
      * @param action -  `PayloadAction<Participant[]>`
      * @example - dispatch(setUsersInConsult())
      */
        setUsersInConsult: (state, action) => {
            return Object.assign(Object.assign({}, state), { callConferenceDetails: Object.assign(Object.assign({}, state.callConferenceDetails), { userInConsult: action.payload }) });
        },
        /* Function to set the response from the translation api
      * @param state - inbox state
      * @param action -  `PayloadAction<{caseId: string, interactionId: string, translatedMessage: CXoneMessageWithTranslation}>`
      * @example - dispatch(setTranslatedMessages(
      *   {caseid: '', interactionId: '', translatedMessage: {id: '', translatedMessage: '', translationError: false}}))
      */
        setTranslatedMessages: (state, action) => {
            let translations = [action.payload.translatedMessage];
            if (state.translatedMessages[action.payload.interactionId]) {
                if (state.translatedMessages[action.payload.interactionId][action.payload.caseId])
                    translations = state.translatedMessages[action.payload.interactionId][action.payload.caseId]
                        .filter(translatedMessage => translatedMessage.id !== action.payload.translatedMessage.id).concat(action.payload.translatedMessage);
                return Object.assign(Object.assign({}, state), { translatedMessages: Object.assign(Object.assign({}, state.translatedMessages), { [action.payload.interactionId]: Object.assign(Object.assign({}, state.translatedMessages[action.payload.interactionId]), { [action.payload.caseId]: translations }) }) });
            }
            else {
                return Object.assign(Object.assign({}, state), { translatedMessages: Object.assign(Object.assign({}, state.translatedMessages), { [action.payload.interactionId]: {
                            [action.payload.caseId]: translations,
                        } }) });
            }
        },
        setTranslationSettings: (state, action) => {
            const { caseId, interactionId, translationSettings } = action.payload;
            if (state.translationSettings[interactionId]) {
                return Object.assign(Object.assign({}, state), { translationSettings: Object.assign(Object.assign({}, state.translationSettings), { [interactionId]: Object.assign(Object.assign({}, state.translationSettings[interactionId]), { [caseId]: Object.assign(Object.assign({}, state.translationSettings[interactionId][caseId]), translationSettings) }) }) });
            }
            else {
                return Object.assign(Object.assign({}, state), { translationSettings: Object.assign(Object.assign({}, state.translationSettings), { [interactionId]: {
                            [caseId]: translationSettings,
                        } }) });
            }
        },
        /**
         * Function to add the message in state
         * @param state -inbox state
         * @param action - PayloadAction<PushNewMessagePayload>
         * @returns updated state
         */
        addNewDraftMessageToInteraction: (state, action) => {
            const { caseId, message } = action.payload;
            if (!state.interactionDraftMessages[caseId]) {
                state.interactionDraftMessages[caseId] = [];
            }
            if (message)
                state.interactionDraftMessages[caseId].push(message);
        },
        /**
       * Function to update the message status in state
       * @param state -inbox state
       * @param action - PayloadAction<PushNewMessagePayload>
       * @returns updated state
       */
        updateInteractionDraftMessageStatusToSent: (state, action) => {
            const { caseId, traceId } = action.payload;
            const messages = state.interactionDraftMessages[caseId];
            if (messages) {
                const newMessages = messages.map((message) => message.xTraceId === traceId
                    ? Object.assign(Object.assign({}, message), { sentStatus: MessageSendStatusType.SENT }) : message);
                return Object.assign(Object.assign({}, state), { interactionDraftMessages: Object.assign(Object.assign({}, state.interactionDraftMessages), { [caseId]: newMessages }) });
            }
            return state;
        },
        /**
         * Function to remove the message from state
         * @param state -inbox state
         * @param action - PayloadAction<PushNewMessagePayload>
         * @returns updated state
         */
        removeDraftMessageFromInteractionState: (state, action) => {
            const { caseId, traceId } = action.payload;
            let messages = state.interactionDraftMessages[caseId];
            if (messages) {
                messages = messages === null || messages === void 0 ? void 0 : messages.filter((message) => message.xTraceId !== traceId);
                return Object.assign(Object.assign({}, state), { interactionDraftMessages: Object.assign(Object.assign({}, state.interactionDraftMessages), { [caseId]: messages }) });
            }
            return state;
        },
        /**
         * Function to set flag setContactHistoryInIndexDb
         * @param state -inbox state
         * @param action - PayloadAction<boolean>
         * @returns updated setContactHistoryInIndexDb
         * @example - dispatch(setContactHistoryInIndexDbFlag(true))
         */
        setContactHistoryInIndexDbFlag: (state, action) => {
            state.setContactHistoryInIndexDb = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(switchAgentUser.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { callConferenceDetails: Object.assign(Object.assign({}, state.callConferenceDetails), { tileDirection: !state.callConferenceDetails.tileDirection }) });
        })
            .addCase(agentLegAutoAcceptEnabledPermission.fulfilled, (state, successResponse) => {
            state.isAgentLegAutoAcceptEnabled = successResponse.payload;
        })
            .addCase(agentLegAutoAcceptEnabledPermission.rejected, (state) => {
            state.isAgentLegAutoAcceptEnabled = false;
        })
            .addCase(rejectIncomingDigitalContact.fulfilled, (state, response) => {
            if (response.meta.arg.interactionId && state.cxoneInteractions[response.meta.arg.interactionId])
                state.cxoneInteractions[response.meta.arg.interactionId].digitalContacts[response.meta.arg.interactionId].isContactRejected = true;
        })
            .addCase(acceptIncomingDigitalContact.fulfilled, (state, response) => {
            if (response.meta.arg.interactionId && state.cxoneInteractions[response.meta.arg.interactionId])
                state.cxoneInteractions[response.meta.arg.interactionId].digitalContacts[response.meta.arg.interactionId].isContactAccepted = true;
        })
            .addCase(getDigitalMessageTag.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { digitalMessageTags: action.payload });
        })
            .addCase(getDigitalMessageTagsByPageNumber.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { digitalMessageTags: state.digitalMessageTags.concat(action.payload.data.data), digitalMessageTagsCount: action.payload.data.hits });
        })
            .addCase(searchDigitalMessageTagByName.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { digitalMessageTagsByName: action.payload });
        })
            .addCase(addDigitalMessageTag.rejected, (state) => {
            state.digitalMessageTagError = true;
            state.digitalTagLoading = false;
        })
            .addCase(removeDigitalMessageTag.rejected, (state) => {
            state.digitalMessageTagError = true;
            state.digitalTagLoading = false;
        })
            .addCase(addDigitalMessageTag.fulfilled, (state) => {
            state.digitalMessageTagError = false;
            state.digitalTagLoading = false;
        })
            .addCase(removeDigitalMessageTag.fulfilled, (state) => {
            state.digitalMessageTagError = false;
            state.digitalTagLoading = false;
        })
            .addCase(getConsultingAgentDetails.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { inboundCallingAgentInfo: action.payload });
        })
            .addCase(voiceBioHubAgentLogin.rejected, (state) => {
            state.cxoneVoiceBioHubData.voiceBioHubStatus = 'loginError';
            state.cxoneVoiceBioHubData.voiceBioHubStatusMessage = 'Agent login failed';
        })
            .addCase(getVoiceBioHubData.rejected, (state) => {
            state.cxoneVoiceBioHubData.voiceBioHubStatus = 'error';
            state.cxoneVoiceBioHubData.voiceBioHubStatusMessage = 'Reason: Voice bio hub currently not available';
        });
    },
});
export const CcfAssignmentAction = AssignmentSlice.actions;
export const CcfAssignmentReducer = AssignmentSlice.reducer;
/**
 * Places a voice call on hold
 * @param voiceContact -CXoneVoiceContact
 * @example - placeVoiceCallOnHold()
 */
const placeVoiceCallOnHold = (voiceContact) => {
    var _a;
    if (((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === CallContactEventStatus.ACTIVE.toLowerCase()) {
        voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.hold().then(() => {
            logger.trace('[CcfAssignmentPanelSlice][placeVoiceCallOnHold]', 'Call placed on hold');
        }).catch(() => {
            logger.trace('[CcfAssignmentPanelSlice][placeVoiceCallOnHold]', 'Call call failed to hold');
        });
    }
};
/**
 * Pauses a voicemail
 * @param voiceContact -CXoneVoiceMailContact
 * @example - voiceMailContact()
 */
const placeVoiceMailOnPause = (voiceMailContact) => {
    var _a;
    if (((_a = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === CallContactEventStatus.ACTIVE.toLowerCase()) {
        voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.pause().then(() => {
            logger.trace('[CcfAssignmentPanelSlice][placeVoiceMailOnPause]', 'Voicemail paused');
        }).catch(() => {
            logger.trace('[CcfAssignmentPanelSlice][placeVoiceMailOnPause]', 'Failed to pause voicemail');
        });
    }
};
/**
 * Function to getTime
 * @param args - date received
 * @example - getTime(date);
 */
export const getTime = (date) => {
    return (date != null && date !== undefined) ? new Date(date).getTime() : 0;
};
/**
 * Function provides assignment state
 * @param rootState - AssignmentState
 * @example const inboxState = getAssignmentState(state)
 */
const getAssignmentState = (rootState) => {
    return rootState[ASSIGNMENT_KEY];
};
export const getIsModalOpened = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isModalOpen);
export const retrieveContactANI = createSelector(getAssignmentState, (state) => { var _a, _b; return getANI((_b = (_a = state === null || state === void 0 ? void 0 : state.callConferenceDetails) === null || _a === void 0 ? void 0 : _a.userInCall) === null || _b === void 0 ? void 0 : _b.contact); });
export const getSilentANIAuth = createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneVoiceBioHubData) === null || _a === void 0 ? void 0 : _a.isSilentANIAuthentication; });
/**
 * @param state - CxOneVoiceEventState
 * @example - addOrUpdateCXoneVoiceContact(event, action);
 * @returns - this returns state
 */
export const addOrUpdateCXoneVoiceContact = (state, eventData) => {
    var _a, _b, _c;
    eventData.interactionId = eventData.interactionId || eventData.contactID;
    if ((_a = state.cxoneInteractions[eventData.interactionId]) === null || _a === void 0 ? void 0 : _a.acdContacts[eventData.contactID]) {
        const acdContact = Object.assign({}, state.cxoneInteractions[eventData.interactionId].acdContacts[eventData.contactID]);
        acdContact.contactStatus = eventData.status.toLowerCase();
        acdContact.skillOrQueueName = eventData.skillName;
        acdContact.customerCardUrl = eventData.customerCardUrl;
        acdContact.finalState = eventData.finalState;
        state.cxoneInteractions[eventData.interactionId].acdContacts[eventData.contactID] = acdContact;
        const activePCCallInteractionId = findTheActivePCCall(state.cxoneInteractions, eventData);
        // If a Personal connection call is active, select that contact
        if (activePCCallInteractionId) {
            state.assignmentPanelMetadata.selectedInteractionId = activePCCallInteractionId;
            LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, state.assignmentPanelMetadata.selectedInteractionId);
        }
        logger.info('AW-25-addOrUpdateCXoneVoiceContact', `Updated existing voice contact with contactId: ${eventData.contactID} in interaction Id: ${eventData.interactionId}`);
    }
    else if (!eventData.finalState) { // Do not add new contact in redux state if the finalState is True.
        const incomingContact = {
            contactId: eventData.contactID,
            media: eventData.type === 'VoiceContact' ? MediaType.VOICE : MediaType.DIGITAL,
            isOutbound: !eventData.isInbound,
        };
        const contactNo = eventData.isInbound ? eventData.ani : eventData.dnis;
        const newContact = {
            contactId: eventData.contactID,
            media: eventData.type === 'VoiceContact' ? MediaType.VOICE : MediaType.DIGITAL,
            isOutbound: !eventData.isInbound,
            isSelected: false,
            contactMode: contactNo,
            customerName: (eventData === null || eventData === void 0 ? void 0 : eventData.label) || contactNo,
            contactStatus: eventData.status.toLowerCase(),
            skillOrQueueId: eventData.skill,
            skillOrQueueName: eventData.skillName,
            interactionId: eventData.interactionId,
            contactReceivedTime: eventData.startTime.toISOString(),
            isDocked: true,
            callType: eventData.callType,
            customerCardUrl: eventData === null || eventData === void 0 ? void 0 : eventData.customerCardUrl,
            finalState: eventData === null || eventData === void 0 ? void 0 : eventData.finalState,
            otherInformationNewFormat: eventData === null || eventData === void 0 ? void 0 : eventData.otherInformationNewFormat,
            receivedInInboxTime: new Date().toISOString(),
        };
        if (state.cxoneInteractions[eventData.interactionId] && Object.keys(state.cxoneInteractions[eventData.interactionId]).length) {
            const interaction = Object.assign({}, state.cxoneInteractions[eventData.interactionId]);
            interaction.acdContacts[eventData.contactID] = newContact;
            const isElevated = Object.keys((_b = interaction === null || interaction === void 0 ? void 0 : interaction.digitalContacts) !== null && _b !== void 0 ? _b : {}).length > 0 && Object.keys((_c = interaction === null || interaction === void 0 ? void 0 : interaction.acdContacts) !== null && _c !== void 0 ? _c : {}).length > 0;
            interaction.slaIndicator = SLAIndicatorType.NORMAL;
            interaction.interactionType = isElevated ? InteractionType.ELEVATED : InteractionType.VOICE;
            if (isElevated) {
                Object.values(interaction.digitalContacts).forEach(contact => contact.elevatedFrom = ElevatedFrom.DFO);
                Object.values(interaction.acdContacts).forEach(contact => contact.elevatedFrom = ElevatedFrom.DFO);
            }
            state.cxoneInteractions[eventData.interactionId] = interaction;
            logger.info('AW-25-addOrUpdateCXoneVoiceContact', `Added new voice contact in existing interaction Id: ${eventData.interactionId}`);
            logger.info('AW-25-addOrUpdateCXoneVoiceContact', `isElevated: ${isElevated}`);
        }
        else {
            state.cxoneInteractions[eventData.interactionId] = {
                interactionId: eventData.interactionId,
                interactionReceivedTime: eventData.startTime.toISOString(),
                interactionUpdatedTime: eventData.startTime.toISOString(),
                selectedContactId: '',
                interactionType: InteractionType.VOICE,
                slaIndicator: SLAIndicatorType.NORMAL,
                acdContacts: { [eventData.contactID]: newContact },
                digitalContacts: {},
            };
            logger.info('AW-25-addOrUpdateCXoneVoiceContact', `Added new voice contact in new interaction Id: ${eventData.interactionId}`);
        }
        if (!eventData.isInbound) {
            const activePCCallInteractionId = findTheActivePCCall(state.cxoneInteractions, eventData);
            // If a Personal connection call is active, select that contact
            if (activePCCallInteractionId) {
                state.assignmentPanelMetadata.selectedInteractionId = activePCCallInteractionId;
            }
            else {
                state.assignmentPanelMetadata.selectedInteractionId = eventData.interactionId;
            }
            LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, state.assignmentPanelMetadata.selectedInteractionId);
        }
        state.newIncomingContact = incomingContact;
        state.setContactHistoryInIndexDb = true;
    }
    if ([VoiceContactStatus.INCOMING, VoiceContactStatus.RINGING, VoiceContactStatus.PREVIEW].includes(eventData.status.toLowerCase())) {
        state.assignmentPanelMetadata.incommingAcdInteractionId = eventData.interactionId;
        logger.info('AW-25-addOrUpdateCXoneVoiceContact', `Setting assignmentPanelMetadata.incommingAcdInteractionId: ${eventData.interactionId}`);
    }
    else {
        state.assignmentPanelMetadata.incommingAcdInteractionId = '';
        state.assignmentPanelMetadata.voiceInteractionId = eventData.interactionId;
        logger.info('AW-25-addOrUpdateCXoneVoiceContact', `Setting assignmentPanelMetadata.voiceInteractionId: ${eventData.interactionId}`);
    }
    if (LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_DATA)) {
        const voiceBioData = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_DATA);
        const parsedVoiceBioHubData = typeof voiceBioData === 'string' ? JSON.parse(voiceBioData) : undefined;
        state.cxoneVoiceBioHubData.voiceBioHubStatus = parsedVoiceBioHubData === null || parsedVoiceBioHubData === void 0 ? void 0 : parsedVoiceBioHubData.voiceBioHubStatus;
        state.cxoneVoiceBioHubData.voiceBioHubStatusMessage = parsedVoiceBioHubData === null || parsedVoiceBioHubData === void 0 ? void 0 : parsedVoiceBioHubData.voiceBioHubStatusMessage;
        state.cxoneVoiceBioHubData.voiceBioHubCurrentRequestType = parsedVoiceBioHubData === null || parsedVoiceBioHubData === void 0 ? void 0 : parsedVoiceBioHubData.voiceBioHubCurrentRequestType;
        state.cxoneVoiceBioHubData.isSuccessVoiceBioHubResponseType = parsedVoiceBioHubData === null || parsedVoiceBioHubData === void 0 ? void 0 : parsedVoiceBioHubData.isSuccessVoiceBioHubResponseType;
        state.cxoneVoiceBioHubData.voiceBioHubPatronId = parsedVoiceBioHubData === null || parsedVoiceBioHubData === void 0 ? void 0 : parsedVoiceBioHubData.voiceBioHubPatronId;
    }
    // This code below is causing some bugs with the accept reject not appearing for subsequent PC contacts
    const interactionId = state.assignmentPanelMetadata.voiceInteractionId || state.assignmentPanelMetadata.incommingAcdInteractionId;
    const voiceContactDetailsId = getPrimaryVoiceContactId(interactionId, state.cxoneInteractions);
    if ((voiceContactDetailsId && eventData.contactID === voiceContactDetailsId) || eventData.callType === CallType.NATURAL_CALLING) {
        state.cxoneVoiceContactDetails = eventData;
        state.allCxoneVoiceContactDetails[eventData.contactID] = eventData;
        logger.info('AW-25-addOrUpdateCXoneVoiceContact', `Setting cxoneVoiceContactDetails object for contactId: ${eventData.contactID}`);
    }
    // TO Do: need to check for sorting in existing function
    state = addOrUpdateConsultAndConferenceData(state, eventData);
    return state;
};
/**
 * Finds the interaction ID of the currently active PC call from the provided interactions and event data.
 *
 * @param cxoneInteractions - An object containing all current interactions, keyed by interaction ID.
 * @param eventData - The current CXone voice contact event data.
 * @returns The interaction ID of the active PC call if found; otherwise, an empty string.
 * @example - findTheActivePCCall(state.cxoneInteractions, eventData)
 *
 * The function first checks if the provided event data represents an active PC call.
 * If not, it iterates through all interactions and their associated ACD contacts to find an active PC call.
 */
export const findTheActivePCCall = (cxoneInteractions, eventData) => {
    let activePCCallInteractionId = '';
    if (eventData.callType === CallType.NATURAL_CALLING && stringCompareIgnoreCase(eventData.status, VoiceContactStatus.ACTIVE)) {
        activePCCallInteractionId = eventData.interactionId;
        return activePCCallInteractionId;
    }
    Object.values(cxoneInteractions).forEach(interaction => {
        if (interaction.acdContacts && Object.keys(interaction.acdContacts).length) {
            Object.values(interaction.acdContacts).forEach(contact => {
                if (contact.callType === CallType.NATURAL_CALLING && stringCompareIgnoreCase(contact.contactStatus, VoiceContactStatus.ACTIVE)) {
                    activePCCallInteractionId = interaction.interactionId;
                }
            });
        }
    });
    return activePCCallInteractionId;
};
/**
 * @param interactionId - string
 * @param cxoneInteractions - Interactions
 * @example - getPrimaryVoiceContactId(interactionId, cxoneInteractions);
 * @returns - returns contactId or undefined.
 */
const getPrimaryVoiceContactId = (interactionId, cxoneInteractions) => {
    var _a, _b, _c;
    if (interactionId && ((_a = cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.acdContacts) && Object.keys(cxoneInteractions[interactionId].acdContacts).length) {
        const contacts = Object.values(cxoneInteractions[interactionId].acdContacts)
            .filter((contact) => (contact.finalState !== true))
            .sort((contactA, contactB) => {
            if (contactA.contactId > contactB.contactId)
                return 1;
            else if (contactA.contactId === contactB.contactId)
                return 0;
            else
                return -1;
        });
        logger.info('AW-25-getPrimaryVoiceContactId', `sorting voice contacts and returning first contactId: ${(_b = contacts[0]) === null || _b === void 0 ? void 0 : _b.contactId}`);
        return (_c = contacts[0]) === null || _c === void 0 ? void 0 : _c.contactId;
    }
    return undefined;
};
/**
 * @param state - CxOneVoiceMailEventState
 * @example - addOrUpdateCXoneVoiceMailContact(event, action);
 * @returns - this returns state
 */
const addOrUpdateCXoneVoiceMailContact = (state, eventData) => {
    var _a;
    const voiceMailEventData = eventData === null || eventData === void 0 ? void 0 : eventData.voiceMailEventData;
    if ((_a = state.cxoneInteractions[eventData.contactID]) === null || _a === void 0 ? void 0 : _a.acdContacts[eventData.contactID]) {
        const acdContact = Object.assign({}, state.cxoneInteractions[eventData.contactID].acdContacts[eventData.contactID]);
        acdContact.contactStatus = eventData.status.toLowerCase();
        acdContact.skillOrQueueName = eventData.skillName;
        state.cxoneInteractions[eventData.contactID].acdContacts[eventData.contactID] = acdContact;
        logger.info('AW-25-addOrUpdateCXoneVoiceMailContact', `Updated existing voicemail contact with contactId: ${eventData.contactID}`);
    }
    else {
        const incomingContact = {
            contactId: eventData.contactID,
            media: MediaType.VOICEMAIL,
            isOutbound: !voiceMailEventData.isInbound,
        };
        const newContact = {
            contactId: voiceMailEventData.contactId,
            contactMode: voiceMailEventData.isInbound
                ? voiceMailEventData.to || ''
                : voiceMailEventData.from || '',
            contactReceivedTime: voiceMailEventData.startTime.toISOString(),
            contactStatus: voiceMailEventData.status.toLowerCase(),
            isSelected: false,
            media: MediaType.VOICEMAIL,
            skillOrQueueId: voiceMailEventData.skill,
            skillOrQueueName: ' voiceMailEventData.skillName',
            interactionId: eventData.contactID,
            receivedInInboxTime: new Date().toISOString(),
        };
        if (state.cxoneInteractions[eventData.contactID]) {
            const contacts = Object.assign({}, state.cxoneInteractions[eventData.contactID]);
            contacts.acdContacts[eventData.contactID] = newContact;
            state.cxoneInteractions[eventData.contactID] = Object.assign({}, contacts);
            state.cxoneInteractions[eventData.contactID].interactionType = InteractionType.VOICEMAIL;
            logger.info('AW-25-addOrUpdateCXoneVoiceMailContact', `Added new voicemail contact in existing interaction Id: ${eventData.contactID}`);
        }
        else {
            state.cxoneInteractions[eventData.contactID] = {
                interactionId: eventData.contactID,
                interactionReceivedTime: voiceMailEventData.startTime.toISOString(),
                interactionUpdatedTime: voiceMailEventData.startTime.toISOString(),
                selectedContactId: '',
                interactionType: InteractionType.VOICEMAIL,
                slaIndicator: SLAIndicatorType.NORMAL,
                acdContacts: { [eventData.contactID]: newContact },
                digitalContacts: {},
            };
            logger.info('AW-25-addOrUpdateCXoneVoiceMailContact', `Added new voicemail contact in new interaction Id: ${eventData.contactID}`);
        }
        state.newIncomingContact = incomingContact;
    }
    if (voiceMailEventData.status.toLowerCase() === VoiceContactStatus.INCOMING || voiceMailEventData.status.toLowerCase() === VoiceContactStatus.RINGING) {
        state.assignmentPanelMetadata.incommingAcdInteractionId = eventData.contactID;
        logger.info('AW-25-addOrUpdateCXoneVoiceMailContact', `Setting assignmentPanelMetadata.incommingAcdInteractionId: ${eventData.contactID}`);
    }
    else {
        state.assignmentPanelMetadata.incommingAcdInteractionId = '';
        state.assignmentPanelMetadata.voiceMailInteractionId = eventData.contactID;
        logger.info('AW-25-addOrUpdateCXoneVoiceMailContact', `Setting assignmentPanelMetadata.voiceMailInteractionId: ${eventData.contactID}`);
    }
    state.cxoneVoiceMailContactDetails = eventData;
    return state;
};
/**
 * @param state - CxOneWorkitemEventState
 * @example - addOrUpdateCXoneWorkitemContact(event, action);
 * @returns - this returns state
 */
const addOrUpdateCXoneWorkItemContact = (state, workItemContact) => {
    var _a;
    const workItemEventData = workItemContact === null || workItemContact === void 0 ? void 0 : workItemContact.workItemEventData;
    const workItemIndex = state.cxoneWorkItemContacts.findIndex((item) => item.contactID === workItemContact.contactID);
    if ((_a = state.cxoneInteractions[workItemContact.contactID]) === null || _a === void 0 ? void 0 : _a.acdContacts[workItemContact.contactID]) {
        const acdContact = Object.assign({}, state.cxoneInteractions[workItemContact.contactID].acdContacts[workItemContact.contactID]);
        acdContact.contactStatus = workItemContact.status.toLowerCase();
        acdContact.finalState = workItemContact.finalState;
        acdContact.skillOrQueueName = workItemContact.skillName;
        state.cxoneInteractions[workItemContact.contactID].acdContacts[workItemContact.contactID] = acdContact;
        logger.info('AW-25-addOrUpdateCXoneWorkItemContact', `Updated existing workitem contact with contactId: ${workItemContact.contactID}`);
    }
    else {
        const incomingContact = {
            contactId: workItemContact.contactID,
            media: MediaType.WORKITEM,
        };
        const newContact = {
            contactId: workItemEventData.contactId,
            contactMode: workItemEventData.status,
            contactReceivedTime: workItemEventData.startTime.toISOString(),
            contactStatus: workItemEventData.status.toLowerCase(),
            isSelected: false,
            media: MediaType.WORKITEM,
            skillOrQueueId: workItemEventData.skillId,
            skillOrQueueName: workItemContact.skillName,
            payload: workItemEventData.workItemPayload,
            workItemType: workItemEventData.workItemType,
            interactionId: workItemContact.contactID,
            finalState: workItemEventData.finalState,
            receivedInInboxTime: new Date().toISOString(),
        };
        if (state.cxoneInteractions[workItemContact.contactID]) {
            const contacts = Object.assign({}, state.cxoneInteractions[workItemContact.contactID]);
            contacts.acdContacts[workItemContact.contactID] = newContact;
            state.cxoneInteractions[workItemContact.contactID] = Object.assign({}, contacts);
            state.cxoneInteractions[workItemContact.contactID].interactionType = InteractionType.WORKITEM;
            logger.info('AW-25-addOrUpdateCXoneWorkItemContact', `Added new workitem contact in existing interaction Id: ${workItemContact.contactID}`);
        }
        else {
            state.cxoneInteractions[workItemContact.contactID] = {
                interactionId: workItemContact.contactID,
                interactionReceivedTime: workItemEventData.startTime.toISOString(),
                interactionUpdatedTime: workItemEventData.startTime.toISOString(),
                selectedContactId: '',
                interactionType: InteractionType.WORKITEM,
                slaIndicator: SLAIndicatorType.NORMAL,
                acdContacts: { [workItemContact.contactID]: newContact },
                digitalContacts: {},
            };
            logger.info('AW-25-addOrUpdateCXoneWorkItemContact', `Added new workitem contact in new interaction Id: ${workItemContact.contactID}`);
        }
        state.newIncomingContact = incomingContact;
    }
    if (workItemEventData.status.toLowerCase() === VoiceContactStatus.INCOMING) {
        state.assignmentPanelMetadata.incommingAcdInteractionId = workItemContact.contactID;
    }
    else {
        state.assignmentPanelMetadata.incommingAcdInteractionId = '';
    }
    if (state.selectedContactId === workItemContact.contactID) {
        state.cxoneWorkItemContactDetails = workItemContact;
    }
    if (workItemIndex >= 0) {
        state.cxoneWorkItemContacts.splice(workItemIndex, 1, workItemContact);
    }
    else
        state.cxoneWorkItemContacts.push(workItemContact);
    return state;
};
/**
 * @param state - CxOneVoiceState,action
 * @example - addOrUpdateConsultAndConferenceData(state, action)
 * @returns - this returns state
 */
const addOrUpdateConsultAndConferenceData = (state, eventData) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const callType = eventData.callType;
    const callStatus = eventData.status.toLowerCase();
    const stateValue = Object.assign({}, current(state.callConferenceDetails));
    // clear out members of the conference who have been disconnected, but not the master contact
    if (state.assignmentPanelMetadata.voiceInteractionId &&
        state.cxoneInteractions[state.assignmentPanelMetadata.voiceInteractionId] &&
        Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.voiceInteractionId]).length &&
        Object.keys(state.cxoneInteractions[state.assignmentPanelMetadata.voiceInteractionId].acdContacts).length &&
        eventData.contactID !== ((_c = Object.values((_b = (_a = state.cxoneInteractions[state.assignmentPanelMetadata.voiceInteractionId]) === null || _a === void 0 ? void 0 : _a.acdContacts) !== null && _b !== void 0 ? _b : {})[0]) === null || _c === void 0 ? void 0 : _c.contactId) &&
        ((_d = eventData.status) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === VoiceContactStatus.DISCONNECTED) {
        logger.info('AW-25-addOrUpdateConsultAndConferenceData', `Removing member of conference other than the master contact with contactId: ${eventData.contactID}`);
        return removeVoiceContact(state, eventData);
    }
    const interactionId = state.assignmentPanelMetadata.incommingAcdInteractionId ? state.assignmentPanelMetadata.incommingAcdInteractionId : state.assignmentPanelMetadata.voiceInteractionId;
    if ((interactionId && Object.keys((_f = (_e = state.cxoneInteractions[interactionId]) === null || _e === void 0 ? void 0 : _e.acdContacts) !== null && _f !== void 0 ? _f : {}).length === 1 &&
        ((_g = Object.values(state.cxoneInteractions[interactionId].acdContacts)[0]) === null || _g === void 0 ? void 0 : _g.contactId) === eventData.contactID) ||
        (interactionId && Object.keys((_j = (_h = state.cxoneInteractions[interactionId]) === null || _h === void 0 ? void 0 : _h.acdContacts) !== null && _j !== void 0 ? _j : {}).length === 2 &&
            ((_k = Object.values(state.cxoneInteractions[interactionId].acdContacts)[1]) === null || _k === void 0 ? void 0 : _k.contactId) === eventData.contactID)) {
        state.callConferenceDetails.userInCall = {
            name: eventData.ani === 'RESKILL' ? eventData.skillName : eventData.dnis,
            designation: eventData.ani === 'AGENT' || eventData.ani === 'RESKILL' ? 'Agent' : 'Customer',
            contact: eventData,
        };
    }
    else if (!stateValue.userInConsult && Object.keys((_l = state.cxoneInteractions[eventData.interactionId]) !== null && _l !== void 0 ? _l : {}).length > 0 && eventData.status.toLocaleLowerCase() !== VoiceContactStatus.DISCONNECTED
        && (!state.callConferenceDetails.isActiveConference)) {
        state.callConferenceDetails.userInConsult = {
            name: callType === CallType.RESKILL_PROXY ? eventData.skillName : eventData.dnis,
            designation: callType === CallType.RESKILL_PROXY || eventData.ani === 'AGENT' ? 'Agent' : 'Customer',
            contact: eventData,
        };
        state.callConferenceDetails.userInLobby = state.callConferenceDetails.userInCall;
    }
    if (stateValue.userInLobby &&
        state.callConferenceDetails.userInLobby &&
        stateValue.userInLobby.contact.contactID === eventData.contactID) {
        state.callConferenceDetails.userInLobby = Object.assign(Object.assign({}, state.callConferenceDetails.userInLobby), { contact: eventData });
    }
    if (stateValue.userInConsult &&
        state.callConferenceDetails.userInConsult &&
        stateValue.userInConsult.contact.contactID === eventData.contactID) {
        state.callConferenceDetails.userInConsult = Object.assign(Object.assign({}, state.callConferenceDetails.userInConsult), { contact: eventData });
    }
    if (Object.keys((_m = state.cxoneInteractions[eventData.interactionId]) !== null && _m !== void 0 ? _m : {}).length > 0 && state.callConferenceDetails.isActiveConference && (eventData.status.toLocaleLowerCase() === VoiceContactStatus.DIALING || eventData.status.toLocaleLowerCase() === VoiceContactStatus.ACTIVE)) {
        state.callConferenceDetails.userInConsult = {
            name: callType === CallType.RESKILL_PROXY ? eventData.skillName : eventData.dnis,
            designation: callType === CallType.RESKILL_PROXY || eventData.ani === 'AGENT' ? 'Agent' : 'Customer',
            contact: eventData,
        };
        state.callConferenceDetails.userInLobby = state.callConferenceDetails.userInCall;
    }
    const isConferenceHold = callStatus.toLowerCase() === VoiceContactStatus.HOLDING && state.callConferenceDetails.isActiveConference;
    const isConferenceEnabled = callStatus === VoiceContactStatus.JOINED || isConferenceHold
        || (stateValue.status === VoiceContactStatus.JOINED && callStatus === VoiceContactStatus.MASKING);
    if (isConferenceEnabled) {
        const participant = {
            name: callType === CallType.RESKILL_PROXY ? eventData.skillName : eventData.dnis,
            designation: callType === CallType.RESKILL_PROXY || eventData.ani === 'AGENT' ? 'Agent' : 'Customer',
            contact: eventData,
        };
        state.callConferenceDetails.usersInConference = [
            ...state.callConferenceDetails.usersInConference.filter((o) => o.contact.contactID !== participant.contact.contactID),
            Object.assign({}, participant)
        ];
        state.callConferenceDetails.tileDirection = false;
    }
    state.callConferenceDetails.text = isConferenceEnabled ? CallType.CONFERENCE : CallType.CONSULT;
    state.callConferenceDetails.status = isConferenceEnabled
        ? VoiceContactStatus.JOINED
        : CallType.CONSULT;
    return state;
};
/**
 * @param state - CxOneVoiceEventState
 * @param voiceContact - CXoneVoiceContact
 * @example - removeVoiceContact(state, voiceContact));
 * @returns - this returns state
 */
const removeVoiceContact = (state, voiceContact) => {
    var _a, _b, _c, _d, _e, _f;
    const callType = voiceContact.callType;
    delete state.cxoneInteractions[voiceContact.interactionId].acdContacts[voiceContact.contactID];
    if (Object.keys(state.cxoneInteractions[voiceContact.interactionId].acdContacts).length === 0) {
        state.assignmentPanelMetadata.voiceInteractionId = '';
        state.callConferenceDetails = initialCallConferenceState;
        if (Object.keys(state.cxoneInteractions[voiceContact.interactionId].digitalContacts).length === 0) {
            delete state.cxoneInteractions[voiceContact.interactionId];
            if (!state.cxoneInteractions || (state.cxoneInteractions && Object.keys(state.cxoneInteractions).length === 0)) {
                state.assignmentPanelMetadata.selectedInteractionId = '';
            }
        }
    }
    const interactionType = getInteractionType(state, voiceContact.interactionId);
    if (interactionType !== InteractionType.ELEVATED) {
        const interaction = state.cxoneInteractions[voiceContact.interactionId];
        state.cxoneInteractions[voiceContact.interactionId].interactionReceivedTime = interactionType === InteractionType.VOICE ? Object.values(interaction.acdContacts)[0].contactReceivedTime : Object.values(interaction.digitalContacts)[0].contactReceivedTime;
    }
    if (voiceContact.interactionId && state.cxoneInteractions[voiceContact.interactionId] && Object.keys(state.cxoneInteractions[voiceContact.interactionId]).length) {
        if (state.cxoneInteractions[voiceContact.interactionId].interactionType !== InteractionType.VOICE) {
            state.cxoneInteractions[voiceContact.interactionId].interactionType = interactionType;
            if (interactionType !== InteractionType.ELEVATED && Object.values(state.cxoneInteractions[voiceContact.interactionId].digitalContacts).length) {
                Object.values(state.cxoneInteractions[voiceContact.interactionId].digitalContacts)[0].elevatedFrom = '';
            }
        }
        if (state.cxoneInteractions[voiceContact.interactionId].selectedContactId === voiceContact.contactID) {
            if (state.cxoneInteractions[voiceContact.interactionId].digitalContacts && Object.keys(state.cxoneInteractions[voiceContact.interactionId].digitalContacts).length) {
                state.cxoneInteractions[voiceContact.interactionId].selectedContactId = (_a = Object.values(state.cxoneInteractions[voiceContact.interactionId].digitalContacts)[0].caseId) !== null && _a !== void 0 ? _a : '';
            }
            else if (state.cxoneInteractions[voiceContact.interactionId].acdContacts && Object.keys(state.cxoneInteractions[voiceContact.interactionId].acdContacts).length) {
                state.cxoneInteractions[voiceContact.interactionId].selectedContactId = (_b = Object.values(state.cxoneInteractions[voiceContact.interactionId].acdContacts)[0].contactId) !== null && _b !== void 0 ? _b : '';
            }
        }
    }
    const currentContactId = state.cxoneVoiceContactDetails && state.cxoneVoiceContactDetails.contactID;
    if (currentContactId === voiceContact.contactID) {
        state.cxoneVoiceContactDetails = {};
    }
    if ((_c = state.allCxoneVoiceContactDetails) === null || _c === void 0 ? void 0 : _c[voiceContact.contactID]) {
        delete state.allCxoneVoiceContactDetails[voiceContact.contactID];
    }
    if (!Object.keys(((_d = state.cxoneInteractions[voiceContact.interactionId]) === null || _d === void 0 ? void 0 : _d.acdContacts) || {}).length) {
        state.assignmentPanelMetadata.voiceInteractionId = '';
    }
    state.isKeyPadOpen = false;
    if ((callType === CallType.RESKILL_PROXY ||
        callType === CallType.CONFERENCE ||
        callType === CallType.CONSULT ||
        callType === CallType.REGULAR ||
        callType === CallType.NATURAL_CALLING) &&
        state.cxoneInteractions[voiceContact.interactionId] && Object.keys(state.cxoneInteractions[voiceContact.interactionId]).length && Object.keys(state.cxoneInteractions[voiceContact.interactionId].acdContacts).length > 1) {
        state.callConferenceDetails.usersInConference =
            state.callConferenceDetails.usersInConference.filter((participant) => participant.contact.contactID !== voiceContact.contactID);
        state.callConferenceDetails.userInLobby = undefined;
        state.callConferenceDetails.tileDirection = false;
        if (((_f = (_e = state.callConferenceDetails.userInConsult) === null || _e === void 0 ? void 0 : _e.contact) === null || _f === void 0 ? void 0 : _f.contactID) === voiceContact.contactID) {
            state.callConferenceDetails.userInConsult = undefined;
        }
    }
    else if ((callType === CallType.CONSULT ||
        callType === CallType.RESKILL_PROXY ||
        callType === CallType.REGULAR ||
        callType === CallType.NATURAL_CALLING) &&
        state.cxoneInteractions[voiceContact.interactionId] && Object.keys(state.cxoneInteractions[voiceContact.interactionId]).length && Object.keys(state.cxoneInteractions[voiceContact.interactionId].acdContacts).length <= 1) {
        state.callConferenceDetails = initialCallConferenceState;
    }
    return state;
};
/**
     * @example - getSortingParameters();
     * @returns - this returns sorting parameters
     */
export const getSortingParameters = () => {
    // by default sorting applicable by lastUpdated and desc order
    let sortingParameters = { sortingCriteria: SortingCriteria.CREATEDDATE, sortingOrder: SortOrder.DESC };
    if (LocalStorageHelper.getItem(StorageKeys.SORT_ORDER_DIGITAL) && LocalStorageHelper.getItem(StorageKeys.SORT_CRITERIA_DIGITAL)) {
        sortingParameters = { sortingCriteria: LocalStorageHelper.getItem(StorageKeys.SORT_CRITERIA_DIGITAL), sortingOrder: LocalStorageHelper.getItem(StorageKeys.SORT_ORDER_DIGITAL) };
    }
    return sortingParameters;
};
/**
     * This method sets sorting parameters in localStorage
     * @param sortingParameters - SortingParameters
     * @example - setSortingParameters(sortingParameters);
     * @returns - this sets parameters of sorting in localStorage
     */
export const setSortingParametersInLocalStorage = (sortingParameters) => {
    LocalStorageHelper.setItem(StorageKeys.SORT_ORDER_DIGITAL, sortingParameters.sortingOrder);
    LocalStorageHelper.setItem(StorageKeys.SORT_CRITERIA_DIGITAL, sortingParameters.sortingCriteria);
};
export const selectInboxCollapsedState = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isInboxCollapsed);
export const getVoiceBioHubStatus = createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneVoiceBioHubData) === null || _a === void 0 ? void 0 : _a.voiceBioHubStatus; });
export const getVoiceBioHubPatronId = createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneVoiceBioHubData) === null || _a === void 0 ? void 0 : _a.voiceBioHubPatronId; });
export const getVoiceBioIsRetry = createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneVoiceBioHubData) === null || _a === void 0 ? void 0 : _a.isRetry; });
export const getVoiceBioHubStatusMessage = createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneVoiceBioHubData) === null || _a === void 0 ? void 0 : _a.voiceBioHubStatusMessage; });
export const getVoiceBioHubCurrentRequestType = createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneVoiceBioHubData) === null || _a === void 0 ? void 0 : _a.voiceBioHubCurrentRequestType; });
export const voiceContactKeypadState = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isKeyPadOpen);
export const isNewMessageAdded = createSelector(getAssignmentState, (state) => state.isNewMessageAdded);
export const getUpdatedNoteValue = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.updatedNoteValue);
export const getUpdatedCallerName = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.inboundCallingAgentInfo);
/**
 * This method is to select the conversation entity of message note
 * for the selected digital case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns messageNote for selcted case
 * @example - getmessageNoteForSelectedCase
 */
export const getmessageNoteForSelectedCase = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a, _b;
    return (_b = (_a = state.cxoneDigitalContactDetails[interactionId]) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b.messageNote;
});
/**
 * This method is to select the conversation entity of message note
 * for the selected digital case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns messageNote for selcted case
 * @example - getDraftMessageNoteForSelectedCase
 */
export const getDraftMessageNoteForSelectedCase = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a;
    return (_a = state.draftMessageNotes[interactionId]) === null || _a === void 0 ? void 0 : _a[caseId];
});
/**
 * This method is to select the case details for the selected case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns case details for selcted case
 * @example - getContactDetailsById
 */
export const getContactDetailsById = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a, _b;
    return (_b = (_a = state.cxoneDigitalContactDetails[interactionId]) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b.case;
});
/**
 * This method is to select the skill details for the selected case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns skill details for selcted case
 * @example - getSkillDetailsByCaseId
 */
export const getSkillDetailsByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a, _b;
    return (_b = (_a = state.cxoneDigitalContactDetails[interactionId]) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b.routingQueue;
});
export const getCollapsedCard = createSelector(getAssignmentState, (state) => state.contactsActiveCollapse);
export const getCxoneDigitalContactUserSavedProperties = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.cxoneDigitalContactUserSavedProperties);
export const getAgentLegStatus = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.agentLegStatus);
export const getAgentLegId = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.agentLegId);
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example - Example
 * ```
 * let selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(selectedDigitalContactId));
 * ```
 */
export const getDigitalContactDetailsByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    if ((state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId]) === undefined ||
        (state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === undefined)
        return {};
    return state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId];
});
/**
 * Gets attachment details from the state for selected digital contact
 * @returns Attachment details
 * @example - Example
 * ```
 * let selectedDigitalContactAttachments = useSelector(getSelectedDigitalContactAttachments());
 * ```
 */
export const getSelectedDigitalContactAttachments = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.attachments) === null || _c === void 0 ? void 0 : _c.filter((attachment) => attachment.uploaded);
});
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export const getDigitalContactMessagesByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return interactionId && caseId ? (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.messages : []; });
/**
 * Gets contact status from the state
 * @param caseId - CXone Contact Id
 * @param interactionId - CXone interaction Id
 * @returns Digital contact status
 * @example - Example
 * ```
 * let getDigitalContactStatusByCaseId = useSelector(getDigitalContactStatusByCaseId(caseId, interactionId));
 * ```
 */
export const getDigitalContactStatusByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.status;
});
/**
 * Gets parsed message contact details from the state. It adds the forwarded content for original message
 * @param caseId - CXone case Id
 * @param interactionId - CXone interaction Id
 * @returns Digital contact details
 * @example - let getParsedContactMessagesByCaseId = useSelector(getParsedContactMessagesByCaseId(selectedDigitalContactId));
 */
export const getParsedContactMessagesByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => {
    var _a;
    const messages = interactionId && caseId
        ? (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.messages
        : [];
    messages === null || messages === void 0 ? void 0 : messages.forEach((message) => {
        var _a, _b, _c, _d, _e;
        // In case of message has forward object get the forwarded message content 
        // and append to the original message content in order to display it in interaction space
        if ((_b = (_a = message.forward) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.id) {
            const parentMessage = messages === null || messages === void 0 ? void 0 : messages.find((originalMessage) => { var _a, _b; return originalMessage.id === ((_b = (_a = message.forward) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.id); });
            if (parentMessage) {
                const parentText = (_c = parentMessage.messageContent) === null || _c === void 0 ? void 0 : _c.text;
                message.attachments = [
                    ...((_d = message.attachments) !== null && _d !== void 0 ? _d : []),
                    ...((_e = parentMessage.attachments) !== null && _e !== void 0 ? _e : [])
                ];
                if (message.messageContent) {
                    const forwardedMessage = createForwardedEmailInHtml(parentText, getMessageAuthor(parentMessage), parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.createdAt, false);
                    message.messageContent.text = message.messageContent.text + forwardedMessage;
                }
            }
            // set message.forward to null in order to avoid appending same forwarded content multiple time 
            message.forward = null;
        }
    });
    return messages;
});
// memoize array so that we don't cause unnecessary re-renders for subscribing components
const emptyMessageArray = [];
/**
 * Gets translated messages for the caseId
 * @param caseId -
 * @param interactionId -
 * @returns translated messages
 * @example - Example
 * ```
 * let getTranslatedMessagesByCaseId = useSelector(getTranslatedMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export const getTranslatedMessagesByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (inbox) => interactionId && caseId && (inbox === null || inbox === void 0 ? void 0 : inbox.translatedMessages) && (inbox === null || inbox === void 0 ? void 0 : inbox.translatedMessages[interactionId])
    ? inbox === null || inbox === void 0 ? void 0 : inbox.translatedMessages[interactionId][caseId]
    : emptyMessageArray);
// memoize object so that we don't cause unnecessary re-renders for subscribing components
const emptyTranslationSettingsRecord = {};
/**
 * Gets translation settings for the caseId
 * @param caseId -
 * @param interactionId -
 * @returns translation settings
 * @example - Example
 * ```
 * let translationSettings = useSelector(getTranslationSettingsByCaseId(selectedDigitalCaseId, selectedDigitalInteractionId));
 * ```
 */
export const getTranslationSettingsByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (inbox) => interactionId && caseId && (inbox === null || inbox === void 0 ? void 0 : inbox.translationSettings) && (inbox === null || inbox === void 0 ? void 0 : inbox.translationSettings[interactionId])
    ? inbox === null || inbox === void 0 ? void 0 : inbox.translationSettings[interactionId][caseId]
    : emptyTranslationSettingsRecord);
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export const getDigitalContactMessageByMessageId = (caseId, interactionId, messageId) => createSelector(getAssignmentState, (state) => { var _a, _b; return interactionId && caseId ? (_b = (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.filter(x => x.id === messageId) : []; });
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getDigitalContactMessageDraftsByCaseId = useSelector(getDigitalContactMessageDraftsByCaseId(selectedDigitalContactId));
 * ```
 */
export const getDigitalContactMessageDraftsByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return interactionId && caseId ? (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.messageDrafts : []; });
/**
 * Gets message draft attachments from the state
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @param messageDraftId - ID of the message draft
 * @returns Digital contact details
 * @example -
 * ```
 * let getDigitalContactMessageDraftAttachments = useSelector(getDigitalContactMessageDraftAttachments(selectedDigitalContactId));
 * ```
 */
export const getDigitalContactMessageDraftAttachments = (caseId, interactionId, messageDraftId) => createSelector(getAssignmentState, (state) => {
    var _a, _b, _c;
    return interactionId && caseId && messageDraftId ?
        (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.messageDrafts) === null || _b === void 0 ? void 0 : _b.find(messageDraft => messageDraft.id === messageDraftId)) === null || _c === void 0 ? void 0 : _c.attachments : [];
});
/**
 * Gets previous case messages of the selected case
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let previousConversationMessagesByCaseId = useSelector(getPreviousConversationMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export const getPreviousConversationMessagesByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return interactionId && caseId ? (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.previousConversationMessages : []; });
/**
 * Gets next case messages of the selected case
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getNextConversationMessagesByCaseId = useSelector(getNextConversationMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export const getNextConversationMessagesByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return interactionId && caseId ? (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.nextConversationMessages : []; });
/**
 * Gets previous caseId of the selected case
 * @param caseId - CXone CaseId
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let previousCaseId = useSelector(getPreviousCaseIdForSelectedCase(selectedDigitalContactId));
 * ```
 */
export const getPreviousCaseIdForSelectedCase = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.previousCaseId; });
/**
 * Gets next caseId of the selected case
 * @param caseId - CXone CaseId
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let nextCaseId = useSelector(getNextCaseIdForSelectedCase(selectedDigitalContactId));
 * ```
 */
export const getNextCaseIdForSelectedCase = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.nextCaseId; });
/**
 * Gets digitalReplyChannels details of the selected case
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example
 * ```
 * let getDigitalReplyChannelsByCaseId = useSelector(getDigitalReplyChannelsByCaseId(selectedDigitalContactId));
 * ```
 */
export const getDigitalReplyChannelsByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a; return interactionId && caseId ? (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId]) === null || _a === void 0 ? void 0 : _a.replyChannels : []; });
/**
 * Gets the type of file attached whether image or else
 * @param caseId - case Id
 * @returns Digital contact details
 * @example
 * ```
 * const isImageNotSupported = useSelector(getIsImageNotSupported(activeContact?.caseId as string))
 * ```
 */
export const getIsImageNotSupported = (caseId) => createSelector(getAssignmentState, (state) => {
    var _a, _b;
    const interactionId = state === null || state === void 0 ? void 0 : state.assignmentPanelMetadata.selectedInteractionId;
    if (interactionId && Object.keys((_a = state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts).length > 0) {
        return (_b = state.cxoneInteractions[interactionId].digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.isImageTypeNotSupported;
    }
    return false;
});
export const voiceContactSelector = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.cxoneVoiceContactDetails;
});
/**
 * Gets the voice contact details for a given contactId
 * @param contactId - contactId
 * @returns Voice contact details
 * @example
 * ```
 * const voiceContact = useSelector(getVoiceContactDetailsById(contact?.contactId))
 * ```
 */
export const getVoiceContactDetailsById = (contactId) => createSelector(getAssignmentState, (state) => {
    var _a;
    const voiceContact = ((_a = state === null || state === void 0 ? void 0 : state.allCxoneVoiceContactDetails) === null || _a === void 0 ? void 0 : _a[contactId]) || {};
    return voiceContact;
});
export const voiceMailContactSelector = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.cxoneVoiceMailContactDetails;
});
export const workItemContactSelector = createSelector(getAssignmentState, (state) => {
    return state.cxoneWorkItemContactDetails;
});
export const digitalContactSelector = createSelector(getAssignmentState, (state) => {
    return state.cxoneDigitalContactDetails;
});
/**
 * Gets voicemail contact details from state
 * @param state - CXone Contact Id
 * @returns voicemail contact details
 * @example - Example
 * ```
 * let voiceMailContactDetails = useSelector(cxoneVoiceMailContactDetails());
 * ```
 */
export const voiceMailContactDetailsSelector = (state) => {
    return state.inbox.cxoneVoiceMailContactDetails;
};
/**
* Gets WorkItem contact details from state
* @param state - CXone Contact Id
* @returns WorkItem contact details
* @example - Example
* ```
* let WorkItemContactDetails = useSelector(workItemContactDetailsSelector());
* ```
*/
export const workItemContactDetailsSelector = (state) => {
    return state.inbox.cxoneWorkItemContactDetails;
};
/**
* returns acwTypeId in ACD contactdetails
* @param type - 'cxoneVoiceContactDetails' | 'cxoneVoiceMailContactDetails' | 'cxoneWorkItemContactDetails'
* @example - acwTypeIdSkillId('cxoneVoiceContactDetails')
*/
const acwTypeIdSkillId = (type) => (state) => { var _a; return (_a = state.inbox[type]) === null || _a === void 0 ? void 0 : _a.acwTypeId; };
/**
* returns skillId in ACD contactdetails
* @param type - 'cxoneVoiceContactDetails' | 'cxoneVoiceMailContactDetails' | 'cxoneWorkItemContactDetails'
* @example - acwSkillId('cxoneVoiceContactDetails')
*/
const acwSkillId = (type) => (state) => { var _a; return (_a = state.inbox[type]) === null || _a === void 0 ? void 0 : _a.skill; };
/**
* Used to get selected interaction id
* @param rootState - getAssignmentState state
* @example - getSelectedInteraction();
*/
export const getSelectedInteraction = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.assignmentPanelMetadata.selectedInteractionId);
/**
* Used to get selected contact id on root level
* @param rootState - getAssignmentState state
* @example - getSelectedContactRoot();
*/
export const getSelectedContactRoot = createSelector(getAssignmentState, state => state.selectedContactId);
/**
* Used to get if interaction navigation key is pressed or not
* @param rootState - getAssignmentState state
* @example - getInteractionNavKeyPressedStatus();
*/
export const getInteractionNavKeyPressedStatus = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isInteractionNavigationKeyPressed);
/**
 * Used to get if interaction accept key is pressed
 * @param rootState - getAssignmentState state
 * @example - getInteractionAcceptKeyPressedStatus();
 */
export const getInteractionAcceptKeyPressedStatus = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isInteractionAcceptKeyPressed);
/**
 * Used to get if external directory transfer is enabled
 * @param rootState - getAssignmentState state
 * @example - getIsExternalDirectoryTransfer();
 */
export const getIsExternalDirectoryTransfer = createSelector(getAssignmentState, (state) => state.isExternalDirectoryTransfer);
/**
 * Used to get if interaction accept key is pressed
 * @param rootState - getAssignmentState state
 * @example - getInteractionRejectKeyPressedStatus();
 */
export const getInteractionRejectKeyPressedStatus = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isInteractionRejectKeyPressed);
export const getAllACDContactDetails = createSelector(acwTypeIdSkillId('cxoneVoiceContactDetails'), acwSkillId('cxoneVoiceContactDetails'), acwTypeIdSkillId('cxoneVoiceMailContactDetails'), acwSkillId('cxoneVoiceMailContactDetails'), acwTypeIdSkillId('cxoneWorkItemContactDetails'), acwSkillId('cxoneWorkItemContactDetails'), (voiceAcwTypeId, voiceSkillId, voiceMailAcwTypeId, voiceMailSkillId, workItemAcwTypeId, workItemSkillId) => {
    return [
        { acwTypeId: voiceAcwTypeId, skill: voiceSkillId },
        { acwTypeId: voiceMailAcwTypeId, skill: voiceMailSkillId },
        { acwTypeId: workItemAcwTypeId, skill: workItemSkillId }
    ];
});
export const getCallConferenceState = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.callConferenceDetails;
});
export const selectCallConferenceStatus = createSelector(getCallConferenceState, (state) => state.status);
export const selectCallConferenceTitleText = createSelector(getCallConferenceState, (state) => state.text);
export const selectTileDirection = createSelector(getCallConferenceState, (state) => state.tileDirection);
export const selectUserInConference = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.usersInConference);
export const selectUserInCall = createSelector(getCallConferenceState, (state) => state.userInCall);
export const selectUserInConsult = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.userInConsult);
export const selectUserInLobby = createSelector(getCallConferenceState, (state) => state === null || state === void 0 ? void 0 : state.userInLobby);
export const consultAgentInConference = createSelector(selectUserInConference, (state) => state === null || state === void 0 ? void 0 : state.find((user) => user.designation === 'Agent'));
export const customerInConference = createSelector(selectUserInConference, (state) => state === null || state === void 0 ? void 0 : state.slice().sort((firstParticipant, SecondParticipant) => {
    return new Date(SecondParticipant.contact.startTime).getTime() - new Date(firstParticipant.contact.startTime).getTime();
})[0]);
export const agentLegAutoAcceptEnabled = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.isAgentLegAutoAcceptEnabled;
});
export const getCtdDisplayError = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.ctdDisplayError;
});
export const getIsEmailDraftSent = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.isEmailDraftSent;
});
export const getPersonalQueue = createSelector(getAssignmentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.cxonePersonalQueue;
});
export const consultedAgentDetails = createSelector(getAssignmentState, (state) => state.consultedAgents);
export const getLatestIncomingContactDetails = createSelector(getAssignmentState, (state) => state.newIncomingContact);
/**
 * Gets contact details from the state for particular CaseId
 * @param caseId - CXone Contact Id
 * @returns Digital contact details for particular CaseId
 * @example - Example
 * ```
 * let digitalContactDetail = useSelector(getDigitalContactByCaseId(DigitalCaseId));
 * ```
 */
export const getDigitalContactByCaseId = (caseId) => createSelector((state) => state, (state) => {
    const digitalContacts = digitalContactCardsSelector(state.inbox.cxoneInteractions);
    return digitalContacts.find((contact) => contact.caseId === caseId);
});
/**
 * Gets public messages for contacts from state
 * @param caseId - CXone Contact Id
 * @param interactionId - interaction id of case
 * @returns messages
 * @example - Example
 * ```
 * let selectedContactsPublicMessages = useSelector(getMessagesForSelectedContact());
 * ```
 */
export const getMessagesForSelectedContact = (caseId, interactionId) => createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId][caseId].publicMessagesTree);
/**
* Get message action response
* @returns message action response
* @example - getMessageActionResponse()
* ```
* let getMessageActionResponse = useSelector(getMessageActionResponse());
* ```
*/
export const getMessageActionResponse = () => createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.messageActionResponse);
/**
   * Used to get the all outbound message template list
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAllMessageTemplates(state)
   */
export const getAllDigitalMessageTags = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.digitalMessageTags);
/**
   * Used to get total digital tags
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getDigitalMessageTagsCount(state)
   */
export const getDigitalMessageTagsCount = createSelector(getAssignmentState, (state) => state.digitalMessageTagsCount);
/**
   * Used to get current page for digital tags
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getDigitalMessageTagsCurrentPage(state)
   */
export const getDigitalMessageTagsCurrentPage = createSelector(getAssignmentState, (state) => state.digitalMessageTagsCurrentPage);
/**
   * Used to get the digital tags by search string
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getDigitalMessageTagsByName(state)
   */
export const getDigitalMessageTagsByName = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.digitalMessageTagsByName);
/**
* Used to show the genric error message
* @param rootState - getAssignmentState state
* @example - let digitalMessageTagError = useSelector(digitalMessageTagError());
*/
export const digitalMessageTagError = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.digitalMessageTagError);
/**
* Used to get digital tag added state
* @param rootState - getAssignmentState state
* @example - let getNewDigitalTagAddedState = useSelector(getNewDigitalTagAddedState());
*/
export const getNewDigitalTagAddedState = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.newDigitalTagAddedDetails);
/**
* Used to get position of digital message tags
* @param rootState - getAssignmentState state
* @example - let getDigitalTagPopOverPosition = useSelector(getDigitalTagPopOverPosition());
*/
export const getDigitalTagPopOverPosition = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.digitalTagPopOverPosition);
/**
* Used to get expanded state of digital tags
* @param rootState - getAssignmentState state
* @example - let getDigitalTagExpandedState = useSelector(getDigitalTagExpandedState());
*/
export const getDigitalTagExpandedState = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.isDigitalTagsExpanded);
/**
* Used to show the genric error message
* @param rootState - getAssignmentState state
* @example - let digitalTagLoading = useSelector(digitalTagLoading());
*/
export const digitalTagLoadingState = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.digitalTagLoading);
/**
* Selector to get the slaIndicator flag for the caseId provided
* @returns SLAIndicatorType enum string
* @example
* ```
* const slaIndicator = useSelector(getSlaIndicator());
* ```
*/
export const getSlaIndicator = (interactionId) => createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.slaIndicator; });
/**
* used to get the failedInteraction messages for the passed caseId
* @returns failedMessages
* @example
* ```
* const failedInteractionMessages = useSelector(getInteractionFailedMessagesForCase());
* ```
*/
export const getInteractionFailedMessagesForCase = (caseId) => createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.interactionFailedMessages[caseId]);
/**
* used to get all the interactions
* @returns allInteractions
* @example
* ```
* const allInteractions = useSelector(getAllInteractions());
* ```
*/
export const getAllInteractions = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.cxoneInteractions);
/**
* used to get interaction id with voice contact
* @returns interactionMetadata
* @example
* ```
* const assignmentDataMetadata = useSelector(getAssignmentPanelMetadata());
* ```
*/
export const getAssignmentPanelMetadata = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.assignmentPanelMetadata);
/**
* Used to return in active contact in selected interaction, but it may also contain incomming contact
* @returns ActiveContactInSelectedInteraction
* @example
* ```
* const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction());
* ```
*/
export const getActiveContactInSelectedInteraction = createSelector(getAssignmentState, getAssignmentPanelMetadata, (state, assignmentPanelMetadata) => {
    let activeContact = null;
    if (assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.selectedInteractionId) {
        let selectedContactId = '';
        if (state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId] && Object.keys(state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId]).length) {
            selectedContactId = state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId].selectedContactId;
        }
        if (selectedContactId && assignmentPanelMetadata.selectedInteractionId) {
            if (state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId].acdContacts[selectedContactId]) {
                activeContact =
                    state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId].acdContacts[selectedContactId];
            }
            else if (state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId].digitalContacts[selectedContactId]) {
                activeContact =
                    state.cxoneInteractions[assignmentPanelMetadata.selectedInteractionId].digitalContacts[selectedContactId];
            }
        }
    }
    return activeContact;
});
/**
 * Used to get all the cases under selected interaction. To be used for elevation
 * @example -
 */
export const getAllCasesInSelectedDigitalInteraction = createSelector(getAssignmentState, getAssignmentPanelMetadata, (state, assignmentPanelMetadata) => {
    var _a;
    let allCases = null;
    if (assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.selectedInteractionId) {
        allCases = (_a = state.cxoneInteractions[assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.selectedInteractionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts;
    }
    return allCases;
});
/**
 * Used to get all the preview cases under selected interaction. To be used for elevation
 * @example -
 */
export const getAllPreviewCasesInSelectedDigitalInteraction = createSelector(getAllCasesInSelectedDigitalInteraction, (allCases) => {
    let allPreviwCases = [];
    if (allCases && Object.keys(allCases).length) {
        allPreviwCases = Object.values(allCases).filter((contact) => {
            var _a, _b, _c, _d;
            return ((_a = contact.contactStatus) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== ((_b = DigitalContactStatus === null || DigitalContactStatus === void 0 ? void 0 : DigitalContactStatus.DRAFT) === null || _b === void 0 ? void 0 : _b.toLowerCase()) &&
                ((_c = contact.contactStatus) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== ((_d = DigitalContactStatus === null || DigitalContactStatus === void 0 ? void 0 : DigitalContactStatus.INCOMING) === null || _d === void 0 ? void 0 : _d.toLowerCase()) &&
                !contact.isAssignedToAgentInbox;
        });
    }
    return allPreviwCases;
});
/**
 * @example -
 */
export const getAllCasesInSelectedACDInteraction = createSelector(getAssignmentState, getAssignmentPanelMetadata, (state, assignmentPanelMetadata) => {
    var _a;
    let allCases = null;
    if (assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.selectedInteractionId) {
        allCases = (_a = state.cxoneInteractions[assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.selectedInteractionId]) === null || _a === void 0 ? void 0 : _a.acdContacts;
    }
    return allCases;
});
/**
* Used to return in active contact in selected interaction whose status is NOT Incoming
* @returns ActiveContactInSelectedInteraction
* @example
* ```
* const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction());
* ```
*/
export const getNonIncomingActiveContactInSelectedInteraction = createSelector(getAssignmentState, getActiveContactInSelectedInteraction, (_state, activeContactInSelectedInteraction) => {
    if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactStatus) !== 'incoming') {
        return activeContactInSelectedInteraction;
    }
    return null;
});
/**
* Used to return in non incoming active contact only for Screen pop.
* If interaction is elevated, it will return voice contact or else nonIncomingActiveContact
* @returns nonIncomingActiveContact
* @example
* ```
* const nonIncomingActiveContact = useSelector(getNonIncomingActiveContactForScreenPop());
* ```
*/
export const getNonIncomingActiveContactForScreenPop = createSelector(getAssignmentState, getAssignmentPanelMetadata, getNonIncomingActiveContactInSelectedInteraction, (state, metadata, nonIncomingActiveContact) => {
    const selectedInteractionId = metadata.selectedInteractionId;
    if (selectedInteractionId &&
        state.cxoneInteractions[selectedInteractionId] &&
        Object.keys(state.cxoneInteractions[selectedInteractionId]).length) {
        const selectedInteraction = state.cxoneInteractions[selectedInteractionId];
        const isElevated = (selectedInteraction === null || selectedInteraction === void 0 ? void 0 : selectedInteraction.digitalContacts) && (selectedInteraction === null || selectedInteraction === void 0 ? void 0 : selectedInteraction.acdContacts) &&
            Object.keys(selectedInteraction.digitalContacts).length > 0 &&
            Object.keys(selectedInteraction.acdContacts).length > 0;
        return isElevated ? Object.values(selectedInteraction.acdContacts)[0] : nonIncomingActiveContact;
    }
    return nonIncomingActiveContact;
});
/**
* Used to return in active contact only for screen pop.
* If interaction is elevated, it will return voice contact or else activeContact
* @returns activeContact
* @example
* ```
* const activeContact = useSelector(getActiveContactForScreenPop());
* ```
*/
export const getActiveContactForScreenPop = createSelector(getAssignmentState, getAssignmentPanelMetadata, getActiveContactInSelectedInteraction, (state, metadata, activeContact) => {
    const selectedInteractionId = metadata.selectedInteractionId;
    if (selectedInteractionId &&
        state.cxoneInteractions[selectedInteractionId] &&
        Object.keys(state.cxoneInteractions[selectedInteractionId]).length) {
        const selectedInteraction = state.cxoneInteractions[selectedInteractionId];
        const isElevated = (selectedInteraction === null || selectedInteraction === void 0 ? void 0 : selectedInteraction.digitalContacts) && (selectedInteraction === null || selectedInteraction === void 0 ? void 0 : selectedInteraction.acdContacts) &&
            Object.keys(selectedInteraction.digitalContacts).length > 0 &&
            Object.keys(selectedInteraction.acdContacts).length > 0;
        return isElevated ? Object.values(selectedInteraction.acdContacts)[0] : activeContact;
    }
    return activeContact;
});
export const hasConsultCall = createSelector(getAllInteractions, getAssignmentPanelMetadata, (allInteractions, assignmentPanelMetadata) => {
    var _a;
    if (!(assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.voiceInteractionId)) {
        return false;
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length) {
        return (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.some((voiceCard) => voiceCard.callType === CallType.CONSULT);
    }
    else
        return false;
});
export const voiceContactCardSelector = createSelector(getAllInteractions, getAssignmentPanelMetadata, (allInteractions, assignmentPanelMetadata) => {
    var _a;
    if (!(assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.voiceInteractionId)) {
        return [];
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length) {
        return (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.map(contact => contact);
    }
    else
        return [];
});
export const getSelectedVoiceContact = createSelector(voiceContactCardSelector, getAssignmentPanelMetadata, (contacts, assignmentPanelMetadata) => {
    return contacts === null || contacts === void 0 ? void 0 : contacts.find((contact) => contact.interactionId === assignmentPanelMetadata.selectedInteractionId);
});
export const voiceContactsIds = createSelector(getAllInteractions, getAssignmentPanelMetadata, (allInteractions, assignmentPanelMetadata) => {
    var _a;
    if (!(assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.voiceInteractionId)) {
        return [];
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length) {
        return (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.map((contact) => contact.contactId);
    }
    else
        return [];
});
export const nonIncomingVoiceContactCards = createSelector(getAllInteractions, getAssignmentPanelMetadata, (allInteractions, assignmentPanelMetadata) => {
    var _a;
    if (!(assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.voiceInteractionId)) {
        return [];
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length) {
        return (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.filter((contact) => contact.contactStatus !== 'incoming' && contact.contactStatus !== 'ringing');
    }
    else
        return [];
});
export const getActiveVoiceContact = createSelector(getAllInteractions, getAssignmentPanelMetadata, (allInteractions, assignmentPanelMetadata) => {
    var _a;
    if (!(assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.voiceInteractionId)) {
        return undefined;
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && allInteractions[assignmentPanelMetadata.voiceInteractionId].selectedContactId) {
        return (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.find((contact) => Object.values(ACDVoiceShowControlsStatus).includes(contact === null || contact === void 0 ? void 0 : contact.contactStatus));
    }
    else
        return undefined;
});
export const getActiveContacts = createSelector(getAllInteractions, getAssignmentPanelMetadata, (allInteractions, assignmentPanelMetadata) => {
    var _a;
    if (!(assignmentPanelMetadata === null || assignmentPanelMetadata === void 0 ? void 0 : assignmentPanelMetadata.voiceInteractionId)) {
        return [];
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length) {
        return (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.filter((contact) => contact.contactStatus !== 'incoming');
    }
    else
        return [];
});
/**
 * getSelectedInteractionType
 */
export const getSelectedInteractionType = createSelector(getAllInteractions, getSelectedInteraction, (allInteractions, selectedInteraction) => {
    var _a;
    if (Object.keys(allInteractions).length && selectedInteraction) {
        const interactionType = (_a = allInteractions[selectedInteraction]) === null || _a === void 0 ? void 0 : _a.interactionType;
        return interactionType;
    }
    return null;
});
/**
 * Returns the information of the selected/active interaction
 * @example
 * ```
 * useSelector(getSelectedInteractionInfo)
 * ```
 */
export const getSelectedInteractionInfo = createSelector(getAllInteractions, getSelectedInteraction, (allInteractions, selectedInteraction) => {
    return (Object.keys(allInteractions).length > 0 && selectedInteraction && allInteractions[selectedInteraction]) ?
        allInteractions[selectedInteraction] :
        null;
});
/**
 * Gets workItem contacts from state
 * @param state - CXone Contact Id
 * @returns workItem contacts
 * @example - Example
 * ```
 * let workItemContacts = useSelector(workItemContactsSelector());
 * ```
 */
export const workItemContactsSelector = createSelector(getAllInteractions, (cxoneInteractions) => {
    const workItems = [];
    if (cxoneInteractions && Object.keys(cxoneInteractions).length) {
        Object.values(cxoneInteractions).forEach(interaction => {
            if (interaction && interaction.acdContacts && Object.keys(interaction.acdContacts).length && interaction.interactionType === InteractionType.WORKITEM) {
                workItems.push(interaction.acdContacts[Object.keys(interaction.acdContacts)[0]]);
            }
        });
    }
    return workItems;
});
export const workItemContactsIds = createSelector(getAllInteractions, (cxoneInteractions) => {
    const workItems = [];
    if (cxoneInteractions && Object.keys(cxoneInteractions).length) {
        Object.values(cxoneInteractions).forEach(interaction => {
            if (interaction && interaction.acdContacts && Object.keys(interaction.acdContacts).length && interaction.interactionType === InteractionType.WORKITEM) {
                workItems.push(interaction.acdContacts[Object.keys(interaction.acdContacts)[0]]);
            }
        });
    }
    return workItems.map((contact) => contact.contactId);
});
/**
 * Gets voicemail contacts from state
 * @param state - CXone Contact Id
 * @returns voicemail contacts
 * @example - Example
 * ```
 * let voiceMailContacts = useSelector(voiceMailContactsSelector());
 * ```
 */
export const voiceMailContactsSelector = createSelector(getAllInteractions, (cxoneInteractions) => {
    const voiceMails = [];
    if (cxoneInteractions && Object.keys(cxoneInteractions).length) {
        Object.values(cxoneInteractions).forEach(interaction => {
            if (interaction && interaction.acdContacts && Object.keys(interaction.acdContacts).length && interaction.interactionType === InteractionType.VOICEMAIL) {
                voiceMails.push(interaction.acdContacts[Object.keys(interaction.acdContacts)[0]]);
            }
        });
    }
    return voiceMails;
});
export const voiceMailContactsIds = createSelector(getAllInteractions, (cxoneInteractions) => {
    const voiceMails = [];
    if (cxoneInteractions && Object.keys(cxoneInteractions).length) {
        Object.values(cxoneInteractions).forEach(interaction => {
            if (interaction && interaction.acdContacts && Object.keys(interaction.acdContacts).length && interaction.interactionType === InteractionType.VOICEMAIL) {
                voiceMails.push(interaction.acdContacts[Object.keys(interaction.acdContacts)[0]]);
            }
        });
    }
    return voiceMails.map((contact) => contact.contactId);
});
/**
 * Gets voicemail contacts from state
 * @param state - CXone Contact Id
 * @returns voicemail contacts
 * @example - Example
 * ```
 * let voiceMailContacts = useSelector(digitalContactCardsSelector());
 * ```
 */
export const digitalContactCardsSelector = (cxoneInteractions) => {
    const digitalContacts = [];
    if (cxoneInteractions && Object.keys(cxoneInteractions).length) {
        Object.values(cxoneInteractions).forEach(interaction => {
            if (interaction && interaction.digitalContacts && Object.keys(interaction.digitalContacts).length) {
                Object.values(interaction.digitalContacts).forEach(digitalContact => {
                    digitalContacts.push(digitalContact);
                });
            }
        });
    }
    return digitalContacts;
};
export const allDigitalContactCard = createSelector(getAllInteractions, (cxoneInteractions) => {
    return digitalContactCardsSelector(cxoneInteractions);
});
export const nonIncomingDigitalContactCards = createSelector(getAllInteractions, (cxoneInteractions) => {
    const digitalContacts = digitalContactCardsSelector(cxoneInteractions);
    return [...digitalContacts.filter((contact) => contact.contactStatus !== 'incoming')];
});
export const getNewContacts = createSelector(getAllInteractions, (cxoneInteractions) => {
    const digitalContacts = digitalContactCardsSelector(cxoneInteractions);
    return [...digitalContacts.filter((contact) => contact.contactStatus === 'incoming')];
});
/**
 * This compiles the various contact types into 1 list and returns the result
 * @param state - InboxState
 * @returns acdContacts - concatinated list of all contact types
 * @example
 */
const getCompiledACDContactsHelper = (cxoneInteractions) => {
    const acdContacts = [];
    Object.values(cxoneInteractions).forEach(interaction => {
        if (interaction.acdContacts && Object.keys(interaction.acdContacts).length) {
            Object.values(interaction.acdContacts).forEach(contact => {
                acdContacts.push(contact);
            });
        }
    });
    return acdContacts;
};
export const getCompiledACDContacts = createSelector(getAllInteractions, (cxoneInteractions) => {
    return cxoneInteractions ? getCompiledACDContactsHelper(cxoneInteractions) : null;
});
export const getIncomingContacts = createSelector(getAllInteractions, (cxoneInteractions) => {
    const acdContacts = getCompiledACDContactsHelper(cxoneInteractions);
    const incomingContactsStatus = [VoiceContactStatus.INCOMING, VoiceContactStatus.PREVIEW, VoiceContactStatus.CALL_BACK_DISCONNECTED];
    return acdContacts.filter((contact) => incomingContactsStatus.includes(contact.contactStatus));
});
export const getRingingContacts = createSelector(getAllInteractions, (cxoneInteractions) => {
    const acdContacts = getCompiledACDContactsHelper(cxoneInteractions);
    return acdContacts.filter((contact) => contact.contactStatus === 'ringing' && contact.callType === 'Consult');
});
/**
 * Gets Customer contact custom fields from the state
*  @param caseId - CXone case Id
 * @param interactionId - interaction id of case *
 * @returns CXoneContactCustomFieldDefinition[]
 * @example
 * ```
 * let getcustomerContactCustomFieldDefinitionsByCaseId = useSelector(getcustomerContactCustomFieldDefinitionsByCaseId(selectedDigitalContactId));
 * ```
 */
export const getcustomerContactCustomFieldDefinitionsByCaseId = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a, _b; return interactionId && caseId ? (_b = (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails[interactionId]) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b.contactCustomFieldDefs : []; });
/**
* Used to get the message selected for reply.
* @param caseId - Selected contact case id
* @example - const selectedMsg = useSelector(getSelectedMsg(caseId));
*/
export const getSelectedMsg = (caseId) => createSelector(getAssignmentState, (state) => { var _a; return ((_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactUserSavedProperties[caseId]) === null || _a === void 0 ? void 0 : _a.message) || {}; });
/**
 * Filters the messages of interaction and returns the one with same idOnExternalPlatform.
 * @param caseId - CXone case Id
 * @param interactionId - CXone interaction Id
 * @param idOnExternalPlatform - idOnExternalPlatform of the message
 * @returns SavedDigitalUserDetails
 * @example - let getRepliedMessage = useSelector(getRepliedMessage(caseId, interactionId, idOnExternalPlatform));
 */
export const getRepliedMessage = (caseId, interactionId, idOnExternalPlatform) => createSelector(getAssignmentState, (state) => {
    var _a, _b, _c;
    const messages = interactionId && caseId
        ? (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactDetails) === null || _a === void 0 ? void 0 : _a[interactionId]) === null || _b === void 0 ? void 0 : _b[caseId]) === null || _c === void 0 ? void 0 : _c.messages
        : [];
    const message = messages === null || messages === void 0 ? void 0 : messages.find(message => message.idOnExternalPlatform === idOnExternalPlatform);
    return message;
});
/**
* used to get the draft messages for the passed caseId
* @returns draft messages
* @example
* ```
* const draftInteractionMessages = useSelector(getInteractionDraftMessagesForCase());
* ```
*/
export const getInteractionDraftMessagesForCase = (caseId) => createSelector(getAssignmentState, (state) => (state === null || state === void 0 ? void 0 : state.interactionDraftMessages[caseId]) || []);
/**
   * selector to return if the voice recording is removed from editor
   * @param caseId - case id
   * @param interactionId - interaction id
   * @returns boolean
   * @example getIfVoiceRecordingRemoved('123w','aswse3')
   */
export const getIfVoiceRecordingRemoved = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.isAudioRecordingRemoved; });
/**
   * selector to read the status of audio recording
   * @param caseId - case id
   * @param interactionId - interaction id
   * @returns boolean
   * @example getVoiceRecordingState('123w','aswse3')
   */
export const getVoiceRecordingState = (caseId, interactionId) => createSelector(getAssignmentState, (state) => { var _a, _b; return (_b = (_a = state === null || state === void 0 ? void 0 : state.cxoneInteractions[interactionId]) === null || _a === void 0 ? void 0 : _a.digitalContacts[caseId]) === null || _b === void 0 ? void 0 : _b.isRecordingInProgress; });
/**
   * selector to retrun setContactHistoryInIndexDb flag
   * @returns setContactHistoryInIndexDb
   * @example getSetContactHistoryInIndexDbFlag()
   */
export const getSetContactHistoryInIndexDbFlag = createSelector(getAssignmentState, (state) => state === null || state === void 0 ? void 0 : state.setContactHistoryInIndexDb);
/**
 * Used to get the isEmailForward flag from selected contact saved user properties.
 * @param caseId - Selected contact case id
 * @example - const isEmailForward = useSelector(getIsEmailForward(caseId));
 */
export const getIsEmailForward = (caseId) => createSelector(getAssignmentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.cxoneDigitalContactUserSavedProperties[caseId]) === null || _a === void 0 ? void 0 : _a.isEmailForward; });
//# sourceMappingURL=ccf-assignment-panel.slice.js.map