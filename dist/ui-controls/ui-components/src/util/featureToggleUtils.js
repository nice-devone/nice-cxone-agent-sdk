import { __awaiter } from "tslib";
import { FeatureToggleService } from '@nice-devone/agent-sdk';
/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
 * @returns - boolean
 * @example -
 * ```
 * isFeatureEnabled('release-ccf-digital_Dispostion-AW-2806');
 * ```
 */
export const isFeatureEnabled = (featureName) => {
    return FeatureToggleService.instance.getFeatureToggleSync(featureName);
};
/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
 * @returns - boolean
 * @example -
 * ```
 * isFeatureEnabledAsync('release-ccf-digital_Dispostion-AW-2806');
 * ```
 */
export const isFeatureEnabledAsync = (featureName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield FeatureToggleService.instance.getFeatureToggle(featureName);
});
/**
 * Util to get all feature toggles
 * @returns - string[]
 * @example -
 * ```
 * getAllFeatureTogglesAsync();
 * ```
 */
export const getAllFeatureTogglesAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield FeatureToggleService.instance.loadFeatures();
});
//# sourceMappingURL=featureToggleUtils.js.map