import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import { CcfTypography } from '@nice-devone/ui-controls';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { AGENT_CHAT_STATUS, agentChatIconList, AGENT_CHAT_ICON } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { getUserAvailability, getNotify, getUnreadMessagesState, agentHiveActions } from '../ccf-agent-chat.slice';
/**
 * Component for ccf agents name
 * @example - <CcfAgentContact />
 * @returns
 */
export const CcfAgentContact = ({ showIndicator = false, agent, selected }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = ccfAgentChatStyles(theme);
    const userAvailabilityStates = useSelector(getUserAvailability); //messages for particular thread
    const notification = useSelector(getNotify);
    const unreadMessages = useSelector(getUnreadMessagesState);
    const [unRead, setUnRead] = useState(0);
    /**
   * Returns the unread messages count for a given user from the provided mock data.
   *
   * @param userId - The user ID to search for in the unread messages data.
   * @param mockDataUnreadMessages - An array of objects containing user IDs and their unread messages count.
   * @returns The number of unread messages for the specified user, or 0 if not found.
   *
   * @example
   * const count = getUnreadMessagesCount('user123', mockDataUnreadMessages);
   * console.log(count); // 3
   */
    const getUnreadMessagesCount = (userId, mockDataUnreadMessages) => {
        for (const item of mockDataUnreadMessages) {
            if (!item.group && item.senderId === userId) {
                return item.count;
            }
            if (item.group && item.threadId === userId) {
                return item.count;
            }
        }
        return 0;
    };
    /**
     * Helper function to get user id
     * @example - getDisplayName()
     */
    const getUserId = (agent) => {
        if (isMember(agent)) {
            return agent.userId;
        }
        else if (isGroupAgent(agent)) {
            return (agent === null || agent === void 0 ? void 0 : agent.threadId) || '';
        }
        else if ('userId' in agent && agent.userId) {
            return agent.userId;
        }
        return '';
    };
    useEffect(() => {
        var _a, _b;
        const userId = agent ? getUserId(agent) : '';
        const id = userId ? notification[userId] : undefined;
        const count = getUnreadMessagesCount(userId, Array.isArray(unreadMessages) ? unreadMessages : []);
        if (count > 0) {
            setUnRead(((_a = id === null || id === void 0 ? void 0 : id.unReadCount) !== null && _a !== void 0 ? _a : 0) + count);
            const updatedNotify = Object.assign(Object.assign({}, notification), { [userId]: {
                    unReadCount: (((_b = notification[userId]) === null || _b === void 0 ? void 0 : _b.unReadCount) || 0) + count,
                } });
            dispatch(agentHiveActions.setNotify(updatedNotify));
        }
        return () => {
            if (id) {
                setUnRead(id.unReadCount);
            }
        };
    }, []);
    useEffect(() => {
        const userId = agent ? getUserId(agent) : '';
        const id = userId ? notification[userId] : undefined;
        if (id) {
            setUnRead(id === null || id === void 0 ? void 0 : id.unReadCount);
        }
        else {
            setUnRead(0);
        }
    }, [agent, notification]);
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
        return agentChatIconList[iconKey]('');
    };
    /**
     * Helper function to get the icon based on status
     * @example - getGroupIcon()
     */
    const getGroupIcon = () => {
        if (selected) {
            return agentChatIconList[AGENT_CHAT_ICON.CHANNEL_WHITE]('');
        }
        else {
            return agentChatIconList[AGENT_CHAT_ICON.CHANNEL]('');
        }
    };
    /**
     * Helper function to check group
     * @example - isGroupAgent()
     */
    const isGroupAgent = (agent) => {
        return 'groupId' in agent;
    };
    /**
     * Helper function to check member
     * @example - isMember()
     */
    const isMember = (agent) => {
        return 'firstName' in agent && 'lastName' in agent;
    };
    /**
     * Helper function to get status
     * @example - getStatusIcon()
     */
    const getStatusIcon = (agent) => {
        if (isMember(agent)) {
            return getAgentIcon(userAvailabilityStates[agent.userId] ? userAvailabilityStates[agent.userId] : agent.userState);
        }
        if (isGroupAgent(agent)) {
            return getGroupIcon();
        }
        return getAgentIcon(undefined);
    };
    /**
     * Helper function to get display name
     * @example - getDisplayName()
     */
    const getDisplayName = (agent) => {
        if (isMember(agent)) {
            return (agent.firstName || agent.lastName)
                ? `${agent.firstName} ${agent.lastName}`.trim()
                : agent.name || '';
        }
        if (isGroupAgent(agent)) {
            return agent.groupName;
        }
        return `${agent.userName}`;
    };
    if (!agent) {
        return null;
    }
    return (_jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentNameIcon), { justifyContent: 'flex-start', width: '100%' }) }, { children: [_jsx(Box, Object.assign({ sx: styles.AgentChatStatus }, { children: getStatusIcon(agent) })), _jsx(CcfTypography, Object.assign({ noWrap: true, sx: Object.assign(Object.assign(Object.assign(Object.assign({}, styles.AgentDisplayName), styles.AgentChatText), styles.AgentChatNormalText), ((showIndicator && unRead > 0) ? styles.AgentChatStrongText : {})) }, { children: getDisplayName(agent) })), (showIndicator && unRead > 0) && (_jsx(CcfTypography, Object.assign({ sx: styles.UnReadText }, { children: unRead })))] })));
};
export default memo(CcfAgentContact);
//# sourceMappingURL=ccf-agent-contacts.js.map