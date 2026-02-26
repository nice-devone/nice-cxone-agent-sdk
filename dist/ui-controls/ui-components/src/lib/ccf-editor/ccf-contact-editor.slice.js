import { __awaiter, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { CcfLogger, FeatureToggleService } from '@nice-devone/agent-sdk';
import { DigitalChannelType, DigitalContactStatus, CXoneDigitaltranslationApiResponseSchema, MediaType, ReplyAPIStatus } from '@nice-devone/common-sdk';
import { SessionStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { uuid } from 'uuidv4';
import { CcfAssignmentAction, getContactDetailsForSelectedContact } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { removeObContactFromStorage, uploadLSForEditor, removeFailedMessageFromIndexDb, updateIndexDbWithFailedMessage, updateFields } from './ccf-editor-utils';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { CcfRejectedReasonAction } from '../ccf-digital/ccf-approval-banner/ccf-rejected-reason/ccf-rejected-reason.slice';
export const CONTACT_EDITOR_KEY = 'contactEditor';
export const BEGIN_FORWARDED_MESSAGE = '==== Begin forwarded message ====';
const logger = new CcfLogger('App.react-ui-components', 'ccf-contact-editor-slice');
/**
 * function that returns activeContact state
 * @example getActiveContactState()
 */
export const getActiveContactState = (inbox) => {
    let activeContact = undefined;
    if (inbox.assignmentPanelMetadata.selectedInteractionId) {
        let selectedContactId = '';
        if (inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId] && Object.keys(inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId]).length) {
            selectedContactId = inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId].selectedContactId;
        }
        if (selectedContactId && inbox.assignmentPanelMetadata.selectedInteractionId) {
            if (inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId].acdContacts[selectedContactId]) {
                activeContact =
                    inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId].acdContacts[selectedContactId];
            }
            else if (inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId].digitalContacts[selectedContactId]) {
                activeContact =
                    inbox.cxoneInteractions[inbox.assignmentPanelMetadata.selectedInteractionId].digitalContacts[selectedContactId];
            }
        }
    }
    if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.WORKITEM && activeContact.contactStatus === 'incoming') {
        return undefined;
    }
    return activeContact;
};
/**
 * Function that returns formatted html table with appended inline style
 * @param parsedString - string
 * @returns - string
 * @example -
 * ```
 * updateHTMLTableBorder('<table class="richTableEditor">')
 * ```
 */
