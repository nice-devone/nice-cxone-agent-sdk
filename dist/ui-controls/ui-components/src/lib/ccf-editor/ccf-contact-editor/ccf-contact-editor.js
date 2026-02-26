import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, memo, useRef, useCallback, useState } from 'react';
import { $getRoot, $createParagraphNode } from 'lexical';
import { CcfBox, CcfTooltip, CcfTypography, useTranslator, CcfAnimatedEllipsisControl, isFeatureEnabled } from '@nice-devone/ui-controls';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useTheme, useMediaQuery, Box, Button } from '@mui/material';
import { $generateHtmlFromNodes } from '@lexical/html';
import { DeleteOutlined } from '@mui/icons-material';
import CcfEditorToolbarPlugin from '../ccf-editor-toolbar-plugin/ccf-editor-toolbar-plugin';
import { CcfPlainTextEditor } from '../ccf-plain-text-editor/ccf-plain-text-editor';
import CcfContactEditorActions from '../ccf-editor-actions';
import { DigitalContactStatus, DigitalChannelType, MediaType, AgentAssistConfigACPParamsKeys, ReplyAPIStatus, TypingIndicatorActions } from '@nice-devone/common-sdk';
import { CcfContactEditorAction, getIsContactEditorFocused, getContactEditorState, getEmailReceiverTo, getEmailReceiverCc, getEmailReceiverBcc, getEmailSubject, getContactFromAddress, getContactReplySent, initialEditorState, getSelectedContactMessageReplyData, getContactSelectedSkill, draftContactMessage, sendMessageReply, getIsContactEditorOpen, getUserTypingData, getMessageSendState, getDraftMessagePayload, getIsMessageSendingStatus, typingIndicatorForPatron, getIsUploadingAttachment, getIsSendMessageButtonEnabled, getIsTextAddedInEditor } from '../ccf-contact-editor.slice';
import { SEND_MESSAGE } from '../ccf-approval-menu/ccf-approval-menu';
import { debounce } from '../../../hooks/useDebounce';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import { UpdateEditorContentPlugin } from '../ccf-editor-update-plugin/ccf-editor-update-plugin';
import { cxoneDigitalContactDetails } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { getCxoneDigitalContactUserSavedProperties, CcfAssignmentAction, updateFileToBeUploaded, getDigitalContactDetailsByCaseId, getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, getVoiceRecordingState } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfEmailEditor from '../ccf-email-editor/ccf-email-editor';
import CcfFileUpload from '../../ccf-fileupload/ccf-fileupload';
import { LocalStorageHelper, NotificationSettings, StorageKeys } from '@nice-devone/core-sdk';
import { CcfLogger, FeatureToggleService } from '@nice-devone/agent-sdk';
import { cxoneRoutingQueuId, getRoutingQueueId } from '../../ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { getInitialSkill, hasEqualValueInLocalStorage, uploadLSForEditor } from '../ccf-editor-utils';
import CcfContactEditorStyles from './ccf-contact-editor.styles';
import CcfTypingIndicator from '../../ccf-typing-preview/ccf-typing-indicator';
import CcfCopilotNBRSeperator from '../ccf-copilot-components/ccf-copilot-nbr-seperator';
import CcfCopilotNBRContainer from '../ccf-copilot-components/ccf-copilot-nbr-container';
import CcfCopilotNBRVisibility from '../ccf-copilot-components/ccf-copilot-nbr-visibility';
import { getNextBestResponses, isCopilotEnabledForContact, isAgentAssistConfigParamsEnabledForContact } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { getApplicationLocale } from '../../global.app.slice';
import { updateDraftMessageIntoState } from '../../../util/common';
import { SendWithEnterValues } from '../../ccf-settings/ccf-display-settings';
const TYPING_INDICATOR_DELAY = 2000; // Buffer time to deactivate the typing indicator
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor wrapper
 * ```
 * @example
 * <CcfRichEditorWrapper/>
 * ```
 */
