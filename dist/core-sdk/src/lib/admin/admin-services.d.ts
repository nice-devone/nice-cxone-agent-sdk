import { HttpUtilService } from '../http/http-util-service';
import { Logger } from '../../logger/logger';
import { Permissions } from './model/permissions';
import { BusinessUnit } from './model/business-unit';
import { CentralBrandingProfile } from './model/central-branding-profile';
import { BrandingProfile } from './model/branding-profile';
import { CXoneIndicator, CXoneSdkError, HttpResponse, UserInfo, CXoneConfiguration, UserLocation } from '@nice-devone/common-sdk';
import { AgentSettings } from './model/agent-settings';
import { CXoneUserDetails } from './model/cxone-user-details';
import { Tenant } from './model/tenant';
/**
 * Class to perform get admin api
 */
export declare class AdminService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private apiParser;
    private agentIndicatorsInfo;
    private static singleton;
    private validationUtils;
    private accessToken;
    private cxOneConfig;
    private userInfo;
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
    initialize(accessToken: string, config: CXoneConfiguration, userInfo: UserInfo): void;
    /**
     * @returns - cxone configuration object
     * @example
     * ```
     * const cxoneConfig = this.getCXoneConfig();
     * ```
     */
    getCXoneConfig(): CXoneConfiguration;
    /**
     * @param accessToken - access token
     * @example
     * ```
     * this.setAccessToken(accessToken);
     * ```
     */
    setAccessToken(accessToken: string): void;
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const agentSession = AdminService.instance;
     * ```
     */
    static get instance(): AdminService;
    /**
     * Method to return agent permissions
     * @returns - return the agent permissions
     * ```
     * @example
     * getPermissions()
     * ```
     */
    getPermissions(forceFetch?: boolean): Promise<Permissions[] | CXoneSdkError>;
    /**
     * Method to return agent settings
     * @returns - return the agent settings
     * ```
     * @example
     * getAgentSettings()
     * ```
     */
    getAgentSettings(): Promise<AgentSettings>;
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
     *  Method to return all tenant data
     * @example
     * ```
     * getTenantManagementData()
     * ```
     */
    getTenantData(): Promise<Tenant | CXoneSdkError>;
    /**
     * Method to return client data
     * @returns - returns the client data
     * ```
     * @example
     * getClientData()
     * ```
     */
    getClientData(): Promise<string | CXoneSdkError>;
    /**
     * Method to return client data
     * @returns - returns the client data
     * ```
     * @example
     * getClientData()
     * ```
     */
    putClientData(clientData: {
        [key: string]: any;
    }): Promise<string | CXoneSdkError>;
    /**
     * Method to return central branding profile
     * @returns - returns the central branding profile
     * ```
     * @example
     * getCentralBrandingProfile()
     * ```
     */
    getCentralBrandingProfile(): Promise<CentralBrandingProfile | CXoneSdkError>;
    /**
     * Method to return cxone branding profiles
     * @returns - returns the cxone branding profiles
     * ```
     * @example
     * getBrandingProfile()
     * ```
     */
    getBrandingProfile(): Promise<BrandingProfile | CXoneSdkError>;
    /**
     * Method to call the script to get the skill Id
     * @example
     * ```
     * getScriptData('scriptName');
     * ```
     */
    getScriptByName(scriptName: string): Promise<number>;
    /**
     * Method to call spawn script
     * @example
     * ```
     * spawnScript();
     * ```
     */
    spawnScript(scriptId: number, skillId: number, parameters: string, startDate: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to start the signal script
     * @param contactId -  contact id
     * @example
     * ```
     * signalScript('123', {});
     * ```
     */
    signalScript(contactId: string, parameters: any): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to return all indicators
     * @returns - returns all indicators
     * ```
     * @example
     * getAllIndicators()
     * ```
     */
    getAllIndicators(): Promise<CXoneIndicator[]>;
    /**
     * Method to return User Hub user details
     * @returns - User Details
     * ```
     * @example
     * getUHUserDetails()
     * ```
     */
    getUHUserDetails(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Fetches the details of loged in user
     * @returns Details of the User
     * @param useCache - True to use cached data if available
     * ```
     * @example
     * getUserDetails(true)
     * ```
     */
    getUserDetails(useCache?: boolean): Promise<CXoneUserDetails>;
    /**
     * Method to set the server time offset in local storage
     * @example - setTimeStampOffset()
     */
    setTimeStampOffset(): Promise<number>;
    /**
     * Method to get time stamp offset
     * @returns - number or CXoneSdkError
     * ```
     * @example
     * getTimeStampOffset()
     * ```
     */
    getTimeStampOffset(): Promise<number | CXoneSdkError>;
    /**
     * Method to return aggregator service node url for uiq connection
     * @returns - User Details
     * ```
     * @example
     * getUiqHubUrl()
     * ```
     */
    getUiqHubUrl(): Promise<HttpResponse | CXoneSdkError>;
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
    resizeEventQueue(sessionId: string, throttle: boolean): Promise<void>;
    /**
     * Method to return agent locations
     * @returns - User Details
     * @example
     * ```
     * getUserLocations()
     * ```
     */
    getUserLocations(): Promise<UserLocation | CXoneSdkError>;
    /**
     * Method to select agent location
     * @param locationId - location id
     * @returns - User Details
     * @example
     * ```
     * selectUserLocation('123')
     * ```
     */
    selectUserLocation(locationId: string): Promise<HttpResponse | CXoneSdkError>;
}
