import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Avatar, useTheme } from '@mui/material';
import { CcfTypography } from '@nice-devone/ui-controls';
import { formatTimestamp } from '@nice-devone/common-sdk';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { generateColorFromName } from '../common/helper-methods';
import { getSelectedMembers, getUserAvailability } from '../ccf-agent-chat.slice';
import { getApplicationLocale } from '../../global.app.slice';
import { AGENT_CHAT_STATUS, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import parse from 'html-react-parser';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import CcfDigitalAttachments from '../../ccf-interaction-space/ccf-digital-attachments/ccf-digital-attachments';
import { CcfAttachmentJustify } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-justify';
import { AttachmentPreviewVariant } from '../../ccf-interaction-space/ccf-digital-attachments/model/ccf-attachment-preview-variant';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
/**
* Component for ccf agents chat messages
* @example - <CcfAgentChatMessage />
* @returns
*/
export const CcfAgentChatMessage = (message) => {
    var _a, _b, _c, _d, _e, _f;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const locale = useSelector(getApplicationLocale);
    const membersList = useSelector(getSelectedMembers);
    // Create a local reference to the message to avoid direct mutation of Redux state
    const currentMessage = message === null || message === void 0 ? void 0 : message.message;
    // Create a mutable copy of attachments array to allow blobUrl to be stored on attachment objects
    const mutableAttachments = useMemo(() => { var _a; return ((_a = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.attachments) === null || _a === void 0 ? void 0 : _a.map(attachment => (Object.assign({}, attachment)))) || []; }, [currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.attachments]);
    const authorUser = currentMessage.authorUser;
    const authorUserName = [authorUser.firstName, authorUser.surname].filter(Boolean).join(' ').trim();
    const userAvailabilityStates = useSelector(getUserAvailability); //availability states for users
    const userInfo = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    const fileUploadFTEnabled = isFeatureEnabled("release-conversations-file-upload-AW-48053" /* FeatureToggles.FILE_UPLOAD_FEATURE_TOGGLE */);
    const backgroundColor = useMemo(() => generateColorFromName(authorUserName || ''), [authorUserName || 0]);
    const parseHtmlOptions = {
        replace: (domNode) => {
            try {
                //domNode.attribs.style = domNode.attribs.style +'display: table; width:100%; tableLayout: auto; border-collapse: collapse';
                return domNode;
            }
            catch (error) {
                console.error('parseHtmlOptions', `error while parsing html options - ${JSON.stringify(error)}`);
            }
        },
    };
    /**
     * Helper function to get the icon based on status
     * @param status - status: available
     * @example - getAgentStatusIcon('available')
     */
    const getAgentIcon = (status) => {
        const lowercaseStatus = status === null || status === void 0 ? void 0 : status.toLowerCase();
        const iconMap = {
            [AGENT_CHAT_STATUS.ONLINE]: AGENT_CHAT_STATUS.ONLINE,
            [AGENT_CHAT_STATUS.OFFLINE]: AGENT_CHAT_STATUS.OFFLINE,
            [AGENT_CHAT_STATUS.STATUS_UNKNOWN]: AGENT_CHAT_STATUS.STATUS_UNKNOWN,
            default: AGENT_CHAT_STATUS.STATUS_UNKNOWN,
        };
        const iconKey = lowercaseStatus !== undefined ? iconMap[lowercaseStatus] : iconMap.default;
        if (!agentChatIconList[iconKey]) {
            return agentChatIconList.default('');
        }
        return agentChatIconList[iconKey]('');
    };
    /**
     * Helper function to get status
     * @example - getStatusIcon()
     */
    const getStatusIcon = (userId) => {
        const status = membersList.find((entry) => entry.userId === userId);
        if (userAvailabilityStates[userId]) {
            return getAgentIcon((userAvailabilityStates[userId].toLocaleLowerCase()));
        }
        return getAgentIcon(((status === null || status === void 0 ? void 0 : status.userState) || 'status_unknown'));
    };
    return (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatMessageBox), styles.AgentChatMessageLeft), "data-testid": "agent-chat-message" }, { children: [_jsxs(Box, Object.assign({ sx: { position: 'relative', paddingRight: '2px' } }, { children: [(authorUser.incontactId === userInfo.userId) && (_jsx(Box, { sx: Object.assign({}, styles.AgentChatCurrentUser) })), _jsx(Avatar, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentNameAvatar), { backgroundColor }) }, { children: authorUserName === null || authorUserName === void 0 ? void 0 : authorUserName.split(' ').map((name) => name[0]).join('').toUpperCase() })), _jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatStatus), styles.AgentChatStatusIcon) }, { children: getStatusIcon(authorUser.incontactId) }))] })), _jsxs(Box, Object.assign({ sx: styles.AgentMessage }, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.AgentChatStrongText }, { children: authorUserName })), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatNormalText), styles.AgentMessageTime) }, { children: formatTimestamp(locale, (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.readAt) || (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.createdAt)) }))] })), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatNormalText), { maxWidth: '100%' }) }, { children: parse(((_a = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.messageContent) === null || _a === void 0 ? void 0 : _a.text) || ((_c = (_b = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.messageContent) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.text) || '', parseHtmlOptions) })), fileUploadFTEnabled && mutableAttachments && mutableAttachments.length > 0 && (_jsx(Box, Object.assign({ sx: { '& > *': { marginLeft: '0px !important' } } }, { children: _jsx(CcfDigitalAttachments, { attachments: mutableAttachments, justifyContent: CcfAttachmentJustify.LEFT, variant: AttachmentPreviewVariant.COMPACT, hideDownload: false, isPreviousCaseMessage: false, isNextCaseMessage: false, messageSubject: ((_d = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.messageContent) === null || _d === void 0 ? void 0 : _d.text) || ((_f = (_e = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.messageContent) === null || _e === void 0 ? void 0 : _e.payload) === null || _f === void 0 ? void 0 : _f.text) || '', caseId: currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.idOnExternalPlatform }) })))] }))] })));
};
export default CcfAgentChatMessage;
//# sourceMappingURL=ccf-agent-chat-message.js.map