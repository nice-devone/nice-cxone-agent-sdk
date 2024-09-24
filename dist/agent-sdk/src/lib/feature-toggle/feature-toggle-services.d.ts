import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to get feature toggle
 */
export declare class FeatureToggleService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private static singleton;
    private features?;
    private auth;
    private GET_FT_URL;
    private featuresRequest;
    /**
     * Create instance of FeatureToggleService
     * ```
     * @example
     * const ftService = new FeatureToggleService();
     * ```
     */
    constructor();
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const ftService = FeatureToggleService.instance;
     * ```
     */
    static get instance(): FeatureToggleService;
    /**
     * Method to load features
     * ```
     * @example
     * loadFeatures()
     * ```
     */
    loadFeatures(): Promise<string[]>;
    /**
     * Method to get feature toggle by Name
     * ```
     * @example
     * getFeatureToggle('featureToggleName');
     * ```
     */
    getFeatureToggle(featureName: string): Promise<boolean>;
    /**
     * Method to get feature toggle
     * ```
     * @example
     * getFeatureToggleSync('featureToggleName')
     * ```
     */
    getFeatureToggleSync(featureName: string): boolean;
    /**
     * Method to get feature toggle by API call
     * ```
     * @example
     * sendGetToggledFeaturesRequest()
     * ```
     */
    private sendGetToggledFeaturesRequest;
}
