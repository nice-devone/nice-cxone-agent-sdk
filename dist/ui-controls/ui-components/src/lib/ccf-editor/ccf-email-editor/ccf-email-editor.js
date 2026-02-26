import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect, useState } from 'react';
import { Box, Collapse, IconButton, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from 'lexical';
import { CcfRichTextEditor } from '../ccf-rich-text-editor/ccf-rich-text-editor';
import { CcfContactEditorAction, getContactFromAddress, getEmailReceiverCc, getEmailReceiverBcc, getContactEditorContent, getIsMessageSendingStatus, getIsSendMessageButtonEnabled, getIsUploadingAttachment } from '../ccf-contact-editor.slice';
import { DigitalContactStatus } from '@nice-devone/common-sdk';
import CcfLabelControl, { CcfLabelControlType } from '../../ccf-interaction-space/ccf-label-control/ccf-label-control';
import { useTranslator, isFeatureEnabled, CcfTooltip } from '@nice-devone/ui-controls';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfAssignmentAction, getCxoneDigitalContactUserSavedProperties, getDigitalContactDetailsByCaseId, getDigitalReplyChannelsByCaseId, getNonIncomingActiveContactInSelectedInteraction, getVoiceRecordingState } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfFileUpload from '../../ccf-fileupload/ccf-fileupload';
import CcfContactEmailEditorStyles from './ccf-email-editor.styles';
import { checkExtenalDirectoryEnabled, getExternalDirectories } from '../../ccf-directory/+state/ccf-directory.slice';
import { userInfoSelector } from '../../ccf-agent-state/ccf-agent-state.slice';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DigitalSavedProperties, updateSelectedDigitalSavedProperties } from '../../ccf-assignment-panel/ccf-assignment-utils';
/**
 * Component displays CcfEmailEditor
 * @returns Rich text Editor wrapper
 * ```
 * @example
 * <CcfRichEditorWrapper/>
 * ```
 */
