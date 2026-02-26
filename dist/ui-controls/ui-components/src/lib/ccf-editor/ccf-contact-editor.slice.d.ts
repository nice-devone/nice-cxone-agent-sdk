import { CXoneDigitalReplyRequest, CXoneReplyToMessages, EndUserRecipients, ContactData, DraftMessagePayload, ReplyAPIStatus, CXoneMessage, TypingIndicatorActions } from '@nice-devone/common-sdk';
import { PayloadAction, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { AssignmentState } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { endUserRecipients, replyMessageObject, SelectedSkill } from './ccf-editor-utils';
import { EditorState } from 'lexical';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export declare const CONTACT_EDITOR_KEY = "contactEditor";
export declare const BEGIN_FORWARDED_MESSAGE = "==== Begin forwarded message ====";
export interface TypingIndicatorPreview {
    isMessageSentByCustomer: boolean;
    isMessageTypingStarted: boolean;
    messagePreview?: string;
}
export interface Attachment {
    friendlyName: string;
    url: string;
    isInline?: boolean;
    id?: string;
}
export interface ContactEditorDetails {
    editorState: EditorState;
    isSendButtonEnabled: boolean;
    isDiscardDisabled: boolean;
    isEditorFocused: boolean;
    isEditorOpen: boolean;
    isPrivateChannel: boolean;
    replySent: boolean;
    selectedMessageReplyData: CXoneReplyToMessages;
    subject: string | undefined;
    receiverTo: string | undefined;
    receiverCc: string | undefined;
    receiverBcc: string | undefined;
    messageDraftId: string;
    selectedSkill: SelectedSkill;
    parsedLexicalString: string;
    fromAddress: string | undefined;
    emailEditorContentToInsert: string;
    isUploadDialogEnabled: boolean;
    customerTyping: TypingIndicatorPreview;
    isAgentReplyReadyToSent: boolean;
    isCopiedFromExcel: false;
    /**
     * flag to indicate ongoing outbound API call
     */
    isMessageSending: false;
    message: CXoneMessage;
    messageSendState: ReplyAPIStatus;
    draftMessagePayload: DraftMessagePayload;
    isTextAddedInEditor: boolean;
    /**
    * flag to indicate ongoing upload attachment in editor
    */
    isUploadingAttachment: boolean;
}
export interface ContactEditorSlice {
    [caseId: string]: ContactEditorDetails;
}
/**
 * function that returns activeContact state
 * @example getActiveContactState()
 */
export declare const getActiveContactState: (inbox: AssignmentState) => ContactData | undefined;
/**
 * Function that returns formatted html table with appended inline style
 * @param parsedString - string
 * @returns - string
 * @example -
 * ```
 * updateHTMLTableBorder('<table class="richTableEditor">')
 * ```
 */
export declare const updateHTMLTableBorder: (parsedString: string) => string;
export declare const CcfContactEditorSlice: import("@reduxjs/toolkit").Slice<ContactEditorSlice, {
    /**
     *  Function to set initial editor slice
     * @param state - ContactEditorSlice
     * @param action  - PayloadAction<ContactEditorDetails>
     * @example - dispatch(setInitialEditorSlice())
     * @returns - the inital editor slice
     */
    setInitialEditorSlice: (state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        ContactEditorDetails: ContactEditorDetails;
    }>) => {
        [x: string]: import("immer/dist/internal").WritableDraft<ContactEditorDetails> | {
            selectedSkill: import("immer/dist/internal").WritableDraft<SelectedSkill>;
            customerTyping: import("immer/dist/internal").WritableDraft<TypingIndicatorPreview>;
            editorState: EditorState;
            isSendButtonEnabled: boolean;
            isDiscardDisabled: boolean;
            isEditorFocused: boolean;
            isEditorOpen: boolean;
            isPrivateChannel: boolean;
            replySent: boolean;
            selectedMessageReplyData: CXoneReplyToMessages;
            subject: string | undefined;
            receiverTo: string | undefined;
            receiverCc: string | undefined;
            receiverBcc: string | undefined;
            messageDraftId: string;
            parsedLexicalString: string;
            fromAddress: string | undefined;
            emailEditorContentToInsert: string;
            isUploadDialogEnabled: boolean;
            isAgentReplyReadyToSent: boolean;
            isCopiedFromExcel: false;
            /**
             * flag to indicate ongoing outbound API call
             */
            isMessageSending: false;
            message: CXoneMessage;
            messageSendState: ReplyAPIStatus;
            draftMessagePayload: DraftMessagePayload;
            isTextAddedInEditor: boolean;
            /**
            * flag to indicate ongoing upload attachment in editor
            */
            isUploadingAttachment: boolean;
        };
    };
    /**
     * Function to remove editor references after case is unassigned/transferred
     * @param state - editor
     * @param action  - PayloadAction(caseId: string)
     * @returns
     * @example - clearContactEditorDetails()
     */
    clearContactEditorDetails: (state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
    }>) => void;
    /**
     * Function to set lexical editor state for a case
     * @param state - editor
     * @param action  - PayloadAction<editorState>
     * @returns It returns updated editor slice
     * @example -setContactEditorState()
     */
    setContactEditorState(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        editorState: EditorState;
        parsedLexicalString?: string;
    }>): ContactEditorSlice;
    /**
     * this action will be dispatch to set email editor content in case of retry of failed email or forward of email
     * @param state  -InboxState
     * @param action -PayloadAction(caseId: string, emailEditorContentToInsert: string)
     * @example - dispatch(updateEditorStateForEmail(caseId, emailEditorContentToInsert))
     */
    updateEditorStateForEmail(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        emailEditorContentToInsert: string;
    }>): ContactEditorSlice;
    /**
    * this action will be dispatch to update current email editor content by appending new content
    * @param state  -InboxState
    * @param action -PayloadAction(caseId: string, contentToAdd: string)
    * @example - dispatch(upsertEditorStateForEmail(caseId, contentToAdd))
    */
    upsertEditorStateForEmail(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        contentToAdd: string;
    }>): ContactEditorSlice;
    /**
     * Function to enable/disable send message button
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -updateSendButtonEnabled()
     */
    updateSendButtonEnabled(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isSendButtonEnabled: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set isMessageSending flag
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example - dispatch(updateMessageSendingFlag(\{ caseId, isMessageSending \}))
     */
    updateMessageSendingFlag(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isMessageSending: boolean;
    }>): ContactEditorSlice;
    /**
   * Function to update if text is added in editor
   * @param state - editor
   * @param action  - PayloadAction<boolean>
   * @returns It returns updated editor slice
   * @example -updateIsTextAddedInEditor()
   */
    updateIsTextAddedInEditor(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isTextAddedInEditor: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to disable the discard button
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setEditorDiscardDisabled()
     */
    setEditorDiscardDisabled(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isDiscardDisabled: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set editor in focus
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setIsContactEditorFocused()
     */
    setIsContactEditorFocused(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isEditorFocused: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set editor as open
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setIsContactEditorOpen()
     */
    setIsContactEditorOpen(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isEditorOpen: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set if channel is private
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setIsPrivateContactChannel()
     */
    setIsPrivateContactChannel(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isPrivateChannel: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set replySent value
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setContactReplySent()
     */
    setContactReplySent(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        replySent: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set reply data for selected message
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setSelectedContactMessageReplyData()
     */
    setSelectedContactMessageReplyData(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        selectedMessageReplyData: CXoneReplyToMessages;
    }>): ContactEditorSlice;
    /**
     * Function to set the FromAddress value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setContactFromValue()
     */
    setContactFromValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        fromAddress: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the subject value
     * @param state - editor
     * @param action - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setSubject()
     */
    /**
     * Function to set the receiverTo value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setToValue()
     */
    setEmailToValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        receiverTo: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the receiverCc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setCcValue()
     */
    /**
     * Function to set the receiverBcc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setBccValue()
     */
    /**
     * Function to set if message draft id is present
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setContactDraftMessageId()
     */
    setContactDraftMessageId(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        messageDraftId: string;
    }>): ContactEditorSlice;
    /**
     * Function to set the receiverCc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setEmailCcValue()
     */
    setEmailCcValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        receiverCc: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the subject value
     * @param state - editor
     * @param action - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setSubject()
     */
    setEmailSubject(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        subject: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the receiverBcc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setEmailBccValue()
     */
    setEmailBccValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        receiverBcc: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to check if reply is ready to sent in case of retrial of failed message
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -updateIsContactReplyReadyToSent()
     */
    updateIsContactReplyReadyToSent(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isAgentReplyReadyToSent: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set selected skill for draft message
     * @param state - editor
     * @param action  - PayloadAction<SelectedSkill>
     * @returns It returns updated editor slice
     * @example -setSelectedSkill()
     */
    setContactSelectedSkill(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        selectedSkill: SelectedSkill;
    }>): ContactEditorSlice;
    /**
     * Function to show / hide upload dialog message
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -updateUploadDialogBox()
     */
    updateUploadDialogBox(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isUploadDialogEnabled: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to enable/disable User Typing status
     * @param state - editor
     * @param action  - PayloadAction<isMessageTypingStarted>
     * @returns It returns updated editor slice
     * @remarks - Dispatch function for sendTyping started/end Events
     * @example -updateTypingIndicator()
     */
    updateTypingIndicator(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isMessageTypingStarted: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set whether user sent the message or not
     * @param state - editor
     * @param action  - PayloadAction<isMessageSentByCustomer>
     * @returns It returns updated editor slice
     * @remarks - Dispatch function for MessageAddedIntoCase Events
     * @example -userSentMessage()
     */
    userSentMessage(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isMessageSentByCustomer: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set user Typing message
     * @param state - editor
     * @param action  - PayloadAction<messagePreview>
     * @returns It returns updated editor slice
     * @remarks - Dispatch function for MessagePreviewCreated Events
     * @example - updateIsTypingPreviewWithText()
     */
    updateIsTypingPreviewWithText(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        messagePreview: string;
    }>): ContactEditorSlice;
    /**
     * Function to show/hide editor in both normal and failed to send message scenario
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -updateIsAgentReplyReadyToSent()
     */
    updateIsAgentReplyReadyToSent(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isAgentReplyReadyToSent: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to update the isCopiedFromExcel flag
     * @param state - editor
     * @param action  - PayloadAction<isCopiedFromExcel>
     * @returns It returns updated editor slice
     * @example - updateIsCopiedFromExcel()
     */
    updateIsCopiedFromExcel(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isCopiedFromExcel: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to update the isCopiedFromExcel flag
     * @param state - editor
     * @param action  - PayloadAction<isCopiedFromExcel>
     * @returns It returns updated editor slice
     * @example - updateIsCopiedFromExcel()
     */
    setMessageId(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string | undefined | null;
        message: CXoneMessage;
    }>): ContactEditorSlice;
    /**
     * Function to clear the selected message to reply
     * @param state - editor
     * @param action  - PayloadAction<isCopiedFromExcel>
     * @returns It returns updated editor slice
     * @example - clearMessageId()
     */
    clearMessageId(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
    }>): ContactEditorSlice;
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
    setMessageSendStatus(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        status: ReplyAPIStatus;
    }>): ContactEditorSlice;
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
    setDraftMessagePayload(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        messagePayload: DraftMessagePayload;
    }>): ContactEditorSlice;
    /**
     * Function to update isUploadingAttachment flag when attachment is started uploading
     * @param state - editor
     * @param action  - PayloadAction
     * @returns It returns updated editor slice
     * @example - updateIsUploadingAttachment(state, action)
     */
    updateIsUploadingAttachment(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isUploadingAttachment: boolean;
    }>): ContactEditorSlice;
    /**
     * Generic action to set multiple editor fields through single dispatch
     * @param state - editor
     * @param caseId  - string
     * @param action  - PayloadAction<ContactEditorDetails>
     * @returns It returns updated editor state
     * @example -updateContactEditorFields()
     */
    updateContactEditorFields(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
    } & Partial<ContactEditorDetails>>): void;
}, "contactEditor">;
/**
 * onBoldClick to make Text Input bold
 * @example createendUserRecipients();
 */
export declare const createContactEndUserRecipients: (data: endUserRecipients) => Array<EndUserRecipients>;
/**
 * Function prepare send reply object
 * @example - prepareReply()
 */
export declare const prepareReply: (data: replyMessageObject) => Promise<CXoneDigitalReplyRequest>;
export declare const CcfContactEditorAction: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     *  Function to set initial editor slice
     * @param state - ContactEditorSlice
     * @param action  - PayloadAction<ContactEditorDetails>
     * @example - dispatch(setInitialEditorSlice())
     * @returns - the inital editor slice
     */
    setInitialEditorSlice: (state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        ContactEditorDetails: ContactEditorDetails;
    }>) => {
        [x: string]: import("immer/dist/internal").WritableDraft<ContactEditorDetails> | {
            selectedSkill: import("immer/dist/internal").WritableDraft<SelectedSkill>;
            customerTyping: import("immer/dist/internal").WritableDraft<TypingIndicatorPreview>;
            editorState: EditorState;
            isSendButtonEnabled: boolean;
            isDiscardDisabled: boolean;
            isEditorFocused: boolean;
            isEditorOpen: boolean;
            isPrivateChannel: boolean;
            replySent: boolean;
            selectedMessageReplyData: CXoneReplyToMessages;
            subject: string | undefined;
            receiverTo: string | undefined;
            receiverCc: string | undefined;
            receiverBcc: string | undefined;
            messageDraftId: string;
            parsedLexicalString: string;
            fromAddress: string | undefined;
            emailEditorContentToInsert: string;
            isUploadDialogEnabled: boolean;
            isAgentReplyReadyToSent: boolean;
            isCopiedFromExcel: false;
            /**
             * flag to indicate ongoing outbound API call
             */
            isMessageSending: false;
            message: CXoneMessage;
            messageSendState: ReplyAPIStatus;
            draftMessagePayload: DraftMessagePayload;
            isTextAddedInEditor: boolean;
            /**
            * flag to indicate ongoing upload attachment in editor
            */
            isUploadingAttachment: boolean;
        };
    };
    /**
     * Function to remove editor references after case is unassigned/transferred
     * @param state - editor
     * @param action  - PayloadAction(caseId: string)
     * @returns
     * @example - clearContactEditorDetails()
     */
    clearContactEditorDetails: (state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
    }>) => void;
    /**
     * Function to set lexical editor state for a case
     * @param state - editor
     * @param action  - PayloadAction<editorState>
     * @returns It returns updated editor slice
     * @example -setContactEditorState()
     */
    setContactEditorState(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        editorState: EditorState;
        parsedLexicalString?: string;
    }>): ContactEditorSlice;
    /**
     * this action will be dispatch to set email editor content in case of retry of failed email or forward of email
     * @param state  -InboxState
     * @param action -PayloadAction(caseId: string, emailEditorContentToInsert: string)
     * @example - dispatch(updateEditorStateForEmail(caseId, emailEditorContentToInsert))
     */
    updateEditorStateForEmail(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        emailEditorContentToInsert: string;
    }>): ContactEditorSlice;
    /**
    * this action will be dispatch to update current email editor content by appending new content
    * @param state  -InboxState
    * @param action -PayloadAction(caseId: string, contentToAdd: string)
    * @example - dispatch(upsertEditorStateForEmail(caseId, contentToAdd))
    */
    upsertEditorStateForEmail(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        contentToAdd: string;
    }>): ContactEditorSlice;
    /**
     * Function to enable/disable send message button
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -updateSendButtonEnabled()
     */
    updateSendButtonEnabled(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isSendButtonEnabled: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set isMessageSending flag
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example - dispatch(updateMessageSendingFlag(\{ caseId, isMessageSending \}))
     */
    updateMessageSendingFlag(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isMessageSending: boolean;
    }>): ContactEditorSlice;
    /**
   * Function to update if text is added in editor
   * @param state - editor
   * @param action  - PayloadAction<boolean>
   * @returns It returns updated editor slice
   * @example -updateIsTextAddedInEditor()
   */
    updateIsTextAddedInEditor(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isTextAddedInEditor: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to disable the discard button
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setEditorDiscardDisabled()
     */
    setEditorDiscardDisabled(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isDiscardDisabled: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set editor in focus
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setIsContactEditorFocused()
     */
    setIsContactEditorFocused(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isEditorFocused: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set editor as open
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setIsContactEditorOpen()
     */
    setIsContactEditorOpen(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isEditorOpen: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set if channel is private
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setIsPrivateContactChannel()
     */
    setIsPrivateContactChannel(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isPrivateChannel: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set replySent value
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setContactReplySent()
     */
    setContactReplySent(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        replySent: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set reply data for selected message
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -setSelectedContactMessageReplyData()
     */
    setSelectedContactMessageReplyData(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        selectedMessageReplyData: CXoneReplyToMessages;
    }>): ContactEditorSlice;
    /**
     * Function to set the FromAddress value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setContactFromValue()
     */
    setContactFromValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        fromAddress: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the subject value
     * @param state - editor
     * @param action - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setSubject()
     */
    /**
     * Function to set the receiverTo value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setToValue()
     */
    setEmailToValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        receiverTo: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the receiverCc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setCcValue()
     */
    /**
     * Function to set the receiverBcc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setBccValue()
     */
    /**
     * Function to set if message draft id is present
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setContactDraftMessageId()
     */
    setContactDraftMessageId(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        messageDraftId: string;
    }>): ContactEditorSlice;
    /**
     * Function to set the receiverCc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setEmailCcValue()
     */
    setEmailCcValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        receiverCc: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the subject value
     * @param state - editor
     * @param action - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setSubject()
     */
    setEmailSubject(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        subject: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to set the receiverBcc value
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -setEmailBccValue()
     */
    setEmailBccValue(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        receiverBcc: string | undefined;
    }>): ContactEditorSlice;
    /**
     * Function to check if reply is ready to sent in case of retrial of failed message
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -updateIsContactReplyReadyToSent()
     */
    updateIsContactReplyReadyToSent(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isAgentReplyReadyToSent: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set selected skill for draft message
     * @param state - editor
     * @param action  - PayloadAction<SelectedSkill>
     * @returns It returns updated editor slice
     * @example -setSelectedSkill()
     */
    setContactSelectedSkill(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        selectedSkill: SelectedSkill;
    }>): ContactEditorSlice;
    /**
     * Function to show / hide upload dialog message
     * @param state - editor
     * @param action  - PayloadAction<string>
     * @returns It returns updated editor slice
     * @example -updateUploadDialogBox()
     */
    updateUploadDialogBox(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isUploadDialogEnabled: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to enable/disable User Typing status
     * @param state - editor
     * @param action  - PayloadAction<isMessageTypingStarted>
     * @returns It returns updated editor slice
     * @remarks - Dispatch function for sendTyping started/end Events
     * @example -updateTypingIndicator()
     */
    updateTypingIndicator(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isMessageTypingStarted: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set whether user sent the message or not
     * @param state - editor
     * @param action  - PayloadAction<isMessageSentByCustomer>
     * @returns It returns updated editor slice
     * @remarks - Dispatch function for MessageAddedIntoCase Events
     * @example -userSentMessage()
     */
    userSentMessage(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isMessageSentByCustomer: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to set user Typing message
     * @param state - editor
     * @param action  - PayloadAction<messagePreview>
     * @returns It returns updated editor slice
     * @remarks - Dispatch function for MessagePreviewCreated Events
     * @example - updateIsTypingPreviewWithText()
     */
    updateIsTypingPreviewWithText(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        messagePreview: string;
    }>): ContactEditorSlice;
    /**
     * Function to show/hide editor in both normal and failed to send message scenario
     * @param state - editor
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated editor slice
     * @example -updateIsAgentReplyReadyToSent()
     */
    updateIsAgentReplyReadyToSent(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isAgentReplyReadyToSent: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to update the isCopiedFromExcel flag
     * @param state - editor
     * @param action  - PayloadAction<isCopiedFromExcel>
     * @returns It returns updated editor slice
     * @example - updateIsCopiedFromExcel()
     */
    updateIsCopiedFromExcel(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isCopiedFromExcel: boolean;
    }>): ContactEditorSlice;
    /**
     * Function to update the isCopiedFromExcel flag
     * @param state - editor
     * @param action  - PayloadAction<isCopiedFromExcel>
     * @returns It returns updated editor slice
     * @example - updateIsCopiedFromExcel()
     */
    setMessageId(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string | undefined | null;
        message: CXoneMessage;
    }>): ContactEditorSlice;
    /**
     * Function to clear the selected message to reply
     * @param state - editor
     * @param action  - PayloadAction<isCopiedFromExcel>
     * @returns It returns updated editor slice
     * @example - clearMessageId()
     */
    clearMessageId(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
    }>): ContactEditorSlice;
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
    setMessageSendStatus(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        status: ReplyAPIStatus;
    }>): ContactEditorSlice;
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
    setDraftMessagePayload(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        messagePayload: DraftMessagePayload;
    }>): ContactEditorSlice;
    /**
     * Function to update isUploadingAttachment flag when attachment is started uploading
     * @param state - editor
     * @param action  - PayloadAction
     * @returns It returns updated editor slice
     * @example - updateIsUploadingAttachment(state, action)
     */
    updateIsUploadingAttachment(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
        isUploadingAttachment: boolean;
    }>): ContactEditorSlice;
    /**
     * Generic action to set multiple editor fields through single dispatch
     * @param state - editor
     * @param caseId  - string
     * @param action  - PayloadAction<ContactEditorDetails>
     * @returns It returns updated editor state
     * @example -updateContactEditorFields()
     */
    updateContactEditorFields(state: import("immer/dist/internal").WritableDraft<ContactEditorSlice>, action: PayloadAction<{
        caseId: string;
    } & Partial<ContactEditorDetails>>): void;
}, "contactEditor">;
export declare const CcfContactEditorReducer: import("redux").Reducer<ContactEditorSlice, AnyAction>;
export declare const initialEditorState = "{\"root\":{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}";
/**
 * This method to get empty editor state.
 * @example getEmptyEditorState();
 */
