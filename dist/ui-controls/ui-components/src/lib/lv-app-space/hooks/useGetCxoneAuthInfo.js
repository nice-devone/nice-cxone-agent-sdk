import { useEffect, useState, useMemo } from 'react';
import { AuthStatus, CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { StorageKeys, Logger } from '@nice-devone/core-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { LOGGER_MODULE } from '../lv-app-space-utility';
const logger = new Logger(LOGGER_MODULE, 'useGetcxoneAuthInfo');
/**
 * Gets the CXone Auth Info that needs to be passed to the LV Components
 * Notes:
 * - Makes sure to listen to the refresh token success event to capture the new token
 * @example
 * ```
 * const { authToken, cxoneConfig, oidcConfig, tenantId, userInfo } = useGetCxoneAuthInfo()
 * ```
 */
export default function useGetCxoneAuthInfo() {
    var _a;
    const cxoneUserInstance = CXoneUser.instance;
    const cxoneClientInstance = CXoneClient.instance;
    const cxoneAuthInstance = CXoneAuth.instance;
    const userInfo = (_a = cxoneUserInstance.getUserInfo()) !== null && _a !== void 0 ? _a : {};
    const cxoneConfig = cxoneClientInstance.auth.getCXoneConfig();
    const authToken = cxoneAuthInstance.getAuthToken();
    const [finalAuthToken, setFinalAuthToken] = useState(authToken ? JSON.parse(JSON.stringify(authToken)) : undefined);
    const oidcConfig = useMemo(() => JSON.parse(localStorage.getItem(StorageKeys.OIDC_CONFIG) || '{}'), []);
    /**
     * Capture the new token when the refresh token is successful
     */
    useEffect(() => {
        try {
            /* istanbul ignore next */
            cxoneAuthInstance.onAuthStatusChange.subscribe((authResponse) => {
                if (authResponse.status === AuthStatus.REFRESH_TOKEN_SUCCESS && authResponse.response)
                    setFinalAuthToken(JSON.parse(JSON.stringify(authResponse.response)));
            });
        }
        catch (error) {
            /* istanbul ignore next */
            logger.error('ECC - Error subscribing to auth status change:', JSON.stringify(error));
        }
    }, []);
    return useMemo(() => ({
        authToken: finalAuthToken,
        cxoneConfig,
        oidcConfig,
        tenantId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.tenantId,
        userInfo,
    }), [finalAuthToken, cxoneConfig, oidcConfig, userInfo]);
}
//# sourceMappingURL=useGetCxoneAuthInfo.js.map