export const updateHTMLTableBorder = (parsedString) => {
    const richTableRegex = /<table class="richTextEditorTable"([^>]*)>/;
    let updatedParsedString = parsedString;
    const isRichTablePresent = updatedParsedString === null || updatedParsedString === void 0 ? void 0 : updatedParsedString.match(richTableRegex);
    // Here we are finding the table with richTextEditorTable class.
    if (isRichTablePresent) {
        const tableTag = isRichTablePresent[0];
        const updatedTableTag = tableTag === null || tableTag === void 0 ? void 0 : tableTag.replace('>', ' style="border-collapse: collapse;">');
        // Append this inline style inside table tag to maintain proper border style in the email body
        updatedParsedString = updatedParsedString === null || updatedParsedString === void 0 ? void 0 : updatedParsedString.replace(new RegExp(tableTag, 'g'), updatedTableTag);
    }
    return updatedParsedString;
};
export const CcfContactEditorSlice = createSlice({
    name: CONTACT_EDITOR_KEY,
    initialState: {},
    reducers: {
        /**
         *  Function to set initial editor slice
         * @param state - ContactEditorSlice
         * @param action  - PayloadAction<ContactEditorDetails>
         * @example - dispatch(setInitialEditorSlice())
         * @returns - the inital editor slice
         */
        setInitialEditorSlice: (state, action) => {
            var _a, _b, _c;
            const selectedSkill = (_a = state[action.payload.caseId]) === null || _a === void 0 ? void 0 : _a.selectedSkill;
            if (selectedSkill) {
                const updatedEditorSlice = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, action.payload.ContactEditorDetails), { selectedSkill, customerTyping: (_b = state[action.payload.caseId]) === null || _b === void 0 ? void 0 : _b.customerTyping }) });
                return updatedEditorSlice;
            }
            else {
                const updatedEditorSlice = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, action.payload.ContactEditorDetails), { customerTyping: (_c = state[action.payload.caseId]) === null || _c === void 0 ? void 0 : _c.customerTyping }) });
                return updatedEditorSlice;
            }
        },
        /**
         * Function to remove editor references after case is unassigned/transferred
         * @param state - editor
         * @param action  - PayloadAction(caseId: string)
         * @returns
         * @example - clearContactEditorDetails()
         */
        clearContactEditorDetails: (state, action) => {
            const { caseId } = action.payload;
            if (state[caseId]) {
                delete state[caseId];
            }
        },
        /**
         * Function to set lexical editor state for a case
         * @param state - editor
         * @param action  - PayloadAction<editorState>
         * @returns It returns updated editor slice
         * @example -setContactEditorState()
         */
        setContactEditorState(state, action) {
            var _a;
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { editorState: action.payload.editorState, parsedLexicalString: (_a = action.payload) === null || _a === void 0 ? void 0 : _a.parsedLexicalString }) });
            return updatedEditorState;
        },
        /**
         * this action will be dispatch to set email editor content in case of retry of failed email or forward of email
         * @param state  -InboxState
         * @param action -PayloadAction(caseId: string, emailEditorContentToInsert: string)
         * @example - dispatch(updateEditorStateForEmail(caseId, emailEditorContentToInsert))
         */
        updateEditorStateForEmail(state, action) {
            var _a;
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { emailEditorContentToInsert: (_a = action.payload) === null || _a === void 0 ? void 0 : _a.emailEditorContentToInsert }) });
            return updatedEditorState;
        },
        /**
        * this action will be dispatch to update current email editor content by appending new content
        * @param state  -InboxState
        * @param action -PayloadAction(caseId: string, contentToAdd: string)
        * @example - dispatch(upsertEditorStateForEmail(caseId, contentToAdd))
        */
        upsertEditorStateForEmail(state, action) {
            var _a, _b;
            let currentEmailEditorContent = (_a = state[action.payload.caseId]) === null || _a === void 0 ? void 0 : _a.parsedLexicalString;
            currentEmailEditorContent = currentEmailEditorContent ? (currentEmailEditorContent + '<br>') : '';
            const newEmailEditorContent = currentEmailEditorContent + ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.contentToAdd);
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { emailEditorContentToInsert: newEmailEditorContent }) });
            return updatedEditorState;
        },
        /**
         * Function to enable/disable send message button
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -updateSendButtonEnabled()
         */
        updateSendButtonEnabled(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isSendButtonEnabled: action.payload.isSendButtonEnabled }) });
            return updatedEditorState;
        },
        /**
         * Function to set isMessageSending flag
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example - dispatch(updateMessageSendingFlag(\{ caseId, isMessageSending \}))
         */
        updateMessageSendingFlag(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isMessageSending: action.payload.isMessageSending }) });
            return updatedEditorState;
        },
        /**
       * Function to update if text is added in editor
       * @param state - editor
       * @param action  - PayloadAction<boolean>
       * @returns It returns updated editor slice
       * @example -updateIsTextAddedInEditor()
       */
        updateIsTextAddedInEditor(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isTextAddedInEditor: action.payload.isTextAddedInEditor }) });
            return updatedEditorState;
        },
        /**
         * Function to disable the discard button
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -setEditorDiscardDisabled()
         */
        setEditorDiscardDisabled(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isDiscardDisabled: action.payload.isDiscardDisabled }) });
            return updatedEditorState;
        },
        /**
         * Function to set editor in focus
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -setIsContactEditorFocused()
         */
        setIsContactEditorFocused(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isEditorFocused: action.payload.isEditorFocused }) });
            return updatedEditorState;
        },
        /**
         * Function to set editor as open
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -setIsContactEditorOpen()
         */
        setIsContactEditorOpen(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isEditorOpen: action.payload.isEditorOpen }) });
            return updatedEditorState;
        },
        /**
         * Function to set if channel is private
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -setIsPrivateContactChannel()
         */
        setIsPrivateContactChannel(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isPrivateChannel: action.payload.isPrivateChannel }) });
            return updatedEditorState;
        },
        /**
         * Function to set replySent value
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -setContactReplySent()
         */
        setContactReplySent(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { replySent: action.payload.replySent }) });
            return updatedEditorState;
        },
        /**
         * Function to set reply data for selected message
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -setSelectedContactMessageReplyData()
         */
        setSelectedContactMessageReplyData(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { selectedMessageReplyData: action.payload.selectedMessageReplyData }) });
            return updatedEditorState;
        },
        /**
         * Function to set the FromAddress value
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setContactFromValue()
         */
        setContactFromValue(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { fromAddress: action.payload.fromAddress }) });
            return updatedEditorState;
        },
        /**
         * Function to set the subject value
         * @param state - editor
         * @param action - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setSubject()
         */
        // setSubject(state, action: PayloadAction<{ caseId: string; subject: string | undefined }>) {
        //   const updatedEditorState = {
        //     ...state,
        //     [action.payload.caseId]: {
        //       ...state[action.payload.caseId],
        //       subject: action.payload.subject,
        //     },
        //   };
        //   return updatedEditorState as ContactEditorSlice;
        // },
        /**
         * Function to set the receiverTo value
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setToValue()
         */
        setEmailToValue(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { receiverTo: action.payload.receiverTo }) });
            return updatedEditorState;
        },
        /**
         * Function to set the receiverCc value
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setCcValue()
         */
        // setCcValue(state, action: PayloadAction<{ caseId: string; receiverCc: string | undefined }>) {
        //   const updatedEditorState = {
        //     ...state,
        //     [action.payload.caseId]: {
        //       ...state[action.payload.caseId],
        //       receiverCc: action.payload.receiverCc,
        //     },
        //   };
        //   return updatedEditorState as ContactEditorSlice;
        // },
        /**
         * Function to set the receiverBcc value
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setBccValue()
         */
        // setBccValue(state, action: PayloadAction<{ caseId: string; receiverBcc: string | undefined }>) {
        //   const updatedEditorState = {
        //     ...state,
        //     [action.payload.caseId]: {
        //       ...state[action.payload.caseId],
        //       receiverBcc: action.payload.receiverBcc,
        //     },
        //   };
        //   return updatedEditorState as ContactEditorSlice;
        // },
        /**
         * Function to set if message draft id is present
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setContactDraftMessageId()
         */
        setContactDraftMessageId(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { messageDraftId: action.payload.messageDraftId }) });
            return updatedEditorState;
        },
        /**
         * Function to set the receiverCc value
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setEmailCcValue()
         */
        setEmailCcValue(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { receiverCc: action.payload.receiverCc }) });
            return updatedEditorState;
        },
        /**
         * Function to set the subject value
         * @param state - editor
         * @param action - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setSubject()
         */
        setEmailSubject(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { subject: action.payload.subject }) });
            return updatedEditorState;
        },
        /**
         * Function to set the receiverBcc value
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -setEmailBccValue()
         */
        setEmailBccValue(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { receiverBcc: action.payload.receiverBcc }) });
            return updatedEditorState;
        },
        /**
         * Function to check if reply is ready to sent in case of retrial of failed message
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -updateIsContactReplyReadyToSent()
         */
        updateIsContactReplyReadyToSent(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isAgentReplyReadyToSent: action.payload.isAgentReplyReadyToSent }) });
            return updatedEditorState;
        },
        /**
         * Function to set selected skill for draft message
         * @param state - editor
         * @param action  - PayloadAction<SelectedSkill>
         * @returns It returns updated editor slice
         * @example -setSelectedSkill()
         */
        setContactSelectedSkill(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { selectedSkill: action.payload.selectedSkill }) });
            return updatedEditorState;
        },
        /**
         * Function to show / hide upload dialog message
         * @param state - editor
         * @param action  - PayloadAction<string>
         * @returns It returns updated editor slice
         * @example -updateUploadDialogBox()
         */
        updateUploadDialogBox(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isUploadDialogEnabled: action.payload.isUploadDialogEnabled }) });
            return updatedEditorState;
        },
        /**
         * Function to enable/disable User Typing status
         * @param state - editor
         * @param action  - PayloadAction<isMessageTypingStarted>
         * @returns It returns updated editor slice
         * @remarks - Dispatch function for sendTyping started/end Events
         * @example -updateTypingIndicator()
         */
        updateTypingIndicator(state, action) {
            var _a;
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { customerTyping: Object.assign(Object.assign({}, (_a = state[action.payload.caseId]) === null || _a === void 0 ? void 0 : _a.customerTyping), { isMessageTypingStarted: action.payload.isMessageTypingStarted }) }) });
            return updatedEditorState;
        },
        /**
         * Function to set whether user sent the message or not
         * @param state - editor
         * @param action  - PayloadAction<isMessageSentByCustomer>
         * @returns It returns updated editor slice
         * @remarks - Dispatch function for MessageAddedIntoCase Events
         * @example -userSentMessage()
         */
        userSentMessage(state, action) {
            var _a;
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { customerTyping: Object.assign(Object.assign({}, (_a = state[action.payload.caseId]) === null || _a === void 0 ? void 0 : _a.customerTyping), { isMessageSentByCustomer: action.payload.isMessageSentByCustomer }) }) });
            return updatedEditorState;
        },
        /**
         * Function to set user Typing message
         * @param state - editor
         * @param action  - PayloadAction<messagePreview>
         * @returns It returns updated editor slice
         * @remarks - Dispatch function for MessagePreviewCreated Events
         * @example - updateIsTypingPreviewWithText()
         */
        updateIsTypingPreviewWithText(state, action) {
            var _a;
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { customerTyping: Object.assign(Object.assign({}, (_a = state[action.payload.caseId]) === null || _a === void 0 ? void 0 : _a.customerTyping), { messagePreview: action.payload.messagePreview }) }) });
            return updatedEditorState;
        },
        /**
         * Function to show/hide editor in both normal and failed to send message scenario
         * @param state - editor
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated editor slice
         * @example -updateIsAgentReplyReadyToSent()
         */
        updateIsAgentReplyReadyToSent(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isAgentReplyReadyToSent: action.payload.isAgentReplyReadyToSent }) });
            return updatedEditorState;
        },
        /**
         * Function to update the isCopiedFromExcel flag
         * @param state - editor
         * @param action  - PayloadAction<isCopiedFromExcel>
         * @returns It returns updated editor slice
         * @example - updateIsCopiedFromExcel()
         */
        updateIsCopiedFromExcel(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isCopiedFromExcel: action.payload.isCopiedFromExcel }) });
            return updatedEditorState;
        },
        /**
         * Function to update the isCopiedFromExcel flag
         * @param state - editor
         * @param action  - PayloadAction<isCopiedFromExcel>
         * @returns It returns updated editor slice
         * @example - updateIsCopiedFromExcel()
         */
        setMessageId(state, action) {
            if (action.payload.caseId) {
                const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { message: action.payload.message }) });
                return updatedEditorState;
            }
            else {
                return state;
            }
        },
        /**
         * Function to clear the selected message to reply
         * @param state - editor
         * @param action  - PayloadAction<isCopiedFromExcel>
         * @returns It returns updated editor slice
         * @example - clearMessageId()
         */
        clearMessageId(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { message: {} }) });
            return updatedEditorState;
        },
        /**
         * Function to reset message send status
         * @param state - AppState
         * @param action - action.payload
         * @example -
         * ```
         * dispatch(setMessageSendStatus('success'));
         * ```
         * @returns updated state
         */
        setMessageSendStatus(state, action) {
            return Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { messageSendState: action.payload.status }) });
        },
        /**
         * Function to set draft message payload
         * @param state - AppState
         * @param action - action.payload
         * @example -
         * ```
         * dispatch(setDraftMessagePayload({content: 'draft'}));
         * ```
         * @returns updated state
         */
        setDraftMessagePayload(state, action) {
            return Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { draftMessagePayload: action.payload.messagePayload }) });
        },
        /**
         * Function to update isUploadingAttachment flag when attachment is started uploading
         * @param state - editor
         * @param action  - PayloadAction
         * @returns It returns updated editor slice
         * @example - updateIsUploadingAttachment(state, action)
         */
        updateIsUploadingAttachment(state, action) {
            const updatedEditorState = Object.assign(Object.assign({}, state), { [action.payload.caseId]: Object.assign(Object.assign({}, state[action.payload.caseId]), { isUploadingAttachment: action.payload.isUploadingAttachment }) });
            return updatedEditorState;
        },
        /**
         * Generic action to set multiple editor fields through single dispatch
         * @param state - editor
         * @param caseId  - string
         * @param action  - PayloadAction<ContactEditorDetails>
         * @returns It returns updated editor state
         * @example -updateContactEditorFields()
         */
        updateContactEditorFields(state, action) {
            const _a = action.payload, { caseId } = _a, fieldsToUpdate = __rest(_a, ["caseId"]);
            if (!state[caseId])
                return;
            updateFields(state[caseId], fieldsToUpdate);
        },
    },
});
/**
 * onBoldClick to make Text Input bold
 * @example createendUserRecipients();
 */
