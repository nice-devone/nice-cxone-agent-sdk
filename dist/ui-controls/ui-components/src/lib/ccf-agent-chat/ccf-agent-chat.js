import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CcfAgentChatIcon, CcfBox, CcfHeader, useTranslator } from '@nice-devone/ui-controls';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { getApplicationDirection } from '../global.app.slice';
import ccfAgentChatStyles from './ccf-agent-chat.styles';
import { CcfAgentChatContactsSection } from './ccf-agent-chat-contacts-section/ccf-agent-chat-contacts-section';
import { CcfAgentChatMessagesSection } from './ccf-agent-chat-messages-section/ccf-agent-chat-messages-section';
import { fetchRecentChatThreads, getAllFavorites, getAllGroupChat, getChannelId, getFavorites, getGroups, getRecentThreads, getThreadMessage, getUnreadMessages, updateUserSubscription, } from './ccf-agent-chat.slice';
import CcfAgentChatSearch from './ccf-agent-chat-search/ccf-agent-chat-search';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { getVisualNotification } from '../ccf-settings/ccf-notification-settings.slice';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-agent-chat');
/**
 * Component for ccf agent chat
 * @example - <CcfAgentChat />
 * @returns
 */
export function CcfAgentChatContainer(props) {
    var _a, _b;
    const { isAppSpace = false, isConversationsStandAlone = false } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const breakpoint900 = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.md; // Define your breakpoint value here
    const styles = ccfAgentChatStyles(theme, isConversationsStandAlone);
    const appDirection = useSelector(getApplicationDirection);
    const [, setSelectedChat] = useState(null);
    const [, setFilteredMessages] = useState([]);
    //const userList = useSelector(getUsers); //users list for agent hive
    const favoritesList = useSelector(getFavorites); //favorites list
    const groupsList = useSelector(getGroups); //groups list
    const recents = useSelector(getRecentThreads); //messages list
    const threadMessages = useSelector(getThreadMessage); //messages for particular thread
    const userInfo = CXoneUser.instance.getUserInfo();
    ccfLogger.info('ccf-agent-chat', appDirection);
    const parentRef = useRef(null);
    const [isSmView, setIsSmView] = useState(false);
    const visualNotification = useSelector(getVisualNotification);
    useEffect(() => {
        const observer = new ResizeObserver((_) => {
            var _a;
            const { width } = ((_a = parentRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) || { width: 0 }; // Get element width directly
            const isSmallView = width < breakpoint900;
            setIsSmView(isSmallView);
        });
        if (parentRef.current) {
            observer.observe(parentRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'granted' && visualNotification.display && isConversationsStandAlone) {
            showVisualBrowserNotification(visualNotification);
        }
    }, [visualNotification]);
    /**
    * @example - showVisualBrowserNotification(details);
    * @returns
    */
    const showVisualBrowserNotification = (details) => {
        let displayMessage = '';
        displayMessage += details.from ? `\n${translate('ani')}: ${details.from}` : '';
        displayMessage += details.customerName ? `\n${translate('customer')}: ${details.customerName}` : '';
        displayMessage += details.skillName ? `\n${translate('skill')}: ${details.skillName}` : '';
        displayMessage += details.contactId ? `\n${translate('contactID')}: ${details.contactId}` : '';
        displayMessage += details.message ? `\n${details.message}` : '';
        const eventArgs = {};
        eventArgs.detail = {
            title: translate(details.title),
            message: displayMessage,
        };
        const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_VISUAL_NOTIFICATION, eventArgs);
        window.dispatchEvent(customEvent);
    };
    useEffect(() => {
        var _a;
        favoritesList && ((_a = favoritesList[0]) === null || _a === void 0 ? void 0 : _a.members) && dispatch(updateUserSubscription({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId, subscribe: true,
            agentIds: favoritesList[0].members.map((user) => user.userId) }));
    }, [favoritesList]);
    useEffect(() => {
        recents && dispatch(updateUserSubscription({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId, subscribe: true,
            agentIds: recents.filter(thread => thread.category !== ConversationsCategory.GROUP).map((user) => user.userId || '') }));
    }, [recents]);
    /**
     * function to handle chat selection from contacts
     * @example - handleChatSelection()
     */
    const handleChatSelection = (contact, messages) => {
        setSelectedChat(contact);
        setFilteredMessages(messages);
    };
    /**
     * Checks if the agentHiveChannelInfo object in localStorage contains a channelId.
     * @returns True if channelId exists, otherwise false.
     * @example - hasAgentHiveChannelId()
     */
    const hasAgentHiveChannelId = () => {
        try {
            const channelInfo = LocalStorageHelper.getItem(StorageKeys.AGENT_HIVE_CHANNEL_INFO, true);
            if (!channelInfo)
                return false;
            const parsed = JSON.parse(channelInfo);
            return !!(parsed === null || parsed === void 0 ? void 0 : parsed.channelId);
        }
        catch (_a) {
            return false;
        }
    };
    useEffect(() => {
        dispatch(getAllFavorites({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
        dispatch(getAllGroupChat({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
        dispatch(fetchRecentChatThreads({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
        !hasAgentHiveChannelId() && dispatch(getChannelId());
        dispatch(getUnreadMessages({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
    }, []);
    return (_jsx(Box, Object.assign({ sx: styles.AgentChatMainContainer, ref: parentRef }, { children: isSmView ? (_jsx(CcfAgentChatContactsSection, { favorites: favoritesList, groups: groupsList, recents: recents, messages: threadMessages, userId: userInfo.userId, isSmView: isSmView, isAppSpace: isAppSpace })) : (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ "data-testid": 'header-text', sx: styles.headerText }, { children: _jsxs(Box, Object.assign({ "data-testid": 'header-content', sx: styles.headerContent }, { children: [!isConversationsStandAlone && _jsx(CcfHeader, { LeftIcon: _jsx(CcfAgentChatIcon, { color: 'secondary', viewBox: '0 0 22 23', fontSize: 'small' }), headerText: translate('conversations') }), _jsx(CcfBox, Object.assign({ component: 'div', "data-testid": 'agent-search', sx: styles.searchBox }, { children: _jsx(CcfAgentChatSearch, { contentSearch: true, "aria-label": translate('searchContacts') }) }))] })) })), _jsxs(Box, Object.assign({ sx: styles.AgentChatContainer }, { children: [_jsx(CcfAgentChatContactsSection, { favorites: favoritesList, groups: groupsList, recents: recents, messages: threadMessages, onChatSelect: handleChatSelection, userId: userInfo.userId, isSmView: isSmView, isAppSpace: isAppSpace }), _jsx(CcfAgentChatMessagesSection, { isSmView: isSmView })] }))] })) })));
}
export default CcfAgentChatContainer;
//# sourceMappingURL=ccf-agent-chat.js.map