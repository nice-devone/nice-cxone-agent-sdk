import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { HttpClient, HttpUtilService, Logger, } from '@nice-devone/core-sdk';
/**
 * Class to get feature toggle
 */
export class FeatureToggleService {
    /**
     * Create instance of FeatureToggleService
     * ```
     * @example
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
     * ```
     * @example
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
     * ```
     * @example
     * loadFeatures()
     * ```
     */
    loadFeatures() {
        if (this.features) {
            return Promise.resolve(this.features);
        }
        return this.sendGetToggledFeaturesRequest();
    }
    /**
     * Method to get feature toggle by Name
     * ```
     * @example
     * getFeatureToggle('featureToggleName');
     * ```
     */
    getFeatureToggle(featureName) {
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
                    return this.features && this.features.includes(featureName);
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
     * ```
     * @example
     * getFeatureToggleSync('featureToggleName')
     * ```
     */
    getFeatureToggleSync(featureName) {
        return this.features && this.features.includes(featureName);
    }
    /**
     * Method to get feature toggle by API call
     * ```
     * @example
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