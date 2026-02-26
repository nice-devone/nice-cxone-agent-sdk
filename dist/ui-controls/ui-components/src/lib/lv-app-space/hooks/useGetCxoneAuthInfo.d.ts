import { OpenIDConfiguration } from '@nice-devone/auth-sdk';
/**
 * Gets the CXone Auth Info that needs to be passed to the LV Components
 * Notes:
 * - Makes sure to listen to the refresh token success event to capture the new token
 * @example
 * ```
 * const { authToken, cxoneConfig, oidcConfig, tenantId, userInfo } = useGetCxoneAuthInfo()
 * ```
 */
export default function useGetCxoneAuthInfo(): {
    authToken: any;
    cxoneConfig: import("../../../../../../../dist/libs/common/common-sdk/src").CXoneConfiguration;
    oidcConfig: OpenIDConfiguration;
    tenantId: string;
    userInfo: import("../../../../../../../dist/libs/common/common-sdk/src").UserInfo;
};
