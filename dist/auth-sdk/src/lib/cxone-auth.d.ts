import { CXoneSdkError, HttpResponse, AuthToken, AuthState, CXoneConfiguration } from '@nice-devone/common-sdk';
import { BusinessUnit, Permissions, BrandingProfile } from '@nice-devone/core-sdk';
import { AuthResponse } from './model/auth-response';
import { Subject } from 'rxjs';
import { AuthWithCodeReq } from './model/auth-with-code-req';
import { AuthWithTokenReq } from './model/auth-with-token-req';
import { AuthSettings } from './model/auth-settings';
import { OpenIDConfiguration } from './model/open-id-configuration';
import { JwtPayload } from 'jsonwebtoken';
/**
 * Class to perform common authentication of user
 */
export declare class CXoneAuth {
    static cxoneAuth: CXoneAuth;
    private logger;
    private cxOneConfig;
    private utilService;
    private securityHelper;
    private authToken;
    private authWorker;
    private cxoneUser;
    private adminService;
    private validationUtils;
    private oidcConfig;
    private isActiveImpersonatedUser;
    onAuthStatusChange: Subject<AuthResponse>;
    authSettings: AuthSettings;
    /**
     * constructor for CXoneAuth
     */
    private constructor();
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const authObject = CXoneAuth.instance;
     * ```
     */
    static get instance(): CXoneAuth;
    /**
     * @param authSettings - initialize the auth settings
     * @example
     * ```
     * init({'cxoneHostname': 'https://cxone.dev.niceincontact.com', 'clientId': 'Salesforce Agent Console@inContact Inc.'})
     * ```
     */
    init(authSettings: AuthSettings): void;
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
    getAuthorizeUrl(displayMode: string, codeChallengeMethod: string, tenantId?: string): Promise<string>;
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
    getAccessTokenByCode(authWithCodeReq: AuthWithCodeReq): Promise<AuthToken>;
    /**
     * method to generate new token using existing token
     * @param authWithTokenReq - request object containing host url and existing access token
     * @returns - returns the auth token
     * @example
     * ```
     * getAccessTokenByToken({'http:testhost.com', 'eyJ0eXAiOiJKV1Qi...'});
     * ```
     */
    getAccessTokenByToken(authWithTokenReq: AuthWithTokenReq): Promise<AuthToken>;
    /**
     * method to generate new token using existing token using regional token exchange service
     * @param authWithTokenReq - request object containing host url and existing access token
     * @returns - returns the auth token
     * @example
     * ```
     * getAccessTokenByToken({'http:testhost.com', 'eyJ0eXAiOiJKV1Qi...'});
     * ```
     */
    getRegionalAccessTokenByToken(authWithTokenReq: AuthWithTokenReq, impersonatingUser: JwtPayload): Promise<AuthToken>;
    /**
     * Method to get discovery endpoints for authentication purposes
     * @returns - Http Response form well known openid config api
     * @example
     * ```
     * getOpenIDConfiguration('https://cxone.dev.niceincontact.com')
     * ```
     */
    getOpenIDConfiguration(hostname: string): Promise<OpenIDConfiguration>;
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
    getCXoneConfiguration(hostname: string, tenantId: string, isUserHub: boolean): Promise<CXoneConfiguration | CXoneSdkError>;
    /**
     * Method to get the whoami api response
     * @returns - Http Response from whoAmI api
     * @param authToken - 'authToken'
     * @example
     * ```
     * getWhoAmIData(authToken)
     * ```
     */
    private getWhoAmIData;
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
    private getAcdAuthorizationTokenEndpoint;
    /**
     * restores data and re-initiates auth flow
     * @returns - re-initialization status for auth flow as authenticated/not authenticated through onAuthStatusChange subject
     * @example
     * ```
     * this.restoreData();
     * ```
     */
    restoreData(): void;
    /**
     * Subscription for response message over broadcast channel
     */
    private subscribeResponseMessage;
    /**
     * Method used to parse the auth token, user info and store the values to local storage
     * @param authToken - authToken response
     * @param verifiedUser - user details after token verification
     * @param setUserInfo - flag to decide whether to set user info or not
     * @returns - parsed authToken data
     * @example -
     * ```
     * parseAndSaveAuthToken(authToken, verifiedUser, true);
     * ```
     */
    parseAndSaveAuthToken(authToken: HttpResponse, verifiedUser: any, setUserInfo?: boolean): AuthToken;
    /**
     * Method used to process parsed auth token and set user info object
     * @param authToken - parsed authToken
     * @param verifiedUser - user details after token verification
     * @param setUserInfo - flag to decide whether to set user info or not
     * @returns - parsed authToken data
     * @example -
     * ```
     * setAuthAndUserData(authToken, verifiedUser, true);
     * ```
     */
    setAuthAndUserData(authToken: AuthToken, verifiedUser: JwtPayload, setUserInfo?: boolean): void;
    /**
     * @param authToken - authToken object
     * @example
     * ```
     * this.setAuthToken(authToken);
     * ```
     */
    setAuthToken(authToken: AuthToken): void;
    /**
     * @returns - returns auth token object
     * @example
     * ```
     * const authToken = this.getAuthToken();
     * ```
     */
    getAuthToken(): AuthToken;
    /**
     * @param cxoneConfig - cxone configuration object
     * @example
     * ```
     * setConfig(cxoneConfig: CXoneConfiguration);
     * ```
     */
    setCXoneConfig(cxoneConfig: CXoneConfiguration): void;
    /**
     * @returns - cxone configuration object
     * @example
     * ```
     * const cxoneConfig = this.getCXoneConfig();
     * ```
     */
    getCXoneConfig(): CXoneConfiguration;
    /**
     * Checks if user is logged in and have valid token
     * @returns - user login details with auth token
     * @example
     * ```
     * const userLoginDetails = this.getAuthState();
     * ```
     */
    getAuthState(): AuthState;
    /**
     * Method to check token is expired or not
     * @returns - boolean value token is expired or not
     * @example
     * ```
     * const isExpired = this.isTokenExpired();
     * ```
     */
    isTokenExpired(): boolean;
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
    startRefreshTokenCheck(authToken: AuthToken, isLeader: boolean, isTokenValid: boolean): boolean;
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initUtilWorker();
     * ```
     */
    private initUtilWorker;
    /**
     * Used to fetch the new access token when the old token is expired
     * the authentication end point we will get from localstorage object 'discovery_response'
     */
    private getRefreshToken;
    /**
     * Used to fetch the new access token using regional token endpoint when the old token is expired
     */
    private getRegionalRefreshToken;
    /**
     * Use to terminate the util worker instance
     * @example
     * ```
     * this.terminateUtilWorker();
     * ```
     */
    terminateUtilWorker(): void;
    /**
     * Method to terminate util worker
     * @example
     * ```
     * terminateCXoneUtilWorker()
     * ```
     */
    terminateCXoneUtilWorker(): void;
    /**
     * Method to return business unit features
     * @returns - returns the business unit features
     * ```
     * @example
     * getBusinessUnit()
     * ```
     */
    getBusinessUnit(): Promise<BusinessUnit | CXoneSdkError>;
    /**
     * Method to return business unit features
     * @returns - returns the business unit features
     * ```
     * @example
     * getBusinessUnit()
     * ```
     */
    getPermissions(): Promise<Permissions[] | CXoneSdkError>;
    /**
     * Method to return branding profiles
     * @returns - returns the branding profiles
     * ```
     * @example
     * getBrandingProfile()
     * ```
     */
    getBrandingProfile(): Promise<BrandingProfile | CXoneSdkError>;
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
    launchCXoneAgent(targetDivId: string, appUrl: string, styleParams: {
        [key: string]: string;
    }): void;
    /**
     * Event handler to receive message event from auth callback popup
     * @example
     * ```
     * postAuthCodeMessage(eventData)
     * ```
     */
    private postAuthCodeMessage;
    /**
       * Check if token is impersonated token
       * @param token - token
       * @example - verifyImpersonation(token)
       */
    getImpersonatingUser(token: string): JwtPayload | undefined;
    /**
       * Checks if instance is leader or not
       * @example
       * ```
       * const isImpersonatedUser = this.isActiveImpersonatedUser;
       * ```
       */
    get isImpersonatedUser(): boolean;
    /**
     * Method to verify JWT
     * @returns - verified payload
     * @example
     * ```
     * const user = await verifyJwt(authResponse)
     * ```
     */
    private verifyJwt;
    /**
     * Method to get JWKS for verifing jwt token
     * @returns - Http Response form jwks endpoint
     * @example
     * ```
     * const response = await this.getJWKS();
     * ```
     */
    private getJWKS;
}
