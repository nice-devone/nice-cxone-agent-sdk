import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { CcfTypography } from '@nice-devone/ui-controls';
import { agentHiveActions, fetchUserMessages, getThreadMessages, groupMemberDetails } from '../ccf-agent-chat.slice';
import { getStatusIcon } from '../common/helper-methods';
import { AGENT_CHAT_ICON, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
/**
 * Component for ccf agents search member
 * @example - <CcfAgentChatSearchMember />
 * @returns
 */
export const CcfAgentChatSearchMember = ({ member, contentSearch = false, userId = '' }) => {
    var _a;
    const theme = useTheme();
    const hiveStyles = ccfAgentChatStyles(theme);
    const dispatch = useDispatch();
    // const searchedGroupList = useSelector(getSearchedGroups);
    const userStateEnum = (_a = member === null || member === void 0 ? void 0 : member.userState) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    /**
     * Helper function to handle member click
     * @example - handleMemberClick()
     */
    const handleMemberClick = (member) => __awaiter(void 0, void 0, void 0, function* () {
        if (contentSearch) {
            if (member.category === ConversationsCategory.GROUP) {
                const msg = {
                    threadMessages: [],
                };
                dispatch(agentHiveActions.setActiveChat({ memberDetail: member, category: ConversationsCategory.GROUP }));
                dispatch(agentHiveActions.setLoaderVisible(true));
                dispatch(agentHiveActions.setThreadMessages(msg));
                yield dispatch(groupMemberDetails({ groupId: (member === null || member === void 0 ? void 0 : member.groupId) || '' }));
                dispatch(getThreadMessages({ threadId: (member === null || member === void 0 ? void 0 : member.threadId) || '', skip: 0 }));
                dispatch(agentHiveActions.setEditorVisible(true));
                const selectedDetail = {
                    selectCategory: ConversationsCategory.GROUP,
                    selectedId: (member === null || member === void 0 ? void 0 : member.threadId) || (member === null || member === void 0 ? void 0 : member.groupId),
                };
                dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
            }
            else {
                const selectedUsers = {
                    userId: member.userId,
                    userName: member.name || '',
                };
                const reqObj = [userId, member.userId || ''];
                dispatch(fetchUserMessages({ threadMessages: reqObj, skip: 0 }));
                dispatch(agentHiveActions.setActiveChat({ memberDetail: member, category: ConversationsCategory.DIRECT }));
                dispatch(agentHiveActions.setSelectedMembers(selectedUsers));
                dispatch(agentHiveActions.setEditorVisible(true));
                dispatch(agentHiveActions.setLoaderVisible(true));
                const selectedDetail = {
                    selectCategory: ConversationsCategory.DIRECT,
                    selectedId: member.userId || '',
                };
                dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
            }
        }
    });
    return (_jsx(Box, Object.assign({ component: 'li', sx: hiveStyles.searchItemElement, "data-testid": "search-member", tabIndex: 0, onClick: () => handleMemberClick(member) }, { children: _jsxs(Box, Object.assign({ sx: hiveStyles.searchUser }, { children: [(member === null || member === void 0 ? void 0 : member.category) === ConversationsCategory.GROUP
                    ? agentChatIconList[AGENT_CHAT_ICON.CHANNEL]('')
                    : getStatusIcon(userStateEnum), _jsx(CcfTypography, Object.assign({ sx: [hiveStyles.searchUserNameLabel, hiveStyles.ellipsisWithTooltip], title: `${member === null || member === void 0 ? void 0 : member.name}` }, { children: `${member === null || member === void 0 ? void 0 : member.name}` }))] })) })));
};
export default memo(CcfAgentChatSearchMember);
//# sourceMappingURL=ccf-agent-chat-search-member.js.map