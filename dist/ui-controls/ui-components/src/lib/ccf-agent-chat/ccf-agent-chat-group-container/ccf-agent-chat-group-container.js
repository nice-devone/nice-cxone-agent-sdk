import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useCallback, useEffect, Fragment } from 'react';
import { Box, FormGroup, Popover, useTheme, Button } from '@mui/material';
import { CcfBox, CcfTextField, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberGroupChat, createGroupChat, getActiveChat, getSelectedMembers, renameGroupChat, removeMemberGroupChat, getGroups, } from '../ccf-agent-chat.slice';
import CcfAgentChatSelectedContact from './ccf-agent-chat-selected-contact';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import CcfAgentChatSearch from '../ccf-agent-chat-search/ccf-agent-chat-search';
/**
 * Component for ccf agents chat group container
 * @example - <CcfAgentChatGroupContainer />
 * @returns
 */
export const CcfAgentChatGroupContainer = ({ isPopoverMenuOpen, setIsPopoverMenuOpen, anchorEl, mode, }) => {
    const theme = useTheme();
    const styles = useMemo(() => ccfAgentChatStyles(theme), [theme]);
    const [, setSearchText] = useState('');
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const activeChat = useSelector(getActiveChat);
    const selectedMembers = useSelector(getSelectedMembers);
    const [groupName, updateGroupName] = useState('');
    const groupsList = useSelector(getGroups); //groups list
    useEffect(() => {
        var _a, _b;
        if (isPopoverMenuOpen) {
            if (mode !== 'create') {
                const latestGroupName = ((_b = (_a = groupsList === null || groupsList === void 0 ? void 0 : groupsList.groups) === null || _a === void 0 ? void 0 : _a.find(g => { var _a; return g.groupId === ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.groupId); })) === null || _b === void 0 ? void 0 : _b.groupName) || '';
                updateGroupName(latestGroupName);
            }
            else {
                updateGroupName('');
            }
        }
    }, [isPopoverMenuOpen, mode, activeChat, groupsList]);
    /**
     * method for to check both group name and members are available
     * @example isFormValid()
     */
    const isFormValid = (groupName.trim() !== '' && (mode === 'create' ? selectedMembers.length >= 2 : selectedMembers.length >= 3) && groupName.length > 2) ||
        (mode === 'edit' && groupName.trim() !== '' && groupName.length > 2);
    /**
     * method to clear state
     * @example clearGroupState()
     */
    const clearGroupState = useCallback(() => {
        setIsPopoverMenuOpen(false);
        setSearchText('');
    }, [dispatch, setIsPopoverMenuOpen]);
    /**
     * method to handle group action
     * @example handleGroupAction()
     */
    const handleGroupAction = useCallback((mode, members) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        switch (mode) {
            case 'create': {
                const userInfo = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
                const currentUser = {
                    userId: userInfo.userId,
                    userName: `${userInfo.firstName} ${userInfo.lastName}`,
                };
                members = [...members, currentUser];
                dispatch(createGroupChat({ members, groupName, userId: userInfo.userId }));
                setIsPopoverMenuOpen(false);
                break;
            }
            case 'add-user': {
                const activeChatMembers = (_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.members;
                const membersNotInActiveChat = members.filter((member) => !(activeChatMembers !== null && activeChatMembers !== void 0 ? activeChatMembers : []).some((activeMember) => activeMember.userId === member.userId));
                const missedMembersInActiveChat = (activeChatMembers !== null && activeChatMembers !== void 0 ? activeChatMembers : []).filter((activeMember) => !members.some((member) => member.userId === activeMember.userId));
                if (membersNotInActiveChat.length > 0) {
                    yield dispatch(addMemberGroupChat({ members: membersNotInActiveChat, groupId: ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _b === void 0 ? void 0 : _b.groupId) || '' }));
                }
                if (missedMembersInActiveChat.length > 0) {
                    const removeId = {
                        members: (missedMembersInActiveChat === null || missedMembersInActiveChat === void 0 ? void 0 : missedMembersInActiveChat.map(member => member.userId)) || [],
                        groupId: ((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _c === void 0 ? void 0 : _c.groupId) || '',
                    };
                    yield dispatch(removeMemberGroupChat(removeId));
                }
                clearGroupState();
                break;
            }
            case 'edit':
                dispatch(renameGroupChat({ groupName, groupId: ((_d = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _d === void 0 ? void 0 : _d.groupId) || '' }));
                setIsPopoverMenuOpen(false);
                break;
            default:
                console.warn('Invalid group action mode');
        }
    }), [dispatch, groupName, activeChat]);
    const handleGroupNameChange = useCallback((event) => {
        const newValue = event.target.value;
        updateGroupName(newValue);
        //newValue.length>2 ? updateGroupName(newValue) : console.warn('Group Name should have more than 2 characters'); // To Do - Add translation for this.
    }, []);
    return (_jsx(Popover, Object.assign({ id: "create-group", "data-testid": "create-group", open: isPopoverMenuOpen, anchorEl: anchorEl, anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }, transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        }, PaperProps: {
            style: {
                padding: '20px',
            },
        }, onClose: clearGroupState }, { children: _jsx(FormGroup, { children: _jsxs(Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.AgentGroupInputs }, { children: [_jsx(CcfTypography, Object.assign({ id: "agent-group-label", sx: styles.AgentGroupTitle }, { children: mode === 'create' ? translate('newGroupName') : translate('groupName') })), _jsx(CcfTextField, { id: "agent-group-input", autoComplete: "off", size: "small", value: groupName, onChange: handleGroupNameChange, variant: "outlined", fullWidth: true, inputProps: { 'data-testid': 'input-agent-group', 'aria-labelledby': 'agent-group-label' }, required: true, sx: styles.createGroupText, disabled: mode !== 'edit' && mode !== 'create' })] })), mode !== 'edit' && _jsxs(Box, Object.assign({ sx: styles.AgentGroupInputs }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.AgentGroupTitle }, { children: translate('addMember') })), _jsx(CcfBox, Object.assign({ component: 'div', "data-testid": 'agent-search', sx: styles.searchBoxforGroup }, { children: _jsx(CcfAgentChatSearch, { mode: mode, contentSearch: false }) })), _jsx(CcfBox, Object.assign({ component: 'div', sx: styles.AgentChatSelectedContact }, { children: _jsx(CcfAgentChatSelectedContact, { mode: mode }) }))] })), _jsxs(Box, Object.assign({ sx: { display: 'flex', justifyContent: 'flex-end', gap: '16px' } }, { children: [_jsx(Button, Object.assign({ variant: "outlined", size: "medium", onClick: clearGroupState }, { children: translate('cancel') })), _jsx(Button, Object.assign({ variant: "contained", size: "medium", onClick: () => handleGroupAction(mode, selectedMembers), disabled: !isFormValid }, { children: mode === 'create' ? translate('create') : translate('update') }))] }))] }) }) })));
};
export default CcfAgentChatGroupContainer;
//# sourceMappingURL=ccf-agent-chat-group-container.js.map