export const createContactEndUserRecipients = (data) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { activeContact, selectedDigitalContactDetails, receiverTo, receiverCc, receiverBcc, wysiwygEnabled, isOBContact, isRequestForApproval } = data;
    let recipients;
    const idOnExternalPlatform = (_a = activeContact === null || activeContact === void 0 ? void 0 : activeContact.customerName) !== null && _a !== void 0 ? _a : selectedDigitalContactDetails.channel.idOnExternalPlatform;
    if (wysiwygEnabled) {
        recipients = [];
        if (receiverTo) {
            receiverTo.split(',').forEach((email) => {
                const trimEmail = email.trim();
                if (trimEmail) {
                    recipients.push({
                        idOnExternalPlatform: trimEmail,
                        name: '',
                        isPrimary: true,
                        isPrivate: false,
                    });
                }
            });
        }
        if (receiverCc) {
            receiverCc.split(',').forEach((email) => {
                const trimEmail = email.trim();
                if (trimEmail) {
                    recipients.push({
                        idOnExternalPlatform: trimEmail,
                        name: '',
                        isPrimary: false,
                        isPrivate: false,
                    });
                }
            });
        }
        if (receiverBcc) {
            receiverBcc.split(',').forEach((email) => {
                const trimEmail = email.trim();
                if (trimEmail) {
                    recipients.push({
                        idOnExternalPlatform: trimEmail,
                        name: '',
                        isPrimary: false,
                        isPrivate: true,
                    });
                }
            });
        }
    }
    else {
        //Recipients Filled On Backed hence making it empty
        if (!isOBContact && !isRequestForApproval && ((_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _b === void 0 ? void 0 : _b.isPrivate) && !((_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasAbilityToChangeRecipient)) {
            recipients = [];
        }
        else {
            // TODO (IMPORTANT): To fix SMS channel's new case creation on reply, we have written below channel specific logic
            // In future release, we need to update below codes & use recipients field from Details API instead of channel's idOnExternalPlatform
            const isSmsChannel = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.channelName) === 'Sms';
            recipients = [{
                    idOnExternalPlatform: isSmsChannel ?
                        (((_e = (_d = selectedDigitalContactDetails.case.recipients) === null || _d === void 0 ? void 0 : _d.find((recipient) => recipient.idOnExternalPlatform !== 'foo@bar.com')) === null || _e === void 0 ? void 0 : _e.idOnExternalPlatform) || idOnExternalPlatform) :
                        (((_h = (_g = (_f = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _f === void 0 ? void 0 : _f.endUser) === null || _g === void 0 ? void 0 : _g.identities[0]) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform) || ((_j = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _j === void 0 ? void 0 : _j.idOnExternalPlatform) || idOnExternalPlatform),
                    name: '',
                    isPrimary: true,
                    isPrivate: false,
                }];
        }
    }
    return recipients;
};
/**
  * Updates the src attributes of img elements in the provided Lexical HTML string
 *  with corresponding image IDs from the array of inline images.
 *
 * @param parsedLexicalString - The input HTML string to be modified.
 * @param inlineImages - An array of inline images with imageId property.
 * @returns - The modified HTML string.
 * @example - updateStringForInlineImages()
 */
function updateStringForInlineImages(parsedLexicalString, inlineImages) {
    // Create a temporary div element to insert HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = parsedLexicalString !== null && parsedLexicalString !== void 0 ? parsedLexicalString : '';
    // Find all imgElement
    const imgElements = tempDiv.querySelectorAll('img');
    if (imgElements && inlineImages) {
        imgElements.forEach((imgElement) => {
            // To ensure inline images are sent correctly in outbound messages, we require img src containing 'attachmentId:{imageId}' format and so that we need to update imgElements.
            const imageId = imgElement.getAttribute('data-uploaded-image-id');
            // This ensures that only the image that matches the one currently being viewed in the editor is sent out.
            const matchingImage = inlineImages.find(image => image.imageId === imageId);
            if (matchingImage) {
                // we update the src of the imgElement to use the correct URL format with 'attachmentId:{imageId}'
                imgElement.src = `attachmentId:${matchingImage.imageId}`;
            }
        });
    }
    return tempDiv.innerHTML;
}
/**
   * Function to populate attachments based on the provided contact
   * @example populateAttachments()
   * @param contact - The contact object containing attachments and inline images.
   * @param replyObj - The reply object to which attachments will be assigned.
   */
function populateAttachments(activeContact, replyObj) {
    var _a, _b;
    const attachments = [];
    // Check for attachments and add them to the list
    if ((_a = activeContact === null || activeContact === void 0 ? void 0 : activeContact.attachments) === null || _a === void 0 ? void 0 : _a.length) {
        activeContact.attachments.forEach((attachment) => {
            // Removing the forwarded attachments, only newly attached files should be sent
            if (!attachment.isForwardedAttachment) {
                attachments.push({ id: attachment.attachmentId, friendlyName: attachment.name, url: attachment.url, isInline: (attachment.attachmentId) ? true : false });
            }
        });
    }
    // Check for inline images and add them to the list
    if ((_b = activeContact === null || activeContact === void 0 ? void 0 : activeContact.inlineImages) === null || _b === void 0 ? void 0 : _b.length) {
        activeContact.inlineImages.forEach((inlineImage) => {
            // Removing the forwarded attachments, only newly attached files should be sent
            if (!inlineImage.isForwardedAttachment) {
                attachments.push({ friendlyName: inlineImage.name, url: inlineImage.url, isInline: inlineImage.isInline, id: inlineImage.imageId });
            }
        });
    }
    // Assign the attachments to the reply object
    replyObj.attachments = attachments;
}
/**
 * Function to remove forwarded message content and to keep only newly added content
 * @param messageText - original message before forward
 * @returns  updated message with only newly added content
 * @example removeForwardedContent(messageText)
 */
function removeForwardedContent(messageText) {
    if (!messageText)
        return '';
    const index = messageText === null || messageText === void 0 ? void 0 : messageText.indexOf(BEGIN_FORWARDED_MESSAGE);
    if (index !== -1) {
        messageText = messageText
            .substring(0, index)
            .replace(/<span[^>]*>$/, '') // Remove the incomplete <span> tag from the end of the string
            .replace(/(<br\s*\/?>\s*)+$/, ''); // Remove the last <br> tags from the end of the string to avoid extra space
    }
    return messageText;
}
/**
 * Function prepare send reply object
 * @example - prepareReply()
 */
export const prepareReply = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { activeContact, selectedDigitalContactDetails, wysiwygEnabled, isEditorOpen, selectedMessageReplyData, subject, receiverTo, receiverCc, receiverBcc, isOBContact, savedDigitalContactDetails, parsedLexicalString, translationSettings, elevatedInteractionId, elevatedFrom, isReplyToSpecificMessage, repliedToMessageId } = data;
    const isRequestForApproval = false;
    // Generate a modified string considering inline images in the Lexical String
    const parsedInlineImageString = updateStringForInlineImages(parsedLexicalString, activeContact === null || activeContact === void 0 ? void 0 : activeContact.inlineImages);
    // Check if activeContact exists and has inlineImages with at least one element
    let generatedText = activeContact && activeContact.inlineImages && activeContact.inlineImages.length > 0
        // If true, use the parsedInlineImageString if it exists, or fallback to parsedLexicalString, or an empty string
        ? (parsedInlineImageString || parsedLexicalString || '')
        // If false (no activeContact or no inlineImages), use the parsedLexicalString if it exists, or an empty string
        : (parsedLexicalString || '');
    if (translationSettings && translationSettings.isTranslateAgentMessages) {
        const translationResponse = yield CXoneDigitalClient.instance.digitalService.translateMessages([
            {
                text: generatedText,
                from: Object.keys(translationSettings.agentLanguage)[0],
                to: Object.keys(translationSettings.customerLanguage)[0],
            }
        ]);
        CXoneDigitaltranslationApiResponseSchema.validate(translationResponse);
        const yupMessageApiResponse = CXoneDigitaltranslationApiResponseSchema.cast(translationResponse);
        if ((yupMessageApiResponse === null || yupMessageApiResponse === void 0 ? void 0 : yupMessageApiResponse.result) && ((_a = yupMessageApiResponse === null || yupMessageApiResponse === void 0 ? void 0 : yupMessageApiResponse.result) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            generatedText = yupMessageApiResponse === null || yupMessageApiResponse === void 0 ? void 0 : yupMessageApiResponse.result[0].text;
        }
    }
    // removed the forwarded content from the message
    if (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isEmailForward) {
        generatedText = removeForwardedContent(generatedText);
    }
    const replyObject = {
        messageContent: {
            type: 'TEXT',
            payload: {
                text: generatedText,
            },
        },
        recipients: createContactEndUserRecipients({ activeContact, selectedDigitalContactDetails, receiverTo, receiverCc, receiverBcc, wysiwygEnabled, isOBContact, isRequestForApproval }),
    };
    if (((_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.threadIdOnExternalPlatform) !== '') {
        if (isEditorOpen) {
            replyObject['thread'] = {
                idOnExternalPlatform: selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.threadIdOnExternalPlatform,
            };
        }
        else {
            replyObject['thread'] = {
                idOnExternalPlatform: (_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _c === void 0 ? void 0 : _c.threadIdOnExternalPlatform,
            };
        }
    }
    // in case of forward the messageId will be present and adding that part of replyObject
    if (selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.messageId) {
        replyObject['forward'] = {
            message: {
                id: selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.messageId,
            },
        };
    }
    if (!wysiwygEnabled && isReplyToSpecificMessage) {
        replyObject.isReplyToSpecificMessage = true;
        replyObject.replyToMessage = { idOnExternalPlatform: repliedToMessageId };
    }
    if (wysiwygEnabled) {
        if (replyObject === null || replyObject === void 0 ? void 0 : replyObject.thread) {
            replyObject.thread['threadName'] = subject;
        }
        else {
            replyObject['thread'] = { threadName: subject };
        }
        // we don't need replyToMessage in case of email forward(its optional parameter) as it duplicates the original message thread in the email.
        if ((!(savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isEmailForward) && !isOBContact)) {
            replyObject.replyToMessage = { idOnExternalPlatform: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.messageId };
        }
        replyObject.title = subject;
        replyObject.originChannel = {
            id: (_d = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _d === void 0 ? void 0 : _d.id,
        };
    }
    if (!(savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isEmailForward) && !isOBContact && isEditorOpen) {
        replyObject.replyToMessage = { idOnExternalPlatform: selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.idOnExternalPlatform };
    }
    if (activeContact) {
        populateAttachments(activeContact, replyObject);
    }
    if (elevatedInteractionId && elevatedFrom) {
        replyObject.contact = {
            elevation: {
                interaction: { id: elevatedInteractionId },
                fromProvider: elevatedFrom,
            },
        };
    }
    if (selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.digitalSkillId) {
        replyObject.contact = Object.assign(Object.assign({}, replyObject.contact), { skillId: selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.digitalSkillId });
    }
    return replyObject;
});
export const CcfContactEditorAction = CcfContactEditorSlice.actions;
export const CcfContactEditorReducer = CcfContactEditorSlice.reducer;
export const initialEditorState = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
let thunkDispatch;
/**
 * This method to get empty editor state.
 * @example getEmptyEditorState();
 */
export const getEmptyEditorState = () => JSON.parse(initialEditorState);
/**
 * will used to clear editor content and change related flags.
 * @param dispatch  - action to clear editor
 * @param wysiwygEnabled  - to check if email
 * @param caseId - selected case id
 * @example clearEditorAfterMessageSent(dispatch, wysiwygEnabled, editorState, caseId);
 */
const clearEditorAfterMessageSent = (dispatch, wysiwygEnabled, caseId) => {
    // Before clearing the editor we need to reset digital contact saved properties
    if (!wysiwygEnabled)
        resetDigitalContactSavedProperties(dispatch, caseId);
    setEditorEmptyStates(dispatch, caseId, wysiwygEnabled);
    dispatch(CcfContactEditorAction.setIsContactEditorOpen({ caseId, isEditorOpen: false }));
    // once agent clicks on sendMessage button we consider it as ready to send and we are closing the editor
    dispatch(CcfContactEditorAction.updateIsContactReplyReadyToSent({ caseId, isAgentReplyReadyToSent: true }));
};
/**
 * will used to set empty state and focus on editor.
 * @param dispatch  - action to set empty editor state and focus
 * @param wysiwygEnabled  - to check if email
 * @param caseId - selected case id
 * @example setEditorEmptyStates(dispatch, wysiwygEnabled, editorState, caseId);
 */
const setEditorEmptyStates = (dispatch, caseId, wysiwygEnabled) => {
    if (!wysiwygEnabled) {
        dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState: initialEditorState }));
        // This is to apply focus border color on Editor after reply sent
        dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: true }));
    }
    else {
        dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState: initialEditorState }));
    }
};
/**
 * used to call incase of both failure and success scenario of send reply
 * @param dispatch  - to dispatch the actions
 * @param caseId  - selected case id
 * @param interactionId  - interaction id
 * @param wysiwygEnabled  - wysiwygEnabled
 * @param isPrivateChannel  - is private channel
 * @example onContactSendMessageResponse(caseId, dispatch);
 */
