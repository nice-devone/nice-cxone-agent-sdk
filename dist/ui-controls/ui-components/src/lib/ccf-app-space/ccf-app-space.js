import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcfTabs, CcfHeader, CcfTooltip, useTranslator, isFeatureEnabled, } from '@nice-devone/ui-controls';
import { getApplicationDirection, getIsViewDetailsClicked, getIsDigitalContactTransferBtnClicked, getPanelAppNavigationItems, globalActions, getIsVoiceContactTransferBtnClicked, updateExternalProdURL, getPinnedMenuItem, getAppSpaceMoreMenuStatus, } from '../global.app.slice';
import { updateAppSpaceTabStatus, selectAppSpaceActiveTabStatus, } from './ccf-app-space.slice';
import { getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, selectUserInConference, selectUserInConsult, PREVIEW_CASES, } from './../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useMediaQuery, Box, Tabs, Tab, Divider, useTheme, Popover } from '@mui/material';
import { useNavigationItems } from '../ccf-navigation/useNavigationItems';
import { StorageKeys, LocalStorageHelper } from '@nice-devone/core-sdk';
import CcfAppSpaceStyles from './ccf-app-space-styles';
import { Navigation } from '../../enums/navigation-menus';
import { cxoneDigitalContactDetails } from './ccf-customer-card/ccf-customer-card.slice';
import { getAllowedSearchTabsList } from './ccf-digital-search/ccf-digital-search.slice';
import { getConversationsUnreadNotification } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import useLVAppSpacePermission from '../lv-app-space/hooks/useLVAppSpacePermission';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
/**
 * React component for Iframe of Custom workspace URI
 * @param workSpaceURI - URI of the custom workspace
 * @param translate - used for translation
 * @param theme - used for theme
 * @example renderIframeForCustomWorkspace('https://www.google.com', translate, theme)
 * @returns - React component for Iframe of Custom workspace URI
 */
// eslint-disable-next-line
const renderIframeForCustomWorkspace = (workSpaceURI, translate, theme) => {
    return () => {
        return _jsx("iframe", { title: translate('customWorkspace'), src: workSpaceURI, width: '100%', style: { height: 'calc(100% - 125px)', border: `1px ${theme.palette.border.main}` } });
    };
};
/**
 * CcfAppSpace - returns app space panel
 * @returns - appspace
 * @example - `<CcfAppSpace />`
 */
