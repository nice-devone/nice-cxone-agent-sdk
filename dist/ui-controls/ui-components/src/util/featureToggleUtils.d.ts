/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
 * @returns - boolean
 * @example -
 * ```
 * isFeatureEnabled('release-ccf-digital_Dispostion-AW-2806');
 * ```
 */
export declare const isFeatureEnabled: (featureName: string) => boolean;
/**
 * Util to get feature toggle enablement
 * @param featureName - feature toggle Name
 * @returns - boolean
 * @example -
 * ```
 * isFeatureEnabledAsync('release-ccf-digital_Dispostion-AW-2806');
 * ```
 */
export declare const isFeatureEnabledAsync: (featureName: string) => Promise<boolean>;
/**
 * Util to get all feature toggles
 * @returns - string[]
 * @example -
 * ```
 * getAllFeatureTogglesAsync();
 * ```
 */
export declare const getAllFeatureTogglesAsync: () => Promise<string[]>;
