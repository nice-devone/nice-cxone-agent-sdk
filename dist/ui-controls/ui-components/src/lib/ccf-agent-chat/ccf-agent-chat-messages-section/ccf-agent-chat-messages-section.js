import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { CcfBox, CcfLoader, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import CcfAgentContactHeader from '../ccf-agent-contact-header/ccf-agent-contact-header';
import CcfAgentChatWindow from '../ccf-agent-chat-window/ccf-agent-chat-window';
import CcfAgentChatEditor from '../ccf-agent-chat-editor/ccf-agent-chat-editor';
import { getThreadMessage, getEditorStatus, getLoaderVisible, fetchUserMessages, getActiveChat, getScrollToken, getThreadMessages, getApiCall, agentHiveActions, getContentSearchState, getConversationSearchText } from '../ccf-agent-chat.slice';
import { useEffect, useRef, useState } from 'react';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
import CcfAgentChatContentSearch from '../ccf-agent-chat-message/ccf-agent-chat-content-search';
import { StorageKeys } from '@nice-devone/core-sdk';
/**
 * Component for ccf agent chat messages section
 * @example - <CcfAgentChatMessagesSection />
 * @returns
 */
export function CcfAgentChatMessagesSection(props) {
    var _a, _b;
    const { onBackToContacts, isSmView } = props;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const [translate] = useTranslator();
    const isLoader = useSelector(getLoaderVisible);
    const messages = useSelector(getThreadMessage);
    const isEditorOpen = useSelector(getEditorStatus);
    const dispatch = useDispatch();
    const scrollContainerRef = useRef(null); // Ref for the scrollable container
    const [page, setPage] = useState(0); //current value of skip to api call
    const userInfo = CXoneUser.instance.getUserInfo();
    const activeChat = useSelector(getActiveChat);
    const scrollToken = useSelector(getScrollToken);
    const isApiCallInitiated = useSelector(getApiCall);
    const searchText = useSelector(getConversationSearchText);
    const isContentSearchEnabled = useSelector(getContentSearchState);
    const reqObj = [userInfo.userId, (_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userId].filter((id) => id !== undefined);
    const userDetails = (_b = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _b !== void 0 ? _b : {};
    useEffect(() => {
        //dispatch(agentHiveActions.updateSearchText(''));
        setPage(0);
    }, [activeChat]);
    useEffect(() => {
        setPage(0);
    }, [searchText]);
    /**
     * function to handle scroll
     * @example - handleScroll()
     */
    const handleScroll = (e) => {
        const newChat = activeChat.category === ConversationsCategory.NEWCHAT;
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const threshold = 5;
        const topNew = isContentSearchEnabled ? (scrollTop + clientHeight >= scrollHeight - threshold) : (scrollTop === 0);
        if (topNew && scrollToken && !isApiCallInitiated && !newChat) {
            setPage((prev) => prev + 1);
        }
    };
    useEffect(() => {
        var _a;
        if (page > 0 && !isApiCallInitiated) {
            if (searchText) {
                dispatch(agentHiveActions.setApiCall(true));
                dispatch(fetchUserMessages({ threadMessages: [userDetails.id], skip: page, searchContent: searchText }));
            }
            else if (activeChat.category !== ConversationsCategory.GROUP) {
                //dispatch(agentHiveActions.updateSearchText(''));
                dispatch(agentHiveActions.setApiCall(true));
                dispatch(fetchUserMessages({ threadMessages: reqObj, skip: page }));
            }
            else if ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.threadId) {
                dispatch(agentHiveActions.setApiCall(true));
                dispatch(getThreadMessages({ threadId: activeChat.groupDetail.threadId, skip: page }));
            }
        }
    }, [page]);
    return (_jsxs(CcfBox, Object.assign({ component: "div", sx: Object.assign(Object.assign({}, styles.AgentChatRightContainer), (isSmView && { width: '100% !important' })), "data-testid": 'agent-chat-messages-section' }, { children: [(isEditorOpen || messages.length > 0) && (_jsx(CcfBox, Object.assign({ sx: styles.AgentMessageContent }, { children: _jsx(CcfAgentContactHeader, { onBackClick: onBackToContacts, isSmView: isSmView, isContentSearchEnabled: isContentSearchEnabled }) }))), _jsx(CcfBox, Object.assign({ ref: scrollContainerRef, onScroll: !isLoader ? handleScroll : undefined, sx: { flexGrow: 1, overflowY: 'auto', padding: '16px' } }, { children: isLoader ? (_jsxs(CcfBox, Object.assign({ "data-testid": 'agent-chat-messages-loader', sx: { position: 'absolute', top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)' } }, { children: [_jsx(CcfBox, Object.assign({ sx: { display: 'block' } }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })), !isContentSearchEnabled && _jsx(CcfBox, Object.assign({ sx: { display: 'block', marginTop: '8px' } }, { children: _jsx(CcfTypography, Object.assign({ sx: { fontWeight: 'bold', fontSize: '13px' } }, { children: translate('conversationLoading') })) }))] }))) : (!isContentSearchEnabled ? (_jsx(CcfBox, { children: _jsx(CcfAgentChatWindow, { messages: messages }) })) : _jsx(CcfAgentChatContentSearch, { messages: messages })) })), isEditorOpen && (_jsx(CcfBox, Object.assign({ sx: { paddingLeft: 1 } }, { children: _jsx(CcfAgentChatEditor, {}) })))] })));
}
//# sourceMappingURL=ccf-agent-chat-messages-section.js.map