import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CcfCloseIcon, useTranslator, CcfDraggableIcon, CcfDivider, DividerOrientation, DividerVariant, CcfTooltip, CcfTypography, CcfListItemButton, CcfIconButton, } from '@nice-devone/ui-controls';
import { useEffect, useRef, useState } from 'react';
import { Stack, Box, useTheme, useMediaQuery, ListSubheader } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Navigation } from '../../enums/navigation-menus';
import { getSelectedMenuName, getQuickAppNavigationItems, globalActions, getPanelAppNavigationItems, updateExternalProdURL, getPinnedMenuItem, } from '../global.app.slice';
import { useNavigationItems } from '../ccf-navigation/useNavigationItems';
import { updateAppSpaceTabStatus, selectAppSpaceActiveTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfAssignmentAction, selectInboxCollapsedState } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import ccfAppHamburgerMenuStyles from './ccf-app-hamburger-menu.styles';
import { LaunchPopover } from '../ccf-launch-popover/ccf-launch-popover';
import { debounce } from '../../hooks/useDebounce';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
/**
 * Used for Application Navigation
 * @param props - ? - CcfAppHamburgerMenuProps
 * @example `<CcfAppHamburgerMenu />`
 */
export const CcfAppHamburgerMenu = (props) => {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const selectedMenu = useSelector(getSelectedMenuName);
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    const { isAppSpaceMenu } = props;
    const quickAppNavigationItems = useSelector(getQuickAppNavigationItems);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const navigationItemsLS = isAppSpaceMenu ? panelAppNavigationItems : quickAppNavigationItems;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const navigationItemList = useNavigationItems(isAppSpaceMenu, true);
    const [dragStartMenuId, setDragStartMenuId] = useState('');
    const { setSelectedMenu, reArrangeMenu, setPinnedMenuItem } = globalActions;
    const appHamburgerMenuStyles = ccfAppHamburgerMenuStyles(theme);
    const pinnedMenuItem = useSelector(getPinnedMenuItem);
    const [hoveredItemName, setHoveredItemName] = useState('');
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const focusRef = useRef(null);
    const debounceTimer = 200;
    const [ignoreKeyUp, setIgnoreKeyUp] = useState(false);
    // When drawer opens, initialize the ignore flag and disable it after 200ms
    useEffect(() => {
        setIgnoreKeyUp(true);
        debouncedToggleIgnoreKeyUp();
    }, [props.isDrawerOpen]);
    // Debounce function to toggle ignoreKeyUp state
    const debouncedToggleIgnoreKeyUp = debounce(() => setIgnoreKeyUp((prevIgnoreKeyUp) => !prevIgnoreKeyUp), debounceTimer);
    /**
     *
     * onKeyUpHendler used to swtich menus using keybord event
     * @param e - keyup event object
     * @param menuName - selected menu name
     * @param callback - as an optional function callback
     * @example - onKeyUpHendler
     */
    const handleClick = (e, snapshot, callback) => {
        if (snapshot.isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (callback) {
            callback();
        }
    };
    /**
     * Used to swtich menus
     * @param name - string
     * @param path - string
     * @example - setMenu
     */
    const setMenu = (name, toggleDrawer) => {
        if (!isInboxCollapsed && isBelowMd) {
            dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
        }
        if (name === Navigation.HELP) {
            window.open(props.helpUrl, '_blank', 'noopener noreferrer');
            toggleDrawer(false);
        }
        else if (name !== Navigation.LAUNCH) {
            if (isAppSpaceMenu) {
                const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === name);
                if (name === Navigation.DIRECTORY) {
                    dispatch(agentDirectoryActions.setFocusInDirectory(true));
                }
                dispatch(updateAppSpaceTabStatus({ index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '', tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '' }));
                updateExternalProdURL(name, null, null);
            }
            else {
                updateExternalProdURL(null, name, null);
                dispatch(setSelectedMenu({ name: name }));
            }
            toggleDrawer(false);
        }
    };
    /**
     * used to over-ride the styles on drag and drop event
     * @param style - applied drag and drop styles
     * @param snapshot - snapshot of current drag status
     * @example - getStyle
     */
    function getStyle(style, snapshot) {
        var _a;
        if (!snapshot.isDropAnimating) {
            return Object.assign(Object.assign({}, style), { backgroundColor: snapshot.isDragging
                    ? `${(_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background.default}`
                    : 'inherit', cursor: 'pointer' });
        }
        return Object.assign(Object.assign({}, style), { transitionDuration: '0.01s' });
    }
    /**
     * onDragStart used to set id of menu where dragging started
     * @param start - variable sent on onDrag event
     * @example - onDragStart
     */
    function onDragStart(start) {
        setDragStartMenuId(start.source.droppableId);
    }
    /**
     *
     * @param tooltip - name of launch menu item
     * @example - renderLaunchPopover("Launch")
     * @returns React.ReactNode
     */
    function renderLaunchPopover(tooltip) {
        return (_jsx(Box, Object.assign({ component: "span", sx: { marginLeft: 0, width: '100%' } }, { children: _jsx(LaunchPopover, { id: 'launchPopover', anchorOrigin: isSmView
                    ? { horizontal: 'left', vertical: 'bottom' }
                    : { horizontal: 'center', vertical: 'top' }, disableTooltip: true, transformOrigin: isSmView
                    ? { horizontal: 'right', vertical: 'top' }
                    : { horizontal: 'left', vertical: 'top' }, htmlColor: theme.palette.background.dark, labelComponent: _jsx(Box, Object.assign({ component: "span", sx: appHamburgerMenuStyles.menuName }, { children: tooltip })), isDrawerOpen: props === null || props === void 0 ? void 0 : props.isDrawerOpen, toggleDrawer: props.toggleDrawer, tooltipPlacement: 'top', HamburgermenuLaunch: true, buttonSx: appHamburgerMenuStyles.launchIcon }) })));
    }
    /**
     *
     * onKeyUpHendler used to swtich menus using keybord event
     * @param e - keyup event object
     * @param menuName - selected menu name
     * @example - onKeyUpHendler
     */
    function onKeyUpHandler(e, menuName) {
        if (e.code === 'Enter') {
            setMenu(menuName, props.toggleDrawer);
        }
    }
    /**
     * pinItem - click to pin item
     * @param e - keyup event object
     * @param menuName - hovered menu name
     * @example - pinItem
     */
    const pinItem = (event, menuName) => {
        if (menuName === pinnedMenuItem) {
            dispatch(setPinnedMenuItem(''));
        }
        else {
            dispatch(setPinnedMenuItem(menuName));
        }
        event.stopPropagation();
    };
    /**
     * pinIcon - returns pin icon
     * @param menuName - hovered/selected menu name
     * @param tooltip - menuName
     * @example - pinIcon('Directory','Directory', true)
     */
    const pinIcon = (menuName, tooltip, isActive) => {
        const isDisabled = !isActive;
        return (pinnedMenuItem === menuName || hoveredItemName === menuName) &&
            (_jsx(CcfTooltip, Object.assign({ title: `${pinnedMenuItem === menuName ? translate('unpin') : translate('pin')} ${tooltip}`, arrow: true }, { children: _jsx(Box, Object.assign({ component: "div", sx: appHamburgerMenuStyles.pinIcon, role: 'button', tabIndex: 0, "aria-disabled": isDisabled, "data-testid": "pin-item-button", onKeyDown: (e) => { if (e.key === 'Enter') {
                        pinItem(e, menuName);
                    } }, onClick: (e) => pinItem(e, menuName) }, { children: pinnedMenuItem === menuName
                        ? _jsx(PushPinIcon, { fontSize: 'small', "data-testid": "pin-icon", onClick: (e) => pinItem(e, menuName) })
                        : _jsx(PushPinOutlinedIcon, { fontSize: 'small', "data-testid": "pin-menu-item", onClick: (e) => pinItem(e, menuName) }) })) })));
    };
    useEffect(() => {
        var _a;
        const pinnedMenuItemLS = LocalStorageHelper.getItem(StorageKeys.PINNED_MENU_ITEM);
        if (pinnedMenuItemLS) {
            dispatch(setPinnedMenuItem(pinnedMenuItemLS));
        }
        else {
            dispatch(setPinnedMenuItem(''));
        }
        (_a = focusRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    const contactSpecificApps = [];
    const globalApps = [];
    let contactSpecificList = [];
    navigationItemsLS.forEach((navItem) => {
        if (navItem.contactApp) {
            contactSpecificApps.push(navItem);
        }
        else if (!navItem.contactApp && navItem.menuName !== 'Interaction') {
            globalApps.push(navItem);
        }
    });
    contactSpecificList = contactSpecificApps.map(({ menuName, tooltip, isActive }, index) => {
        if ((isSmView || isAppSpaceMenu) && isActive) {
            return (_jsx(Draggable, Object.assign({ draggableId: `draggable-${menuName}`, index: index }, { children: (provided, snapshot) => (_jsx(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.draggableProps, { style: getStyle(provided.draggableProps.style, snapshot), sx: appHamburgerMenuStyles.draggableItem, "data-testid": "contact-menu-list", tabIndex: 0, role: "button", onKeyUp: (e) => onKeyUpHandler(e, menuName), onMouseEnter: () => !isMobile && setHoveredItemName(menuName), onMouseLeave: () => !isMobile && setHoveredItemName('') }, { children: _jsxs(CcfListItemButton, Object.assign({ selected: selectedMenu === menuName, sx: [appHamburgerMenuStyles.menuActive], "data-testid": "menu-list-active", onClick: (e) => handleClick(e, snapshot, () => setMenu(menuName, props.toggleDrawer)) }, { children: [_jsx(Box, Object.assign({ component: 'span' }, provided.dragHandleProps, { sx: appHamburgerMenuStyles.dragIconContainer }, { children: _jsx(CcfDraggableIcon, { sx: appHamburgerMenuStyles.dragIcon }) })), _jsx(Box, Object.assign({ component: "span", sx: appHamburgerMenuStyles.menuName, "data-testid": "hover-menu-name-contact", onTouchStart: (e) => touchStart(e, menuName), onTouchEnd: clearTouch }, { children: tooltip })), pinIcon(menuName, tooltip, isActive)] })) }), menuName)) }), menuName));
        }
        else {
            return (_jsx(Draggable, Object.assign({ draggableId: `draggable-${menuName}`, index: index }, { children: (provided, snapshot) => (_jsx(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.draggableProps, { style: getStyle(provided.draggableProps.style, snapshot), sx: appHamburgerMenuStyles.draggableItem, tabIndex: 0, role: "button", "data-testid": "draggable-menu-list", onKeyUp: (e) => onKeyUpHandler(e, menuName), onMouseEnter: () => !isMobile && setHoveredItemName(menuName), onMouseLeave: () => !isMobile && setHoveredItemName('') }, { children: _jsxs(CcfListItemButton, Object.assign({ selected: isAppSpaceMenu
                            ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === menuName
                            : selectedMenu === menuName, "data-testid": "menu-list-btn", onClick: (e) => handleClick(e, snapshot), style: { cursor: 'default', opacity: 0.38 } }, { children: [_jsx(Box, Object.assign({ component: 'span' }, provided.dragHandleProps, { sx: appHamburgerMenuStyles.dragIconContainer }, { children: _jsx(CcfDraggableIcon, { sx: appHamburgerMenuStyles.dragIcon }) })), _jsx(Box, Object.assign({ component: "span", sx: appHamburgerMenuStyles.menuName, "data-testid": "draggable-menu-list-hover", onTouchStart: (e) => touchStart(e, menuName), onTouchEnd: clearTouch }, { children: tooltip })), pinIcon(menuName, tooltip, isActive)] })) }), menuName)) }), menuName));
        }
    });
    let timer;
    /**
     * @param event - Touch event
     * @example - start(e)
     */
    const touchStart = (e, menuName) => {
        timer = window.setTimeout(() => {
            e.preventDefault();
            setHoveredItemName(menuName);
        }, 1000);
    };
    /**
     * @example - clear()
     */
    const clearTouch = () => {
        clearTimeout(timer);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "appHamburger-Menu", "data-testid": "appHamburger-Menu", sx: appHamburgerMenuStyles.listSubheader }, { children: [_jsx(CcfTypography, { variant: 'h5', id: "customize-appHamburger-dialog-title", translationKey: "customize", sx: appHamburgerMenuStyles.customizeText }), _jsx(CcfIconButton, Object.assign({ disableRipple: true, sx: Object.assign(Object.assign({}, appHamburgerMenuStyles === null || appHamburgerMenuStyles === void 0 ? void 0 : appHamburgerMenuStyles.focussedElement), { 'padding': 0 }), "data-testid": "close-button", "aria-label": translate('close'), ref: focusRef, onClick: () => props.toggleDrawer(false), tabIndex: 0 }, { children: _jsx(CcfCloseIcon, { sx: appHamburgerMenuStyles.closeIcon, viewBox: "-8 -4 32 32" }) }))] })), _jsx("nav", { children: _jsx(DragDropContext, Object.assign({ onDragEnd: (param) => {
                        if (param.source && param.destination) {
                            const navigationItemsLS = JSON.parse(localStorage.getItem(StorageKeys.CXONE_NAVIGATION_ITEMS) || '{}');
                            dispatch(reArrangeMenu({ src: param.source, dest: param.destination, isAppSpaceMenu: isAppSpaceMenu, navigationItemsLS: navigationItemsLS, contactSpecificAppsCount: contactSpecificApps.length, navigationItemList: navigationItemList }));
                        }
                    }, onDragStart: onDragStart }, { children: _jsxs(Stack, { children: [_jsx(Droppable, Object.assign({ droppableId: "droppable-1", isDropDisabled: dragStartMenuId !== 'droppable-1' }, { children: (provided, _) => (_jsxs(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.droppableProps, { children: [contactSpecificList, provided.placeholder] }))) })), contactSpecificApps.length ? _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: appHamburgerMenuStyles.divider }) : null, _jsx(Droppable, Object.assign({ droppableId: "droppable-2", isDropDisabled: dragStartMenuId !== 'droppable-2' && dragStartMenuId !== 'droppable-3' }, { children: (provided, _) => (_jsxs(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.droppableProps, { children: [globalApps === null || globalApps === void 0 ? void 0 : globalApps.slice(0, 8).map(({ menuName, tooltip, isActive, isHidden }, index) => {
                                            const isMenuItemDisabled = !isActive;
                                            if (isHidden) {
                                                return null;
                                            }
                                            return (_jsx(Draggable, Object.assign({ draggableId: `draggable-${menuName}`, index: index }, { children: (provided, snapshot) => (_jsx(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.draggableProps, { style: getStyle(provided.draggableProps.style, snapshot), tabIndex: 0, role: "button", sx: appHamburgerMenuStyles.draggableItem, "data-testid": "appHamburger-menu-item", onKeyUp: (e) => { if (props === null || props === void 0 ? void 0 : props.isDrawerOpen) {
                                                        onKeyUpHandler(e, menuName);
                                                    } }, onMouseEnter: () => !isMobile && setHoveredItemName(menuName), onMouseLeave: () => !isMobile && setHoveredItemName('') }, { children: _jsxs(CcfListItemButton, Object.assign({ selected: isAppSpaceMenu
                                                            ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === menuName
                                                            : selectedMenu === menuName, sx: [appHamburgerMenuStyles.menuActive], onClick: (e) => handleClick(e, snapshot, () => !isMenuItemDisabled && setMenu(menuName, props.toggleDrawer)), style: isMenuItemDisabled
                                                            ? { cursor: 'default', opacity: 0.38 }
                                                            : {} }, { children: [_jsx(Box, Object.assign({ component: 'span' }, provided.dragHandleProps, { sx: appHamburgerMenuStyles.dragIconContainer }, { children: _jsx(CcfDraggableIcon, { sx: appHamburgerMenuStyles.dragIcon }) })), menuName === Navigation.LAUNCH ? (renderLaunchPopover(tooltip)) : (_jsx(Box, Object.assign({ component: "span", "data-testid": "hover-menu-name", sx: appHamburgerMenuStyles.menuName, onTouchStart: (e) => touchStart(e, menuName), onTouchEnd: clearTouch }, { children: tooltip }))), pinIcon(menuName, tooltip, isActive)] })) }), menuName)) }), menuName));
                                        }), provided.placeholder] }))) })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: appHamburgerMenuStyles.divider }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: Object.assign(Object.assign({}, appHamburgerMenuStyles.divider), { marginTop: '3px' }) }), _jsx(Droppable, Object.assign({ droppableId: "droppable-3", isDropDisabled: dragStartMenuId !== 'droppable-2' && dragStartMenuId !== 'droppable-3' }, { children: (provided, _) => (_jsxs(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.droppableProps, { children: [(globalApps === null || globalApps === void 0 ? void 0 : globalApps.length) > 8 && (globalApps === null || globalApps === void 0 ? void 0 : globalApps.slice(8).map(({ menuName, tooltip, isActive, isHidden }, index) => {
                                            const isMenuItemDisabled = !isActive;
                                            if (isHidden) {
                                                return null;
                                            }
                                            return (_jsx(Draggable, Object.assign({ draggableId: `draggable-${menuName}`, index: index }, { children: (provided, snapshot) => (_jsx(Box, Object.assign({ component: "div", ref: provided.innerRef }, provided.draggableProps, { style: getStyle(provided.draggableProps.style, snapshot), sx: appHamburgerMenuStyles.draggableItem, tabIndex: 0, role: "button", "data-testid": "draggable-menu-item", onKeyUp: (e) => onKeyUpHandler(e, menuName), onMouseEnter: () => !isMobile && setHoveredItemName(menuName), onMouseLeave: () => !isMobile && setHoveredItemName('') }, { children: _jsxs(CcfListItemButton, Object.assign({ selected: isAppSpaceMenu
                                                            ? (selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === menuName
                                                            : selectedMenu === menuName, sx: [appHamburgerMenuStyles.menuActive], onClick: (e) => handleClick(e, snapshot, () => !isMenuItemDisabled && setMenu(menuName, props.toggleDrawer)), style: isMenuItemDisabled
                                                            ? { cursor: 'default', opacity: 0.38 }
                                                            : {} }, { children: [_jsx(Box, Object.assign({ component: 'span' }, provided.dragHandleProps, { sx: appHamburgerMenuStyles.dragIconContainer }, { children: _jsx(CcfDraggableIcon, { sx: appHamburgerMenuStyles.dragIcon }) })), _jsx(Box, Object.assign({ component: "span", sx: appHamburgerMenuStyles.menuName, onTouchStart: (e) => touchStart(e, menuName), onTouchEnd: clearTouch }, { children: tooltip })), pinIcon(menuName, tooltip, isActive)] })) }), menuName)) }), menuName));
                                        })), provided.placeholder] }))) }))] }) })) })] }));
};
export default CcfAppHamburgerMenu;
//# sourceMappingURL=ccf-app-hamburger-menu.js.map