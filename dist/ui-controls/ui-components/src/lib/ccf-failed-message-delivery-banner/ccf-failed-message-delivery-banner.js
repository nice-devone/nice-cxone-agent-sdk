import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Link, useTheme } from '@mui/material';
import Linkify from 'react-linkify';
import { useDispatch, useSelector } from 'react-redux';
import CcfContactFailedMessageDeliveryStyles from './ccf-failed-message-delivery-banner-styles';
import { DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import parse, { domToReact } from 'html-react-parser';
import { CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import CcfContactMessageAuthor from '../ccf-digital/ccf-contact-message-container/ccf-contact-message-author';
import CcfContactMessageContainerStyles from '../ccf-digital/ccf-contact-message-container/ccf-contact-message-container-styles';
import { DeleteOutlined, ReplayTwoTone, WarningAmberRounded } from '@mui/icons-material';
import { removeFailedMessageFromIndexDb } from '../ccf-editor/ccf-editor-utils';
import { CcfAssignmentAction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getToCcBccFields } from '../ccf-digital/ccf-contact-email-header/ccf-contact-email-header';
import { useThrottleClick } from '../../hooks/useThrottleClick';
import { sendMessageReply, onConatctSendMessageSuccess, CcfContactEditorAction, draftContactMessage, getContactSelectedSkill } from '../ccf-editor/ccf-contact-editor.slice';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { linkDecorator } from '../../util/commonWrapperComponent';
const RETRY_CLICK_DELAY = 5000; //throttle delay to void multiple clicks for retry button in milliseconds
/**
 * Will be displayed under failed to deliver message
 * @param props - CcfFailedMessageDeliveryBannerProps
 * @returns JSX to show banner
 * @example -
 * ```
 * <CcfFailedMessageDeliveryBanner failedMessage: FailedMessageDetails caseId: string bannerLabel: string }/>
 * ```
 */
export function CcfFailedMessageDeliveryBanner(props) {
    var _a, _b, _c, _d, _e;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const { caseId, failedMessage, messageAuthor, channelDisplayName, wysiwygEnabled } = props;
    const sendReplyObject = (failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.sendReplyObj) || (failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.draftMessageForApproval);
    const sendReplyObjectPayloadText = (_b = (_a = sendReplyObject === null || sendReplyObject === void 0 ? void 0 : sendReplyObject.messageContent) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.text;
    const failedMessageDeliveryStyles = CcfContactFailedMessageDeliveryStyles(theme);
    const messageContainerStyles = CcfContactMessageContainerStyles(theme);
    const messageRichContentTypes = [DigitalMessageContentTypes.RICH_LINK, DigitalMessageContentTypes.QUICK_REPLIES, DigitalMessageContentTypes.LIST_PICKER];
    const isRichText = messageRichContentTypes.includes((_c = sendReplyObject === null || sendReplyObject === void 0 ? void 0 : sendReplyObject.messageContent) === null || _c === void 0 ? void 0 : _c.type);
    const selectedSkill = useSelector(getContactSelectedSkill(caseId));
    const bannerLabel = sendReplyObjectPayloadText ? translate('messageNotSent') : translate('attachmentNotSent');
    const ccfLogger = new CcfLogger('App.consumer', 'App.CcfFailedMessageDeliveryBanner');
    const parseHtmlOptions = {
        replace: (domNode) => {
            var _a;
            try {
                if ((domNode === null || domNode === void 0 ? void 0 : domNode.type) === 'tag') {
                    // In case of failed message, we are hiding the table content
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'table') {
                        domNode.attribs.style = 'display: none';
                    }
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'a' && ((_a = domNode === null || domNode === void 0 ? void 0 : domNode.attribs) === null || _a === void 0 ? void 0 : _a.href)) {
                        const href = domNode.attribs.href.split('external-link?q=').length
                            && decodeURIComponent(domNode.attribs.href.split('external-link?q=')[1]);
                        return (_jsx(CcfTooltip, Object.assign({ title: href }, { children: _jsx("a", Object.assign({ target: '_blank', href: href, rel: "noreferrer" }, { children: domToReact(domNode === null || domNode === void 0 ? void 0 : domNode.children, parseHtmlOptions) })) })));
                    }
                }
                return domNode;
            }
            catch (error) {
                ccfLogger.error('parseHtmlOptions', JSON.stringify(error));
            }
        },
    };
    /**
     * used to open draft editor for failed email messages
     * @example openDraftEditorForFailedEmail()
     */
    const openDraftEditorForFailedEmail = () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { to, cc, bcc } = getToCcBccFields(failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.sendReplyObj.recipients, messageAuthor, true);
        const toAddr = to;
        dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
            caseId: props.caseId,
            fieldsToUpdate: {
                receiverTo: toAddr,
                receiverCc: cc,
                receiverBcc: bcc,
                sender: messageAuthor,
                subject: (_a = failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.sendReplyObj) === null || _a === void 0 ? void 0 : _a.title,
                isResponse: true,
                messageId: (_c = (_b = failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.sendReplyObj) === null || _b === void 0 ? void 0 : _b.replyToMessage) === null || _c === void 0 ? void 0 : _c.idOnExternalPlatform,
                channelDisplayName: (_d = failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.fromAddress) !== null && _d !== void 0 ? _d : channelDisplayName,
                isRejectedMessageCopied: false,
            },
        }));
        // this will insert text into editor from editor update plugin
        dispatch(CcfContactEditorAction.updateEditorStateForEmail({ caseId, emailEditorContentToInsert: (_g = (_f = (_e = failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.sendReplyObj) === null || _e === void 0 ? void 0 : _e.messageContent) === null || _f === void 0 ? void 0 : _f.payload) === null || _g === void 0 ? void 0 : _g.text }));
        // clear failed message from indexedDB & store as we copied it in editor.
        onConatctSendMessageSuccess(dispatch, caseId, failedMessage.xTraceId);
    };
    /**
     * used to call whenever retry for message is initiated
     * it is wrapped around the useThrottleClick hook to avoid multiple clicks till the action is completed
     * @example retryFailedMessage()
     */
    const retryFailedMessage = useThrottleClick(() => {
        if (failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.sendReplyObj) {
            // if email then open editor draft screen else call sendMessageReply directly.
            wysiwygEnabled ? openDraftEditorForFailedEmail() : dispatch(sendMessageReply({ caseId, failedXTraceId: failedMessage.xTraceId, sendReplyObj: sendReplyObject }));
        }
        else {
            // if its message for approval request then call draftMessage for retry
            dispatch(draftContactMessage({ selectedSkill: selectedSkill, caseId, failedXTraceId: failedMessage.xTraceId, draftMessagePayload: failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.draftMessageForApproval }));
        }
    }, RETRY_CLICK_DELAY);
    return (_jsx(Box, Object.assign({ sx: Object.assign({}, failedMessageDeliveryStyles.failedMessageBannerContainer) }, { children: _jsxs(Box, Object.assign({ sx: Object.assign({}, failedMessageDeliveryStyles.failedMessageBannerWrapper) }, { children: [_jsx(CcfContactMessageAuthor, { message: sendReplyObject, name: messageAuthor, direction: 'outbound', styles: messageContainerStyles, isPreviousCaseMessage: true }), _jsx(Box, Object.assign({ sx: Object.assign({}, failedMessageDeliveryStyles.failedOutBoundMessageStyle) }, { children: _jsx(Linkify, Object.assign({ componentDecorator: (decoratedHref, decoratedText) => { var _a, _b; return linkDecorator(decoratedHref, decoratedText, { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper }); } }, { children: (sendReplyObjectPayloadText === null || sendReplyObjectPayloadText === void 0 ? void 0 : sendReplyObjectPayloadText.indexOf('</')) > -1 || (sendReplyObjectPayloadText === null || sendReplyObjectPayloadText === void 0 ? void 0 : sendReplyObjectPayloadText.indexOf('/>')) > -1
                            ? parse(isRichText ? (_d = sendReplyObject === null || sendReplyObject === void 0 ? void 0 : sendReplyObject.messageContent) === null || _d === void 0 ? void 0 : _d.fallbackText : sendReplyObjectPayloadText, wysiwygEnabled ? parseHtmlOptions : undefined)
                            : _jsx("span", Object.assign({ style: { whiteSpace: 'pre-line' } }, { children: isRichText ? (_e = sendReplyObject === null || sendReplyObject === void 0 ? void 0 : sendReplyObject.messageContent) === null || _e === void 0 ? void 0 : _e.fallbackText : sendReplyObjectPayloadText })) })) })), _jsxs(Box, Object.assign({ sx: Object.assign({}, failedMessageDeliveryStyles.failedMessageBanner) }, { children: [_jsx(Box, Object.assign({ sx: failedMessageDeliveryStyles.warningIcon }, { children: _jsx(WarningAmberRounded, { color: 'error' }) })), _jsx(Box, Object.assign({ sx: failedMessageDeliveryStyles.bannerLabel }, { children: bannerLabel })), _jsxs(Box, Object.assign({ sx: failedMessageDeliveryStyles.actionWrapper }, { children: [_jsx(Box, Object.assign({ sx: failedMessageDeliveryStyles.buttonContainer }, { children: _jsx(Link, Object.assign({ component: "button", onClick: () => {
                                            removeFailedMessageFromIndexDb(caseId, failedMessage.xTraceId);
                                            dispatch(CcfAssignmentAction.removeInteractionFailedMessage({ caseId, failedXTraceId: failedMessage.xTraceId }));
                                        } }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('delete') }, { children: _jsx(DeleteOutlined, {}) })) })) })), sendReplyObjectPayloadText &&
                                    _jsx(Box, Object.assign({ sx: failedMessageDeliveryStyles.buttonContainer }, { children: _jsx(Link, Object.assign({ "data-testid": "retryFailedMessage", component: "button", onClick: () => retryFailedMessage() }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('retry') }, { children: _jsx(ReplayTwoTone, {}) })) })) }))] }))] }))] })) })));
}
export default CcfFailedMessageDeliveryBanner;
//# sourceMappingURL=ccf-failed-message-delivery-banner.js.map