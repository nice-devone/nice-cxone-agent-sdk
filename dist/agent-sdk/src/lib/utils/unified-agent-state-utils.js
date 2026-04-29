import { __awaiter } from "tslib";
import { FeatureToggleService, Logger } from '@nice-devone/core-sdk';
import { CXoneProductFeature } from '../acd';
import { ProductFeatureUtils } from '../product-feature/product-feature-utils';
/**
 * Util to determine if the Unified Agent State feature is enabled.
 * @returns - boolean indicating if unified agent state is enabled
 * @example -
 * ```
 * const isEnabled = await isUnifiedAgentStateEnabled();
 * ```
 */
export const isUnifiedAgentStateEnabled = () => __awaiter(void 0, void 0, void 0, function* () {
    const ccfLogger = new Logger('CcfLogger', 'isUnifiedAgentStateEnabled');
    try {
        const unifiedAgentStateFf4jToggleV2 = FeatureToggleService.instance.getFeatureToggleSync("release-cx-directory-agent-state-working-digital-v2-AW-52273" /* FeatureToggles.DIRECTORY_AGENT_STATE_WORKING_DIGITAL_V2_FEATURE_TOGGLE */);
        const unifiedAgentStateTenantToggle = yield ProductFeatureUtils.checkProductEnablement(CXoneProductFeature.UNIFIED_AGENT_STATE);
        return unifiedAgentStateFf4jToggleV2 && unifiedAgentStateTenantToggle;
    }
    catch (error) {
        // Handle error
        if (error instanceof Error) {
            ccfLogger.error('isUnifiedAgentStateEnabled', error.message);
        }
        return false;
    }
});
//# sourceMappingURL=unified-agent-state-utils.js.map