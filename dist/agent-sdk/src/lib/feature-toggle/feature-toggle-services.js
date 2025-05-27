import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { HttpClient, HttpUtilService, LocalStorageHelper, Logger, StorageKeys, } from '@nice-devone/core-sdk';
/**
 * Class to get feature toggle
 */
export class FeatureToggleService {
    /**
     * Create instance of FeatureToggleService
     * @example
     * ```
     * const ftService = new FeatureToggleService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'FeatureToggleService');
        this.utilService = new HttpUtilService();
        this.GET_FT_URL = '/config/toggledFeatures';
        this.featuresRequest = null;
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const ftService = FeatureToggleService.instance;
     * ```
     */
    static get instance() {
        if (!FeatureToggleService.singleton) {
            FeatureToggleService.singleton = new FeatureToggleService();
        }
        return FeatureToggleService.singleton;
    }
    /**
     * Method to load features
     * @example
     * ```
     * loadFeatures()
     * ```
     */
    loadFeatures() {
        if (this.features) {
            return Promise.resolve(this.features);
        }
        else {
            const toggledFeaturesFromStorage = this.loadFeaturesFromStorage();
            if (toggledFeaturesFromStorage) {
                this.features = toggledFeaturesFromStorage;
                return Promise.resolve(toggledFeaturesFromStorage);
            }
        }
        return this.sendGetToggledFeaturesRequest();
    }
    /**
     * Method to load features from storage
     * @example
     * ```
     * loadFeaturesFromStorage()
     * ```
     */
    loadFeaturesFromStorage() {
        const toggledFeaturesFromStorage = LocalStorageHelper.getItem(StorageKeys.FEATURE_TOGGLES, true);
        if (toggledFeaturesFromStorage) {
            return toggledFeaturesFromStorage;
        }
        return null;
    }
    /**
     * Method to get feature toggle by Name
     * @param featureName - The name of the feature toggle
     * @example
     * ```
     * getFeatureToggle('featureToggleName');
     * ```
     */
    getFeatureToggle(featureName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.features) {
                    try {
                        if (!this.featuresRequest) {
                            this.featuresRequest = this.loadFeatures();
                        }
                        const features = yield this.featuresRequest;
                        return features !== undefined && (features === null || features === void 0 ? void 0 : features.indexOf(featureName)) !== -1;
                    }
                    catch (err) {
                        this.logger.error('getFeatureToggle', 'Error while getting feature toggle data' + err);
                    }
                }
                else {
                    return Array.isArray(this.features) && ((_a = this.features) === null || _a === void 0 ? void 0 : _a.includes(featureName));
                }
            }
            catch (error) {
                this.logger.error('getFeatureToggle', 'Error in getFeatureToggle method' + error);
            }
            return false;
        });
    }
    /**
     * Method to get feature toggle
     * @param featureName - The name of the feature toggle
     * @example
     * ```
     * getFeatureToggleSync('featureToggleName')
     * ```
     */
    getFeatureToggleSync(featureName) {
        var _a;
        if (!this.features) {
            this.features = this.loadFeaturesFromStorage() || [];
        }
        return Array.isArray(this.features) && ((_a = this.features) === null || _a === void 0 ? void 0 : _a.includes(featureName));
    }
    /**
     * Method to get feature toggle by API call
     * @example
     * ```
     * sendGetToggledFeaturesRequest()
     * ```
     */
    sendGetToggledFeaturesRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = this.auth.getAuthToken();
                const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
                const cxOneConfig = this.auth.getCXoneConfig();
                const url = cxOneConfig.userHubBaseUrl + this.GET_FT_URL;
                return new Promise((resolve, reject) => {
                    HttpClient.get(url, reqInit).then((res) => {
                        this.features = res.data.toggledFeatures;
                        resolve(res.data.toggledFeatures);
                        LocalStorageHelper.setItem(StorageKeys.FEATURE_TOGGLES, res.data.toggledFeatures);
                    }, (error) => {
                        this.logger.error('sendGetToggledFeaturesRequest', 'Error while getting feature toggle data' + error.message);
                        reject(error);
                    });
                });
            }
            catch (err) {
                this.logger.error('sendGetToggledFeaturesRequest', 'Error while getting feature toggle data' + err);
                return [];
            }
        });
    }
}
//# sourceMappingURL=feature-toggle-services.js.map