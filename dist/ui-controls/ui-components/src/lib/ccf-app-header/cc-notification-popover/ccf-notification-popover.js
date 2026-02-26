import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Divider, IconButton, ListItemText, MenuItem, MenuList, useTheme, Popover } from '@mui/material';
import { useTranslator, CcfAppToastMessage, CcfBadge, CcfButton, CcfCloseIcon } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { agentWemNotificationsActions, getAcdNotifications, getActiveACDNotifications, getAllNotification, getNewAcdUnreadNotification, getNotificationKeyStatus, getUnreadNotifications, markACDNotification, markNotificationsAknowledged, getNewConversationNotification } from '../../ccf-agent-notification/ccf-agent-notification.slice';
import { useEffect, useRef, useState, createRef } from 'react';
import CcfNotificationItem from './ccf-notification-item/ccf-notification-item';
import ccfNotificationPopoverStyles from './ccf-notification-popover.styles';
import { toast } from 'react-toastify';
import ccfAppHeaderStyles from '../ccf-app-header-styles';
import { StorageKeys } from '@nice-devone/core-sdk';
import { Navigation } from '../../../enums/navigation-menus';
import { globalActions } from '../../../lib/global.app.slice';
import { EventKeys } from '../../../enums/event-keys';
/**
 * Function is used to display notification popup component on bell icon
 * @param props -CcfNotificationPopover
 * @returns Popup component displaying agent notifications
 * ```
 * @example <CcfNotificationPopover iconComponent={<CcfHeaderBellIcon />} />
 * ```
 */
