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
                const buData = resp;
                const isProductEnabled = buData.features.find((product) => {
                    return productIds.includes(product.productId) && product.isEnabled;
                });
                resolve(isProductEnabled ? true : false);
            }, (error) => {
                this.logger.error('checkProductEnablement', 'CheckProduct Enablement failed ' + JSON.stringify(error));
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