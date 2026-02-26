import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { CcfBadge, CcfBox, CcfListItem, CcfTooltip } from '@nice-devone/ui-controls';
import { Navigation } from '../../enums/navigation-menus';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedMenuName, globalActions } from '../global.app.slice';
import { CcfAssignmentAction, getAllInteractions, getNonIncomingActiveContactInSelectedInteraction, selectInboxCollapsedState } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useMediaQuery, useTheme } from '@mui/material';
import { StorageKeys } from '@nice-devone/core-sdk';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
import { CcfNetworkSpeedNotification } from './ccf-network-speed-notification/ccf-network-speed-notification';
import { getAllSkillDetails } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import ccfNavItemStyles from './ccf-nav-item.styles';
/**
 * Used to add navigation item to CcfAppNavigation
 * @example `<CcfNavItem />`
 * @param menuName - menuName must be listed in the CcfTranslationKey object and in lowercase
 * @param showBadge - This is an optional parameter that will add a Badge to an icon
 * @param className - optional className wrapping the icon after the tooltip
 * @param onClick - this parameter will override the existing onClick functionality
 * @param toolTipPlacement - 'A string to determine placement for tooltip'
 */
export const CcfNavItem = ({ menuName, showBadge, className, onClick, children, toolTipPlacement = 'right', icon, tooltip, helpUrl, }) => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector(getSelectedMenuName);
    const { setSelectedMenu } = globalActions;
    const theme = useTheme();
    const navItemStyles = ccfNavItemStyles(theme);
    const interactionsCount = Object.keys(useSelector(getAllInteractions)).length;
    const queueSkillDetails = useSelector(getAllSkillDetails);
    const totalContactsCount = queueSkillDetails.totalAllContacts;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const [show, setShow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    /**
     * Used to swtich menus
     * @param name - string
     * @example - setMenu(Navigation.INTERACTION)
     */
    const setMenu = (name) => {
        if (!isInboxCollapsed && isBelowMd) {
            dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
        }
        if (name !== Navigation.HELP && name !== Navigation.LAUNCH) {
            dispatch(agentDirectoryActions.setFocusInDirectory(false));
            const externalProdUrls = JSON.parse(localStorage.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
            if (externalProdUrls) {
                externalProdUrls.selectedMenuQuickApp = name;
                localStorage.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, JSON.stringify(externalProdUrls));
            }
            dispatch(setSelectedMenu({ name: name }));
            if (name === Navigation.DIRECTORY) {
                dispatch(agentDirectoryActions.setFocusInDirectory(true));
            }
            dispatch(globalActions.setOutboundBtnCliked(false));
            if (name === Navigation.INTERACTION) {
                if (isBelowMd) {
                    dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: false }));
                }
            }
        }
    };
    /**
     * Used to get badge count for menus
     * @param name - string
     * @example - menuBadgeCount(Navigation.INTERACTION)
     */
    const menuBadgeCount = (name) => {
        switch (name) {
            case Navigation.INTERACTION:
                return interactionsCount;
            case Navigation.QUEUE:
                return totalContactsCount;
            default:
                return;
        }
    };
    /**
     * Function to be called when QR tab pressed
     * @param e - event object
     * @example - clickHandler()
     */
    const clickHandler = (e) => {
        if (typeof onClick === 'function') {
            onClick(e, menuName === Navigation.HELP ? helpUrl : nonIncomingActiveContactInSelectedInteraction);
        }
        setMenu(menuName);
    };
    return (
    //   Do not remove any DIV's.. For some reason MUI needs them for tooltip
    _jsx(CcfBox, Object.assign({ sx: navItemStyles.navItem }, { children: _jsx(CcfTooltip, Object.assign({ id: `${menuName}-tooltip`, title: tooltip, arrow: true, placement: toolTipPlacement, tooltipForRTL: "ccfTooltipRight0", "aria-label": tooltip, open: show, onFocus: () => setShow(true), onBlur: () => setShow(false), onMouseEnter: () => setShow(true), onMouseLeave: () => setShow(false), onClick: () => setShow(false), "data-testid": 'tooltip' }, { children: _jsx("div", Object.assign({ className: className + ' ' + menuName, role: "presentation", "aria-hidden": true }, { children: _jsxs(CcfListItem, Object.assign({ sx: navItemStyles.menuItemAlignment, button: true, role: 'button', "aria-label": menuName, "aria-pressed": selectedMenu === menuName, selected: selectedMenu === menuName, onClick: (e) => clickHandler(e), tabIndex: 0, onKeyUp: (e) => { if (e.key === 'Enter')
                        setMenu(menuName); }, "data-testid": 'list-item' }, (isHovered && { 'aria-describedby': `${menuName}-tooltip` }), { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false) }, { children: [showBadge && (_jsxs("div", { children: [' ', _jsx(CcfBadge, Object.assign({ variant: menuBadgeCount(menuName) ? 'standard' : 'dot', badgeContent: menuBadgeCount(menuName), label: menuBadgeCount(menuName) + ' ' + tooltip, sx: Object.assign({}, (menuBadgeCount(menuName) ? navItemStyles.sidebarItemBadgeStandard : navItemStyles.sidebarItemBadge)) }, { children: _jsxs("div", { children: [icon, children] }) }))] })), menuName === Navigation.SETTINGS && _jsx(CcfNetworkSpeedNotification, {}), !showBadge && (_jsxs("div", { children: [icon, children] }))] })) })) })) })));
};
//# sourceMappingURL=ccf-nav-item.js.map