const onContactSendMessageResponse = (dispatch, caseId, interactionId, wysiwygEnabled, isPrivateChannel) => {
    dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId, interactionId }));
    if (wysiwygEnabled || !isPrivateChannel) {
        dispatch(CcfContactEditorAction.setContactReplySent({ caseId, replySent: true }));
        dispatch(CcfAssignmentAction.deleteDigitalUserSavedPropertiesOfACase(caseId));
    }
    dispatch(CcfContactEditorAction.updateIsContactReplyReadyToSent({ caseId, isAgentReplyReadyToSent: false }));
};
/**
 * used to update indexeddb and state after message failure
 * @param xTraceId - to identify if the message is new one or failed one
 * @param caseId  - selected case id
 * @param sendReplyObj  - payload from failed outbound api call
 * @param outboundMessageAuthor  - author of outbound message
 * @param dispatch  - action to set failed messages
 * @example onContactSendMessageFailure(xTraceId, caseId, sendReplyObj, outboundMessageAuthor, dispatch);
 */
// TODO: Will remove the eslint disable as part of upcoming eslint backlog revamp story
// eslint-disable-next-line
const onContactSendMessageFailure = (wysiwygEnabled, xTraceId, caseId, outboundMessageAuthor, dispatch, sendReplyObj, draftMessageForApproval, fromAddress) => {
    dispatch(CcfContactEditorAction.setContactReplySent({ caseId, replySent: true }));
    // in case of message failure remove its attachments, as we will not be retaining it for retry.
    if ((sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.attachments) && (sendReplyObj === null || sendReplyObj === void 0 ? void 0 : sendReplyObj.attachments.length)) {
        sendReplyObj.attachments = [];
    }
    updateIndexDbWithFailedMessage(xTraceId, caseId, outboundMessageAuthor, wysiwygEnabled, undefined, sendReplyObj, draftMessageForApproval, fromAddress);
    dispatch(CcfAssignmentAction.setInteractionFailedMessage({
        caseId,
        xTraceId,
        sendReplyObj,
        draftMessageForApproval,
        messageAuthor: outboundMessageAuthor,
        wysiwygEnabled,
        fromAddress,
    }));
};
/**
 * used to remove indexeddb and state after message succefull retry
 * @param dispatch  - action to set failed messages
 * @param caseId  - selected case id
 * @param failedXTraceId - identifier for message
 * @example onConatctSendMessageSuccess(dispatch, caseId, failedXTraceId)
 */
