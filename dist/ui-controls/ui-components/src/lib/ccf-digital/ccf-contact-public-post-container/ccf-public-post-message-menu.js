import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, Grid, Divider } from '@mui/material';
import { Visibility, VisibilityOff, MoreVert, DesktopWindowsOutlined, } from '@mui/icons-material';
import CcfInteractionMenuStyles from '../../ccf-interaction-space/ccf-interaction-menu/ccf-interaction-menu-styles';
import { DigitalContactActions, ReactionType, DigitalChannelType, DigitalContactStatus, DigitalContactDirection } from '@nice-devone/common-sdk';
import { CcfTypography, CcfTrashBinIcon } from '@nice-devone/ui-controls';
import { useDispatch } from 'react-redux';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { messageShowHide, addMessageReaction, MessageKebabMenu } from '../../ccf-assignment-panel/ccf-assignment-utils';
import { iconList, MESSAGE_ACTION_ICONS } from '../../ccf-icon/ccf-icon-list';
/**
 * interface for message action type
 */
var MessageActionType;
(function (MessageActionType) {
    /**
    * social message type
    */
    MessageActionType["SOCIAL"] = "social";
    /**
    * delete message type
    */
    MessageActionType["DELETE"] = "delete";
})(MessageActionType || (MessageActionType = {}));
/**
 * Component displays Kebab menu for messages
 * @returns Kebab menu for messages
 * ```
 * @example
 * <CcfPublicPostMessageMenu/>
 * ```
 */
