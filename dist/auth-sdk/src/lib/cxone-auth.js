import { __awaiter } from "tslib";
import { CXoneSdkError, CXoneSdkErrorType, MessageType, MessageBus, AuthToken, CXoneLeaderElector, CXoneConfiguration, EncryptedAuthToken, } from '@nice-devone/common-sdk';
import { WhoamiResponse } from './model/whoami-response';
import { HttpClient, HttpUtilService, LocalStorageHelper, Logger, StorageKeys, ValidationUtils, AdminService, LoadWorker, SessionStorageHelper, ACDSessionManager, ApiUriConstants, FeatureToggleService, OriginatingServiceIdentifier, SecurityHelper, } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
import { AuthStatus } from './enum/auth-status';
import { OpenIDConfiguration } from './model/open-id-configuration';
import { CXoneUser } from './user/cxone-user';
import { KEYUTIL, KJUR } from 'jsrsasign';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import jwkToBuffer from 'jwk-to-pem';
const TOKEN_EXPIREIN_BUFFER_IN_SECONDS = 600; // value is in seconds
/**
 * Class to perform common authentication of user
 */
export class CXoneAuth {
    /**
     * constructor for CXoneAuth
     */
    constructor() {
        this.logger = new Logger('AUTH-SDK', 'CXoneAuth');
        this.cxOneConfig = {};
        this.utilService = new HttpUtilService();
        this.securityHelper = new SecurityHelper();
        this.authToken = {};
        this.cxoneUser = {};
        this.validationUtils = new ValidationUtils();
        this.oidcConfig = {};
        this.isActiveImpersonatedUser = false;
        this.onAuthStatusChange = new Subject();
        this.authTokenEmpty = new Subject();
        this.authSettings = {};
        /**
         * Subscription for response message over broadcast channel
         */
        this.subscribeResponseMessage = () => {
            MessageBus.instance.onResponseMessage.subscribe((msg) => {
                if (msg.type === MessageType.AUTHENTICATION_RESPONSE) {
                    this.restoreData(msg === null || msg === void 0 ? void 0 : msg.data);
                }
            });
        };
        /**
         * Subscription for empty auth token
         */
        this.subscribeEmptyAuthToken = () => {
            let tokenRequest;
            this.authTokenEmpty.subscribe((isEmpty) => {
                if (isEmpty && !tokenRequest) {
                    tokenRequest = this.validateFtAndGetDecryptedToken();
                    tokenRequest.then((resolvedToken) => {
                        if (resolvedToken) {
                            this.setAuthToken(resolvedToken);
                        }
                    });
                }
            });
        };
        /**
         * Event handler to receive message event from auth callback popup
         * @example
         * ```
         * postAuthCodeMessage(eventData)
         * ```
         */
        this.postAuthCodeMessage = (event) => {
            var _a;
            if (event.data['messageType'] === 'Loaded') {
                const msg = {
                    issuer: 'CXA',
                    messageType: 'Token',
                    token: this.getAuthToken().accessToken,
                };
                const iFrame = document.getElementById('launchCXAFrame');
                if (iFrame)
                    (_a = iFrame === null || iFrame === void 0 ? void 0 : iFrame.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(msg, '*');
            }
        };
        this.cxoneUser = CXoneUser.instance;
        this.adminService = AdminService.instance;
        this.subscribeResponseMessage();
        this.subscribeEmptyAuthToken();
    }
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const authObject = CXoneAuth.instance;
     * ```
     */
    static get instance() {
        if (!CXoneAuth.cxoneAuth) {
            CXoneAuth.cxoneAuth = new CXoneAuth();
        }
        return CXoneAuth.cxoneAuth;
    }
    /**
     * @param authSettings - initialize the auth settings
     * @example
     * ```
     * init({'cxoneHostname': 'https://cxone.dev.niceincontact.com', 'clientId': 'Salesforce Agent Console@inContact Inc.'})
     * ```
     */
    init(authSettings) {
        this.authSettings = authSettings;
        LocalStorageHelper.setItem(StorageKeys.ORIGINATING_SERVICE_IDENTIFIER, authSettings.originatingServiceIdentifier);
        HttpUtilService.originatingServiceIdentifier = authSettings.originatingServiceIdentifier || OriginatingServiceIdentifier.CXONE_AGENT;
    }
    /**
     * Method generate the Authorize url using authorize endpoint with clientId, code challenge, authMode and codeChallengeMethod.
     * This url will be use to open the login screen in page or popup window based on the display value.
     * @param displayMode - get the authmode, whether page or popup
     * @param codeChallengeMethod - 'S256'
     * @returns authUrl
     * @example
     * ```
     * getAuthorizeUrl('page', 'S256');
     * ```
     */
    getAuthorizeUrl(displayMode, codeChallengeMethod, tenantId) {
        return new Promise((resolve, reject) => {
            this.getOpenIDConfiguration(this.authSettings.cxoneHostname).then((data) => {
                const authEndPoint = data.authorizationEndpoint;
                if (!data.displayValuesSupported || !data.displayValuesSupported.find((val) => val === displayMode)) {
                    this.logger.error('getAuthorizeUrl', 'Display value not supported');
                    reject('Display value not supported');
                }
                if (!data.codeChallengeMethods ||
                    !data.codeChallengeMethods.find((val) => val === codeChallengeMethod)) {
                    this.logger.error('getAuthorizeUrl', 'Code challenge method not supported');
                    reject('Code challenge method not supported');
                }
                const verifier = this.securityHelper.generateCodeVerifier();
                SessionStorageHelper.setItem(StorageKeys.CODE_VERIFIER, verifier);
                this.securityHelper
                    .generateCodeChallengeFromVerifier(verifier)
                    .then((response) => {
                    const codeChallenge = response;
                    const tenantID = tenantId ? `&tenantId=${tenantId}` : '';
                    const authUrl = `${authEndPoint}?client_id=${this.authSettings.clientId}&redirect_uri=${this.authSettings.redirectUri}` +
                        `&response_type=code&scope=openid&state=${this.authSettings.state || 'aaxx-11'}&display=${displayMode}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}${tenantID}`;
                    resolve(authUrl);
                });
            }, (error) => {
                this.logger.error('getAuthorizeUrl', error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to generate the access token and call the getCXoneConfiguration method in the response
     * to get the api endpoint url from the cxone configuration.
     * @param authWithCodeReq - request object containing client id & generated code after authenticate
     * @returns - returns the auth token
     * @example
     * ```
     * getAccessTokenByCode({'Salesforce Agent Cons..', 'eyJ0eXAiOiJKV1Qi...'})
     * ```
     */
    getAccessTokenByCode(authWithCodeReq) {
        this.onAuthStatusChange.next({ status: AuthStatus.AUTHENTICATING });
        return new Promise((resolve, reject) => {
            try {
                const discoveryResponse = this.validationUtils.isValidObject(this.oidcConfig)
                    ? this.oidcConfig
                    : LocalStorageHelper.getItem(StorageKeys.OIDC_CONFIG, true);
                let tokenEndpoint = '';
                if (discoveryResponse) {
                    tokenEndpoint = discoveryResponse.tokenEndpoint;
                }
                else {
                    this.logger.error('getAccessTokenByCode', 'Token endpoint is null');
                    this.onAuthStatusChange.next({
                        status: AuthStatus.AUTHENTICATION_FAILED,
                        response: new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Token endpoint is null'),
                    });
                    reject('Token endpoint is null');
                }
                const redirectUrl = this.authSettings.redirectUri;
                const verifier = SessionStorageHelper.getItem(StorageKeys.CODE_VERIFIER);
                const reqInit = {
                    headers: this.utilService.initHeader('', 'application/json').headers,
                    body: `grant_type=authorization_code&code=${authWithCodeReq.code}&redirect_uri=${redirectUrl}&client_id=${authWithCodeReq.clientId}&code_verifier=${verifier}`,
                };
                HttpClient.post(tokenEndpoint, reqInit).then((resp) => __awaiter(this, void 0, void 0, function* () {
                    const isValidToken = yield this.verifyJwt(resp);
                    if (isValidToken) {
                        const authToken = yield this.parseAndSaveAuthToken(resp);
                        this.getCXoneConfiguration(this.authSettings.cxoneHostname, this.cxoneUser.userInfo.tenantId, this.cxoneUser.userInfo.tenant ? true : false).then(() => __awaiter(this, void 0, void 0, function* () {
                            yield this.validateFTAndSetAuthToken(authToken, reject);
                            this.getWhoAmIData(authToken).then((resp) => {
                                const cxoneConfigObj = this.getCXoneConfig();
                                cxoneConfigObj.acdApiBaseUri = resp.resourceServerBaseUri;
                                this.setCXoneConfig(cxoneConfigObj);
                                this.cxoneUser.setTeamIdUserInfo(resp.teamId);
                                LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfigObj);
                                this.logger.info('getWhoAmIData', 'Successfully fetched and set data');
                                this.cxoneUser.initAuth(authToken.accessToken, cxoneConfigObj);
                                this.getUserManagementDetails();
                                this.onAuthStatusChange.next({
                                    status: AuthStatus.AUTHENTICATED,
                                    response: authToken,
                                });
                                const msg = {
                                    type: MessageType.AUTHENTICATION_RESPONSE,
                                    data: authToken,
                                };
                                MessageBus.instance.postResponse(msg);
                                resolve(authToken);
                            }, (error) => {
                                this.logger.error('getAccessTokenByCode', 'Error from whoami api' + error.toString());
                                this.onAuthStatusChange.next({
                                    status: AuthStatus.AUTHENTICATION_FAILED,
                                    response: error,
                                });
                                reject(error);
                            });
                        }), (error) => {
                            this.logger.error('getAccessTokenByCode', 'Error from cxoneconfiguration api ' + error.toString());
                            this.onAuthStatusChange.next({
                                status: AuthStatus.AUTHENTICATION_FAILED,
                                response: error,
                            });
                            reject(error);
                        });
                        this.logger.info('getAccessTokenByCode', 'Token generated successfully');
                    }
                    else {
                        this.logger.info('getAccessTokenByCode', 'Token verification failed');
                        this.onAuthStatusChange.next({
                            status: AuthStatus.AUTHENTICATION_FAILED,
                        });
                    }
                }), (error) => {
                    this.logger.error('getAccessTokenByCode', 'Error from access token api' + error.toString());
                    this.onAuthStatusChange.next({
                        status: AuthStatus.AUTHENTICATION_FAILED,
                        response: error,
                    });
                    reject(error);
                });
            }
            catch (error) {
                this.onAuthStatusChange.next({
                    status: AuthStatus.AUTHENTICATION_FAILED,
                    response: new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, JSON.stringify(error)),
                });
                this.logger.error('getAccessTokenByCode', 'error in try catch');
            }
            finally {
                SessionStorageHelper.removeItem(StorageKeys.CODE_VERIFIER);
            }
        });
    }
    /**
     * method to generate new token using existing token
     * @param authWithTokenReq - request object containing host url and existing access token
     * @returns - returns the auth token
     * @example
     * ```
     * getAccessTokenByToken({'http:testhost.com', 'eyJ0eXAiOiJKV1Qi...'});
     * ```
     */
    getAccessTokenByToken(authWithTokenReq) {
        this.onAuthStatusChange.next({ status: AuthStatus.AUTHENTICATING });
        return new Promise((resolve, reject) => {
            this.getOpenIDConfiguration(this.authSettings.cxoneHostname).then((response) => {
                const reqInit = {
                    headers: this.utilService.initHeader('', 'application/json')
                        .headers,
                    body: 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange&scope=openid&' +
                        'client_id=' + this.authSettings.clientId +
                        '&subject_token=' + authWithTokenReq.accessToken +
                        '&subject_token_type=urn:ietf:params:oauth:token-type:access_token',
                };
                HttpClient.post(response.tokenEndpoint, reqInit).then((resp) => __awaiter(this, void 0, void 0, function* () {
                    if (resp.status === 200) {
                        const isValidToken = yield this.verifyJwt(resp);
                        if (isValidToken) {
                            const cxOneAuthToken = yield this.parseAndSaveAuthToken(resp);
                            this.getCXoneConfiguration(this.authSettings.cxoneHostname, this.cxoneUser.userInfo.tenantId, this.cxoneUser.userInfo.tenant ? true : false).then(() => __awaiter(this, void 0, void 0, function* () {
                                yield this.validateFTAndSetAuthToken(cxOneAuthToken, reject);
                                this.getWhoAmIData(cxOneAuthToken).then((resp) => {
                                    const cxoneConfigObj = this.getCXoneConfig();
                                    cxoneConfigObj.acdApiBaseUri = resp.resourceServerBaseUri;
                                    this.setCXoneConfig(cxoneConfigObj);
                                    this.cxoneUser.setTeamIdUserInfo(resp.teamId);
                                    LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfigObj);
                                    this.logger.info('getWhoAmIData', 'Successfully fetched and set data');
                                    this.cxoneUser.initAuth(cxOneAuthToken.accessToken, cxoneConfigObj);
                                    this.getUserManagementDetails();
                                    this.onAuthStatusChange.next({
                                        status: AuthStatus.AUTHENTICATED,
                                        response: cxOneAuthToken,
                                    });
                                    const msg = {
                                        type: MessageType.AUTHENTICATION_RESPONSE,
                                        data: cxOneAuthToken,
                                    };
                                    MessageBus.instance.postResponse(msg);
                                    resolve(cxOneAuthToken);
                                }, (error) => {
                                    this.logger.error('getAccessTokenByToken', 'Error from whoami api' + error.toString());
                                    this.onAuthStatusChange.next({
                                        status: AuthStatus.AUTHENTICATION_FAILED,
                                        response: error,
                                    });
                                    reject(error);
                                });
                            }), (error) => {
                                this.logger.error('getAccessTokenByToken', 'Error from cxone configuration api ' + error.toString());
                                this.onAuthStatusChange.next({
                                    status: AuthStatus.AUTHENTICATION_FAILED,
                                    response: error,
                                });
                                reject(error);
                            });
                            this.logger.info('getAccessTokenByToken', 'Token generated successfully');
                        }
                    }
                    else {
                        this.logger.info('getAccessTokenByToken', 'Token verification failed');
                        this.onAuthStatusChange.next({
                            status: AuthStatus.AUTHENTICATION_FAILED,
                        });
                    }
                }), (err) => {
                    this.logger.error('getAccessTokenByToken', 'Error while generating new token from existing token' +
                        err.toString());
                    this.onAuthStatusChange.next({
                        status: AuthStatus.AUTHENTICATION_FAILED,
                        response: err,
                    });
                    reject(err);
                });
            });
        });
    }
    /**
     * method to generate new token using existing token using regional token exchange service
     * @param authWithTokenReq - request object containing host url and existing access token
     * @param impersonatingUser - impersonating user details
     * @returns - returns the auth token
     * @example
     * ```
     * getRegionalAccessTokenByToken({'http:testhost.com', 'eyJ0eXAiOiJKV1Qi...'}, {name:'test'});
     * ```
     */
    getRegionalAccessTokenByToken(authWithTokenReq, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    impersonatingUser) {
        var _a, _b;
        const reqInit = {
            headers: this.utilService.initHeader('', 'application/json').headers,
            body: {
                accessToken: authWithTokenReq.accessToken,
            },
        };
        const tokenHeader = {
            name: 'Authorization',
            value: 'Basic ' + window.btoa(`${(_a = this.authSettings) === null || _a === void 0 ? void 0 : _a.clientId}@cxone`),
        };
        (_b = reqInit === null || reqInit === void 0 ? void 0 : reqInit.headers) === null || _b === void 0 ? void 0 : _b.push(tokenHeader);
        this.onAuthStatusChange.next({ status: AuthStatus.AUTHENTICATING });
        return new Promise((resolve, reject) => {
            this.getCXoneConfiguration(this.authSettings.cxoneHostname, impersonatingUser.tenantId, true).then((resp) => {
                const endpoint = resp.userHubBaseUrl + ApiUriConstants.REGIONAL_AUTH_TOKEN;
                HttpClient.post(endpoint, reqInit).then((resp) => __awaiter(this, void 0, void 0, function* () {
                    if (resp.status === 200) {
                        const cxOneAuthToken = this.parseAndSaveAuthToken(resp, true, impersonatingUser);
                        yield this.validateFTAndSetAuthToken(cxOneAuthToken, reject);
                        this.getWhoAmIData(cxOneAuthToken).then((resp) => {
                            const cxoneConfigObj = this.getCXoneConfig();
                            cxoneConfigObj.acdApiBaseUri =
                                resp.resourceServerBaseUri;
                            this.setCXoneConfig(cxoneConfigObj);
                            this.cxoneUser.setTeamIdUserInfo(resp.teamId);
                            LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, cxoneConfigObj);
                            this.logger.info('getWhoAmIData', 'Successfully fetched and set data');
                            this.cxoneUser.initAuth(cxOneAuthToken.accessToken, cxoneConfigObj);
                            this.getUserManagementDetails();
                            this.onAuthStatusChange.next({
                                status: AuthStatus.AUTHENTICATED,
                                response: cxOneAuthToken,
                            });
                            const msg = {
                                type: MessageType.AUTHENTICATION_RESPONSE,
                                data: cxOneAuthToken,
                            };
                            MessageBus.instance.postResponse(msg);
                            resolve(cxOneAuthToken);
                        }, (error) => {
                            this.logger.error('getAccessTokenByToken', 'Error from whoami api' + error.toString());
                            this.onAuthStatusChange.next({
                                status: AuthStatus.AUTHENTICATION_FAILED,
                                response: error,
                            });
                            reject(error);
                        });
                        this.logger.info('getAccessTokenByToken', 'Token generated successfully');
                    }
                }), (error) => {
                    this.logger.error('getRegionalAccessTokenByToken', 'Error while generating new token from existing token' + error.toString());
                    this.onAuthStatusChange.next({
                        status: AuthStatus.AUTHENTICATION_FAILED,
                        response: error,
                    });
                    reject(error);
                });
            }, (err) => {
                this.logger.error('getRegionalAccessTokenByToken', 'Error from cxone configuration api' +
                    err.toString());
                this.onAuthStatusChange.next({
                    status: AuthStatus.AUTHENTICATION_FAILED,
                    response: err,
                });
                reject(err);
            });
        });
    }
    /**
     * Method to get discovery endpoints for authentication purposes
     * @returns - Http Response form well known openid config api
     * @example
     * ```
     * getOpenIDConfiguration('https://cxone.dev.niceincontact.com')
     * ```
     */
    getOpenIDConfiguration(hostname) {
        return new Promise((resolve, reject) => {
            if (this.validationUtils.isValidObject(this.oidcConfig)) {
                LocalStorageHelper.setItem(StorageKeys.OIDC_CONFIG, this.oidcConfig);
                resolve(this.oidcConfig);
            }
            else {
                const openIDConfigFromStorage = LocalStorageHelper.getItem(StorageKeys.OIDC_CONFIG);
                if (!openIDConfigFromStorage || !(this.validationUtils.isValidObject(JSON.parse(openIDConfigFromStorage)))) {
                    const endpoint = hostname + '/.well-known/openid-configuration';
                    const reqInit = this.utilService.initHeader('', 'application/json');
                    HttpClient.get(endpoint, reqInit).then((resp) => {
                        const discoverAuthResponse = new OpenIDConfiguration();
                        discoverAuthResponse.parseData(resp.data);
                        LocalStorageHelper.setItem(StorageKeys.OIDC_CONFIG, discoverAuthResponse);
                        this.oidcConfig = discoverAuthResponse;
                        this.logger.info('getOpenIDConfiguration', 'Open ID configuration successfully generated');
                        resolve(discoverAuthResponse);
                    }, (err) => {
                        this.logger.error('getOpenIDConfiguration', 'Error while getting OpenID configuration' + err.toString());
                        reject(err);
                    });
                }
                else {
                    resolve(JSON.parse(openIDConfigFromStorage));
                }
            }
        });
    }
    /**
     * This method is to get CXone Configurations for authentication purpose
     * @returns - Http Response from well known cxone config api
     * @param hostName - hostName
     * @param tenantId - tenantId
     * ```
     * @example
     * getCXoneConfiguration('https://cxone.dev.niceincontact.com','11e85da0-f32c-7e10-898c-0242ac110003');
     * ```
     */
    getCXoneConfiguration(hostname, tenantId, isUserHub) {
        this.logger.debug('getCXoneConfiguration', ' isUserHub -> ' + isUserHub);
        return new Promise((resolve, reject) => {
            const endpoint = hostname + '/.well-known/cxone-configuration?tenantId=' + tenantId;
            const reqInit = this.utilService.initHeader('', 'application/json');
            HttpClient.get(endpoint, reqInit).then((resp) => {
                const resourceUrlResponse = new CXoneConfiguration();
                const { tenantId, userId } = this.cxoneUser.userInfo;
                const wsQueryParams = { tenantId, userId };
                resourceUrlResponse.parseData(resp.data);
                resourceUrlResponse.setAuthEndPoints(isUserHub, wsQueryParams);
                this.setCXoneConfig(resourceUrlResponse);
                LocalStorageHelper.setItem(StorageKeys.CXONE_CONFIG, resourceUrlResponse);
                this.logger.info('getCXoneConfiguration', 'CXone configuration successfully generated');
                resolve(resourceUrlResponse);
            }, (err) => {
                this.logger.error('getCXoneConfiguration', 'Error while getting CXone configuration' + err.toString());
                reject(err);
            });
        });
    }
    /**
     * Method to get the whoami api response
     * @returns - Http Response from whoAmI api
     * @param authToken - 'authToken'
     * @example
     * ```
     * getWhoAmIData(authToken)
     * ```
     */
    getWhoAmIData(authToken) {
        return new Promise((resolve, reject) => {
            const acdAuthTokenEndPoint = this.getAcdAuthorizationTokenEndpoint(this.cxOneConfig.cluster, this.cxOneConfig.acdDomain);
            if (acdAuthTokenEndPoint) {
                let acdAuthTokenUrl = '';
                acdAuthTokenUrl = acdAuthTokenEndPoint + '/whoami';
                const reqInit = {
                    headers: this.utilService.initHeader('', 'application/json').headers,
                    body: {
                        token: authToken.accessToken,
                    },
                };
                HttpClient.post(acdAuthTokenUrl, reqInit).then((resp) => {
                    const whoAmIResponse = new WhoamiResponse();
                    whoAmIResponse.parseData(resp.data);
                    resolve(whoAmIResponse);
                }, (error) => {
                    this.logger.error('getAccessToken', 'Error while calling whoAmI api' + error.toString());
                    reject(error);
                });
            }
            else {
                this.logger.error('getAuthTokenEndPoint', 'Token endpoint is null');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Token endpoint is null'));
            }
        });
    }
    /**
     * This method returns the Authorization Token Endpoint
     * @returns - api end point
     * @param icClusterId - icClusterId
     * @param domain - domain
     * @example
     * ```
     * getAcdAuthorizationTokenEndpoint('SC11','ucnlabext.com');
     * ```
     */
    getAcdAuthorizationTokenEndpoint(icClusterId, domain) {
        return ('https://api-' +
            icClusterId +
            '.' +
            domain +
            '/incontactauthorizationserver/token');
    }
    /**
     * restores data and re-initiates auth flow
     * @returns - re-initialization status for auth flow as authenticated/not authenticated through onAuthStatusChange subject
     * @example
     * ```
     * this.restoreData();
     * ```
     */
    restoreData(authTokenFromLeader) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLoginDetails = this.getAuthState();
            if (userLoginDetails.isTokenValid) {
                userLoginDetails.authToken = authTokenFromLeader || (yield this.validateFtAndGetDecryptedToken()) || undefined;
                if (userLoginDetails.authToken) {
                    const userDetails = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
                    this.setAuthAndUserData(userLoginDetails.authToken, true, userDetails);
                    const cxOneConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_CONFIG, true);
                    if (cxOneConfig)
                        this.setCXoneConfig(cxOneConfig);
                    this.cxoneUser.initAuth(userLoginDetails.authToken.accessToken, cxOneConfig);
                    ACDSessionManager.instance.setAccessToken(userLoginDetails.authToken.accessToken);
                    this.onAuthStatusChange.next({
                        status: AuthStatus.AUTHENTICATED,
                        response: userLoginDetails.authToken,
                    });
                }
            }
            else {
                this.onAuthStatusChange.next({
                    status: AuthStatus.NOT_AUTHENTICATED,
                });
            }
        });
    }
    /**
     * Method used to parse the auth token, user info and store the values to local storage
     * @param authToken - authToken response
     * @param setUserInfo - flag to decide whether to set user info or not
     * @param impersonatingUser - impersonating user details
     * @returns - parsed authToken data
     * @example -
     * ```
     * parseAndSaveAuthToken(authToken, true, impersonatingUser);
     * ```
     */
    parseAndSaveAuthToken(authToken, setUserInfo = true, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    impersonatingUser) {
        const cxOneAuthToken = new AuthToken();
        cxOneAuthToken.parseData(authToken.data);
        this.setAuthAndUserData(cxOneAuthToken, setUserInfo, impersonatingUser);
        return cxOneAuthToken;
    }
    /**
     * Method used to process parsed auth token and set user info object
     * @param authToken - parsed authToken
     * @param setUserInfo - flag to decide whether to set user info or not
     * @param userDetails - user details
     * @returns - parsed authToken data
     * @example -
     * ```
     * setAuthAndUserData(authToken, true, userDetails);
     * ```
     */
    setAuthAndUserData(authToken, setUserInfo = true, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userDetails) {
        if (authToken) {
            this.setAuthToken(authToken);
            // if refresh token flow then we will skip updating user details part
            if (setUserInfo) {
                this.cxoneUser.setUserDetails(authToken, userDetails);
            }
        }
        else {
            this.onAuthStatusChange.next({
                status: AuthStatus.NOT_AUTHENTICATED,
            });
        }
    }
    /**
     * @param authToken - authToken object
     * @example
     * ```
     * this.setAuthToken(authToken);
     * ```
     */
    setAuthToken(authToken) {
        this.authToken = authToken;
    }
    /**
     * @returns - returns auth token object
     * @example
     * ```
     * const authToken = this.getAuthToken();
     * ```
     */
    getAuthToken() {
        //TODO we need to validate token expiration before returning it
        if (this.validationUtils.isValidObject(this.authToken))
            return this.authToken;
        else {
            const isTokenEncryptionFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-token-update-AW-34038" /* FeatureToggles.TOKEN_ENCRYPTION_FEATURE_TOGGLE */);
            if (!isTokenEncryptionFTEnabled) {
                const authTokenFromStorage = LocalStorageHelper.getItem(StorageKeys.AUTH_TOKEN, true);
                return (this.authToken = this.validationUtils.isValidObject(authTokenFromStorage)
                    ? authTokenFromStorage
                    : {});
            }
            else {
                throw new CXoneSdkError(CXoneSdkErrorType.NO_DATA_FOUND, 'Token not found');
            }
        }
    }
    /**
     * @param cxoneConfig - cxone configuration object
     * @example
     * ```
     * setConfig(cxoneConfig: CXoneConfiguration);
     * ```
     */
    setCXoneConfig(cxoneConfig) {
        this.cxOneConfig = cxoneConfig;
    }
    /**
     * @returns - cxone configuration object
     * @example
     * ```
     * const cxoneConfig = this.getCXoneConfig();
     * ```
     */
    getCXoneConfig() {
        if (this.validationUtils.isValidObject(this.cxOneConfig))
            return this.cxOneConfig;
        else {
            const cxOneConfigFromStorage = LocalStorageHelper.getItem(StorageKeys.CXONE_CONFIG, true);
            return (this.cxOneConfig = this.validationUtils.isValidObject(cxOneConfigFromStorage)
                ? cxOneConfigFromStorage
                : {});
        }
    }
    /**
     * Checks if user is logged in and have valid token
     * @returns - user login details with auth token
     * @example
     * ```
     * const userLoginDetails = this.getAuthState();
     * ```
     */
    getAuthState() {
        const authState = {};
        const authToken = LocalStorageHelper.getItem(StorageKeys.AUTH_TOKEN, true) || LocalStorageHelper.getItem(StorageKeys.ENCRYPTED_AUTH_TOKEN, true);
        if (authToken) {
            const now = new Date().getTime();
            const expiry = authToken.accessTokenTime + authToken.expiresIn * 1000;
            if (now > expiry) {
                authState.isTokenValid = false;
            }
            else {
                authState.isTokenValid = true;
                authState.authToken = authToken;
                if (!this.validationUtils.isValidObject(this.oidcConfig)) {
                    this.getOpenIDConfiguration(this.authSettings.cxoneHostname).then((oidcConfig) => {
                        this.oidcConfig = oidcConfig;
                    }, (error) => {
                        this.logger.error('getAuthState', error.toString());
                    });
                }
            }
        }
        else {
            authState.isTokenValid = false;
        }
        return authState;
    }
    /**
     * Method to check token is expired or not
     * @returns - boolean value token is expired or not
     * @example
     * ```
     * const isExpired = this.isTokenExpired();
     * ```
     */
    isTokenExpired() {
        const authToken = this.getAuthToken();
        if (authToken) {
            // If the token is going to expire in another 2 mins then also we need to refresh token
            return ((new Date().getTime() - authToken.accessTokenTime) / 1000 >=
                authToken.expiresIn - 2 * 60);
        }
        return true;
    }
    /**
     * Used to start the check for refresh token
     * Here, first we will initiate the worker which have a timeout, this timeout will get triggered based on the expiry time of the token we have passed
     * Once the expiry time is reached the worker will execute the callback to get the refresh token that we have passed
     * @param authToken - token object which will have refresh token and the expire in detail required to obtain the new token
     * @param isLeader - defines if instance is leader or not
     * @example
     * ```
     * startRefreshTokenCheck(authToken, true);
     * ```
     */
    startRefreshTokenCheck(authToken, isLeader, isTokenValid) {
        try {
            if (authToken && isTokenValid && isLeader) {
                // timout interval for expire token is calculated based on the expireIn - EXPIRE_IN_BUFFER( 5 min) - the time passed since the old token is received till now
                const timeoutInterval = (authToken.expiresIn - TOKEN_EXPIREIN_BUFFER_IN_SECONDS) * 1000 -
                    (new Date().getTime() - authToken.accessTokenTime);
                if (!this.authWorker) {
                    // to initiate the util worker and get the methods available in this case 'startTimeout'
                    this.initUtilWorker();
                    this.authWorker.onmessage = () => {
                        if (this.isImpersonatedUser) {
                            this.getRegionalRefreshToken();
                        }
                        else {
                            this.getRefreshToken();
                        }
                    };
                }
                this.authWorker.postMessage({
                    type: 'refresh-token-flow',
                    timeoutInterval,
                });
                return true;
            }
            return false;
        }
        catch (error) {
            this.logger.error('startRefreshTokenCheck', 'error in try catch' + error);
            return false;
        }
    }
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initUtilWorker();
     * ```
     */
    initUtilWorker() {
        const loader = new LoadWorker();
        this.authWorker = loader.getWorker('util-worker', 'cxone-util-worker');
    }
    /**
     * Used to fetch the new access token when the old token is expired
     * the authentication end point we will get from localstorage object 'discovery_response'
     */
    getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.terminateUtilWorker(); // terminate the util worker after the request has been completed
                const discoveryResponse = this.validationUtils.isValidObject(this.oidcConfig)
                    ? this.oidcConfig
                    : LocalStorageHelper.getItem(StorageKeys.OIDC_CONFIG, true);
                if (discoveryResponse) {
                    const reqInit = {
                        headers: this.utilService.initHeader('', 'application/json').headers,
                        body: `grant_type=refresh_token&scope=openid&refresh_token=${this.getAuthToken().refreshToken}`,
                    };
                    yield HttpClient.post(discoveryResponse['tokenEndpoint'], reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                        // Skip userInfo update in refresh token flow
                        const authToken = yield this.parseAndSaveAuthToken(response, false);
                        this.logger.info('getRefreshToken', 'refresh token api response');
                        yield this.validateFTAndSetAuthToken(authToken);
                        this.startRefreshTokenCheck(this.getAuthToken(), CXoneLeaderElector.instance.isLeader, true);
                        this.onAuthStatusChange.next({
                            status: AuthStatus.REFRESH_TOKEN_SUCCESS,
                            response: authToken,
                        });
                        // Pass updated auth token to non-leader tabs
                        const msg = {
                            type: MessageType.AUTHENTICATION_RESPONSE,
                            data: authToken,
                        };
                        MessageBus.instance.postResponse(msg);
                        // Publish refresh token success
                        const customEvent = new CustomEvent(AuthStatus.REFRESH_TOKEN_SUCCESS);
                        window.dispatchEvent(customEvent);
                    }), (error) => {
                        this.logger.error('getRefreshToken', 'refresh token api error' + error.toString());
                        this.onAuthStatusChange.next({
                            status: AuthStatus.AUTHENTICATION_FAILED,
                            response: error,
                        });
                    });
                }
            }
            catch (error) {
                this.logger.error('getRefreshToken', 'error in try catch');
                this.onAuthStatusChange.next({
                    status: AuthStatus.AUTHENTICATION_FAILED,
                    response: new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, JSON.stringify(error)),
                });
            }
        });
    }
    /**
     * Used to fetch the new access token using regional token endpoint when the old token is expired
     */
    getRegionalRefreshToken() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.terminateUtilWorker(); // terminate the util worker after the request has been completed
                const cxoneConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_CONFIG, true);
                if (cxoneConfig) {
                    const endpoint = cxoneConfig.userHubBaseUrl + ApiUriConstants.REGIONAL_AUTH_REFRESH_TOKEN;
                    const reqInit = {
                        headers: this.utilService.initHeader('', 'application/json').headers,
                        body: {
                            token: this.getAuthToken().refreshToken,
                        },
                    };
                    const tokenHeader = {
                        name: 'Authorization',
                        value: 'Basic ' + window.btoa(`${(_a = this.authSettings) === null || _a === void 0 ? void 0 : _a.clientId}@cxone`),
                    };
                    (_b = reqInit === null || reqInit === void 0 ? void 0 : reqInit.headers) === null || _b === void 0 ? void 0 : _b.push(tokenHeader);
                    yield HttpClient.post(endpoint, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                        // Skip userInfo update in refresh token flow
                        const authToken = this.parseAndSaveAuthToken(response, false);
                        this.logger.info('getRegionalRefreshToken', 'refresh token api response');
                        yield this.validateFTAndSetAuthToken(authToken);
                        this.startRefreshTokenCheck(this.getAuthToken(), CXoneLeaderElector.instance.isLeader, true);
                        this.onAuthStatusChange.next({
                            status: AuthStatus.REFRESH_TOKEN_SUCCESS,
                            response: authToken,
                        });
                        // Pass updated auth token to non-leader tabs
                        const msg = {
                            type: MessageType.AUTHENTICATION_RESPONSE,
                            data: authToken,
                        };
                        MessageBus.instance.postResponse(msg);
                        // Publish refresh token success
                        const customEvent = new CustomEvent(AuthStatus.REFRESH_TOKEN_SUCCESS);
                        window.dispatchEvent(customEvent);
                    }), (error) => {
                        this.logger.error('getRefreshToken', 'refresh token api error' + error.toString());
                        this.onAuthStatusChange.next({
                            status: AuthStatus.AUTHENTICATION_FAILED,
                            response: error,
                        });
                    });
                }
            }
            catch (error) {
                this.logger.error('getRegionalRefreshToken', 'error in try catch');
                this.onAuthStatusChange.next({
                    status: AuthStatus.AUTHENTICATION_FAILED,
                    response: new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, JSON.stringify(error)),
                });
            }
        });
    }
    /**
     * Use to terminate the util worker instance
     * @example
     * ```
     * this.terminateUtilWorker();
     * ```
     */
    terminateUtilWorker() {
        var _a;
        (_a = this.authWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.authWorker = undefined;
    }
    /**
     * Method to terminate util worker
     * @example
     * ```
     * terminateCXoneUtilWorker()
     * ```
     */
    terminateCXoneUtilWorker() {
        if (CXoneLeaderElector.instance.isLeader) {
            this.terminateUtilWorker();
        }
        else {
            // broadcast data
            const msg = {
                type: MessageType.TERMINATE_CXONE_UTIL_WORKER,
            };
            MessageBus.instance.postRequest(msg);
        }
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
        return this.adminService.getBusinessUnit();
    }
    /**
     * Method to return business unit features
     * @returns - returns the business unit features
     * ```
     * @example
     * getBusinessUnit()
     * ```
     */
    getPermissions() {
        return this.adminService.getPermissions();
    }
    /**
     * Method to return branding profiles
     * @returns - returns the branding profiles
     * ```
     * @example
     * getBrandingProfile()
     * ```
     */
    getBrandingProfile() {
        const adminCxOneConfig = this.adminService.getCXoneConfig();
        if (!(adminCxOneConfig === null || adminCxOneConfig === void 0 ? void 0 : adminCxOneConfig.userHubBaseUrl)) {
            const accessToken = this.getAuthToken().accessToken;
            const cxOneConfig = this.getCXoneConfig();
            const userInfo = this.cxoneUser.getUserInfo();
            this.adminService.initialize(accessToken, cxOneConfig, userInfo);
        }
        return this.adminService.getBrandingProfile();
    }
    /**
       * Method to launch CXoneAgent application from SDK
       * @param targetDivId - Target div id wherein application needs to be loaded
       * @param appUrl - Application url that needs to be launched
       * @param styleParams - css style params to be applied to iframe
       * @example
       * ```
       * launchCXoneAgent('divId','https://cxagent.nicecxone-dev.com?src=UH',{width:'400px', height:'500px'});
       * ```
       */
    launchCXoneAgent(targetDivId, appUrl, styleParams) {
        window.addEventListener('message', this.postAuthCodeMessage);
        const target = document.getElementById(targetDivId);
        if (target) {
            const styleString = Object.entries(styleParams)
                .map(([k, v]) => `${k}:${v}`)
                .join(';');
            target.innerHTML = `<iframe id='launchCXAFrame' allow="microphone;" src=${appUrl} style=${styleString}></iframe>`;
        }
    }
    /**
       * Check if token is impersonated token
       * @param token - token
       * @example -
       * ```
       * getImpersonatingUser(token)
       * ```
       */
    getImpersonatingUser(token) {
        const decodedTokenPayload = this.securityHelper.parseJwt(token);
        if (decodedTokenPayload === null || decodedTokenPayload === void 0 ? void 0 : decodedTokenPayload.impersonatingUserTenantId) {
            this.isActiveImpersonatedUser = true;
        }
        return this.isActiveImpersonatedUser ? decodedTokenPayload : undefined;
    }
    /**
       * Checks if instance is leader or not
       * @example
       * ```
       * const isImpersonatedUser = this.isActiveImpersonatedUser;
       * ```
       */
    get isImpersonatedUser() {
        return this.isActiveImpersonatedUser;
    }
    /**
     * Method to verify JWT
     * @returns - verified payload
     * @example
     * ```
     * const user = await verifyJwt(authResponse)
     * ```
     */
    verifyJwt(authResponse) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const decodedHeader = JSON.parse(window.atob((_b = (_a = authResponse === null || authResponse === void 0 ? void 0 : authResponse.data) === null || _a === void 0 ? void 0 : _a.id_token) === null || _b === void 0 ? void 0 : _b.split('.')[0]));
            const headerKID = decodedHeader === null || decodedHeader === void 0 ? void 0 : decodedHeader.kid;
            let isValid = false;
            try {
                const keys = (yield this.getJWKS()).keys;
                const key = keys === null || keys === void 0 ? void 0 : keys.find((key) => (key === null || key === void 0 ? void 0 : key.kid) === headerKID);
                if (key) {
                    const jwk = {
                        kty: 'RSA',
                        n: key.n,
                        e: key.e,
                    };
                    const pem = jwkToBuffer(jwk);
                    const pubKey = KEYUTIL.getKey(pem);
                    isValid = KJUR.jws.JWS.verifyJWT((_c = authResponse === null || authResponse === void 0 ? void 0 : authResponse.data) === null || _c === void 0 ? void 0 : _c.id_token, pubKey, { alg: ['RS256'], gracePeriod: 300 });
                }
                else {
                    this.logger.error('verifyJwt', `unable to find signing key that matches ${headerKID}`);
                }
            }
            catch (err) {
                this.logger.error('verifyJwt', JSON.stringify(err));
            }
            return isValid;
        });
    }
    /**
     * Method to get JWKS for verifing jwt token
     * @returns - Http Response form jwks endpoint
     * @example
     * ```
     * const response = await this.getJWKS();
     * ```
     */
    getJWKS() {
        return new Promise((resolve, reject) => {
            const keysFromStorage = LocalStorageHelper.getItem('keys', true);
            if (!keysFromStorage) {
                this.getOpenIDConfiguration(this.authSettings.cxoneHostname).then((discoveryResponse) => {
                    if (discoveryResponse && discoveryResponse.jwksURI) {
                        const jwksEndpoint = discoveryResponse.jwksURI;
                        const reqInit = this.utilService.initHeader('', 'application/json');
                        HttpClient.get(jwksEndpoint, reqInit).then((resp) => {
                            const keys = resp.data;
                            this.logger.info('getJWKS', 'JWKS received');
                            LocalStorageHelper.setItem('keys', keys);
                            resolve(keys);
                        }, (err) => {
                            this.logger.error('getJWKS', err.toString());
                            reject(err);
                        });
                    }
                    else {
                        this.logger.error('getJWKS', 'jwks endpoint is null');
                        reject('jwks endpoint is null');
                    }
                });
            }
            else {
                resolve(keysFromStorage);
            }
        });
    }
    /**
     * Fetch the user details of logged in user
     * @example
     * ```
     * getUserManagementDetails();
     * ```
     */
    getUserManagementDetails() {
        const userInfo = this.cxoneUser.getUserInfo();
        this.adminService
            .getUserDetails(true)
            .then((response) => {
            if ((response === null || response === void 0 ? void 0 : response.firstName) && (response === null || response === void 0 ? void 0 : response.lastName)) {
                userInfo.firstName = response === null || response === void 0 ? void 0 : response.firstName;
                userInfo.lastName = response === null || response === void 0 ? void 0 : response.lastName;
                LocalStorageHelper.setItem(StorageKeys.USER_INFO, userInfo);
            }
        })
            .catch((e) => {
            this.logger.error('getUserManagementDetails', e.toString());
        });
    }
    /**
     * Encrypts the provided authentication token and stores it in local storage.
     * @param authToken - The authentication token to be encrypted and stored.
     * @returns A promise that resolves when the token has been successfully encrypted and stored.
     * @throws Will log an error to the console if there is an issue during the encryption or storage process.
     * @example
     * ```
     * await this.setEncryptedAuthToken(authToken);
     * ```
     */
    setEncryptedAuthToken(authToken) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedAuthToken = new EncryptedAuthToken();
                encryptedAuthToken.parseData(authToken);
                const userId = (_a = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)) === null || _a === void 0 ? void 0 : _a.userId;
                const cryptoKey = yield this.getOrGenerateCryptoKey(userId);
                const encryptedAccessToken = yield this.encryptToken(authToken === null || authToken === void 0 ? void 0 : authToken.accessToken, cryptoKey);
                const encryptedRefreshToken = yield this.encryptToken(authToken === null || authToken === void 0 ? void 0 : authToken.refreshToken, cryptoKey);
                const encryptedIdToken = yield this.encryptToken(authToken === null || authToken === void 0 ? void 0 : authToken.idToken, cryptoKey);
                encryptedAuthToken.aInfo = encryptedAccessToken;
                encryptedAuthToken.rInfo = encryptedRefreshToken;
                encryptedAuthToken.iInfo = encryptedIdToken;
                LocalStorageHelper.setItem(StorageKeys.ENCRYPTED_AUTH_TOKEN, encryptedAuthToken);
            }
            catch (error) {
                this.logger.error('setEncryptedAuthToken', 'Error during token encryption and storage:' + error);
                throw new CXoneSdkError(CXoneSdkErrorType.TOKEN_ENCRYPTION_ERROR, 'Error during token encryption and storage');
            }
        });
    }
    /**
       * Retrieves a CryptoKey by decrypting an encrypted key using a derived key.
       * @param userId - The user ID used to derive the secondary key.
       * @param encryptedKey - The encrypted key that needs to be decrypted.
       * @param iv - The initialization vector used for decryption.
       * @returns A promise that resolves to a CryptoKey.
       * @example
       * ```
       * const cryptoKey = await this.getCryptoKey('user123', 'encryptedKeyString', 'initializationVector');
       * ```
       */
    getCryptoKey(userId, encryptedKey, iv) {
        return __awaiter(this, void 0, void 0, function* () {
            const secondaryJSONKey = yield this.securityHelper.deriveKey(userId);
            const secondaryCryptoKey = yield this.securityHelper.importKey(secondaryJSONKey);
            const decryptedKeyData = yield this.securityHelper.decrypt(encryptedKey, iv, secondaryCryptoKey);
            const decryptedJSONData = JSON.parse(decryptedKeyData);
            return yield this.securityHelper.importKey(decryptedJSONData === null || decryptedJSONData === void 0 ? void 0 : decryptedJSONData.key);
        });
    }
    /**
       * Retrieves or generates a cryptographic key for the specified user.
       * @param userId - The ID of the user for whom the cryptographic key is being retrieved or generated.
       * @returns A promise that resolves to the cryptographic key.
       * @example
       * ```
       * const cryptoKey = await this.getOrGenerateCryptoKey('user123');
       * ```
       */
    getOrGenerateCryptoKey(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = LocalStorageHelper.getItem(StorageKeys.ENCRYPTION_IV, true);
            const encryptedKey = LocalStorageHelper.getItem(StorageKeys.ENCRYPTED_KEY, true);
            if (userInfo && encryptedKey) {
                return yield this.getCryptoKey(userId, encryptedKey, userInfo === null || userInfo === void 0 ? void 0 : userInfo.i);
            }
            else {
                return yield this.generateAndStoreCryptoKey(userId);
            }
        });
    }
    /**
       * Generates a cryptographic key, encrypts it, and stores it in local storage.
       * @param userId - The user ID used to derive the secondary encryption key.
       * @returns A promise that resolves to the generated CryptoKey.
       * @example
       * ```
       * const cryptoKey = await this.generateAndStoreCryptoKey('user123');
       * ```
       */
    generateAndStoreCryptoKey(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cryptoKey = yield this.securityHelper.generateKey();
            const keyData = yield crypto.subtle.exportKey('jwk', cryptoKey);
            const encryptedKey = JSON.stringify({ key: keyData });
            const secondaryJSONCryptoKey = yield this.securityHelper.deriveKey(userId);
            const secondaryCryptoKey = yield this.securityHelper.importKey(secondaryJSONCryptoKey);
            const secondaryEncryptedResult = yield this.securityHelper.encrypt(encryptedKey, secondaryCryptoKey);
            LocalStorageHelper.setItem(StorageKeys.ENCRYPTED_KEY, secondaryEncryptedResult === null || secondaryEncryptedResult === void 0 ? void 0 : secondaryEncryptedResult.cipherText);
            LocalStorageHelper.setItem(StorageKeys.ENCRYPTION_IV, { i: secondaryEncryptedResult === null || secondaryEncryptedResult === void 0 ? void 0 : secondaryEncryptedResult.iv });
            return cryptoKey;
        });
    }
    /**
       * Encrypts a given token using the provided CryptoKey.
       *
       * @param token - The token to be encrypted.
       * @param cryptoKey - The CryptoKey used for encryption.
       * @returns A promise that resolves to a JSONWebKey containing the encrypted token and initialization vector.
       *
       * @example
       * ```
       * const token = "my-secret-token";
       * const cryptoKey = await crypto.subtle.generateKey(
       *   {
       *     name: "AES-GCM",
       *     length: 256,
       *   },
       *   true,
       *   ["encrypt", "decrypt"]
       * );
       * const encryptedToken = await encryptToken(token, cryptoKey);
       * this.logger.log(encryptedToken);
       * // Output: { t: "encryptedText", i: "initializationVector" }
       * ```
       */
    encryptToken(token, cryptoKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedResult = yield this.securityHelper.encrypt(token, cryptoKey);
            return {
                t: encryptedResult === null || encryptedResult === void 0 ? void 0 : encryptedResult.cipherText,
                i: encryptedResult === null || encryptedResult === void 0 ? void 0 : encryptedResult.iv,
            };
        });
    }
    /**
     * Retrieves and decrypts the authentication token stored in local storage.
     * @returns A promise that resolves to the decrypted authentication token, or null if decryption fails.
     * @throws If an error occurs during the decryption process.
     * @remarks
     * This method retrieves the encrypted authentication token, encrypted key, and user information from local storage.
     * It then attempts to decrypt the token using the retrieved information. If any required information is missing or
     * decryption fails, the method returns null.
     *
     * @example
     * ```
     * const decryptedToken = await authSdk.getDecryptedToken();
     * ```
     */
    getDecryptedToken() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validationUtils.isValidObject(this.authToken))
                return this.authToken;
            else {
                const encryptedtoken = LocalStorageHelper.getItem(StorageKeys.ENCRYPTED_AUTH_TOKEN, true);
                const encryptedKey = LocalStorageHelper.getItem(StorageKeys.ENCRYPTED_KEY, true);
                const userInfo = LocalStorageHelper.getItem(StorageKeys.ENCRYPTION_IV, true);
                if (!encryptedtoken || !((_a = encryptedtoken === null || encryptedtoken === void 0 ? void 0 : encryptedtoken.aInfo) === null || _a === void 0 ? void 0 : _a.t) || !((_b = encryptedtoken === null || encryptedtoken === void 0 ? void 0 : encryptedtoken.aInfo) === null || _b === void 0 ? void 0 : _b.i) || !encryptedKey || !userInfo || !(userInfo === null || userInfo === void 0 ? void 0 : userInfo.i))
                    return null;
                try {
                    const decryptedAuthToken = new AuthToken();
                    decryptedAuthToken.parseData(encryptedtoken);
                    const userId = (_c = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)) === null || _c === void 0 ? void 0 : _c.userId;
                    const cryptoKey = userInfo && encryptedKey ? yield this.getCryptoKey(userId, encryptedKey, userInfo === null || userInfo === void 0 ? void 0 : userInfo.i) : null;
                    if (!cryptoKey) {
                        this.logger.error('getDecryptedToken', 'CryptoKey is undefined');
                        return null;
                    }
                    // Decrypt the token
                    decryptedAuthToken.accessToken = yield this.securityHelper.decrypt(encryptedtoken.aInfo.t, encryptedtoken.aInfo.i, cryptoKey);
                    decryptedAuthToken.refreshToken = yield this.securityHelper.decrypt(encryptedtoken.rInfo.t, encryptedtoken.rInfo.i, cryptoKey);
                    decryptedAuthToken.idToken = yield this.securityHelper.decrypt(encryptedtoken.iInfo.t, encryptedtoken.iInfo.i, cryptoKey);
                    return decryptedAuthToken;
                }
                catch (error) {
                    this.logger.error('getDecryptedToken', 'Error during token decryption:' + error);
                    return null;
                }
            }
        });
    }
    /**
     * Validates if the feature toggle for token encryption is enabled and retrieves the decrypted token.
     * @returns A promise that resolves to the decrypted authentication token, or null if decryption fails or the feature toggle is disabled.
     * @example
     * ```
     * const decryptedToken = await this.validateFtAndGetDecryptedToken();
     * ```
     */
    validateFtAndGetDecryptedToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isTokenEncryptionFTEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-cxa-token-update-AW-34038" /* FeatureToggles.TOKEN_ENCRYPTION_FEATURE_TOGGLE */);
                if (isTokenEncryptionFTEnabled) {
                    return yield this.getDecryptedToken();
                }
                else {
                    return this.getAuthToken();
                }
            }
            catch (error) {
                const authToken = LocalStorageHelper.getItem(StorageKeys.AUTH_TOKEN, true);
                if (authToken && this.validationUtils.isValidObject(authToken)) {
                    this.setAuthToken(authToken);
                    return authToken;
                }
                this.logger.error('validateFtAndGetDecryptedToken', 'Error validating feature toggle and getting decrypted token: ' + error);
                return null;
            }
        });
    }
    /**
     * Method to check Ft and save auth token
     * @param authToken - authToken to be saved
     * @example validateFTAndSetAuthToken(authToken)
     */
    validateFTAndSetAuthToken(authToken, reject) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = (_a = this.getCXoneConfig()) === null || _a === void 0 ? void 0 : _a.userHubBaseUrl;
                FeatureToggleService.instance.init(authToken.accessToken, baseUrl);
                const isTokenEncryptionFTEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-cxa-token-update-AW-34038" /* FeatureToggles.TOKEN_ENCRYPTION_FEATURE_TOGGLE */);
                if (!isTokenEncryptionFTEnabled) {
                    LocalStorageHelper.setItem(StorageKeys.AUTH_TOKEN, authToken);
                }
                else {
                    yield this.setEncryptedAuthToken(authToken);
                }
            }
            catch (error) {
                this.logger.error('validateFTAndSetAuthToken', 'Error while setting encrypted token' + error.toString());
                this.onAuthStatusChange.next({
                    status: AuthStatus.AUTHENTICATION_FAILED,
                    response: error,
                });
                reject && reject();
            }
        });
    }
}
//# sourceMappingURL=cxone-auth.js.map