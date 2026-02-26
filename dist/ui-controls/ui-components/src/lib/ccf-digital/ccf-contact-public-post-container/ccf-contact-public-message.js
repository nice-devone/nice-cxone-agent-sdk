import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useState } from 'react';
import { DigitalContactStatus, ReactionType, DigitalContactDirection, DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import { Card, CardContent, CardActions, Grid, Typography, CardHeader, Avatar, Divider, Button, Box, useTheme, useMediaQuery, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Linkify from 'react-linkify';
import parse from 'html-react-parser';
import CcfDigitalAttachments from '../../ccf-interaction-space/ccf-digital-attachments/ccf-digital-attachments';
import { CcfAttachmentJustify } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-justify';
import { AttachmentPreviewVariant } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-preview-variant';
import CcfReactionPicker from '../../ccf-reaction-picker/ccf-reaction-picker';
import { cxoneDigitalContactDetails } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { CcfAssignmentAction, getAssignmentPanelMetadata, getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, getDigitalContactDetailsByCaseId, getTranslationSettingsByCaseId, getTranslatedMessagesByCaseId } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { REACTION_ICONS, iconList, MESSAGE_ACTION_ICONS } from '../../ccf-icon/ccf-icon-list';
import { CcfReactionCounter, CcfTypography, useTranslator, CcfBox, CcfTooltip } from '@nice-devone/ui-controls';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { CcfPublicPostMessageMenu } from './ccf-public-post-message-menu';
import { CcfMessageActionChip } from '../ccf-message-action-chip/ccf-message-action-chip';
import { getDateAndTimeFormat } from '../../../util/common';
import { useThrottleClick } from '../../../hooks/useThrottleClick';
import { addMessageReaction, canDeleteMessageAuthorName, canDeleteMessageContent, removeMessageReaction, MessageKebabMenu } from '../../ccf-assignment-panel/ccf-assignment-utils';
import CcfPopoverTag from '../../ccf-popover-tag/ccf-popover-tag';
import CcfContactMessageNote from '../../ccf-interaction-space/ccf-contact-message-note/ccf-contact-message-note';
import { getEmptyEditorState } from '../../ccf-editor/ccf-contact-editor.slice';
import { CcfMessageActionConfirmationDialog } from '../ccf-message-action-confirmation-dialog/ccf-message-action-confirmation-dialog';
import CcfTranslationToggle from '../ccf-contact-message-container/ccf-translation-toggle';
import { unSupportedTextChecker } from '../../../util/unSupportedTextChecker';
import { linkDecorator } from '../../../util/commonWrapperComponent';
const TIMER_DELAY = 2000;
/**
 * renders the message container
 * @param props - CcfContactPublicMessageProps
 * @example <CcfContactPublicMessage />
 * @returns
 */
const CcfContactPublicMessage = ({ message, styles, sender, postCommentCount, isParentCommentDeleted }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const isLessThanMd = useMediaQuery(theme.breakpoints.down('md'));
    const getdigitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const assignmentPanelDataMetadata = useSelector(getAssignmentPanelMetadata);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const authorName = message.direction === 'inbound'
        ? (_b = (_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.fullName) !== null && _b !== void 0 ? _b : ''
        : (((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.firstName) || '') + ' ' + (((_d = message === null || message === void 0 ? void 0 : message.authorUser) === null || _d === void 0 ? void 0 : _d.surname) || '');
    const messageRepliesCount = ((_e = message === null || message === void 0 ? void 0 : message.children) === null || _e === void 0 ? void 0 : _e.length) ? (_f = message === null || message === void 0 ? void 0 : message.children) === null || _f === void 0 ? void 0 : _f.length : 0;
    // public post will have replyToMessage null and other replies to post will have replyToMessage.id
    const isPublicPost = message.replyToMessage === null;
    const messageCreatedDate = getDateAndTimeFormat(message === null || message === void 0 ? void 0 : message.createdAt);
    const isRelatedMessage = message.isRelatedMessage === true;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId, assignmentPanelDataMetadata === null || assignmentPanelDataMetadata === void 0 ? void 0 : assignmentPanelDataMetadata.selectedInteractionId));
    const translationSettings = useSelector(getTranslationSettingsByCaseId(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId, activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId));
    const { isTranslateCustomerMessages, isTranslateAgentMessages } = translationSettings;
    const isChannel = !message.authorEndUserIdentity && !message.authorUser;
    const authorNameTitle = isChannel ? (_g = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _g === void 0 ? void 0 : _g.name : authorName;
    const authorAvatar = isChannel ? (_j = (_h = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _h === void 0 ? void 0 : _h.name) === null || _j === void 0 ? void 0 : _j.charAt(0) : authorName === null || authorName === void 0 ? void 0 : authorName.charAt(0);
    const channelFlags = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel;
    const isContactClosed = (selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.status) === DigitalContactStatus.CLOSED;
    const showReply = message.isReplyAllowed && !isContactClosed;
    const showLike = (channelFlags === null || channelFlags === void 0 ? void 0 : channelFlags.hasAbilityToLike) && !isContactClosed;
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [messageAction, updateMessageAction] = useState(MessageKebabMenu.DELETE_CONTENT);
    const [translationToggle, setTranslationToggle] = useState(false);
    const isInboundDirection = message.direction === DigitalContactDirection.INBOUND;
    const isOutboundDirection = message.direction === DigitalContactDirection.OUTBOUND;
    const customerLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage) ? Object.values(translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage)[0] : '';
    const translatedMessagesArray = useSelector(getTranslatedMessagesByCaseId(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId, activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId));
    const translatedMessageText = (_k = translatedMessagesArray.find((msg) => msg.id === message.id)) === null || _k === void 0 ? void 0 : _k.translatedMessage;
    const showTranslationToggleRow = (isInboundDirection && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages)) ||
        (isOutboundDirection && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages));
    /**
   * Handles reply button for message
   * @param message - CXoneMessage
   * @example <handleReply />
   * @returns
   */
    const handleReply = (message) => {
        var _a, _b, _c;
        const replyToMessage = {
            authorAgentName: (message === null || message === void 0 ? void 0 : message.authorUser) ? (((_a = message === null || message === void 0 ? void 0 : message.authorUser) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.surname)) : '',
            idOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.idOnExternalPlatform) || '',
            threadIdOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) || '',
        };
        const { caseId, interactionId } = {
            caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
            interactionId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
        };
        // For Public channel like Twitter, Instagram etc., nickname flag used for username mention inside editor e.g. @username
        let nickName = ((_c = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _c === void 0 ? void 0 : _c.nickname) || '';
        if (caseId && interactionId) {
            // replyPrefixMentionTemplate channel flag is mandatory for placing a nickname.
            const { replyPrefixMentionTemplate } = getdigitalContactDetails[interactionId][caseId].channel;
            nickName = nickName && replyPrefixMentionTemplate
                ? replyPrefixMentionTemplate.replace('{userNickname}', `${nickName} `) : '';
            const digitalContactToBeSaved = {
                caseId: caseId,
                fieldsToUpdate: {
                    subject: '',
                    sender: '',
                    receiverTo: '',
                    receiverCc: '',
                    receiverBcc: '',
                    messageId: '',
                    isEditorOpen: true,
                    selectedMessageReplyData: replyToMessage,
                    lexicalEditorState: (nickName ? nickName : getEmptyEditorState()),
                    messageDraftId: '',
                    isRejectedMessageCopied: false,
                },
            };
            dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase(digitalContactToBeSaved));
        }
    };
    /**
   * Applies background color on Message card for Public channel
   * @param isMessageHidden - checks if message is hidden or not
   * @param isMessageDeleted -checks if message is deleted or not
   * @param currentCustomer - checks for the active customer
   * @example applyMessageCardBackground(isMessageHidden, isMessageDeleted, currentCustomer)
   */
    const applyMessageCardBackground = (isMessageHidden, isMessageDeleted, currentCustomer) => {
        var _a, _b;
        const isMessageHiddenOrDeleted = isMessageHidden || isMessageDeleted;
        if (!isRelatedMessage && message.direction === 'outbound') {
            return (isMessageHiddenOrDeleted || isParentCommentDeleted) ? (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background.callControlHeader : '';
        }
        return ((!currentCustomer && !isPublicPost) || isMessageHiddenOrDeleted || isRelatedMessage || isParentCommentDeleted) ? (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background.callControlHeader : '';
    };
    /**
   * Applies color to Message text or author detail for Public channel
   * @param isMessageHidden - checks if message is hidden or not
   * @param isMessageDeleted -checks if message is deleted or not
   * @param currentCustomer - checks for the active customer
   * @example applyMessageTextColor(isMessageHidden, isMessageDeleted, currentCustomer)
   */
    const applyMessageTextColor = (isMessageHidden, isMessageDeleted, currentCustomer) => {
        const isMessageHiddenOrDeleted = isMessageHidden || isMessageDeleted;
        if (!isRelatedMessage && message.direction === 'outbound') {
            return (isMessageHiddenOrDeleted || isParentCommentDeleted) ? theme.palette.text.messageText : '';
        }
        return (isMessageHiddenOrDeleted || !currentCustomer || isRelatedMessage || isParentCommentDeleted) ? theme.palette.text.messageText : '';
    };
    /**
   * Method to check active status of customer message
   * @param isMessageHidden - checks if message is hidden or not
   * @param isMessageDeleted -checks if message is deleted or not
   * @param currentCustomer - checks for the active customer
   * @example checkActiveMessage(isMessageHidden, isMessageDeleted, currentCustomer)
   */
    const checkActiveMessage = (isMessageHidden, isMessageDeleted, currentCustomer) => {
        const messageNotHiddenAndDeleted = !isMessageHidden && !isMessageDeleted;
        if (!isRelatedMessage && message.direction === 'outbound') {
            return messageNotHiddenAndDeleted && !isParentCommentDeleted;
        }
        return (messageNotHiddenAndDeleted && currentCustomer && !isRelatedMessage && !isParentCommentDeleted);
    };
    const showMessageAttachments = (message === null || message === void 0 ? void 0 : message.attachments) && ((_l = message === null || message === void 0 ? void 0 : message.attachments) === null || _l === void 0 ? void 0 : _l.length) > 0;
    const dividerLine = isPublicPost ? _jsx(Divider, { sx: { mb: 2 } }) : null; //To give divider line between public post and messages
    const publicPostStyle = isPublicPost ? styles.originalPublicPost : null;
    const replyTitle = isLessThanMd ? translate('reply') : '';
    const reactionCount = ((_m = message === null || message === void 0 ? void 0 : message.reactionStatistics) === null || _m === void 0 ? void 0 : _m.likes) || 0;
    /**
    * Function to make message text wrap within linkify to show text links if any
    * @example - linkifiedMessageText()
    * @returns
    */
    const linkifiedMessageText = (message) => {
        var _a, _b, _c, _d, _e;
        return (_jsx(Linkify, Object.assign({ componentDecorator: (decoratedHref, decoratedText) => linkDecorator(decoratedHref, decoratedText) }, { children: ((_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.text.indexOf('</')) > -1 || ((_b = message.messageContent) === null || _b === void 0 ? void 0 : _b.text.indexOf('/>')) > -1 ? (parse((_c = message.messageContent) === null || _c === void 0 ? void 0 : _c.text)) : (_jsx("span", Object.assign({ style: { whiteSpace: 'pre-line' } }, { children: (isInboundDirection && isTranslateCustomerMessages) ||
                    (isOutboundDirection && isTranslateAgentMessages && !((_d = message.messageContent) === null || _d === void 0 ? void 0 : _d.isRichText))
                    ? translatedMessageText
                    : (_e = message.messageContent) === null || _e === void 0 ? void 0 : _e.text }))) })));
    };
    const linkifiedMessageContent = !isPublicPost ? linkifiedMessageText(message) : null;
    /**
  * renders the message container
  * @example PublicMessage
  * @returns
  */
    function PublicMessage() {
        var _a, _b, _c, _d;
        const currentCustomer = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.customerName) === authorName;
        const contactDetails = getdigitalContactDetails[selectedDigitalContactDetails.interactionId][selectedDigitalContactDetails.caseId];
        const userRolePermissions = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.userRolePermissions;
        const hideReply = !(userRolePermissions === null || userRolePermissions === void 0 ? void 0 : userRolePermissions.canReply) && !(userRolePermissions === null || userRolePermissions === void 0 ? void 0 : userRolePermissions.canCreateDraft);
        const { reactionStatistics, isDeletedOnExternalPlatform: isMessageDeleted, isHiddenOnExternalPlatform: isMessageHidden, authorNameRemoved, contentRemoved } = (_b = (_a = contactDetails.messages) === null || _a === void 0 ? void 0 : _a.find(msg => msg.id === message.id)) !== null && _b !== void 0 ? _b : {};
        const { isLikedByChannel, isSharedByChannel } = (_c = reactionStatistics) !== null && _c !== void 0 ? _c : {};
        const messageReaction = {
            isLikeSelected: isLikedByChannel || false,
            isShareSelected: isSharedByChannel || false,
        };
        const isAuthorNameRemoved = Boolean(authorNameRemoved !== null);
        const isContentRemoved = Boolean(contentRemoved !== null);
        const canDeleteAuthorName = canDeleteMessageAuthorName(isAuthorNameRemoved, message === null || message === void 0 ? void 0 : message.direction);
        const canDeleteContent = canDeleteMessageContent(isContentRemoved);
        /**
    * method to handle add Or remove message reaction
    * @example addOrRemoveMessageReaction(true, like)
    * @returns
    */
        const addOrRemoveMessageReaction = (isSelected, selectedReactionType) => {
            const selectedReactionDetails = {
                messageId: message.id,
                reactionType: selectedReactionType,
                interactionId: selectedDigitalContactDetails.interactionId,
                caseId: selectedDigitalContactDetails.caseId,
                isSelected,
            };
            if (isSelected) {
                dispatch(addMessageReaction(selectedReactionDetails));
            }
            else {
                dispatch(removeMessageReaction(selectedReactionDetails));
            }
        };
        /**
         * Used to handle the reaction change event and throttle the clicks
         * @example
         * ```
         * handleReactionChange(true);
         * ```
         */
        const handleReactionChange = useThrottleClick((isSelected) => addOrRemoveMessageReaction(isSelected, ReactionType.LIKE), TIMER_DELAY);
        /**
       * Function to handle the opening and closing of the dialog box.
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
       * Function to render original post(message.replyToMessage===null)
       * @example - renderOriginalPost()
       * @returns
       */
        const renderOriginalPost = () => {
            var _a, _b, _c, _d, _e, _f;
            return (_jsx(Box, Object.assign({ sx: Object.assign({}, styles.originalPublicPost), "data-testid": "public-post-message" }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: _jsx(Grid, Object.assign({ item: true, xs: 12, md: 12, sm: true, container: true }, { children: _jsx(Grid, Object.assign({ item: true, xs: true, container: true, direction: "column", spacing: 2 }, { children: _jsxs(Grid, Object.assign({ item: true, xs: true }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.originalPostContainer), { paddingTop: '0.6rem' }) }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.originalPostContainer), { flexFlow: 'wrap', width: isLessThanMd ? '70%' : '60%' }) }, { children: [_jsxs(CcfBox, Object.assign({ className: 'placeIcontoRight', style: { display: 'flex' } }, { children: [isAuthorNameRemoved ? _jsxs(CcfBox, Object.assign({ style: Object.assign(Object.assign(Object.assign({}, styles.messageAuthor), styles.anonymousAuthorName), { color: `${applyMessageTextColor(isMessageHidden, isMessageDeleted, currentCustomer)}` }) }, { children: [" ", translate('anonymous')] })) :
                                                                _jsx(Typography, Object.assign({ gutterBottom: true, variant: "h3", component: "div", sx: Object.assign({ mb: 0 }, styles.messageAuthor) }, { children: sender })), _jsx(CcfPopoverTag, { author: isAuthorNameRemoved ? translate('anonymous') : sender, isPrivateChannel: selectedDigitalContactDetails.channel.isPrivate, id: 'messageTag', message: message, isDisabled: true })] })), _jsxs(CcfBox, Object.assign({ sx: styles.originalPostContainer }, { children: [isMessageDeleted && _jsx(CcfMessageActionChip, { size: "small", label: translate('deleted'), style: styles.hideDeleteChip }), (isMessageHidden && !isMessageDeleted) && _jsx(CcfMessageActionChip, { size: "small", label: translate('hidden'), style: styles.hideDeleteChip })] }))] })), _jsxs(CcfBox, Object.assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.inboundMessageTimeStamp), { width: 'auto', whiteSpace: '', textOverflow: '' }) }, { children: getDateAndTimeFormat(message === null || message === void 0 ? void 0 : message.createdAt) })), _jsx(CcfPublicPostMessageMenu, { contactDetails: selectedDigitalContactDetails, message: message, onReply: handleReply, actionFlags: {
                                                            isCurrentCustomer: currentCustomer,
                                                            isShareSelected: messageReaction.isShareSelected,
                                                            isMessageHidden: isMessageHidden,
                                                            isMessageDeleted: isMessageDeleted,
                                                            canDeleteAuthorName: canDeleteAuthorName,
                                                            canDeleteContent: canDeleteContent,
                                                            isReplyAllowed: showReply ? true : false,
                                                        }, showConfirmationDialog: toggleConfirmationDialogBox, moreButtonStyles: { padding: 0, display: 'flex', alignSelf: 'flex-start' }, addOrRemoveMessageReaction: addOrRemoveMessageReaction, isOriginalPost: true })] }))] })), _jsx(Typography, Object.assign({ variant: "body2", gutterBottom: true, sx: { mt: 1 } }, { children: !isContentRemoved && linkifiedMessageText(message) })), showTranslationToggleRow && (_jsx(CcfBox, Object.assign({ fontSize: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h5.fontSize }, { children: _jsx(CcfTranslationToggle, { handleTranslationToggle: () => {
                                                setTranslationToggle(!translationToggle);
                                            }, fallbackText: (_b = message.messageContent) === null || _b === void 0 ? void 0 : _b.fallbackText, isFormTypeRichMessage: ((_c = message === null || message === void 0 ? void 0 : message.messageContent) === null || _c === void 0 ? void 0 : _c.type) === DigitalMessageContentTypes.FORM, isInboundDirection: isInboundDirection, isPublicPost: isPublicPost, isRichText: (_d = message.messageContent) === null || _d === void 0 ? void 0 : _d.isRichText, isUnsupportedText: unSupportedTextChecker((_e = message.messageContent) === null || _e === void 0 ? void 0 : _e.text), messageText: (_f = message.messageContent) === null || _f === void 0 ? void 0 : _f.text, showTranslation: translationToggle, customerLanguage: customerLanguage }) })))] })) })) })) })) })));
        };
        /**
      * Function to display comments count for post and reply count for messages
      * @example - renderCommentsReplyCount()
      * @returns
      */
        const renderCommentReplyCount = (translationKey, count) => {
            return (count > 0 && _jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ item: true, sx: styles.separator }, { children: '|' })), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfReactionCounter, { count: count, counterStyles: styles.commentReplyCounter, text: _jsx(CcfTypography, { variant: 'inherit', translationKey: translationKey, className: `${styles.commentReplyCounter}` }) }) }))] }));
        };
        return (_jsxs(_Fragment, { children: [isConfirmationPopupOpen && _jsx(CcfMessageActionConfirmationDialog, { isOpen: isConfirmationPopupOpen, messageId: message.id, caseId: contactDetails.caseId, interactionId: contactDetails.interactionId, action: messageAction, onCancelClick: () => toggleConfirmationDialogBox(false) }), _jsxs(Card, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.messageCard), publicPostStyle), { backgroundColor: `${applyMessageCardBackground(isMessageHidden, isMessageDeleted, currentCustomer)}` }), "data-testid": "ccf-contact-public-message", id: message.id }, { children: [!isPublicPost ? (_jsx(CardHeader, { avatar: !isAuthorNameRemoved &&
                                _jsx(Tooltip, Object.assign({ title: authorNameTitle }, { children: _jsx(Avatar, Object.assign({ sx: Object.assign({}, styles.authorAvtar), "aria-label": "recipe", src: (_d = message.authorEndUserIdentity) === null || _d === void 0 ? void 0 : _d.image, alt: authorNameTitle }, { children: authorAvatar })) })), action: _jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: messageCreatedDate, arrow: true, placement: 'bottom-start' }, { children: _jsx(Box, Object.assign({ sx: styles.inboundMessageTimeStamp }, { children: messageCreatedDate })) })), _jsx(CcfPublicPostMessageMenu, { contactDetails: selectedDigitalContactDetails, message: message, actionFlags: {
                                            isCurrentCustomer: currentCustomer,
                                            isShareSelected: messageReaction.isShareSelected,
                                            isMessageHidden: isMessageHidden,
                                            isMessageDeleted: isMessageDeleted,
                                            canDeleteAuthorName: canDeleteAuthorName,
                                            canDeleteContent: canDeleteContent,
                                            isReplyAllowed: false,
                                        }, showConfirmationDialog: toggleConfirmationDialogBox, isOriginalPost: false, onReply: undefined })] }), title: _jsxs("div", Object.assign({ style: styles.messageTitle }, { children: [_jsxs(CcfBox, Object.assign({ className: 'placeIcontoRight', style: styles.titleBox }, { children: [isAuthorNameRemoved ? _jsxs(CcfBox, Object.assign({ style: Object.assign(Object.assign(Object.assign({}, styles.messageAuthor), styles.anonymousAuthorName), { color: `${applyMessageTextColor(isMessageHidden, isMessageDeleted, currentCustomer)}` }) }, { children: [" ", translate('anonymous')] })) : _jsx(CcfTooltip, Object.assign({ title: authorNameTitle, arrow: true, placement: 'bottom-start' }, { children: _jsx(Typography, Object.assign({ gutterBottom: true, sx: Object.assign(Object.assign({}, styles.messageAuthor), { color: `${applyMessageTextColor(isMessageHidden, isMessageDeleted, currentCustomer)}` }), title: authorNameTitle }, { children: authorNameTitle })) })), checkActiveMessage(isMessageHidden, isMessageDeleted, currentCustomer) && _jsx(CcfPopoverTag, { author: isAuthorNameRemoved ? translate('anonymous') : authorNameTitle, isPrivateChannel: selectedDigitalContactDetails.channel.isPrivate, id: 'messageTag', message: message })] })), isMessageDeleted && _jsx(CcfMessageActionChip, { size: "small", label: translate('deleted'), style: styles.hideDeleteChip }), (isMessageHidden && !isMessageDeleted) && _jsx(CcfMessageActionChip, { size: "small", label: translate('hidden'), style: styles.hideDeleteChip })] })), sx: Object.assign({}, styles.cardHeaderPosition) })) : (renderOriginalPost()), _jsx(CardContent, Object.assign({ sx: Object.assign({}, styles.cardContentPosition) }, { children: _jsx(Grid, Object.assign({ container: true, sx: Object.assign({}, styles.gridItemPosition) }, { children: _jsx(Grid, Object.assign({ item: true, md: 12, sx: Object.assign({}, styles.gridItemPosition) }, { children: _jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, md: 12, sx: Object.assign(Object.assign({}, styles.message), { color: `${applyMessageTextColor(isMessageHidden, isMessageDeleted, currentCustomer)}` }) }, { children: isContentRemoved ?
                                                    _jsx(Box, Object.assign({ sx: styles.deletedMessageContainer }, { children: _jsx(Typography, Object.assign({ sx: styles.deletedMessageText }, { children: translate('contentDeleted') })) }))
                                                    : linkifiedMessageContent })), !isContentRemoved && showMessageAttachments && (_jsx(Grid, Object.assign({ item: true, md: 12 }, { children: _jsx(Box, Object.assign({ sx: Object.assign({}, styles.attachmentsContainer) }, { children: _jsx(CcfDigitalAttachments, { attachments: message === null || message === void 0 ? void 0 : message.attachments, justifyContent: CcfAttachmentJustify.LEFT, variant: AttachmentPreviewVariant.COMPACT, messageSubject: message === null || message === void 0 ? void 0 : message.title, caseId: selectedDigitalContactDetails.caseId }) })) })))] })) })) })) })), _jsxs(CardActions, Object.assign({ disableSpacing: true }, { children: [!isPublicPost ? (_jsx(Grid, Object.assign({ container: true }, { children: _jsxs(Grid, Object.assign({ item: true, md: 10 }, { children: [(showLike && checkActiveMessage(isMessageHidden, isMessageDeleted, currentCustomer)) ?
                                                _jsx(CcfReactionPicker, { isSelected: messageReaction.isLikeSelected, reactionType: ReactionType.LIKE, iconName: REACTION_ICONS.LIKE, buttonName: 'like', handleReactionChange: (isSelected) => handleReactionChange(isSelected) })
                                                : _jsx(Grid, { children: _jsx(Box, { sx: { m: 2 } }) }), showReply && !hideReply && checkActiveMessage(isMessageHidden, isMessageDeleted, currentCustomer) && (_jsx(Box, Object.assign({ sx: Object.assign({}, styles.replyButtonBox) }, { children: _jsx(CcfTooltip, Object.assign({ title: replyTitle, arrow: true }, { children: _jsxs(Button, Object.assign({ sx: Object.assign({}, styles.replyButton), variant: "contained", size: "small", tabIndex: 0, onClick: () => handleReply(message), "data-testid": 'reply-button' }, { children: [iconList[MESSAGE_ACTION_ICONS.REPLY]('', { sx: styles.replyIcon }), isLessThanMd ? '' : translate('reply')] })) })) })))] })) }))) : null, checkActiveMessage(isMessageHidden, isMessageDeleted, currentCustomer) ? _jsxs(Grid, Object.assign({ md: 4, container: true, direction: "row", sx: { justifyContent: `${isPublicPost ? 'left' : 'right'}`, width: '70%', paddingRight: '1rem' } }, { children: [_jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfReactionCounter, { count: reactionCount, counterStyles: styles.reactionCounter, iconList: [
                                                    _jsx(CcfIcon, { iconName: REACTION_ICONS.LIKE_FILLED, size: CHANNEL_ICON_SIZE.EXTRA_SMALL }, REACTION_ICONS.LIKE_FILLED)
                                                ] }) })), isPublicPost
                                            ? renderCommentReplyCount('comments', postCommentCount)
                                            : renderCommentReplyCount('replies', messageRepliesCount)] })) : _jsx(Grid, { md: 4, container: true, direction: "row", sx: { justifyContent: 'right', width: '70%', paddingRight: '1rem' } })] }))] })), ((message === null || message === void 0 ? void 0 : message.messageNotes) || [])
                    .filter(msgNote => msgNote.message.id === message.id)
                    .map(msgNote => (_jsx(CcfContactMessageNote, { messageId: msgNote.message.id, userDetails: msgNote.user, isReadOnly: true, noteContent: msgNote.content, direction: message.direction, noteId: msgNote.id, updatedAt: msgNote.updatedAt }, msgNote.id))), dividerLine] }));
    }
    return _jsx(PublicMessage, {});
};
export default memo(CcfContactPublicMessage);
//# sourceMappingURL=ccf-contact-public-message.js.map