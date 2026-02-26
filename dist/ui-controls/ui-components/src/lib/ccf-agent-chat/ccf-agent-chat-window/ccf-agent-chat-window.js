import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import CcfAgentChatMessage from '../ccf-agent-chat-message/ccf-agent-chat-message';
import { CcfBox, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { AGENT_CHAT_ICON, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import CcfAgentChatNewChatIcon from '../ccf-agent-chat-icons/ccf-agent-chat-new-chat-icon';
import { getEditorStatus, agentHiveActions, getActiveChat, getApiCall, getGroupActivities } from '../ccf-agent-chat.slice';
import { useDispatch, useSelector } from 'react-redux';
import { GroupActionType } from '../common/interfaces';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
import { AGENT_GROUP_CHAT_ICON, agentChatGroupChatList } from '../ccf-agent-chat-icons/ccf-agent-chat-group-chat-icons';
import { DateTimeUtilService } from '@nice-devone/core-sdk';
/**
 * Component for ccf agents chat window
 * @example - <CcfAgentChatWindow />
 * @returns
 */
export const CcfAgentChatWindow = ({ messages }) => {
    var _a, _b, _c;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const isEditorOpen = useSelector(getEditorStatus);
    const apiCall = useSelector(getApiCall);
    const activeChat = useSelector(getActiveChat);
    const groupActivities = useSelector(getGroupActivities);
    const currentChatKey = ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.threadId) || ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _b === void 0 ? void 0 : _b.groupId);
    const [expandedActionId, setExpandedActionId] = useState(null);
    /**
     * function to handle agent new chat click
     * @example - handleNewChat()
     */
    const handleNewChat = () => {
        dispatch(agentHiveActions.setEditorVisible(true));
        const defaultGroup = {
            groupId: '',
            groupName: '',
            members: [],
            category: ConversationsCategory.NEWCHAT,
        };
        dispatch(agentHiveActions.setActiveChat(defaultGroup));
    };
    /**
     * function to show date
     * @example - formatDate()
     */
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        // Check if date is today
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }
        // Check if date is yesterday
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        // Format other dates
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
    };
    /**
     * Renders the screen for starting a new chat when there are no messages.
     * @example
     * renderNewChatScreen()
     * @returns JSX.Element - The UI for the new chat screen.
     */
    const renderNewChatScreen = () => {
        if (activeChat.category === ConversationsCategory.NEWCHAT) {
            return null;
        }
        return activeChat.category === '' ? (_jsxs(Box, Object.assign({ sx: styles.AgentChatNoMessageWindow, "data-testid": "agent-chat-no-message" }, { children: [_jsx(Typography, Object.assign({ sx: styles.AgentNoMessageIcon }, { children: agentChatIconList[AGENT_CHAT_ICON.NO_MESSAGE]('') })), _jsx(Typography, Object.assign({ sx: styles.AgentNoMessage }, { children: translate('noMessages') })), _jsxs(CcfBox, Object.assign({ sx: styles.noMessageContent }, { children: [_jsx(Typography, Object.assign({ sx: styles.AgentNoMessage }, { children: translate('createNewGroup') })), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AddMemberIcon), { padding: '0 8px' }) }, { children: agentChatIconList[AGENT_CHAT_ICON.PLUS]('') })), _jsx(Typography, Object.assign({ sx: styles.AgentNoMessage }, { children: translate('createNewGroupContent') }))] })), _jsx(Typography, Object.assign({ sx: styles.AgentNoMessage }, { children: translate('or') })), _jsxs(Box, Object.assign({ sx: styles.AgentNewMessage, tabIndex: 0, role: "button", onClick: handleNewChat, "data-testid": "agent-new-chat" }, { children: [_jsx(CcfBox, Object.assign({ sx: styles.AgentNewChat, "data-testid": 'new-chat' }, { children: _jsx(CcfAgentChatNewChatIcon, { sx: styles.AgentNewChatIcon }) })), _jsx(Box, Object.assign({ sx: { marginLeft: 1 } }, { children: translate('directMessage') }))] }))] }))) : null;
    };
    /**
     * Builds a group action text such as:
     * - "John added Mark to the group."
     * - "John removed Mark, Alex and 3 others from the group."
     *
     * @param payload - The message payload containing action and members info.
     * @returns A formatted group activity message string.
     *
     * @example
     * ```ts
     * getTranslatedGroupText({
     *   action: "added",
     *   members: [...],
     *   ownerUserName: "John",
     *   groupName: "Team"
     * });
     * ```
    */
    const getTranslatedGroupText = (payload) => {
        const { action, members = [], ownerUserName, groupName } = payload;
        const count = members.length;
        const [a, b] = members;
        const actionText = action === GroupActionType.ADD ? translate('group_added') : translate('group_removed');
        const direction = action === GroupActionType.ADD ? translate('group_to') : translate('group_from');
        if (action === GroupActionType.RENAME) {
            return `${ownerUserName} ${translate('group_renamed')} ${groupName}`;
        }
        if (action === GroupActionType.LEAVE) {
            return `${ownerUserName} ${translate('group_left')}`;
        }
        const andText = translate('group_and');
        const othersText = translate('group_others');
        if (count === 0)
            return '';
        if (count === 1) {
            return `${ownerUserName} ${actionText} ${a === null || a === void 0 ? void 0 : a.userName} ${direction}`;
        }
        if (count === 2) {
            return `${ownerUserName} ${actionText} ${a === null || a === void 0 ? void 0 : a.userName} ${andText} ${b === null || b === void 0 ? void 0 : b.userName} ${direction}`;
        }
        return `${ownerUserName} ${actionText} ${a === null || a === void 0 ? void 0 : a.userName}, ${b === null || b === void 0 ? void 0 : b.userName} ${andText} ${count - 2} ${othersText} ${direction}`;
    };
    const hasThreadMessages = Array.isArray(messages) && messages.length > 0 && Array.isArray((_c = messages === null || messages === void 0 ? void 0 : messages[0]) === null || _c === void 0 ? void 0 : _c.data);
    const hasGroupMessages = currentChatKey && (groupActivities === null || groupActivities === void 0 ? void 0 : groupActivities[currentChatKey]) && groupActivities[currentChatKey].length > 0;
    return isEditorOpen && (hasThreadMessages || hasGroupMessages) ? (_jsx(_Fragment, { children: (() => {
            var _a, _b;
            const groupActivitiesList = currentChatKey && groupActivities && typeof groupActivities === 'object'
                ? groupActivities[currentChatKey] || [] : [];
            const normalizedGroupActivities = groupActivitiesList.map((activity) => {
                var _a, _b, _c, _d;
                return ({
                    id: (_a = activity.id) !== null && _a !== void 0 ? _a : Date.now().toString(),
                    messageContent: (_b = activity.messageContent) !== null && _b !== void 0 ? _b : { text: '', icon: '', action: '' },
                    createdAt: (_d = (_c = activity.createdAt) !== null && _c !== void 0 ? _c : activity.timeStamp) !== null && _d !== void 0 ? _d : new Date().toISOString(),
                    isGroupAction: true,
                });
            });
            const threadMsgs = (_b = (_a = messages === null || messages === void 0 ? void 0 : messages[0]) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : [];
            const combinedMessages = [...threadMsgs, ...normalizedGroupActivities];
            const uniqueMessages = combinedMessages.filter((msg, index, self) => index === self.findIndex((m) => {
                var _a, _b, _c, _d;
                return ((_a = (m.messageContent)) === null || _a === void 0 ? void 0 : _a.text) === ((_b = (msg.messageContent)) === null || _b === void 0 ? void 0 : _b.text) &&
                    ((_c = (m.messageContent)) === null || _c === void 0 ? void 0 : _c.icon) === ((_d = (msg.messageContent)) === null || _d === void 0 ? void 0 : _d.icon) &&
                    DateTimeUtilService.stripToSeconds(m.createdAt) === DateTimeUtilService.stripToSeconds(msg.createdAt);
            }));
            const orderedMessages = uniqueMessages.slice().sort((a, b) => {
                var _a, _b, _c, _d;
                const aDate = new Date((_b = (_a = a.createdAt) !== null && _a !== void 0 ? _a : a.timeStamp) !== null && _b !== void 0 ? _b : 0).getTime();
                const bDate = new Date((_d = (_c = b.createdAt) !== null && _c !== void 0 ? _c : b.timeStamp) !== null && _d !== void 0 ? _d : 0).getTime();
                return aDate - bDate;
            });
            const processedMessages = orderedMessages.filter((m) => { var _a; return ((_a = m === null || m === void 0 ? void 0 : m.messageContent) === null || _a === void 0 ? void 0 : _a.text) || (m === null || m === void 0 ? void 0 : m.attachments) || m.isGroupAction; });
            // Group by date
            const messagesByDate = processedMessages.reduce((groups, message) => {
                var _a, _b;
                const dateKey = new Date((_b = (_a = message.readAt) !== null && _a !== void 0 ? _a : message.createdAt) !== null && _b !== void 0 ? _b : message.timeStamp).toDateString();
                if (!groups[dateKey])
                    groups[dateKey] = [];
                groups[dateKey].push(message);
                return groups;
            }, {});
            // Render grouped messages
            return Object.keys(messagesByDate).map((date) => {
                var _a, _b, _c, _d, _e, _f;
                return (_jsxs(React.Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.AgentMessageDate }, { children: [_jsx(Box, { sx: styles.AgentMessageDateHRline }), _jsx(Paper, Object.assign({ elevation: 0, sx: { padding: 1, textAlign: 'center' } }, { children: _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatNormalText), { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.header }) }, { children: formatDate(String((_f = (_d = (_c = messagesByDate[date][0]) === null || _c === void 0 ? void 0 : _c.readAt) !== null && _d !== void 0 ? _d : (_e = messagesByDate[date][0]) === null || _e === void 0 ? void 0 : _e.createdAt) !== null && _f !== void 0 ? _f : '0')) })) })), _jsx(Box, { sx: styles.AgentMessageDateHRline })] })), messagesByDate[date].map((message) => {
                            var _a, _b, _c, _d;
                            const mc = message.messageContent;
                            const members = 'members' in mc && Array.isArray(mc.members) ? mc.members : [];
                            const canExpand = members.length > 2;
                            const isExpanded = expandedActionId === message.id;
                            return ('isGroupAction' in message && message.isGroupAction) ? (_jsxs(Box, Object.assign({ sx: styles.GroupActionContainer }, { children: [_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.GroupActionSummary), { cursor: canExpand ? 'pointer' : 'default' }), onClick: () => {
                                            var _a;
                                            if (canExpand) {
                                                setExpandedActionId(isExpanded ? null : ((_a = message.id) !== null && _a !== void 0 ? _a : null));
                                            }
                                        } }, { children: [(_b = agentChatGroupChatList[(_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.icon]) === null || _b === void 0 ? void 0 : _b.call(agentChatGroupChatList, ''), _jsx(CcfTypography, Object.assign({ sx: styles.GroupActivityText }, { children: message.messageContent && getTranslatedGroupText(message.messageContent) })), canExpand &&
                                                (isExpanded
                                                    ? (_c = agentChatGroupChatList[AGENT_GROUP_CHAT_ICON.CHEVRON_UP]) === null || _c === void 0 ? void 0 : _c.call(agentChatGroupChatList, '')
                                                    : (_d = agentChatGroupChatList[AGENT_GROUP_CHAT_ICON.CHEVRON_DOWN]) === null || _d === void 0 ? void 0 : _d.call(agentChatGroupChatList, ''))] })), isExpanded && canExpand && (_jsx(Box, Object.assign({ sx: styles.GroupActionMembersList }, { children: members.map((member) => (_jsx(Box, { children: member.userName }, member.id))) })))] }), message.id)) : (_jsx(CcfAgentChatMessage, { message: message }, message.id));
                        }), !apiCall && (date === Object.keys(messagesByDate)[Object.keys(messagesByDate).length - 1] && (_jsx("div", { ref: el => {
                                if (el && !apiCall) {
                                    el.scrollIntoView();
                                }
                            }, tabIndex: -1, "aria-hidden": "true", style: { height: 0, outline: 'none' }, "data-testid": "last-message-anchor" })))] }, `date-${date}`));
            });
        })() })) : renderNewChatScreen();
};
export default CcfAgentChatWindow;
//# sourceMappingURL=ccf-agent-chat-window.js.map