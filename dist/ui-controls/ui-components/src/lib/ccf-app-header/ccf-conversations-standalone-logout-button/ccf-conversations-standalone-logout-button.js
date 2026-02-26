import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, useTheme } from '@mui/material';
import { CcfAppToastMessage, CcfLogoutIcon, useTranslator } from '@nice-devone/ui-controls';
import CcfAppHeaderStyles from '../ccf-app-header-styles';
import { useDispatch } from 'react-redux';
import { globalActions } from '../../global.app.slice';
import React from 'react';
import { toast } from 'react-toastify';
import { logoutUser } from '../../ccf-authentication/ccf-authentication.slice';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { updateUserAvailability } from '../../ccf-agent-chat/ccf-agent-chat.slice';
/**
 * CcfConversationsStandaloneLogoutButton component
 * @returns CcfConversationsStandaloneLogoutButton
 * @example <CcfConversationsStandaloneLogoutButton />
 */
export function CcfConversationsStandaloneLogoutButton() {
    const [translate] = useTranslator();
    const theme = useTheme();
    const conversationsStandalone = CcfAppHeaderStyles(theme);
    const dispatch = useDispatch();
    const appToastContainer = React.useRef();
    const userInfo = CXoneUser.instance.getUserInfo();
    /**
     * @example dispatch an action for force logout
     */
    const forceLogout = () => {
        const activeContactsStatus = {
            forceLogOff: false,
            ignorePersonaQueue: false,
        };
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        dispatch(updateUserAvailability({ id: userInfo.userId, userState: 'Offline' }));
        dispatch(logoutUser(activeContactsStatus));
        toast.dismiss(appToastContainer.current);
        appToastContainer.current = undefined;
    };
    /**
     * @example dismiss toast on cancel
     */
    const dismissToast = () => {
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        toast.dismiss(appToastContainer.current);
        appToastContainer.current = undefined;
    };
    /**
     * Function to display logout action when logout button is clicked
     * @example logOutClickHandler()
     * @returns
     */
    const logOutClickHandler = () => {
        if (appToastContainer === null || appToastContainer === void 0 ? void 0 : appToastContainer.current)
            return;
        dispatch(globalActions.logoutToastMessageConfirmed(true));
        appToastContainer.current = toast.warn(_jsx(CcfAppToastMessage, { type: 'warning logoutConfirmationPanel', titleKey: 'logOutConfirmationTitle', messageKey: 'logOutConfonfirmationMsg', primaryBtnText: "logOut", secondaryBtnText: "cancel", triggerPrimaryHandler: () => forceLogout(), triggerSecondaryHandler: () => dismissToast() }), {
            autoClose: false,
            closeButton: false,
            containerId: 'AppToastContainer',
        });
        dispatch(globalActions.storeLogoutToastRefrence(appToastContainer.current));
    };
    return (_jsx(IconButton, Object.assign({ color: "inherit", "aria-label": translate('logOut') ? translate('logOut') : 'logOut', "data-testid": "logout", tabIndex: 0, disableFocusRipple: true, role: "button", sx: [conversationsStandalone.logOutButton, conversationsStandalone === null || conversationsStandalone === void 0 ? void 0 : conversationsStandalone.focussedElement, conversationsStandalone === null || conversationsStandalone === void 0 ? void 0 : conversationsStandalone.focussedBackground], onClick: logOutClickHandler }, { children: _jsx(CcfLogoutIcon, {}) })));
}
export default CcfConversationsStandaloneLogoutButton;
//# sourceMappingURL=ccf-conversations-standalone-logout-button.js.map