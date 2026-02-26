import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useMemo, useRef } from 'react';
import { Box, Button, useTheme, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { SessionStorageHelper, StorageKeys, LocalStorageHelper } from '@nice-devone/core-sdk';
import { Clear, DeleteOutlined } from '@mui/icons-material';
import { CcfAddNoteIcon, CcfTooltip, useTranslator, isFeatureEnabled } from '@nice-devone/ui-controls';
import { DigitalChannelType, DigitalContactStatus, DigitalContactDirection } from '@nice-devone/common-sdk';
import { cxoneRoutingQueuId } from '../ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { CcfAssignmentAction, getCxoneDigitalContactUserSavedProperties, getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction, getSelectedDigitalContactAttachments } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { cxoneDigitalContactDetails } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { CcfContactEditorAction, getIsContactDiscardDisabled, getIsSendMessageButtonEnabled, sendMessageReply, initialEditorState } from './ccf-contact-editor.slice';
import { getInitialSkill, removeObContactFromStorage, uploadLSForEditor } from './ccf-editor-utils';
import CcfContactEditorStyles from './ccf-contact-editor/ccf-contact-editor.styles';
import CcfApprovalMenu from './ccf-approval-menu/ccf-approval-menu';
import { eventBus } from '../ccf-audio-player/ccf-audio-player-util';
import { AudioPlayerStatus } from '../ccf-audio-player/ccf-audio-player-status';
import { CcfCopilotActions } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
/**
* @example - ccfEditorActions
*/
const CcfEditorActions = ({ id, caseId, interactionId, closeTab, editorRef, savedDigitalContactRef, setLocalEditorState, copilotEnabled, }) => {
    var _a, _b, _c;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const getCxoneRoutingQueueId = useSelector(cxoneRoutingQueuId);
    const routingQueue = getCxoneRoutingQueueId === null || getCxoneRoutingQueueId === void 0 ? void 0 : getCxoneRoutingQueueId.length;
    const routingQueues = useMemo(() => (routingQueue > 0 ? getCxoneRoutingQueueId : []), [routingQueue]);
    const activeContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedDigitalContactAttachments = useSelector(getSelectedDigitalContactAttachments(caseId, interactionId));
    const isSendButtonEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const inlineAttachmentsForDigitalContact = activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.inlineImages;
    const isCumulativeLimitEnabled = isFeatureEnabled("release-cxa-cumulative-file-size-limit-AW-43847" /* FeatureToggles.CUMULATIVE_FILE_SIZE_VALIDATION */);
    /**
   * Restores the value from previous render
   * @param value - value in current render cycle
   * @example usePrevious(value)
   * @returns
   */
    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };
    const previousSelectedDigitalContactInlineAttachments = usePrevious(JSON.stringify(inlineAttachmentsForDigitalContact));
    const previousSelectedDigitalContactAttachments = usePrevious(JSON.stringify(selectedDigitalContactAttachments) || 'undefined');
    useEffect(() => {
        var _a;
        const currentAttachment = LocalStorageHelper.getItem(StorageKeys.DIGITAL_ATTACHMENTS + selectedDigitalContactDetails.caseId, true);
        const inlineImagesInLocalStorage = (_a = currentAttachment === null || currentAttachment === void 0 ? void 0 : currentAttachment.attachments) === null || _a === void 0 ? void 0 : _a.filter((attachment) => attachment.isInline);
        //  checking for attachments are uploaded or not
        if (previousSelectedDigitalContactAttachments !== JSON.stringify(selectedDigitalContactAttachments) || previousSelectedDigitalContactInlineAttachments !== JSON.stringify(inlineAttachmentsForDigitalContact) || inlineImagesInLocalStorage) {
            if (selectedDigitalContactAttachments || inlineAttachmentsForDigitalContact || inlineImagesInLocalStorage) {
                // will add the uploaded attachment in local-storage
                //combine inlineImagesInLocalStorage and inlineAttachmentsForDigitalContact to avoid loss of data if any inline images are already present in local-storage after refresh and remove duplicates
                const combinedInlineImages = [...(inlineImagesInLocalStorage || []), ...(inlineAttachmentsForDigitalContact || [])];
                const uniqueCombinedInlineImages = [...new Set(combinedInlineImages)];
                //inline attachments in slice are undefined until they are added through UI, which is how we will determine if we need to use inline attachments from local storage on refresh
                const getInlineAttachments = typeof (inlineAttachmentsForDigitalContact) !== 'undefined' ? inlineAttachmentsForDigitalContact : uniqueCombinedInlineImages;
                const uploadedAttachmentCount = ((selectedDigitalContactAttachments === null || selectedDigitalContactAttachments === void 0 ? void 0 : selectedDigitalContactAttachments.length) || 0) + ((getInlineAttachments === null || getInlineAttachments === void 0 ? void 0 : getInlineAttachments.length) || 0);
                //if cumulative limit is enabled then we will consider both inline and normal attachments else only normal attachments
                const allAttachments = isCumulativeLimitEnabled ? [...(selectedDigitalContactAttachments || []), ...(getInlineAttachments || [])] : selectedDigitalContactAttachments;
                if (currentAttachment) {
                    currentAttachment.attachments = uploadedAttachmentCount > 0
                        ? allAttachments : undefined;
                    if (currentAttachment.attachments) {
                        LocalStorageHelper.setItem(StorageKeys.DIGITAL_ATTACHMENTS + selectedDigitalContactDetails.caseId, currentAttachment);
                    }
                    else {
                        // if currentAttachment.attachments are not available i.e all the previously uploaded attachments are removed so will remove those from local-storage as well
                        LocalStorageHelper.removeItem(StorageKeys.DIGITAL_ATTACHMENTS + selectedDigitalContactDetails.caseId);
                    }
                }
                else if (uploadedAttachmentCount === 1) {
                    const attachmentData = { attachments: allAttachments };
                    LocalStorageHelper.setItem(StorageKeys.DIGITAL_ATTACHMENTS + selectedDigitalContactDetails.caseId, attachmentData);
                }
            }
        }
    }, [
        previousSelectedDigitalContactAttachments,
        selectedDigitalContactAttachments,
        activeContactInSelectedInteraction,
        previousSelectedDigitalContactInlineAttachments,
        inlineAttachmentsForDigitalContact
    ]);
    const theme = useTheme();
    const wysiwygEnabled = !!((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.wysiwygEnabled);
    const isRevampEmailToggleEnabled = isFeatureEnabled(FeatureToggles === null || FeatureToggles === void 0 ? void 0 : "release-cx-agent-Revamped_New_Digital_Email_CMA-AW-28772" /* FeatureToggles?.NEW_EMAIL_REVAMP_FEATURE_TOGGLE */);
    const isEditorRevampToggleEnabled = isFeatureEnabled("release-cx-agent-Revamped_Email_Editor_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_EDITOR_REVAMP_FEATURE_TOGGLE */);
    // the new email design should be designed only if it current interaction is email, isRevampEmailToggleEnabled toggle and isEditorRevampToggleEnabled enabled.
    const displayRevampedEmailButtons = wysiwygEnabled && isRevampEmailToggleEnabled && isEditorRevampToggleEnabled;
    const styles = CcfContactEditorStyles(theme, false, displayRevampedEmailButtons);
    const isDiscardDisabled = useSelector(getIsContactDiscardDisabled(caseId)) || false;
    const isOBContact = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.isOutbound) &&
        ((_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.status) === DigitalContactStatus.DRAFT
        ? true
        : false;
    const getDigitalContactDetails = useSelector(cxoneDigitalContactDetails);
    let userRolePermissions = {};
    if (interactionId && caseId) {
        userRolePermissions =
            (_c = getDigitalContactDetails[interactionId][caseId]) === null || _c === void 0 ? void 0 : _c.userRolePermissions;
    }
    const initialSelectedSkill = getInitialSkill(userRolePermissions, selectedDigitalContactDetails);
    /**
     * method to handle send message click
     * @example handleSendMessage();
     */
    const handleSendMessage = () => {
        const replyObject = {
            caseId: caseId,
            elevatedInteractionId: interactionId,
            elevatedFrom: activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.elevatedFrom,
        };
        setLocalEditorState && setLocalEditorState();
        //disables send button to avoid multiple clicks
        caseId && dispatch(CcfContactEditorAction.updateSendButtonEnabled({ caseId, isSendButtonEnabled: false }));
        caseId && dispatch(CcfContactEditorAction.setEditorDiscardDisabled({ caseId, isDiscardDisabled: true }));
        dispatch(sendMessageReply(replyObject));
    };
    /**
     * method to handle button click event to add message note
     * @example onMessageNoteClick ();
     */
    const onMessageNoteClick = () => {
        dispatch(CcfAssignmentAction.updateContactMessageNoteStatus({
            caseId: selectedDigitalContactDetails.caseId,
            interactionId: selectedDigitalContactDetails.interactionId,
            isNoteOpen: true,
            noteId: '',
        }));
    };
    /**
     * onDiscardClick method to remove digital OB contact
     * @example onDiscardClick();
     */
    const onDiscardClick = (id) => {
        //Removed Digital ob sms contact
        if (caseId && interactionId) {
            closeTab && closeTab(id);
            dispatch(CcfAssignmentAction.removeCXoneDigitalContact({
                interactionId: interactionId,
                contactId: caseId
            }));
            removeObContactFromStorage(caseId, selectedDigitalContactDetails);
        }
    };
    /**
     * Method to remove the selected skill from redux store
     * @example clearSelectedSkill();
     */
    const clearSelectedSkill = () => {
        caseId && dispatch(CcfContactEditorAction.setContactSelectedSkill({ caseId, selectedSkill: initialSelectedSkill }));
    };
    /**
     * clearEditorContent method to clear the editor content
     * @example clearEditorContent();
     */
    const clearEditorContent = () => {
        const currentEditor = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current;
        currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.update(() => {
            const parsedEditorState = currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.parseEditorState(initialEditorState);
            currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.setEditorState(parsedEditorState);
            //After sending text move back the cursor in the editor
            if (!wysiwygEnabled) {
                setTimeout(() => {
                    currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.focus();
                });
            }
        });
    };
    /**
     * onClearClick method to cancel data / empty data from Input field
     * @example onClearClick();
     */
    const onClearClick = (id) => {
        clearEditorContent();
        dispatch(CcfAssignmentAction.removeAudioRecording(true));
        eventBus.emit(AudioPlayerStatus.DISCARD_RECORDING);
        caseId && dispatch(CcfContactEditorAction.updateSendButtonEnabled({ caseId, isSendButtonEnabled: false })); // disable the send button after cancel button click
        dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({
            caseId: caseId,
            interactionId: interactionId,
        }));
        clearSelectedSkill();
        if (wysiwygEnabled && savedDigitalContactRef)
            savedDigitalContactRef.current = undefined;
        if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.channelName) === DigitalChannelType.EMAIL) {
            dispatch(CcfAssignmentAction.deleteDigitalUserSavedPropertiesOfACase(selectedDigitalContactDetails.caseId));
            if (isOBContact) {
                SessionStorageHelper.removeItem(StorageKeys.SELECTED_CASE_ID);
                onDiscardClick(id); // remove OB email on discard
                removeObContactFromStorage(caseId, selectedDigitalContactDetails);
            }
            uploadLSForEditor(selectedDigitalContactDetails, digitalContactUserSavedProperties);
            copilotEnabled && dispatch(CcfCopilotActions.removeGenerateEmailCard(selectedDigitalContactDetails.caseId));
        }
    };
    /**
     * Checks if the approval dropdown should be disabled if contact type is sms and has no inbound messages.
     * @returns - Returns true if the approval dropdown should be disabled, otherwise false.
     * @example isApprovalDropDownDisabled();
     */
    const isApprovalDropDownDisabled = () => {
        var _a;
        if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.channelName) === DigitalChannelType.SMS &&
            (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.isOutbound)) {
            const hasInboundMessage = (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.messages) === null || _a === void 0 ? void 0 : _a.some((message) => message.direction === DigitalContactDirection.INBOUND);
            return !hasInboundMessage;
        }
        return false;
    };
    return (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.commonBox), (displayRevampedEmailButtons ? styles.revampCommonBox : {})), (wysiwygEnabled ? styles.rightSideBox : styles.leftSideBox)) }, { children: [!isOBContact && (_jsx(CcfTooltip, Object.assign({ title: translate('addNotes'), arrow: true, placement: 'top' }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('addNotes'), size: 'small', sx: displayRevampedEmailButtons ? Object.assign(Object.assign({}, styles.revampedAddNotesBtn), styles.focusedElement) : Object.assign(Object.assign({}, styles.addNotesBtn), styles.focusedElement), disableRipple: true, color: 'secondary', onClick: onMessageNoteClick, "data-testid": 'addNotes' }, { children: _jsx(CcfAddNoteIcon, { sx: displayRevampedEmailButtons ? styles.revampedAddNotesContainer : styles.iconContainer }) })) }))), isOBContact && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.channelName) === DigitalChannelType.SMS && (_jsx(CcfTooltip, Object.assign({ title: translate('discardReply'), arrow: true, placement: 'top' }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('discardReply'), size: 'small', sx: displayRevampedEmailButtons ? Object.assign(Object.assign({}, styles.revampedEmailClearReplyBtn), styles.focusedElement) : Object.assign(Object.assign({}, styles.clearRelpyBtn), styles.focusedElement), disableRipple: true, onClick: () => onDiscardClick(id), "data-testid": 'discardReply' }, { children: _jsx(DeleteOutlined, { sx: displayRevampedEmailButtons ? styles.revampedClearReplyContainer : null }) })) }))), wysiwygEnabled ? (_jsx(CcfTooltip, Object.assign({ title: translate('discardReply'), arrow: true, placement: 'top' }, { children: _jsx(IconButton, Object.assign({ size: 'small', "aria-label": translate('discardReply'), sx: displayRevampedEmailButtons ? Object.assign(Object.assign({}, styles.revampedEmailClearReplyBtn), styles.focusedElement) : Object.assign(Object.assign({}, styles.clearRelpyBtn), styles.focusedElement), disableRipple: true, disabled: isDiscardDisabled, onClick: () => onClearClick(id), "data-testid": 'discardReply' }, { children: _jsx(DeleteOutlined, { sx: displayRevampedEmailButtons ? styles.revampedClearReplyContainer : null }) })) }))) : (isSendButtonEnabled && (_jsx(CcfTooltip, Object.assign({ title: translate('clearReply'), arrow: true, placement: 'top' }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('clearReply'), size: 'small', sx: Object.assign(Object.assign({}, styles.clearRelpyBtn), styles.focusedElement), disableRipple: true, onClick: () => onClearClick(id), "data-testid": 'clearReply' }, { children: _jsx(Clear, {}) })) })))), selectedDigitalContactDetails.status === DigitalContactStatus.DRAFT ? (_jsx(Button, Object.assign({ variant: "contained", disabled: !isSendButtonEnabled, onClick: handleSendMessage, sx: displayRevampedEmailButtons ? Object.assign(Object.assign({}, styles.revampedSendButton), styles.focusedElement) : Object.assign(Object.assign({}, styles.sendButtonElement), styles.focusedElement), disableRipple: true, "aria-label": translate('sendMessage') }, { children: translate('sendMessage') }))) : (_jsx(CcfApprovalMenu, { disableButton: !isSendButtonEnabled, disableApprovalDropDown: isApprovalDropDownDisabled(), routingQueues: routingQueues, caseId: caseId, canCreateDraft: userRolePermissions === null || userRolePermissions === void 0 ? void 0 : userRolePermissions.canCreateDraft, canReply: userRolePermissions === null || userRolePermissions === void 0 ? void 0 : userRolePermissions.canReply, isEditorEmpty: !isSendButtonEnabled, uploadedAttachments: selectedDigitalContactAttachments === null || selectedDigitalContactAttachments === void 0 ? void 0 : selectedDigitalContactAttachments.length, clearEditor: clearEditorContent, setLocalEditorState: setLocalEditorState, newEmailRevampEnabled: displayRevampedEmailButtons }))] })));
};
export default memo(CcfEditorActions);
//# sourceMappingURL=ccf-editor-actions.js.map