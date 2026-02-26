import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Grid, Divider, useMediaQuery, useTheme, Box, Link, } from '@mui/material';
import CcfAgentState from '../ccf-agent-state/ccf-agent-state';
import CcfAgentLeg from '../ccf-agent-leg/ccf-agent-leg';
import { ToastContainer } from 'react-toastify';
import { CcfAgentChatIcon, CcfAgentChatStandaloneIcon, CcfCXAgentLogoIcon, CcfCxoneLogoIcon, CcfHeaderBellIcon, CcfHelpIcon, CcfTooltip, CcfTypography, DividerOrientation, DividerVariant, useTranslator, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotifications, } from '../ccf-agent-notification/ccf-agent-notification.slice';
import CcfNotificationPopover from './cc-notification-popover/ccf-notification-popover';
import CcfAppHeaderStyles from './ccf-app-header-styles';
import { getAgentSessionInfo } from '../ccf-acd-session/ccf-acd-session.slice';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { getTopNavBarFocusStatus, globalActions, getIsMPowerLogoFeatureToggleEnabled } from '../global.app.slice';
import SkipToContent from './ccf-skip-to-content/ccf-skip-to-content';
import CcfConversationsStandaloneLogoutButton from './ccf-conversations-standalone-logout-button/ccf-conversations-standalone-logout-button';
/**
 * Component displays App header on landing screen
 * @param props - ? - CcfAppHeaderProps
 * @returns app header component for landing screen
 * @example <CcfAppHeader/>
 */
