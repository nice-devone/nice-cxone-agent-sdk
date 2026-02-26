import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, useTheme, Button } from '@mui/material';
import { CcfMenu, useTranslator, CcfTooltip, CcfBox, CcfDraftApprovalIcon, CcfRefuseApprovalIcon, isFeatureEnabled, CcfRedoWithEditIcon, } from '@nice-devone/ui-controls';
import CcfApprovalBannerStyle from './ccf-approval-banner-styles';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { CcfAssignmentAction, getDigitalContactMessagesByCaseId, getNonIncomingActiveContactInSelectedInteraction, getDigitalContactMessageDraftAttachments } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getInsertContactEditorPayload, retainAttachmentIntoEditor } from '../../ccf-editor/ccf-editor-utils';
import { approveContactDraftMessage, deleteContactDraftMessage, refuseContactApproval, getIsUploadingAttachment } from '../../ccf-editor/ccf-contact-editor.slice';
import CcfInteractionMenuStyles from '../../ccf-interaction-space/ccf-interaction-menu/ccf-interaction-menu-styles';
import { Delete, Edit } from '@mui/icons-material';
import { DigitalContactStatus } from '@nice-devone/common-sdk';
import { cxoneDigitalContactDetails } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { useThrottleClick } from '../../../hooks/useThrottleClick';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import { getToCcBccFields } from '../ccf-contact-email-header/ccf-contact-email-header';
import { CcfRejectedReason } from './ccf-rejected-reason/ccf-rejected-reason';
import { CcfRejectedReasonAction, getIsApprovalActionInProgress, getIsRejectedReasonBoxOpen } from './ccf-rejected-reason/ccf-rejected-reason.slice';
/**
 * Enum for approval banner menu options whose values are as per the translation key value
 */
var ApprovalBannerMenuOptionsEnum;
(function (ApprovalBannerMenuOptionsEnum) {
    ApprovalBannerMenuOptionsEnum["EDIT"] = "edit";
    ApprovalBannerMenuOptionsEnum["DELETE"] = "delete";
})(ApprovalBannerMenuOptionsEnum || (ApprovalBannerMenuOptionsEnum = {}));
const COPY_MESSAGE_TIMER_DELAY = 2000; // Copy message button timer delay in milliseconds
/**
 * Component displays Approval status for selected message
 * @returns Approval status for selected message
 * ```
 * @example
 * <CcfApprovalBanner message={'Test Message'} status={ApprovalBannerStatus.PENDING}/>
 * ```
 */