export const CcfAppSpace = ({ setAnchorElementCustomWorkspace, customWorkSpaceAppSpaceRef }) => {
    var _a;
    const dispatch = useDispatch();
    const theme = useTheme();
    const appSpaceStyles = CcfAppSpaceStyles(theme);
    const [translate] = useTranslator();
    const [panelAppNavigationItems, setPanelAppNavigationItems] = useState([]);
    const [contactSpecificApps, setContactSpecificApps] = useState([]);
    const [tabs, setTabs] = useState([]);
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const [isDrawerOpen, toggleDrawer] = useState(false);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const appDirection = useSelector(getApplicationDirection);
    const activeTabIndex = (_a = useSelector(selectAppSpaceActiveTabStatus)) === null || _a === void 0 ? void 0 : _a.index;
    const navigationItemsLS = useSelector(getPanelAppNavigationItems);
    const isDigitalContactTransferBtnClicked = useSelector(getIsDigitalContactTransferBtnClicked);
    const isVoiceContactTransferBtnClicked = useSelector(getIsVoiceContactTransferBtnClicked); // returns true in case transfer icon is clicked from voice contact
    const isViewDetailsClicked = useSelector(getIsViewDetailsClicked);
    const appSpaceTabs = useNavigationItems(true, isSmView);
    const appSpaceTabsStatus = useMemo(() => appSpaceTabs.map((appSpaceTab) => appSpaceTab.isActive && !(appSpaceTab === null || appSpaceTab === void 0 ? void 0 : appSpaceTab.isHidden)), [appSpaceTabs]);
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const pinnedItem = useSelector(getPinnedMenuItem);
    const digitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const selectedDigitalContactDetails = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId] ? digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId] : {};
    const isLTR = theme.direction === 'ltr';
    const openAppSpaceMoreMenu = useSelector(getAppSpaceMoreMenuStatus);
    const appSpaceRef = useRef(null);
    const [focusedTab, setFocusedTab] = useState(null);
    const [ccfAppHamburgerMenuComponent, setCcfAppHamburgerMenuComponent] = useState(null);
    const newConversationNotification = useSelector(getConversationsUnreadNotification);
    const [showNotificationDot, setShowNotificationDot] = useState(false);
    const { isLvCustomerCardEnabled, isLvDeskEnabled } = useLVAppSpacePermission();
    const isDnDReplacementEnabled = isFeatureEnabled("release-cx-agent-dnd-app-space-AW-48194" /* FeatureToggles.SIDENAV_APPSPACE_DND_LIBRARY_REPLACEMENT */);
    useEffect(() => {
        const externalProdUrls = LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS, true);
        const isTabSelected = externalProdUrls.selectedMenuQuickApp === Navigation.AGENT_CHAT;
        if (newConversationNotification && newConversationNotification.length > 0 && !isTabSelected) {
            setShowNotificationDot(true);
        }
        else {
            setShowNotificationDot(false);
        }
    }, [newConversationNotification]);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    let defaultHomeApp;
    if (isLvDeskEnabled)
        defaultHomeApp = Navigation.LVDESK;
    else if (isLvCustomerCardEnabled)
        defaultHomeApp = Navigation.LVCUSTOMERCARD;
    else if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory)
        defaultHomeApp = Navigation.DIRECTORY;
    else
        defaultHomeApp = Navigation.CONTACTHISTORY;
    useEffect(() => {
        // TODO: Need to enhance this by creating a unified dispatch location for both full view and appspace views
        // setting allowed tabs and activeTab before app space mount
        dispatch(getAllowedSearchTabsList());
        return () => updateExternalProdURL('', null, null);
    }, []);
    useEffect(() => {
        const orderedNavigationList = [];
        navigationItemsLS.forEach(item => {
            const menuItem = appSpaceTabs.find(menu => menu.menuName === item.menuName);
            if (menuItem && menuItem.isActive && !menuItem.isHidden) {
                orderedNavigationList.push(menuItem);
            }
        });
        setPanelAppNavigationItems(orderedNavigationList);
    }, [navigationItemsLS, JSON.stringify(appSpaceTabsStatus)]);
    useEffect(() => {
        if (isViewDetailsClicked)
            dispatch(globalActions.setViewDetailsClicked(false));
    }, [isViewDetailsClicked]);
    useEffect(() => {
        const contactSpecificApps = panelAppNavigationItems.filter((app) => app.contactApp);
        setContactSpecificApps(contactSpecificApps);
    }, [panelAppNavigationItems]);
    useEffect(() => {
        if (!isViewDetailsClicked) {
            const externalProdUrls = LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS, true);
            const tabs = [];
            panelAppNavigationItems.forEach((tab, index) => {
                if (contactSpecificApps.length && index === contactSpecificApps.length) {
                    tabs.push(_jsx(Divider, { orientation: 'vertical', variant: 'fullWidth', flexItem: true, sx: appSpaceStyles.divider }));
                }
                const isConversationsTab = tab.menuName === Navigation.AGENT_CHAT;
                const isTabSelected = externalProdUrls.selectedMenuQuickApp === tab.menuName;
                tabs.push(_jsx(Tab, { sx: Object.assign(Object.assign(Object.assign({}, appSpaceStyles === null || appSpaceStyles === void 0 ? void 0 : appSpaceStyles.tab), appSpaceStyles === null || appSpaceStyles === void 0 ? void 0 : appSpaceStyles.focussedElement), (activeTabIndex === tab.menuName && appSpaceStyles.selectedTab)), id: `app-space-tab-${tab.menuName}`, "data-testid": `app-space-tab-${tab.menuName}`, "aria-controls": `app-space-tab-panel-${tab.menuName}`, "aria-selected": activeTabIndex === tab.menuName, tabIndex: 0, icon: _jsx(CcfTooltip, Object.assign({ title: tab === null || tab === void 0 ? void 0 : tab.tooltip, arrow: true, disableFocusListener: false, disableHoverListener: false, open: focusedTab === (tab === null || tab === void 0 ? void 0 : tab.menuName) ? true : undefined }, { children: _jsxs(Box, Object.assign({ role: 'button', tabIndex: -1, style: { position: 'relative' } }, { children: [tab === null || tab === void 0 ? void 0 : tab.icon, isConversationsTab && showNotificationDot && !isTabSelected && (_jsx(Box, { sx: appSpaceStyles.conversationsStyle }))] })) })), value: `${tab.menuName}`, onClick: (e) => {
                        tab.onClick && tab.onClick(e, activeContactInSelectedInteraction);
                        if (isConversationsTab) {
                            setShowNotificationDot(false);
                        }
                    }, onFocus: (e) => handleFocus(e, tab.menuName), onBlur: () => setFocusedTab(null), disableRipple: true }, `${tab.menuName}`));
            });
            setTabs(tabs);
        }
    }, [panelAppNavigationItems, contactSpecificApps, activeContactInSelectedInteraction, activeTabIndex, showNotificationDot]);
    useEffect(() => {
        var _a, _b, _c;
        if (userInConsult || usersInConference.length > 1) {
            dispatch(updateAppSpaceTabStatus({ index: 'Conference', tab: 'Conference' }));
        }
        else if ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId) || (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId)) {
            if (!isDigitalContactTransferBtnClicked && !isVoiceContactTransferBtnClicked && !isViewDetailsClicked) {
                const pinnedMenuInAppSpace = (_a = panelAppNavigationItems.find((menu) => menu.menuName === pinnedItem)) === null || _a === void 0 ? void 0 : _a.menuName;
                if (pinnedMenuInAppSpace) {
                    dispatch(updateAppSpaceTabStatus({ index: pinnedMenuInAppSpace, tab: pinnedMenuInAppSpace }));
                }
                else {
                    const firstMenuFromAppspace = (_b = panelAppNavigationItems[0]) === null || _b === void 0 ? void 0 : _b.menuName;
                    dispatch(updateAppSpaceTabStatus({ index: firstMenuFromAppspace, tab: firstMenuFromAppspace }));
                }
                const previewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true);
                if (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId) {
                    if (previewCases && previewCases.length > 0 && previewCases.includes(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId)) {
                        updateExternalProdURL(null, Navigation.INTERACTION, null); //update localstorage when preview only case is selected and make customer card tab active
                    }
                }
            }
        }
        else if ((_c = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.hasOutboundTemplates) {
            dispatch(updateAppSpaceTabStatus({ index: 'QuickReply', tab: 'QuickReply' }));
        }
        else {
            dispatch(updateAppSpaceTabStatus({ index: defaultHomeApp, tab: defaultHomeApp }));
        }
    }, [panelAppNavigationItems.length, activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId, selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.caseId, userInConsult, usersInConference]);
    /**
     * update the scroll on tab focus
     * @param event - React.FocusEvent<HTMLDivElement>
     * @param menuName - string
     * @example - handleFocus(event, 'ContactHistory')
     */
    const handleFocus = (event, menuName) => {
        var _a, _b;
        setFocusedTab(menuName);
        if (((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.id) === `app-space-tab-${menuName}`) {
            (_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
    };
    /**
     * Used to update the app space tab label and tab index
     * @param newTabIndex - number
     * @example - handleChange(0)
     */
    const handleChange = (_event, newTabIndex) => {
        const externalProdUrls = JSON.parse(localStorage.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
        if (externalProdUrls) {
            externalProdUrls.selectedMenuPanelApp = newTabIndex;
            localStorage.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, JSON.stringify(externalProdUrls));
        }
        if (newTabIndex === Navigation.DIRECTORY) {
            dispatch(agentDirectoryActions.setFocusInDirectory(true));
        }
        dispatch(updateAppSpaceTabStatus({ index: newTabIndex, tab: newTabIndex }));
    };
    useEffect(() => {
        if (openAppSpaceMoreMenu) {
            loadHamburgerMenu();
            toggleDrawer(true);
        }
        dispatch(globalActions.openAppSpaceMoreMenu(false));
    }, [openAppSpaceMoreMenu]);
    /**
     *
     * @param event - any
     * @example handleClick(event)
     */
    const handleRightIconClick = () => {
        loadHamburgerMenu();
        toggleDrawer(true);
    };
    /**
     *
     * @param tab - NavigationItem
     * @example getAppSpaceElement(tab)
     */
    const getAppSpaceElement = (tab) => {
        return (tab.menuName === Navigation.CUSTOMWORKSPACE
            ? tab === null || tab === void 0 ? void 0 : tab.appSpaceComponent(setAnchorElementCustomWorkspace, customWorkSpaceAppSpaceRef)
            : _jsx(Box, Object.assign({ role: 'tabpanel', tabIndex: 0, id: `app-space-tab-panel-${tab.menuName}`, "aria-labelledby": `app-space-tab-${tab.menuName}`, component: "section", sx: appSpaceStyles.tabContentSection }, { children: tab.appSpaceComponent })));
    };
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
            const CcfAppHamburgerMenu = ccfAppHamburgerMenu.CcfHamburgerDraggableMenu;
            setCcfAppHamburgerMenuComponent(_jsx(CcfAppHamburgerMenu, { isAppSpaceMenu: true, toggleDrawer: toggleDrawer }));
        }
        else {
            const ccfAppHamburgerMenu = yield import('../ccf-app-hamburger-menu/ccf-app-hamburger-menu');
            const CcfAppHamburgerMenu = ccfAppHamburgerMenu.CcfAppHamburgerMenu;
            setCcfAppHamburgerMenuComponent(_jsx(CcfAppHamburgerMenu, { isAppSpaceMenu: true, toggleDrawer: toggleDrawer }));
        }
    });
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: (Object.assign({ height: '100%' }, appSpaceStyles.appSpaceCard)) }, { children: [_jsx(Box, Object.assign({ component: "section", sx: appSpaceStyles.appSpaceHeader }, { children: _jsx(CcfHeader, { headerText: translate('appSpace'), RightIcon: true, direction: appDirection, handleRightIconClick: handleRightIconClick, id: "app-header", isappspace: true }) })), _jsx("section", { children: _jsx(Tabs, Object.assign({ "data-testid": "ccf-tabs", value: activeTabIndex, variant: CcfTabs.Variant.FULL_WIDTH, onChange: handleChange, "aria-label": "app space tabs", sx: appSpaceStyles.tabsContainer, ref: appSpaceRef }, { children: tabs })) }), panelAppNavigationItems.map((tab) => {
                        return (tab && tab.menuName === activeTabIndex && !tab.isHidden) ? getAppSpaceElement(tab) : null;
                    })] })), ccfAppHamburgerMenuComponent && _jsx(Popover, Object.assign({ anchorReference: "anchorPosition", anchorPosition: { top: 100, left: isLTR ? 2000 : 0 }, open: isDrawerOpen, onClose: () => toggleDrawer(false), PaperProps: {
                    sx: appSpaceStyles.hamburgerContainer,
                    'aria-labelledby': 'customize-appHamburger-dialog-title',
                    role: 'dialog',
                }, "data-testid": "drawer" }, { children: ccfAppHamburgerMenuComponent }))] }));
};
export default CcfAppSpace;
//# sourceMappingURL=ccf-app-space.js.map