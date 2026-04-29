import { CXoneProductFeature } from '../acd';
/**
 * Utility class for product feature checks
 */
export declare class ProductFeatureUtils {
    private static readonly logger;
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
    static checkProductEnablement(features: CXoneProductFeature | CXoneProductFeature[]): Promise<boolean>;
}
