import { __awaiter } from "tslib";
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { HttpClient, HttpUtilService } from '../lib/http';
import { Logger } from '../logger/logger';
import { LocalStorageHelper } from './storage-helper-local';
import { StorageKeys } from '../constants/storage-key';
/**
 * Class to get feature toggle
 */
export class FeatureToggleService {
    constructor() {
        this.logger = new Logger('SDK', 'FeatureToggleService');
        this.utilService = new HttpUtilService();
        this.GET_FT_URL = '/config/toggledFeatures';
        this.featuresRequest = null;
        this.accessToken = '';
        this.baseUrl = '';
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
     * Initializes the feature toggle service with the provided access token and base URL.
     *
     * @param accessToken - The access token used for authentication.
     * @param baseUrl - The base URL of the feature toggle service.
     * @example
     * ```
     * init('accessToken', 'baseUrl');
     * ```
     */
    init(accessToken, baseUrl) {
        this.accessToken = accessToken;
        this.baseUrl = baseUrl;
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
     * @param featureName - The name of the feature toggle.
     * @example
     * ```
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
     * @param featureName - The name of the feature toggle.
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
                if (!this.accessToken || !this.baseUrl) {
                    throw new CXoneSdkError(CXoneSdkErrorType.NO_DATA_FOUND, 'Access token or base URL is not set');
                }
                const token = this.accessToken;
                const reqInit = this.utilService.initHeader(token, 'application/json');
                const url = this.baseUrl + this.GET_FT_URL;
                return new Promise((resolve, reject) => {
                    HttpClient.get(url, reqInit).then((res) => {
                        this.features = res.data.toggledFeatures;
                        this.features && LocalStorageHelper.setItem(StorageKeys.FEATURE_TOGGLES, this.features);
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