import { AdminService, Logger, } from '@nice-devone/core-sdk';
import { CXoneProductFeature } from '../enum/cxone-product-feature';
/**
 * Class to manage all tenant-related methods
 */
export class CXoneTenant {
    /**
     * get instance for adminService
     * @example
     * ```
     * this.adminService = AdminService.instance;
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneTenant');
        this.adminService = AdminService.instance;
    }
    /**
     * Method to return Product permissions
     * @returns - returns the Product permissions
     * ```
     * @example
     * checkProductEnablement()
     * ```
     */
    checkProductEnablement(productIds) {
        return new Promise((resolve, reject) => {
            this.adminService.getBusinessUnit().then((resp) => {
                var _a;
                const buData = resp;
                resolve(Boolean((_a = buData === null || buData === void 0 ? void 0 : buData.features) === null || _a === void 0 ? void 0 : _a.find((product) => {
                    return productIds.includes(product.productId) && product.isEnabled;
                })));
            }, (error) => {
                this.logger.error('checkProductEnablement', 'CheckProduct Enablement failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to return Product licenses permissions from tenant data
     * @param productIds - Array of Product IDs to check for enablement
     * @returns - returns a boolean indicating either of the specified products are enabled in the tenant data.
     * ```
     * @example
     * checkProductEnablementFromTenantData()
     * ```
     */
    checkProductEnablementFromTenantData(productIds) {
        return new Promise((resolve, reject) => {
            this.adminService.getTenantData().then((resp) => {
                const tenantData = resp;
                const isProductEnabled = tenantData.licenses.some((license) => license.featureIds.some((featureId) => productIds.includes(featureId)));
                resolve(isProductEnabled ? true : false);
            }, (error) => {
                this.logger.error('checkProductEnablementFromTenantData', 'CheckProduct Enablement from Tenant Data failed ' + JSON.stringify(error));
                reject(error);
            });
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
        return this.adminService.getBusinessUnit();
    }
    /**
     * Method to return all tenant data
     * @returns - returns all data for a tenant
     * ```
     * @example
     * getTenantManagementData()
     * ```
     */
    getTenantData() {
        return this.adminService.getTenantData();
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
        return this.adminService.getCentralBrandingProfile();
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
        return this.adminService.getBrandingProfile();
    }
    /**
     * Method to return Directory 2.0 is enable or not
     * @returns - returns the Product/licenses permissions as Boolean value
     * ```
     * @example
     * checkDirectoryEnable()
     * ```
     */
    checkDirectoryEnable() {
        const productId = [
            CXoneProductFeature.DIRECTORY_SYNC_ATOS,
            CXoneProductFeature.DIRECTORY_SYNC_LMI,
            CXoneProductFeature.DIRECTORY_SYNC_MS_TEAMS,
            CXoneProductFeature.DIRECTORY_SYNC_RC,
            CXoneProductFeature.DIRECTORY_SYNC_ZOOM
        ];
        return this.checkProductEnablement(productId);
    }
}
//# sourceMappingURL=cxone-tenant.js.map