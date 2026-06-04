import { HttpUtilService } from '../lib/http';
import { Logger } from '../logger/logger';
/**
 * Class to get feature toggle
 */
export declare class FeatureToggleService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private static singleton;
    private features?;
    private GET_FT_URL;
    private featuresRequest;
    private accessToken;
    private baseUrl;
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const ftService = FeatureToggleService.instance;
     * ```
     */
    static get instance(): FeatureToggleService;
    /**
     * Initializes the feature toggle service with the provided access token and base URL.
     *
     * @param accessToken - The access token used for authentication.
     * @param baseUrl - The base URL of the feature toggle service.
     * @example
     * ```
     * init('accessToken', 'baseUrl');
     * ```
     */
    init(accessToken: string, baseUrl: string): void;
    /**
     * Method to load features
     * @example
     * ```
     * loadFeatures()
     * ```
     */
    loadFeatures(): Promise<string[]>;
    /**
     * Method to load features from storage
     * @example
     * ```
     * loadFeaturesFromStorage()
     * ```
     */
    private loadFeaturesFromStorage;
    /**
     * Method to get feature toggle by Name
     * @param featureName - The name of the feature toggle.
     * @example
     * ```
     * getFeatureToggle('featureToggleName');
     * ```
     */
    getFeatureToggle(featureName: string): Promise<boolean>;
    /**
     * Method to get feature toggle
     * @param featureName - The name of the feature toggle.
     * @example
     * ```
     * getFeatureToggleSync('featureToggleName')
     * ```
     */
    getFeatureToggleSync(featureName: string): boolean;
    /**
     * Method to get feature toggle by API call
     * @example
     * ```
     * sendGetToggledFeaturesRequest()
     * ```
     */
    private sendGetToggledFeaturesRequest;
}