export declare const getEmptyEditorState: () => EditorState;
/**
 * used to remove indexeddb and state after message succefull retry
 * @param dispatch  - action to set failed messages
 * @param caseId  - selected case id
 * @param failedXTraceId - identifier for message
 * @example onConatctSendMessageSuccess(dispatch, caseId, failedXTraceId)
 */
export declare const onConatctSendMessageSuccess: (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, caseId: string, failedXTraceId: string) => Promise<void>;
export declare const sendMessageReply: import("@reduxjs/toolkit").AsyncThunk<void, {
    caseId: string;
    elevatedInteractionId?: string | undefined;
    elevatedFrom?: string | undefined;
    failedXTraceId?: string | undefined;
    sendReplyObj?: any;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to update the draft message
 * @example -
 * updateContactDraftMessage(selectedDigitalContactDetails, wysiwygEnabled, editorState, messageDraftId);
 */
export declare const updateContactDraftMessage: (selectedDigitalContactDetails: CXoneDigitalContact, wysiwygEnabled: boolean, parsedLexicalString: string, messageDraftId: string, fromAddress?: string | undefined) => void;
/**
 * Method used to reset digital contact saved properties
 * @param dispatch  - action to set empty editor state and focus
 * @param caseId - selected case id
 * @example resetDigitalContactSavedProperties(dispatch, caseId);
 */
export declare const resetDigitalContactSavedProperties: (dispatch: ThunkDispatch<unknown, unknown, AnyAction>, caseId: string) => void;
/**
 * Used to approve the draft message
 * @param draftMessageId - Id for the drafted message
 * @example - approveContactDraftMessage(messageDraftId);
 */
export declare const approveContactDraftMessage: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to delete the drafted message
 * @param draftMessageId - Id for the drafted message
 * @example - deleteContactDraftMessage(draftMessageId);
 */
export declare const deleteContactDraftMessage: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const draftContactMessage: import("@reduxjs/toolkit").AsyncThunk<void, {
    selectedSkill: SelectedSkill;
    caseId: string;
    failedXTraceId?: string | undefined;
    draftMessagePayload?: any;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const refuseContactApproval: import("@reduxjs/toolkit").AsyncThunk<void, {
    messageDraftId: string;
    reason?: string | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
*
* Thunk action creator to interact with SDK typing indicator on
* @param typingActionType -  typing action type
* @example - typingIndicatorForPatron(typingActionType);
*/
export declare const typingIndicatorForPatron: import("@reduxjs/toolkit").AsyncThunk<void, {
    typingActionType: TypingIndicatorActions;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to get editorState
 * @example - const editorState = useSelector(getContactEditorState(caseId));
 */
export declare const getContactEditorState: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => EditorState;
/**
 * Used to get isSendButtonEnabled
 * @example - const isSendButtonEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
 */
export declare const getIsSendMessageButtonEnabled: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
 * Used to get isDiscardDisabled
 * @example - const isDiscardDisabled = useSelector(getIsDiscardDisabled(caseId));
 */
export declare const getIsContactDiscardDisabled: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
 * Used to get isEditorFocused
 * @example - const isEditorFocused = useSelector(getIsContactEditorFocused(caseId));
 */
export declare const getIsContactEditorFocused: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
 * Used to get content of contact editor
 * Instead of calling editor state each time for content call this selector for message content
 * @example - const isSendButtonEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
 */
export declare const getContactEditorContent: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string;
/**
* Used to get receiverTo value
* @example - const fromAddress = useSelector(getContactFromAddress(caseId));
*/
export declare const getContactFromAddress: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string | undefined;
/**
 * Used to get receiverTo value
 * @example - const receiverTo = useSelector(getReceiverTo(caseId));
 */
export declare const getEmailReceiverTo: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string | undefined;
/**
 * Used to get receiverCc value
 * @example - const receiverCc = useSelector(getReceiverCc(caseId));
 */
export declare const getEmailReceiverCc: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string | undefined;
/**
 * Used to get receiverBcc value
 * @example - const subject = useSelector(getReceiverBcc(caseId));
 */
export declare const getEmailReceiverBcc: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string | undefined;
/**
 * Used to get emailEditorContentToInsert
 * @example - const emailEditorContentToInsert = useSelector(emailEditorContentToInsert(caseId));
 */
export declare const getEmailEditorContentToInsert: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string;
/**
 *Used to get subject value
 * @example - const subject = useSelector(getEmailSubject(caseId));
 */
export declare const getEmailSubject: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => string | undefined;
/**
 * Used to get isEditorOpen
 * @example - const isEditorOpen = useSelector(getIsContactEditorOpen(caseId));
 */
export declare const getIsContactEditorOpen: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
 * Used to get contact reply Sent value
 * @example - const replySent = useSelector(getContactReplySent(caseId));
 */
export declare const getContactReplySent: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
 * Used to get selectedMessageReplyData
 * @example - const selectedMessageReplyData = useSelector(getSelectedContactMessageReplyData(caseId));
 */
export declare const getSelectedContactMessageReplyData: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => CXoneReplyToMessages;
/**
 * Used to get getContactSelectedSkill
 * @example - const selectedSkill = useSelector(getContactSelectedSkill(caseId));
 */
export declare const getContactSelectedSkill: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => SelectedSkill;
/**
 * Used to get uploadDialog value
 * @example - const showDropMessageDialog = useSelector(getUploadDialogBox(caseId));
 */
export declare const getUploadDialogBox: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
* Used to get userTyping all data
* @example - const selectedSkill = useSelector(getUserTypingData(caseId));
*/
export declare const getUserTypingData: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => TypingIndicatorPreview;
/**
 * function that returns selected digital contact details
 * @example getSelectedDigitalContactDetails()
 */
export declare const getSelectedDigitalContactDetails: (activeContact: ContactData | undefined, inbox: AssignmentState) => CXoneDigitalContact;
/**
* Used to get isAgentReplyReadyToSent
* @param caseId - Selected contact case id
* @example - const isAgentReplyReadyToSent = useSelector(getIsAgentReplyReadyToSent(caseId));
*/
export declare const getIsAgentReplyReadyToSent: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
* Used to get isCopiedFromExcel
* @param caseId - Selected contact case id
* @example - const isCopiedFromExcel = useSelector(getIsCopiedFromExcel(caseId));
*/
export declare const getIsCopiedFromExcel: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
* Used to get isMessageSending status
* @param caseId - Selected contact case id
* @example - useSelector(getIsMessageSendingStatus(caseId));
*/
export declare const getIsMessageSendingStatus: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/** Used to get reply api send status
* @param caseId - Selected contact case id
* @example - useSelector(getMessageSendState(caseId));
*/
export declare const getMessageSendState: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => ReplyAPIStatus;
/**
* Used to get draftMessagePayload
* @param caseId - Selected contact case id
* @example - useSelector(getDraftMessagePayload(caseId));
*/
export declare const getDraftMessagePayload: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => DraftMessagePayload;
/**
 * Used to get isSendButtonEnabled
 *  @param caseId - Selected contact case id
 * @example - const getIsTextAddedInEditor = useSelector(getIsTextAddedInEditor(caseId));
 */
export declare const getIsTextAddedInEditor: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
/**
* Used to get uploading attachment status
*  @param caseId - Selected contact case id
* @example - const isUploadingAttachment = useSelector(getIsUploadingAttachment(caseId));
*/
export declare const getIsUploadingAttachment: (caseId: string) => (state: {
    contactEditor: ContactEditorSlice;
}) => boolean;
