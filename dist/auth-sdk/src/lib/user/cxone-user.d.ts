import { AgentSettings, Logger } from '@nice-devone/core-sdk';
import { CXoneConfiguration, CXoneSdkError, UserInfo, CXoneDigitalSearchTabPermissions, AuthToken } from '@nice-devone/common-sdk';
import { UserCustomAttributes } from '../enum/user/custom-attributes';
/**
 * Class to manage all user-related methods
 */
export declare class CXoneUser {
    static cxoneUser: CXoneUser;
    protected logger: Logger;
    private adminService;
    private validationUtils;
    userInfo: UserInfo;
    private securityHelper;
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const user = CXoneUser.instance;
     * ```
     */
    static get instance(): CXoneUser;
    /**
     * constructor for CXoneUser
     * @example
     * ```
     * const cxoneUser = CXoneUser.instance;
     * ```
     */
    constructor();
    /**
     * Method to initialize auth details
     * @param accessToken - access token
     * @param cxOneConfig - CXoneConfig details
     * @example
     * ```
     * const user = CXoneUser.instance;
     * user.initAuth(accessToken, cxOneConfig);
     * ```
     */
    initAuth(accessToken: string, cxOneConfig: CXoneConfiguration): void;
    /**
     * method to check DigitalEngagement is enabled at user level
     * @example
     * ```
     * checkUserDigitalEngagement();
     * ```
     */
    checkUserDigitalEngagement(): Promise<boolean | CXoneSdkError>;
    /**
     * method to check product app is enabled at user level
     * @example
     * ```
     * isCustomAttributesEnabled();
     * ```
     */
    isCustomAttributesEnabled(attribute: UserCustomAttributes): Promise<boolean | CXoneSdkError>;
    /**
     * Get the current logged in user details
     * @returns - It returns the user information
     * ```
     * @example
     * getUserDetails();
     * ```
     */
    getUserDetails(): Promise<UserInfo | CXoneSdkError>;
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
     * Method to return agent settings
     * @returns - return the agent settings
     * @example
     * ```
     * this.getAgentSettings()
     * ```
     */
    getAgentSettings(): Promise<AgentSettings>;
    /**
     * Set the userinfo from the idToken after the successful authentication
     * @param verfiedUser - token for verified user
     * @param userDetails - user details
     * @example
     * ```
     * setUserDetails(authToken, userDetails);
     * ```
     */
    setUserDetails(verfiedUser: AuthToken, userDetails?: any): void;
    /**
     * Get the user details from the auth token that stored in the local storage
     * @returns - It returns the user information
     * @example
     * ```
     * getUserInfo();
     * ```
     */
    getUserInfo(): UserInfo;
    /**
     * Set the userinfo like digital id, brand id after the successful authentication
     * @param userDetails - user info data
     * @example
     * ```
     * setDigitalUserDetails(userDetails);
     * ```
     */
    setDigitalUserDetails(userDetails: UserInfo): void;
    /**
     * Set the Team ID in User Info
     * @param teamId - Team ID
     * @example
     * ```
     * setTeamIdUserInfo(teamId)
     * ```
     */
    setTeamIdUserInfo(teamId: number): void;
    /**
     * Method to get digital interaction search tab permissions from local storage
     * @returns - the interaction search tab permissions as permission object
     * @example
     * ```
     * cxoneUser.getDigitalSearchTabPermissions();
     * ```
     */
    getDigitalSearchTabPermissions(): CXoneDigitalSearchTabPermissions;
    /**
     * Method to get user location
     * @returns - It returns the user location
     * @example
     * ```
     * getUserLocation();
     * ```
     */
    getUserLocation(): Promise<CXoneSdkError | import("@nice-devone/common-sdk").UserLocation>;
    /**
     * Method to set user location
     * @param locationId - location id
     * @returns  - It returns the user location
     * @example
     * ```
     * setUserLocation(locationId);
     * ```
     */
    setUserLocation(locationId: string): Promise<CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse>;
}
