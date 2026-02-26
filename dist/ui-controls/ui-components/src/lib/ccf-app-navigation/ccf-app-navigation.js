import { __awaiter, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveContactInSelectedInteraction, getAllInteractions, getNonIncomingActiveContactInSelectedInteraction, selectUserInConference, selectUserInConsult, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { Box, Divider, IconButton, Link, Popover, Stack, Typography, useMediaQuery, useTheme, } from '@mui/material';
import { useNavigationItems } from '../ccf-navigation/useNavigationItems';
import { CcfNavItem } from '../ccf-nav-item/ccf-nav-item';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneVoiceConnectionStatus, } from '@nice-devone/voice-sdk';
import { MediaType } from '@nice-devone/common-sdk';
import { agentSelectedVoicePreference, } from '../ccf-acd-session/ccf-acd-session.slice';
import { checkProductsEnabledInFeatures, getQuickAppNavigationItems, globalActions, getSelectedMenuName, getCustomWorkspaces, getPinnedMenuItem, getMoreMenuStatus, getUserCustomAttributes, } from '../global.app.slice';
import { CcfBox, CcfMenuMoreIcon, useTranslator, CcfTooltip, isFeatureEnabled } from '@nice-devone/ui-controls';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { Navigation } from '../../enums/navigation-menus';
import { CXoneVoiceClientWrapper } from '../../services/cxone-voice-client-wrapper';
import { useCcfComponentWidth } from '../../hooks/useCcfComponentWidth';
import { ccfAppNavigationStyles } from './ccf-app-navigation.styles';
import { getConversationsUnreadNotification } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import useLVAppSpacePermission from '../lv-app-space/hooks/useLVAppSpacePermission';
const enableDeskAutoselect = !LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS);
/**
 * Used for Application Navigation
 * @param props - ? - CcfAppNavigationProps
 * @example `<CcfAppNavigation />`
 */
