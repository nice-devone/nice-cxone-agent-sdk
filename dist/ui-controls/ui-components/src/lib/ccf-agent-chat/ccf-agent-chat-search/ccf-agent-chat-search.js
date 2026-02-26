import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Box, InputAdornment, TextField, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { agentHiveActions, fetchUserMessages, getAllGroupChat, getAllUsers, getSearchedGroups, getSelectedMembers, getUsers } from '../ccf-agent-chat.slice';
import { useCallback, useState } from 'react';
import CcfAgentChatSearchMember from './ccf-agent-chat-search-member';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from '@mui/material/utils';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfRightArrowForwardIcon, useTranslator } from '@nice-devone/ui-controls';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
/**
 * Component for ccf agents search
 * @example - <CcfAgentChatSearch />
 * @returns
 */
export const CcfAgentChatSearch = ({ contentSearch, mode = '', initiatedFrom }) => {
    var _a, _b;
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const currentUserInfo = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    const selectedMembers = useSelector(getSelectedMembers);
    const selectedMemberIds = (_a = (selectedMembers !== null && selectedMembers !== void 0 ? selectedMembers : [])) === null || _a === void 0 ? void 0 : _a.map((member) => member.userId);
    const usersList = useSelector(getUsers);
    const searchedGroupList = useSelector(getSearchedGroups);
    const userDetails = (_b = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _b !== void 0 ? _b : {};
    const [translate] = useTranslator();
    /**
   * method for to handle option change
   * @example handleChange()
   */
    const handleChange = (event, newValue) => {
        if (inputValue.trim() !== '') {
            const selected = [];
            if (newValue && newValue.length > 0) {
                selected.push(newValue[newValue.length - 1]);
            }
            const selectedUsers = selected === null || selected === void 0 ? void 0 : selected.map(user => ({
                userId: user.userId,
                userName: (user.firstName || user.lastName)
                    ? `${user.firstName} ${user.lastName}`.trim()
                    : user.name || '',
            })).filter((user, index, self) => index === self.findIndex(u => u.userId === user.userId) // Remove duplicates
            );
            if (mode === 'add-user' || mode === 'create') {
                dispatch(agentHiveActions.addSelectedMembers(selectedUsers));
            }
            else {
                dispatch(agentHiveActions.setSelectedMembers(selectedUsers));
            }
            setInputValue('');
        }
    };
    /**
     * method to handle change search box
     * @example - handleSearchChange
     */
    const handleSearchChange = (val) => {
        const searchValue = val || inputValue;
        if (searchValue.length >= 2) {
            setOpen(searchValue.trim() !== '');
            dispatch(getAllUsers({ searchValue }));
            contentSearch && currentUserInfo && searchValue && dispatch(getAllGroupChat({ userId: currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId, searchValue }));
        }
    };
    /**
     * Determines whether to show the group header in the search results.
     * @param initiatedFrom - The source from which the search was initiated.
     * @param group - The name of the group.
     * @returns True if the group header should be shown, otherwise false.
     * @example - shouldShowGroupHeader('NewChatEditorWindow', 'Groups') // returns false
     */
    const shouldShowGroupHeader = (initiatedFrom, group) => {
        // Don not show group header only if initiated from 'newChatEditorWindow' and the group is'Groups'
        if (initiatedFrom === 'NewChatEditorWindow' && group === 'Groups')
            return false;
        else
            return true;
    };
    /**
     * Handles debouncing for the search box by delaying handleSearchChange execution to improve performance.
     * @example - debouncedHandleChange('searchValue');
     */
    const debouncedHandleChange = useCallback(debounce((val) => {
        handleSearchChange(val);
    }, 500), []);
    /**
     * Handles debouncing for the search box by delaying handleSearchChange execution to improve performance.
     * @example - handleSearchClick();
     */
    const handleSearchClick = () => {
        if (inputValue.length > 2) {
            const msg = {
                threadMessages: [],
            };
            dispatch(agentHiveActions.setThreadMessages(msg));
            setOpen(false);
            dispatch(fetchUserMessages({ threadMessages: [userDetails.id], skip: 0, searchContent: inputValue }));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(agentHiveActions.setContentSearchState(true));
            dispatch(agentHiveActions.setEditorVisible(false));
            dispatch(agentHiveActions.updateSearchText(inputValue));
        }
    };
    const filteredOptions = inputValue.trim() === ''
        ? []
        : usersList.filter(user => currentUserInfo.userId !== user.userId &&
            (contentSearch || !selectedMemberIds.includes(user.userId)))
            .filter(user => `${user.firstName} ${user.lastName}`.toLocaleLowerCase().includes(inputValue.toLowerCase()) ||
            user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
            user.lastName.toLowerCase().includes(inputValue.toLowerCase()));
    const filteredUsers = (filteredOptions && inputValue.length >= 2) ? filteredOptions.map(user => ({ name: `${user.firstName} ${user.lastName}`.trim(), userId: user.userId, userState: user.userState, category: ConversationsCategory.DIRECT, filterName: 'People' })) : [];
    const filteredGroups = (contentSearch && searchedGroupList.groups && inputValue.length >= 2) ? searchedGroupList === null || searchedGroupList === void 0 ? void 0 : searchedGroupList.groups.map(grp => ({ name: grp.groupName, groupId: grp.groupId, threadId: grp.threadId, category: ConversationsCategory.GROUP, filterName: 'Groups' })) : [];
    const options = [...filteredUsers, ...filteredGroups];
    return (_jsx(Autocomplete, { multiple: true, id: "seach-members", sx: styles.searchMembers, options: options, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.name) || '', renderInput: (params) => (_jsx(TextField, Object.assign({}, params, { variant: "outlined", placeholder: translate('search'), id: "seach-input", InputLabelProps: { shrink: false }, inputProps: Object.assign(Object.assign({}, params.inputProps), { 'aria-label': translate('searchContacts') }), InputProps: Object.assign(Object.assign({}, params.InputProps), { startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start", sx: Object.assign({}, styles.searchIcon) }, { children: _jsx(SearchIcon, { fontSize: "small" }) }))), endAdornment: (contentSearch && initiatedFrom !== 'NewChatEditorWindow') && inputValue.length > 2 ? (_jsx(InputAdornment, Object.assign({ position: "end", sx: Object.assign({}, styles.searchIcon), onClick: handleSearchClick }, { children: _jsx(CcfRightArrowForwardIcon, { sx: { margin: '0 6px' } }) }))) : null }) }))), onChange: handleChange, onKeyDown: (event) => {
            if (event.key === 'Enter') {
                handleSearchClick();
            }
        }, renderTags: () => null, filterSelectedOptions: true, inputValue: inputValue, onInputChange: (_, newInputValue) => {
            setInputValue(newInputValue);
            const isEmpty = newInputValue.trim() === '';
            if (!isEmpty)
                debouncedHandleChange(newInputValue);
            setOpen(!isEmpty);
        }, forcePopupIcon: false, open: open, onOpen: () => {
            setOpen(inputValue.trim() !== '');
        }, onClose: () => {
            setOpen(false);
        }, disableClearable: true, noOptionsText: "No result found", renderOption: (props, option) => (_jsx("li", Object.assign({}, props, { children: _jsx(CcfAgentChatSearchMember, { member: option, contentSearch: contentSearch, userId: currentUserInfo.userId }) }))), groupBy: contentSearch ? (option) => (option === null || option === void 0 ? void 0 : option.filterName) || '' : undefined, renderGroup: (params) => ((shouldShowGroupHeader(initiatedFrom, params.group)) &&
            _jsxs("li", { children: [_jsx(Box, Object.assign({ sx: styles.groupHeader }, { children: params.group })), _jsx(Box, Object.assign({ sx: styles.groupItems }, { children: params.children }))] }, params.key)) }));
};
export default CcfAgentChatSearch;
//# sourceMappingURL=ccf-agent-chat-search.js.map