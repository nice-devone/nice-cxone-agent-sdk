import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Box, Grid, useTheme, Select, FormControl, MenuItem, Tooltip, Button, useMediaQuery } from '@mui/material';
import customworkspaceStyles from './ccf-customworkspace.styles';
import { CcfHeader, CcfReturnTabIcon, CcfTypography, CcfViewInNewWindowIcon, CcfOpenNewTabIcon, useTranslator, CcfBox, CcfLoader } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { getActivePersistentPanel, getCustomWorkspaces, getIsCustomIframesLoaded, getSelectedMenuName, globalActions } from '../global.app.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { selectAppSpaceActiveTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { useOmiliaIFrameMessageHandler } from './custom-hooks/useOmiliaIFrameMessageHandler';
import { useOmiliaNewWindowHandler } from './custom-hooks/useOmiliaNewWindowHandler';
import { useOmiliaIFrameVisibilityHandler } from './custom-hooks/useOmiliaIFrameVisibilityHandler';
/**
 * Custom Workpsace Container which includes header and iframe
 * @example - <CcfcustomWorkspace />
 * @returns
 */
const CcfcustomWorkspace = ({ setAnchorElementCustomWorkspace, displayRef }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [translate] = useTranslator();
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const selectedMenu = useSelector(getSelectedMenuName);
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    const isIframesPreloaded = useSelector(getIsCustomIframesLoaded);
    const activecustomWorkspace = useSelector(getActivePersistentPanel);
    const isCustomIframesLoaded = useSelector(getIsCustomIframesLoaded);
    const activeCustomWorkspaceLabelLS = LocalStorageHelper.getItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE) && (LocalStorageHelper.getItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE, true)).persistentPanelLabel;
    const [isWindowPoppedout, setWindowPopoutStatus] = useState(false);
    const [cwWindow, setCwWindow] = useState();
    const [customWorkspaceLabel, setCustomWorkspaceLabel] = useState(activeCustomWorkspaceLabelLS !== null && activeCustomWorkspaceLabelLS !== void 0 ? activeCustomWorkspaceLabelLS : translate('select'));
    const resizeTimeout = useRef(null);
    const isInitialRender = useRef(true);
    const openInNewTabBtnRef = useRef(null);
    const styles = customworkspaceStyles(theme, selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab, selectedMenu);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    /**
       * Event handler to handle the onclick state for the label to reflect activelabel url on iframe
       * Internal details - set active custom workspace
       * @param args - none,
       * @example setActiveCustomWorkspace()
       */
    const setActiveCustomWorkspace = (item) => {
        LocalStorageHelper.setItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE, item);
        setWindowPopoutStatus(false);
        dispatch(globalActions.setActivePersistentPanel(item));
    };
    /**
       * Event handler to handle the action for the open in new tab button
       * Internal details - Pop out to new browser tab
       * @param args - none,
       * @example openInNewTab()
       */
    const openInNewTab = () => {
        setWindowPopoutStatus(true);
        const opnedWindow = window.open(activecustomWorkspace.persistentPanelURI, activecustomWorkspace.persistentPanelLabel);
        opnedWindow === null || opnedWindow === void 0 ? void 0 : opnedWindow.focus();
        opnedWindow && setCwWindow(opnedWindow);
    };
    /**
       * Event handler to handle the action for return to agent view
       * Internal details - Pop in to agent view
       * @param args - none,
       * @example returnToAgentView()
       */
    const returnToAgentView = () => {
        setWindowPopoutStatus(false);
        cwWindow === null || cwWindow === void 0 ? void 0 : cwWindow.close();
    };
    useEffect(() => {
        var _a;
        (_a = openInNewTabBtnRef === null || openInNewTabBtnRef === void 0 ? void 0 : openInNewTabBtnRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    useEffect(() => {
        setCustomWorkspaceLabel(activecustomWorkspace.persistentPanelLabel);
        if (activecustomWorkspace.persistentPanelId && isIframesPreloaded) {
            const parentDiv = document.getElementById('workspacePreloadedContainer');
            const activeIframe = document.getElementById(activecustomWorkspace.persistentPanelId);
            if (parentDiv) {
                const iframes = parentDiv.querySelectorAll('iframe');
                if (iframes) {
                    iframes.forEach((child) => {
                        child.style.cssText = 'height: 0; width: 0; visibility: hidden;';
                    });
                }
            }
            if (activeIframe && displayRef) {
                setAnchorElementCustomWorkspace(displayRef === null || displayRef === void 0 ? void 0 : displayRef.current);
                activeIframe.style.cssText = 'height: 100%; width: 100%; visibility: visible;';
            }
            setWindowPopoutStatus(false);
        }
    }, [activecustomWorkspace, isIframesPreloaded]);
    useEffect(() => {
        if (isWindowPoppedout) {
            setAnchorElementCustomWorkspace(null);
        }
        else {
            !isSmView && displayRef && setAnchorElementCustomWorkspace(displayRef.current);
        }
    }, [isWindowPoppedout]);
    useEffect(() => {
        if (customWorkspaces.length) {
            const customWorkspaceLS = LocalStorageHelper.getItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE);
            const activeWorkspaceCached = JSON.parse(customWorkspaceLS || '{}');
            const isLocalStorageEmpty = Object.keys(activeWorkspaceCached).length === 0;
            const lastLoginUserId = LocalStorageHelper.getItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID);
            const currentUser = JSON.parse(LocalStorageHelper.getItem(StorageKeys.USER_INFO) || '{}');
            if (isLocalStorageEmpty || (lastLoginUserId && (currentUser.icAgentId !== lastLoginUserId))) {
                setActiveCustomWorkspace(customWorkspaces[0]);
            }
            else if (!isLocalStorageEmpty) {
                setActiveCustomWorkspace(activeWorkspaceCached);
                dispatch(globalActions.setActivePersistentPanel(activeWorkspaceCached));
            }
        }
    }, [isSmView, customWorkspaces]);
    /* These below 3 custom Omilia hooks logic will be only be executed
    in the case when Omilia iFrame URL has been set in custom workspace in UserHub */
    // Use custom hook for Omilia workspace visibility handling
    useOmiliaIFrameVisibilityHandler(isIframesPreloaded, customWorkspaces, activecustomWorkspace, selectedMenu, selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab);
    // Use custom hook for Omilia messaging (embedded iframe)
    useOmiliaIFrameMessageHandler(isIframesPreloaded);
    // Use custom hook for Omilia window connection (popped-out window)
    useOmiliaNewWindowHandler(cwWindow, isWindowPoppedout);
    useEffect(() => {
        const observer = new ResizeObserver((_) => {
            if (!isInitialRender.current) {
                if (resizeTimeout.current) {
                    clearTimeout(resizeTimeout.current);
                }
                const containerDiv = document.getElementById('workspacePreloadedContainer');
                if (containerDiv) {
                    if (displayRef.current) {
                        resizeTimeout.current = window.setTimeout(() => {
                            containerDiv.style.pointerEvents = 'auto'; // Resizing stopped
                        }, 1000);
                        const anchorElRectangle = displayRef.current.getBoundingClientRect();
                        containerDiv.style.cssText = `width: ${anchorElRectangle.width}px;
              height: ${anchorElRectangle.height}px;
              top: ${anchorElRectangle.top}px;
              left: ${anchorElRectangle.left}px;
              visibility: visible;
              pointer-events: none;`;
                    }
                    else {
                        ['width', 'top', 'left'].forEach(prop => containerDiv.style.removeProperty(prop));
                        containerDiv.style.cssText = 'height: 0; width: 0; visibility: hidden;';
                    }
                }
            }
            else {
                isInitialRender.current = false;
            }
        });
        displayRef && displayRef.current && observer.observe(displayRef.current);
        return () => {
            observer.disconnect();
        };
    }, [displayRef, isSmView]);
    return (_jsxs(Box, Object.assign({ "data-testid": "customWorkspace-container", sx: styles.iframeContainer }, { children: [_jsxs(Box, Object.assign({ component: "section", sx: styles.customWorkspaceHeader }, { children: [_jsx(CcfHeader, { RightIcon: false }), _jsxs(Grid, Object.assign({ container: true, direction: 'row', justifyContent: 'space-between' }, { children: [_jsx(Grid, { children: _jsx(FormControl, Object.assign({ variant: "standard", sx: styles.customDropdown, size: "small" }, { children: _jsx(Select, Object.assign({ labelId: "demo-simple-select-standard-label", id: "demo-simple-select-standard", "data-testid": "customworkspace-menu", value: customWorkspaceLabel, label: translate('customWorkspace'), disableUnderline: true }, { children: customWorkspaces.map((item, index) => (_jsx(MenuItem, Object.assign({ value: item.persistentPanelLabel, "data-testid": `customworkspace-menu-item-${index}`, onClick: () => setActiveCustomWorkspace(item) }, { children: item.persistentPanelLabel }), item.persistentPanelId))) })) })) }), _jsx(Grid, Object.assign({ "data-testid": "pop-out-pop-in-buttons", sx: styles.openinnewtabIcon }, { children: (isWindowPoppedout ?
                                    _jsx(Tooltip, Object.assign({ title: translate('returnToAgentView'), arrow: true }, { children: _jsx(Button, Object.assign({ sx: styles.openinnewTabButton }, { children: _jsx(CcfReturnTabIcon, { "data-testid": "return-to-agent-view", onClick: () => returnToAgentView() }) })) }))
                                    :
                                        _jsx(Tooltip, Object.assign({ title: translate('openInNewTab'), arrow: true }, { children: _jsx(Button, Object.assign({ sx: styles.openinnewTabButton, disableRipple: true, ref: openInNewTabBtnRef }, { children: _jsx(CcfOpenNewTabIcon, { "data-testid": "open-in-new-tab", onClick: () => openInNewTab() }) })) }))) }))] }))] })), isWindowPoppedout &&
                _jsxs(Box, Object.assign({ "data-testid": "open-in-new-tab-window", sx: styles.openInNewWindowContainer }, { children: [_jsx(Box, Object.assign({ sx: styles.openInNewWindowIcon }, { children: _jsx(CcfViewInNewWindowIcon, {}) })), _jsx(Box, Object.assign({ sx: styles.openInNewWindowContent }, { children: _jsxs(Box, { children: [_jsx(CcfTypography, Object.assign({ className: 'messageText' }, { children: translate('viewingInBrowserMessage') })), _jsxs(Box, Object.assign({ className: 'link_text' }, { children: [_jsx(CcfTypography, Object.assign({ "data-testid": "click-to-open-in-new-tab", className: 'link', variant: 'h5', tabIndex: 0, onClick: () => openInNewTab(), onKeyUp: (e) => { if (e.key === 'Enter')
                                                    openInNewTab(); } }, { children: translate('clickHere') })), _jsx(CcfTypography, Object.assign({ variant: 'h5' }, { children: translate('viewInBrowser') }))] }))] }) }))] })), !isSmView
                && _jsx(CcfBox, Object.assign({ id: 'displayContainer', ref: displayRef, sx: { height: 'calc(100% - 60px)' } }, { children: !isCustomIframesLoaded
                        && _jsx(CcfBox, Object.assign({ "data-testid": 'customWorkspaceLoader', sx: {
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            } }, { children: _jsx(CcfLoader, { isPrimary: true }) })) })), !isWindowPoppedout && isSmView && _jsx("iframe", { title: translate('customWorkspace'), src: activecustomWorkspace === null || activecustomWorkspace === void 0 ? void 0 : activecustomWorkspace.persistentPanelURI, width: '100%', className: "customworkspace-iframe", allow: "camera *; microphone *;autoplay;geolocation;fullscreen;usb;picture-in-picture;web-share;" })] })));
};
export default CcfcustomWorkspace;
//# sourceMappingURL=ccf-customworkspace.js.map