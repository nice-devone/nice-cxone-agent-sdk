import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Linkify from 'react-linkify';
import { DigitalChannelType, DigitalContactDirection, DigitalMessageContentTypes, MessageSendStatusType, MultimediaTypes, } from '@nice-devone/common-sdk';
import CcfContactMessageAuthor from './ccf-contact-message-author';
import CcfContactMessageTimeStamp from './ccf-contact-message-timestamp';
import CcfContactMessageContainerStyles from './ccf-contact-message-container-styles';
import { Box, useTheme, Stack } from '@mui/material';
import CcfDigitalAttachments from '../../ccf-interaction-space/ccf-digital-attachments/ccf-digital-attachments';
import { AttachmentPreviewVariant } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-preview-variant';
import { CcfAttachmentJustify } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-justify';
import parse from 'html-react-parser';
import { CcfApprovalBanner } from '../ccf-approval-banner/ccf-approval-banner';
import { ApprovalBannerStatus } from '../../ccf-editor/ccf-editor-utils';
import { CcfContactMessageNote } from '../../ccf-interaction-space/ccf-contact-message-note/ccf-contact-message-note';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { CcfLoader, useTranslator } from '@nice-devone/ui-controls';
import CcfRichContactMessage from './ccf-contact-rich-message';
import { CcfAssignmentAction, getNonIncomingActiveContactInSelectedInteraction, getRepliedMessage, getTranslatedMessagesByCaseId } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getIfCanReplyToSpecificMessage } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import CcfContactMessageActions from './ccf-contact-message-actions';
import CcfReplyToMessage from '../ccf-reply-to-message-container/ccf-reply-to-message';
import { iconList } from '../../ccf-icon/ccf-icon-list';
import { MessageKebabMenu, canDeleteMessageAuthorName, canDeleteMessageContent } from '../../ccf-assignment-panel/ccf-assignment-utils';
import { CcfMessageActionConfirmationDialog } from '../ccf-message-action-confirmation-dialog/ccf-message-action-confirmation-dialog';
import { CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { debounce } from '../../../hooks/useDebounce';
import CcfTranslationToggle from './ccf-translation-toggle';
import CcfContactMultimediaMessage from './ccf-contact-multimedia-message';
import { unSupportedTextChecker } from '../../../util/unSupportedTextChecker';
import { linkDecorator } from '../../../util/commonWrapperComponent';
/**
 * renders the single chat message
 * @param props - CcfContactMessageProps
 * @example <CcfMessage />
 * @returns
 */
const CcfContactMessage = ({ message, channelType, direction, fullName, firstName, surName, attachments, isMessageDraft, previewOnlyChannels, isPreviousCaseMessage, isTranslateCustomerMessages, isTranslateAgentMessages, customerLanguage, channelId, isAuthorNameRemoved, isTrackingMessageDeliveryStatus, isContentRemoved, isNextCaseMessage, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isInboundDirection = direction === DigitalContactDirection.INBOUND;
    const isOutboundDirection = direction === DigitalContactDirection.OUTBOUND;
    const canReplyToSpecificMessage = useSelector(getIfCanReplyToSpecificMessage(channelId || '')) || false;
    const styles = CcfContactMessageContainerStyles(theme, isPreviousCaseMessage, isInboundDirection, isContentRemoved, isNextCaseMessage);
    const inboundOutboundMessageStyle = isInboundDirection
        ? styles.inboundMessage
        : styles.outboundMessage;
    const inboundMessageContainerStyle = isInboundDirection
        ? styles.inboundMessageContainer
        : undefined;
    const outboundMessageDraftContainerStyle = isMessageDraft
        ? styles.outboundMessageDraftContainer
        : undefined;
    const outboundMessageDraftStyle = isMessageDraft
        ? Object.assign(Object.assign({}, styles.messageDraft), styles.outboundMessageDraft) : styles.message;
    // For inbound messages fullName is from message.authorEndUserIdentity
    // For outbound messages We get firstname & surname from authorUser object
    const authorName = isInboundDirection ? fullName : firstName + ' ' + surName;
    // On channel like Instagram, Customer sent attachments are not coming with BE API URL as response
    // Hence channel specific validation added below to preview file with CDN link
    const hideDownload = (channelType &&
        previewOnlyChannels &&
        previewOnlyChannels.indexOf(channelType) > -1 &&
        isInboundDirection) ||
        isPreviousCaseMessage || isNextCaseMessage
        ? true
        : false;
    //In case of whatsApp template we get the message text from the message template payload elements.
    const messageContentElements = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.elements) !== null && _c !== void 0 ? _c : [];
    //To show the message is delayed
    const isDelayedMessage = (message === null || message === void 0 ? void 0 : message.sentStatus) === MessageSendStatusType.DELAYED;
    const messageRichContentTypes = [
        DigitalMessageContentTypes.RICH_LINK,
        DigitalMessageContentTypes.QUICK_REPLIES,
        DigitalMessageContentTypes.LIST_PICKER,
        DigitalMessageContentTypes.PLUGIN,
        DigitalMessageContentTypes.TIME_PICKER,
        DigitalMessageContentTypes.FORM,
        DigitalMessageContentTypes.ADAPTIVE_CARD
    ];
    const isFormTypeRichMessage = ((_d = message === null || message === void 0 ? void 0 : message.messageContent) === null || _d === void 0 ? void 0 : _d.type) === DigitalMessageContentTypes.FORM;
    // Dev Note: Filtering WhatsApp multimedia messages here, based on the element type as MENU and TEXT_TEMPLATE
    const isMultimediaTemplateMessage = messageRichContentTypes.includes((_e = message === null || message === void 0 ? void 0 : message.messageContent) === null || _e === void 0 ? void 0 : _e.type) &&
        ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.channelName) === DigitalChannelType.WHATSAPP &&
            ((_f = message === null || message === void 0 ? void 0 : message.messageContent) === null || _f === void 0 ? void 0 : _f.type) === DigitalMessageContentTypes.PLUGIN &&
            [DigitalMessageContentTypes.MENU, DigitalMessageContentTypes.TEXT_TEMPLATE].includes((_g = messageContentElements[0]) === null || _g === void 0 ? void 0 : _g.type));
    // Dev Note: Filtering rich messages here, based on the rich content types and not multimedia templates
    const isRichText = messageRichContentTypes.includes((_h = message === null || message === void 0 ? void 0 : message.messageContent) === null || _h === void 0 ? void 0 : _h.type) && !isMultimediaTemplateMessage;
    const isUnsupportedText = !isRichText && unSupportedTextChecker((_j = message === null || message === void 0 ? void 0 : message.messageContent) === null || _j === void 0 ? void 0 : _j.text);
    const { mimeType, url, filename } = ((_l = (_k = messageContentElements === null || messageContentElements === void 0 ? void 0 : messageContentElements[0]) === null || _k === void 0 ? void 0 : _k.elements) === null || _l === void 0 ? void 0 : _l[0]) || {};
    const [translationToggle, setTranslationToggle] = useState(false);
    const translatedMessagesArray = useSelector(getTranslatedMessagesByCaseId(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId));
    const repliedMessage = useSelector(getRepliedMessage(activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId, (_m = message === null || message === void 0 ? void 0 : message.replyToMessage) === null || _m === void 0 ? void 0 : _m.idOnExternalPlatform));
    const translatedMessageText = (_o = translatedMessagesArray.find((msg) => msg.id === message.id)) === null || _o === void 0 ? void 0 : _o.translatedMessage;
    const originalMessageText = message.messageContent.text;
    const seeTranslationLinkText = isInboundDirection
        ? translate('seeOriginal')
        : translate('seeTranslation');
    const hideTranslationLinkText = isInboundDirection
        ? translate('hideOriginal')
        : translate('hideTranslation');
    const toggleTranslateLinkText = translationToggle
        ? hideTranslationLinkText
        : seeTranslationLinkText;
    const isShowTranslationToggleRow = ((isInboundDirection && isTranslateCustomerMessages) ||
        (isOutboundDirection && isTranslateAgentMessages)) &&
        !isRichText;
    const canDeleteAuthorName = canDeleteMessageAuthorName(isAuthorNameRemoved, direction);
    const canDeleteContent = canDeleteMessageContent(isContentRemoved);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [messageAction, updateMessageAction] = useState(MessageKebabMenu.DELETE_CONTENT);
    const canAttachmentHasMsgActions = Boolean(!isMessageDraft && !((_p = message === null || message === void 0 ? void 0 : message.messageContent) === null || _p === void 0 ? void 0 : _p.text) && !isRichText && (attachments === null || attachments === void 0 ? void 0 : attachments.length)); // message should not be draft, should not have text content, should not be rich message and should have attachments
    const attachmentContainerRef = useRef(null);
    const [attachmentContainerWidth, setAttachmentContainerWidth] = useState(null);
    useEffect(() => {
        /**
         * Handle the resize of the attachment container
         * @param entries - entries
         * @example handleResize(entries);
         */
        const handleResize = (entries) => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                setAttachmentContainerWidth((Math.floor(newWidth / 82) * 82)); //To remove the extra white space, dynamically set the width of the attachment container
            }
        };
        const resizeObserver = new ResizeObserver(debounce(handleResize, 100));
        if (attachmentContainerRef.current)
            resizeObserver.observe(attachmentContainerRef.current);
        return () => {
            if (attachmentContainerRef.current) {
                resizeObserver.unobserve(attachmentContainerRef.current);
            }
        };
    }, [attachmentContainerWidth]);
    /**
     * Handle the toggle of the translated message
     * @param props - none
     * @example handleToggle()
     */
    const handleTranslationToggle = () => {
        setTranslationToggle(!translationToggle);
        if (translationToggle && isInboundDirection && isTranslateCustomerMessages) {
            return translatedMessageText;
        }
        else {
            return message.messageContent.text;
        }
    };
    /**
   * Function to handle the opening and closing of the dialog box.
   *  @param state - state of the dialog box
   *  @param actionType - action type
   * @example -
   * ```
   * toggleConfirmationDialogBox(true, MessageKebabMenu.DELETE_CONTENT)
   * ```
   */
    const toggleConfirmationDialogBox = (state, actionType) => {
        setIsConfirmationPopupOpen(state);
        if (actionType)
            updateMessageAction(actionType);
    };
    /**
     * Display see/hide message translation link
     * @param props - none
     * @example renderSeeHideTranslationLink()
     */
    const renderTranslationToggleRow = () => {
        var _a, _b, _c, _d;
        return (_jsx(CcfTranslationToggle, { handleTranslationToggle: () => {
                setTranslationToggle(!translationToggle);
            }, fallbackText: (_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.fallbackText, isFormTypeRichMessage: ((_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.type) === DigitalMessageContentTypes.FORM, isInboundDirection: isInboundDirection, isPublicPost: false, isRichText: (_c = message.messageContent) === null || _c === void 0 ? void 0 : _c.isRichText, isUnsupportedText: isUnsupportedText, messageText: (_d = message.messageContent) === null || _d === void 0 ? void 0 : _d.text, showTranslation: translationToggle, customerLanguage: customerLanguage || '' }));
    };
    /**
     * Function to display fallback message content
     * @param props - messageContent
     * @example renderFallbackText()
     */
    const renderFallbackText = (messageContent) => {
        var _a;
        if (isRichText || isUnsupportedText) {
            return ((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.fallbackText) || '';
        }
        else {
            return messageContent || '';
        }
    };
    /**
     * Displays main message content
     * @param messageContent - string
     * @example renderMainMessageContent(messageContent)
     */
    const renderMainMessageContent = (messageContent) => {
        if ((isInboundDirection && isTranslateCustomerMessages) ||
            (isOutboundDirection && isTranslateAgentMessages && !isRichText)) {
            return translatedMessageText;
        }
        else {
            return renderFallbackText(messageContent);
        }
    };
    /**
     * Function to parse message content if html tags present
     * @param messageContent - string
     * @example parseIfHtmlTagsPresent(messageContent)
     */
    const parseIfHtmlTagsPresent = (messageContent) => {
        if (messageContent.indexOf('</') > -1 || messageContent.indexOf('/>') > -1) {
            return _jsx(Box, { children: parse(renderFallbackText(messageContent)) });
        }
        else if (messageContent.length > 0) {
            return (_jsxs(Stack, Object.assign({ direction: "column", justifyContent: "space-between", whiteSpace: "pre-line" }, { children: [renderMainMessageContent(messageContent), isShowTranslationToggleRow && renderTranslationToggleRow()] })));
        }
        else {
            return '';
        }
    };
    /**
     * Function to set the message that has been selected to reply details in store
     * @example handleSetMessageData();
     */
    const handleSetMessageData = () => {
        if (message === null || message === void 0 ? void 0 : message.contactNumber) {
            dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                caseId: message.contactNumber || '',
                fieldsToUpdate: {
                    receiverTo: '',
                    receiverCc: '',
                    receiverBcc: '',
                    sender: '',
                    subject: '',
                    isResponse: false,
                    channelDisplayName: '',
                    isReplyingToSpecificMessage: true,
                    message: message,
                    isRejectedMessageCopied: false,
                },
            }));
        }
    };
    /**
     * Function to get the visual indicator to be displayed with message
     * @param sentStatus - string
     * @example getVisualIndicator(SENT)
     */
    const getVisualIndicator = (sentStatus) => {
        var _a, _b, _c;
        if (isOutboundDirection) {
            const isMessageDelivered = ((_a = message === null || message === void 0 ? void 0 : message.delivered) === null || _a === void 0 ? void 0 : _a.length) && ((_b = message === null || message === void 0 ? void 0 : message.delivered[0]) === null || _b === void 0 ? void 0 : _b.isSuccess);
            if ((_c = message === null || message === void 0 ? void 0 : message.customerStatistics) === null || _c === void 0 ? void 0 : _c.seenAt) {
                return iconList[MessageSendStatusType.SEEN](CHANNEL_ICON_SIZE.MEDIUM, { sx: styles.messageSeenIcon });
            }
            else if (isMessageDelivered === true) {
                return iconList[MessageSendStatusType.DELIVERED](CHANNEL_ICON_SIZE.MEDIUM, { sx: styles.messageDeliveredIcon });
            }
            else if (isMessageDelivered === false) {
                return null;
            }
            else if (sentStatus && sentStatus === MessageSendStatusType.DELAYED) {
                return iconList[MessageSendStatusType.DELAYED](CHANNEL_ICON_SIZE.MEDIUM, { sx: styles.messageDelayedIcon });
            }
            else if (sentStatus && sentStatus === MessageSendStatusType.SENT) {
                return iconList[MessageSendStatusType.SENT](CHANNEL_ICON_SIZE.MEDIUM, { sx: styles.messageSentIcon });
            }
        }
        return null;
    };
    /**
   * Function to render message action menu
   * @param isInboundDirection - boolean
   *
   * @example renderMessageActionMenu()
   */
    const renderMessageActionMenu = (canDeleteContent, canDeleteAuthorName, isInboundDirection = false) => {
        const multimediaTypes = [MultimediaTypes.PDF, MultimediaTypes.VIDEO_MP4, MultimediaTypes.IMAGE_JPEG, MultimediaTypes.IMAGE_PNG, MultimediaTypes.IMAGE_JPG];
        return (_jsx(CcfContactMessageActions, { isInboundDirection: isInboundDirection, messageActionFlags: {
                // if canReplyToSpecificMessage is true and message is not previous & next case message then only show reply to specific message option in the kebab menu
                canReplyToSpecificMessage: canReplyToSpecificMessage && !isPreviousCaseMessage && !isNextCaseMessage,
                canDeleteMessageContent: canDeleteContent,
                canDeleteAuthor: canDeleteAuthorName,
                canDownloadMedia: multimediaTypes.includes(mimeType), // pdf, video and image multimedia template should have download option
            }, setMessageData: handleSetMessageData, showConfirmationDialog: toggleConfirmationDialogBox, downloadUrl: url, fileName: filename }));
    };
    /**
     * Function to render Deleted Message
     * @example renderContentDeletedContainer()
     */
    const renderContentDeletedContainer = () => {
        return (_jsxs(Box, Object.assign({ sx: styles.deletedContentContainerStyle }, { children: [_jsx(Box, Object.assign({ style: styles.deletedContentStyle }, { children: translate('contentDeleted') })), renderMessageActionMenu(false, canDeleteAuthorName, isInboundDirection)] })));
    };
    /**
     * Used to render the reply to message component
     * @param isRenderedInAttachmentContainer - whether the reply to message is rendered in attachment container by default it is false
     * @returns JSX.Element containing the reply to message component
     * @example renderCcfReplyToMessage()
     */
    const renderCcfReplyToMessage = (isRenderedInAttachmentContainer = false) => {
        var _a;
        return (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.replyToMessageContainer), (isRenderedInAttachmentContainer ? styles.replyToMessageContainerInAttachment : {})) }, { children: _jsx(CcfReplyToMessage, { caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, interactionId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId, idOnExternalPlatform: (_a = message === null || message === void 0 ? void 0 : message.replyToMessage) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform }) })));
    };
    /**
   * Function to render message content text with rich messages also
   * @example renderMessageContentText()
   */
    const renderMessageContentText = () => {
        var _a, _b, _c;
        return (_jsxs(_Fragment, { children: [message &&
                    (message === null || message === void 0 ? void 0 : message.isReplyToSpecificMessage) &&
                    repliedMessage &&
                    !isContentRemoved &&
                    renderCcfReplyToMessage(), isContentRemoved && renderContentDeletedContainer(), !isContentRemoved && isRichText && !isFormTypeRichMessage ? (_jsx(CcfRichContactMessage, { message: message, messageActionMenu: renderMessageActionMenu(canDeleteContent, canDeleteAuthorName, true) })) : !isContentRemoved && isMultimediaTemplateMessage ? ( // WhatsApp multimedia templates
                _jsx(CcfContactMultimediaMessage, { message: message, messageActionMenu: renderMessageActionMenu(canDeleteContent, canDeleteAuthorName, true) })) : (!isContentRemoved && (_jsxs(Linkify, Object.assign({ componentDecorator: (decoratedHref, decoratedText) => { var _a, _b, _c, _d; return linkDecorator(decoratedHref, decoratedText, isInboundDirection ? { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.dark } : { color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper }); } }, { children: [parseIfHtmlTagsPresent(isFormTypeRichMessage ? (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.fallbackText : (_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.text), messageContentElements.length > 0 && parseIfHtmlTagsPresent((_c = messageContentElements[0]) === null || _c === void 0 ? void 0 : _c.text)] }))))] }));
    };
    return (_jsxs(Box, Object.assign({ sx: styles.messageDivider }, { children: [isConfirmationPopupOpen && _jsx(CcfMessageActionConfirmationDialog, { isOpen: isConfirmationPopupOpen, messageId: message.id, caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, interactionId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId, action: messageAction, onCancelClick: () => toggleConfirmationDialogBox(false), isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage }), _jsx(CcfContactMessageAuthor, { message: message, name: authorName, direction: direction, styles: styles, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage, isAuthorNameRemoved: Boolean(isAuthorNameRemoved) }), (((_q = message === null || message === void 0 ? void 0 : message.messageContent) === null || _q === void 0 ? void 0 : _q.text) ||
                messageContentElements.length > 0 ||
                (((_r = message === null || message === void 0 ? void 0 : message.messageContent) === null || _r === void 0 ? void 0 : _r.type) === DigitalMessageContentTypes.TEXT
                    ? (_s = message === null || message === void 0 ? void 0 : message.messageContent) === null || _s === void 0 ? void 0 : _s.text
                    : (_t = message === null || message === void 0 ? void 0 : message.messageContent) === null || _t === void 0 ? void 0 : _t.fallbackText) || isContentRemoved) && (_jsx(Box, Object.assign({ sx: styles.messageContainer }, { children: _jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, outboundMessageDraftContainerStyle), inboundMessageContainerStyle) }, { children: [(((_u = message === null || message === void 0 ? void 0 : message.messageContent) === null || _u === void 0 ? void 0 : _u.text) ||
                            messageContentElements.length > 0 ||
                            (((_v = message === null || message === void 0 ? void 0 : message.messageContent) === null || _v === void 0 ? void 0 : _v.type) === DigitalMessageContentTypes.TEXT
                                ? (_w = message === null || message === void 0 ? void 0 : message.messageContent) === null || _w === void 0 ? void 0 : _w.text
                                : (_x = message === null || message === void 0 ? void 0 : message.messageContent) === null || _x === void 0 ? void 0 : _x.fallbackText) || isContentRemoved) && (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, inboundOutboundMessageStyle), outboundMessageDraftStyle), styles.messageActionButton) }, { children: [message && (message === null || message === void 0 ? void 0 : message.isReplyToSpecificMessage) && repliedMessage ?
                                    _jsx(Box, { children: renderMessageContentText() }) :
                                    renderMessageContentText(), !isContentRemoved && ((!isRichText && !isMessageDraft && !isMultimediaTemplateMessage) || isFormTypeRichMessage) && renderMessageActionMenu(canDeleteContent, canDeleteAuthorName, isInboundDirection)] }))), isMessageDraft && (_jsxs(Box, Object.assign({ sx: styles.approvalInfoContainer }, { children: [attachments && attachments.length > 0 && (_jsx(Box, Object.assign({ sx: styles.messageDraftAttachment }, { children: _jsx(CcfDigitalAttachments, { attachments: attachments, justifyContent: CcfAttachmentJustify.FLEX_START, variant: AttachmentPreviewVariant.COMPACT, hideDownload: hideDownload, channelType: channelType, messageSubject: (_y = message === null || message === void 0 ? void 0 : message.title) !== null && _y !== void 0 ? _y : '', caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId }) }))), _jsx(CcfApprovalBanner, { message: (_z = message === null || message === void 0 ? void 0 : message.messageContent) === null || _z === void 0 ? void 0 : _z.text, status: (message === null || message === void 0 ? void 0 : message.isRefused)
                                        ? ApprovalBannerStatus.DENIED
                                        : ApprovalBannerStatus.PENDING, messageDraft: message, isRefused: message === null || message === void 0 ? void 0 : message.isRefused })] })))] })) }))), _jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.attachmentsContainer), { margin: isInboundDirection ? styles.ibMessage : styles.obMessage, mb: 1 }), ref: attachmentContainerRef }, { children: _jsxs(Box, Object.assign({ sx: [Object.assign(Object.assign({}, styles.attachmentsContainer), { width: isInboundDirection ? `${attachmentContainerWidth}px` : styles.attachmentsContainer.width, margin: isInboundDirection ? styles.ibMessage : styles.obMessage, mb: 1 }), !isInboundDirection ? styles.attachmentsWithMsgAction : {}], ref: attachmentContainerRef }, { children: [_jsx(Box, Object.assign({ sx: styles.attachmentBox }, { children: (isOutboundDirection && isDelayedMessage && (attachments === null || attachments === void 0 ? void 0 : attachments.length)) ? (_jsx(Box, Object.assign({ display: 'flex', justifyContent: 'end', sx: { marginRight: '3.125rem' } }, { children: _jsx(CcfLoader, { isPrimary: true }) }))) : (!isContentRemoved && !isMessageDraft && attachments && (_jsxs(_Fragment, { children: [message && !((_0 = message === null || message === void 0 ? void 0 : message.messageContent) === null || _0 === void 0 ? void 0 : _0.text) && (message === null || message === void 0 ? void 0 : message.isReplyToSpecificMessage) && repliedMessage && (_jsx(Box, { children: renderCcfReplyToMessage(true) })), _jsx(CcfDigitalAttachments, { attachments: attachments, justifyContent: isInboundDirection ? CcfAttachmentJustify.LEFT : CcfAttachmentJustify.FLEX_END, variant: AttachmentPreviewVariant.COMPACT, hideDownload: hideDownload, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage, channelType: channelType, messageSubject: (_1 = message === null || message === void 0 ? void 0 : message.title) !== null && _1 !== void 0 ? _1 : '', caseId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId })] }))) })), !isContentRemoved && canAttachmentHasMsgActions && renderMessageActionMenu(canDeleteContent, canDeleteAuthorName, true)] })) })), _jsxs(Box, Object.assign({ sx: isOutboundDirection ? styles.visualIndicatorStyles : {} }, { children: [isTrackingMessageDeliveryStatus && getVisualIndicator(message === null || message === void 0 ? void 0 : message.sentStatus), _jsx(CcfContactMessageTimeStamp, { createdAt: message === null || message === void 0 ? void 0 : message.createdAt, direction: direction, styles: styles })] })), ((_2 = message === null || message === void 0 ? void 0 : message.messageNotes) === null || _2 === void 0 ? void 0 : _2.length) ? (_jsx(Box, { children: message.messageNotes.map((msgNote) => (_jsx(CcfContactMessageNote, { messageId: msgNote.message.id, userDetails: msgNote.user, isReadOnly: true, noteContent: msgNote.content, direction: direction, noteId: msgNote.id, updatedAt: msgNote.updatedAt }, msgNote.id))) })) : null] })));
};
export default CcfContactMessage;
//# sourceMappingURL=ccf-contact-message.js.map