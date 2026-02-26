import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useCallback, useState, memo } from 'react';
import { CcfBox, CcfMenu } from '@nice-devone/ui-controls';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CXoneUser } from '@nice-devone/auth-sdk';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { removeMemberGroupChat, getActiveChat, removeFavoriteMember, agentHiveActions } from '../ccf-agent-chat.slice';
import CcfAgentChatGroupContainer from '../ccf-agent-chat-group-container/ccf-agent-chat-group-container';
import { getCustomizeMenuElement } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { AGENT_CHAT_ICON, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
/**
 * Enum for group kebab action
 */
export var GroupKebabMenu;
(function (GroupKebabMenu) {
    GroupKebabMenu["ADD_MEMBER"] = "addRemoveMember";
    GroupKebabMenu["EDIT_GROUP_NAME"] = "editGroupName";
    GroupKebabMenu["LEAVE_GROUP"] = "leaveGroup";
    GroupKebabMenu["MARK_FAVORITE"] = "markFavorite";
    GroupKebabMenu["REMOVE_FAVORITE"] = "removeFavorite";
    GroupKebabMenu["SEARCH_CHAT"] = "searchChat";
})(GroupKebabMenu || (GroupKebabMenu = {}));
/**
 * Enum for favorites kebab action
 */
export var FavoritesKebabMenu;
(function (FavoritesKebabMenu) {
    FavoritesKebabMenu["REMOVE_FAVORITE"] = "removeFavorite";
    FavoritesKebabMenu["ADD_MEMBER"] = "addMember";
})(FavoritesKebabMenu || (FavoritesKebabMenu = {}));
/**
 * Enum for direct messages kebab action
 */
export var DirectKebabMenu;
(function (DirectKebabMenu) {
    DirectKebabMenu["MARK_FAVORITE"] = "markFavorite";
    DirectKebabMenu["ADD_MEMBER"] = "addMember";
})(DirectKebabMenu || (DirectKebabMenu = {}));
/**
 * Component for rendering a kebab menu with options for agent chat
 * @returns JSX.Element - The JSX for the component
 * @example <CcfAgentChatKebabMenu/>
 */
const CcfAgentChatKebabMenu = ({ kebab }) => {
    var _a;
    const theme = useTheme();
    const styles = useMemo(() => ccfAgentChatStyles(theme), [theme]);
    const dispatch = useDispatch();
    const [isPopoverMenuOpen, setIsPopoverMenuOpen] = useState(false);
    const anchorEl = useSelector(getCustomizeMenuElement);
    const activeChat = useSelector(getActiveChat);
    const [mode, setMode] = useState('');
    const userInfo = CXoneUser.instance.getUserInfo();
    const groupMenuOptions = [
        /**
         * DEV NOTE:
         * Will uncomment below code once functionality is ready.
         */
        // { 
        //   name: GroupKebabMenu.SEARCH_CHAT, 
        //   icon: agentChatIconList[AGENT_CHAT_ICON.SEARCH](''),
        // },
        {
            name: GroupKebabMenu.ADD_MEMBER,
            icon: agentChatIconList[AGENT_CHAT_ICON.PLUS_BLACK](''),
        },
        {
            name: GroupKebabMenu.EDIT_GROUP_NAME,
            icon: agentChatIconList[AGENT_CHAT_ICON.EDIT](''),
        },
        {
            name: GroupKebabMenu.LEAVE_GROUP,
            icon: agentChatIconList[AGENT_CHAT_ICON.LEAVE_ARROW](''),
            menuTextContainerStyles: Object.assign(Object.assign({}, styles.MenuItemNameBold), { color: (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.endCall }),
        }
    ];
    const commonMenuOptions = [
        {
            name: FavoritesKebabMenu.REMOVE_FAVORITE,
            icon: agentChatIconList[AGENT_CHAT_ICON.YELLOW_STAR](''),
        },
        {
            name: GroupKebabMenu.EDIT_GROUP_NAME,
            icon: agentChatIconList[AGENT_CHAT_ICON.EDIT](''),
        }
    ];
    const menuOptions = useMemo(() => {
        if (kebab === 'favorites' || kebab === 'direct') {
            return commonMenuOptions;
        }
        else if (kebab === 'groups') {
            return groupMenuOptions;
        }
        return [];
    }, [kebab]);
    /**
     * Handles the selection of a menu item
     * @example handleMenuSelection('customize',Ref)
     */
    const handleMenuSelection = useCallback((action) => {
        var _a, _b, _c;
        // dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(buttonRef.current));
        switch (action) {
            case GroupKebabMenu.LEAVE_GROUP:
                dispatch(removeMemberGroupChat({
                    members: [userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId],
                    groupId: ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.groupId) || '',
                    leaveGroup: true,
                }));
                break;
            case GroupKebabMenu.ADD_MEMBER:
                dispatch(agentHiveActions.updateMembersDetails());
                setMode('add-user');
                setIsPopoverMenuOpen(true);
                break;
            case GroupKebabMenu.EDIT_GROUP_NAME:
                setMode('edit');
                setIsPopoverMenuOpen(true);
                break;
            case FavoritesKebabMenu.REMOVE_FAVORITE:
                dispatch(removeFavoriteMember({
                    userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId,
                    memberId: (_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.userId,
                }));
                break;
            case GroupKebabMenu.SEARCH_CHAT:
                dispatch(removeFavoriteMember({
                    userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId,
                    memberId: (_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.userId,
                }));
                break;
            default:
                break;
        }
    }, [dispatch, userInfo, activeChat]);
    const kebabMenuOption = (_jsx(CcfBox, Object.assign({ id: 'agent-chat-kebab-options', "data-testid": 'agent-chat-kebab-options', tabIndex: 0 }, { children: _jsx(CcfMenu, { options: menuOptions, handleMenuSelection: handleMenuSelection, menuItemStyles: styles.MenuItemContent, menuTextStyles: styles.MenuItemNameBold }) })));
    return (_jsxs(_Fragment, { children: [_jsx(CcfBox, Object.assign({ sx: styles.AgentChatKebab }, { children: kebabMenuOption })), _jsx(CcfAgentChatGroupContainer, { isPopoverMenuOpen: isPopoverMenuOpen, setIsPopoverMenuOpen: setIsPopoverMenuOpen, anchorEl: anchorEl, mode: mode })] }));
};
export default memo(CcfAgentChatKebabMenu);
//# sourceMappingURL=ccf-agent-chat-kebab-menu.js.map