import { AdminService, LocalStorageHelper, Logger, StorageKeys, ValidationUtils } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType, parseBooleanString, PermissionKeys } from '@nice-devone/common-sdk';
import { SecurityHelper } from '../../util/security-helper';
/**
 * Class to manage all user-related methods
 */
export class CXoneUser {
    /**
     * constructor for CXoneUser
     * @example
     * ```
     * const cxoneUser = CXoneUser.instance;
     * ```
     */
    constructor() {
        this.logger = new Logger('Auth-SDK', 'CXoneUser');
        this.validationUtils = new ValidationUtils();
        this.userInfo = {};
        this.securityHelper = new SecurityHelper();
        this.adminService = AdminService.instance;
    }
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const user = CXoneUser.instance;
     * ```
     */
    static get instance() {
        if (!CXoneUser.cxoneUser) {
            CXoneUser.cxoneUser = new CXoneUser();
        }
        return CXoneUser.cxoneUser;
    }
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
    initAuth(accessToken, cxOneConfig) {
        const userInfo = this.getUserInfo();
        this.adminService.initialize(accessToken, cxOneConfig, userInfo);
    }
    /**
     * method to check DigitalEngagement is enabled at user level
     * @example
     * ```
     * checkUserDigitalEngagement();
     * ```
     */
    checkUserDigitalEngagement() {
        return new Promise((resolve, reject) => {
            this.adminService.getUHUserDetails().then((response) => {
                var _a, _b, _c, _d, _e, _f;
                const isDigital = ((_f = (_e = (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.customAttributes) === null || _c === void 0 ? void 0 : _c.digitalEngagement) === null || _d === void 0 ? void 0 : _d.values) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value) === 'true' // if value is "true" then return true else return false
                    ? true
                    : false;
                isDigital ? resolve(isDigital) : reject(isDigital); // just to send the boolean value based on the condition as reject resolves the promise
            }, (error) => {
                var _a;
                this.logger.error('checkUserDigitalEnagament', 'Check digitalEngagement for user failed ' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * method to check product app is enabled at user level
     * @example
     * ```
     * isCustomAttributesEnabled();
     * ```
     */
    isCustomAttributesEnabled(attribute) {
        return new Promise((resolve, reject) => {
            this.adminService.getUserDetails(true).then((response) => {
                var _a;
                const attributeVal = (_a = response.customAttributes) === null || _a === void 0 ? void 0 : _a[attribute];
                resolve(parseBooleanString(attributeVal));
            }, (error) => {
                var _a;
                this.logger.error('isCustomAttributesEnabled', 'Check Custom Attributes Enable failed ' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
    /**
     * Get the current logged in user details
     * @returns - It returns the user information
     * ```
     * @example
     * getUserDetails();
     * ```
     */
    getUserDetails() {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.getUserInfo());
            }
            catch (err) {
                this.logger.error('getUserDetails', 'getUserDetails ' + err);
                reject(new CXoneSdkError(CXoneSdkErrorType.NO_DATA_FOUND, 'Data not found'));
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
        return this.adminService.getClientData();
    }
    /**
     * Method to return agent settings
     * @returns - return the agent settings
     * @example
     * ```
     * this.getAgentSettings()
     * ```
     */
    getAgentSettings() {
        return new Promise((resolve, reject) => {
            this.adminService.getAgentSettings().then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * Set the userinfo from the idToken after the successful authentication
     * @param verfiedUser - token for verified user
     * @param userDetails - user details
     * @example
     * ```
     * setUserDetails(authToken, userDetails);
     * ```
     */
    setUserDetails(verfiedUser, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userDetails) {
        var _a;
        const user = this.validationUtils.isValidObject(userDetails)
            ? userDetails
            : this.securityHelper.parseJwt(verfiedUser === null || verfiedUser === void 0 ? void 0 : verfiedUser.idToken);
        if (this.validationUtils.isValidObject(user)) {
            this.userInfo = JSON.parse(JSON.stringify(this.userInfo));
            this.userInfo.tenantId = user.tenantId;
            this.userInfo.firstName = user.given_name ? user.given_name : user.firstName;
            this.userInfo.lastName = user.family_name ? user.family_name : user.lastName;
            this.userInfo.icAgentId = user.icAgentId;
            this.userInfo.userName = user.name ? user.name : user.userName;
            this.userInfo.icBUId = user.icBUId;
            this.userInfo.icClusterId = user.icClusterId;
            this.userInfo.userId = user.userId || ((_a = user.sub) === null || _a === void 0 ? void 0 : _a.slice(5));
            this.userInfo.teamId = user.teamId;
            this.userInfo.tenant = user.tenant;
            LocalStorageHelper.setItem(StorageKeys.USER_INFO, this.userInfo);
        }
    }
    /**
     * Get the user details from the auth token that stored in the local storage
     * @returns - It returns the user information
     * @example
     * ```
     * getUserInfo();
     * ```
     */
    getUserInfo() {
        if (this.validationUtils.isValidObject(this.userInfo))
            return this.userInfo;
        else {
            const userInfoFromStoarge = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
            return (this.userInfo = this.validationUtils.isValidObject(userInfoFromStoarge)
                ? userInfoFromStoarge
                : {});
        }
    }
    /**
     * Set the userinfo like digital id, brand id after the successful authentication
     * @param userDetails - user info data
     * @example
     * ```
     * setDigitalUserDetails(userDetails);
     * ```
     */
    setDigitalUserDetails(userDetails) {
        if (userDetails) {
            const user = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
            if (user) {
                const digitalUserDetails = {
                    digitalUserId: userDetails.digitalUserId,
                    digitalBrandId: userDetails.digitalBrandId,
                };
                this.userInfo = Object.assign(Object.assign({}, this.userInfo), digitalUserDetails);
                LocalStorageHelper.setItem(StorageKeys.USER_INFO, this.userInfo);
                LocalStorageHelper.setItem(StorageKeys.DIGITAL_USER_ID, userDetails.digitalUserId);
            }
        }
    }
    /**
     * Set the Team ID in User Info
     * @param teamId - Team ID
     * @example
     * ```
     * setTeamIdUserInfo(teamId)
     * ```
     */
    setTeamIdUserInfo(teamId) {
        this.userInfo.teamId = teamId;
        LocalStorageHelper.setItem(StorageKeys.USER_INFO, this.userInfo);
    }
    /**
     * Method to get digital interaction search tab permissions from local storage
     * @returns - the interaction search tab permissions as permission object
     * @example
     * ```
     * cxoneUser.getDigitalSearchTabPermissions();
     * ```
     */
    getDigitalSearchTabPermissions() {
        const tabPermissions = {
            isCaseSearchAllowed: false,
            isMessageSearchAllowed: false,
            isCustomerSearchAllowed: false,
            isThreadSearchAllowed: false,
        };
        const allPermissionsFromStorage = LocalStorageHelper.getItem(StorageKeys.PERMISSIONS, true);
        if (allPermissionsFromStorage) {
            allPermissionsFromStorage.forEach((permission) => {
                switch (permission.key) {
                    case PermissionKeys.DIGITAL_SEARCH_CASES:
                        tabPermissions.isCaseSearchAllowed = true;
                        break;
                    case PermissionKeys.DIGITAL_SEARCH_MESSAGES:
                        tabPermissions.isMessageSearchAllowed = true;
                        break;
                    case PermissionKeys.DIGITAL_SEARCH_CUSTOMERS:
                        tabPermissions.isCustomerSearchAllowed = true;
                        break;
                    case PermissionKeys.DIGITAL_SEARCH_THREADS:
                        tabPermissions.isThreadSearchAllowed = true;
                        break;
                }
            });
        }
        return tabPermissions;
    }
    /**
     * Method to get user location
     * @returns - It returns the user location
     * @example
     * ```
     * getUserLocation();
     * ```
     */
    getUserLocation() {
        return this.adminService.getUserLocations();
    }
    /**
     * Method to set user location
     * @param locationId - location id
     * @returns  - It returns the user location
     * @example
     * ```
     * setUserLocation(locationId);
     * ```
     */
    setUserLocation(locationId) {
        return this.adminService.selectUserLocation(locationId);
    }
}
//# sourceMappingURL=cxone-user.js.map