export function CcfPublicPostMessageMenu(props) {
    var _a, _b, _c, _d, _e, _f, _g;
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = CcfInteractionMenuStyles(theme);
    const { contactDetails, message, actionFlags, showConfirmationDialog, moreButtonStyles, isOriginalPost, onReply, addOrRemoveMessageReaction } = props;
    const { isCurrentCustomer, isShareSelected, isMessageHidden, isMessageDeleted, canDeleteContent, canDeleteAuthorName, isReplyAllowed } = actionFlags;
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const channelType = (_a = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channelType) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const isShowOriginUrlAvailable = !isOriginalPost && message.url && message.url !== '' && message.direction === 'inbound'; // For original post, will disable the show origin menu option
    const shouldOpenKebabMenu = (!isMessageDeleted || isShowOriginUrlAvailable);
    // For public channel, few channels like LinkedIn does not have any feature like hide, delete, so channel flag based check added
    const hasMsgActions = ((_b = contactDetails.channel) === null || _b === void 0 ? void 0 : _b.hasAbilityToHide) || ((_c = contactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasAbilityToDelete) || ((_d = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _d === void 0 ? void 0 : _d.hasAbilityToShare) || canDeleteContent || canDeleteAuthorName || isReplyAllowed;
    const showMessageKebabMenu = hasMsgActions || shouldOpenKebabMenu || (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.status) !== DigitalContactStatus.CLOSED;
    const { reactionStatistics } = (_f = (_e = contactDetails.messages) === null || _e === void 0 ? void 0 : _e.find(msg => msg.id === message.id)) !== null && _f !== void 0 ? _f : {};
    const msgOptions = [
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'reply' })),
            icon: iconList[MESSAGE_ACTION_ICONS.REPLY]('', { sx: styles.replyIcon }),
            status: DigitalContactActions.REPLY,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'hide' })),
            icon: _jsx(VisibilityOff, {}),
            status: DigitalContactActions.HIDE,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: reactionStatistics.isLikedByChannel ? 'unlike' : 'like' })),
            icon: _jsx(CcfIcon, { iconName: ReactionType.LIKE, size: CHANNEL_ICON_SIZE.SMALL, svgIconStyles: { sx: styles.likeOption } }),
            status: DigitalContactActions.LIKE,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'unhide' })),
            icon: _jsx(Visibility, {}),
            status: DigitalContactActions.UNHIDE,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: channelType === DigitalChannelType.FACEBOOK ? 'share' : 'retweet' })),
            icon: _jsx(CcfIcon, { iconName: 'share' }),
            status: DigitalContactActions.SHARE,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: channelType === DigitalChannelType.FACEBOOK ? 'shared' : 'retweeted' })),
            icon: _jsx(CcfIcon, { iconName: 'share' }),
            status: DigitalContactActions.SHARED,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'showOrigin' })),
            icon: _jsx(DesktopWindowsOutlined, {}),
            status: DigitalContactActions.SHOW_ORIGIN,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.SOCIAL,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'deleteContent' })),
            icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_CONTENT, svgIconStyles: { sx: styles.deleteMenuOptions } }),
            status: DigitalContactActions.DELETE_CONTENT,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.DELETE,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'deleteAuthorName' })),
            icon: _jsx(CcfIcon, { iconName: MessageKebabMenu.DELETE_AUTHOR_NAME, svgIconStyles: { sx: styles.deleteMenuOptions } }),
            status: DigitalContactActions.DELETE_AUTHOR_NAME,
            direction: DigitalContactDirection.INBOUND,
            isDividerEnabled: false,
            type: MessageActionType.DELETE,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'deleteEntireMessage' })),
            icon: _jsx(CcfTrashBinIcon, { viewBox: '0 0 20 18' }),
            status: DigitalContactActions.DELETE,
            direction: DigitalContactDirection.OUTBOUND,
            isDividerEnabled: false,
            type: MessageActionType.DELETE,
        }
    ];
    /**
     * handleClick to handle click event
     * @param event -Mouse event
     * @example handleClick(event);
     */
    const openDigitalKebabMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     * handleClose to handle close event
     * @example handleClose(event);
     */
    const closeDigitalKebabMenu = () => {
        setAnchorEl(null);
    };
    /**
     * handleSelection to handle Messages for different actions like hide/un-hide, delete and retweet/share
     * @example messageHandler();
     */
    const messageHandler = (data) => {
        var _a;
        setAnchorEl(null);
        const actionType = data === null || data === void 0 ? void 0 : data.toLowerCase();
        switch (actionType) {
            case DigitalContactActions.DELETE:
                showConfirmationDialog && showConfirmationDialog(true, MessageKebabMenu.DELETE_ENTIRE_MESSAGE);
                break;
            case DigitalContactActions.HIDE:
            case DigitalContactActions.UNHIDE:
                dispatch(messageShowHide({
                    interactionId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.interactionId,
                    caseId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId,
                    messageId: message === null || message === void 0 ? void 0 : message.id,
                    isHidden: isMessageHidden,
                }));
                break;
            case DigitalContactActions.SHARE: {
                const selectedReactionDetails = {
                    messageId: message.id,
                    reactionType: ReactionType.SHARE,
                    interactionId: contactDetails.interactionId,
                    caseId: contactDetails.caseId,
                    isSelected: true,
                };
                dispatch(addMessageReaction(selectedReactionDetails));
                break;
            }
            case DigitalContactActions.SHOW_ORIGIN: {
                const messageUrlToOpen = (_a = message.url) === null || _a === void 0 ? void 0 : _a.toString();
                window.open(messageUrlToOpen);
                break;
            }
            case DigitalContactActions.DELETE_AUTHOR_NAME: {
                showConfirmationDialog && showConfirmationDialog(true, MessageKebabMenu.DELETE_AUTHOR_NAME);
                break;
            }
            case DigitalContactActions.DELETE_CONTENT: {
                showConfirmationDialog && showConfirmationDialog(true, MessageKebabMenu.DELETE_CONTENT);
                break;
            }
            case DigitalContactActions.REPLY: {
                onReply && onReply(message);
                break;
            }
            case DigitalContactActions.LIKE: {
                addOrRemoveMessageReaction && addOrRemoveMessageReaction(!reactionStatistics.isLikedByChannel, ReactionType.LIKE);
                break;
            }
        }
        ;
    };
    /**
     * Filter the kebab menu options to display on each public channel message
     * @param menu - Menu option details
     * @example - filterKebabMenuOptions(`{status: 'show origin', direction: 'inbound'}`);
     * @returns - menu to display true/false
     */
    const filterKebabMenuOptions = (menu) => {
        var _a, _b, _c, _d;
        const showMessageOriginMenu = isShowOriginUrlAvailable && menu.status === DigitalContactActions.SHOW_ORIGIN;
        const showHideUnHideMenu = ((_a = contactDetails.channel) === null || _a === void 0 ? void 0 : _a.hasAbilityToHide) && menu.direction === message.direction &&
            (isMessageHidden ? menu.status === DigitalContactActions.UNHIDE : menu.status === DigitalContactActions.HIDE && !isMessageDeleted);
        const showDeleteMenu = (((_b = contactDetails.channel) === null || _b === void 0 ? void 0 : _b.hasAbilityToDelete) && !isMessageDeleted) && menu.status === DigitalContactActions.DELETE;
        const showShareRetweetMenu = (((_c = contactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasAbilityToShare) && isCurrentCustomer && !isMessageHidden && !isMessageDeleted) &&
            (isShareSelected ? menu.status === DigitalContactActions.SHARED : menu.status === DigitalContactActions.SHARE);
        const showDeleteContentMenu = canDeleteContent && menu.status === DigitalContactActions.DELETE_CONTENT; // if the canDeleteContent flag is true then only show the delete content menu
        const showDeleteAuthorNameMenu = canDeleteAuthorName && menu.status === DigitalContactActions.DELETE_AUTHOR_NAME; // if the canDeleteAuthorName flag is true then only show the delete author name menu
        const showReplyMenu = isReplyAllowed && menu.status === DigitalContactActions.REPLY; // if isReplyAllowed flag is true then only display the Reply menu
        const showLike = ((_d = contactDetails.channel) === null || _d === void 0 ? void 0 : _d.hasAbilityToLike) && isOriginalPost && menu.status === DigitalContactActions.LIKE; // if the channel has ability to like and if it is a original post then only show the like option in kebab menu
        const displayCurrentMenu = showMessageOriginMenu || showHideUnHideMenu || showDeleteMenu || showShareRetweetMenu || showDeleteContentMenu || showDeleteAuthorNameMenu || showReplyMenu || showLike;
        return displayCurrentMenu;
    };
    let filteredMessageOptions = msgOptions.filter((menu) => filterKebabMenuOptions(menu)); // Checking menu is enabled or not
    const socialMessageOptions = filteredMessageOptions.filter((menu) => menu.type === MessageActionType.SOCIAL);
    const lastSocialMessageOption = (_g = socialMessageOptions[socialMessageOptions.length - 1]) !== null && _g !== void 0 ? _g : {}; // checking the last social message option
    filteredMessageOptions = filteredMessageOptions.map((menu, _, menuOptions) => {
        var _a, _b;
        if (lastSocialMessageOption && menu.status === (lastSocialMessageOption === null || lastSocialMessageOption === void 0 ? void 0 : lastSocialMessageOption.status)) {
            const hasDeleteOptions = (_b = ((_a = menuOptions === null || menuOptions === void 0 ? void 0 : menuOptions.filter((menu) => menu.type === MessageActionType.DELETE)) === null || _a === void 0 ? void 0 : _a.length) > 0) !== null && _b !== void 0 ? _b : false;
            return Object.assign(Object.assign({}, menu), { isDividerEnabled: hasDeleteOptions }); // if last social message option is available & there no other delete option present then will enable the divider for that menu option
        }
        else
            return menu;
    });
    return (_jsxs(_Fragment, { children: [showMessageKebabMenu && filteredMessageOptions.length > 0 && (_jsx(IconButton, Object.assign({ "aria-label": "more", id: "long-button", "aria-controls": open ? 'long-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", sx: moreButtonStyles !== null && moreButtonStyles !== void 0 ? moreButtonStyles : null, onClick: openDigitalKebabMenu }, { children: _jsx(MoreVert, {}) }))), _jsx(Menu, Object.assign({ id: "long-menu", anchorEl: anchorEl, open: open, onClose: closeDigitalKebabMenu, MenuListProps: {
                    'aria-labelledby': 'long-button',
                }, PaperProps: {
                    style: {
                        maxHeight: ITEM_HEIGHT * 5.5 + 16,
                        width: '24ch',
                    },
                } }, { children: filteredMessageOptions &&
                    filteredMessageOptions.map((option) => (_jsxs(Box, { children: [_jsx(MenuItem, Object.assign({ value: option.status, tabIndex: 0, "data-testid": option.status, sx: styles.menuItemMinHeight, onClick: () => messageHandler(option.status) }, { children: _jsxs(Grid, Object.assign({ container: true, alignItems: 'center', sx: styles.menuItemContent }, { children: [_jsx(Box, Object.assign({ sx: styles.menuItemIcon }, { children: _jsx("span", { children: option.icon }) })), _jsx(Box, Object.assign({ sx: styles.menuItemNameBold }, { children: _jsx("span", { children: option.name }) }))] })) }), option.status), (option === null || option === void 0 ? void 0 : option.isDividerEnabled) && _jsx(Divider, { style: styles.dividerMenuOption })] }, option.status))) }))] }));
}
export default React.memo(CcfPublicPostMessageMenu);
//# sourceMappingURL=ccf-public-post-message-menu.js.map