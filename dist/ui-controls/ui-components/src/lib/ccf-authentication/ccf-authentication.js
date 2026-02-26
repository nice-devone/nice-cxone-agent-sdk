import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom-v5-compat';
import { Grid, Box, CircularProgress } from '@mui/material';
import { CcfButton, CcfTypography } from '@nice-devone/ui-controls';
import { AuthStatus, CXoneAuth } from '@nice-devone/auth-sdk';
import { LocalStorageHelper, Logger } from '@nice-devone/core-sdk';
import { ccfAuthStyles } from './ccf-authentication.style';
import { RoutePaths } from '../../enums/route-paths';
let cxoneAuthWindow;
/**
 * Component to manage Global Authentication Flow
 * @param CcfAuthenticationProps - Consumer application's required auth data for GA flow
 * ```
 * @example
 *  <CcfAuthentication {...appAuthData} />
 * ```
 */
export function CcfAuthentication(props) {
    const navigate = useNavigate();
    const logoImg = '/assets/login-image.png';
    const IS_USER_LOGGED_IN = 'isUserLoggedIn';
    const styles = ccfAuthStyles();
    const logger = new Logger();
    const isPopupAuthMode = props.authMode === 'popup' ? true : false;
    const [isLoading, setIsLoading] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        const authSubscription = CXoneAuth.instance.onAuthStatusChange.subscribe((authResponse) => {
            switch (authResponse.status) {
                case AuthStatus.AUTHENTICATED:
                    LocalStorageHelper.setItem(IS_USER_LOGGED_IN, 'true');
                    setIsUserLoggedIn(true);
                    break;
                case AuthStatus.NOT_AUTHENTICATED || AuthStatus.AUTHENTICATION_FAILED:
                    LocalStorageHelper.removeItem(IS_USER_LOGGED_IN);
                    if (!isPopupAuthMode)
                        redirectToAuthURL();
                    setIsUserLoggedIn(false);
                    break;
            }
        });
        CXoneAuth.instance.restoreData();
        return () => {
            authSubscription === null || authSubscription === void 0 ? void 0 : authSubscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        if (props.queryString && props.app !== 'cxa')
            navigate(`${props.queryString}`);
        else
            navigate(`?app=${props.app}`);
        window.addEventListener('message', fetchAuthCodeMessage);
        return () => {
            window.removeEventListener('message', fetchAuthCodeMessage, false);
        };
    }, []);
    /**
     * Event handler to receive message event from auth callback popup
     * @example fetchAuthCodeMessage()
     */
    const fetchAuthCodeMessage = (event) => {
        var _a;
        if (event.data['messageType'] === 'authcode') {
            const code = new URLSearchParams(event.data['message']).get('code') || '';
            const properties = Object.assign({}, props);
            authenticateByCode({
                clientId: (_a = props.authSettings) === null || _a === void 0 ? void 0 : _a.clientId,
                authCode: code,
                authProps: properties,
            });
        }
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
            CXoneAuth.instance.init(args.authProps.authSettings);
            CXoneAuth.instance.getAccessTokenByCode(authObject);
            cxoneAuthWindow === null || cxoneAuthWindow === void 0 ? void 0 : cxoneAuthWindow.close();
            window.removeEventListener('beforeunload', closeCxoneAuthWindow);
        }
        catch (error) {
            logger.debug('[authenticateByCode][getAccessToken]', `payload: ${JSON.stringify(error)}`);
        }
    });
    /**
     * Method to redirect to the Auth URL
     * @example - redirectToAuthURL();
     */
    const redirectToAuthURL = () => __awaiter(this, void 0, void 0, function* () {
        CXoneAuth.instance.init(props.authSettings);
        const authUrl = yield CXoneAuth.instance
            .getAuthorizeUrl(props.authMode, props.codeChallengeMethod)
            .catch((error) => {
            logger.debug('[redirectToAuthURL][getAuthorizeUrl]', `payload: ${JSON.stringify(error)}`);
        });
        if (authUrl && !isPopupAuthMode) {
            window.location.href = authUrl;
        }
        else if (authUrl && isPopupAuthMode) {
            const popupOptions = 'width=500,height=500,scrollbars=yes,toolbar=no,left=50,top=50';
            cxoneAuthWindow = window.open(authUrl, 'authWindow', popupOptions);
            window.addEventListener('beforeunload', closeCxoneAuthWindow);
            const popupWindowCloseEvent = setInterval(() => {
                if (cxoneAuthWindow === null || cxoneAuthWindow === void 0 ? void 0 : cxoneAuthWindow.closed) {
                    clearInterval(popupWindowCloseEvent);
                }
            }, 1000);
        }
    });
    /**
     * Method to handle login button click
     * @example - loginClickHandler();
     */
    const loginClickHandler = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        yield redirectToAuthURL();
    });
    /**
     * Method to close auth window
     * @example - closeCxoneAuthWindow();
     */
    const closeCxoneAuthWindow = () => {
        cxoneAuthWindow === null || cxoneAuthWindow === void 0 ? void 0 : cxoneAuthWindow.close();
    };
    if (isUserLoggedIn) {
        return (_jsx(Grid, Object.assign({ container: true, sx: styles.heightInherit }, { children: _jsx(Navigate, { to: RoutePaths.HOME }) })));
    }
    else {
        return isPopupAuthMode ? (_jsx(Grid, Object.assign({ container: true, sx: styles.heightInherit }, { children: _jsx(Grid, Object.assign({ item: true, md: 12, xs: 12, sm: 12, sx: styles.authenticationMain }, { children: _jsxs(Box, Object.assign({ sx: styles.loginContainer }, { children: [_jsx(Box, Object.assign({ sx: styles.alignTop }, { children: _jsx("img", { style: { height: '70px' }, src: logoImg, alt: "logo" }) })), isLoading && (_jsx(Box, Object.assign({ sx: styles.loader, textAlign: "center", mt: 3, width: "100%" }, { children: _jsx(CircularProgress, { size: 60 }) }))), _jsx(CcfButton, Object.assign({ style: styles.alignCenter, onClick: () => loginClickHandler(), variant: "contained", size: "small", disabled: isLoading, primary: true, "data-testid": "login" }, { children: _jsx(CcfTypography, { translationKey: "logIn" }) }))] })) })) }))) : (_jsx(Box, {}));
    }
}
export default CcfAuthentication;
//# sourceMappingURL=ccf-authentication.js.map