export const onConatctSendMessageSuccess = (dispatch, caseId, failedXTraceId) => __awaiter(void 0, void 0, void 0, function* () {
    yield removeFailedMessageFromIndexDb(caseId, failedXTraceId);
    dispatch(CcfAssignmentAction.removeInteractionFailedMessage({ caseId, failedXTraceId }));
});
export const sendMessageReply = createAsyncThunk('contactEditor/sendMessageReply', ({ caseId, elevatedInteractionId, elevatedFrom, failedXTraceId, sendReplyObj }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const state = getState();
    const { inbox, contactEditor, agentState, isCopiedFromExcel } = state;
    const activeContact = getActiveContactState(inbox);
    const interactionId = activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId;
    const translationSettings = (_f = (_e = inbox.translationSettings) === null || _e === void 0 ? void 0 : _e[interactionId]) === null || _f === void 0 ? void 0 : _f[caseId];
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    const wysiwygEnabled = !!((_g = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _g === void 0 ? void 0 : _g.wysiwygEnabled);
    const isOBContact = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.isOutbound) && ((_h = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _h === void 0 ? void 0 : _h.status) === DigitalContactStatus.DRAFT ? true : false;
    const digitalContactUserSavedProperties = inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactUserSavedProperties;
    const savedDigitalContactDetails = digitalContactUserSavedProperties[(_j = selectedDigitalContactDetails.case) === null || _j === void 0 ? void 0 : _j.id];
    const { subject, isEditorOpen, editorState, selectedMessageReplyData, receiverTo, receiverCc, receiverBcc, messageDraftId, fromAddress, isPrivateChannel } = contactEditor[caseId];
    let { parsedLexicalString } = contactEditor[caseId];
    const outboundMessageAuthor = ((_k = agentState === null || agentState === void 0 ? void 0 : agentState.userInfo) === null || _k === void 0 ? void 0 : _k.firstName) + ' ' + ((_l = agentState === null || agentState === void 0 ? void 0 : agentState.userInfo) === null || _l === void 0 ? void 0 : _l.lastName);
    // selectedReplyMsg will give the message details if the message is replied to specific message
    const selectedReplyMsg = (_m = digitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _m === void 0 ? void 0 : _m.message;
    // isReplyToSpecificMessage will be true if the message is replied to specific message
    const isReplyToSpecificMessage = (selectedReplyMsg && Object.keys(selectedReplyMsg).length > 0);
    // repliedToMessageId will be the message id of the message to which the current message is replied to
    const repliedToMessageId = isReplyToSpecificMessage ? selectedReplyMsg === null || selectedReplyMsg === void 0 ? void 0 : selectedReplyMsg.idOnExternalPlatform : '';
    if (wysiwygEnabled) {
        dispatch(CcfContactEditorAction.updateMessageSendingFlag({ caseId, isMessageSending: true }));
    }
    else {
        // Dev Note: Fix applied for AW-30007, in case of plain text editor send button should be disable when sending attachments
        dispatch(CcfContactEditorAction.updateMessageSendingFlag({ caseId, isMessageSending: ((_o = activeContact === null || activeContact === void 0 ? void 0 : activeContact.attachments) === null || _o === void 0 ? void 0 : _o.length) ? true : false }));
    }
    // If the message is not not an email and replied to specific message remove the details
    if (!wysiwygEnabled && isReplyToSpecificMessage) {
        dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
            caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId,
            fieldsToUpdate: {
                receiverTo: '',
                receiverCc: '',
                receiverBcc: '',
                sender: '',
                subject: '',
                isResponse: false,
                lexicalEditorState: getEmptyEditorState(),
                channelDisplayName: '',
                isReplyingToSpecificMessage: false,
                message: {},
                isRejectedMessageCopied: false,
            },
        }));
    }
    // If the message is not copied from excel then we need to remove the extra border from the message
    if (wysiwygEnabled && !isCopiedFromExcel) {
        // If the message has rich HTML table then we need to update the border style
        parsedLexicalString = updateHTMLTableBorder(parsedLexicalString);
    }
    // failedXTraceId is uuid of message failed to send, it will have value if we are retrying to send the failed message again
    // else create a unique UUID for the new message or if its retry then use the previously generated UUId
    const xTraceId = messageDraftId || failedXTraceId || uuid();
    // clear the editor as soon as agent hits enter/send button despite of outbound success or failure.
    clearEditorAfterMessageSent(dispatch, wysiwygEnabled, caseId);
    // If messageDraftId is available and not copied message then will update the draft message and send the approval
    if (messageDraftId && !(savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isRejectedMessageCopied)) {
        thunkDispatch = dispatch;
        updateContactDraftMessage(selectedDigitalContactDetails, wysiwygEnabled, parsedLexicalString, messageDraftId, fromAddress);
        return;
    }
    // If its new message then we will prepare reply object in case if failed message retry we will retrive this from indexedDB as parameter to this function
    if (!failedXTraceId)
        sendReplyObj = yield prepareReply({
            activeContact,
            selectedDigitalContactDetails,
            wysiwygEnabled,
            editorState,
            isEditorOpen,
            selectedMessageReplyData,
            subject,
            receiverTo,
            receiverCc,
            receiverBcc,
            isOBContact,
            savedDigitalContactDetails,
            parsedLexicalString,
            translationSettings,
            elevatedInteractionId,
            elevatedFrom,
            isReplyToSpecificMessage: isReplyToSpecificMessage,
            repliedToMessageId: repliedToMessageId,
        });
    const fromChannelId = ((wysiwygEnabled && !isOBContact)
        ? (_q = (_p = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.replyChannels) === null || _p === void 0 ? void 0 : _p.find(channel => (channel === null || channel === void 0 ? void 0 : channel.name) === fromAddress)) === null || _q === void 0 ? void 0 : _q.id
        : (_r = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _r === void 0 ? void 0 : _r.id);
    //Dev Note: Change added for for visual indicators
    const payload = {
        traceId: xTraceId,
        interactionId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId) || '',
        caseId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '',
        replyPayload: sendReplyObj,
    };
    const isTrackingMessageDeliveryStatus = (_s = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _s === void 0 ? void 0 : _s.isTrackingMessageDeliveryStatus;
    const isSyfPerfEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-syf-performance-generic-AW-46709" /* FeatureToggles.SYF_PERFORMANCE_GENERIC_TOGGLE */);
    // In case of private channels (gated by SYF_PERFORMANCE_GENERIC_TOGGLE), display delayed status visual indicator
    if (isTrackingMessageDeliveryStatus || (isSyfPerfEnabled && isPrivateChannel)) {
        logger.trace('sendMessageReply', 'privateChannel (gated) condition to setDraftMessagePayload :: ' + JSON.stringify(payload));
        dispatch(CcfContactEditorAction.setDraftMessagePayload({ caseId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '', messagePayload: payload }));
        //set message status to pending to push the draft message in state and display delayed icon
        dispatch(CcfContactEditorAction.setMessageSendStatus({ caseId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '', status: ReplyAPIStatus.PENDING }));
    }
    selectedDigitalContactDetails
        .reply(sendReplyObj, fromChannelId, xTraceId)
        .then(() => {
        dispatch(CcfContactEditorAction.updateMessageSendingFlag({ caseId, isMessageSending: false }));
        dispatch(CcfContactEditorAction.clearMessageId({ caseId: caseId }));
        onContactSendMessageResponse(dispatch, caseId, interactionId, wysiwygEnabled, isPrivateChannel);
        // Dev Note: Change added for for visual indicators
        // In case of private channels (gated) or tracking channels, update the message status to Sent for visual indicator
        if (isTrackingMessageDeliveryStatus || (isSyfPerfEnabled && isPrivateChannel)) {
            dispatch(CcfContactEditorAction.setMessageSendStatus({ caseId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '', status: ReplyAPIStatus.SUCCESS }));
        }
        //Removed Digital ob contact
        if (isOBContact) {
            SessionStorageHelper.removeItem(StorageKeys.SELECTED_CASE_ID);
            removeObContactFromStorage(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, selectedDigitalContactDetails);
            dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                interactionId: selectedDigitalContactDetails.interactionId,
                contactId: selectedDigitalContactDetails.caseId,
            }));
        }
        if (isEditorOpen) {
            dispatch(CcfContactEditorAction.setIsContactEditorOpen({ caseId, isEditorOpen: false }));
        }
        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.channelName) === DigitalChannelType.EMAIL)
            uploadLSForEditor(selectedDigitalContactDetails, digitalContactUserSavedProperties);
        if (failedXTraceId) {
            // when we are retrying to send the failed message and it got successfully sent then we will clear out the indexDb & store
            onConatctSendMessageSuccess(dispatch, caseId, failedXTraceId);
        }
    })
        .catch((err) => {
        var _a, _b, _c, _d, _e;
        const errorResponse = (_d = (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d[0];
        const errorMessage = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.message;
        const errorCode = (_e = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.parameters) === null || _e === void 0 ? void 0 : _e.errorCode;
        if (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.includes('Array should have at least 1 items')) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "outboundReplyGenericError" }), {
                autoClose: 5000,
                containerId: 'ComponentToastContainer',
            });
        }
        else if (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.includes('Elevation not possible')) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "outboundElevationFailed" }), {
                autoClose: 5000,
                containerId: 'ComponentToastContainer',
            });
        }
        else if (errorCode === 'cannotAddMoreMessagesToPost') {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "closedForAddingNewMessages" }), {
                autoClose: 5000,
                containerId: 'ComponentToastContainer',
            });
        }
        else {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: errorMessage ? 'outboundReplyError' : 'outboundReplyGenericError', extraArgs: { format: errorMessage ? [errorMessage] : [] } }), {
                autoClose: 5000,
                containerId: 'ComponentToastContainer',
            });
        }
        dispatch(CcfContactEditorAction.updateMessageSendingFlag({ caseId, isMessageSending: false }));
        // Dev Note: Change added for for visual indicators
        // In case of private channels (gated) or tracking channels, set error status when message send fails
        if (isTrackingMessageDeliveryStatus || (isSyfPerfEnabled && isPrivateChannel)) {
            dispatch(CcfContactEditorAction.setMessageSendStatus({ caseId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '', status: ReplyAPIStatus.ERROR }));
        }
        dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: true }));
        logger.error('sendMessageReply', `error while sending message reply - ${JSON.stringify(err)}`);
        dispatch(CcfContactEditorAction.setEditorDiscardDisabled({ caseId, isDiscardDisabled: false }));
        onContactSendMessageResponse(dispatch, caseId, interactionId, wysiwygEnabled, isPrivateChannel);
        // To handle the error scenario when message failure happens and update the indexDB with the Failed message for the retry
        // when we are retrying for the already failed message then in that case we don't need to update the indexDb again
        if (!failedXTraceId) {
            onContactSendMessageFailure(wysiwygEnabled, xTraceId, caseId, outboundMessageAuthor, dispatch, sendReplyObj, undefined, fromAddress);
        }
    }).finally(() => {
        if (isTrackingMessageDeliveryStatus || (isSyfPerfEnabled && isPrivateChannel)) {
            dispatch(CcfContactEditorAction.setMessageSendStatus({ caseId: (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '', status: ReplyAPIStatus.IDEAL }));
        }
    });
}));
/**
 * Used to update the draft message
 * @example -
 * updateContactDraftMessage(selectedDigitalContactDetails, wysiwygEnabled, editorState, messageDraftId);
 */
