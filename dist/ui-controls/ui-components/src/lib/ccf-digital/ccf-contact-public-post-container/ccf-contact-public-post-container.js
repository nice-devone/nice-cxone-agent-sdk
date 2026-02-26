import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { Box, useTheme } from '@mui/material';
import CcfContactPublicPostContainerStyle from './ccf-contact-public-post-container-styles';
import CcfContactMessagesTree from './ccf-contact-messages-tree';
import CcfContactPublicMessageDraft from './ccf-contact-public-messagedraft';
import { getInteractionFailedMessagesForCase, getDraftMessageNoteForSelectedCase } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useSelector } from 'react-redux';
import { CcfContactMessageNote } from '../../ccf-interaction-space/ccf-contact-message-note/ccf-contact-message-note';
import { userInfoSelector } from '../../ccf-agent-state/ccf-agent-state.slice';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import CcfFailedMessageDeliveryBanner from '../../ccf-failed-message-delivery-banner/ccf-failed-message-delivery-banner';
/**
 * renders the message container for public channels
 * @param props - CcfContactPublicPostContainerProps
 * @example <CcfContactPublicPostContainer />
 * @returns
 */
const CcfContactPublicPostContainer = (props) => {
    const { messageDrafts, sender, contactDetails, lastInboundMessage } = props;
    const theme = useTheme();
    const publicPostContainerStyles = CcfContactPublicPostContainerStyle(theme);
    const userInfo = useSelector(userInfoSelector);
    const conversationNote = useSelector(getDraftMessageNoteForSelectedCase(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId, contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.interactionId));
    const failedInteractionMessages = useSelector(getInteractionFailedMessagesForCase(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId));
    return (_jsxs(Box, Object.assign({ sx: publicPostContainerStyles.publicPostContentWrapper }, { children: [_jsx(CcfContactMessagesTree, { sender: sender }), messageDrafts === null || messageDrafts === void 0 ? void 0 : messageDrafts.map((messageDraft) => {
                return _jsx(CcfContactPublicMessageDraft, { messageDraft: messageDraft, sender: `${sender}`, styles: publicPostContainerStyles }, messageDraft.id);
            }), conversationNote && conversationNote.status && conversationNote.noteId === '' &&
                _jsx(CcfContactMessageNote, { messageId: lastInboundMessage, isReadOnly: false, userDetails: userInfo, noteContent: conversationNote.content || '' }), failedInteractionMessages && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.length) > 0 && (failedInteractionMessages === null || failedInteractionMessages === void 0 ? void 0 : failedInteractionMessages.map((message) => {
                return _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfFailedMessageDeliveryBanner' }, { children: _jsx(CcfFailedMessageDeliveryBanner, { caseId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId, failedMessage: message, messageAuthor: message.messageAuthor, wysiwygEnabled: message === null || message === void 0 ? void 0 : message.wysiwygEnabled }) }));
            }))] })));
};
export default memo(CcfContactPublicPostContainer);
//# sourceMappingURL=ccf-contact-public-post-container.js.map