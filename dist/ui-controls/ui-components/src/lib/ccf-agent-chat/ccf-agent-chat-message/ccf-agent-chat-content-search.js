import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Avatar, useTheme } from '@mui/material';
import { CcfTypography } from '@nice-devone/ui-controls';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { generateColorFromName } from '../common/helper-methods';
import { agentHiveActions, fetchUserMessages, getFavorites, getGroups, getConversationSearchText, getSelectedMembers, getThreadMessages, getUserAvailability, groupMemberDetails, getRecentThreads } from '../ccf-agent-chat.slice';
import { AGENT_CHAT_ICON, AGENT_CHAT_STATUS, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import parse from 'html-react-parser';
import { dbInstance, IndexDBKeyNames, IndexDBStoreNames, StorageKeys } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Component for ccf agents chat messages
 * @example - <CcfAgentChatMessage />
 * @returns
 */
export const CcfAgentChatContentSearch = ({ messages }) => {
    var _a, _b;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const membersList = useSelector(getSelectedMembers);
    const recents = useSelector(getRecentThreads);
    const data = (_a = messages[0]) === null || _a === void 0 ? void 0 : _a.data;
    const userAvailabilityStates = useSelector(getUserAvailability);
    const dispatch = useDispatch();
    const searchValue = useSelector(getConversationSearchText);
    const userDetails = (_b = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _b !== void 0 ? _b : {};
    const favoritesList = useSelector(getFavorites); //favorites list
    const groupList = useSelector(getGroups);
    const [groupDetails, setGroupDetails] = useState([]);
    const ccfLogger = new CcfLogger('App.consumer', 'App.CcfAgentChatContentSearchFailedMessage');
    useEffect(() => {
        /**
         * Function to fetch group details from the database
         * @returns - void
         * @example - fetchGroupDetails()
         */
        const fetchGroupDetails = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const db = yield dbInstance();
                const groupDetailsFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.CONVERSATIONS, IndexDBKeyNames.CONVERSATIONS_GROUPS))) || [];
                if (groupDetailsFromDB && groupDetailsFromDB.length > 0) {
                    setGroupDetails(groupDetailsFromDB || []);
                }
            }
            catch (error) {
                console.error('Error fetching group details:', error);
            }
        });
        fetchGroupDetails();
    }, []);
    /**
     * Function to switch Active Chat based on api response
     * @param message - message object
     * @param favoritesList - list of favorites
     * @param threadId - thread ID
     * @returns - member object or undefined
     * @example - getMemberToHighlight(message, favoritesList, threadId)
     */
    const getMemberToHighlight = (message, favoritesList, threadId) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const msg = {
            threadMessages: [],
        };
        dispatch(agentHiveActions.setThreadMessages(msg));
        const userId = (((_c = message === null || message === void 0 ? void 0 : message.user) === null || _c === void 0 ? void 0 : _c.incontactId) === (userDetails === null || userDetails === void 0 ? void 0 : userDetails.id)) ? (_d = message === null || message === void 0 ? void 0 : message.recipients[0]) === null || _d === void 0 ? void 0 : _d.idOnExternalPlatform : (_e = message === null || message === void 0 ? void 0 : message.user) === null || _e === void 0 ? void 0 : _e.incontactId;
        for (const favorite of favoritesList) {
            const member = favorite.members.find((member) => member.userId === userId);
            if (member) {
                const reqObj = [userDetails.id, member.userId || ''];
                dispatch(fetchUserMessages({ threadMessages: reqObj, skip: 0 }));
                dispatch(agentHiveActions.setActiveChat({ memberDetail: member, category: 'favorites' }));
                dispatch(agentHiveActions.setEditorVisible(true));
                dispatch(agentHiveActions.setLoaderVisible(true));
                const selectedDetail = {
                    selectCategory: 'favorites',
                    selectedId: member.userId || '',
                };
                dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
                return;
            }
        }
        if (((_f = message === null || message === void 0 ? void 0 : message.recipients) === null || _f === void 0 ? void 0 : _f.length) < 2) {
            let userId = '';
            let reqObj = [];
            let member;
            if (((_g = message === null || message === void 0 ? void 0 : message.user) === null || _g === void 0 ? void 0 : _g.incontactId) === (userDetails === null || userDetails === void 0 ? void 0 : userDetails.id)) {
                userId = (_h = message === null || message === void 0 ? void 0 : message.recipients[0]) === null || _h === void 0 ? void 0 : _h.idOnExternalPlatform;
                member = message === null || message === void 0 ? void 0 : message.recipients[0];
            }
            else {
                userId = (_j = message === null || message === void 0 ? void 0 : message.user) === null || _j === void 0 ? void 0 : _j.incontactId;
                member = message === null || message === void 0 ? void 0 : message.user;
            }
            reqObj = [userDetails.id, userId];
            const userState = ((_l = (_k = recents.find((entry) => entry.userId === userId && entry.category === 'direct')) === null || _k === void 0 ? void 0 : _k.userState) === null || _l === void 0 ? void 0 : _l.toLowerCase()) || 'offline';
            const updatedMember = Object.assign(Object.assign({}, member), { userId, userState });
            dispatch(fetchUserMessages({ threadMessages: reqObj, skip: 0 }));
            dispatch(agentHiveActions.setActiveChat({ memberDetail: updatedMember, category: 'direct' }));
            dispatch(agentHiveActions.setEditorVisible(true));
            dispatch(agentHiveActions.setLoaderVisible(true));
            const selectedDetail = {
                selectCategory: 'direct',
                selectedId: userId || '',
            };
            dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
            return;
        }
        const group = (_m = groupList === null || groupList === void 0 ? void 0 : groupList.groups) === null || _m === void 0 ? void 0 : _m.find((group) => group.threadId === threadId);
        if (group) {
            dispatch(agentHiveActions.setActiveChat({ groupDetail: group, category: 'groups' }));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(getThreadMessages({ threadId: group.threadId || '', skip: 0 }));
            dispatch(agentHiveActions.setEditorVisible(true));
            const selectedDetail = {
                selectCategory: 'groups',
                selectedId: group.threadId || group.groupId,
            };
            dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
            return;
        }
        const groupDeatils = groupDetails === null || groupDetails === void 0 ? void 0 : groupDetails.find((group) => group.threadId === threadId);
        if (groupDeatils) {
            dispatch(agentHiveActions.setActiveChat({ groupDetail: groupDeatils, category: 'groups' }));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(getThreadMessages({ threadId: groupDeatils.threadId || '', skip: 0 }));
            yield dispatch(groupMemberDetails({ groupId: groupDeatils.groupId || '' }));
            dispatch(agentHiveActions.setEditorVisible(true));
            const selectedDetail = {
                selectCategory: 'groups',
                selectedId: groupDeatils.threadId || groupDeatils.groupId,
            };
            dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
            return;
        }
        return undefined;
    });
    /**
     * Function to format chat timestamp
     * @param timestamp - timestamp of the message (string or Date)
     * @example - formatChatTimestamp('2023-10-01T12:00')
     * @returns - formatted timestamp
     */
    const formatChatTimestamp = (timestamp) => new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(typeof timestamp === 'string' ? new Date(timestamp) : timestamp);
    /**
     * Function to highlight text based on search query
     * @param text - text to be highlighted
     * @param query - search query
     * @example - highlightText('Hello World', 'world')
     * @returns - highlighted text
     */
    const highlightText = (text, query) => {
        if (!query)
            return text;
        // If text is HTML, parse and highlight inner text
        if (/<[a-z][\s\S]*>/i.test(text)) {
            // Replace inner text with highlighted version
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const span = doc.querySelector('span');
            if (span && span.textContent) {
                const words = query.trim().split(/\s+/).filter(Boolean);
                if (words.length === 0)
                    return text;
                const pattern = new RegExp(`(${words.join('|')})`, 'gi');
                const parts = span.textContent.split(pattern);
                span.innerHTML = parts.map((part) => words.some((word) => word.toLowerCase() === part.toLowerCase())
                    ? `<span class="highlight" style="background-color:#007AB8;color:white;text-decoration:bold;padding:0 4px;">${part}</span>`
                    : part).join('');
                return doc.body.innerHTML;
            }
            return text;
        }
        // Plain text highlighting
        const words = query.trim().split(/\s+/).filter(Boolean);
        if (words.length === 0)
            return text;
        const pattern = new RegExp(`(${words.join('|')})`, 'gi');
        const parts = text.split(pattern);
        return parts === null || parts === void 0 ? void 0 : parts.map((part, i) => words.some((word) => word.toLowerCase() === part.toLowerCase()) ? (_jsx("span", Object.assign({ className: "highlight", style: {
                backgroundColor: '#007AB8',
                color: 'white',
                textDecoration: 'bold',
                padding: '0 4px',
            } }, { children: part }), i)) : (part));
    };
    const highlighted = data === null || data === void 0 ? void 0 : data.map((item) => (Object.assign(Object.assign({}, item), { messageContent: Object.assign(Object.assign({}, item.messageContent), { text: highlightText(item.messageContent.text, searchValue) }) })));
    const parseHtmlOptions = {
        replace: (domNode) => {
            var _a, _b;
            try {
                if ((_b = (_a = domNode === null || domNode === void 0 ? void 0 : domNode.attribs) === null || _a === void 0 ? void 0 : _a.class) === null || _b === void 0 ? void 0 : _b.includes('plainTextEditorParagraph')) {
                    let style = domNode.attribs.style || '';
                    // Remove any existing margin/padding styles
                    style = style
                        .replace(/margin\s*:\s*[^;]+;?/gi, '')
                        .replace(/padding\s*:\s*[^;]+;?/gi, '')
                        .trim();
                    // Append clean margin/padding reset
                    domNode.attribs.style = `${style};margin:0;padding:0`;
                }
                return domNode;
            }
            catch (error) {
                ccfLogger.error('parseHtmlOptions', `error while parsing html options - ${JSON.stringify(error)}`);
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
        return getAgentIcon(((status === null || status === void 0 ? void 0 : status.userState) || 'offline'));
    };
    /**
     * Returns a background color generated from the given author name.
     * @param authorName - The name of the author.
     * @example - getBackgroundColorFromAuthorName('John Doe')
     * @returns The generated background color.
     */
    const getBackgroundColorFromAuthorName = (authorName) => {
        return generateColorFromName(authorName || '');
    };
    /**
     * Returns a string of recipient names.
     * If recipients more than 2, returns all recipient names joined by comma.
     * If recipients less than or equal to 2, returns the current message user's full name.
     * @param recipients - Array of recipient objects with firstName and surname/lastName
     * @param message - The current message object (for fallback name)
     * @example - getRecipientNames(recipients, message)
     */
    const getRecipientNames = (recipients, message) => {
        var _a, _b;
        if (recipients.length >= 2) {
            if ((message === null || message === void 0 ? void 0 : message.threadIdOnExternalPlatform) && (groupDetails === null || groupDetails === void 0 ? void 0 : groupDetails.length) > 0) {
                const groupDetail = groupDetails === null || groupDetails === void 0 ? void 0 : groupDetails.find((group) => group.threadId === message.threadIdOnExternalPlatform);
                if (groupDetail) {
                    return (groupDetail === null || groupDetail === void 0 ? void 0 : groupDetail.groupName) || '';
                }
                else {
                    return recipients === null || recipients === void 0 ? void 0 : recipients.map((recipient) => `${recipient.name}`.trim()).join(', ');
                }
            }
        }
        else if ((recipients === null || recipients === void 0 ? void 0 : recipients.length) < 2 && ((_a = message === null || message === void 0 ? void 0 : message.user) === null || _a === void 0 ? void 0 : _a.incontactId) === (userDetails === null || userDetails === void 0 ? void 0 : userDetails.id)) {
            return message.recipients[0].name
                ? `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName}, ${message.recipients[0].name}`.trim()
                : `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName}`.trim();
        }
        else if ((recipients === null || recipients === void 0 ? void 0 : recipients.length) < 2 && ((_b = message === null || message === void 0 ? void 0 : message.user) === null || _b === void 0 ? void 0 : _b.incontactId) !== (userDetails === null || userDetails === void 0 ? void 0 : userDetails.id)) {
            return message.user.firstName && message.user.firstName.trim() !== ''
                ? `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName}, ${message.user.firstName} ${message.user.surname || message.user.lastName}`.trim()
                : `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName}`.trim();
        }
        return `${message.user.firstName} ${message.user.surname || message.user.lastName}`.trim();
    };
    return (_jsx(Box, { children: highlighted === null || highlighted === void 0 ? void 0 : highlighted.map((message) => {
            var _a, _b;
            return (_jsxs(Box, Object.assign({ tabIndex: 0, "data-testid": 'agent-chat-message-container', className: 'custom-box', sx: styles.ChatMessageContainer, onClick: () => getMemberToHighlight(message, favoritesList, message.threadIdOnExternalPlatform), onKeyDown: e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        getMemberToHighlight(message, favoritesList, message.threadIdOnExternalPlatform);
                        e.preventDefault();
                    }
                } }, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex', alignItems: 'center', gap: 0.5 } }, { children: [message.recipients.length >= 2 && _jsx(Box, Object.assign({ sx: styles.AgentChatStatus }, { children: agentChatIconList[AGENT_CHAT_ICON.CHANNEL_GREY]('') })), _jsx(Box, Object.assign({ sx: {
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '10px',
                                    lineHeight: 1,
                                    letterSpacing: 0,
                                    color: '#767676',
                                } }, { children: getRecipientNames(message.recipients, message) }))] })), _jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatMessageBox), styles.AgentChatMessageLeft), "data-testid": "agent-chat-message" }, { children: [_jsxs(Box, Object.assign({ sx: { position: 'relative', paddingRight: '2px' } }, { children: [_jsx(Avatar, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentNameAvatar), { backgroundColor: getBackgroundColorFromAuthorName(`${message.user.firstName} ${message.user.surname || message.user.lastName}`) }) }, { children: (_b = (_a = `${message.user.firstName} ${message.user.surname || message.user.lastName}`) === null || _a === void 0 ? void 0 : _a.split(' ')) === null || _b === void 0 ? void 0 : _b.map((name) => name[0]).join('').toUpperCase() })), _jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatStatus), styles.AgentChatStatusIcon) }, { children: getStatusIcon(message.authorUser.incontactId) }))] })), _jsxs(Box, Object.assign({ sx: styles.AgentMessage }, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: [_jsxs(CcfTypography, Object.assign({ sx: styles.AgentChatStrongText }, { children: [message.user.firstName, " ", message.user.surname || message.user.lastName] })), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatNormalText), styles.AgentMessageTime) }, { children: formatChatTimestamp((message === null || message === void 0 ? void 0 : message.readAt) || (message === null || message === void 0 ? void 0 : message.createdAt)) }))] })), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatNormalText), { '& .highlight, & .plainTextEditorParagraph': {
                                                margin: '0 !important',
                                            }, maxWidth: '100%' }) }, { children: (() => {
                                            var _a, _b, _c, _d, _e, _f;
                                            let htmlString = '';
                                            if (typeof ((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.text) === 'string') {
                                                htmlString = (_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.text;
                                            }
                                            else if (typeof ((_d = (_c = message === null || message === void 0 ? void 0 : message.messageContent) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.text) === 'string') {
                                                htmlString = (_f = (_e = message === null || message === void 0 ? void 0 : message.messageContent) === null || _e === void 0 ? void 0 : _e.payload) === null || _f === void 0 ? void 0 : _f.text;
                                            }
                                            return parse(htmlString, parseHtmlOptions);
                                        })() }))] }))] }))] }), message.id));
        }) }));
};
export default CcfAgentChatContentSearch;
//# sourceMappingURL=ccf-agent-chat-content-search.js.map