export const updateContactDraftMessage = (selectedDigitalContactDetails, wysiwygEnabled, parsedLexicalString, messageDraftId, fromAddress) => {
    var _a, _b;
    const fromChannelId = (_b = (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.replyChannels) === null || _a === void 0 ? void 0 : _a.find(channel => (channel === null || channel === void 0 ? void 0 : channel.name) === fromAddress)) === null || _b === void 0 ? void 0 : _b.id;
    const draftMsgObject = {
        messageContent: {
            type: 'TEXT',
            payload: {
                text: parsedLexicalString,
            },
        },
    };
    if (wysiwygEnabled && fromChannelId) {
        draftMsgObject.replyByChannel = {
            id: fromChannelId,
        };
    }
    selectedDigitalContactDetails.updateDraftMessage(draftMsgObject, messageDraftId).then(() => {
        thunkDispatch(approveContactDraftMessage(messageDraftId));
    })
        .catch((err) => {
        var _a, _b, _c, _d;
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'updateDraftMessageError', extraArgs: { format: [(_d = (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.errors[0]) === null || _d === void 0 ? void 0 : _d.message] } }), {
            autoClose: 2000,
            containerId: 'ComponentToastContainer',
        });
    });
};
/**
 * Method used to reset digital contact saved properties
 * @param dispatch  - action to set empty editor state and focus
 * @param caseId - selected case id
 * @example resetDigitalContactSavedProperties(dispatch, caseId);
 */
export const resetDigitalContactSavedProperties = (dispatch, caseId) => {
    dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
        caseId: caseId,
        fieldsToUpdate: {
            receiverTo: '',
            receiverCc: '',
            receiverBcc: '',
            sender: '',
            subject: '',
            isResponse: true,
            lexicalEditorState: getEmptyEditorState(),
            messageId: '',
            channelDisplayName: '',
            isEditorOpen: false,
            messageDraftId: '',
            isRejectedMessageCopied: false,
        },
    }));
};
/**
 * Used to approve the draft message
 * @param draftMessageId - Id for the drafted message
 * @example - approveContactDraftMessage(messageDraftId);
 */
export const approveContactDraftMessage = createAsyncThunk('contactEditor/approveDraftMessage', (messageDraftId, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    const { inbox, contactEditor } = getState();
    const activeContact = getActiveContactState(inbox);
    dispatch(CcfRejectedReasonAction.setIsApprovalActionInProgress({ caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, draftMessageId: messageDraftId, isInProgress: true }));
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    const caseId = selectedDigitalContactDetails.caseId;
    const wysiwygEnabled = !!((_t = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _t === void 0 ? void 0 : _t.wysiwygEnabled);
    selectedDigitalContactDetails.approveDraftMessage(messageDraftId).then(() => {
        var _a;
        !(activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox) && dispatch(getContactDetailsForSelectedContact({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, isAssignedToAgentInbox: activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox, forceFetch: true })); //call detail API to update the case on approving the requested approval message in case of view only case
        const { isPrivateChannel, isEditorOpen } = (_a = contactEditor[caseId]) !== null && _a !== void 0 ? _a : {};
        //If email or public channel message is sent for approval then removing the case details from redux store and local storage
        if (wysiwygEnabled || !isPrivateChannel) {
            dispatch(CcfContactEditorAction.setContactReplySent({ caseId, replySent: true }));
            dispatch(CcfAssignmentAction.deleteDigitalUserSavedPropertiesOfACase(caseId));
            const digitalContactUserSavedProperties = inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactUserSavedProperties;
            uploadLSForEditor(selectedDigitalContactDetails, digitalContactUserSavedProperties);
        }
        if (isEditorOpen)
            dispatch(CcfContactEditorAction.setIsContactEditorOpen({ caseId, isEditorOpen: false }));
    }).catch((error) => {
        var _a;
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'ApproveDraftMessageError', extraArgs: { format: [(_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.data] } }), {
            autoClose: 2000,
            containerId: 'ComponentToastContainer',
        });
        dispatch(CcfRejectedReasonAction.setIsApprovalActionInProgress({ caseId, draftMessageId: messageDraftId, isInProgress: false }));
    });
}));
/**
 * Used to delete the drafted message
 * @param draftMessageId - Id for the drafted message
 * @example - deleteContactDraftMessage(draftMessageId);
 */
