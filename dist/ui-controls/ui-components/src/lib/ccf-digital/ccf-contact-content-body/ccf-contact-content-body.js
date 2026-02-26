import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState, useEffect, useRef } from 'react';
import { Box, Modal, useTheme, IconButton, Stack, Link, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DigitalChannelStatus, DigitalContactDirection, DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import { CcfButton, CcfPopOver, CcfTooltip, useTranslator, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { Translate as TranslateIcon, Close as CloseIcon, Circle as CircleIcon } from '@mui/icons-material';
import { CcfContactEmailHeader, getToCcBccFields } from '../ccf-contact-email-header/ccf-contact-email-header';
import CcfDigitalAttachments from '../../ccf-interaction-space/ccf-digital-attachments/ccf-digital-attachments';
import CcfContactMessageContainer from '../ccf-contact-message-container/ccf-contact-message-container';
import { CcfAssignmentAction, updateFileToBeUploaded, getForwardedAttachments, getInteractionFailedMessagesForCase, getDraftMessageNoteForSelectedCase, getNonIncomingActiveContactInSelectedInteraction, getTranslatedMessagesByCaseId, getMessageActionResponse, getDigitalReplyChannelsByCaseId, getIsEmailForward } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLogger } from '@nice-devone/agent-sdk';
import parse, { domToReact } from 'html-react-parser';
import { toast } from 'react-toastify';
import CcfContactPublicPostContainer from '../ccf-contact-public-post-container/ccf-contact-public-post-container';
import CcfContactPublicPostContainerStyle from '../ccf-contact-public-post-container/ccf-contact-public-post-container-styles';
import CcfContactPublicMessageDraft from '../ccf-contact-public-post-container/ccf-contact-public-messagedraft';
import { CcfContactMessageNote } from '../../ccf-interaction-space/ccf-contact-message-note/ccf-contact-message-note';
import { userInfoSelector } from '../../ccf-agent-state/ccf-agent-state.slice';
import CcfPopoverTag from '../../ccf-popover-tag/ccf-popover-tag';
import ContactContentBodyStyles from './styles';
import CcfFailedMessageDeliveryBanner from '../../ccf-failed-message-delivery-banner/ccf-failed-message-delivery-banner';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import { ccfDigitalSearchActions, getSelectedMessage } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { CcfContactEditorAction, initialEditorState, getEmptyEditorState } from '../../ccf-editor/ccf-contact-editor.slice';
import { generateUUIdsForInlineAttachment, modifyMessageContentInlineImgIds } from './ccf-contact-content-body-utills';
import { createForwardedEmailInHtml, getMessageAuthor, updateEmailContentDigitalSource } from '../../../util/common';
import CcfIcon from '../../ccf-icon/ccf-icon';
import { MessageKebabMenu, canDeleteMessageAuthorName, canDeleteMessageContent } from '../../ccf-assignment-panel/ccf-assignment-utils';
import { CcfMessageActionConfirmationDialog } from '../ccf-message-action-confirmation-dialog/ccf-message-action-confirmation-dialog';
import { EMAIL_ACTIONS, iconList } from '../../ccf-icon/ccf-icon-list';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
import { debounce } from '../../../hooks/useDebounce';
/**
 * renders the Email tab container
 * @param props - CcfContactContentBodyProps
 * @example <CcfContactContentBody />
 * @returns
 */
const CcfContactContentBody = (props) => {
    var _a;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { messages, digitalContactDetails, caseId, interactionId, messageDrafts, wysiwygEnabled, sender, hasVisibleTitle, hasVisibleRecipients, isEditorVisible, isPrivateChannel, channelDisplayName, channelType, channelId } = props;
    const theme = useTheme();
    const conversationNote = useSelector(getDraftMessageNoteForSelectedCase(digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.caseId, digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.interactionId));
    const userInfo = useSelector(userInfoSelector);
    const publicPostContainerStyles = CcfContactPublicPostContainerStyle(theme);
    // List of channels for which only preview of attachment will be allowed (due to external CDN link)
    const previewOnlyChannels = ['ig'];
    const styles = ContactContentBodyStyles(theme, props);
    let currentMessageInlineAttachments;
    const selectedMessageId = useSelector(getSelectedMessage);
    const scrollMessageRef = useRef(null);
    const contactContentBodyRef = useRef(null);
    //added below to show preview of inline image
    const [isPreviewImageClicked, setPreviewImageClicked] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const [translationToggle, setTranslationToggle] = useState({});
    const translatedMessagesArray = useSelector(getTranslatedMessagesByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const ccfLogger = new CcfLogger('App.consumer', 'App.CcfContactContentBody');
    const failedInteractionMessages = useSelector(getInteractionFailedMessagesForCase(caseId));
    const emptyEditorState = getEmptyEditorState();
    const messageActionResponse = useSelector(getMessageActionResponse());
    const [ConfirmationPopupOpenId, setConfirmationPopupOpenId] = useState(null);
    const [messageAction, updateMessageAction] = useState({ action: MessageKebabMenu.DELETE_CONTENT, messageId: '' });
    const fromAddressList = useSelector(getDigitalReplyChannelsByCaseId(caseId, interactionId));
    const isEmailForwardSelected = useRef(useSelector(getIsEmailForward(caseId)) || false);
    const userScrolledRef = useRef(false);
    const iframeRefs = useRef({});
    const isEmailRenderV2ToggleEnabled = isFeatureEnabled("release-cx-agent-email-rendering-AW-37207" /* FeatureToggles.EMAIL_RENDERING_FEATURE_TOGGLE */);
    useEffect(() => {
        if (isEmailRenderV2ToggleEnabled) {
            const observer = new ResizeObserver(debounce(() => {
                Object.keys(iframeRefs.current).map((key) => onIframeLoad(key));
            }, 100));
            if (contactContentBodyRef.current) {
                observer.observe(contactContentBodyRef.current);
            }
            return () => {
                observer.disconnect();
            };
        }
        else {
            return;
        }
    }, []);
    /**
   *  * This useEffect will handle the error/success messages to be shown as toast notifications for the performed message actions.
   */
    useEffect(() => {
        const { messageKey, isError, placeholder } = messageActionResponse !== null && messageActionResponse !== void 0 ? messageActionResponse : {};
        if (messageKey) {
            const messageComponent = _jsx(CcfAppToastMessage, { type: isError ? 'error' : 'success', messageKey: messageKey, extraArgs: { format: [placeholder || ''] } });
            const toastOptions = { autoClose: 2000, hideProgressBar: true, closeButton: true, className: 'publicMessageToast', containerId: 'AppToastContainer',
                onClose: () => dispatch(CcfAssignmentAction.clearMessageActionResponse({})) };
            toast[isError ? 'error' : 'success'](messageComponent, toastOptions);
        }
    }, [messageActionResponse]);
    /**
     * Handles the iframe load event and sets its height dynamically based on its content.
     * @param messageId - The ID of the message whose iframe has loaded.
     * @example onIframeLoad(messageId)
     */
    const onIframeLoad = (messageId) => {
        var _a, _b, _c;
        const iframe = iframeRefs.current[messageId];
        if (iframe) {
            const scrollHeight = (_c = (_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.scrollHeight;
            if (scrollHeight !== undefined) {
                iframe.style.height = `${scrollHeight + 52}px`; // add height to avoid vertical scroll
            }
        }
    };
    /**
       * Transform subject for respective action
       * @param message - message: CXoneMessage type
       * @param action - type of action
       * @param isContentRemoved - flag to check if content is removed
       * @example - addSubject(message, 'Reply', true)
       */
    const addSubject = (message, action, isContentRemoved = false) => {
        var _a;
        const titlePrefixRegex = new RegExp(`^(${translate('fwd')}|${translate('re')}):`, 'i');
        const title = ((_a = message === null || message === void 0 ? void 0 : message.title) !== null && _a !== void 0 ? _a : '').replace(titlePrefixRegex, '').trim(); // Extract the title from the message object and remove any "Fwd:" or "Re:" prefixes.
        let subject = isContentRemoved ? '' : title || ''; // will removed the subject if content is removed
        if (action === 'Reply') {
            if (isContentRemoved)
                subject = translate('re') + ': '; // will removed the subject if content is removed
            else if (title && title.toUpperCase().startsWith((`${translate('re')}:`).toUpperCase()))
                subject = translate('re') + ': ' + title.slice(3).trim();
            else
                subject = translate('re') + ': ' + (title || '');
        }
        return subject;
    };
    /**
       * renders the Email tab container
       * @param item - MenuItem
       * @example  onPopOverItemSelection(item)
       * @returns
       */
    const onPopOverItemSelection = (item, message) => () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const replyChannelName = ((_a = message === null || message === void 0 ? void 0 : message.replyChannel) === null || _a === void 0 ? void 0 : _a.name) || channelDisplayName;
        const replyToMessage = {
            authorAgentName: (message === null || message === void 0 ? void 0 : message.authorUser) ? (((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) + ' ' + ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname)) : '',
            idOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.idOnExternalPlatform) || '',
            threadIdOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) || '',
        };
        dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
        const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
        const isAuthorNameRemoved = Boolean((message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null);
        const fromAddress = getValidFromAddressToReply(replyChannelName);
        switch (item.type) {
            case EMAIL_ACTIONS.FORWARD:
                {
                    isEmailForwardSelected.current = true;
                    // Dev Note: - If we delete the content and try to forward the email, the content including attachments will be removed from the email.
                    const uuidForAttachments = generateUUIdsForInlineAttachment(isContentRemoved ? [] : message.attachments);
                    const modifiedMessageContentInlineImgIds = modifyMessageContentInlineImgIds(isContentRemoved ? '' : message.messageContent.text, uuidForAttachments);
                    //method to update img tags in forward email
                    const forwardedHtml = createForwardedEmailInHtml(modifiedMessageContentInlineImgIds, getMessageAuthor(message), message === null || message === void 0 ? void 0 : message.createdAt);
                    if (forwardedHtml) {
                        dispatch(CcfContactEditorAction.updateEditorStateForEmail({
                            caseId,
                            emailEditorContentToInsert: forwardedHtml,
                        }));
                    }
                    dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                        caseId: props.caseId,
                        fieldsToUpdate: {
                            receiverTo: '',
                            receiverCc: '',
                            receiverBcc: '',
                            sender: sender,
                            subject: addSubject(message, 'Forward', isContentRemoved),
                            isResponse: true,
                            lexicalEditorState: initialEditorState,
                            messageId: message === null || message === void 0 ? void 0 : message.idOnExternalPlatform,
                            channelDisplayName: fromAddress,
                            //The 'replyToMessage' field will be necessary when sending a message/mail for approval, updating store with details.
                            //adding messageID as we need messageId for forwarding
                            selectedMessageReplyData: Object.assign(Object.assign({}, replyToMessage), { messageId: (message === null || message === void 0 ? void 0 : message.id) || '' }),
                            // isEmailForward should be true in case of forwarding the mail in order to avoid sending replyToMessage in payload to api
                            isEmailForward: true,
                            isRejectedMessageCopied: false,
                        },
                    }));
                    dispatch(CcfContactEditorAction.setContactFromValue({ caseId: props.caseId, fromAddress: fromAddress }));
                    getAndUploadForwardedAttachments(isContentRemoved ? [] : message.attachments, uuidForAttachments);
                    //Dev Note: - To Fix - CC, BCC fields not update when switching between forward and Reply mode
                    dispatch(CcfContactEditorAction.setEmailCcValue({ caseId: props.caseId, receiverCc: '' }));
                    dispatch(CcfContactEditorAction.setEmailBccValue({ caseId: props.caseId, receiverBcc: '' }));
                }
                break;
            case EMAIL_ACTIONS.REPLY_ALL:
                {
                    isEmailForwardSelected.current = false;
                    const { to, cc, bcc } = getToCcBccFields(message.recipients, sender, true);
                    let toAddr = to;
                    if (message.direction === DigitalContactDirection.INBOUND) {
                        toAddr = (toAddr === '') ? (_d = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _d === void 0 ? void 0 : _d.idOnExternalPlatform : ((_e = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _e === void 0 ? void 0 : _e.idOnExternalPlatform) + ',' + toAddr;
                    }
                    toAddr = toAddr ? toAddr : ((_f = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.idOnExternalPlatform) || '';
                    dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                        caseId: props.caseId,
                        fieldsToUpdate: {
                            receiverTo: isAuthorNameRemoved ? '' : toAddr,
                            receiverCc: cc,
                            receiverBcc: bcc,
                            sender: sender,
                            subject: addSubject(message, 'Reply', isContentRemoved),
                            isResponse: true,
                            lexicalEditorState: emptyEditorState,
                            messageId: message === null || message === void 0 ? void 0 : message.idOnExternalPlatform,
                            channelDisplayName: fromAddress,
                            //The 'replyToMessage' field will be necessary when sending a message/mail for approval, updating store with details.
                            selectedMessageReplyData: replyToMessage,
                            isEmailForward: false,
                            isRejectedMessageCopied: false,
                        },
                    }));
                    dispatch(CcfContactEditorAction.setContactFromValue({ caseId: props.caseId, fromAddress: fromAddress }));
                    //Dev Note: - To Fix - CC, BCC fields not update when switching between forward and Reply mode
                    dispatch(CcfContactEditorAction.setEmailCcValue({ caseId: props.caseId, receiverCc: cc || '' }));
                    dispatch(CcfContactEditorAction.setEmailBccValue({ caseId: props.caseId, receiverBcc: bcc || '' }));
                }
                break;
            case MessageKebabMenu.DELETE_AUTHOR_NAME:
            case MessageKebabMenu.DELETE_CONTENT:
                setConfirmationPopupOpenId(message === null || message === void 0 ? void 0 : message.id);
                updateMessageAction({ action: item.type, messageId: (_g = message === null || message === void 0 ? void 0 : message.id) !== null && _g !== void 0 ? _g : '' });
                break;
            default:
                return;
        }
    };
    /**
     * Get existing attachments and re-upload them
     * @param attachments - received cxone message attachments
     * @example -
     * ```
     * getAndUploadForwardedAttachments(message.attachments);
     * ```
     */
    const getAndUploadForwardedAttachments = (attachments, uuidForInlineImages) => __awaiter(void 0, void 0, void 0, function* () {
        if (attachments && attachments.length > 0) {
            const fileList = new DataTransfer();
            for (const attachment of attachments) {
                yield getForwardedAttachments(attachment).then((file) => {
                    fileList.items.add(file);
                }).catch((error) => {
                    ccfLogger.error('getAndUploadForwardedAttachments', `error while re-uploading the existing attachments - ${JSON.stringify(error)}`);
                });
            }
            //Dev Note: Added check for email forword selected. Since file upload is async activity, for multiple file it takes time. If user switch to Reply All option before uploading activity complete then attachment should not apear in editor.
            if (fileList.files.length > 0 && isEmailForwardSelected.current)
                dispatch(updateFileToBeUploaded({ fileList: fileList.files, uuidList: uuidForInlineImages, isForwardedAttachment: true }));
        }
    });
    /**
       * dropdownOptions - dropdown
       * @example
       * ```
       * dropdownOptions()
       * ```
       */
    const dropdownOptions = {
        menuItems: [
            {
                items: [
                    {
                        label: translate('forward'),
                        icon: iconList[EMAIL_ACTIONS.FORWARD]('', { sx: styles.emailActions }),
                        closeOnSelection: true,
                        type: EMAIL_ACTIONS.FORWARD,
                    },
                    {
                        label: translate('replyAll'),
                        icon: iconList[EMAIL_ACTIONS.REPLY_ALL]('', { sx: styles.emailActions }),
                        closeOnSelection: true,
                        type: EMAIL_ACTIONS.REPLY_ALL,
                        isDividerEnabled: true,
                    },
                    {
                        label: translate('deleteContent'),
                        icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_CONTENT, svgIconStyles: { sx: styles.deleteContent } }),
                        closeOnSelection: true,
                        type: MessageKebabMenu.DELETE_CONTENT,
                    },
                    {
                        label: translate('deleteAuthorName'),
                        icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_AUTHOR_NAME, svgIconStyles: { sx: styles.deleteAuthorName } }),
                        closeOnSelection: true,
                        type: MessageKebabMenu.DELETE_AUTHOR_NAME,
                    }
                ],
            }
        ],
    };
    /**
       * function used to reply
       * @param message - message details
       * @example
       * ```
       * replyHandler(message)
       * ```
       */
    const replyHandler = (message) => {
        var _a, _b, _c, _d;
        //existing attachment should be removed from editor if user click on reply
        dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
        isEmailForwardSelected.current = false;
        const replyChannelName = ((_a = message === null || message === void 0 ? void 0 : message.replyChannel) === null || _a === void 0 ? void 0 : _a.name) || channelDisplayName;
        const replyToMessage = {
            authorAgentName: (message === null || message === void 0 ? void 0 : message.authorUser) ? (((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) + ' ' + ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname)) : '',
            idOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.idOnExternalPlatform) || '',
            threadIdOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) || '',
        };
        const isAuthorNameRemoved = Boolean((message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null);
        const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
        const fromAddress = getValidFromAddressToReply(replyChannelName);
        dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
            caseId: props.caseId,
            fieldsToUpdate: {
                receiverTo: isAuthorNameRemoved ? '' : (_d = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _d === void 0 ? void 0 : _d.idOnExternalPlatform,
                receiverCc: '',
                receiverBcc: '',
                sender: sender,
                subject: addSubject(message, 'Reply', isContentRemoved),
                isResponse: true,
                lexicalEditorState: emptyEditorState,
                messageId: message === null || message === void 0 ? void 0 : message.idOnExternalPlatform,
                channelDisplayName: fromAddress,
                //The 'replyToMessage' field will be necessary when sending a message/mail for approval, updating store with details.
                selectedMessageReplyData: replyToMessage,
                isEmailForward: false,
                isRejectedMessageCopied: false,
            },
        }));
        dispatch(CcfContactEditorAction.setContactFromValue({ caseId: props.caseId, fromAddress: fromAddress }));
        //Dev Note: - To Fix - CC, BCC fields not update when switching between forward and Reply mode
        dispatch(CcfContactEditorAction.setEmailCcValue({ caseId: props.caseId, receiverCc: '' }));
        dispatch(CcfContactEditorAction.setEmailBccValue({ caseId: props.caseId, receiverBcc: '' }));
    };
    /**
       * Method used to filter the menu items based on the flags
       * @param menu - menu item
       * @param canDeleteAuthorName - flag to delete author name
       * @param canDeleteContent - flag to delete content
       * @example
       * ```
       * filterMenuItems(MessageKebabMenu.DELETE_AUTHOR_NAME, true, false)
       * ```
       */
    const filterMenuItems = (menu, canDeleteAuthorName, canDeleteContent) => {
        switch (menu.type) {
            case MessageKebabMenu.DELETE_AUTHOR_NAME:
                return canDeleteAuthorName;
            case MessageKebabMenu.DELETE_CONTENT:
                return canDeleteContent;
            default:
                // will include the remaining items in the menuOption list
                return true;
        }
    };
    /**
       * Method used to get the valid from address
       * @param from - current from address
       * @example
       * ```
       * getValidFromAddressToReply('test@abcm.com')
       * ```
       */
    const getValidFromAddressToReply = (from) => {
        var _a;
        //Dev Note: will check the senders from address in from address list and update the from address if that address is not available in the list,
        // from address list contains the address list those are available for reply
        if ((fromAddressList === null || fromAddressList === void 0 ? void 0 : fromAddressList.length) > 0) {
            const address = fromAddressList.find((address) => (address === null || address === void 0 ? void 0 : address.name) === from);
            return address ? from : ((_a = fromAddressList[0]) === null || _a === void 0 ? void 0 : _a.name) || '';
        }
        return '';
    };
    let filteredMessages = [];
    if (messages && messages.length > 0) {
        filteredMessages = isPrivateChannel ? messages : messages.filter(message => !message.isRelatedMessage);
    }
    const mostRecentMessageId = filteredMessages && ((_a = filteredMessages[filteredMessages.length - 1]) === null || _a === void 0 ? void 0 : _a.id);
    const scrollContainer = contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current;
    /**
   * Method used to handle manual scroll
   * @example  handleScroll()
   */
    const handleScroll = () => {
        if (!scrollContainer)
            return;
        if (!(userScrolledRef === null || userScrolledRef === void 0 ? void 0 : userScrolledRef.current)) {
            userScrolledRef.current = true;
        }
    };
    useEffect(() => {
        // check if user has scrolled and allow scrolling, block auto scrolling
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { once: true });
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [selectedMessageId]);
    useEffect(() => {
        var _a, _b, _c, _d;
        if (wysiwygEnabled) {
            if (selectedMessageId !== mostRecentMessageId) {
                dispatch(ccfDigitalSearchActions.updateSelectedMessageId(mostRecentMessageId));
            }
            if (selectedMessageId && !(failedInteractionMessages && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.length) > 0)) {
                if ((scrollMessageRef === null || scrollMessageRef === void 0 ? void 0 : scrollMessageRef.current) && (contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current)) {
                    if (userScrolledRef === null || userScrolledRef === void 0 ? void 0 : userScrolledRef.current) {
                        userScrolledRef.current = false;
                        return;
                    }
                    // Scroll to the position of the latest email message
                    contactContentBodyRef.current.scrollTop = ((_a = scrollMessageRef.current) === null || _a === void 0 ? void 0 : _a.offsetTop) - ((_b = contactContentBodyRef === null || contactContentBodyRef === void 0 ? void 0 : contactContentBodyRef.current) === null || _b === void 0 ? void 0 : _b.offsetTop);
                }
            }
            else {
                (_c = contactContentBodyRef.current) === null || _c === void 0 ? void 0 : _c.scrollTo(0, (_d = contactContentBodyRef.current) === null || _d === void 0 ? void 0 : _d.scrollHeight);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, selectedMessageId]);
    let renderCcfContactContentBody;
    const parseHtmlOptions = {
        replace: (domNode) => {
            var _a, _b, _c;
            try {
                if ((domNode === null || domNode === void 0 ? void 0 : domNode.type) === 'tag') {
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'img') {
                        const { alt, src } = domNode.attribs;
                        const attachmentId = (domNode.attribs['data-attachment-id']);
                        const currentImagePreviewUrl = (attachmentId) ? (_a = currentMessageInlineAttachments === null || currentMessageInlineAttachments === void 0 ? void 0 : currentMessageInlineAttachments.find((attachment) => attachment.id === attachmentId)) === null || _a === void 0 ? void 0 : _a.previewUrl : src !== null && src !== void 0 ? src : '';
                        const currentImageActualUrl = (attachmentId) ? (_b = currentMessageInlineAttachments === null || currentMessageInlineAttachments === void 0 ? void 0 : currentMessageInlineAttachments.find((attachment) => attachment.id === attachmentId)) === null || _b === void 0 ? void 0 : _b.url : src !== null && src !== void 0 ? src : '';
                        return _jsx(Box, Object.assign({ onClick: () => { setPreviewImageClicked(true); setImageUrl(currentImageActualUrl); } }, { children: _jsx("img", { src: currentImagePreviewUrl, alt: alt, style: styles.inlineBodyAttachment, "data-attachmentId": attachmentId }) }));
                    }
                    // large outlook email get renders in table format which need below style to display properly
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'table') {
                        domNode.attribs.style = domNode.attribs.style + 'display: table; width:100%; tableLayout: auto; border-collapse: collapse';
                    }
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'td') {
                        domNode.attribs.style = domNode.attribs.style + 'word-break: auto-phrase;';
                    }
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'a' && ((_c = domNode === null || domNode === void 0 ? void 0 : domNode.attribs) === null || _c === void 0 ? void 0 : _c.href)) {
                        const href = domNode.attribs.href.split('external-link?q=').length
                            && decodeURIComponent(domNode.attribs.href.split('external-link?q=')[1]);
                        return (_jsx(CcfTooltip, Object.assign({ title: href }, { children: _jsx("a", Object.assign({ target: '_blank', href: href, rel: "noreferrer" }, { children: domToReact(domNode === null || domNode === void 0 ? void 0 : domNode.children, parseHtmlOptions) })) })));
                    }
                }
                return domNode;
            }
            catch (error) {
                ccfLogger.error('parseHtmlOptions', `error while parsing html options - ${JSON.stringify(error)}`);
            }
        },
    };
    // Scroll upto the selected message
    useEffect(() => {
        if (!wysiwygEnabled && selectedMessageId && messages) {
            // Find the message object from the messages array using the message ID
            const message = messages.find(message => message.id === selectedMessageId);
            if (message && scrollMessageRef.current) {
                // If the message is found and the scroll reference is available, scroll to the message
                scrollMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            dispatch(ccfDigitalSearchActions.updateSelectedMessageId(''));
        }
    }, [selectedMessageId, scrollMessageRef.current]);
    /**
     * Handle the toggle of the translated message
     * @param props - none
     * @example handleTranslationToggle()
     */
    const handleTranslationToggle = (index, isInboundDirection, isTranslateCustomerMessages, translatedMessageText, messageContent) => {
        setTranslationToggle(Object.assign(Object.assign({}, translationToggle), { [index]: !translationToggle[index] }));
        if (translationToggle[index] && isInboundDirection && isTranslateCustomerMessages) {
            return translatedMessageText;
        }
        else {
            return messageContent;
        }
    };
    /**
     * Display translated message
     * @param props - none
     * @example renderTranslatedMessage()
     */
    const renderTranslatedMessage = (isRichText, message) => {
        var _a, _b;
        let content;
        const fallbackText = ((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.fallbackText) || '';
        const originalMessage = (_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.text;
        if (isEmailRenderV2ToggleEnabled) {
            content = renderEmailIframe(message, isRichText ? fallbackText : originalMessage, message.title + ' - ' + translate('translatedMessage'));
        }
        else if (isRichText) {
            content = _jsx("span", { children: fallbackText });
        }
        else {
            content = _jsx("span", { children: parse(originalMessage, parseHtmlOptions) });
        }
        return (_jsxs(Stack, Object.assign({ sx: styles.translatedMessage }, { children: [_jsx(Divider, { orientation: "vertical", sx: styles.divider }), _jsx(Box, Object.assign({ sx: { paddingLeft: '.5em', width: '100%' } }, { children: content }))] })));
    };
    /**
     * Display translation toggle row
     * @param toggleTranslateLinkText -
     * @param isInboundDirection -
     * @param translatedMessageText -
     * @param messageContentText -
     * @example renderTranslationToggleRow(toggleTranslateLinkText, isInboundDirection, translatedMessageText, messageContentText)
     */
    const renderTranslationToggleRow = (index, toggleTranslateLinkText, isInboundDirection, customerLanguage, translatedMessageText, messageContentText) => {
        return (_jsxs(Stack, Object.assign({ alignItems: 'center', direction: 'row' }, { children: [_jsx(TranslateIcon, { sx: styles.translateIcon }), _jsx(Link, Object.assign({ sx: { cursor: 'pointer' }, underline: 'hover', onClick: () => handleTranslationToggle(index, isInboundDirection, props.isTranslateCustomerMessages, translatedMessageText, messageContentText) }, { children: toggleTranslateLinkText })), _jsx(CircleIcon, { sx: styles.circleIcon }), _jsx("span", { children: customerLanguage })] })));
    };
    /**
       * Render iframe for message content
       * @example renderEmailIframe(message, 'email source')
       * @returns iframe element with message content
       */
    const renderEmailIframe = (message, src, title) => {
        return (_jsx(Box, { children: _jsx("iframe", { id: "contentFrame", className: "email-frame", onLoad: () => onIframeLoad(message.id), ref: (el) => (iframeRefs.current[message.id] = el), style: styles.emailIframe, srcDoc: src, title: title }) }));
    };
    /**
     * Render main message content
     * @example renderMainMessageContent(message, index, isInboundDirection)
     * @returns message content
     */
    const renderMainMessageContent = (message, translatedMessage, messageDirection) => {
        var _a, _b;
        if (isEmailRenderV2ToggleEnabled && wysiwygEnabled) {
            if ((messageDirection === DigitalContactDirection.INBOUND && props.isTranslateCustomerMessages) ||
                (messageDirection === DigitalContactDirection.OUTBOUND && props.isTranslateAgentMessages)) {
                return renderEmailIframe(message, translatedMessage, message.title);
            }
            else {
                return renderEmailIframe(message, (_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.text, message.title);
            }
        }
        else {
            if ((messageDirection === DigitalContactDirection.INBOUND && props.isTranslateCustomerMessages) || (messageDirection === DigitalContactDirection.OUTBOUND && props.isTranslateAgentMessages)) {
                return (_jsx("span", { children: parse(translatedMessage, parseHtmlOptions) }));
            }
            else {
                return (_jsx("span", { children: parse((_b = message.messageContent) === null || _b === void 0 ? void 0 : _b.text, parseHtmlOptions) }));
            }
        }
    };
    if (wysiwygEnabled) {
        renderCcfContactContentBody = _jsxs(Box, Object.assign({ component: 'div', sx: styles.contactContentEmailContainer, ref: contactContentBodyRef, "data-testid": "contact-content-body" }, { children: [(messages || []).map((message, index) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    const messageRichContentTypes = [DigitalMessageContentTypes.RICH_LINK, DigitalMessageContentTypes.QUICK_REPLIES, DigitalMessageContentTypes.LIST_PICKER];
                    const isRichText = messageRichContentTypes.includes((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.type);
                    const isInboundDirection = (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND;
                    const isOutboundDirection = (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.OUTBOUND;
                    const originalMessageText = (_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.text;
                    const seeTranslationLinkText = isInboundDirection ? translate('seeOriginal') : translate('seeTranslation');
                    const hideTranslationLinkText = isInboundDirection ? translate('hideOriginal') : translate('hideTranslation');
                    const toggleTranslateLinkText = translationToggle[index] ? hideTranslationLinkText : seeTranslationLinkText;
                    const translatedMessageText = ((_c = translatedMessagesArray.find((msg) => msg.id === message.id)) === null || _c === void 0 ? void 0 : _c.translatedMessage) || '';
                    // In case of inline body attachments we need current message attachments to map previewUrl with url in html parsing
                    currentMessageInlineAttachments = message === null || message === void 0 ? void 0 : message.attachments;
                    if (isEmailRenderV2ToggleEnabled) {
                        const updatedDoc = updateEmailContentDigitalSource((_d = message.messageContent) === null || _d === void 0 ? void 0 : _d.text, currentMessageInlineAttachments);
                        message.messageContent.text = updatedDoc.documentElement.innerHTML;
                    }
                    const isAuthorNameRemoved = Boolean((message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null);
                    const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
                    const canDeleteAuthorName = canDeleteMessageAuthorName(isAuthorNameRemoved, message === null || message === void 0 ? void 0 : message.direction);
                    const canDeleteContent = canDeleteMessageContent(isContentRemoved);
                    const channelDisplayName = (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.OUTBOUND
                        ? ((_e = message === null || message === void 0 ? void 0 : message.replyChannel) === null || _e === void 0 ? void 0 : _e.name) || props.channelDisplayName
                        : (_f = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.idOnExternalPlatform;
                    //filtering the menu options based on canDeleteAuthorName and canDeleteContent flags
                    const updatedDropdownOptions = Object.assign(Object.assign({}, dropdownOptions), { menuItems: dropdownOptions.menuItems.map((menuItem, menuIndex) => {
                            var _a;
                            if (menuIndex === 0) {
                                return Object.assign(Object.assign({}, menuItem), { items: (_a = menuItem.items) === null || _a === void 0 ? void 0 : _a.filter((menu) => filterMenuItems(menu, canDeleteAuthorName, canDeleteContent)) });
                            }
                            return menuItem;
                        }) });
                    // To have horizontal scrollbar with large table we need diffent style compare to normal table
                    return (_jsxs(Box, Object.assign({ component: 'div', ref: selectedMessageId === message.id ? scrollMessageRef : null, sx: message.direction === DigitalContactDirection.OUTBOUND ? styles.outboundContentContainer : styles.inboundContentContainer, "data-testid": "message-scroll-anchor" }, { children: [ConfirmationPopupOpenId === (message === null || message === void 0 ? void 0 : message.id) && _jsx(CcfMessageActionConfirmationDialog, { isOpen: ConfirmationPopupOpenId === (message === null || message === void 0 ? void 0 : message.id), messageId: messageAction.messageId, caseId: caseId, interactionId: interactionId !== null && interactionId !== void 0 ? interactionId : '', action: messageAction.action, onCancelClick: () => setConfirmationPopupOpenId(null) }), _jsxs(Box, Object.assign({ component: 'div', sx: message.direction === DigitalContactDirection.OUTBOUND ? styles.alignAgentHeader : styles.alignCustomerHeader }, { children: [message.direction === DigitalContactDirection.OUTBOUND ? _jsxs(Box, Object.assign({ component: 'div', sx: styles.agentHeader }, { children: [(_g = message === null || message === void 0 ? void 0 : message.authorUser) === null || _g === void 0 ? void 0 : _g.firstName, " ", (_h = message === null || message === void 0 ? void 0 : message.authorUser) === null || _h === void 0 ? void 0 : _h.surname] }))
                                        : _jsx(Box, Object.assign({ component: 'div', sx: Object.assign(Object.assign({}, styles.customerHeader), { fontStyle: isAuthorNameRemoved ? 'italic' : 'normal' }) }, { children: isAuthorNameRemoved ? translate('anonymous') : (_j = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _j === void 0 ? void 0 : _j.fullName })), _jsx(CcfPopoverTag, { author: message.direction === DigitalContactDirection.OUTBOUND ? `${(_k = message === null || message === void 0 ? void 0 : message.authorUser) === null || _k === void 0 ? void 0 : _k.firstName} ${(_l = message === null || message === void 0 ? void 0 : message.authorUser) === null || _l === void 0 ? void 0 : _l.surname}` : (isAuthorNameRemoved && translate('anonymous') || ((_m = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _m === void 0 ? void 0 : _m.fullName)), isPrivateChannel: isPrivateChannel, id: 'messageTag', message: message })] })), _jsxs(Box, Object.assign({ component: 'div', sx: message.direction === DigitalContactDirection.OUTBOUND ? styles.containerOutboundLayout : styles.containerLayout }, { children: [_jsx(CcfContactEmailHeader, { hasVisibleTitle: !!hasVisibleTitle, sender: message.direction === DigitalContactDirection.OUTBOUND
                                            ? sender
                                            : (_o = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _o === void 0 ? void 0 : _o.idOnExternalPlatform, recipients: hasVisibleRecipients ? message === null || message === void 0 ? void 0 : message.recipients : [], subject: (!isContentRemoved && message.title) ? message.title : '', time: message === null || message === void 0 ? void 0 : message.createdAt, channelDisplayName: isAuthorNameRemoved ? '' : channelDisplayName, isExpanded: false }), _jsx(Box, Object.assign({ component: 'div', sx: styles.contentKebab }, { children: _jsx(CcfPopOver, { disableTooltip: true, onPopOverItemSelection: (item) => onPopOverItemSelection(item, message), optionList: updatedDropdownOptions, popOverMenuItemExtraStyles: styles.popOverMenuItemStyles, tooltipTitle: 'moreActionsOnThisMessage' }) })), _jsxs(Box, Object.assign({ component: 'div', sx: Object.assign(Object.assign({}, styles.contentBody2), (isContentRemoved && { clear: 'both' })) }, { children: [isContentRemoved ? _jsx("span", Object.assign({ style: { fontStyle: 'italic', color: theme.palette.text.header } }, { children: translate('contentDeleted') })) : renderMainMessageContent(message, translatedMessageText, message.direction), ((message.direction === DigitalContactDirection.INBOUND && props.isTranslateCustomerMessages) ||
                                                (message.direction === DigitalContactDirection.OUTBOUND && props.isTranslateAgentMessages)) &&
                                                translationToggle[index] &&
                                                renderTranslatedMessage(isRichText, message), !isContentRemoved && _jsx(CcfDigitalAttachments, { attachments: message === null || message === void 0 ? void 0 : message.attachments, hideDownload: channelType &&
                                                    previewOnlyChannels &&
                                                    previewOnlyChannels.indexOf(channelType) > -1 &&
                                                    (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND
                                                    ? true
                                                    : false, channelType: channelType, messageSubject: message.title, caseId: caseId, isInboundDirection: isInboundDirection }), (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND && _jsxs(Box, Object.assign({ component: 'div', sx: styles.footerContainer }, { children: [_jsx(Box, { component: 'div', sx: styles.footerLeft }), _jsxs(Stack, Object.assign({ direction: 'row', justifyContent: 'space-between', sx: { width: props.isTranslateCustomerMessages || props.isTranslateAgentMessages ? '100%' : null } }, { children: [isInboundDirection && props.isTranslateCustomerMessages && renderTranslationToggleRow(index, toggleTranslateLinkText, isInboundDirection, props.customerLanguage, translatedMessageText, message.messageContent.text), _jsx(Box, Object.assign({ component: 'div', sx: styles.footerRight }, { children: _jsxs(CcfButton, Object.assign({ sx: Object.assign({}, styles.textSecondary), variant: "contained", size: 'small', onClick: () => replyHandler(message), "data-testid": 'agent-reply-' + index, disabled: digitalContactDetails.status === DigitalChannelStatus.CLOSED }, { children: [iconList[EMAIL_ACTIONS.REPLY]('', { sx: styles.replyIcon }), " ", translate('reply')] })) }))] }))] })), isOutboundDirection && props.isTranslateAgentMessages && renderTranslationToggleRow(index, toggleTranslateLinkText, isInboundDirection, props.customerLanguage, translatedMessageText, message.messageContent.text)] })), _jsx(Modal, Object.assign({ open: isPreviewImageClicked, onClose: () => { setPreviewImageClicked(false); }, "aria-labelledby": "modal-insert-table", "aria-describedby": "modal-table-data" }, { children: _jsx(Box, { children: _jsxs(Box, { children: [_jsx(Box, Object.assign({ sx: styles.closeButtonColumn }, { children: _jsx(IconButton, Object.assign({ "aria-label": "close", onClick: () => { setPreviewImageClicked(false); } }, { children: _jsx(CloseIcon, { fontSize: "small" }) })) })), _jsx(Box, Object.assign({ sx: styles.imgcontainer }, { children: _jsx("img", { src: imageUrl, style: styles.inlineBodyAttachmentI, alt: '' }) }))] }) }) }))] })), (_p = message === null || message === void 0 ? void 0 : message.messageNotes) === null || _p === void 0 ? void 0 : _p.map(msgNote => _jsx(Box, Object.assign({ component: 'div', sx: message.direction === DigitalContactDirection.OUTBOUND ? Object.assign({}, styles.outboundMessageNotes) : {} }, { children: _jsx(CcfContactMessageNote, { messageId: msgNote.message.id, userDetails: msgNote.user, isReadOnly: true, noteContent: msgNote.content, direction: message.direction, noteId: msgNote.id, updatedAt: msgNote.updatedAt }) }), msgNote.id))] }), message.id));
                }), (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.status) && (conversationNote === null || conversationNote === void 0 ? void 0 : conversationNote.noteId) === '' &&
                    _jsx(CcfContactMessageNote, { messageId: mostRecentMessageId, isReadOnly: false, userDetails: userInfo, noteContent: conversationNote.content || '' }), messageDrafts === null || messageDrafts === void 0 ? void 0 : messageDrafts.map((messageDraft) => (_jsx(CcfContactPublicMessageDraft, { messageDraft: messageDraft, sender: `${sender}`, styles: publicPostContainerStyles, channelType: channelType, direction: '', previewOnlyChannels: previewOnlyChannels }, messageDraft.id))), failedInteractionMessages && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.length) > 0 && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.map((message) => {
                    return _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfFailedMessageDeliveryBanner' }, { children: _jsx(CcfFailedMessageDeliveryBanner, { caseId: caseId, failedMessage: message, messageAuthor: message.messageAuthor, channelDisplayName: props.channelDisplayName, wysiwygEnabled: message === null || message === void 0 ? void 0 : message.wysiwygEnabled }) }), message.xTraceId);
                }))] }));
    }
    else {
        renderCcfContactContentBody = isPrivateChannel
            ? _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfContactMessageContainer' }, { children: _jsx(CcfContactMessageContainer, { isEditorVisible: isEditorVisible, messages: messages, contactDetails: digitalContactDetails, channelType: channelType, messageDrafts: messageDrafts, previewOnlyChannels: previewOnlyChannels, channelName: channelDisplayName, channelId: channelId, lastInboundMessage: mostRecentMessageId }) }))
            : _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfContactPublicPostContainer' }, { children: _jsx(CcfContactPublicPostContainer, { sender: sender, contactDetails: digitalContactDetails, messageDrafts: messageDrafts, lastInboundMessage: mostRecentMessageId }) }));
    }
    return renderCcfContactContentBody;
};
export default memo(CcfContactContentBody);
//# sourceMappingURL=ccf-contact-content-body.js.map