/**
 * Embedded apps can access this class
 * Passing true / false based on the feature toggle present
 * Not able to use the Feature Toggle Service and LocalStorageHelper due to circular dependency
 */
export declare class Embeddedappsfeaturetoggleservice {
    /**
     * check the feature toggle exist
     * @param featureName - feature toggle name
     * @example - isFeatureToggleEnabled()
     */
    static isFeatureToggleEnabled(featureName: string): boolean;
}
