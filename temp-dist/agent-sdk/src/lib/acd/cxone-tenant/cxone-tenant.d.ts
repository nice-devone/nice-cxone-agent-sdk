import { BrandingProfile, BusinessUnit, CentralBrandingProfile, Logger, Tenant } from '@nice-devone/core-sdk';
import { CXoneSdkError } from '@nice-devone/common-sdk';
import { CXoneProductFeature } from '../enum/cxone-product-feature';
/**
 * Class to manage all tenant-related methods
 */
export declare class CXoneTenant {
    private adminService;
    protected logger: Logger;
    /**
     * get instance for adminService
     * @example
     * ```
     * this.adminService = AdminService.instance;
     * ```
     */
    constructor();
    /**
     * Method to return Product permissions
     * @returns - returns the Product permissions
     * ```
     * @example
     * checkProductEnablement()
     * ```
     */
    checkProductEnablement(productIds: Array<CXoneProductFeature>): Promise<boolean | CXoneSdkError>;
    /**
     * Method to return Product licenses permissions from tenant data
     * @param productIds - Array of Product IDs to check for enablement
     * @returns - returns a boolean indicating either of the specified products are enabled in the tenant data.
     * ```
     * @example
     * checkProductEnablementFromTenantData()
     * ```
     */
    checkProductEnablementFromTenantData(productIds: Array<CXoneProductFeature>): Promise<boolean | CXoneSdkError>;
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
     * Method to return all tenant data
     * @returns - returns all data for a tenant
     * ```
     * @example
     * getTenantManagementData()
     * ```
     */
    getTenantData(): Promise<Tenant | CXoneSdkError>;
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
     * Method to return Directory 2.0 is enable or not
     * @returns - returns the Product/licenses permissions as Boolean value
     * ```
     * @example
     * checkDirectoryEnable()
     * ```
     */
    checkDirectoryEnable(): Promise<boolean | CXoneSdkError>;
}
