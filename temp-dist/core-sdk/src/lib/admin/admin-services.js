import { __awaiter } from "tslib";
import { HttpClient } from '../http/http-client/http-client';
import { HttpUtilService } from '../http/http-util-service';
import { Logger } from '../../logger/logger';
import { ApiParser } from '../../util/api-parser';
import { AdminApis } from './model/admin-apis';
import { StorageKeys } from '../../constants/storage-key';
import { CXoneIndicator, CXoneSdkError, CXoneSdkErrorType, UserLocation, } from '@nice-devone/common-sdk';
import { LocalStorageHelper } from '../../util/storage-helper-local';
import { ApiUriConstants } from '../../constants/api-uri-constants';
import { ValidationUtils } from '../../util/validation-utils';
import { CXoneUserDetails } from './model/cxone-user-details';
import { ACDSessionManager } from '../agent';
import { UIQHubUrl } from './model/uiq-hub-url';
import { FeatureToggleService } from '../../util/feature-toggle-services';
import { CXoneVersionMapping } from './model/CXoneVersionMapping';
/**
 * Class to perform get admin api
 */
export class AdminService {
    constructor() {
        this.accessToken = '';
        this.acdSessionManager = {};
        this.agentIndicatorsInfo = [];
        this.apiParser = new ApiParser();
        this.cxOneConfig = {};
        this.maxClientDataLength = 4000;
        this.userInfo = {};
        this.validationUtils = new ValidationUtils();
        this.logger = new Logger('SDK', 'AdminService');
        this.utilService = new HttpUtilService();
    }
    /**
     * Method to initialize the user details
     * (i.e) cxoneConfig, userInfo and aceessToken
     * @param accessToken - Access token
     * @param config - cxoneConfig object
     * @param userInfo - user info object
     * @example
     * ```
     * const agentSession = AdminService.instance.initialize(accessToken, config, userInfo);
     * ```
     */
    initialize(accessToken, config, userInfo) {
        this.cxOneConfig = config;
        this.userInfo = userInfo;
        this.setAccessToken(accessToken);
        this.acdSessionManager = ACDSessionManager.instance;
    }
    /**
     * @returns - cxone configuration object
     * @example
     * ```
     * const cxoneConfig = this.getCXoneConfig();
     * ```
     */
    getCXoneConfig() {
        return this.cxOneConfig;
    }
    /**
     * @param accessToken - access token
     * @example
     * ```
     * this.setAccessToken(accessToken);
     * ```
     */
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const agentSession = AdminService.instance;
     * ```
     */
    static get instance() {
        if (!AdminService.singleton) {
            AdminService.singleton = new AdminService();
        }
        return AdminService.singleton;
    }
    /**
     * Method to return agent permissions
     * @returns - return the agent permissions
     * ```
     * @example
     * getPermissions()
     * ```
     */
    getPermissions(forceFetch = false) {
        return new Promise((resolve, reject) => {
            const permissionFromStorage = localStorage.getItem(StorageKeys.PERMISSIONS);
            if (forceFetch || !permissionFromStorage) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const permissionUrl = this.cxOneConfig.acdApiBaseUri +
                    AdminApis.getPermissionsUri.replace('{agentId}', this.userInfo.icAgentId);
                HttpClient.get(permissionUrl, reqInit).then((resp) => {
                    this.logger.info('getPermissions', 'Get Permissions Success');
                    const permission = this.apiParser.parsePermissions(resp);
                    localStorage.setItem(StorageKeys.PERMISSIONS, JSON.stringify(permission));
                    resolve(permission);
                }, (err) => {
                    this.logger.error('getPermissions', 'Get Permissions Failed ' + err.toString());
                    reject(err);
                });
            }
            else {
                this.logger.info('getPermissions', 'Get Permissions from storage');
                resolve(JSON.parse(permissionFromStorage));
            }
        });
    }
    /**
     * Method to return agent settings
     * @returns - return the agent settings
     * ```
     * @example
     * getAgentSettings()
     * ```
     */
    getAgentSettings() {
        return new Promise((resolve, reject) => {
            const agentSettingFromStorage = LocalStorageHelper.getItem(StorageKeys.AGENT_SETTINGS, true);
            let isCxssVersionServiceToggleEnabled = false;
            isCxssVersionServiceToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-cxss-versioning-api-AW-37635" /* FeatureToggles.GET_VERSION_FROM_CXSS_VERSIONING_API */);
            if (!agentSettingFromStorage) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                // Dev Note : Till monolith dependency is not removed, this logic should not be changed.
                // variable 'getAgentSettingsVersionServiceUri' to be used for Versioning Service usage, and variable 'getAgentSettingsUri' for direct Monolith usage
                const agentSettingAPIURL = isCxssVersionServiceToggleEnabled ? AdminApis.getAgentSettingsVersionServiceUri : AdminApis.getAgentSettingsUri;
                const permissionUrl = this.cxOneConfig.acdApiBaseUri +
                    agentSettingAPIURL.replace('{agentId}', this.userInfo.icAgentId);
                HttpClient.get(permissionUrl, reqInit).then((resp) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    this.logger.info('getAgentSettings', 'Get Agent settings Success');
                    const agentSettings = this.apiParser.parseAgentSettings(resp);
                    if (isCxssVersionServiceToggleEnabled && (agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.selectedCxaVersion) !== undefined) {
                        try {
                            const cxoneConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_CONFIG, true) || {};
                            let finalVersion = '';
                            switch ((_a = agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.selectedCxaVersion) === null || _a === void 0 ? void 0 : _a.toString()) {
                                case '0':
                                    finalVersion = CXoneVersionMapping.PREVIOUS;
                                    break;
                                case '1':
                                    finalVersion = CXoneVersionMapping.CURRENT;
                                    break;
                                case '2':
                                    finalVersion = CXoneVersionMapping.DEV;
                                    break;
                                default:
                                    finalVersion = CXoneVersionMapping.CURRENT;
                            }
                            const versioningAPIURL = this.cxOneConfig.apiFacadeBaseUri +
                                AdminApis.getAgentVersionUri.replace('{clusterId}', cxoneConfig.cluster).replace('{versionName}', finalVersion);
                            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                            try {
                                const response = yield HttpClient.get(versioningAPIURL, reqInit);
                                const appConfig = response.data.appUrl;
                                agentSettings.cxaClientVersion = appConfig === null || appConfig === void 0 ? void 0 : appConfig.url;
                                LocalStorageHelper.setItem(StorageKeys.AGENT_SETTINGS, agentSettings);
                            }
                            catch (innerError) {
                                this.logger.error('Error processing versioning API response', JSON.stringify(innerError));
                            }
                        }
                        catch (error) {
                            this.logger.error('Error in versioning API call block', JSON.stringify(error));
                        }
                    }
                    LocalStorageHelper.setItem(StorageKeys.AGENT_SETTINGS, agentSettings);
                    resolve(agentSettings);
                }), (err) => {
                    var _a;
                    this.logger.error('getAgentSettings', 'Get Agent settings Failed ' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                this.logger.info('getAgentSettings', 'Get agent settings from storage');
                resolve(agentSettingFromStorage);
            }
        });
    }
    /**
     * Method to return business unit features
     * @returns - returns the business unit features
     * ```
     * @example
     * getBusinessUnit()
     * ```
     */
    getBusinessUnit() {
        return new Promise((resolve, reject) => {
            const businessUnitFromStorage = LocalStorageHelper.getItem(StorageKeys.BUSINESS_UNIT, true);
            if (!businessUnitFromStorage) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.acdApiBaseUri + AdminApis.getBusinessUnitUri;
                HttpClient.get(url, reqInit).then((resp) => {
                    this.logger.info('getBusinessUnit', 'Get Business Unit Success');
                    const data = this.apiParser.parseBusinessUnit(resp);
                    LocalStorageHelper.setItem(StorageKeys.BUSINESS_UNIT, data);
                    resolve(data);
                }, (err) => {
                    var _a;
                    this.logger.error('getBusinessUnit', 'Get Business Unit Failed' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                this.logger.info('getBusinessUnit', 'Get business unit from storage');
                resolve(businessUnitFromStorage);
            }
        });
    }
    /**
     *  Method to return all tenant data
     * @example
     * ```
     * getTenantManagementData()
     * ```
     */
    getTenantData() {
        return new Promise((resolve, reject) => {
            const tenantDataFromStorage = LocalStorageHelper.getItem(StorageKeys.TENANT_DATA, true);
            if (!tenantDataFromStorage) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.userHubBaseUrl + AdminApis.getTenantDataUri;
                HttpClient.get(url, reqInit).then((response) => {
                    this.logger.info('getTenantManagementData', 'Get Tenant Management Data Success');
                    const data = this.apiParser.parseTenantData(response);
                    LocalStorageHelper.setItem(StorageKeys.TENANT_DATA, data);
                    resolve(data);
                }, (error) => {
                    var _a;
                    this.logger.error('getTenantManagementData', 'Get Tenant Management Data failed ' + JSON.stringify(error));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
                });
            }
            else {
                this.logger.info('getTenantManagementData', 'Get tenant data from storage');
                resolve(tenantDataFromStorage);
            }
        });
    }
    /**
     * Method to return client data
     * @returns - returns the client data
     * ```
     * @example
     * getClientData()
     * ```
     */
    getClientData() {
        return new Promise((resolve, reject) => {
            const clientDataFromStorage = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA);
            if (!clientDataFromStorage) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.acdApiBaseUri +
                    AdminApis.getClientDataUri.replace('{agentId}', this.userInfo.icAgentId);
                HttpClient.get(url, reqInit).then((resp) => {
                    var _a, _b, _c, _d;
                    this.logger.info('getClientData', 'Get Client Data Success');
                    LocalStorageHelper.setItem(StorageKeys.CLIENT_DATA, (_b = (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.Data) !== null && _b !== void 0 ? _b : '{}');
                    resolve(JSON.parse((_d = (_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.Data) !== null && _d !== void 0 ? _d : '{}'));
                }, (err) => {
                    var _a;
                    this.logger.error('getClientData', 'Get Client Data Failed' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                this.logger.info('getClientData', 'Get Client data from storage');
                // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
                const parseClientDataFromStorage = () => {
                    let parsedClientDataFromStorage = '';
                    try {
                        parsedClientDataFromStorage = JSON.parse(clientDataFromStorage !== null && clientDataFromStorage !== void 0 ? clientDataFromStorage : '{}');
                    }
                    catch (e) {
                        parsedClientDataFromStorage = '';
                        this.logger.error('getClientData', 'Get Client Data Failed' + JSON.stringify(e));
                    }
                    return parsedClientDataFromStorage;
                };
                resolve(parseClientDataFromStorage());
            }
        });
    }
    /**
     * Method to update client data
     * @returns - returns the client data
     * ```
     * @example
     * putClientData(clientData)
     * ```
     */
    putClientData(clientData) {
        return new Promise((resolve, reject) => {
            const url = this.cxOneConfig.acdApiBaseUri + AdminApis.putClientDataUri;
            const dataSet = JSON.stringify(clientData);
            const data = {
                agentId: this.userInfo.icAgentId,
                dataSet: dataSet,
            };
            // Not to exceed the clientdata space in DB
            if (dataSet.length <= this.maxClientDataLength) {
                const reqInit = {
                    headers: this.utilService.initHeader(this.accessToken).headers,
                    body: data,
                };
                HttpClient.put(url, reqInit).then(() => {
                    this.logger.info('putClientData', 'Put Client Data Success');
                    LocalStorageHelper.setItem(StorageKeys.CLIENT_DATA, dataSet);
                    resolve(dataSet);
                }, (err) => {
                    var _a;
                    this.logger.error('putClientData', 'Put Client Data Failed' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                reject(new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Exceeds the limit of the database'));
            }
        });
    }
    /**
     * Method to return central branding profile
     * @returns - returns the central branding profile
     * ```
     * @example
     * getCentralBrandingProfile()
     * ```
     */
    getCentralBrandingProfile() {
        return new Promise((resolve, reject) => {
            const centralBrandingProfileFromStorage = LocalStorageHelper.getItem(StorageKeys.BRANDING_PROFILES, true);
            if (!centralBrandingProfileFromStorage) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.acdApiBaseUri +
                    AdminApis.getCentralBrandingProfileUri.replace('{businessUnitId}', this.userInfo.icBUId);
                HttpClient.get(url, reqInit).then((resp) => {
                    this.logger.info('getCentralBrandingProfile', 'Get Central Branding Profile Success');
                    const data = this.apiParser.parseCentralBrandingProfile(resp);
                    LocalStorageHelper.setItem(StorageKeys.BRANDING_PROFILES, JSON.stringify(data));
                    resolve(data);
                }, (err) => {
                    var _a;
                    this.logger.error('getCentralBrandingProfile', 'Get Central Branding Profiles Failed' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                this.logger.info('getCentralBrandingProfile', 'Get central branding profiles from storage');
                resolve(centralBrandingProfileFromStorage);
            }
        });
    }
    /**
     * Method to return cxone branding profiles
     * @returns - returns the cxone branding profiles
     * ```
     * @example
     * getBrandingProfile()
     * ```
     */
    getBrandingProfile() {
        return new Promise((resolve, reject) => {
            const BrandingProfileFromStorage = LocalStorageHelper.getItem(StorageKeys.BRANDING_PROFILES, true);
            let timeLeftToExpire = 0;
            if (BrandingProfileFromStorage) {
                const logoUrl = new URL(BrandingProfileFromStorage.cxoneLoginHeaderLogoUrl);
                const expiresIn = logoUrl.searchParams.get('X-Amz-Expires'); // 'expiresIn' will usually be 3300 or 3299
                if (expiresIn) {
                    const storedDate = new Date(BrandingProfileFromStorage.fetchTime);
                    const expirationTime = storedDate.getTime() + (parseInt(expiresIn) * 1000);
                    const currentTime = new Date().getTime();
                    timeLeftToExpire = expirationTime - currentTime;
                    if (timeLeftToExpire > 600000) { // 600000 = 10 minutes Validity of the URL should be more than 10 minutes to get it from local storage.
                        this.logger.info('getBrandingProfile', 'Get branding profiles from storage');
                        resolve(BrandingProfileFromStorage);
                    }
                }
            }
            if (!BrandingProfileFromStorage || (timeLeftToExpire < 600000)) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.userHubBaseUrl + AdminApis.getUHBrandingProfileUri;
                HttpClient.get(url, reqInit).then((resp) => {
                    this.logger.info('getBrandingProfile', 'Get Branding Profile Success');
                    const data = this.apiParser.parseBrandingProfile(resp);
                    LocalStorageHelper.setItem(StorageKeys.BRANDING_PROFILES, JSON.stringify(data));
                    resolve(data);
                }, (err) => {
                    var _a;
                    this.logger.error('getBrandingProfile', 'Get Branding Profiles Failed' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
        });
    }
    /**
     * Method to call the script to get the skill Id
     * @example
     * ```
     * getScriptData('scriptName');
     * ```
     */
    getScriptByName(scriptName) {
        const baseUrl = this.cxOneConfig.acdApiBaseUri;
        const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
        const url = baseUrl + AdminApis.getScriptData + '?scriptName=' + scriptName;
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const scriptId = response.data.scripts[0].scriptId;
                this.logger.debug('getScriptData', 'getScriptData success:-' + response.toString());
                resolve(scriptId);
            }, (error) => {
                this.logger.error('getScriptData', 'getScriptData failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to call spawn script
     * @example
     * ```
     * spawnScript();
     * ```
     */
    spawnScript(scriptId, skillId, parameters, startDate) {
        const baseUrl = this.cxOneConfig.acdApiBaseUri;
        const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
        reqInit.body = {
            parameters: parameters,
            scriptId: scriptId,
            skillId: skillId,
            startDate: startDate,
        };
        const url = baseUrl +
            AdminApis.spawnScriptUri.replace('{scriptId}', scriptId.toString());
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('spawnScript', 'spawnScript success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('spawnScript', 'spawnScript failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to start the signal script
     * @param contactId -  contact id
     * @example
     * ```
     * signalScript('123', {});
     * ```
     */
    signalScript(contactId, parameters) {
        const baseUrl = this.cxOneConfig.acdApiBaseUri;
        const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
        const url = baseUrl + AdminApis.signalScriptUri.replace('{contactId}', contactId);
        const requestParams = parameters;
        reqInit.body = requestParams;
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('startSignalScript', 'startSignalScript success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('startSignalScript', 'startSignalScript failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to return all indicators
     * @returns - returns all indicators
     * ```
     * @example
     * getAllIndicators()
     * ```
     */
    getAllIndicators() {
        return new Promise((resolve, reject) => {
            if (this.accessToken) {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.acdApiBaseUri + AdminApis.getAllIndicatorsUri.replace('{agentId}', this.userInfo.icAgentId);
                HttpClient.get(url, reqInit).then((resp) => {
                    this.agentIndicatorsInfo = [];
                    this.logger.info('getAllIndicators', 'Get All Indicators Success');
                    if (resp && resp.body && resp.body.indicators) {
                        resp.body.indicators.forEach((indicator) => {
                            const agentIndicators = new CXoneIndicator();
                            agentIndicators.parse(indicator);
                            this.agentIndicatorsInfo.push(agentIndicators);
                        });
                        resolve(this.agentIndicatorsInfo);
                    }
                }, (err) => {
                    this.logger.error('getAllIndicators', 'Get All Indicators Failed' + err.toString());
                    reject(err);
                });
            }
        });
    }
    /**
     * Method to return User Hub user details
     * @returns - User Details
     * ```
     * @example
     * getUHUserDetails()
     * ```
     */
    getUHUserDetails() {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const url = this.cxOneConfig.apiFacadeBaseUri + ApiUriConstants.UH_GET_USERS + this.userInfo.userId;
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getUHUserDetails', 'Get UH User Details Success');
                resolve(response);
            }, (error) => {
                var _a;
                this.logger.error('getUHUserDetails', 'Get UH User details failed ' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Fetches the details of loged in user
     * @returns Details of the User
     * @param useCache - True to use cached data if available
     * ```
     * @example
     * getUserDetails(true)
     * ```
     */
    getUserDetails(useCache = false) {
        return new Promise((resolve, reject) => {
            const cachedData = LocalStorageHelper.getItem(StorageKeys.USER_DETAILS, true);
            if (cachedData) {
                resolve(cachedData);
            }
            else {
                const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
                const url = this.cxOneConfig.apiFacadeBaseUri + ApiUriConstants.UH_GET_USERS + this.userInfo.userId;
                HttpClient.get(url, reqInit).then((response) => {
                    this.logger.info('getUserDetails', 'Success.');
                    const userDetails = new CXoneUserDetails();
                    userDetails.parse(response.data.user);
                    if (useCache) {
                        LocalStorageHelper.setItem(StorageKeys.USER_DETAILS, JSON.stringify(userDetails));
                    }
                    resolve(userDetails);
                }, (error) => {
                    var _a;
                    this.logger.error('getUserDetails', 'Failed - ' + error.toString());
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
                });
            }
        });
    }
    ;
    /**
     * Method to set the server time offset in local storage
     * @example - setTimeStampOffset()
     */
    setTimeStampOffset() {
        return new Promise((resolve, reject) => {
            const url = this.cxOneConfig.acdApiBaseUri + ApiUriConstants.SERVER_TIME_URI;
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getTimeStamp', 'Get time stamp offset Success');
                const serverTime = new Date(response.data.ServerTime).getTime();
                const currTime = new Date().getTime();
                const serverTimeOffset = serverTime - currTime;
                LocalStorageHelper.setItem(StorageKeys.SERVER_TIME_OFFSET, serverTimeOffset);
                resolve(serverTimeOffset);
            }, (error) => {
                var _a;
                this.logger.error('getTimeStamp', 'Get time stamp offset failed ' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to get time stamp offset
     * @returns - number or CXoneSdkError
     * ```
     * @example
     * getTimeStampOffset()
     * ```
     */
    getTimeStampOffset() {
        return new Promise((resolve, reject) => {
            try {
                const serverOffsetFromStorage = LocalStorageHelper.getItem(StorageKeys.SERVER_TIME_OFFSET);
                if (this.validationUtils.isNullOrEmpty(serverOffsetFromStorage)) {
                    resolve(this.setTimeStampOffset());
                }
                else {
                    resolve(serverOffsetFromStorage);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.UNHANDLED_EXCEPTION, 'Exception while getting time offset' + error.message);
                    this.logger.error('getTimeStampOffset', errorResponse.toString());
                    reject(errorResponse);
                }
            }
        });
    }
    /**
     * Method to return aggregator service node url for uiq connection
     * @returns - User Details
     * ```
     * @example
     * getUiqHubUrl()
     * ```
     */
    getUiqHubUrl() {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const url = this.cxOneConfig.uiQueueWSBaseUri;
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getUiqHubUrl', 'Get hub url Success');
                const uiqHubUrl = new UIQHubUrl();
                uiqHubUrl.parse(response === null || response === void 0 ? void 0 : response.data);
                resolve(uiqHubUrl);
            }, (error) => {
                var _a;
                this.logger.error('getUiqHubUrl', 'Get hub url failed' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to resize the event queue
     * @param sessionId - session id
     * @param throttle - boolean value to throttle the event queue size
     * @returns - Promise that resolves when the event queue is resized
     * @example
     * ```
     * resizeEventQueue('12345',true)
     * ```
     */
    resizeEventQueue(sessionId, throttle) {
        return new Promise((resolve, reject) => {
            const url = this.cxOneConfig.apiFacadeBaseUri + AdminApis.resizeEventQueueUri.replace('{sessionId}', sessionId);
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            reqInit.body = {
                throttlequeue: throttle,
            };
            HttpClient.post(url, reqInit).then(() => {
                this.logger.info('resizeEventQueue', 'Event queue resized successfully');
                resolve();
            }, (error) => {
                this.logger.error('resizeEventQueue', 'Failed to resize event queue: ' + error.toString());
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, error === null || error === void 0 ? void 0 : error.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to return agent locations
     * @returns - User Details
     * @example
     * ```
     * getUserLocations()
     * ```
     */
    getUserLocations() {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const url = this.cxOneConfig.apiFacadeBaseUri + ApiUriConstants.GET_AGENT_LOCATION;
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getAgentLocations', 'Get agent locations Success');
                const userLocation = new UserLocation();
                userLocation.parse(response.data);
                resolve(userLocation);
            }, (error) => {
                var _a;
                this.logger.error('getAgentLocations', 'Get agent locations failed' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to select agent location
     * @param locationId - location id
     * @returns - User Details
     * @example
     * ```
     * selectUserLocation('123')
     * ```
     */
    selectUserLocation(locationId) {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const url = this.cxOneConfig.apiFacadeBaseUri + ApiUriConstants.SELECT_AGENT_LOCATION;
            const data = {
                locationId: locationId,
            };
            reqInit.body = data;
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('selectAgentLocation', 'Select agent location Success');
                resolve(response);
            }, (error) => {
                var _a;
                this.logger.error('selectAgentLocation', 'Select agent location failed' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to return agent profile
     * @returns - Agent Profile
     * @example
     * ```
     * getAgentProfileDetails()
     * ```
     */
    getAgentProfileDetails() {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const url = this.cxOneConfig.apiFacadeBaseUri + ApiUriConstants.AGENT_PROFILE;
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getAgentProfileDetails', 'Get Agent Profile Details Successfully');
                const agentProfileMappedSettings = this.apiParser.parseAgentConfiguration(response);
                LocalStorageHelper.setItem(StorageKeys.AGENT_PROFILE_CONFIGURATION, JSON.stringify(agentProfileMappedSettings));
                resolve(agentProfileMappedSettings);
            }, (error) => {
                var _a;
                this.logger.error('getAgentProfileDetails', 'Get agent profile details failed' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to get Categories and priorities for the agent feedback form
     * @returns - object
     * @example
     * ```
     * getFeedbackCategoriesAndPriorities()
     * ```
     */
    getFeedbackCategoriesAndPriorities() {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const url = this.cxOneConfig.acdApiBaseUri + ApiUriConstants.FEEDBACK_CATEGORIES_AND_PRIORITIES;
            HttpClient.get(url, reqInit).then((response) => {
                resolve(response.data);
            }, (error) => {
                var _a;
                this.logger.error('getFeedbackCategoriesAndPriorities', 'Get feedback categories and priorities failed' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Method to submit agent feedback
     * @returns -
     * @example
     * ```
     * submitFeedback()
     * ```
     */
    submitFeedback(feedbackData) {
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(this.accessToken, 'application/json');
            const sessionId = this.acdSessionManager.getSessionId();
            const url = this.cxOneConfig.acdApiBaseUri + ApiUriConstants.SUBMIT_FEEDBACK.replace('{sessionId}', sessionId);
            reqInit.body = feedbackData;
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('submitFeedback', 'Submit agent feedback Success');
                resolve(response);
            }, (error) => {
                var _a;
                this.logger.error('submitFeedback', 'Submit agent feedback failed' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
}
//# sourceMappingURL=admin-services.js.map