export const CcfAppNavigation = (props) => {
    const quickAppNavigationItemsLS = useSelector(getQuickAppNavigationItems);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const allInteractions = useSelector(getAllInteractions);
    const interactionslength = Object.keys(allInteractions).length;
    const customAttributes = useSelector(getUserCustomAttributes);
    const selectedMenu = useSelector(getSelectedMenuName);
    const dispatch = useDispatch();
    const theme = useTheme();
    const AppNavigationStyles = ccfAppNavigationStyles(theme);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'), { noSsr: true });
    const quickAppNavigationItems = useNavigationItems(false, true, props.helpUrl);
    const quickAppNavigationItemsStatus = useMemo(() => quickAppNavigationItems.map((quickAppNavigationItem) => quickAppNavigationItem.isActive && !quickAppNavigationItem.isHidden), [quickAppNavigationItems]);
    const panelAppNavigationItems = useNavigationItems(true, isSmView, props.helpUrl);
    const pannelAppNavigationItemsStatus = useMemo(() => panelAppNavigationItems.map((panelAppNavigationItem) => panelAppNavigationItem.isActive && !panelAppNavigationItem.isHidden), [panelAppNavigationItems]);
    const [navigationItems, setMenuItem] = useState([]);
    const [isDrawerOpen, toggleDrawer] = useState(false);
    const [contactApps, setContactApps] = useState([]);
    const [globalApps, setGlobalApps] = useState([]);
    const [translate] = useTranslator();
    const audio_tag = useRef(null);
    const ccfLogger = new CcfLogger('App.consumer', 'App.contact-assignments');
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const pinnedItem = useSelector(getPinnedMenuItem);
    const [anchorEl, setAnchorEl] = useState(null);
    const dirRef = useRef(null);
    const moreMenuRef = useRef(null);
    const { width } = useCcfComponentWidth(dirRef);
    const [displayMenuItemsCount, setDisplayMenuItemsCount] = useState(8);
    const openMoreMenu = useSelector(getMoreMenuStatus);
    const [ccfAppHamburgerMenuComponent, setCcfAppHamburgerMenuComponent] = useState(null);
    const memoizedNavigationItems = useMemo(() => navigationItems, [navigationItems]);
    const newConversationNotification = useSelector(getConversationsUnreadNotification);
    const [showNotificationDot, setShowNotificationDot] = useState(false);
    const { isLvCustomerCardEnabled, isLvDeskEnabled } = useLVAppSpacePermission();
    const isDnDReplacementEnabled = isFeatureEnabled("release-cx-agent-dnd-app-space-AW-48194" /* FeatureToggles.SIDENAV_APPSPACE_DND_LIBRARY_REPLACEMENT */);
    useEffect(() => {
        const isTabSelected = selectedMenu === Navigation.AGENT_CHAT;
        if (newConversationNotification && newConversationNotification.length > 0 && !isTabSelected) {
            setShowNotificationDot(true);
        }
        else {
            setShowNotificationDot(false);
        }
    }, [newConversationNotification]);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const defaultHomeApp = (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory) ? Navigation.DIRECTORY : Navigation.CONTACTHISTORY;
    useEffect(() => {
        dispatch(checkProductsEnabledInFeatures());
    }, []);
    const { setSelectedMenu } = globalActions;
    useEffect(() => {
        // Auto-select Desk if the tenant has Desk enabled, and externalProductUrl was not set in local storage
        // Also, update the local storage value to match the Desk auto-selection
        if (isLvDeskEnabled && enableDeskAutoselect) {
            dispatch(setSelectedMenu({ name: Navigation.LVDESK }));
            const externalProductUrls = JSON.parse(LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
            if (externalProductUrls)
                LocalStorageHelper.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, Object.assign(Object.assign({}, externalProductUrls), { selectedMenuQuickApp: Navigation.LVDESK }));
        }
    }, [isLvDeskEnabled]);
    useEffect(() => {
        var _a, _b;
        const checkNavigationItemsLS = JSON.parse(localStorage.getItem(StorageKeys.CXONE_NAVIGATION_ITEMS) || '{}');
        const isLocalStorageEmpty = Object.keys(checkNavigationItemsLS).length === 0;
        const lastLoginUserId = localStorage.getItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID);
        const currentUser = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '{}');
        const quickAppNavigationItemsLS = quickAppNavigationItems.map(item => {
            return {
                menuName: item.menuName,
                contactApp: item.contactApp,
                tooltip: item.tooltip,
                isActive: item.isActive,
                isHidden: item.isHidden,
            };
        });
        const panelAppNavigationItemsLS = panelAppNavigationItems.map(item => {
            return {
                menuName: item.menuName,
                contactApp: item.contactApp,
                tooltip: item.tooltip,
                isActive: item.isActive,
                isHidden: item.isHidden,
            };
        });
        if (isLocalStorageEmpty || (lastLoginUserId && (currentUser.icAgentId !== lastLoginUserId)) || (((_a = checkNavigationItemsLS === null || checkNavigationItemsLS === void 0 ? void 0 : checkNavigationItemsLS.quickApps) === null || _a === void 0 ? void 0 : _a.length) !== quickAppNavigationItems.length) || (((_b = checkNavigationItemsLS === null || checkNavigationItemsLS === void 0 ? void 0 : checkNavigationItemsLS.panelApps) === null || _b === void 0 ? void 0 : _b.length) !== panelAppNavigationItems.length)) {
            const CXoneNavigationItems = {
                quickApps: quickAppNavigationItemsLS,
                panelApps: panelAppNavigationItemsLS,
            };
            localStorage.setItem(StorageKeys.CXONE_NAVIGATION_ITEMS, JSON.stringify(CXoneNavigationItems));
            dispatch(globalActions.initializeCXoneNavigationItems(CXoneNavigationItems));
        }
        else {
            // Quick apps and app space are draggable/sortable, that's why we need order
            const quickAppsOrder = checkNavigationItemsLS.quickApps
                .map((item) => item.menuName);
            if (quickAppNavigationItems) {
                quickAppNavigationItemsLS.sort((itemOne, itemTwo) => {
                    return quickAppsOrder.indexOf(itemOne.menuName) -
                        quickAppsOrder.indexOf(itemTwo.menuName);
                });
            }
            const panelAppsOrder = checkNavigationItemsLS.panelApps
                .map((item) => item.menuName);
            if (panelAppNavigationItems) {
                panelAppNavigationItemsLS.sort((itemOne, itemTwo) => {
                    return panelAppsOrder.indexOf(itemOne.menuName) -
                        panelAppsOrder.indexOf(itemTwo.menuName);
                });
            }
            const quickApps = quickAppNavigationItemsLS || checkNavigationItemsLS.quickApps;
            const panelApps = panelAppNavigationItemsLS || checkNavigationItemsLS.panelApps;
            dispatch(globalActions.initializeCXoneNavigationItems({
                quickApps,
                panelApps,
            }));
        }
    }, [isSmView, JSON.stringify(quickAppNavigationItemsStatus), JSON.stringify(pannelAppNavigationItemsStatus)]);
    useEffect(() => {
        const orderedNavigationList = [];
        if ((selectedMenu === Navigation.CUSTOMERCARD || selectedMenu === Navigation.CONFERENCE) && !isSmView) {
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
        }
        quickAppNavigationItemsLS.forEach(item => {
            const menuItem = quickAppNavigationItems.find(menu => menu.menuName === item.menuName);
            menuItem && orderedNavigationList.push(menuItem);
        });
        setMenuItem(orderedNavigationList);
    }, [quickAppNavigationItemsLS, isSmView, JSON.stringify(quickAppNavigationItemsStatus)]);
    useEffect(() => {
        if ((userInConsult || usersInConference.length > 1) && isSmView) {
            dispatch(setSelectedMenu({ name: Navigation.CONFERENCE }));
        }
        // In small view, Default to Contact History app when a conference ends 
        else if (isSmView && selectedMenu === Navigation.CONFERENCE && !userInConsult && usersInConference.length < 1) {
            dispatch(setSelectedMenu({ name: defaultHomeApp }));
        }
    }, [userInConsult, usersInConference, isSmView]);
    useEffect(() => {
        ccfLogger.info('Start AgentLeg Subscribe', 'Start AgentLeg Subscribe');
        let connectionStatusSubscription = null;
        let callStatusSubscription = null;
        if (agentSelectedVoicePref === 'WebRTC') {
            try {
                connectionStatusSubscription = CXoneVoiceClientWrapper.instance.onConnectionStatusChanged.subscribe((resp) => {
                    ccfLogger.info('onConnectionStatusChanged', JSON.stringify(resp));
                    if (resp.status === CXoneVoiceConnectionStatus.MEDIA_DEVICE_ACCESS_DENIED) {
                        if (resp.isExtensionInstalled === true) {
                            // display missing mic permission error message for embedded and chrome extensions
                            const extensionHelpLink = `chrome-extension://${resp.extensionId}/options.html`;
                            const extensionHelp = (_jsx(Typography, Object.assign({ variant: "h6" }, { children: _jsx(Link, Object.assign({ href: extensionHelpLink, underline: "hover", target: '_blank' }, { children: translate('allowMicroPhonePermission') })) })));
                            dispatch(globalActions.updateAlertMessage({
                                message: translate('mediaDeviceAccessDenied'),
                                subMessage: '',
                                children: extensionHelp,
                                type: translate('error'),
                            }));
                        }
                        else {
                            // display missing mic permission error message for desktop agent
                            dispatch(globalActions.updateAlertMessage({
                                message: translate('mediaDeviceAccessDenied'),
                                subMessage: translate('mediaDeviceAccessDeniedSubMsg'),
                                type: translate('error'),
                            }));
                        }
                    }
                });
                callStatusSubscription = CXoneVoiceClientWrapper.instance.onCallStatusChanged.subscribe((resp) => {
                    ccfLogger.info('onCallStatusChanged', `contactId:${resp.contactId}, status:${resp.status}`);
                });
            }
            catch (e) {
                ccfLogger.info('ccf-app-navigation', 'Error on subscribe onConnectionStatusChanged: ' + e);
            }
        }
        return () => {
            connectionStatusSubscription === null || connectionStatusSubscription === void 0 ? void 0 : connectionStatusSubscription.unsubscribe();
            callStatusSubscription === null || callStatusSubscription === void 0 ? void 0 : callStatusSubscription.unsubscribe();
        };
    }, [agentSelectedVoicePref]);
    useEffect(() => {
        if (!nonIncomingActiveContactInSelectedInteraction && !interactionslength && (selectedMenu === Navigation.CUSTOMERCARD || selectedMenu === Navigation.LVCUSTOMERCARD || selectedMenu === Navigation.SCREEN_POP || selectedMenu === Navigation.COPILOT)) {
            dispatch(setSelectedMenu({ name: defaultHomeApp }));
        }
    }, [interactionslength]);
    useEffect(() => {
        if ((customAttributes === null || customAttributes === void 0 ? void 0 : customAttributes.customerCard) !== undefined && !(customAttributes === null || customAttributes === void 0 ? void 0 : customAttributes.customerCard)) {
            dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
        }
        if (activeContactInSelectedInteraction && activeContactInSelectedInteraction.media === MediaType.VOICE && isSmView) {
            if (pinnedItem && quickAppNavigationItems.some(item => item.menuName === pinnedItem && item.isActive && !item.isHidden)) {
                dispatch(setSelectedMenu({ name: pinnedItem }));
            }
            else if (customAttributes === null || customAttributes === void 0 ? void 0 : customAttributes.customerCard) {
                isLvCustomerCardEnabled ?
                    dispatch(setSelectedMenu({ name: Navigation.LVCUSTOMERCARD })) :
                    dispatch(setSelectedMenu({ name: Navigation.CUSTOMERCARD }));
            }
        }
    }, [activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId]);
    //
    useEffect(() => {
        if (!isSmView) {
            if (selectedMenu === Navigation.SCREEN_POP || selectedMenu === Navigation.CUSTOMERCARD || selectedMenu === Navigation.LVCUSTOMERCARD || selectedMenu === Navigation.QUICK_REPLY || selectedMenu === Navigation.COPILOT) {
                dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            }
        }
        else {
            if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.WORKITEM) {
                dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
            }
            else if (selectedMenu === Navigation.INTERACTION) {
                isLvCustomerCardEnabled ?
                    dispatch(setSelectedMenu({ name: Navigation.LVCUSTOMERCARD })) :
                    dispatch(setSelectedMenu({ name: Navigation.CUSTOMERCARD }));
            }
        }
    }, [isSmView]);
    useEffect(() => {
        if (isSmView) {
            setDisplayMenuItemsCount((Math.floor(width / 42)) - 1);
            //42px is the width of a menu icon
        }
        else {
            setDisplayMenuItemsCount(8);
        }
    }, [width, isSmView]);
    useEffect(() => {
        const contactApps = navigationItems && isSmView ? navigationItems === null || navigationItems === void 0 ? void 0 : navigationItems.filter(({ contactApp, isActive, isHidden }) => {
            return contactApp && isActive && !isHidden;
        }) : [];
        setContactApps(contactApps);
    }, [memoizedNavigationItems, isSmView]);
    useEffect(() => {
        const globalApps = navigationItems ? navigationItems === null || navigationItems === void 0 ? void 0 : navigationItems.filter(({ contactApp, isActive, isHidden }) => {
            return !contactApp && isActive && !isHidden;
        }) : [];
        setGlobalApps(globalApps);
    }, [memoizedNavigationItems, isSmView]);
    useEffect(() => {
        if (openMoreMenu) {
            loadHamburgerMenu();
            toggleDrawer(true);
            setAnchorEl(moreMenuRef === null || moreMenuRef === void 0 ? void 0 : moreMenuRef.current);
        }
        dispatch(globalActions.openMoreMenu(false));
    }, [openMoreMenu]);
    /**
     * This function can be used to load or initialize the hamburger menu
     * @returns void
     * ```
     * @example LoadHamburgerMenu()
     * ```
     */
    const loadHamburgerMenu = () => __awaiter(void 0, void 0, void 0, function* () {
        if (isDnDReplacementEnabled) {
            const ccfAppHamburgerMenu = yield import('../ccf-hamburger-draggable-menu/ccf-hamburger-draggable-menu');
            const CcfHamburgerDraggableMenu = ccfAppHamburgerMenu.CcfHamburgerDraggableMenu;
            setCcfAppHamburgerMenuComponent(_jsx(CcfHamburgerDraggableMenu, { helpUrl: props.helpUrl, isDrawerOpen: isDrawerOpen, toggleDrawer: toggleDrawer }));
        }
        else {
            const ccfAppHamburgerMenu = yield import('../ccf-app-hamburger-menu/ccf-app-hamburger-menu');
            const CcfAppHamburgerMenu = ccfAppHamburgerMenu.CcfAppHamburgerMenu;
            setCcfAppHamburgerMenuComponent(_jsx(CcfAppHamburgerMenu, { helpUrl: props.helpUrl, isDrawerOpen: isDrawerOpen, toggleDrawer: toggleDrawer }));
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx("audio", Object.assign({ ref: audio_tag, id: "audio", autoPlay: true }, { children: _jsx("track", { kind: "captions" }) })), _jsx(Box, Object.assign({ component: 'nav', sx: AppNavigationStyles.sidebarContainer, ref: dirRef, "data-testid": "AppBar", "aria-label": translate('leftNavigationLabel') }, { children: _jsxs(Stack, Object.assign({ sx: AppNavigationStyles.sidebar, direction: {
                        xs: 'row',
                        xl: 'column',
                    }, justifyContent: "space-between" }, { children: [contactApps &&
                            (contactApps === null || contactApps === void 0 ? void 0 : contactApps.slice(0, displayMenuItemsCount).map((_a) => {
                                var { menuName } = _a, rest = __rest(_a, ["menuName"]);
                                return (_jsx(CcfNavItem, Object.assign({ menuName: menuName, helpUrl: props.helpUrl }, rest), menuName));
                            })), contactApps && contactApps.length ? (_jsx(Divider, { orientation: "vertical", variant: "fullWidth", flexItem: true, sx: { borderRightWidth: 1, borderColor: theme.palette.divider } })) : null, globalApps &&
                            (globalApps === null || globalApps === void 0 ? void 0 : globalApps.slice(0, displayMenuItemsCount - contactApps.length).map((_a) => {
                                var { menuName } = _a, rest = __rest(_a, ["menuName"]);
                                const isConversationsTab = menuName === 'AgentChat';
                                const isTabSelected = selectedMenu === menuName;
                                return (_jsx(CcfNavItem, Object.assign({ menuName: menuName, helpUrl: props.helpUrl }, rest, { icon: _jsxs("div", Object.assign({ style: { position: 'relative' } }, { children: [rest.icon, isConversationsTab && showNotificationDot && !isTabSelected && (_jsx(Box, { sx: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: '#e62e43',
                                                    borderRadius: '50%',
                                                } }))] })), onClick: () => {
                                        if (isConversationsTab) {
                                            setShowNotificationDot(false);
                                        }
                                        rest.onClick && rest.onClick();
                                    } }), menuName));
                            })), _jsx(CcfBox, { children: _jsx(CcfTooltip, Object.assign({ title: translate('more'), arrow: true }, { children: _jsx(IconButton, Object.assign({ role: "button", onClick: (event) => {
                                        toggleDrawer(true);
                                        setAnchorEl(event === null || event === void 0 ? void 0 : event.currentTarget);
                                        loadHamburgerMenu();
                                    }, "aria-label": translate('moreOptionsInLeftNavbar'), "data-testid": "more", ref: moreMenuRef }, { children: _jsx(CcfMenuMoreIcon, {}) })) })) })] })) })), ccfAppHamburgerMenuComponent && _jsx(Popover, Object.assign({ anchorReference: isSmView ? 'anchorEl' : 'anchorPosition', anchorPosition: { top: 2, left: isDnDReplacementEnabled ? 190 : 150 }, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, anchorEl: anchorEl, open: isDrawerOpen, onClose: () => toggleDrawer(false), sx: { paper: AppNavigationStyles.hamburgerContainer, root: AppNavigationStyles.hamburgerRootContainer }, PaperProps: {
                    'aria-labelledby': 'customize-appHamburger-dialog-title',
                    role: 'dialog',
                } }, { children: ccfAppHamburgerMenuComponent }))] }));
};
export default memo(CcfAppNavigation);
//# sourceMappingURL=ccf-app-navigation.js.map