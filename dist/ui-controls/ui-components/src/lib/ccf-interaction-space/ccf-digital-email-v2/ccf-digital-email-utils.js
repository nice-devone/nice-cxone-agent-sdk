import { __awaiter } from "tslib";
import { CcfLogger } from '@nice-devone/agent-sdk';
import { DigitalContactDirection } from '@nice-devone/common-sdk';
import { CcfContactEditorAction, initialEditorState } from '../../ccf-editor/ccf-contact-editor.slice';
import { CcfAssignmentAction, getForwardedAttachments, updateFileToBeUploaded } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { EMAIL_ACTIONS } from '../../ccf-icon/ccf-icon-list';
import { createForwardedEmailInHtml, getMessageAuthor } from '../../../util/common';
import { generateUUIdsForInlineAttachment, modifyMessageContentInlineImgIds } from '../../ccf-digital/ccf-contact-content-body/ccf-contact-content-body-utills';
const ccfLogger = new CcfLogger('App.consumer', 'App.CcfContactContentBody');
/**
     * Method used to get the valid from address
     * @param from - current from address
     * @param fromAddressList -list of from Address
     * @example
     * ```
     * getValidFromAddressToReply('test@abcm.com',['watson@nice.com'])
     * ```
     */
export const getValidFromAddressToReply = (from, fromAddressList) => {
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
 * Function to get to cc and bcc fields from recipients
 * @returns an object with to, cc and bcc properties
 * ```
 * @example
 * getToCcBccFields(recipients, sender, true)
 * ```
 */
export function getToCcBccFields(recipients, sender, isReplyAll) {
    let to = '';
    let cc = '';
    let bcc = '';
    (recipients || []).forEach((recipient) => {
        if (recipient.isPrimary === true && recipient.isPrivate === false && !(isReplyAll && recipient.idOnExternalPlatform === sender)) {
            to += (to === '') ? recipient.idOnExternalPlatform : ',' + recipient.idOnExternalPlatform;
        }
        if (recipient.isPrimary === false && recipient.isPrivate === false) {
            cc += (cc === '') ? recipient.idOnExternalPlatform : ',' + recipient.idOnExternalPlatform;
        }
        if (recipient.isPrimary === false && recipient.isPrivate === true) {
            bcc += (bcc === '') ? recipient.idOnExternalPlatform : ',' + recipient.idOnExternalPlatform;
        }
    });
    return {
        to,
        cc,
        bcc,
    };
}
/**
     * Transform subject for respective action
     * @param message - message: CXoneMessage type
     * @param action - type of action
     * @param isContentRemoved - flag to check if content is removed
     * @param titleTranslated - title prefix regexp
     * @param replyTranslated - reply prefix string
     * @example - addSubject(message, 'Reply', true)
     */
export const addSubject = (message, action, isContentRemoved = false, titleTranslated, replyTranslated) => {
    var _a, _b, _c, _d, _e;
    const titlePrefixRegex = titleTranslated;
    ;
    const title = (_c = (_b = ((_a = message === null || message === void 0 ? void 0 : message.title) !== null && _a !== void 0 ? _a : '')) === null || _b === void 0 ? void 0 : _b.replace(titlePrefixRegex, '')) === null || _c === void 0 ? void 0 : _c.trim(); // Extract the title from the message object and remove any "Fwd:" or "Re:" prefixes.
    let subject = isContentRemoved ? '' : title || ''; // will removed the subject if content is removed
    if (action === 'Reply') {
        if (isContentRemoved)
            subject = replyTranslated + ': '; // will removed the subject if content is removed
        else if (title && ((_d = title.toUpperCase()) === null || _d === void 0 ? void 0 : _d.startsWith((_e = (`${replyTranslated}:`)) === null || _e === void 0 ? void 0 : _e.toUpperCase())))
            subject = replyTranslated + ': ' + title.slice(3).trim();
        else
            subject = replyTranslated + ': ' + (title || '');
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
const getAndUploadForwardedAttachments = (attachments, uuidForInlineImages, isEmailForwardSelected, dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (attachments && attachments.length > 0) {
        const fileList = new DataTransfer();
        for (const attachment of attachments) {
            yield getForwardedAttachments(attachment)
                .then((file) => {
                fileList.items.add(file);
            })
                .catch((error) => {
                ccfLogger.error('getAndUploadForwardedAttachments', `error while re-uploading the existing attachments - ${JSON.stringify(error)}`);
            });
        }
        //Dev Note: Added check for email forword selected. Since file upload is async activity, for multiple file it takes time. If user switch to Reply All option before uploading activity complete then attachment should not apear in editor.
        if (fileList && ((_a = fileList === null || fileList === void 0 ? void 0 : fileList.files) === null || _a === void 0 ? void 0 : _a.length) > 0 && isEmailForwardSelected.current)
            dispatch(updateFileToBeUploaded({
                fileList: fileList === null || fileList === void 0 ? void 0 : fileList.files,
                uuidList: uuidForInlineImages,
                isForwardedAttachment: true,
            }));
    }
});
/**
   * Handles click events for various email actions and updates the state accordingly.
   *
   * @param props - handleActionItemClickProps
   * @example handleActionItemClick('reply',message, caseId, interactionId, fromAddressList, senderm, isEmailForwardSelected, updateDisplayFooter, dispatch )
   * */
export const handleActionItemClick = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { action, message, caseId, interactionId, fromAddressList, sender, isEmailForwardSelected, emptyEditorState, titlePrefixRegex, replyPrefixTranslated, updateDisplayFooter, dispatch, } = props;
    const replyChannelName = (_a = message === null || message === void 0 ? void 0 : message.replyChannel) === null || _a === void 0 ? void 0 : _a.name;
    const replyToMessage = {
        authorAgentName: (message === null || message === void 0 ? void 0 : message.authorUser) ? ((_b = message === null || message === void 0 ? void 0 : message.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) + ' ' + ((_c = message === null || message === void 0 ? void 0 : message.authorUser) === null || _c === void 0 ? void 0 : _c.surname) : '',
        idOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.idOnExternalPlatform) || '',
        threadIdOnExternalPlatform: (message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) || '',
    };
    dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
    const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
    const fromAddress = getValidFromAddressToReply(replyChannelName, fromAddressList);
    updateDisplayFooter && updateDisplayFooter();
    isEmailForwardSelected.current = action === EMAIL_ACTIONS.FORWARD;
    switch (action) {
        case EMAIL_ACTIONS.FORWARD:
            {
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
                        subject: addSubject(message, 'Forward', isContentRemoved, titlePrefixRegex, replyPrefixTranslated),
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
                getAndUploadForwardedAttachments(isContentRemoved ? [] : message.attachments, uuidForAttachments, isEmailForwardSelected, dispatch);
            }
            break;
        case EMAIL_ACTIONS.REPLY_ALL:
            {
                const { to, cc, bcc } = getToCcBccFields(message.recipients, sender, true);
                let toAddr = to;
                if (message.direction === DigitalContactDirection.INBOUND) {
                    toAddr =
                        toAddr === ''
                            ? (_d = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _d === void 0 ? void 0 : _d.idOnExternalPlatform
                            : ((_e = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _e === void 0 ? void 0 : _e.idOnExternalPlatform) + ',' + toAddr;
                }
                toAddr = toAddr ? toAddr : ((_f = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _f === void 0 ? void 0 : _f.idOnExternalPlatform) || '';
                const isAuthorNameRemoved = Boolean((message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null);
                dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                    caseId: caseId,
                    fieldsToUpdate: {
                        receiverTo: isAuthorNameRemoved ? '' : toAddr,
                        receiverCc: cc,
                        receiverBcc: bcc,
                        sender: sender,
                        subject: addSubject(message, 'Reply', isContentRemoved, titlePrefixRegex, replyPrefixTranslated),
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
            }
            break;
        case EMAIL_ACTIONS.REPLY:
            {
                const toAddr = message.direction === DigitalContactDirection.INBOUND ? (_g = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _g === void 0 ? void 0 : _g.idOnExternalPlatform : (_h = message === null || message === void 0 ? void 0 : message.authorUser) === null || _h === void 0 ? void 0 : _h.emailAddress; // to get the email address of ib/ob message author
                dispatch(CcfAssignmentAction.removeAttachmentsForSelectedContact({ caseId: caseId, interactionId: interactionId }));
                const isAuthorNameRemoved = (message === null || message === void 0 ? void 0 : message.authorNameRemoved) !== null;
                const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
                dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                    caseId: caseId,
                    fieldsToUpdate: {
                        receiverTo: isAuthorNameRemoved ? '' : toAddr,
                        receiverCc: '',
                        receiverBcc: '',
                        sender: sender,
                        subject: addSubject(message, 'Reply', isContentRemoved, titlePrefixRegex, replyPrefixTranslated),
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
            }
            break;
        default:
            return;
    }
};
/**
   * Function to analyze the HTML content of the email message.
   * It checks if the first 3 lines contain only text or if there are images or tables.
   * @param html - The HTML content of the email message.
   * @example analyzeHtmlContent
   */
export const analyzeHtmlContent = (html) => {
    const maxContentLength = 150;
    // Check if the HTML is empty or contains only whitespace
    const htmlLines = html.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    // const emptyPTagRegex = /^(\s*<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>)+/i;
    // convert HTML to text 
    // const htmlContent = convertHtmlToText(html);
    // split the content into lines based on newlines or periods
    // const lines =htmlContent.split(/[\n.]+/).map(part => part.trim()).filter(Boolean)
    const first3Lines = htmlLines.slice(0, 3).join('\n').toLowerCase();
    // Check if the first 3 lines contain only text (no images or tables)
    const hasImageOrTable = /<(img|table)\b/.test(first3Lines);
    // check the length of the HTML content
    const moreThanThreeLines = html.length > maxContentLength;
    return {
        onlyTextInFirstThreeLines: !hasImageOrTable,
        moreThanThreeLines,
        firstThreeLinesHtml: htmlLines.slice(0, 3).join('\n'),
        fullHtml: html,
    };
};
//# sourceMappingURL=ccf-digital-email-utils.js.map