export function CcfApprovalBanner(props) {
    var _a, _b;
    const TIMER_DELAY = 5000;
    const { message, status, messageDraft, isRefused } = props;
    const messageDraftId = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.id;
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfApprovalBannerStyle(theme);
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const menuItemStyles = CcfInteractionMenuStyles(theme);
    const getDigitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const caseId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId;
    const messages = useSelector(getDigitalContactMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const isUploadingAttachment = useSelector(getIsUploadingAttachment(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
    const draftMessageAttachments = useSelector(getDigitalContactMessageDraftAttachments(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId, messageDraftId));
    let userRolePermissions = {};
    if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
        userRolePermissions = (_a = getDigitalContactDetails[nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction.caseId]) === null || _a === void 0 ? void 0 : _a.userRolePermissions;
    }
    ;
    const canApproveDraft = !!(userRolePermissions === null || userRolePermissions === void 0 ? void 0 : userRolePermissions.canApproveDraft);
    const isCopyApprovalMessageEnabled = isFeatureEnabled("release-cx-agent-Approval-flow-copy-reject-message-AW-47882" /* FeatureToggles.COPY_REJECT_MESSAGE_BUTTON */);
    const isCaseClosed = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.CLOSED;
    const canCopyApprovalMessage = isCopyApprovalMessageEnabled && isRefused && !isCaseClosed;
    const showRejectedReasonBox = useSelector(getIsRejectedReasonBoxOpen(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, messageDraftId));
    const isApprovalActionInProgress = useSelector(getIsApprovalActionInProgress(caseId, messageDraftId));
    const reason = (_b = messageDraft.reason) !== null && _b !== void 0 ? _b : '';
    /**
     * method to when user denies the approval request
     * @returns - void
     * @param messageDraftId - ID of the draft message
     * @param reason - reason for rejection
     * @example - refuseApproval(messageDraftId: string, reason: string)
     */
    const handleRefuseApproval = (messageDraftId) => {
        if (isCopyApprovalMessageEnabled) { // if the FT is enabled show the rejected reason box else will refuse directly without reason
            toggleRejectedReasonBox(true);
        }
        else {
            if (!isApprovalActionInProgress) { // if already approval or rejected API call is inprogress then will avoid this action
                dispatch(refuseContactApproval({ messageDraftId }));
            }
        }
    };
    /**
     * Used to toggle the rejected reason box visibility
     * @param isOpen - boolean to set the visibility of rejected reason box
     * @example
     * toggleRejectedReasonBox(true);
     */
    const toggleRejectedReasonBox = (isOpen) => {
        dispatch(CcfRejectedReasonAction.setIsRejectedReasonBoxOpen({
            caseId,
            draftMessageId: messageDraftId,
            isOpen: isOpen,
        }));
    };
    /**
     * Used to handle the submission of rejected reason
     * @param messageDraftId - ID of the draft message
     * @param reason - reason for rejection
     * @example -
     * ```
     * onSubmitRejectedReason(messageDraftId, reason);
     * ```
     */
    const onSubmitRejectedReason = (messageDraftId, reason = '') => {
        if (!isApprovalActionInProgress) { // if already approval or rejected API call is inprogress then will avoid this action
            dispatch(refuseContactApproval({ messageDraftId, reason: reason === null || reason === void 0 ? void 0 : reason.trim() }));
            toggleRejectedReasonBox(false);
        }
    };
    /**
     * Used to handle the closure of rejected reason box
     * @param event - React.SyntheticEvent
     * @example -
     * ```
     * onCloseRejectedReason(event);
     * ```
     */
    const onCloseRejectedReason = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        dispatch(CcfRejectedReasonAction.resetRejectedReasonState({ caseId, draftMessageId: messageDraftId })); // Reset the rejected reason state after refusal
    };
    /**
     * Used to handle the menu selection for when menu item is selected
     * @example
     * handleMenuSelection(optionEnum.EDIT);
     * method to update draft message content into the editor when user edits the message in approval banner
     * @returns - void
     * @param  message - string to be inserted to editor - type - string
     * @example - insertTextToContactEditor(message)
     */
    const insertTextToContactEditor = (message) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && message) {
            let contactDetails;
            if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
                contactDetails = getDigitalContactDetails[nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction.caseId];
            }
            ;
            const threadIdOnExternalPlatform = (_a = messages === null || messages === void 0 ? void 0 : messages.find(msg => { var _a; return (msg === null || msg === void 0 ? void 0 : msg.id) === ((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.replyToMessage) === null || _a === void 0 ? void 0 : _a.id); })) === null || _a === void 0 ? void 0 : _a.threadIdOnExternalPlatform;
            const sender = (_b = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _b === void 0 ? void 0 : _b.idOnExternalPlatform;
            const { to, cc, bcc } = getToCcBccFields(messageDraft.recipients, sender, true);
            const { fieldsToUpdate } = getInsertContactEditorPayload(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, message, messageDraftId);
            const replyChannelName = ((_c = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.channel) === null || _c === void 0 ? void 0 : _c.name) || ((_d = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _d === void 0 ? void 0 : _d.name);
            const replyToMessage = {
                authorAgentName: (messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) ? ((_h = (_f = (_e = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _e === void 0 ? void 0 : _e.firstName) !== null && _f !== void 0 ? _f : '' + ' ' + ((_g = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user) === null || _g === void 0 ? void 0 : _g.surname)) !== null && _h !== void 0 ? _h : '') : '',
                idOnExternalPlatform: ((_j = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.replyToMessage) === null || _j === void 0 ? void 0 : _j.id) || '',
                threadIdOnExternalPlatform: threadIdOnExternalPlatform || '',
            };
            let subject = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.title;
            if (subject === null || subject === void 0 ? void 0 : subject.toUpperCase().startsWith((`${translate('re')}:`).toUpperCase())) {
                subject = translate('re') + ': ' + ((_l = (_k = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.title) === null || _k === void 0 ? void 0 : _k.slice(3)) === null || _l === void 0 ? void 0 : _l.trim()); //In case of Reply we are just adding "Re: " in front of the subject and then trimming the whitespaces from remaining part(after "Re:") of the subject
            }
            dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
                fieldsToUpdate: {
                    receiverTo: to,
                    receiverCc: cc,
                    receiverBcc: bcc,
                    sender: sender,
                    subject,
                    isResponse: true,
                    isEditorOpen: fieldsToUpdate.isEditorOpen,
                    lexicalEditorState: fieldsToUpdate.lexicalEditorState,
                    messageDraftId: fieldsToUpdate.messageDraftId,
                    channelDisplayName: replyChannelName,
                    //The 'replyToMessage' field will be necessary when sending a message/mail for approval, updating store with details.
                    selectedMessageReplyData: replyToMessage,
                    isRejectedMessageCopied: false,
                },
            }));
        }
    };
    /**
   *
   * Used to copy the denied message into the contact editor
   *
   * @param message - string to be inserted into the editor
   * @example
   * ```
   * copyMessageIntoEditor("Denied message text");
   * ```
   */
    const copyMessageIntoEditor = (message) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (draftMessageAttachments && (draftMessageAttachments === null || draftMessageAttachments === void 0 ? void 0 : draftMessageAttachments.length) > 0) {
            retainAttachmentIntoEditor({ caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, attachments: draftMessageAttachments, dispatch }); // This method will check attachments and retain/upload them in the editor
        }
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && message) {
            let contactDetails;
            if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) &&
                (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
                contactDetails =
                    getDigitalContactDetails[nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction.caseId];
            }
            const sender = (_a = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform;
            const { to, cc, bcc } = getToCcBccFields(messageDraft.recipients, sender, true);
            const { fieldsToUpdate } = getInsertContactEditorPayload(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, message, messageDraftId);
            const replyChannelName = ((_b = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.channel) === null || _b === void 0 ? void 0 : _b.name) || ((_c = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _c === void 0 ? void 0 : _c.name);
            let subject = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.title;
            let isEmailForwarded = false;
            if (subject === null || subject === void 0 ? void 0 : subject.toUpperCase().startsWith(`${translate('re')}:`.toUpperCase())) {
                subject = translate('re') + ': ' + ((_e = (_d = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.title) === null || _d === void 0 ? void 0 : _d.slice(3)) === null || _e === void 0 ? void 0 : _e.trim());
            }
            else {
                // Dev Note: Set isEmailForwarded to true for Forward → Redo with Edit scenario.
                // This prevents "Fwd:" prefix from being added and the subject should remain as "Re: [original]"
                isEmailForwarded = true;
            }
            const replyMessage = messages === null || messages === void 0 ? void 0 : messages.find(msg => { var _a; return (msg === null || msg === void 0 ? void 0 : msg.id) === ((_a = messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.replyToMessage) === null || _a === void 0 ? void 0 : _a.id); });
            const replyToMessage = {
                authorAgentName: (messageDraft === null || messageDraft === void 0 ? void 0 : messageDraft.user)
                    ? `${(_f = messageDraft.user.firstName) !== null && _f !== void 0 ? _f : ''} ${(_g = messageDraft.user.surname) !== null && _g !== void 0 ? _g : ''}`.trim()
                    : '',
                idOnExternalPlatform: (replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.idOnExternalPlatform) || '',
                threadIdOnExternalPlatform: (replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.threadIdOnExternalPlatform) || '',
            };
            dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
                fieldsToUpdate: {
                    receiverTo: to,
                    receiverCc: cc,
                    receiverBcc: bcc,
                    sender: sender,
                    subject: subject,
                    isResponse: true,
                    isEditorOpen: fieldsToUpdate.isEditorOpen,
                    lexicalEditorState: fieldsToUpdate.lexicalEditorState,
                    messageDraftId: fieldsToUpdate.messageDraftId,
                    channelDisplayName: replyChannelName,
                    isRejectedMessageCopied: true,
                    selectedMessageReplyData: replyToMessage,
                    isEmailForward: ((_h = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _h === void 0 ? void 0 : _h.wysiwygEnabled) ? isEmailForwarded : false,
                },
            }));
        }
    };
    /**
     * Used to handle the approval of draft message
     * @example
     * handleApprovalMessage(messageDraftId);
     */
    const handleApprovalMessage = useThrottleClick((messageDraftId) => {
        if (!isApprovalActionInProgress) {
            dispatch(approveContactDraftMessage(messageDraftId));
        }
    }, TIMER_DELAY);
    /**
     * Used to handle the menu selection for when menu item is selected
     * @returns - void
     * @param name - string with value edit or delete
     * @example - handleMenuSelectionContactEditor(optionEnum.EDIT);
     */
    const handleMenuSelectionContactEditor = useThrottleClick((name) => {
        if (name === ApprovalBannerMenuOptionsEnum.EDIT) {
            insertTextToContactEditor(message);
        }
        if (name === ApprovalBannerMenuOptionsEnum.DELETE) {
            dispatch(deleteContactDraftMessage(messageDraftId));
        }
    }, TIMER_DELAY);
    /**
   * Used to handle the Copy button click and throttle multiple calls
   * @param event - React.SyntheticEvent
   * @example
   * handleCopyMessage(event);
   */
    const handleCopyMessage = useThrottleClick((event) => {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        copyMessageIntoEditor(message);
    }, COPY_MESSAGE_TIMER_DELAY);
    /**
     * Method to check editor has attachment uploading is inprogress in editor
     * @example isAttachmentUploadingInEditor();
     * @returns boolean - true if attachment uploading is in progress else false
     */
    const isAttachmentUploadingInEditor = () => {
        var _a, _b;
        return isUploadingAttachment ||
            ((_b = (_a = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments) === null || _a === void 0 ? void 0 : _a.some((attachment) => !attachment.uploaded)) !== null && _b !== void 0 ? _b : false);
    };
    //menu options object which is needed for CcfMenu option props
    const approvalBannerMenuOptions = [{
            name: ApprovalBannerMenuOptionsEnum.EDIT,
            icon: _jsx(Edit, {}),
        },
        {
            name: ApprovalBannerMenuOptionsEnum.DELETE,
            icon: _jsx(Delete, {}),
        }
    ];
    return (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfApprovalBanner' }, { children: _jsxs(Grid, Object.assign({ container: true, direction: 'row', justifyContent: 'space-between', alignItems: 'center', sx: [isRefused
                    ? Object.assign(Object.assign({}, styles.approvalInfoContainer), styles.approvalDenied) : Object.assign({}, styles.approvalInfoContainer),
                showRejectedReasonBox && Object.assign({}, styles.rejectedReasonBoxContainer)] }, { children: [_jsxs(Grid, Object.assign({ item: true, container: true, direction: 'row', width: isRefused ? 'calc(100% - 2.5rem)' : 'auto', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' }, { children: [!showRejectedReasonBox &&
                            _jsx(Grid, Object.assign({ item: true, display: 'flex', justifyContent: 'center', alignItems: 'center' }, { children: isRefused ? (_jsx(ClearIcon, { sx: styles.denyBannerIcon })) : (_jsx(AccessTimeOutlinedIcon, { sx: styles.pendingApprovalIcon })) })), !showRejectedReasonBox && _jsx(Grid, Object.assign({ item: true, sx: styles.rejectedReasonText }, { children: `${translate(status)}${reason ? `: ${reason}` : ''}` }))] })), showRejectedReasonBox && !isRefused &&
                    _jsx(Grid, Object.assign({ item: true, container: true, direction: 'row', justifyContent: 'center', alignItems: 'center' }, { children: _jsx(CcfRejectedReason, { draftMessageId: messageDraftId, caseId: caseId, onClose: onCloseRejectedReason, onSubmit: (reason) => onSubmitRejectedReason(messageDraftId, reason) }) })), !isRefused && canApproveDraft && !showRejectedReasonBox && (_jsxs(Grid, Object.assign({ item: true, container: true, width: 'auto', direction: 'row', justifyContent: 'center', alignItems: 'center', spacing: 1 }, { children: [_jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('deny'), arrow: true }, { children: _jsx(CcfBox, Object.assign({ "aria-label": translate('deny'), tabIndex: 0, sx: styles.approvalDeny, onClick: () => handleRefuseApproval(messageDraftId) }, { children: _jsx(CcfRefuseApprovalIcon, { sx: styles.approvalAndDenyIcon }) })) })) })), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('approve'), arrow: true }, { children: _jsx(CcfBox, Object.assign({ "aria-label": translate('approve'), tabIndex: 0, sx: styles.approvalDeny, "data-testid": "approval-icon-btn", onClick: () => handleApprovalMessage(messageDraftId) }, { children: _jsx(CcfDraftApprovalIcon, { sx: styles.approvalAndDenyIcon }) })) })) })), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfMenu, { options: approvalBannerMenuOptions, handleMenuSelection: (name) => handleMenuSelectionContactEditor(name), menuItemStyles: menuItemStyles.menuItemContent, menuTextStyles: menuItemStyles.menuItemNameBold }) }))] }))), canCopyApprovalMessage && (_jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('redoWithEdit'), arrow: true }, { children: _jsx(Button, Object.assign({ "aria-label": translate('redoWithEdit'), tabIndex: 0, sx: styles.copyButton, disabled: isAttachmentUploadingInEditor(), onClick: handleCopyMessage }, { children: _jsx(CcfRedoWithEditIcon, { sx: styles.approvalAndDenyIcon }) })) })) })))] })) })));
}
//# sourceMappingURL=ccf-approval-banner.js.map