export function CcfAppHeader(props) {
    var _a, _b;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const isAbove400View = useMediaQuery((theme) => theme.breakpoints.up(400));
    const isAboveLgView = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const isAboveMdView = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const isBelowMdView = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const appHeaderStyles = CcfAppHeaderStyles(theme);
    const [showTooltip, setShowTooltip] = useState(false);
    const agentSessionInfo = useSelector(getAgentSessionInfo);
    const [headerBgColor, setHeaderBgColor] = useState(theme.palette.primary.main);
    const [iconColor, setIconColor] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const topNavBarFocusStatus = useSelector(getTopNavBarFocusStatus);
    const topNavBar = useRef();
    const topNavBarWrapper = useRef();
    const isMPowerLogoFeatureToggleEnabled = useSelector(getIsMPowerLogoFeatureToggleEnabled);
    const [showSkipLink, setShowSkipLink] = useState(false);
    useEffect(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const brandingProfile = (yield CXoneAuth.instance.getBrandingProfile());
            setHeaderBgColor(brandingProfile === null || brandingProfile === void 0 ? void 0 : brandingProfile.cxoneLoginBgColor);
            setIconColor(brandingProfile === null || brandingProfile === void 0 ? void 0 : brandingProfile.cxoneHeaderIconTextColor);
            setLogoUrl(brandingProfile === null || brandingProfile === void 0 ? void 0 : brandingProfile.cxoneLoginHeaderLogoUrl);
        }))();
    }, []);
    useEffect(() => {
        if (agentSessionInfo)
            dispatch(fetchAllNotifications());
    }, [agentSessionInfo]);
    useEffect(() => {
        if (topNavBarFocusStatus) {
            setTimeout(() => {
                var _a;
                (_a = topNavBarWrapper.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 100);
            dispatch(globalActions.focusTopNavBar(false));
        }
        ;
    }, [topNavBarFocusStatus]);
    /**
     * Handles blur event for the header container.
     * If focus moves outside the `topNavBar` container, it hides the skip link
     * Ensures the skip link is visible only while keyboard focus is within the top navigation
     * @param e - The keyboard event object.
     * @example
     * ```
     * handleBlur(e)
     * ```
     */
    const handleBlur = (e) => {
        var _a;
        // If focus moves outside the header container, hide it
        if (!((_a = topNavBarWrapper.current) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
            setShowSkipLink(false);
        }
    };
    /**
   * Handles keyboard events on the header container.
   * Specifically listens for the 'Tab' key to determine if the skip link should be shown.
   * This ensures the skip link is revealed only when keyboard navigation is in progress.
   *
   * @param e - The keyboard event object triggered on key press.
   * @example
   * ```
   * handleFocus(e);
   * ```
   */
    const handleFocus = (e) => {
        // If focus moves outside the header container, hide it
        if (e.key === 'Tab' && !showSkipLink) {
            setShowSkipLink(true);
        }
    };
    return (_jsx(Box, Object.assign({ ref: topNavBarWrapper, tabIndex: 0, onBlur: handleBlur, onKeyDown: handleFocus, "data-testid": "app-header-wrapper" }, { children: _jsxs(AppBar, Object.assign({ position: "static", ref: topNavBar, sx: Object.assign(Object.assign({}, appHeaderStyles.header), { background: headerBgColor }), "data-testid": "bg-color" }, { children: [isAbove400View && !showSkipLink &&
                    _jsx(Box, Object.assign({ sx: appHeaderStyles.cxaLogo }, { children: !(props === null || props === void 0 ? void 0 : props.isConversationsStandAlone) ? _jsx(CcfCXAgentLogoIcon, { "data-testid": 'cxa-logo', sx: appHeaderStyles.cxoneLogo }) : _jsx(CcfAgentChatStandaloneIcon, { "data-testid": 'cxa-standalone-logo', viewBox: '0 0 40 40', sx: appHeaderStyles.agentChatStandaloneLogo }) })), isAboveLgView && !showSkipLink &&
                    _jsx(Box, Object.assign({ sx: appHeaderStyles.cxaText }, { children: _jsx(CcfTypography, Object.assign({ sx: appHeaderStyles.cxaTextStyles }, { children: !(props === null || props === void 0 ? void 0 : props.isConversationsStandAlone) ? translate('cxoneAgent') : translate('conversations') })) })), showSkipLink && (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, appHeaderStyles.cxaLogo), { width: 'auto', height: 'auto' }) }, { children: _jsx(SkipToContent, { bodyRef: props === null || props === void 0 ? void 0 : props.bodyRef }) }))), isAboveMdView &&
                    _jsx(Box, Object.assign({ sx: appHeaderStyles.logo }, { children: _jsx(CcfCxoneLogoIcon, { "data-testid": 'logo-url', sx: appHeaderStyles.cxoneLogo, logoUrl: logoUrl, isMPowerLogoFeatureToggleEnabled: isMPowerLogoFeatureToggleEnabled }) })), _jsx(Grid, Object.assign({ item: true, sx: appHeaderStyles.rightSection, lg: 6, md: 12, sm: 12, xs: 6 }, { children: _jsxs(Toolbar, Object.assign({ style: { paddingRight: 0 } }, { children: [!(showSkipLink && isBelowMdView) && _jsx(CcfTooltip, Object.assign({ title: 'help', translationKey: 'helpLink', arrow: true }, { children: _jsx(Link, Object.assign({ underline: "none", target: "_blank", rel: "noopener noreferrer", href: props.helpUrl, sx: [appHeaderStyles.button, appHeaderStyles.helpIcon, appHeaderStyles === null || appHeaderStyles === void 0 ? void 0 : appHeaderStyles.focussedElement, appHeaderStyles === null || appHeaderStyles === void 0 ? void 0 : appHeaderStyles.focussedBackground] }, { children: _jsx(CcfHelpIcon, { sx: { marginRight: { xs: 0, sm: 0 } }, htmlColor: iconColor ? iconColor : theme.palette.background.paper, viewBox: "0 0 24 24" }) })) })), (!(props === null || props === void 0 ? void 0 : props.isConversationsStandAlone)) && _jsx(Divider, { orientation: DividerOrientation.VERTICAL, variant: DividerVariant.FULLWIDTH, sx: [{ borderColor: iconColor ? iconColor + '!important' : '' }, appHeaderStyles.appHeaderDivider] }), _jsx(CcfTooltip, Object.assign({ title: 'notifications', translationKey: 'notifications', open: showTooltip, onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), onClick: () => setShowTooltip(false), arrow: true }, { children: _jsx(Box, Object.assign({ color: "inherit", role: "article", "aria-label": translate('notifications'), sx: { padding: (isBelowMdView || (props === null || props === void 0 ? void 0 : props.isConversationsStandAlone)) ? 0 : '12px' }, "data-testid": "notifications" }, { children: _jsx(CcfNotificationPopover, { setShowTooltip: setShowTooltip, iconComponent: _jsx(CcfHeaderBellIcon, { htmlColor: iconColor ? iconColor : theme.palette.background.paper, viewBox: "-2 -1 24 24" }), isConversationsStandAlone: props === null || props === void 0 ? void 0 : props.isConversationsStandAlone }) })) })), (props === null || props === void 0 ? void 0 : props.isConversationsStandAlone) && _jsx(CcfTooltip, Object.assign({ title: 'logOut', translationKey: 'logOut', arrow: true }, { children: _jsx(Box, Object.assign({ color: "inherit", role: "article", "aria-label": translate('logOut'), "data-testid": "logOut" }, { children: _jsx(CcfConversationsStandaloneLogoutButton, {}) })) })), (!(props === null || props === void 0 ? void 0 : props.isConversationsStandAlone)) && _jsx(CcfAgentLeg, {}), (!(props === null || props === void 0 ? void 0 : props.isConversationsStandAlone)) && _jsx(Box, Object.assign({ color: "inherit", "aria-label": translate('agentState') ? translate('agentState') : 'agentState', sx: appHeaderStyles.userProfile }, { children: _jsx(CcfAgentState, { agentStateForEmbeededView: false, activeState: iconColor ? { color: iconColor } : { color: '' } }) }))] })) })), _jsx(ToastContainer, { enableMultiContainer: true, containerId: 'AgentMessageToastContainer', position: "top-right", newestOnTop: false, closeButton: false, closeOnClick: false, rtl: false }), _jsx(ToastContainer, { enableMultiContainer: true, containerId: 'ConversationsToastContainer', position: "top-right", newestOnTop: false, closeButton: true, closeOnClick: true, rtl: false, icon: _jsx(CcfAgentChatIcon, { viewBox: '0 0 22 23', htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText }) })] })) })));
}
export default CcfAppHeader;
//# sourceMappingURL=ccf-app-header.js.map