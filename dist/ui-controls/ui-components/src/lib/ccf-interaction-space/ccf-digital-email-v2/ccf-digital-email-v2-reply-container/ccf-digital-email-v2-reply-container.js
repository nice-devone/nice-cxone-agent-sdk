import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useRef } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import CcfDigitalEmailV2ReplyContainerStyles from './ccf-digital-email-v2-reply-container.style';
import { EMAIL_ACTIONS, iconList } from '../../../ccf-icon/ccf-icon-list';
import { CcfPopOver, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { MessageKebabMenu } from '../../../ccf-assignment-panel/ccf-assignment-utils';
import CcfIcon from '../../../ccf-icon/ccf-icon';
import { DigitalChannelStatus, DigitalContactDirection } from '@nice-devone/common-sdk';
import { CcfAssignmentAction, getDigitalContactStatusByCaseId, getDigitalReplyChannelsByCaseId, getForwardedAttachments, getIsEmailForward, updateFileToBeUploaded } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { CcfContactEditorAction, getEmptyEditorState, initialEditorState } from '../../../ccf-editor/ccf-contact-editor.slice';
import { generateUUIdsForInlineAttachment, modifyMessageContentInlineImgIds } from '../../../ccf-digital/ccf-contact-content-body/ccf-contact-content-body-utills';
import { createForwardedEmailInHtml, getMessageAuthor } from '../../../../util/common';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { getToCcBccFields } from '../ccf-digital-email-utils';
/**
 * Component to render the new revamped Email reply forward options on Email header
 * @returns Reply Forward Options on Revamped Email
 * ```
 * @example
 * <CcfDigitalEmailV2ReplyContainer/>
 * ```
 */
export function CcfDigitalEmailV2ReplyContainer(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { canDeleteContent, canDeleteAuthorName, digitalContactDetails, onKebabMenuItemSelection, message, isPreviousCaseMessage, isNextCaseMessage } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const styles = CcfDigitalEmailV2ReplyContainerStyles(theme);
    const caseId = (_a = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.id;
    const interactionId = (_b = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.interactionId;
    const channelDisplayName = (_c = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.name;
    const emptyEditorState = getEmptyEditorState();
    const isEmailForwardSelected = useRef(useSelector(getIsEmailForward((_d = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _d === void 0 ? void 0 : _d.id)) || false);
    const fromAddressList = useSelector(getDigitalReplyChannelsByCaseId(caseId, interactionId));
    const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
    const sender = (_e = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _e === void 0 ? void 0 : _e.idOnExternalPlatform;
    const replyChannelName = ((_f = message === null || message === void 0 ? void 0 : message.replyChannel) === null || _f === void 0 ? void 0 : _f.name) || channelDisplayName;
    const replyToMessage = {
        authorAgentName: (message === null || message === void 0 ? void 0 : message.authorUser) ? (((_g = message === null || message === void 0 ? void 0 : message.authorUser) === null || _g === void 0 ? void 0 : _g.firstName) + ' ' + ((_h = message === null || message === void 0 ? void 0 : message.authorUser) === null || _h === void 0 ? void 0 : _h.surname)) : '',
        idOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.idOnExternalPlatform) || '',
        threadIdOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) || '',
    };
    const isAuthorNameRemoved = Boolean((message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null);
    const selectedDigitalContactStatus = useSelector(getDigitalContactStatusByCaseId(caseId, interactionId));
    const isCaseClosed = selectedDigitalContactStatus === DigitalChannelStatus.CLOSED;
    const notPrevAndNextMessage = !isPreviousCaseMessage && !isNextCaseMessage;
    const ccfLogger = new CcfLogger('App.consumer', 'App.CcfDigitalEmailV2ReplyContainer');
    const kebabMenuItems = {
        menuItems: [
            {
                items: [
                    {
                        label: translate('deleteContent'),
                        icon: (_jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_CONTENT, svgIconStyles: { sx: styles.deleteContent } })),
                        closeOnSelection: true,
                        type: MessageKebabMenu.DELETE_CONTENT,
                    },
                    {
                        label: translate('deleteAuthorName'),
                        icon: (_jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_AUTHOR_NAME, svgIconStyles: { sx: styles.deleteAuthorName } })),
                        closeOnSelection: true,
                        type: MessageKebabMenu.DELETE_AUTHOR_NAME,
                    }
                ],
            }
        ],
    };
    /**
     * Filter the kebab menu options
     * @param menu - Menu option details
     * @example - filterKebabMenuOptions();
     * @returns - filtered kebab menu options
     */
    const filterKebabMenuOptions = () => {
        const filteredMenu = Object.assign({}, kebabMenuItems);
        if (!canDeleteAuthorName) {
            filteredMenu.menuItems[0].items = filteredMenu.menuItems[0].items.filter((item) => item.type !== MessageKebabMenu.DELETE_AUTHOR_NAME);
        }
        if (!canDeleteContent) {
            filteredMenu.menuItems[0].items = filteredMenu.menuItems[0].items.filter((item) => item.type !== MessageKebabMenu.DELETE_CONTENT);
        }
        return filteredMenu;
    };
    const filteredKebabMenuItems = filterKebabMenuOptions();
    const shouldKebabMenuVisible = ((_k = (_j = filteredKebabMenuItems === null || filteredKebabMenuItems === void 0 ? void 0 : filteredKebabMenuItems.menuItems[0]) === null || _j === void 0 ? void 0 : _j.items) === null || _k === void 0 ? void 0 : _k.length) > 0 ? true : false;
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
       * Get existing attachments and re-upload them
       * @param attachments - received cxone message attachments
       * @example -
       * ```
       * getAndUploadForwardedAttachments(message.attachments);
       * ```
       */
    const getAndUploadForwardedAttachments = (attachments, uuidForInlineImages) => __awaiter(this, void 0, void 0, function* () {
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
      * function used to reply
      * @example
      * ```
      * replyHandler()
      * ```
    */
    const replyHandler = () => {
        var _a, _b, _c;
        //existing attachment should be removed from editor if user click on reply
        dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
        isEmailForwardSelected.current = false;
        const fromAddress = getValidFromAddressToReply(replyChannelName);
        const replyToMessage = {
            authorAgentName: (message === null || message === void 0 ? void 0 : message.authorUser) ? (((_a = message === null || message === void 0 ? void 0 : message.authorUser) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.surname)) : '',
            idOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.idOnExternalPlatform) || '',
            threadIdOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) || '',
        };
        dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
            caseId: caseId,
            fieldsToUpdate: {
                receiverTo: isAuthorNameRemoved ? '' : (_c = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _c === void 0 ? void 0 : _c.idOnExternalPlatform,
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
        dispatch(CcfContactEditorAction.setContactFromValue({ caseId: caseId, fromAddress: fromAddress }));
        //Dev Note: - To Fix - CC, BCC fields not update when switching between forward and Reply mode
        dispatch(CcfContactEditorAction.setEmailCcValue({ caseId: caseId, receiverCc: '' }));
        dispatch(CcfContactEditorAction.setEmailBccValue({ caseId: caseId, receiverBcc: '' }));
    };
    /**
         * function used to forward
         * @example
         * ```
         * forwardHandler()
         * ```
         */
    const forwardHandler = () => {
        //existing attachment should be removed from editor if user click on reply
        dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
        isEmailForwardSelected.current = true;
        const fromAddress = getValidFromAddressToReply(replyChannelName);
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
            caseId: caseId,
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
        dispatch(CcfContactEditorAction.setContactFromValue({ caseId: caseId, fromAddress: fromAddress }));
        //Dev Note: - To Fix - CC, BCC fields not update when switching between forward and Reply mode
        dispatch(CcfContactEditorAction.setEmailCcValue({ caseId: caseId, receiverCc: '' }));
        dispatch(CcfContactEditorAction.setEmailBccValue({ caseId: caseId, receiverBcc: '' }));
        getAndUploadForwardedAttachments(isContentRemoved ? [] : message.attachments, uuidForAttachments);
    };
    /**
         * function to handle reply all
         * @example
         * ```
         * handleReplyAll()
         * ```
         */
    const handleReplyAll = () => {
        var _a, _b, _c;
        //existing attachment should be removed from editor if user click on reply
        dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
        isEmailForwardSelected.current = false;
        const fromAddress = getValidFromAddressToReply(replyChannelName);
        const { to, cc, bcc } = getToCcBccFields(message.recipients, sender, true);
        let toAddr = to;
        if (message.direction === DigitalContactDirection.INBOUND) {
            toAddr = (toAddr === '') ? (_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform : ((_b = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _b === void 0 ? void 0 : _b.idOnExternalPlatform) + ',' + toAddr;
        }
        toAddr = toAddr ? toAddr : ((_c = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _c === void 0 ? void 0 : _c.idOnExternalPlatform) || '';
        dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
            caseId: caseId,
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
        dispatch(CcfContactEditorAction.setContactFromValue({ caseId: caseId, fromAddress: fromAddress }));
        //Dev Note: - To Fix - CC, BCC fields not update when switching between forward and Reply mode
        dispatch(CcfContactEditorAction.setEmailCcValue({ caseId: caseId, receiverCc: cc }));
        dispatch(CcfContactEditorAction.setEmailBccValue({ caseId: caseId, receiverBcc: bcc }));
    };
    return (_jsxs(_Fragment, { children: [!isCaseClosed && notPrevAndNextMessage && (_jsx(CcfTooltip, Object.assign({ title: translate('forward') }, { children: _jsx(IconButton, Object.assign({ sx: styles.iconButtonForward, "aria-label": translate('forwardMessage'), onClick: () => forwardHandler() }, { children: iconList[EMAIL_ACTIONS.FORWARD]('', { sx: styles.replyIcon }) })) }))), !isCaseClosed && notPrevAndNextMessage && (_jsx(CcfTooltip, Object.assign({ title: translate('replyAll') }, { children: _jsx(IconButton, Object.assign({ sx: styles.iconButton, "aria-label": translate('replyAllToMessage'), onClick: () => handleReplyAll() }, { children: iconList[EMAIL_ACTIONS.REPLY_ALL]('', {
                        sx: styles.replyIcon,
                    }) })) }))), (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND && !isCaseClosed && notPrevAndNextMessage && (_jsx(CcfTooltip, Object.assign({ title: translate('reply') }, { children: _jsx(IconButton, Object.assign({ sx: styles.iconButton, "aria-label": translate('replyToMessage'), onClick: () => replyHandler() }, { children: iconList[EMAIL_ACTIONS.REPLY]('', { sx: styles.replyIcon }) })) }))), shouldKebabMenuVisible && (_jsx(Box, { children: _jsx(CcfPopOver, { disableTooltip: true, onPopOverItemSelection: (item) => onKebabMenuItemSelection(item), optionList: kebabMenuItems, popOverMenuItemExtraStyles: styles.popOverMenuItemStyles, popOverRightIconStyles: { color: theme.palette.text.clearText }, tooltipTitle: "moreActionsOnThisMessage" }) }))] }));
}
export default memo(CcfDigitalEmailV2ReplyContainer);
//# sourceMappingURL=ccf-digital-email-v2-reply-container.js.map