export const deleteContactDraftMessage = createAsyncThunk('contactEditor/deleteDraftMessage', (draftMessageId, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { inbox } = getState();
    const activeContact = getActiveContactState(inbox);
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    selectedDigitalContactDetails.deleteDraftMessage(draftMessageId).then(() => {
        // after successful API for delete draft we will remove the draft message from the inbox as we don't receive any updated event from WS as of now
        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId) && (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId))
            dispatch(CcfAssignmentAction.deleteDraftMessage({ interactionId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId, caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, draftMessageId: draftMessageId }));
    }).catch((error) => {
        var _a;
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'deleteDraftMessageError', extraArgs: { format: [(_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.data] } }), {
            autoClose: 2000,
            containerId: 'ComponentToastContainer',
        });
    });
}));
/**
 * Function to create draft message payload structure
 * @example prepareDraftMessageObject()
 */
const prepareDraftMessageObject = (data) => {
    var _a;
    const { activeContact, selectedDigitalContactDetails, selectedMessageReplyData, messages, wysiwygEnabled, isPrivateChannel, selectedSkill, subject, receiverTo, receiverCc, receiverBcc, fromChannelId, parsedLexicalString } = data;
    const messageId = selectedMessageReplyData === null || selectedMessageReplyData === void 0 ? void 0 : selectedMessageReplyData.idOnExternalPlatform;
    const replyToMessageId = (_a = messages === null || messages === void 0 ? void 0 : messages.find((message) => message.idOnExternalPlatform === messageId)) === null || _a === void 0 ? void 0 : _a.id;
    const approvalPayload = (selectedSkill === null || selectedSkill === void 0 ? void 0 : selectedSkill.skillId) ? { skillId: selectedSkill.skillId } : { id: selectedSkill.id };
    const isOBContact = false;
    const isRequestForApproval = true; // this flag used to allow the recipients while sending the approval request.
    const draftObject = {
        id: uuid(),
        messageContent: {
            type: 'TEXT',
            payload: {
                text: parsedLexicalString || '',
            },
        },
        recipients: createContactEndUserRecipients({ activeContact, selectedDigitalContactDetails, receiverTo, receiverCc, receiverBcc, wysiwygEnabled, isOBContact, isRequestForApproval }),
        approvalRoutingQueue: approvalPayload,
        title: subject ? subject : '',
    };
    //wysiwygEnabled and fromChannelId is available then set the reply channel ID in the draftObject
    if (wysiwygEnabled && fromChannelId) {
        draftObject.replyByChannel = {
            id: fromChannelId,
        };
    }
    //replyToMessage is applicable only for public channels and email outbound. 
    if (!isPrivateChannel || wysiwygEnabled) {
        draftObject.replyToMessage = { id: replyToMessageId ? replyToMessageId : '' };
    }
    // Added attachments in draftObject
    if (activeContact && activeContact.attachments && activeContact.attachments.length > 0) {
        const attachments = [];
        activeContact.attachments.forEach((attachment) => {
            attachments.push({ friendlyName: attachment.name, url: attachment.url });
        });
        draftObject.attachments = attachments;
    }
    return draftObject;
};
export const draftContactMessage = createAsyncThunk('contactEditor/draftMessage', (data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _u, _v, _w, _x, _y;
    const state = getState();
    const { selectedSkill, caseId, failedXTraceId } = data;
    let { draftMessagePayload } = data;
    // failedXTraceId is uuid of message failed to send, it will have value if we are retrying to send the failed message again
    const xTraceId = failedXTraceId || uuid();
    const { inbox, contactEditor, agentState, isCopiedFromExcel } = state;
    const activeContact = getActiveContactState(inbox);
    const interactionId = activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId;
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    const wysiwygEnabled = !!((_u = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _u === void 0 ? void 0 : _u.wysiwygEnabled);
    const messages = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.messages;
    const { selectedMessageReplyData, isPrivateChannel, subject, receiverTo, receiverCc, receiverBcc, fromAddress } = (_v = contactEditor[caseId]) !== null && _v !== void 0 ? _v : {};
    let { parsedLexicalString } = (_w = contactEditor[caseId]) !== null && _w !== void 0 ? _w : {};
    const fromChannelId = (_y = (_x = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.replyChannels) === null || _x === void 0 ? void 0 : _x.find(channel => (channel === null || channel === void 0 ? void 0 : channel.name) === fromAddress)) === null || _y === void 0 ? void 0 : _y.id;
    // clear the editor as soon as agent hits enter/send button despite of outbound success or failure.
    clearEditorAfterMessageSent(dispatch, wysiwygEnabled, caseId);
    dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId, interactionId }));
    // we need this dispatch to clear content from editor
    if (wysiwygEnabled || !isPrivateChannel) {
        dispatch(CcfAssignmentAction.deleteDigitalUserSavedPropertiesOfACase(caseId));
    }
    if (wysiwygEnabled && !isCopiedFromExcel) {
        // If the message has rich HTML table then we need to update the border style
        parsedLexicalString = updateHTMLTableBorder(parsedLexicalString);
    }
    // If its new message then we will prepare reply object in case if failed message retry we will retrive this from indexedDB as parameter to this function
    if (!failedXTraceId)
        draftMessagePayload = prepareDraftMessageObject({
            activeContact, selectedDigitalContactDetails, selectedMessageReplyData, messages, wysiwygEnabled, isPrivateChannel, selectedSkill, subject, receiverTo, receiverCc, receiverBcc, parsedLexicalString, fromChannelId,
        });
    selectedDigitalContactDetails
        .createDraftMessage(draftMessagePayload)
        .then((response) => {
        //If email or public channel message is sent for approval then removing the case details from redux store and local storage
        if (wysiwygEnabled || !isPrivateChannel) {
            //Reset digital contact saved properties after successful draft message creation
            resetDigitalContactSavedProperties(dispatch, caseId);
            dispatch(CcfContactEditorAction.setContactReplySent({ caseId, replySent: true }));
            dispatch(CcfAssignmentAction.deleteDigitalUserSavedPropertiesOfACase(caseId));
            const digitalContactUserSavedProperties = inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactUserSavedProperties;
            uploadLSForEditor(selectedDigitalContactDetails, digitalContactUserSavedProperties);
        }
        !(activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox) && dispatch(getContactDetailsForSelectedContact({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, isAssignedToAgentInbox: activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox, forceFetch: true })); //call detail API to update the case on requesting for approval in case of view only case
        logger.info('initiateDraftMessage', JSON.stringify(response));
    })
        .catch((err) => {
        var _a, _b, _c, _d, _e;
        logger.error('initiateDraftMessage', `error while initiating draft message - ${JSON.stringify(err)}`);
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'reqApprovalMessageError', extraArgs: { format: [((_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors[0]) === null || _c === void 0 ? void 0 : _c.message) || ''] } }), {
            autoClose: 2000,
            containerId: 'ComponentToastContainer',
        });
        // To handle the error scenario when message failure happens and update the indexDB with the Failed message for the retry
        // when we are retrying for the already failed message then in that case we don't need to update the indexDb again
        if (!failedXTraceId) {
            onContactSendMessageFailure(wysiwygEnabled, xTraceId, caseId, ((_d = agentState === null || agentState === void 0 ? void 0 : agentState.userInfo) === null || _d === void 0 ? void 0 : _d.firstName) + ' ' + ((_e = agentState === null || agentState === void 0 ? void 0 : agentState.userInfo) === null || _e === void 0 ? void 0 : _e.lastName), dispatch, undefined, draftMessagePayload, fromAddress);
        }
    });
}));
/**
* Thunk action creator to interact with SDK and refuse approval API
*
* @param args - caseId, messageDraftId
* ```
* @example
*  dispatch(
     refuseApproval(argument)
   );
* ```
*/
export const refuseContactApproval = createAsyncThunk('contactEditor/refuseApproval', (data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { inbox } = getState();
    const activeContact = getActiveContactState(inbox);
    dispatch(CcfRejectedReasonAction.setIsApprovalActionInProgress({ caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, draftMessageId: data === null || data === void 0 ? void 0 : data.messageDraftId, isInProgress: true }));
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    selectedDigitalContactDetails.rejectDraftMessage(data.messageDraftId, data.reason).then(() => {
        !(activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox) && dispatch(getContactDetailsForSelectedContact({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, isAssignedToAgentInbox: activeContact === null || activeContact === void 0 ? void 0 : activeContact.isAssignedToAgentInbox, forceFetch: true })); //call detail API to update the case after refusing the approval message in case of view only case
    })
        .catch((error) => {
        logger.error('refuseContactApproval', `error while refusing contact approval - ${JSON.stringify(error)}`);
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'refuseApprovalError' }), {
            autoClose: 2000,
            closeButton: true,
            className: 'publicMessageToast',
            containerId: 'AppToastContainer',
        });
        dispatch(CcfRejectedReasonAction.setIsApprovalActionInProgress({ caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, draftMessageId: data === null || data === void 0 ? void 0 : data.messageDraftId, isInProgress: false }));
    });
}));
/**
*
* Thunk action creator to interact with SDK typing indicator on
* @param typingActionType -  typing action type
* @example - typingIndicatorForPatron(typingActionType);
*/
export const typingIndicatorForPatron = createAsyncThunk('contactEditor/typingIndicatorForPatron', ({ typingActionType }, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _z, _0, _1;
    const { inbox } = getState();
    const activeContact = getActiveContactState(inbox);
    const selectedDigitalContactDetails = getSelectedDigitalContactDetails(activeContact, inbox);
    if (!((_z = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _z === void 0 ? void 0 : _z.wysiwygEnabled)) {
        try {
            yield CXoneDigitalClient.instance.digitalService.setTypingIndicatorForPatron((_0 = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _0 === void 0 ? void 0 : _0.channelId, (_1 = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _1 === void 0 ? void 0 : _1.threadIdOnExternalPlatform, typingActionType);
        }
        catch (error) {
            logger.error('typingIndicatorForPatron', JSON.stringify(error));
        }
    }
}));
/**
 * Function provides editor slice
 * @param rootState - ContactEditorSlice
 * @example const editorSlice = getContactEditorSlice(state)
 */
const getContactEditorSlice = (rootState) => {
    return rootState[CONTACT_EDITOR_KEY];
};
/**
 * Used to get editorState
 * @example - const editorState = useSelector(getContactEditorState(caseId));
 */
export const getContactEditorState = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.editorState; });
/**
 * Used to get isSendButtonEnabled
 * @example - const isSendButtonEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
 */