export function CcfContactEditor(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const isAgentToPatronTypingDisabled = isFeatureEnabled("release-cx-agent-disable-agent-typing-indicator-AW-46709" /* FeatureToggles.DISABLE_AGENT_TO_PATRON_TYPING_TOGGLE */);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(props.caseId, props.interactionId));
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const theme = useTheme();
    const caseId = props.caseId;
    const editorState = useSelector(getContactEditorState(caseId));
    const savedDigitalContactDetails = digitalContactUserSavedProperties === null || digitalContactUserSavedProperties === void 0 ? void 0 : digitalContactUserSavedProperties[caseId];
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const hasPrivateChannel = (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _a === void 0 ? void 0 : _a.isPrivate;
    const selectedMessageReplyState = useSelector(getSelectedContactMessageReplyData(caseId));
    const customerName = (_d = (_c = (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.authorEndUserIdentity) === null || _c === void 0 ? void 0 : _c.fullName) !== null && _d !== void 0 ? _d : selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.customerName;
    const isEditorFocused = useSelector(getIsContactEditorFocused(caseId)); // to know when the editor is in focused state so that we can add border
    const wysiwygEnabled = !!((_e = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _e === void 0 ? void 0 : _e.wysiwygEnabled); // To enable rich editor
    const hasAbilityToSendFiles = !!((_f = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _f === void 0 ? void 0 : _f.hasAbilityToSendFiles); // To enable file upload and drag n drop feature
    const getDigitalContactDetails = useSelector(cxoneDigitalContactDetails);
    let parsedLexicalString = '';
    const editorContainerRef = useRef(null);
    // Adding the Ref to both Editor, to Clear, Cancel and Discard value to current editor
    const editRef = useRef(null);
    const debounceInputIntervalInMs = 300;
    const isOBContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) && ((_g = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _g === void 0 ? void 0 : _g.status) === DigitalContactStatus.DRAFT ? true : false;
    const isLgView = useMediaQuery(theme.breakpoints.between(1300, 2600));
    const isDraft = ((_h = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.case) === null || _h === void 0 ? void 0 : _h.status) === DigitalContactStatus.DRAFT ? false : true;
    const styles = CcfContactEditorStyles(theme, isOBContact, isDraft);
    const selectedSkill = useSelector(getContactSelectedSkill(caseId));
    const selectedSkillRef = useRef(selectedSkill);
    const getCxoneRoutingQueueId = useSelector(cxoneRoutingQueuId);
    const receiverTo = useSelector(getEmailReceiverTo(caseId));
    const receiverCc = useSelector(getEmailReceiverCc(caseId));
    const receiverBcc = useSelector(getEmailReceiverBcc(caseId));
    const subject = useSelector(getEmailSubject(caseId));
    const from = useSelector(getContactFromAddress(caseId));
    const savedDigitalContact = useRef(savedDigitalContactDetails);
    const replySent = useSelector(getContactReplySent(caseId));
    const isEditorOpen = useSelector(getIsContactEditorOpen(caseId)) || false;
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isUploadingAttachment = useSelector(getIsUploadingAttachment(caseId));
    // using this variable as ref, as we only want changed value to be used in useEffect without re-rendering the component.
    const isTextAddedToEditor = useRef(false);
    const isClosedContact = Boolean(selectedDigitalContactDetails.status === DigitalContactStatus.CLOSED);
    const isPrivateChannel = (_j = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _j === void 0 ? void 0 : _j.isPrivate;
    const isEditorEnabled = Boolean((!isClosedContact && isPrivateChannel) || (!isClosedContact && isEditorOpen && !isPrivateChannel));
    let userRolePermissions = {};
    const plainTextEditorContent = useRef('');
    const prevPlainTextEditorContent = useRef('');
    const typingIndicatorEnabled = useRef(false);
    const typingIndicatorTimerRef = useRef(null);
    const isInitialLoad = useRef(true);
    const isSyfPerfEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-syf-performance-generic-AW-46709" /* FeatureToggles.SYF_PERFORMANCE_GENERIC_TOGGLE */);
    if (props.interactionId && props.caseId) {
        userRolePermissions =
            (_k = getDigitalContactDetails[props.interactionId][props.caseId]) === null || _k === void 0 ? void 0 : _k.userRolePermissions;
    }
    const initialSelectedSkill = useCallback(() => getInitialSkill(userRolePermissions, selectedDigitalContactDetails), [userRolePermissions, selectedDigitalContactDetails]);
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-contact-editor');
    const customerTypingPreview = useSelector(getUserTypingData(caseId));
    const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
    const copilotNextBestResponses = useSelector(getNextBestResponses(caseId || '', copilotEnabled));
    const isNextBestResponseEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.BEHAVIORAL_GUIDANCE));
    const [focusEditor, setFocusEditor] = useState(true);
    const locale = useSelector(getApplicationLocale);
    const messageSendStatus = useSelector(getMessageSendState(caseId));
    const draftMessagePayload = useSelector(getDraftMessagePayload(caseId));
    const isVoiceRecordingInProgress = useSelector(getVoiceRecordingState(props.caseId || '', props.interactionId || ''));
    const isMessageSendingNow = useSelector(getIsMessageSendingStatus(caseId));
    const sendonEnterFromLS = LocalStorageHelper.getItem(NotificationSettings.SEND_WITH_ENTER);
    let allowEmailSendonEnter = false;
    let allowOtherSendonEnter = true;
    const isSendButtonCurrentlyEnabled = useSelector(getIsSendMessageButtonEnabled(caseId));
    const isTextCurrenlyAddedInEditor = useSelector(getIsTextAddedInEditor(caseId));
    if (sendonEnterFromLS === SendWithEnterValues.ALLCHHANELS) {
        allowEmailSendonEnter = true;
        allowOtherSendonEnter = true;
    }
    else if (sendonEnterFromLS === SendWithEnterValues.ALLCHANNELSEXCEPTEMAIL) {
        allowEmailSendonEnter = false;
        allowOtherSendonEnter = true;
    }
    else if (sendonEnterFromLS === SendWithEnterValues.NOCHANNELS) {
        allowEmailSendonEnter = false;
        allowOtherSendonEnter = false;
    }
    /**
     * Check if the object is of type lexical EditorState
     * @example
     * ```
     * isLexicalEditorState();
     * ```
     */
    function isLexicalEditorState(passedLexicalState) {
        return (!!passedLexicalState &&
            typeof passedLexicalState === 'object' &&
            typeof passedLexicalState.read === 'function' &&
            typeof passedLexicalState.toJSON === 'function');
    }
    //Dev Note: code added for visual indicators
    useEffect(() => {
        updateDraftMessageIntoState(draftMessagePayload, messageSendStatus, selectedDigitalContactDetails, dispatch);
    }, [messageSendStatus]);
    useEffect(() => {
        typingIndicatorEnabled.current = true;
    }, [caseId]);
    // Placed below method before useEffect as unit test needs window events initialized before accessing in useEffect. 
    /**
     * Persist draft data in redux and local storage
     * @example
     * ```
     * persistDigitalContactDetails();
     * ```
     */
    const persistDigitalContactDetails = (updateLS = false) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        if (isLexicalEditorState((_a = savedDigitalContact.current) === null || _a === void 0 ? void 0 : _a.lexicalEditorState)) {
            const digitalContactUserSavedPropertiesFromStorage = LocalStorageHelper.getItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS);
            let parsedDigitalContactUserSavedProperties = {};
            parsedDigitalContactUserSavedProperties = digitalContactUserSavedPropertiesFromStorage ? JSON.parse(digitalContactUserSavedPropertiesFromStorage) : {};
            if (savedDigitalContact && savedDigitalContact.current) {
                const digitalContactToBeSaved = {
                    caseId: selectedDigitalContactDetails.caseId,
                    fieldsToUpdate: {
                        subject: (_c = (_b = savedDigitalContact.current) === null || _b === void 0 ? void 0 : _b.subject) !== null && _c !== void 0 ? _c : '',
                        sender: (_e = (_d = savedDigitalContact.current) === null || _d === void 0 ? void 0 : _d.sender) !== null && _e !== void 0 ? _e : '',
                        receiverTo: (_g = (_f = savedDigitalContact.current) === null || _f === void 0 ? void 0 : _f.receiverTo) !== null && _g !== void 0 ? _g : '',
                        receiverCc: (_j = (_h = savedDigitalContact.current) === null || _h === void 0 ? void 0 : _h.receiverCc) !== null && _j !== void 0 ? _j : '',
                        receiverBcc: (_l = (_k = savedDigitalContact.current) === null || _k === void 0 ? void 0 : _k.receiverBcc) !== null && _l !== void 0 ? _l : '',
                        lexicalEditorState: (_m = savedDigitalContact.current) === null || _m === void 0 ? void 0 : _m.lexicalEditorState,
                        messageId: (_p = (_o = savedDigitalContact.current) === null || _o === void 0 ? void 0 : _o.messageId) !== null && _p !== void 0 ? _p : '',
                        isEditorOpen: (_q = savedDigitalContact.current) === null || _q === void 0 ? void 0 : _q.isEditorOpen,
                        channelDisplayName: (_r = savedDigitalContact.current) === null || _r === void 0 ? void 0 : _r.channelDisplayName,
                        isReplyingToSpecificMessage: ((_s = parsedDigitalContactUserSavedProperties === null || parsedDigitalContactUserSavedProperties === void 0 ? void 0 : parsedDigitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _s === void 0 ? void 0 : _s.isReplyingToSpecificMessage) ? true : false,
                        message: ((_t = parsedDigitalContactUserSavedProperties === null || parsedDigitalContactUserSavedProperties === void 0 ? void 0 : parsedDigitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _t === void 0 ? void 0 : _t.message) ? (_u = parsedDigitalContactUserSavedProperties === null || parsedDigitalContactUserSavedProperties === void 0 ? void 0 : parsedDigitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _u === void 0 ? void 0 : _u.message : {},
                        isRejectedMessageCopied: (_w = (_v = parsedDigitalContactUserSavedProperties === null || parsedDigitalContactUserSavedProperties === void 0 ? void 0 : parsedDigitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _v === void 0 ? void 0 : _v.isRejectedMessageCopied) !== null && _w !== void 0 ? _w : false,
                        selectedMessageReplyData: (_y = (_x = parsedDigitalContactUserSavedProperties === null || parsedDigitalContactUserSavedProperties === void 0 ? void 0 : parsedDigitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _x === void 0 ? void 0 : _x.selectedMessageReplyData) !== null && _y !== void 0 ? _y : {},
                        isEmailForward: (_0 = (_z = parsedDigitalContactUserSavedProperties === null || parsedDigitalContactUserSavedProperties === void 0 ? void 0 : parsedDigitalContactUserSavedProperties[selectedDigitalContactDetails.caseId]) === null || _z === void 0 ? void 0 : _z.isEmailForward) !== null && _0 !== void 0 ? _0 : false,
                    },
                };
                if (!updateLS) {
                    setFocusEditor(false); //Disable on blur
                    dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase(digitalContactToBeSaved));
                }
                else {
                    if (JSON.stringify(savedDigitalContact.current) !== JSON.stringify(savedDigitalContactDetails)) {
                        if (digitalContactToBeSaved) {
                            const updatedDigitalContactUserSavedProperties = Object.assign(Object.assign({}, digitalContactUserSavedProperties), { [digitalContactToBeSaved.caseId]: Object.assign(Object.assign({}, digitalContactUserSavedProperties[digitalContactToBeSaved.caseId]), digitalContactToBeSaved.fieldsToUpdate) });
                            LocalStorageHelper.setItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS, updatedDigitalContactUserSavedProperties);
                        }
                    }
                }
            }
        }
    };
    //to reset the savedDigitalContact ref back to undefined on successful sent reply
    useEffect(() => {
        if (replySent) {
            savedDigitalContact.current = undefined;
            dispatch(CcfContactEditorAction.setContactReplySent({ caseId, replySent: false }));
        }
    }, [replySent]);
    //To reset the selected skill ref
    useEffect(() => {
        if (selectedSkill) {
            selectedSkillRef.current = selectedSkill;
        }
    }, [selectedSkill]);
    useEffect(() => {
        savedDigitalContact.current = {
            receiverTo,
            receiverCc: receiverCc ? receiverCc : ((savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverCc) || ''),
            receiverBcc: receiverBcc ? receiverBcc : ((savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverBcc) || ''),
            sender: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.sender,
            subject,
            isResponse: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isResponse,
            messageId: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.messageId,
            channelDisplayName: from,
            lexicalEditorState: editorState,
            isEditorOpen: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isEditorOpen,
        };
    }, [subject, receiverTo, receiverCc, receiverBcc, editorState, from, isEditorOpen]);
    useEffect(() => {
        if (!wysiwygEnabled) {
            dispatch(CcfContactEditorAction.updateSendButtonEnabled({ caseId, isSendButtonEnabled: checkMandatoryFields() }));
        }
    }, [nonIncomingActiveContactInSelectedInteraction, editorState, isMessageSendingNow]);
    /**
     * Created a named function for persistDigitalContactDetails to use in addEventListener and removeEventListener
     * @example -
     *  - window.addEventListener('beforeunload', persistDigitalContact);
     * //
     *  - window.removeEventListener('beforeunload', persistDigitalContact);
     */
    const persistDigitalContact = useCallback(() => {
        persistDigitalContactDetails(true);
    }, []);
    useEffect(() => {
        var _a;
        window.addEventListener('beforeunload', persistDigitalContact);
        const currentEditor = editRef === null || editRef === void 0 ? void 0 : editRef.current;
        dispatch(CcfContactEditorAction.setInitialEditorSlice({
            caseId,
            ContactEditorDetails: {
                editorState: (!wysiwygEnabled && (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.lexicalEditorState)) ? currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.parseEditorState(JSON.stringify(savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.lexicalEditorState)) :
                    (savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.lexicalEditorState) || (currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.parseEditorState(initialEditorState)),
                isSendButtonEnabled: false,
                isDiscardDisabled: false,
                isEditorFocused: false,
                isEditorOpen: false,
                isPrivateChannel: false,
                replySent: false,
                selectedMessageReplyData: {},
                subject: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.subject,
                receiverTo: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverTo,
                receiverCc: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverCc,
                receiverBcc: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.receiverBcc,
                messageDraftId: '',
                selectedSkill: initialSelectedSkill(),
                fromAddress: savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.channelDisplayName,
                parsedLexicalString: '',
                emailEditorContentToInsert: '',
                isUploadDialogEnabled: false,
                customerTyping: {
                    isMessageSentByCustomer: false,
                    isMessageTypingStarted: false,
                },
                isAgentReplyReadyToSent: false,
                isCopiedFromExcel: false,
                isMessageSending: false,
                message: {},
                messageSendState: ReplyAPIStatus.IDEAL,
                draftMessagePayload: {},
                isTextAddedInEditor: false,
                isUploadingAttachment: isUploadingAttachment || false,
            },
        }));
        if (!(getCxoneRoutingQueueId === null || getCxoneRoutingQueueId === void 0 ? void 0 : getCxoneRoutingQueueId.length)) {
            dispatch(getRoutingQueueId(''));
        }
        // If we copy-paste content inside the editor, the scroll bar should move to the end
        (_a = editorContainerRef === null || editorContainerRef === void 0 ? void 0 : editorContainerRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('paste', () => {
            // for plain text editor we don't need to add the setScrollBottom on paste event as it is already handled by editor internally.
            if (wysiwygEnabled) {
                setScrollBottom();
            }
        });
        //component unmount
        return () => {
            var _a;
            window.removeEventListener('beforeunload', persistDigitalContact);
            (_a = editorContainerRef === null || editorContainerRef === void 0 ? void 0 : editorContainerRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('paste', setScrollBottom);
        };
    }, []);
    useEffect(() => {
        var _a, _b, _c, _d;
        if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.DIGITAL && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId) && (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId)) {
            const channelFlags = (_a = getDigitalContactDetails[activeContactInSelectedInteraction.interactionId][activeContactInSelectedInteraction.caseId]) === null || _a === void 0 ? void 0 : _a.channel;
            const isPrivateFlag = channelFlags === null || channelFlags === void 0 ? void 0 : channelFlags.isPrivate;
            const savedDetails = digitalContactUserSavedProperties[activeContactInSelectedInteraction.caseId];
            dispatch(CcfContactEditorAction.updateContactEditorFields({
                caseId,
                selectedMessageReplyData: (_b = digitalContactUserSavedProperties[activeContactInSelectedInteraction.caseId]) === null || _b === void 0 ? void 0 : _b.selectedMessageReplyData,
                isPrivateChannel: isPrivateFlag,
                messageDraftId: (_c = savedDetails === null || savedDetails === void 0 ? void 0 : savedDetails.messageDraftId) !== null && _c !== void 0 ? _c : '',
            }));
            if (wysiwygEnabled)
                dispatch(CcfContactEditorAction.setEmailSubject({ caseId, subject: (_d = savedDetails === null || savedDetails === void 0 ? void 0 : savedDetails.subject) !== null && _d !== void 0 ? _d : '' })); // when we switch between forward and reply we need to persist the subject.
        }
    }, [activeContactInSelectedInteraction, getDigitalContactDetails, digitalContactUserSavedProperties]);
    useEffect(() => {
        var _a;
        if (focusEditor) {
            const savedDetails = digitalContactUserSavedProperties[selectedDigitalContactDetails.caseId];
            const isEditorInOpenState = (_a = savedDetails === null || savedDetails === void 0 ? void 0 : savedDetails.isEditorOpen) !== null && _a !== void 0 ? _a : false;
            if (isEditorInOpenState) {
                //If switch back to previous case then editor cursor should be placed at end of entered text
                dispatch(CcfContactEditorAction.updateContactEditorFields({
                    caseId,
                    isEditorOpen: isEditorInOpenState,
                    isEditorFocused: true,
                    editorState: editorState,
                }));
            }
            if (!hasEqualValueInLocalStorage(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS, digitalContactUserSavedProperties)) {
                LocalStorageHelper.setItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS, digitalContactUserSavedProperties);
            }
        }
        else {
            setFocusEditor(true);
        }
    }, [digitalContactUserSavedProperties]);
    /**
     * Method to check mandatory field in text editor
     * @example checkMandatoryFields();
     */
    const checkMandatoryFields = () => {
        const isEditorEmpty = isEditorHasAttachmentOrText();
        // for OB contact we check if the customer name is not blank as its initiated from UI client
        const checkMandatoryFields = !isVoiceRecordingInProgress && ((isOBContact && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.customerName) !== '' && isEditorEmpty) || (!isOBContact && isEditorEmpty)) && !isMessageSendingNow;
        return checkMandatoryFields;
    };
    /**
     * Method to check editor has either text or attachment in text editor
     * @example isEditorHasAttachmentOrText();
     */
    const isEditorHasAttachmentOrText = () => {
        var _a, _b;
        if (((_a = digitalContactUserSavedProperties[caseId]) === null || _a === void 0 ? void 0 : _a.isRejectedMessageCopied) && isUploadingAttachment) {
            return false; // If rejected message is copied and attachment is in uploading state then disable send button
        }
        else {
            return (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments.length) > 0
                ? (_b = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments) === null || _b === void 0 ? void 0 : _b.every((attachment) => attachment.uploaded) : !!(isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current); // Checking uploaded attachment & editor content
        }
    };
    /**
     * Method to turn off the typing indicator
     * @example turnOffTypingIndicator();
     */
    const turnOffTypingIndicator = () => {
        if (typingIndicatorTimerRef.current !== null) {
            // if the indicator is already on then only will make it explicitly off
            dispatch(typingIndicatorForPatron({ typingActionType: TypingIndicatorActions.TYPING_OFF }));
            clearTimeout(typingIndicatorTimerRef.current);
            typingIndicatorTimerRef.current = null;
        }
    };
    /**
     * Method to update editor state
     * @param editorState - editor state
     * @param editor - editor
     * @example updateEditorState(editorState);
     */
    const updateEditorState = (editorState, editor) => {
        editor.update(() => {
            var _a, _b, _c, _d, _e;
            try {
                // By default we have lexical initial format content inserted into editor which is not user entered text. So below condition needs to identify
                // if editor has any user inserted text in editor.
                if ((_a = $getRoot()) === null || _a === void 0 ? void 0 : _a.getFirstChild()) {
                    const textContent = (_c = (_b = $getRoot()) === null || _b === void 0 ? void 0 : _b.getTextContent()) === null || _c === void 0 ? void 0 : _c.trim();
                    isTextAddedToEditor.current = textContent && (textContent === null || textContent === void 0 ? void 0 : textContent.length) > 0 ? true : false;
                }
                // in lexical to parse the html it should be into the scope of current editor
                // therefore we are generating html node here on input debounce instead at timing of sending the message
                parsedLexicalString = wysiwygEnabled ? $generateHtmlFromNodes(editor, null) : (_e = (_d = $getRoot()) === null || _d === void 0 ? void 0 : _d.getTextContent()) === null || _e === void 0 ? void 0 : _e.trim();
                plainTextEditorContent.current = parsedLexicalString;
                dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState, parsedLexicalString }));
                dispatch(CcfContactEditorAction.updateIsTextAddedInEditor({ caseId, isTextAddedInEditor: isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current }));
            }
            catch (error) {
                ccfLogger.error('updateEditorState', `error while performing action on editor - ${error}`);
                // Set default editor state in case of error
                dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState, parsedLexicalString }));
                dispatch(CcfContactEditorAction.updateIsTextAddedInEditor({ caseId, isTextAddedInEditor: isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current }));
            }
        });
    };
    /**
     * Method to check if we should dispatch action for send button & text in editor flag when editor state gets updated every time
     * @param newValueOfIsSendButtonEnabled - boolean
     * @param newValeOfIsTextAddedInEditor - boolean
     * @example shouldUpdateSendButtonOrTextFlag(newValueOfIsSendButtonEnabled, newValeOfIsTextAddedInEditor);
     */
    const shouldUpdateSendButtonOrTextFlag = (newValueOfIsSendButtonEnabled, newValeOfIsTextAddedInEditor) => {
        return isSendButtonCurrentlyEnabled !== newValueOfIsSendButtonEnabled || isTextCurrenlyAddedInEditor !== newValeOfIsTextAddedInEditor;
    };
    /**
     * Method to update editor state locally in case of plain text editor
     * @param editorState - editor state
     * @param editor - editor
     * @example updateLocalEditorState(editorState);
     */
    const updateLocalEditorState = (editorState, editor, isThroughEnter = false) => {
        editor.update(() => {
            var _a, _b, _c, _d, _e;
            plainTextEditorContent.current = (_b = (_a = $getRoot()) === null || _a === void 0 ? void 0 : _a.getTextContent()) === null || _b === void 0 ? void 0 : _b.trim();
            // in case of page refresh/contact switch we need to save this editor state in local savedDigitalContact ref
            if (savedDigitalContact === null || savedDigitalContact === void 0 ? void 0 : savedDigitalContact.current)
                savedDigitalContact.current = Object.assign(Object.assign({}, savedDigitalContact.current), { lexicalEditorState: editorState });
            // By default we have lexical intial format content inserted into editor which is not user entered text. So below condiotion needs to identify
            // if editor has any user inserted text in editor.
            if ((_c = $getRoot()) === null || _c === void 0 ? void 0 : _c.getFirstChild()) {
                const textContent = (_d = $getRoot().getTextContent()) === null || _d === void 0 ? void 0 : _d.trim();
                isTextAddedToEditor.current = textContent && (textContent === null || textContent === void 0 ? void 0 : textContent.length) > 0 ? true : false;
            }
            const newValueOfIsSendButtonEnabled = isEditorHasAttachmentOrText() && !isVoiceRecordingInProgress && ((isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current) || checkMandatoryFields());
            const newValeOfIsTextAddedInEditor = isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current;
            // will dispatch only if there is change in old & new values to avoid un-necessary re-renders
            if (shouldUpdateSendButtonOrTextFlag(newValueOfIsSendButtonEnabled, newValeOfIsTextAddedInEditor)) {
                dispatch(CcfContactEditorAction.updateContactEditorFields({ caseId, isSendButtonEnabled: newValueOfIsSendButtonEnabled, isTextAddedInEditor: newValeOfIsTextAddedInEditor }));
            }
            if (isSyfPerfEnabled && isThroughEnter) { // enhanced enter handling under FT
                handleEnterKey();
            }
            // if the old and new editor content is different then we need to show typing indicator to the patron.
            if (plainTextEditorContent.current !== prevPlainTextEditorContent.current) {
                if (isInitialLoad.current) {
                    // avoid typing indicator on page load if same text is present in editor
                    isInitialLoad.current = false;
                    prevPlainTextEditorContent.current = plainTextEditorContent.current;
                    return;
                }
                if (!isAgentToPatronTypingDisabled) {
                    if (isTextAddedToEditor.current) {
                        // if user has selected the skill as send message then we need to show typing indicator
                        // if user has selected skill other than send message(for Approval) then we need to turn off the typing indicator
                        if (((_e = selectedSkillRef === null || selectedSkillRef === void 0 ? void 0 : selectedSkillRef.current) === null || _e === void 0 ? void 0 : _e.name) === SEND_MESSAGE) {
                            toggleTypingIndicator();
                            // to avoid the typing indicator to be shown again on the same content if we switch between the cases
                            typingIndicatorEnabled.current = true;
                            prevPlainTextEditorContent.current = plainTextEditorContent.current;
                        }
                    }
                    else {
                        // if user remove the entire content from editor then we need to turn off the typing indicator
                        turnOffTypingIndicator();
                        prevPlainTextEditorContent.current = '';
                    }
                }
            }
        });
    };
    const debouncedUpdateEditorState = debounce(updateEditorState, debounceInputIntervalInMs);
    const debouncedUpdateLocalEditorState = isSyfPerfEnabled ? debounce(updateLocalEditorState, debounceInputIntervalInMs) : updateLocalEditorState;
    /**
   * Method to handle enter key action in case of plain text editor
   * @example handleEnterKeyAction();
   */
    const handleEnterKeyAction = () => {
        updateLocalEditorState(editorState, editRef === null || editRef === void 0 ? void 0 : editRef.current, true);
    };
    /**
   * Set scroll bar position at bottom of the container div
   * @example setScrollBottom()
   */
    const setScrollBottom = () => {
        var _a;
        const editorContainerDiv = editorContainerRef.current;
        if (editorContainerDiv && !((_a = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments) === null || _a === void 0 ? void 0 : _a.length)) {
            editorContainerDiv.scrollTop = editorContainerDiv.scrollHeight;
        }
    };
    useEffect(() => {
        return () => clearTimeout(debouncedUpdateEditorState);
    }, [debouncedUpdateEditorState]);
    useEffect(() => {
        if (isClosedContact) {
            dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({
                caseId: caseId,
                interactionId: props.interactionId,
            }));
            if (savedDigitalContact)
                savedDigitalContact.current = undefined;
            if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.EMAIL) {
                dispatch(CcfAssignmentAction.deleteDigitalUserSavedPropertiesOfACase(selectedDigitalContactDetails.caseId));
            }
            uploadLSForEditor(selectedDigitalContactDetails, digitalContactUserSavedProperties);
        }
    }, [isClosedContact]);
    /**
     * Method to handle editor error
     *  @param error - error
     * @example handleEditorError(error);
     */
    const handleEditorError = (error) => {
        ccfLogger.error('handleEditorError', `error while performing action on editor - ${error}`);
    };
    /**
     * Method to handle upload attachment
     * @param fileList - file list
     * @example uploadAttachment(fileList);
     */
    const uploadAttachment = (fileList) => {
        dispatch(updateFileToBeUploaded({ fileList }));
    };
    /**
    * Method to handle discard reply
    * @example onDiscardReply();
    */
    const onDiscardReply = () => {
        const digitalContactToBeSaved = {
            caseId: selectedDigitalContactDetails.caseId,
            fieldsToUpdate: {
                subject: '', sender: '', receiverTo: '', receiverCc: '',
                receiverBcc: '', messageId: '', isEditorOpen: false,
                isRejectedMessageCopied: false,
            },
        };
        batch(() => {
            var _a;
            dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase(digitalContactToBeSaved));
            dispatch(CcfContactEditorAction.setIsContactEditorOpen({ caseId, isEditorOpen: false }));
            dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({
                caseId: caseId,
                interactionId: props.interactionId,
            }));
            dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState: (_a = editRef === null || editRef === void 0 ? void 0 : editRef.current) === null || _a === void 0 ? void 0 : _a.parseEditorState(initialEditorState) }));
            dispatch(CcfContactEditorAction.setContactSelectedSkill({ caseId, selectedSkill: initialSelectedSkill() }));
        });
    };
    /**
     *handleKeyCommand to manage all key commands on editor
     * User can now use keyboard shortcuts for editor toolbar like CRTL+B for bold
     * @example handleKeyCommand(command);
     */
    const handleEnterKey = () => {
        const replyObject = {
            caseId: caseId,
            elevatedInteractionId: props.interactionId,
            elevatedFrom: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.elevatedFrom,
        };
        if (isEditorHasAttachmentOrText()) {
            parsedLexicalString = plainTextEditorContent === null || plainTextEditorContent === void 0 ? void 0 : plainTextEditorContent.current;
            const currentEditor = editRef === null || editRef === void 0 ? void 0 : editRef.current;
            // will clear the editor content asap without waiting for other update cycle to finish with discrete option true
            currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.update(() => {
                const root = $getRoot();
                root.clear(); // Clear the editor's content
                root.append($createParagraphNode()); // Add a new paragraph node for typing
            }, { discrete: true });
            // will be executed only after above editor update is done and maintans the queues of called functions
            queueMicrotask(() => {
                var _a;
                dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState, parsedLexicalString }));
                // disables send button to avoid multiple enter key press
                dispatch(CcfContactEditorAction.updateSendButtonEnabled({ caseId, isSendButtonEnabled: false }));
                dispatch(CcfContactEditorAction.setEditorDiscardDisabled({ caseId, isDiscardDisabled: true }));
                // if "Enter" command is received that means we will reply
                // On Enter button press Border effect gets hidden due to blur, so similar effect on Enter key press
                if (((_a = selectedSkillRef === null || selectedSkillRef === void 0 ? void 0 : selectedSkillRef.current) === null || _a === void 0 ? void 0 : _a.name) !== SEND_MESSAGE) {
                    dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: false }));
                    dispatch(draftContactMessage({ selectedSkill: selectedSkillRef === null || selectedSkillRef === void 0 ? void 0 : selectedSkillRef.current, caseId }));
                }
                else {
                    dispatch(sendMessageReply(replyObject));
                }
            });
        }
    };
    /**
     * setLocalEditorState will add the local state of chat editor to redux store on click of send button click.
     * @example setLocalEditorState();
     */
    const setLocalEditorState = () => {
        if (isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current) {
            parsedLexicalString = plainTextEditorContent.current;
            dispatch(CcfContactEditorAction.setContactEditorState({ caseId, editorState, parsedLexicalString }));
        }
    };
    /**
     * method to get styles for editor container.
     * @example getEditorContainerstyle();
     */
    const getEditorContainerstyle = () => {
        let editorStyle;
        if (wysiwygEnabled) {
            editorStyle = !isOBContact
                ? Object.assign({ bottom: 0 }, styles.editorContainer) : Object.assign({}, styles.editorContainer);
        }
        else {
            editorStyle = {};
        }
        return editorStyle;
    };
    /**
     * Function to handle key press typing indicator
     * @example toggleTypingIndicator()
     */
    const toggleTypingIndicator = () => {
        // If the timer is already set, clear it
        if (typingIndicatorTimerRef.current) {
            clearTimeout(typingIndicatorTimerRef.current);
        }
        //Set typing indicator only if existing timer has removed & new text added inside the editor
        //to avoid unwanted typing indicator on case switch added typingIndicatorEnabled flag
        if (!typingIndicatorTimerRef.current && typingIndicatorEnabled.current) {
            dispatch(typingIndicatorForPatron({ typingActionType: TypingIndicatorActions.TYPING_ON }));
        }
        // Set a new timer to log false after delay
        typingIndicatorTimerRef.current = setTimeout(() => {
            dispatch(typingIndicatorForPatron({ typingActionType: TypingIndicatorActions.TYPING_OFF }));
            typingIndicatorTimerRef.current = null;
        }, TYPING_INDICATOR_DELAY);
        return false;
    };
    return (isEditorEnabled
        ? _jsxs(CcfBox, Object.assign({ style: getEditorContainerstyle() }, { children: [!(customerTypingPreview === null || customerTypingPreview === void 0 ? void 0 : customerTypingPreview.isMessageSentByCustomer)
                    && ((customerTypingPreview === null || customerTypingPreview === void 0 ? void 0 : customerTypingPreview.isMessageTypingStarted)
                        || (customerTypingPreview === null || customerTypingPreview === void 0 ? void 0 : customerTypingPreview.messagePreview))
                    && _jsx(CcfTypingIndicator, { icon: (customerTypingPreview === null || customerTypingPreview === void 0 ? void 0 : customerTypingPreview.isMessageTypingStarted) && _jsx(CcfAnimatedEllipsisControl, {}), message: customerTypingPreview === null || customerTypingPreview === void 0 ? void 0 : customerTypingPreview.messagePreview }), copilotEnabled && isNextBestResponseEnabled && copilotNextBestResponses && _jsx(CcfCopilotNBRSeperator, { nbrCount: (copilotNextBestResponses === null || copilotNextBestResponses === void 0 ? void 0 : copilotNextBestResponses.length) || 0 }), !wysiwygEnabled && !isOBContact && (_jsxs(Box, Object.assign({ sx: styles.customerNameBox }, { children: [_jsx(Box, { children: _jsxs(CcfTypography, Object.assign({ variant: "body1", variantMapping: { 'body1': 'span' }, sx: styles.customerNameBox.customerNameDisplay }, { children: [' ', locale !== 'ja' ? translate('replyingTo') : null, ' ', hasPrivateChannel
                                        ? customerName
                                        : (selectedMessageReplyState === null || selectedMessageReplyState === void 0 ? void 0 : selectedMessageReplyState.authorAgentName) || customerName, ' ', locale === 'ja' ? translate('replyingTo') : null, ' '] })) }), copilotEnabled && copilotNextBestResponses && _jsx(CcfCopilotNBRVisibility, { caseId: caseId, nbrCount: (copilotNextBestResponses === null || copilotNextBestResponses === void 0 ? void 0 : copilotNextBestResponses.length) || 0 }), !isPrivateChannel && _jsx(CcfTooltip, Object.assign({ title: translate('discardReply'), sx: styles.customerNameBox.discardBtnTooltip }, { children: _jsx(Button, Object.assign({ className: 'cancelButton', onClick: () => onDiscardReply(), "data-testid": 'discardReply' }, { children: _jsx(DeleteOutlined, {}) })) }))] }))), copilotEnabled && isNextBestResponseEnabled && copilotNextBestResponses && _jsx(CcfCopilotNBRContainer, { responses: copilotNextBestResponses, caseId: caseId }), _jsxs(CcfErrorBoundary, Object.assign({ componentName: "CcfContactEditor" }, { children: [wysiwygEnabled
                            ? _jsx(CcfEmailEditor, { onError: handleEditorError, debouncedUpdateEditorState: debouncedUpdateEditorState, editorState: editorState, isEditorFocused: isEditorFocused, setScrollBottom: setScrollBottom, editorRef: editRef, savedDigitalContactRef: savedDigitalContact, editorContainerRef: editorContainerRef, updatePlugin: _jsx(UpdateEditorContentPlugin, { caseId: caseId, wysiwygEnabled: wysiwygEnabled, focusEditor: focusEditor }), onUploadAttachment: uploadAttachment, id: props.id, caseId: caseId, interactionId: props.interactionId, closeTab: props.closeTab, onBlur: () => persistDigitalContactDetails(), handleEnterKey: handleEnterKey, allowSendonEnter: allowEmailSendonEnter, copilotEnabled: copilotEnabled }, caseId)
                            : _jsx(CcfPlainTextEditor, { onError: handleEditorError, onFocus: () => dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: true })), onBlur: () => {
                                    dispatch(CcfContactEditorAction.setIsContactEditorFocused({ caseId, isEditorFocused: false }));
                                    persistDigitalContactDetails();
                                    // Turn off the indicator only if it is currently on when the blue event occurs.
                                    turnOffTypingIndicator();
                                }, onEditorStateChange: debouncedUpdateLocalEditorState, editorState: editorState, editorRef: editRef, isEditorFocused: isEditorFocused, toolbarPlugin: _jsx(CcfEditorToolbarPlugin, { showRichToolBarButtons: false, onUploadAttachment: uploadAttachment, showFileUploadButton: hasAbilityToSendFiles, caseId: caseId }), fileUploadPlugin: _jsx(CcfFileUpload, {}), editorContainerRef: editorContainerRef, updatePlugin: _jsx(UpdateEditorContentPlugin, { caseId: caseId, wysiwygEnabled: false, focusEditor: focusEditor }), caseId: caseId, onUploadAttachment: uploadAttachment, handleEnterKey: isSyfPerfEnabled ? handleEnterKeyAction : handleEnterKey, allowSendonEnter: allowOtherSendonEnter, shouldDisplayDragDropZone: hasAbilityToSendFiles }, (_l = selectedDigitalContactDetails.case) === null || _l === void 0 ? void 0 : _l.id), !wysiwygEnabled && (_jsx(CcfContactEditorActions, { id: props.id, caseId: caseId, interactionId: props.interactionId, closeTab: props.closeTab, editorRef: editRef, setLocalEditorState: setLocalEditorState, savedDigitalContactRef: savedDigitalContact }))] }))] })) : null);
}
export default memo(CcfContactEditor);
//# sourceMappingURL=ccf-contact-editor.js.map