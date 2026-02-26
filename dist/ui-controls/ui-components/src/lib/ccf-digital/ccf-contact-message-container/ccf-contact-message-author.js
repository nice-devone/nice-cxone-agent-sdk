import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { getDigitalContactDetailsByCaseId, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfPopoverTag from '../../ccf-popover-tag/ccf-popover-tag';
import { useTranslator } from '@nice-devone/ui-controls';
/**
 * renders the author of message
 * @param props - CcfContactMessageAuthorProps
 * @example <CcfContactMessageAuthor />
 * @returns
 */
const CcfContactMessageAuthor = (props) => {
    const { name, direction, styles, message, isPreviousCaseMessage, isAuthorNameRemoved, isNextCaseMessage } = props;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const messageAuthorStyle = isAuthorNameRemoved ? Object.assign(Object.assign({}, styles.messageAuthor), styles.anonymousAuthorName) : styles.messageAuthor;
    const [translate] = useTranslator();
    const inboundOutboundMessageAuthorStyle = direction === 'inbound' ? styles.inboundMessageAuthor : styles.outboundMessageAuthor;
    return (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, inboundOutboundMessageAuthorStyle), messageAuthorStyle) }, { children: _jsxs("div", Object.assign({ className: 'placeIcontoRight', style: { display: 'inline-flex' } }, { children: [_jsx("div", { children: isAuthorNameRemoved ? translate('anonymous') : name }), _jsx(CcfPopoverTag, { author: isAuthorNameRemoved ? translate('anonymous') : name, isPrivateChannel: selectedDigitalContactDetails.channel.isPrivate, id: 'messageTag', message: message, isPreviousCaseMessage: isPreviousCaseMessage, isNextCaseMessage: isNextCaseMessage })] })) })));
};
export default CcfContactMessageAuthor;
//# sourceMappingURL=ccf-contact-message-author.js.map