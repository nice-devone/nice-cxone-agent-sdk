import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AGENT_CHAT_ICON, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { CcfAccordion, CcfAccordionDetails, CcfAccordionSummary, CcfBox, CcfDoubleArrowIcon, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useTheme } from '@mui/material';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import CcfAgentChatSearch from '../ccf-agent-chat-search/ccf-agent-chat-search';
import CcfAgentChatNewChatIcon from '../ccf-agent-chat-icons/ccf-agent-chat-new-chat-icon';
import { CcfAgentChatMessagesSection } from '../ccf-agent-chat-messages-section/ccf-agent-chat-messages-section';
import CcfAgentContact from '../ccf-agent-contacts/ccf-agent-contacts';
import CcfAgentChatGroupContainer from '../ccf-agent-chat-group-container/ccf-agent-chat-group-container';
import { agentHiveActions, groupMemberDetails, fetchUserMessages, getThreadMessages, getSelectedDetail, getActiveChat, getContentSearchState, clearUnreadMessages, getUnreadMessagesState } from '../ccf-agent-chat.slice';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
/**
 * Component for ccf agent chat contacts section
 * @example - <CcfAgentChatContactsSection />
 * @returns
 */
export function CcfAgentChatContactsSection(props) {
    var _a;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const dispatch = useDispatch();
    const { favorites, groups, userId, isSmView, recents, isAppSpace } = props;
    const [translate] = useTranslator();
    const [isPopoverMenuOpen, setIsPopoverMenuOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isMessagesSectionShow, setIsMessagesSectionShow] = useState(false);
    const [selectCategory, setCategory] = useState('');
    const favoritesMembers = favorites.flatMap((favorite) => favorite.members) || [];
    const selectedDetail = useSelector(getSelectedDetail);
    const [updatedDetail, setUpdatedDetail] = useState({});
    const activeChat = useSelector(getActiveChat);
    const isContentSearchEnabled = useSelector(getContentSearchState);
    const unreadMessages = useSelector(getUnreadMessagesState);
    useEffect(() => {
        var _a, _b;
        if (!selectedDetail.selectedId)
            return;
        if (isSmView) {
            setIsMessagesSectionShow(true);
            return;
        }
        const newDetail = Object.assign({}, selectedDetail);
        setUpdatedDetail(newDetail);
        const isRecentPresent = recents.length > 0 && recents.find((fill) => fill.threadId === selectedDetail.selectedId);
        if (isRecentPresent) {
            newDetail.selectCategory = 'direct';
            setUpdatedDetail(newDetail);
            return;
        }
        const isFavoritesPresent = favoritesMembers.length > 0 && favoritesMembers.find(fill => fill.userId === selectedDetail.selectedId);
        if (isFavoritesPresent) {
            newDetail.selectCategory = 'favorites';
            setUpdatedDetail(newDetail);
            return;
        }
        const isGroupPresent = ((_a = groups === null || groups === void 0 ? void 0 : groups.groups) !== null && _a !== void 0 ? _a : []).length > 0 && ((_b = groups === null || groups === void 0 ? void 0 : groups.groups) !== null && _b !== void 0 ? _b : []).find(fill => fill.threadId === selectedDetail.selectedId);
        if (isGroupPresent) {
            newDetail.selectCategory = 'groups';
            setUpdatedDetail(newDetail);
        }
    }, [selectedDetail]);
    useEffect(() => {
        dispatch(agentHiveActions.setContentSearchState(false));
        dispatch(agentHiveActions.updateSearchText(''));
    }, [activeChat]);
    /**
     * Returns the threadId from unreadMessages where the userId matches the senderId.
     * @param unreadMessages - Array of unread messages objects containing senderId and threadId
     * @param userId - The user ID to match with senderId
     * @returns The threadId if found, otherwise undefined
     * @example getThreadIdBySenderId(unreadMessagesResponse, 'user123')
     */
    const getThreadIdBySenderId = (unreadMessagesResponse, senderUserId) => {
        const messagesArray = Array.isArray(unreadMessagesResponse) ? unreadMessagesResponse : [];
        const match = messagesArray.find(item => item.senderId === senderUserId);
        return match === null || match === void 0 ? void 0 : match.threadId;
    };
    /**
     * function to handle groups Accordion Expansion
     * @example - useAccordionState(initalState)
     */
    const useAccordionState = (initialState = true) => {
        const [isExpanded, setIsExpanded] = useState(initialState);
        /**
       * function to handle groups Accordion toggle
       * @example - toggle()
       */
        const toggle = () => setIsExpanded(prev => !prev);
        return { isExpanded, toggle };
    };
    const favoritesAccordion = useAccordionState();
    const groupsAccordion = useAccordionState();
    const recentAccordion = useAccordionState();
    /**
     * function to handle agent new chat click
     * @example - handleNewChat(event)
     */
    const handleNewChat = () => {
        dispatch(agentHiveActions.setEditorVisible(true));
        dispatch(agentHiveActions.setThreadMessages({
            threadMessages: [],
        }));
        const defaultGroup = {
            groupId: '',
            groupName: '',
            members: [],
            category: ConversationsCategory.NEWCHAT,
        };
        dispatch(agentHiveActions.setActiveChat({ groups: defaultGroup, category: ConversationsCategory.NEWCHAT }));
        if (isSmView)
            setIsMessagesSectionShow(true);
    };
    /**
     * function to handle on agent chat click
     * @example - handleChatClick(event)
     */
    const handleChatClick = (group, category, categories = '') => __awaiter(this, void 0, void 0, function* () {
        var _b, _c;
        setUpdatedDetail({ selectCategory: '', selectedId: '' });
        const msg = {
            threadMessages: [],
        };
        let id = '';
        if (category === ConversationsCategory.GROUP) {
            if ((group === null || group === void 0 ? void 0 : group.threadId) && group.threadId === ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) && (!!isMessagesSectionShow || !isSmView))
                return;
            setSelectedChat(group);
            setCategory(categories);
            id = (group === null || group === void 0 ? void 0 : group.threadId) || '';
            const groupId = (group === null || group === void 0 ? void 0 : group.groupId) || '';
            dispatch(agentHiveActions.setThreadMessages(msg));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(getThreadMessages({ threadId: id, skip: 0 }));
            dispatch(agentHiveActions.setApiCall(true));
            if (groupId) {
                yield dispatch(groupMemberDetails({ groupId: groupId || '' }));
                dispatch(agentHiveActions.setActiveChat({ groupDetail: group, category: ConversationsCategory.GROUP }));
            }
            else {
                dispatch(agentHiveActions.setSelectedMembers(group.members));
                dispatch(agentHiveActions.setGroupMemberDetails(group.members));
                dispatch(agentHiveActions.setActiveChat({ groupDetail: group, category: ConversationsCategory.GROUP }));
            }
            dispatch(agentHiveActions.removeNotifyMember(id));
            dispatch(clearUnreadMessages({ threadId: id, receiverId: userId }));
        }
        else if (category === ConversationsCategory.FAVORITES || category === ConversationsCategory.DIRECT) {
            if (('userId' in group) && (group === null || group === void 0 ? void 0 : group.userId) === ((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.userId) && (!!isMessagesSectionShow || !isSmView))
                return;
            setCategory(category);
            setSelectedChat(group);
            id = (group === null || group === void 0 ? void 0 : group.userId) || '';
            const reqObj = [userId, id];
            const focusedChat = {
                memberDetail: group,
                category: ConversationsCategory.FAVORITES,
            };
            const threadId = getThreadIdBySenderId(unreadMessages, id);
            dispatch(agentHiveActions.setThreadMessages(msg));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(fetchUserMessages({ threadMessages: reqObj, skip: 0 }));
            dispatch(agentHiveActions.setActiveChat(focusedChat));
            dispatch(agentHiveActions.setSelectedMembers([group]));
            dispatch(agentHiveActions.removeNotifyMember(id));
            dispatch(agentHiveActions.setApiCall(true));
            dispatch(clearUnreadMessages({ threadId: threadId !== null && threadId !== void 0 ? threadId : '', receiverId: userId }));
        }
        dispatch(agentHiveActions.setEditorVisible(true));
        if (isSmView) {
            setIsMessagesSectionShow(true);
        }
    });
    /**
     *
     * @param selectedChat -
     * @param memberId -
     * @returns
     * @example
     */
    const isSelected = (selectedChat, memberId, category = '') => {
        if (updatedDetail === null || updatedDetail === void 0 ? void 0 : updatedDetail.selectedId) {
            return (updatedDetail.selectedId === memberId && updatedDetail.selectCategory === category);
        }
        return (((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.userId) === memberId && selectCategory === category) ||
            (((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.threadId) === memberId || (selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.groupId) === memberId)
                && selectCategory === category));
    };
    /**
     * function to render favorites
     * @example - renderFavorites()
     */
    const renderFavorites = (favoritesList, dataTestId = 'agent-favorites') => {
        return (_jsx(CcfBox, Object.assign({ "data-testid": "favorites-list" }, { children: favoritesList === null || favoritesList === void 0 ? void 0 : favoritesList.map((favorite) => {
                var _a;
                return (_a = favorite === null || favorite === void 0 ? void 0 : favorite.members) === null || _a === void 0 ? void 0 : _a.map((member, memberIndex) => (_jsx(CcfBox, Object.assign({ tabIndex: 0, role: "button", "aria-label": member.name, onKeyDown: e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleChatClick(member, 'favorites');
                            e.preventDefault();
                        }
                    }, sx: Object.assign(Object.assign({}, styles.AgentNamesAccordion), (isSelected(selectedChat, member.userId, 'favorites') && styles.SelectedAgentNamesAccordian)), "data-testid": `${dataTestId}-${memberIndex}`, onClick: () => handleChatClick(member, 'favorites') }, { children: _jsx(CcfAgentContact, { showIndicator: true, agent: member, selected: isSelected(selectedChat, member.userId, 'favorites') }) }), member.userId || `${memberIndex}-${member.name}`)));
            }) })));
    };
    /**
     * function to render groups
     * @example - renderGroups()
     */
    const renderGroups = (groupsList, dataTestId = 'agent-groups', category = ConversationsCategory.GROUP) => {
        var _a;
        return (_jsx(CcfBox, Object.assign({ "data-testid": dataTestId }, { children: (_a = groupsList === null || groupsList === void 0 ? void 0 : groupsList.groups) === null || _a === void 0 ? void 0 : _a.map((group, groupIndex) => (_jsx(CcfBox, Object.assign({ tabIndex: 0, role: "button", "aria-label": group.groupName, onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleChatClick(group, ConversationsCategory.GROUP, category);
                        e.preventDefault();
                    }
                }, sx: Object.assign(Object.assign({}, styles.AgentNamesAccordion), (isSelected(selectedChat, (group === null || group === void 0 ? void 0 : group.threadId) || (group === null || group === void 0 ? void 0 : group.groupId), category) && styles.SelectedAgentNamesAccordian)), "data-testid": `${dataTestId}-${groupIndex}`, onClick: () => handleChatClick(group, ConversationsCategory.GROUP, category) }, { children: _jsx(CcfAgentContact, { showIndicator: true, agent: group, selected: isSelected(selectedChat, (group === null || group === void 0 ? void 0 : group.threadId) || (group === null || group === void 0 ? void 0 : group.groupId), category) }) }), group.groupId || group.threadId))) })));
    };
    /**
     * @example - renderRecentThread()
     * @returns
     */
    const renderRecentThread = (contact, dataTestId = 'agent-recent-threads', index = 0) => (_jsx(CcfBox, Object.assign({ "data-testid": `contact-list-${index}` }, { children: _jsx(CcfBox, Object.assign({ tabIndex: 0, onKeyDown: e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleChatClick(contact, 'direct');
                    e.preventDefault();
                }
            }, onClick: () => handleChatClick(contact, 'direct'), sx: Object.assign(Object.assign({}, styles.AgentNamesAccordion), (isSelected(selectedChat, (contact === null || contact === void 0 ? void 0 : contact.userId) || '', 'direct') && styles.SelectedAgentNamesAccordian)), "data-testid": dataTestId }, { children: _jsx(CcfAgentContact, { showIndicator: true, agent: contact, selected: isSelected(selectedChat, (contact === null || contact === void 0 ? void 0 : contact.userId) || '', 'direct') }) }), contact.userId || contact.threadId) })));
    /**
     * Function to check if a contact is not in favorites
     * @param contact - RecentChatThreads
     * @param favoritesList - Favorites[]
     * @example - isNotFavorites()
     * @returns - booleaN
     */
    const isNotFavorites = (contact, favoritesList) => {
        return !favoritesList.some((favorite) => favorite.members.some((member) => member.userId === contact.userId));
    };
    /**
     * @example - renderThread()
     */
    const renderThread = (recent, favoritesList) => {
        const filteredRecent = recent.filter((contact) => {
            var _a;
            return contact.threadId &&
                !(contact.category === ConversationsCategory.GROUP &&
                    !((_a = groups === null || groups === void 0 ? void 0 : groups.groups) === null || _a === void 0 ? void 0 : _a.some((group) => group.threadId === contact.threadId)));
        });
        const uniqueRecent = Array.from(new Map(filteredRecent.map((contact) => {
            const key = contact.category === ConversationsCategory.GROUP
                ? contact.threadId
                : contact.userId || contact.threadId;
            return [key, contact];
        })).values());
        return (_jsx(CcfBox, { children: uniqueRecent.map((contact, index) => {
                var _a;
                if (contact.category === ConversationsCategory.DIRECT) {
                    if (isNotFavorites(contact, favoritesList)) {
                        return renderRecentThread(contact, `agent-recent-threads-${index}`, index); // Added index to dataTestId
                    }
                }
                else if (contact.category === ConversationsCategory.GROUP) {
                    let group = (_a = groups === null || groups === void 0 ? void 0 : groups.groups) === null || _a === void 0 ? void 0 : _a.find((group) => group.threadId === contact.threadId);
                    if (!group) {
                        group = contact;
                    }
                    return renderGroups(group ? { groups: [group] } : { groups: [] }, `agent-groups-${index}`, // Added index to dataTestId
                    ConversationsCategory.DIRECT);
                }
                return null;
            }) }));
    };
    /**
     * function to handle agent chat create group
     * @example - handleCreateGroup(event)
     */
    const handleCreateGroup = (event) => {
        event.stopPropagation();
        setIsPopoverMenuOpen(true);
        setAnchorEl(event.currentTarget);
        dispatch(agentHiveActions.setSelectedMembers([]));
    };
    /**
     * function to handle back click
     * @example - handleBackToContacts(event)
     */
    const handleBackToContacts = () => {
        setIsMessagesSectionShow(false);
        if (isSmView) {
            const resetActiveChat = {
                category: '',
            };
            const msg = {
                threadMessages: [],
            };
            setUpdatedDetail({ selectCategory: '', selectedId: '' });
            dispatch(agentHiveActions.setActiveChat(resetActiveChat));
            dispatch(agentHiveActions.setSelectedDetail({}));
            dispatch(agentHiveActions.setSelectedMembers([]));
            dispatch(agentHiveActions.setThreadMessages(msg));
        }
    };
    return (_jsx(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.RightBorder), (isSmView && { width: '100% !important' })), "data-testid": 'agent-chat-contacts-section' }, { children: (isMessagesSectionShow || (isSmView && isContentSearchEnabled)) ? (_jsx(CcfBox, Object.assign({ "data-testid": 'init-agent-chat-message-section', sx: { height: '100%' } }, { children: _jsx(CcfAgentChatMessagesSection, { onBackToContacts: handleBackToContacts, isSmView: isSmView }) }))) : (_jsxs(CcfBox, Object.assign({ component: 'div', sx: styles.AgentChatLeftContainer, "data-testid": 'agent-chat-contacts-section' }, { children: [_jsx(CcfBox, Object.assign({ component: 'div', sx: styles.AgentNewChatSearchIcon, "data-testid": 'new-chat-search' }, { children: _jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentNewChat), (isSmView && styles.AgentNewChatForIsSmView)), "data-testid": 'new-chat' }, { children: [isSmView && (_jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.coversationHeader), styles.AgentChatStrongText) }, { children: translate('conversations') }))), _jsx(CcfAgentChatNewChatIcon, { tabIndex: 0, role: "button", "data-testid": 'agent-new-chat', "aria-label": translate('chatContactMode'), "aria-hidden": false, onClick: handleNewChat, onKeyDown: e => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleNewChat();
                                        e.preventDefault();
                                    }
                                }, sx: styles.AgentNewChatIcon })] })) })), isSmView && (_jsx(CcfBox, Object.assign({ component: 'div', "data-testid": 'agent-chat-search' }, { children: _jsx(CcfAgentChatSearch, { contentSearch: true }) }))), _jsxs(CcfBox, Object.assign({ component: 'div', "data-testid": 'agent-hive-accordion', sx: Object.assign(Object.assign({}, styles.AgentChatAccordionContainer), (isAppSpace && { height: 'calc(100vh - 245px) !important' })) }, { children: [_jsxs(CcfAccordion, Object.assign({ square: true, sx: Object.assign(Object.assign({}, styles.accordionContainer), styles.BorderBottom), expanded: favoritesAccordion.isExpanded, onChange: favoritesAccordion.toggle, "data-testid": 'agent-favorites' }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": 'favorites-content', id: 'favorites-header', sx: styles.accordionHeaderExpand, "data-testid": 'agent-favorites-header' }, { children: _jsxs(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.accordionHeader), styles.AgentChatStrongText) }, { children: [translate('favorites'), " (", favoritesMembers.length || 0, ")"] })) })), _jsx(CcfAccordionDetails, Object.assign({ sx: styles.AccordionContent }, { children: renderFavorites(favorites, 'agent-favorites') }))] })), _jsxs(CcfAccordion, Object.assign({ square: true, sx: Object.assign(Object.assign({}, styles.accordionContainer), styles.BorderBottom), expanded: recentAccordion.isExpanded, onChange: recentAccordion.toggle, "data-testid": 'agent-recent' }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": 'recent-content', id: 'recent-header', sx: styles.accordionHeaderExpand, "data-testid": 'agent-recent-header' }, { children: _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.accordionHeader), styles.AgentChatStrongText) }, { children: translate('directMessages') })) })), _jsx(CcfAccordionDetails, Object.assign({ sx: styles.AccordionContent }, { children: _jsx(CcfBox, Object.assign({ component: 'div' }, { children: renderThread(recents, favorites) })) }))] })), _jsxs(CcfBox, Object.assign({ sx: { position: 'relative' } }, { children: [_jsxs(CcfAccordion, Object.assign({ square: true, sx: Object.assign({}, styles.accordionContainer), expanded: groupsAccordion.isExpanded, onChange: groupsAccordion.toggle, "data-testid": 'agent-groups' }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": 'groups-content', id: 'groups-header', sx: styles.accordionHeaderExpand, "data-testid": 'agent-groups-header' }, { children: _jsxs(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.accordionHeader), styles.AgentChatStrongText) }, { children: [translate('groups'), " (", ((_a = groups === null || groups === void 0 ? void 0 : groups.groups) === null || _a === void 0 ? void 0 : _a.length) || 0, ")"] })) })), _jsx(CcfAccordionDetails, Object.assign({ sx: styles.AccordionContent }, { children: _jsx(CcfBox, Object.assign({ component: 'div' }, { children: renderGroups(groups, 'agent-group') })) }))] })), _jsx(CcfBox, Object.assign({ sx: styles.AgentNewGroupIcon, tabIndex: 0, role: "button", "aria-label": translate('create'), "aria-hidden": false, onKeyDown: e => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            e.currentTarget.click();
                                        }
                                    }, "data-testid": 'create-group', onClick: handleCreateGroup }, { children: agentChatIconList[AGENT_CHAT_ICON.PLUS]('') }))] }))] })), _jsx(CcfAgentChatGroupContainer, { isPopoverMenuOpen: isPopoverMenuOpen, setIsPopoverMenuOpen: setIsPopoverMenuOpen, anchorEl: anchorEl, mode: 'create' })] }))) })));
}
//# sourceMappingURL=ccf-agent-chat-contacts-section.js.map