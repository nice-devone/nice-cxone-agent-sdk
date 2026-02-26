import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Stack, Link, Typography, Collapse, } from '@mui/material';
import { useTranslator, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ccfWebRTCExtensionHelpStyles from './ccf-web-rtcextension-help-styles';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
/**
 * Used to display an alert message in Integrated softphone mode when the webRTC extension is not installed
 * @example - <CcfWebRTCExtensionHelp/>
 * @returns CcfWebRTCExtensionHelp Component
 */
export function CcfWebRTCExtensionHelp() {
    const styles = ccfWebRTCExtensionHelpStyles();
    const [translate] = useTranslator();
    const logger = new Logger('ui-components', 'CcfWebRTCExtensionHelp');
    const helpLink = 'https://help.nicecxone.com/content/agent/cxoneagent/addcxawebrtcext.htm';
    useEffect(() => {
        logger.info('useEffect', 'Component Loaded');
        let toastId = '';
        const extensionInstallReminder = LocalStorageHelper.getItem(StorageKeys.WEBRTC_EXTENSION_INSTALL_REMINDER, true);
        const extensionInstallReminderDisplayed = LocalStorageHelper.getItem(StorageKeys.WEBRTC_EXT_INSTALL_REMINDER_DISPLAYED, true);
        if (extensionInstallReminder === false ||
            extensionInstallReminderDisplayed) {
            return;
        }
        const controlButtons = (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ style: { marginTop: 10 } }, { children: _jsxs(Typography, Object.assign({ variant: "h6", variantMapping: { h6: 'p' } }, { children: [translate('softphoneHelpDescriptionMain'), _jsxs(Link, Object.assign({ href: helpLink, underline: "always", target: '_blank', sx: { color: '#005c99' }, "data-testid": "softphoneHelpDescriptionSub" }, { children: [' ', translate('softphoneHelpDescriptionSub')] }))] })) })), _jsx(Box, { children: _jsxs(Stack, Object.assign({ direction: "row", spacing: 2, style: { marginTop: 10 }, justifyContent: "flex-end" }, { children: [_jsx(Button, Object.assign({ variant: "outlined", size: "small", title: translate('softphoneDonotRemind'), "data-testid": "softphone-Donot-Remind", disableRipple: true, onClick: () => {
                                    LocalStorageHelper.setItem(StorageKeys.WEBRTC_EXTENSION_INSTALL_REMINDER, false);
                                    toast.dismiss(toastId);
                                } }, { children: translate('softphoneDonotRemind') })), _jsx(Button, Object.assign({ variant: "contained", size: "small", title: translate('softphoneRemindMe'), "data-testid": "softphone-RemindMe", disableRipple: true, onClick: () => {
                                    LocalStorageHelper.setItem(StorageKeys.WEBRTC_EXTENSION_INSTALL_REMINDER, true);
                                    toast.dismiss(toastId);
                                } }, { children: translate('softphoneRemindMe') }))] })) })] }));
        toastId = toast.info(_jsx(Box, Object.assign({ sx: styles.mainContainer }, { children: _jsx(CcfAppToastMessage, { type: "any", "data-testid": "toast-id", titleKey: 'softphoneHelpTitle', children: controlButtons }) })), {
            autoClose: false,
            draggable: true,
            draggableDirection: 'y',
            position: 'top-center',
            containerId: 'AppToastContainer',
            style: { cursor: 'default' },
            onClose: () => {
                LocalStorageHelper.setItem(StorageKeys.WEBRTC_EXT_INSTALL_REMINDER_DISPLAYED, true);
            },
        });
        return () => {
            logger.info('useEffect', 'Component Unloaded');
        };
    }, []);
    return _jsx(Collapse, {});
}
export default CcfWebRTCExtensionHelp;
//# sourceMappingURL=ccf-web-rtcextension-help.js.map