export const getIsSendMessageButtonEnabled = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isSendButtonEnabled; });
/**
 * Used to get isDiscardDisabled
 * @example - const isDiscardDisabled = useSelector(getIsDiscardDisabled(caseId));
 */
export const getIsContactDiscardDisabled = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isDiscardDisabled; });
/**
 * Used to get isEditorFocused
 * @example - const isEditorFocused = useSelector(getIsContactEditorFocused(caseId));
 */
export const getIsContactEditorFocused = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isEditorFocused; });
/**
 * Used to get content of contact editor
 * Instead of calling editor state each time for content call this selector for message content
 * @example - const isSendButtonEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
 */
export const getContactEditorContent = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.parsedLexicalString; });
/**
* Used to get receiverTo value
* @example - const fromAddress = useSelector(getContactFromAddress(caseId));
*/
export const getContactFromAddress = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.fromAddress; });
/**
 * Used to get receiverTo value
 * @example - const receiverTo = useSelector(getReceiverTo(caseId));
 */
export const getEmailReceiverTo = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.receiverTo; });
/**
 * Used to get receiverCc value
 * @example - const receiverCc = useSelector(getReceiverCc(caseId));
 */
export const getEmailReceiverCc = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.receiverCc; });
/**
 * Used to get receiverBcc value
 * @example - const subject = useSelector(getReceiverBcc(caseId));
 */
export const getEmailReceiverBcc = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.receiverBcc; });
/**
 * Used to get emailEditorContentToInsert
 * @example - const emailEditorContentToInsert = useSelector(emailEditorContentToInsert(caseId));
 */
export const getEmailEditorContentToInsert = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.emailEditorContentToInsert; });
/**
 *Used to get subject value
 * @example - const subject = useSelector(getEmailSubject(caseId));
 */
export const getEmailSubject = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.subject; });
/**
 * Used to get isEditorOpen
 * @example - const isEditorOpen = useSelector(getIsContactEditorOpen(caseId));
 */
export const getIsContactEditorOpen = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isEditorOpen; });
/**
 * Used to get contact reply Sent value
 * @example - const replySent = useSelector(getContactReplySent(caseId));
 */
export const getContactReplySent = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.replySent; });
/**
 * Used to get selectedMessageReplyData
 * @example - const selectedMessageReplyData = useSelector(getSelectedContactMessageReplyData(caseId));
 */
export const getSelectedContactMessageReplyData = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.selectedMessageReplyData; });
/**
 * Used to get getContactSelectedSkill
 * @example - const selectedSkill = useSelector(getContactSelectedSkill(caseId));
 */
export const getContactSelectedSkill = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return ((_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.selectedSkill) || { id: '', name: '', skillId: null }; });
/**
 * Used to get uploadDialog value
 * @example - const showDropMessageDialog = useSelector(getUploadDialogBox(caseId));
 */
export const getUploadDialogBox = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isUploadDialogEnabled; });
/**
* Used to get userTyping all data
* @example - const selectedSkill = useSelector(getUserTypingData(caseId));
*/
export const getUserTypingData = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.customerTyping; });
/**
 * function that returns selected digital contact details
 * @example getSelectedDigitalContactDetails()
 */
export const getSelectedDigitalContactDetails = (activeContact, inbox) => {
    let selectedDigitalContactDetails = {};
    if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId) && (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId)) {
        selectedDigitalContactDetails =
            (inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactDetails[activeContact.interactionId]) ===
                undefined ||
                (inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactDetails[activeContact.interactionId][activeContact.caseId]) === undefined
                ? {}
                : inbox === null || inbox === void 0 ? void 0 : inbox.cxoneDigitalContactDetails[activeContact.interactionId][activeContact.caseId];
    }
    return selectedDigitalContactDetails;
};
/**
* Used to get isAgentReplyReadyToSent
* @param caseId - Selected contact case id
* @example - const isAgentReplyReadyToSent = useSelector(getIsAgentReplyReadyToSent(caseId));
*/
export const getIsAgentReplyReadyToSent = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isAgentReplyReadyToSent; });
/**
* Used to get isCopiedFromExcel
* @param caseId - Selected contact case id
* @example - const isCopiedFromExcel = useSelector(getIsCopiedFromExcel(caseId));
*/
export const getIsCopiedFromExcel = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isCopiedFromExcel; });
/**
* Used to get isMessageSending status
* @param caseId - Selected contact case id
* @example - useSelector(getIsMessageSendingStatus(caseId));
*/
export const getIsMessageSendingStatus = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isMessageSending; });
/** Used to get reply api send status
* @param caseId - Selected contact case id
* @example - useSelector(getMessageSendState(caseId));
*/
export const getMessageSendState = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.messageSendState; });
/**
* Used to get draftMessagePayload
* @param caseId - Selected contact case id
* @example - useSelector(getDraftMessagePayload(caseId));
*/
export const getDraftMessagePayload = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.draftMessagePayload; });
/**
 * Used to get isSendButtonEnabled
 *  @param caseId - Selected contact case id
 * @example - const getIsTextAddedInEditor = useSelector(getIsTextAddedInEditor(caseId));
 */
export const getIsTextAddedInEditor = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isTextAddedInEditor; });
/**
* Used to get uploading attachment status
*  @param caseId - Selected contact case id
* @example - const isUploadingAttachment = useSelector(getIsUploadingAttachment(caseId));
*/
export const getIsUploadingAttachment = (caseId) => createSelector(getContactEditorSlice, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state[caseId]) === null || _a === void 0 ? void 0 : _a.isUploadingAttachment; });
//# sourceMappingURL=ccf-contact-editor.slice.js.map