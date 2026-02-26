import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, useTheme } from '@mui/material';
import { CcfTypography } from '@nice-devone/ui-controls';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { AGENT_CHAT_ICON, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { agentHiveActions, getActiveChat, getSelectedMembers } from '../ccf-agent-chat.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { generateColorFromName } from '../common/helper-methods';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
/**
 * Component for selected contacts from search box
 * @example - <CcfAgentChatSelectedContact />
 * @returns
 */
export const CcfAgentChatSelectedContact = ({ mode }) => {
    var _a;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const membersList = useSelector(getSelectedMembers);
    const activeChat = useSelector(getActiveChat);
    const dispatch = useDispatch();
    useEffect(() => {
        var _a;
        if (mode !== 'create' && (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.GROUP) {
            dispatch(agentHiveActions.setSelectedMembers(((_a = activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.members) || []));
        }
    }, [(_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.members]);
    const membersWithColors = useMemo(() => [...membersList].sort((a, b) => a.userName.localeCompare(b.userName)).map(member => ({
        member: member,
        color: generateColorFromName(member.userName),
    })), [membersList]);
    /**
     * Checks if the given userId matches the current user's userId from local storage.
     * @example - isCurrentUser()
     * @param userId - The user ID to compare.
     * @returns True if the userId matches the current user's userId, otherwise false.
     */
    const isCurrentUser = (userId) => {
        const userInfo = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
        return (userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId) === userId;
    };
    /**
     * function to remove added member
     * @example - handleRemoveMember()
     */
    const handleRemoveMember = (userId) => {
        const updatedMembers = membersList.filter(member => member.userId !== userId);
        dispatch(agentHiveActions.setSelectedMembers(updatedMembers));
    };
    return (_jsx(_Fragment, { children: membersWithColors.map(({ member, color }) => (_jsxs(Box, Object.assign({ tabIndex: 0, display: "flex", alignItems: "flex-start", flexDirection: "row", sx: { marginTop: '12px' } }, { children: [_jsx(Avatar, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentNameAvatar), { backgroundColor: color, marginTop: '4px' }) }, { children: member.userName.split(' ').map(name => name[0]).join('').toUpperCase() })), _jsx(Box, Object.assign({ sx: styles.AgentMessage }, { children: _jsx(Box, Object.assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.AgentChatExtraStrongText }, { children: member.userName })) })) })), _jsx(Box, Object.assign({ sx: styles.CrossIcon }, { children: !isCurrentUser(member.userId) && (_jsx(Box, Object.assign({ tabIndex: 0, role: "button", onClick: () => handleRemoveMember(member.userId), onKeyDown: (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleRemoveMember(member.userId);
                                e.preventDefault();
                            }
                        } }, { children: agentChatIconList[AGENT_CHAT_ICON.CROSS_ICON]('') }))) }))] }), member.userId))) }));
};
export default memo(CcfAgentChatSelectedContact);
//# sourceMappingURL=ccf-agent-chat-selected-contact.js.map