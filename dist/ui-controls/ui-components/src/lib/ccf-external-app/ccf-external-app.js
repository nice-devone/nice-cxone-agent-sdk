import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Grid, Tooltip, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { getApplicationDirection, getWEMUrl, } from '../global.app.slice';
import { useEffect, useRef, useState } from 'react';
import { CcfHeader, CcfOpenNewTabIcon, CcfReturnTabIcon, CcfTypography, CcfViewInNewWindowIcon, useTranslator, CcfWemIcon } from '@nice-devone/ui-controls';
import externalAppStyles from './ccf-external-app.styles';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
 * This Component can be used to render any Iframe Component
 * @example - <CcfExternalApp />
 * @returns
 */
export const CcfExternalApp = ({ path, title, allowedProperties, }) => {
    const theme = useTheme();
    const width = 700;
    const height = 700;
    const left = 50;
    const top = 50;
    const popupOptions = [
        `width=${width}`,
        `height=${height}`,
        'scrollbars=yes',
        'toolbar=no', `left=${left}`,
        `'top=${top}`
    ].join(',');
    const externalURL = useSelector(getWEMUrl);
    const styles = externalAppStyles(theme);
    const [translate] = useTranslator();
    const [popupWindow, setPopupWindow] = useState(null);
    const appDirection = useSelector(getApplicationDirection);
    const openInNewTabBtnRef = useRef(null);
    /**
     * Event handler to handle the action for the open in new tab button
     * Internal details - Pop out to new browser tab
     * @param args - none,
     * @example openInNewTab()
     */
    const openInNewTab = () => {
        const popup = window.open(window.location.origin + path, title, popupOptions);
        if (popup) {
            popup.focus();
            setPopupWindow(popup);
        }
    };
    /**
       * Event handler to handle the action for return to agent view
       * Internal details - Pop in to agent view
       * @param args - none,
       * @example returnToAgentView()
       */
    const returnToAgentView = () => {
        popupWindow === null || popupWindow === void 0 ? void 0 : popupWindow.close();
        setPopupWindow(null);
    };
    /** Event handler to handle messages from popups / iframes
     * @example window.addEventListener('message', handleMessages);
     */
    const handleMessages = (event) => {
        var _a, _b;
        if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.messageType) !== 'Loaded')
            return;
        // URL for external app, currently this is UserHub URL only
        const UserHubURL = new URL(externalURL);
        // only allow messages from a popup window on same domain or UH window.
        if (![UserHubURL.origin, window.origin].includes(event.origin))
            return;
        const { accessToken } = CXoneAuth.instance.getAuthToken();
        let windowMessage = null;
        // The message is coming from UH iframe
        if (event.data.issuer === 'CXone') {
            windowMessage = {
                messageType: 'Token',
                issuer: 'CXoneAgent',
                token: accessToken,
            };
        }
        // The message is coming from ExternalAppPopup
        if (event.data.issuer === 'ExternalAppPopup') {
            windowMessage = {
                messageType: 'Token',
                issuer: 'CXoneAgent',
                title,
                externalURL,
                token: accessToken,
            };
        }
        (_b = event.source) === null || _b === void 0 ? void 0 : _b.postMessage(windowMessage, { targetOrigin: event.origin });
    };
    useEffect(() => {
        var _a;
        (_a = openInNewTabBtnRef === null || openInNewTabBtnRef === void 0 ? void 0 : openInNewTabBtnRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    useEffect(() => {
        if (externalURL)
            window.addEventListener('message', handleMessages);
        return () => window.removeEventListener('message', handleMessages);
    }, [externalURL]);
    return (_jsxs(Box, Object.assign({ sx: styles.iframeContainer }, { children: [_jsx(Box, Object.assign({ component: "section" }, { children: _jsxs(Grid, Object.assign({ container: true, direction: 'row', justifyContent: 'space-between', alignItems: 'center' }, { children: [_jsx(Grid, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfWemIcon, { color: 'primary', viewBox: '0 0 24 24', fontSize: 'small' }), headerText: translate('wem'), RightIcon: false, showDragIcon: true, direction: appDirection }) }), _jsx(Grid, Object.assign({ "data-testid": "pop-out-pop-in-buttons", sx: styles.openinnewtabIcon }, { children: (popupWindow ?
                                _jsx(Tooltip, Object.assign({ title: translate('returnToAgentView'), arrow: true }, { children: _jsx(Button, Object.assign({ sx: styles.openinnewTabButton, "data-testid": "return-to-agent-view", onClick: () => returnToAgentView() }, { children: _jsx(CcfReturnTabIcon, {}) })) }))
                                :
                                    _jsx(Tooltip, Object.assign({ title: translate('openInNewTab'), arrow: true }, { children: _jsx(Button, Object.assign({ sx: styles.openinnewTabButton, "data-testid": "open-in-new-tab", onClick: () => openInNewTab(), disableRipple: true, ref: openInNewTabBtnRef }, { children: _jsx(CcfOpenNewTabIcon, {}) })) }))) }))] })) })), !popupWindow ? (_jsx("iframe", { title: title, width: "100%", height: "100%", allow: allowedProperties, src: externalURL, className: "wem-iframe" })) :
                _jsxs(Box, Object.assign({ "data-testid": "open-in-new-tab-window", sx: styles.openInNewWindowContainer }, { children: [_jsx(Box, Object.assign({ sx: styles.openInNewWindowIcon }, { children: _jsx(CcfViewInNewWindowIcon, {}) })), _jsx(Box, Object.assign({ sx: styles.openInNewWindowContent }, { children: _jsxs(Box, { children: [_jsx(CcfTypography, Object.assign({ className: 'messageText' }, { children: translate('viewingInBrowserMessage') })), _jsxs(Box, Object.assign({ className: 'link_text' }, { children: [_jsx(CcfTypography, Object.assign({ "data-testid": "click-to-open-in-new-tab", className: 'link', variant: 'h5', tabIndex: 0, onClick: () => openInNewTab(), onKeyUp: (e) => e.key === 'Enter' && openInNewTab() }, { children: translate('clickHere') })), _jsx(CcfTypography, Object.assign({ variant: 'h5' }, { children: translate('viewInBrowser') }))] }))] }) }))] }))] })));
};
export default CcfExternalApp;
//# sourceMappingURL=ccf-external-app.js.map