import { __awaiter } from "tslib";
import { CcfLogger } from '../logger/ccf-logger';
import { CXoneClient } from '../cxone-client';
/**
 * Utility class for product feature checks
 */
export class ProductFeatureUtils {
    /**
     * Check if a product feature is enabled
     * @param features - Product feature(s) to check
     * @returns Promise<boolean> - True if all features are enabled
     * @example
     * ```
     * const isEnabled = await ProductFeatureUtils.checkProductEnablement(CXoneProductFeature.FEATURE);
     * const multipleEnabled = await ProductFeatureUtils.checkProductEnablement([
     *   CXoneProductFeature.FEATURE1,
     *   CXoneProductFeature.FEATURE2
     * ]);
     * ```
     */
    static checkProductEnablement(features) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const featureArray = Array.isArray(features) ? features : [features];
                const result = yield CXoneClient.instance.cxoneTenant.checkProductEnablement(featureArray);
                if (typeof result === 'boolean') {
                    return result;
                }
                // Fallback: non-boolean results are treated as not enabled.
                this.logger.error('checkProductEnablement', 'Non-boolean result from cxoneTenant.checkProductEnablement: ' + JSON.stringify(result));
                return false;
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('checkProductEnablement', error.message);
                }
                return false;
            }
        });
    }
}
ProductFeatureUtils.logger = new CcfLogger('ProductFeatureUtils', 'ProductFeatureUtils');
//# sourceMappingURL=product-feature-utils.js.map