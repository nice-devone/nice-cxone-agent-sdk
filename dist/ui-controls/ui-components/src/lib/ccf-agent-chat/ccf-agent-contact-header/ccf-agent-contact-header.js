import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputAdornment, Popover, useTheme } from '@mui/material';
import { CcfBox, CcfSearchIcon, CcfTextField, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { CXoneUser } from '@nice-devone/auth-sdk';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { AGENT_CHAT_STATUS, agentChatIconList, AGENT_CHAT_ICON } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import CcfAgentContact from '../ccf-agent-contacts/ccf-agent-contacts';
import CcfAgentChatKebabMenu from '../ccf-agent-chat-kebab-menu/ccf-agent-chat-kebab-menu';
import { getActiveChat, markUserAsFavorite, agentHiveActions, getUserAvailability, getFavorites, removeFavoriteMember, getThreadMessage, getLoaderVisible, getGroups } from '../ccf-agent-chat.slice';
import CcfAgentChatGroupContainer from '../ccf-agent-chat-group-container/ccf-agent-chat-group-container';
import CcfAgentChatSearch from '../ccf-agent-chat-search/ccf-agent-chat-search';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
/**
 * Component for ccf agents header
 * @example - <CcfAgentContactHeader />
 * @returns
 */
export const CcfAgentContactHeader = ({ onBackClick, isSmView, isContentSearchEnabled }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const userInfo = CXoneUser.instance.getUserInfo();
    const activeChat = useSelector(getActiveChat);
    const [isPopoverMenuOpen, setIsPopoverMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isGroupPopoverMenuOpen, setIsGroupPopoverMenuOpen] = useState(false);
    const [kebabVal, updateKebabVal] = useState('');
    const [agentSearchText, setAgentSearchText] = useState('');
    const parentRef = useRef(null);
    const userAvailabilityStates = useSelector(getUserAvailability); //Current user availability
    const [displayName, setDisplayName] = useState('');
    const [memberFavorite, setMemberFavorite] = useState(false);
    const favoritesList = useSelector(getFavorites); //favorites list
    const results = useSelector(getThreadMessage);
    const loading = useSelector(getLoaderVisible);
    const resultsLength = ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.hits) || 0;
    const groupsList = useSelector(getGroups); //groups list
    /**
     * Method to get the display name
     * @param activeChat - activeChat: ActiveChatDetails
     * @example - getDisplayName(activeChat)
     * @returns displayName
     */
    const getDisplayName = (activeChat) => {
        var _a, _b;
        if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.GROUP) {
            const latestGroupName = (_b = (_a = groupsList === null || groupsList === void 0 ? void 0 : groupsList.groups) === null || _a === void 0 ? void 0 : _a.find(g => { var _a; return g.groupId === ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.groupId); })) === null || _b === void 0 ? void 0 : _b.groupName;
            return latestGroupName || '';
        }
        else if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.FAVORITES || (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.DIRECT) {
            const memberDetail = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail;
            return memberDetail
                ? `${memberDetail.firstName || ''} ${memberDetail.lastName || ''}`.trim() || memberDetail.name || ''
                : '';
        }
        return '';
    };
    useEffect(() => {
        if (((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.FAVORITES || (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.DIRECT) && favoritesList.length > 0) {
            const memberDetail = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail;
            const favorite = favoritesList[0].members.find((user) => user.userId === (memberDetail === null || memberDetail === void 0 ? void 0 : memberDetail.userId));
            if (favorite) {
                setMemberFavorite(true);
            }
            else {
                setMemberFavorite(false);
            }
        }
    }, [activeChat, favoritesList]);
    useEffect(() => {
        updateKebabVal((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) || '');
        setDisplayName(getDisplayName(activeChat));
    }, [activeChat, groupsList]);
    const groupMembersFromStore = ((_c = (_b = groupsList === null || groupsList === void 0 ? void 0 : groupsList.groups) === null || _b === void 0 ? void 0 : _b.find(g => { var _a; return g.groupId === ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.groupId); })) === null || _c === void 0 ? void 0 : _c.members) || [];
    const activeGroupMembers = groupMembersFromStore.length > 0 ? groupMembersFromStore : ((_d = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _d === void 0 ? void 0 : _d.members) || [];
    const uniqueMembersLength = Array.from(new Map(activeGroupMembers.map(m => [m.userId, m])).values()).length || 0;
    /**
       * Helper function to get the icon based on status
       * @param status - status: available
       * @example - getAgentStatusIcon('available')
       */
    const getAgentIcon = (activeChat) => {
        var _a;
        let status = AGENT_CHAT_STATUS.OFFLINE;
        if (activeChat.memberDetail) {
            status = (_a = activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userState;
            if (userAvailabilityStates[activeChat.memberDetail.userId]) {
                status = userAvailabilityStates[activeChat.memberDetail.userId].toUpperCase();
            }
        }
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
     * Helper function to convert string to camelCase
     * @param str - string to convert
     * @example - toCamelCase('example_string')
     * @returns camelCase string
     */
    const toCamelCase = (status) => {
        if (!status)
            return '';
        const normalized = status.toLowerCase().trim();
        if (normalized === 'online')
            return 'Online';
        if (normalized === 'offline')
            return 'Offline';
        // fallback (if some other value sneaks in)
        return normalized
            .replace(/[^a-z]/gi, '')
            .split(/\s+/)
            .map((word, index) => index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    };
    /**
     * Helper function to get the agent status based on activeChat and userAvailabilityStates.
     * @param activeChat - The current active chat details.
     * @param userAvailabilityStates - The map of userId to their availability status.
     * @returns The agent status as AGENT_CHAT_STATUS.
     * @example - getAgentStatus(activeChat)
     */
    const getAgentStatus = (activeChat) => {
        var _a;
        let status = AGENT_CHAT_STATUS.OFFLINE;
        if (activeChat.memberDetail) {
            status = (_a = activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userState;
            if (userAvailabilityStates[activeChat.memberDetail.userId]) {
                status = toCamelCase(userAvailabilityStates[activeChat.memberDetail.userId]);
            }
        }
        return status;
    };
    /**
       * Helper function to get the group icon
       * @example - getGroupIcon()
       */
    const getGroupIcon = () => {
        return agentChatIconList[AGENT_CHAT_ICON.CHANNEL]('');
    };
    /**
       * function to handle down arrow click
       * @example - handleDownArrowClick()
       */
    const handleDownArrowClick = (event) => {
        openPopOverMenu(event);
    };
    /**
  * handle open popover event
  * @example openPopOverMenu()
  */
    const openPopOverMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopoverMenuOpen(true);
    };
    /**
   * handle close event
   * @example handleClose()
   */
    const handleClose = () => {
        setAnchorEl(null);
        setIsPopoverMenuOpen(false);
        setAgentSearchText('');
    };
    /**
   * handle Add member click event
   * @example handleAddMember()
   */
    const handleAddMember = () => {
        dispatch(agentHiveActions.updateMembersDetails());
        setIsPopoverMenuOpen(false);
        setIsGroupPopoverMenuOpen(true);
    };
    /**
     * function to handle back click
     * @example - handleBackClick()
     */
    const handleBackClick = () => {
        if (onBackClick) {
            onBackClick();
        }
    };
    /**
     * function to on change search input
     * This function is called when the search input changes, it will call the onBackClick prop if provided.
     * @example - handleSearchChange()
     */
    const handleSearchChange = (event) => {
        var _a, _b, _c;
        const value = (_c = (_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim()) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        setAgentSearchText(value);
    };
    /**
       * function to handle down arrow click
       * @example - addToFavorite()
       */
    const addToFavorite = () => {
        var _a;
        if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) && !memberFavorite) {
            const memberDetail = activeChat.memberDetail;
            const favorite = {
                userId: memberDetail.userId,
                firstName: memberDetail.firstName,
                lastName: memberDetail.lastName,
                userState: memberDetail.userState,
                name: memberDetail.name,
            };
            dispatch(markUserAsFavorite({ userId: userInfo.userId, member: favorite }));
            if (favoritesList[0].members.length === 10) {
                setMemberFavorite(false);
            }
            else {
                setMemberFavorite(true);
            }
        }
        else if (memberFavorite) {
            dispatch(removeFavoriteMember({
                userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId,
                memberId: (_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userId,
            }));
            setMemberFavorite(false);
        }
    };
    return (_jsxs(Box, Object.assign({ ref: parentRef, "data-testid": "agentContactHeader", sx: styles.AgentNameIconHeader }, { children: [isSmView && (_jsx(Box, Object.assign({ "data-testid": "agentChatIconList", component: 'div', sx: { cursor: 'pointer' }, onClick: handleBackClick }, { children: _jsx(CcfTypography, { children: agentChatIconList[AGENT_CHAT_ICON.LEFT_ARROW]('') }) }))), _jsxs(Box, Object.assign({ "data-testid": "agentChatHeaderContent", sx: Object.assign(Object.assign({}, styles.AgentChatHeaderContent), (isSmView ? Object.assign({}, styles.AgentChatHeaderXL) : {})) }, { children: [activeChat.category === ConversationsCategory.NEWCHAT && (_jsxs(Box, Object.assign({ sx: { width: '100%' } }, { children: [_jsx(CcfTypography, { translationKey: 'newMessage', variant: 'h6', sx: { textTransform: 'uppercase', fontWeight: 'bold', marginLeft: '6px' } }), _jsx(CcfAgentChatSearch, { contentSearch: true, initiatedFrom: 'NewChatEditorWindow' })] }))), activeChat.category !== ConversationsCategory.NEWCHAT && isContentSearchEnabled && !loading && (_jsxs(Box, Object.assign({ sx: { textTransform: 'uppercase', fontWeight: 'bold', marginLeft: '6px', width: '100%', fontFamily: 'Open Sans, Arial, sans-serif', fontSize: '13px', lineHeight: '22px' } }, { children: [resultsLength, " ", translate('searchResults')] }))), (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) && activeChat.category !== ConversationsCategory.NEWCHAT && !isContentSearchEnabled && (_jsxs(Box, Object.assign({ sx: styles.AgentChatInnerContent }, { children: [_jsx(Box, Object.assign({ sx: styles.AgentChatStatus }, { children: (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.GROUP ? getGroupIcon() : getAgentIcon(activeChat) })), _jsxs(Box, Object.assign({ sx: Object.assign({}, styles.AgentChatInnerContent) }, { children: [_jsx(CcfTypography, Object.assign({ noWrap: true, sx: Object.assign({}, styles.AgentChatStrongText) }, { children: displayName })), activeChat && ('category' in activeChat && (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.GROUP && uniqueMembersLength > 1 ? (_jsxs(_Fragment, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.AgentChatNormalText }, { children: `| ${uniqueMembersLength} ${translate('membersChat')}` })), _jsx(Box, Object.assign({ onClick: handleDownArrowClick, sx: styles.MembersDownArrow, "data-testid": "members-down-arrow" }, { children: agentChatIconList[AGENT_CHAT_ICON.LEFT_ARROW]('') }))] })) : (_jsx(CcfTypography, Object.assign({ sx: styles.AgentChatNormalText }, { children: `${(toCamelCase((_f = (_e = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _e === void 0 ? void 0 : _e.userState) !== null && _f !== void 0 ? _f : '')) ? '|' : ''} ${(_g = toCamelCase(getAgentStatus(activeChat))) !== null && _g !== void 0 ? _g : ''}` }))))] }))] }))), activeChat && activeChat.category && activeChat.category !== ConversationsCategory.NEWCHAT && !isContentSearchEnabled && (_jsxs(Box, Object.assign({ display: 'flex' }, { children: [activeChat.category !== ConversationsCategory.GROUP && (_jsx(Box, Object.assign({ sx: styles.addFavoriteIcon, tabIndex: 0, onClick: addToFavorite, "data-testid": "favorite-icon", "aria-pressed": memberFavorite, "aria-label": memberFavorite ? 'addToFavorites' : 'removeFromFavorites', role: "button", onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        addToFavorite();
                                    }
                                } }, { children: memberFavorite ? agentChatIconList[AGENT_CHAT_ICON.WHITE_STAR]('') : agentChatIconList[AGENT_CHAT_ICON.WHITE_STAR_OUTLINE]('') }))), activeChat.category === ConversationsCategory.GROUP && (activeChat.memberDetail || ((_h = activeChat.groupDetail) === null || _h === void 0 ? void 0 : _h.groupId)) && (_jsx(CcfAgentChatKebabMenu, { kebab: kebabVal }))] })))] })), _jsxs(Popover, Object.assign({ id: "members-list", "data-testid": "members-list", open: isPopoverMenuOpen, onClose: handleClose, anchorEl: anchorEl, anchorOrigin: {
                    vertical: 'center',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, PaperProps: {
                    style: {
                        padding: '8px',
                        borderRadius: '8px',
                    },
                } }, { children: [_jsx("label", Object.assign({ htmlFor: "search-input-for-group", style: { position: 'absolute', left: '-9999px' } }, { children: translate('search') })), _jsx(CcfTextField, { variant: "outlined", placeholder: translate('search'), value: agentSearchText, id: "search-input-for-group", InputLabelProps: { shrink: false }, onChange: handleSearchChange, sx: styles.GroupSearchInput, InputProps: {
                            startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start", sx: Object.assign({}, styles.searchIcon) }, { children: _jsx(CcfSearchIcon, { fontSize: "small", viewBox: '0 -2 24 24', htmlColor: "currentColor", stroke: "currentColor" }) }))),
                        } }), _jsx(CcfBox, Object.assign({ "data-testid": "contact-list" }, { children: ((_j = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _j === void 0 ? void 0 : _j.members) &&
                            [...activeChat.groupDetail.members]
                                .filter((member) => { var _a; return (_a = member === null || member === void 0 ? void 0 : member.userName) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(agentSearchText); }) // Filter Searched user from the list
                                .map((member) => (_jsx(Box, Object.assign({ sx: styles.AgentNames }, { children: _jsx(CcfAgentContact, { agent: member }) }), member.userId))) })), (activeChat.memberDetail || ((_k = activeChat.groupDetail) === null || _k === void 0 ? void 0 : _k.groupId)) && (_jsxs(Box, Object.assign({ sx: styles.AgentChatAddmemberText }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.AddMemberIcon }, { children: agentChatIconList[AGENT_CHAT_ICON.PLUS]('') })), _jsx(CcfTypography, { variant: 'h5', sx: { fontWeight: 400, marginTop: '6px', color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.clearText }, onClick: handleAddMember, translationKey: 'addMember' })] })))] })), _jsx(CcfAgentChatGroupContainer, { isPopoverMenuOpen: isGroupPopoverMenuOpen, setIsPopoverMenuOpen: setIsGroupPopoverMenuOpen, anchorEl: anchorEl, mode: 'add-user' })] })));
};
export default CcfAgentContactHeader;
//# sourceMappingURL=ccf-agent-contact-header.js.map