export function CcfNotificationPopover({ iconComponent, setShowTooltip, isConversationsStandAlone = false, }) {
    var _a, _b;
    const unreadNotificationCount = (_b = (_a = useSelector(getUnreadNotifications)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    const unreadNotifications = useSelector(getUnreadNotifications);
    const theme = useTheme();
    const notifications = useSelector(getAllNotification);
    const acdnotifications = useSelector(getAcdNotifications);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItemClicked, setMenuItemClicked] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const notificationRefs = notifications.map(() => createRef());
    const notificationItems = notifications.map((notification, index) => ({
        label: _jsx(CcfNotificationItem, { item: notification, ref: notificationRefs[index] }, notification.id),
        type: notification.subject,
    }));
    const newAcdNotification = useSelector(getNewAcdUnreadNotification);
    const conversationsNotification = useSelector(getNewConversationNotification);
    const notificationId = newAcdNotification === null || newAcdNotification === void 0 ? void 0 : newAcdNotification.id;
    const [agentMessagesDisplayedIds, setAgentMessagesDisplayedIds] = useState([]);
    const [conversationDisplayedIds, setConversationDisplayedIds] = useState([]);
    const notificationRef = useRef(null);
    const isNotificationKeyPressed = useSelector(getNotificationKeyStatus);
    useEffect(() => {
        if (agentMessagesDisplayedIds.length > 0) {
            localStorage.setItem(StorageKeys.AGENT_MESSAGE_POPOVER, JSON.stringify(agentMessagesDisplayedIds));
        }
    }, [agentMessagesDisplayedIds]);
    useEffect(() => {
        const getAgentMessageIdsStorage = localStorage.getItem('agent_message_popover');
        const agentMessagesIds = getAgentMessageIdsStorage && JSON.parse(getAgentMessageIdsStorage);
        const messageId = (agentMessagesIds || []).filter((messageId) => { return messageId === Number(newAcdNotification === null || newAcdNotification === void 0 ? void 0 : newAcdNotification.id); });
        if (newAcdNotification && Object.keys(newAcdNotification).length > 0 && !(messageId === null || messageId === void 0 ? void 0 : messageId.length)) {
            const { subject, message } = newAcdNotification;
            const acdMsgId = Number(newAcdNotification === null || newAcdNotification === void 0 ? void 0 : newAcdNotification.id);
            setAgentMessagesDisplayedIds([...agentMessagesDisplayedIds, acdMsgId]);
            const toastId = toast(_jsx(CcfAppToastMessage, { type: "agentMessage", titleMessage: subject, descriptionMessage: message, secondaryBtnText: "ignore", triggerSecondaryHandler: () => {
                    dispatch(markACDNotification(notificationId));
                    toast.dismiss(toastId);
                } }), {
                autoClose: 5000,
                containerId: 'AgentMessageToastContainer',
                hideProgressBar: true,
                position: 'top-right',
            });
        }
        const conversationsId = conversationDisplayedIds.filter((messageId) => { return messageId === (conversationsNotification === null || conversationsNotification === void 0 ? void 0 : conversationsNotification.id); });
        if (conversationsNotification && Object.keys(conversationsNotification).length > 0 && !(conversationsId === null || conversationsId === void 0 ? void 0 : conversationsId.length)) {
            const { subject, message, notificationType } = conversationsNotification;
            const conversationsMsgId = conversationsNotification.id;
            setConversationDisplayedIds([...conversationDisplayedIds, conversationsMsgId]);
            const isConversationNotification = notificationType === 'ConversationNotification';
            const secondaryBtnText = isConversationNotification ? undefined : 'ignore';
            const toastId = toast(_jsx(CcfAppToastMessage, { type: "agentMessage", titleMessage: subject, descriptionMessage: message, secondaryBtnText: secondaryBtnText, triggerSecondaryHandler: () => {
                    dispatch(markACDNotification(notificationId));
                    toast.dismiss(toastId);
                } }), {
                autoClose: 5000,
                containerId: 'ConversationsToastContainer',
                hideProgressBar: true,
                position: 'bottom-right',
                className: 'conversations',
            });
        }
    }, [notificationId, newAcdNotification, conversationsNotification, dispatch]);
    useEffect(() => {
        const interval = setInterval(() => {
            if ((acdnotifications === null || acdnotifications === void 0 ? void 0 : acdnotifications.length) > 0) {
                dispatch(getActiveACDNotifications());
            }
            else {
                clearInterval(interval);
            }
        }, 60000);
        if (!acdnotifications) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [acdnotifications]);
    useEffect(() => {
        if (isNotificationKeyPressed) {
            if (notificationRef.current && anchorEl === null) {
                setAnchorEl(notificationRef.current);
            }
            dispatch(agentWemNotificationsActions.focusNotification(false));
        }
    }, [anchorEl, isNotificationKeyPressed]);
    const notificationTranslator = translate('notificationCount');
    const messageCount = notificationTranslator.replace('{0}', unreadNotificationCount.toString());
    const headerMessage = (unreadNotificationCount === 0) ? translate('noNewNotification') : messageCount;
    const dropdownOptions = {
        popOverHeader: headerMessage,
        menuItems: [
            {
                items: notificationItems,
            }
        ],
    };
    /**
     * Function called on popover close
     * @example onClose()
     */
    const onClose = () => {
        handleNotificationPopoverClose();
        setAnchorEl(null);
    };
    /**
     * Function to open popover menu
     * @param event - any
     * @example handleNotificationsMenuOpen(event)
     */
    const handleNotificationsMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     * Function to close popover menu on keyboard action
     * @param event - React.KeyboardEvent<HTMLElement> - The keyboard event object.
     * @param index - number - The index of the current menu item within the `dropdownOptions.menuItems` array.
     * @param dropdownOptions - NotificationPopOverData - An object containing the data for the notification popover, including the menu items.
     * @param childIndex - number - The index of the current sub-menu item within the `parentItem.items` array.
     * @param parentItem - NotificationPopOverMenuItems - The parent menu item containing the sub-menu items.
     * @example
     * handleNotificationsMenuClose(event)
     */
    const handleNotificationMenuClose = (event, index, dropdownOptions, childIndex, parentItem) => {
        /**
         * Dev Note:
         * This function is designed to close the notification menu when the user presses the TAB key
         * while focusing on the last item in the last dropdown menu. This ensures proper keyboard navigation
         * and allows users to easily exit the menu.
         */
        if (event && event.key === EventKeys.TAB && index === dropdownOptions.menuItems.length - 1 && childIndex === parentItem.items.length - 1) {
            onClose();
        }
    };
    /**
     * Used to handle the popover close event
     * @example
     * const closePopover = this.handleNotificationPopoverClose()
     */
    const handleNotificationPopoverClose = () => {
        unreadNotifications.map((notification) => {
            if (notification.notificationType === 'ConversationNotification') {
                dispatch(globalActions.setSelectedMenu({ name: Navigation.AGENT_CHAT }));
            }
            return dispatch(markNotificationsAknowledged(notification.id));
        });
    };
    const notificationStyles = ccfNotificationPopoverStyles(theme, isConversationsStandAlone);
    const appHeaderStyles = ccfAppHeaderStyles(theme);
    /**
     * Used to handle the popover close event on keyboard action
     * @param event - React.KeyboardEvent<HTMLElement> - The keyboard event object.
     * @param index - number - The index of the current menu item within the `dropdownOptions.menuItems` array.
     * @param dropdownOptions - NotificationPopOverData - An object containing the data for the notification popover, including the menu items.
     * @param childIndex - number - The index of the current sub-menu item within the `parentItem.items` array.
     * @param parentItem - NotificationPopOverMenuItems - The parent menu item containing the sub-menu items.
     * @example
     * const closePopover = this.handleMenuItemKeyDown()
     */
    const handleMenuItemKeyDown = (event, index, dropdownOptions, childIndex, parentItem) => {
        if (event.key === EventKeys.ENTER) {
            setMenuItemClicked(true);
            event.stopPropagation();
            onClose();
        }
        else if (event.key === EventKeys.TAB) {
            handleNotificationMenuClose(event, index, dropdownOptions, childIndex, parentItem);
        }
    };
    /**
     * Used to handle the popover close event
     * @example
     * const closePopover = this.handleIconButtonClick()
     */
    const handleIconButtonClick = (event) => {
        if (menuItemClicked) {
            setMenuItemClicked(false);
            return;
        }
        handleNotificationsMenuOpen(event);
    };
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, Object.assign({ "aria-haspopup": true, "data-testid": "notification-open", onClick: handleIconButtonClick, "aria-expanded": open, "aria-label": translate('notifications'), sx: [notificationStyles.notificationIcon, appHeaderStyles.button, appHeaderStyles === null || appHeaderStyles === void 0 ? void 0 : appHeaderStyles.focussedElement, appHeaderStyles === null || appHeaderStyles === void 0 ? void 0 : appHeaderStyles.focussedBackground], disableFocusRipple: true, ref: notificationRef, onFocus: () => setShowTooltip(true), onBlur: () => setShowTooltip(false) }, { children: _jsx(CcfBadge, Object.assign({ sx: { badge: Object.assign(Object.assign({}, appHeaderStyles.notificationBadge), { cursor: 'default' }) }, badgeStyles: appHeaderStyles.notificationBadge, badgeContent: unreadNotificationCount, color: "error", label: unreadNotificationCount + ' ' + translate('notifications'), role: 'status' }, { children: iconComponent })) })), _jsx(Popover, Object.assign({ onMouseEnter: () => setShowTooltip(false), "data-testid": "notification-close", id: id, anchorEl: anchorEl, open: open, onClose: onClose, PaperProps: {
                    elevation: 2,
                    sx: notificationStyles.notificationMenu,
                } }, { children: _jsxs(Box, { children: [dropdownOptions.popOverHeader && (_jsxs(Box, { children: [_jsxs(Box, Object.assign({ sx: notificationStyles.popoverHeader }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ "data-testid": "popoverheader" }, { children: dropdownOptions.popOverHeader })) }), _jsx(CcfButton, Object.assign({ "aria-label": translate('closeNotification'), tabIndex: 0, onClick: onClose, onKeyDown: (e) => {
                                                if ([EventKeys.ENTER, ' '].includes(e.key)) {
                                                    e.preventDefault();
                                                    onClose();
                                                }
                                            }, disableRipple: true, disableElevation: true, variant: "text" }, { children: _jsx(CcfCloseIcon, { viewBox: "0 0 20 20" }) }))] })), _jsx(Divider, { variant: "fullWidth" })] })), dropdownOptions.menuItems.length > 0 && dropdownOptions.menuItems.map((parentItem, index) => {
                            var _a, _b, _c;
                            return (_jsx(MenuList, Object.assign({ sx: notificationStyles.notificationOptions, "data-testid": "Menu-Item" }, { children: (_a = parentItem.items) === null || _a === void 0 ? void 0 : _a.map((childItem, childIndex) => {
                                    var _a, _b;
                                    return (_jsxs(Box, Object.assign({ tabIndex: -1 }, { children: [_jsx(MenuItem, Object.assign({ onClick: () => {
                                                    const ref = notificationRefs[childIndex];
                                                    if (ref && ref.current && typeof ref.current.handleNotificationClick === 'function') {
                                                        ref.current.handleNotificationClick();
                                                    }
                                                    onClose();
                                                }, onKeyDown: (event) => handleMenuItemKeyDown(event, index, dropdownOptions, childIndex, parentItem) }, { children: _jsx(ListItemText, { children: _jsx("span", Object.assign({ className: "NotificationActionLabel", style: { fontSize: '12px' } }, { children: childItem.label })) }) }), (_a = childItem.label) === null || _a === void 0 ? void 0 : _a.toString()), _jsx(Divider, { variant: "middle" })] }), (_b = childItem.label) === null || _b === void 0 ? void 0 : _b.toString()));
                                }) }), (_c = (_b = parentItem.items[index]) === null || _b === void 0 ? void 0 : _b.type) === null || _c === void 0 ? void 0 : _c.toString()));
                        })] }) }))] }));
}
export default CcfNotificationPopover;
//# sourceMappingURL=ccf-notification-popover.js.map