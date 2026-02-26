import { useMemo } from 'react';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
/**
 * Gets the CXone Instances Context so can be used by LV App Space
 *
 * @example
 * ```
 * const { authToken, cxoneConfig, oidcConfig, tenantId, userInfo } = useGetCxoneContext()
 * ```
 */
export default function useGetCxoneInstances() {
    const cxoneAuthInstance = CXoneAuth.instance;
    const cxoneClientInstance = CXoneClient.instance;
    const cxoneDigitalClient = CXoneDigitalClient.instance;
    const cxoneUserInstance = CXoneUser.instance;
    return useMemo(() => ({
        cxoneAuthInstance,
        cxoneClientInstance,
        cxoneDigitalClient,
        cxoneUserInstance,
    }), [
        cxoneAuthInstance,
        cxoneClientInstance,
        cxoneDigitalClient,
        cxoneUserInstance
    ]);
}
//# sourceMappingURL=useGetCxoneInstances.js.map