const CcfEmailEditor = ({ editorContainerRef, editorRef, savedDigitalContactRef, updatePlugin, debouncedUpdateEditorState, editorState, onError, isEditorFocused, onUploadAttachment, id, caseId, interactionId, closeTab, onBlur, handleEnterKey, allowSendonEnter, copilotEnabled, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(caseId, interactionId));
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const savedDigitalContactDetails = digitalContactUserSavedProperties === null || digitalContactUserSavedProperties === void 0 ? void 0 : digitalContactUserSavedProperties[caseId];
    const closedContact = selectedDigitalContactDetails.status === DigitalContactStatus.CLOSED;
    const theme = useTheme();
    const styles = CcfContactEmailEditorStyles(theme);
    const [isBcc, setBcc] = useState(((_a = ((savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverBcc) || '')) === null || _a === void 0 ? void 0 : _a.length) > 0 ? true : false);
    const [isCc, setCc] = useState(((_b = ((savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverCc) || '')) === null || _b === void 0 ? void 0 : _b.length) > 0 ? true : false);
    const receiverCc = useSelector(getEmailReceiverCc(caseId)) || (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverCc);
    const receiverBcc = useSelector(getEmailReceiverBcc(caseId)) || (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverBcc);
    const [isReceiverToValid, setReceiverToValid] = useState(true);
    const [isReceiverCcValid, setReceiverCcValid] = useState(true);
    const [isReceiverBccValid, setReceiverBccValid] = useState(true);
    const [isSubjectValid, setSubjectValid] = useState(false);
    const from = useSelector(getContactFromAddress(caseId)) || (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.channelDisplayName);
    const [translate] = useTranslator();
    const isOBContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) && ((_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _c === void 0 ? void 0 : _c.status) === DigitalContactStatus.DRAFT ? true : false;
    const fromAddressList = useSelector(getDigitalReplyChannelsByCaseId(caseId, interactionId));
    const hasAbilityToSendFiles = !!((_d = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _d === void 0 ? void 0 : _d.hasAbilityToSendFiles); // To enable file upload and drag n drop feature
    const contactEditorContent = useSelector(getContactEditorContent(caseId));
    const contentHasImg = contactEditorContent && contactEditorContent.includes('<img');
    // lexical editor state creates 3rd node only if it has explicit editor updation. but need to check if its not spaces only
    const hasOnlySpace = (editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) && ((_g = (_f = (_e = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current.getRootElement()) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) === null || _g === void 0 ? void 0 : _g.length) === 0;
    const isUserEnterdTextInEditor = (editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) && ((_k = (_j = (_h = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _h === void 0 ? void 0 : _h._editorState) === null || _j === void 0 ? void 0 : _j._nodeMap) === null || _k === void 0 ? void 0 : _k.size) > 2 && !hasOnlySpace ? true : false;
    const debounceInterval = 500;
    const isMessageSendingNow = useSelector(getIsMessageSendingStatus(caseId));
    const isVoiceRecordingInProgress = useSelector(getVoiceRecordingState(caseId || '', interactionId || ''));
    const [editorToolbarComponent, setEditorToolbarComponent] = useState(null);
    const [editorActionsComponent, setEditorActionsComponent] = useState(null);
    const isEmailRevampEnabled = isFeatureEnabled("release-cx-agent-Revamped_New_Digital_Email_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_REVAMP_FEATURE_TOGGLE */);
    const isEditorRevampToggleEnabled = isFeatureEnabled("release-cx-agent-Revamped_Email_Editor_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_EDITOR_REVAMP_FEATURE_TOGGLE */);
    const externalDirectories = useSelector(getExternalDirectories);
    const userInfo = useSelector(userInfoSelector);
    const [headerExpandCollapse, setHeaderExpandCollapse] = React.useState(false);
    const isSendMessageButtonEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
    const isUploadingAttachment = useSelector(getIsUploadingAttachment(caseId));
    /**
     * dynamic import of editor toolbar and actions
     *  @example loadEditorToolbarAndActions();
     */
    const loadEditorToolbarAndActions = () => __awaiter(void 0, void 0, void 0, function* () {
        setEditorToolbarComponent(null);
        setEditorActionsComponent(null);
        const EditorToolBar = (yield import('../ccf-editor-toolbar-plugin/ccf-editor-toolbar-plugin')).CcfEditorToolbarPlugin;
        const EditorActions = (yield import('../ccf-editor-actions')).default;
        setEditorToolbarComponent(_jsx(EditorToolBar, { showRichToolBarButtons: true, showFileUploadButton: hasAbilityToSendFiles, onUploadAttachment: uploadEmailAttachment, caseId: caseId, copilotEnabled: copilotEnabled, displayNewEmailButtons: isEmailRevampEnabled && isEditorRevampToggleEnabled }));
        setEditorActionsComponent(_jsx(EditorActions, { id: id, caseId: caseId, interactionId: interactionId, closeTab: closeTab, editorRef: editorRef, savedDigitalContactRef: savedDigitalContactRef, copilotEnabled: copilotEnabled }));
    });
    useEffect(() => {
        loadEditorToolbarAndActions();
    }, []);
    /**
     * useEffect to set header by default expanded when the case status is DRAFT
     */
    useEffect(() => {
        var _a;
        if (((_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.status) === DigitalContactStatus.DRAFT)
            setHeaderExpandCollapse(true);
    }, [(_l = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _l === void 0 ? void 0 : _l.status]);
    useEffect(() => {
        var _a;
        if (!Object.keys(externalDirectories).length) {
            dispatch(checkExtenalDirectoryEnabled({
                userId: (_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId) === null || _a === void 0 ? void 0 : _a.toString(),
                startIndex: 0,
                totalRecords: 25,
            }));
        }
    }, [externalDirectories, userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId, dispatch]);
    useEffect(() => {
        //Applying debouncing to avoid flicker of send button when multiple attachment uploaded at a time
        const enableSendButtonChangeDebounce = setTimeout(() => {
            var _a, _b;
            let editorHasContent = false;
            if (((_a = digitalContactUserSavedProperties[caseId]) === null || _a === void 0 ? void 0 : _a.isRejectedMessageCopied) && isUploadingAttachment) {
                editorHasContent = false; // when rejected message is copied and attachment is in uploading state we will consider editor has no content
            }
            else {
                editorHasContent = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments.length) > 0
                    ? (_b = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments) === null || _b === void 0 ? void 0 : _b.every((attachment) => attachment.uploaded) : !!isUserEnterdTextInEditor;
            }
            // for OB contact we check if the customer name is not blank as its initiated from UI client
            const checkMandatoryFields = (isOBContact && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.customerName) !== '' && (editorHasContent || contentHasImg)) ||
                (!isOBContact && editorHasContent);
            dispatch(
            //Todo : Need to move below conditional params to checkMandatoryFields
            CcfContactEditorAction.updateSendButtonEnabled({
                caseId, isSendButtonEnabled: checkMandatoryFields && isReceiverToValid && isReceiverCcValid &&
                    isReceiverBccValid && isSubjectValid && !isMessageSendingNow && !isVoiceRecordingInProgress
            }));
        }, debounceInterval);
        return () => clearTimeout(enableSendButtonChangeDebounce);
    }, [
        nonIncomingActiveContactInSelectedInteraction,
        editorState,
        isReceiverToValid,
        isReceiverCcValid,
        isReceiverBccValid,
        isSubjectValid
    ]);
    useEffect(() => {
        let unregister;
        if (editorRef && (editorRef === null || editorRef === void 0 ? void 0 : editorRef.current)) {
            unregister = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current.registerCommand(KEY_ENTER_COMMAND, (event) => {
                //if shift key is not pressed then only will proceed for the handleEnter key action.
                if (!(event === null || event === void 0 ? void 0 : event.shiftKey) && allowSendonEnter && isSendMessageButtonEnabled) {
                    handleEnterKey && handleEnterKey();
                    event.preventDefault();
                }
                return false; // Allow other KEY_ENTER_COMMAND to run
            }, COMMAND_PRIORITY_HIGH);
        }
        return () => {
            unregister();
        };
    }, [allowSendonEnter, editorRef, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments, isSendMessageButtonEnabled]);
    /**
     * onBccClick method to show or hide BCC section
     * @example onBccClick();
     */
    const onBccClick = () => {
        setBcc(!isBcc);
    };
    /**
     * onCcClick method to show or hide BCC section
     * @example onCcClick();
     */
    const onCcClick = () => {
        setCc(!isCc);
    };
    /**
     * handler for receiver to field update
     * @example
     * ```
     * handleReceiverToChange(newVal);
     * ```
     */
    const handleReceiverToChange = (receiverTo) => {
        dispatch(CcfContactEditorAction.setEmailToValue({ caseId, receiverTo: receiverTo }));
        updateSelectedDigitalSavedProperties(dispatch, DigitalSavedProperties.RECEIVER_TO, caseId, receiverTo);
        if (isOBContact) {
            const recipient = receiverTo && receiverTo.split(',')[0];
            dispatch(CcfAssignmentAction.updateDigitalRecipientName({
                recipientName: recipient,
                caseId: selectedDigitalContactDetails.caseId,
                interactionId: selectedDigitalContactDetails.interactionId,
            }));
            const currentObContact = LocalStorageHelper.getItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, true);
            if (currentObContact && currentObContact.length > 0) {
                const indexToUpdate = currentObContact.findIndex((contact) => contact.caseId === selectedDigitalContactDetails.caseId);
                const updatedObContact = [...currentObContact];
                updatedObContact[indexToUpdate] = Object.assign(Object.assign({}, updatedObContact[indexToUpdate]), { customerName: recipient });
                LocalStorageHelper.setItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, updatedObContact);
            }
        }
    };
    /**
     * Set scroll bar position at bottom of the container div
     * @example setScrollBottomForEmail()
     */
    const setScrollBottomForEmail = () => {
        const editorContainerDiv = editorContainerRef.current;
        if (editorContainerDiv) {
            setTimeout(() => {
                editorContainerDiv.scrollTop = editorContainerDiv.scrollHeight;
            }, 300);
        }
    };
    /**
     * Method to upload email attachment
     * @example  -
     * ```
     * uploadEmailAttachment(fileList);
     * ```
     */
    const uploadEmailAttachment = (fileList) => {
        onUploadAttachment(fileList);
        setScrollBottomForEmail();
    };
    return (_jsxs(_Fragment, { children: [!closedContact && (_jsxs("div", { children: [_jsxs("div", Object.assign({ style: styles.toContainer }, { children: [_jsx("div", Object.assign({ style: Object.assign(Object.assign({}, styles.toLabel), styles.toPadding) }, { children: _jsx(CcfLabelControl, { "data-testid": "to-action", controlType: "email", label: "to", isValid: (value) => setReceiverToValid(value), value: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverTo, onValueChange: (val) => handleReceiverToChange(val), errorMessage: translate('invalidEmailAddress'), isRequired: true, styles: { wrapper: styles.wrapper, label: styles.styleLabel, tooltip: styles.tooltip }, onBlur: onBlur }) })), _jsx("div", { children: _jsx(CcfTooltip, Object.assign({ title: headerExpandCollapse ? translate('collapseLabel') : translate('expandLabel') }, { children: _jsx(IconButton, Object.assign({ "aria-expanded": headerExpandCollapse, sx: styles.collapseTo, onClick: () => setHeaderExpandCollapse(!headerExpandCollapse) }, { children: headerExpandCollapse ? _jsx(ExpandLess, { "aria-label": translate('collapseMailHeader') }) : _jsx(ExpandMore, { "aria-label": translate('expandMailHeader') }) })) })) })] })), _jsx(Box, Object.assign({ component: 'div', style: styles.editorBodyHeight }, { children: _jsxs(Collapse, Object.assign({ in: headerExpandCollapse }, { children: [_jsx(Box, Object.assign({ sx: { transform: 'translateY(-0.5rem)' } }, { children: _jsxs("div", Object.assign({ style: styles.toContainer }, { children: [_jsx("div", Object.assign({ style: Object.assign(Object.assign({}, styles.fromLabel), styles.fromPadding) }, { children: _jsx(CcfLabelControl, { label: "from", controlType: (fromAddressList === null || fromAddressList === void 0 ? void 0 : fromAddressList.length) > 0 ? CcfLabelControlType.DROPDOWN : undefined, value: from, styles: { wrapper: styles.wrapperWithBorder, label: styles.styleLabel }, replyChannels: fromAddressList, onValueChange: (val) => dispatch(CcfContactEditorAction.setContactFromValue({ caseId, fromAddress: val })), onBlur: onBlur }) })), _jsxs("div", Object.assign({ style: styles.bccContainer }, { children: [_jsx("span", Object.assign({ role: "button", tabIndex: 0, "data-testid": "cc-action", onKeyUp: (e) => {
                                                            if (e.key === 'Enter')
                                                                onCcClick();
                                                        }, style: styles.ccBox, onClick: onCcClick, "aria-label": translate('cc') }, { children: "CC" })), _jsx("span", Object.assign({ style: styles.ccBox }, { children: "/" })), _jsx("span", Object.assign({ role: "button", style: styles.bccBox, tabIndex: 0, "data-testid": "bcc-action", onKeyUp: (e) => {
                                                            if (e.key === 'Enter')
                                                                onBccClick();
                                                        }, onClick: onBccClick, "aria-label": translate('bcc') }, { children: "BCC" }))] }))] })) })), isCc && (_jsx(Box, Object.assign({ sx: Object.assign({ transform: 'translateY(-0.625rem)' }, styles.ccPadding) }, { children: _jsx(CcfLabelControl, { controlType: "email", label: "cc", isValid: (errorValue) => setReceiverCcValid(errorValue), value: (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverCc) || receiverCc, errorMessage: translate('invalidEmailAddress'), onValueChange: (value) => {
                                            dispatch(CcfContactEditorAction.setEmailCcValue({ caseId, receiverCc: value }));
                                            updateSelectedDigitalSavedProperties(dispatch, DigitalSavedProperties.RECEIVER_CC, caseId, value);
                                        }, isRequired: false, styles: { wrapper: styles.wrapperWithBorder, label: styles.styleLabel, tooltip: styles.tooltip }, onBlur: onBlur }) }))), isBcc && (_jsx(Box, Object.assign({ sx: Object.assign({ transform: 'translateY(-0.625rem)' }, styles.bccPadding) }, { children: _jsx(CcfLabelControl, { controlType: "email", label: "bcc", isValid: (errorValue) => setReceiverBccValid(errorValue), value: (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverBcc) || receiverBcc, errorMessage: translate('invalidEmailAddress'), onValueChange: (value) => {
                                            dispatch(CcfContactEditorAction.setEmailBccValue({ caseId, receiverBcc: value }));
                                            updateSelectedDigitalSavedProperties(dispatch, DigitalSavedProperties.RECEIVER_BCC, caseId, value);
                                        }, isRequired: false, styles: { wrapper: styles.wrapperWithBorder, label: styles.styleLabel, tooltip: styles.tooltip }, onBlur: onBlur }) }))), _jsx(Box, Object.assign({ sx: Object.assign({ transform: 'translateY(-0.625rem)' }, styles.subjectLinePadding) }, { children: _jsx(CcfLabelControl, { controlType: "text", label: "subject", isValid: (value) => { if (Boolean(value) !== isSubjectValid) {
                                            setSubjectValid(Boolean(value));
                                        } }, value: ((savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isEmailForward) ? `${translate('fwd')}: ` : '') + (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.subject), errorMessage: translate('invalidSubjectError'), onValueChange: (val) => dispatch(CcfContactEditorAction.setEmailSubject({ caseId, subject: val })), isRequired: true, styles: { wrapper: styles.wrapperWithBorder, label: styles.styleLabel }, onBlur: onBlur }) }))] })) })), _jsx("hr", { style: styles.hr })] })), (isEmailRevampEnabled && isEditorRevampToggleEnabled) ? _jsx(CcfRichTextEditor, { editorContainerRef: editorContainerRef, onError: onError, onFocus: () => dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: true })), onBlur: () => {
                    onBlur && onBlur();
                    dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: false }));
                }, onEditorStateChange: debouncedUpdateEditorState, editorState: editorState, isEditorFocused: isEditorFocused, toolbarPlugin: editorToolbarComponent, fileUploadPlugin: _jsx(CcfFileUpload, {}), editorRef: editorRef, updatePlugin: updatePlugin, isOBContact: isOBContact, caseId: caseId, onUploadAttachment: onUploadAttachment, shouldDisplayDragDropZone: hasAbilityToSendFiles, savedDigitalContactRef: savedDigitalContactRef, closeTab: closeTab, id: id, interactionId: interactionId, copilotEnabled: copilotEnabled, headerExpandCollapse: headerExpandCollapse }, (_m = selectedDigitalContactDetails.case) === null || _m === void 0 ? void 0 : _m.id) :
                _jsxs(_Fragment, { children: [_jsx(CcfRichTextEditor, { editorContainerRef: editorContainerRef, onError: onError, onFocus: () => dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: true })), onBlur: () => {
                                onBlur && onBlur();
                                dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: false }));
                            }, onEditorStateChange: debouncedUpdateEditorState, editorState: editorState, isEditorFocused: isEditorFocused, toolbarPlugin: editorToolbarComponent, fileUploadPlugin: _jsx(CcfFileUpload, {}), editorRef: editorRef, updatePlugin: updatePlugin, isOBContact: isOBContact, caseId: caseId, onUploadAttachment: onUploadAttachment, shouldDisplayDragDropZone: hasAbilityToSendFiles, headerExpandCollapse: headerExpandCollapse }, (_o = selectedDigitalContactDetails.case) === null || _o === void 0 ? void 0 : _o.id), editorActionsComponent] })] }));
};
export default memo(CcfEmailEditor);
//# sourceMappingURL=ccf-email-editor.js.map