import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CcfDoodleImage } from '@nice-devone/ui-controls';
import { CXoneAuth, AuthStatus } from '@nice-devone/auth-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { LocalStorageHelper, Logger } from '@nice-devone/core-sdk';
import { Navigate } from 'react-router-dom-v5-compat';
import { RoutePaths } from '../../enums/route-paths';
let cxoneAuthWindow;
/**
 * Component to handle auth code retrieval and window post message
 * @example -
 */
export function CcfAuthenticationCallback(props) {
    const IS_USER_LOGGED_IN = 'isUserLoggedIn';
    const logger = new Logger();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        var _a;
        const authSubscription = CXoneAuth.instance.onAuthStatusChange.subscribe((authResponse) => {
            switch (authResponse.status) {
                case AuthStatus.AUTHENTICATED:
                    LocalStorageHelper.setItem(IS_USER_LOGGED_IN, 'true');
                    setIsUserLoggedIn(true);
                    break;
                case AuthStatus.NOT_AUTHENTICATED || AuthStatus.AUTHENTICATION_FAILED:
                    LocalStorageHelper.removeItem(IS_USER_LOGGED_IN);
                    setIsUserLoggedIn(false);
                    break;
            }
        });
        const message = {
            messageType: 'authcode',
            message: window.location.search,
        };
        if (window.opener) {
            cxoneAuthWindow = window;
            window.opener.postMessage(message, '*');
        }
        else {
            const properties = Object.assign({}, props);
            const code = new URLSearchParams(message.message).get('code') || '';
            authenticateByCode({
                clientId: (_a = props.authSettings) === null || _a === void 0 ? void 0 : _a.clientId,
                authCode: code,
                authProps: properties,
            });
        }
        return () => {
            authSubscription === null || authSubscription === void 0 ? void 0 : authSubscription.unsubscribe();
        };
    }, []);
    /**
     * Method to close auth window
     * @example - closeCxoneAuthWindow();
     */
    const closeCxoneAuthWindow = () => {
        cxoneAuthWindow === null || cxoneAuthWindow === void 0 ? void 0 : cxoneAuthWindow.close();
    };
    /**
     * Method to authenticate agent by code
     * @example -  authenticateByCode
     */
    const authenticateByCode = (args) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authObject = {
                clientId: args.clientId,
                code: args.authCode,
            };
            CXoneClient.instance.auth.init(args.authProps.authSettings);
            CXoneClient.instance.auth.getAccessTokenByCode(authObject);
            cxoneAuthWindow === null || cxoneAuthWindow === void 0 ? void 0 : cxoneAuthWindow.close();
            window.removeEventListener('beforeunload', closeCxoneAuthWindow);
        }
        catch (error) {
            logger.debug('[authenticateByCode][getAccessToken]', `payload: ${JSON.stringify(error)}`);
        }
    });
    return (_jsxs("div", { children: [_jsx(CcfDoodleImage, {}), isUserLoggedIn && _jsx(Navigate, { to: RoutePaths.HOME })] }));
}
export default CcfAuthenticationCallback;
//# sourceMappingURL=ccf-authentication-callback.js.map