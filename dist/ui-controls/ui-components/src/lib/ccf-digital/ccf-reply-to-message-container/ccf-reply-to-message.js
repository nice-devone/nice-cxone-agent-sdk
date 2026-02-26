import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CcfCloseIcon, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { ATTACHMENT_ICON_NAME } from '../../ccf-icon/ccf-icon-list';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import CcfReplyToMessageStyles from './ccf-reply-to-message-styles';
import { formatDateTime } from '@nice-devone/common-sdk';
import { CcfAssignmentAction, getRepliedMessage, getSelectedMsg } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { ccfDigitalSearchActions } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
/**
 * renders the single chat message
 * @param props - CcfReplyToMessageProps
 * @example <CcfReplyToMessage />
 * @returns CcfReplyToMessageComponent
 */
const CcfReplyToMessage = ({ caseId, interactionId, idOnExternalPlatform, }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const theme = useTheme();
    const styles = CcfReplyToMessageStyles(theme);
    const messageDetailsForContentBody = useSelector(getRepliedMessage(caseId, interactionId, idOnExternalPlatform));
    const messageDetailsForEditor = useSelector(getSelectedMsg(caseId));
    const isDisplayedinContentBody = interactionId && idOnExternalPlatform;
    const messageDetails = isDisplayedinContentBody ? messageDetailsForContentBody : messageDetailsForEditor;
    const fullName = ((_a = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.fullName) ||
        ((_b = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.authorUser) === null || _b === void 0 ? void 0 : _b.firstName) + ' ' + (((_c = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.authorUser) === null || _c === void 0 ? void 0 : _c.surname) || '');
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    /**
     * to clear the selected message values from store on click of close in replyToMessageCard
     * @example handleCloseSelectedMsg()
     */
    const handleCloseSelectedMsg = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation(); // to stop the event propagation to the parent element
        dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
            caseId: caseId,
            fieldsToUpdate: {
                receiverTo: '',
                receiverCc: '',
                receiverBcc: '',
                sender: '',
                subject: '',
                isResponse: false,
                lexicalEditorState: undefined,
                channelDisplayName: '',
                isReplyingToSpecificMessage: false,
                message: {},
                isRejectedMessageCopied: false,
            },
        }));
    };
    /**
     * to scroll to the original message on click of replyToMessageCard
     * @example handleScrollToOriginalMessage()
     */
    const handleScrollToOriginalMessage = () => {
        dispatch(ccfDigitalSearchActions.updateSelectedMessageId(messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.id));
    };
    /**
     * Used to render the text content of the message
     * @example renderText()
     */
    const renderText = () => {
        var _a, _b, _c;
        if ((messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.contentRemoved) != null) {
            // if content is removed then show content deleted
            return translate('contentDeleted');
        }
        // if message content is present then show the message content or else show the fallback text if no attachments are present
        return (((_a = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.messageContent) === null || _a === void 0 ? void 0 : _a.text) ||
            (((_b = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.attachments) === null || _b === void 0 ? void 0 : _b.length) > 0 ? '' : (_c = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.messageContent) === null || _c === void 0 ? void 0 : _c.fallbackText));
    };
    return (_jsxs(Box, Object.assign({ sx: styles.replyToMessageContainer, onClick: handleScrollToOriginalMessage }, { children: [_jsxs(Box, Object.assign({ sx: styles.header }, { children: [_jsxs(Box, Object.assign({ sx: styles.authorAndTimestamp }, { children: [_jsx(CcfTooltip, Object.assign({ title: fullName }, { children: _jsx(Box, Object.assign({ component: 'span', sx: Object.assign(Object.assign(Object.assign({}, styles.textStyles), styles.mainText), styles.name) }, { children: (messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.authorNameRemoved) != null ? translate('anonymous') : fullName })) })), _jsx(Box, Object.assign({ component: 'span', sx: Object.assign(Object.assign({}, styles.textStyles), styles.subText) }, { children: formatDateTime(messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.createdAt) }))] })), (!isDisplayedinContentBody) && _jsx(CcfTooltip, Object.assign({ title: translate('close') }, { children: _jsx(Box, Object.assign({ component: 'span', sx: styles.closeIcon }, { children: _jsx(CcfCloseIcon, { sx: styles.closeIcon, onClick: (event) => handleCloseSelectedMsg(event) }) })) }))] })), (((_d = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.messageContent) === null || _d === void 0 ? void 0 : _d.text) || ((_e = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.messageContent) === null || _e === void 0 ? void 0 : _e.fallbackText)) && (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.messageContent), styles.textStyles), styles.subText) }, { children: renderText() }))), !((_f = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.messageContent) === null || _f === void 0 ? void 0 : _f.text) && ((_g = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.attachments) === null || _g === void 0 ? void 0 : _g.length) > 0 && (_jsx(Box, Object.assign({ sx: styles.attachmentsContainer }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOCUMENT, size: ATTACHMENT_ICON_SIZE.SMALL }) })))] })));
};
export default CcfReplyToMessage;
//# sourceMappingURL=ccf-reply-to-message.js.map