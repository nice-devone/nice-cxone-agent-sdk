import { AdminService } from '@nice-devone/core-sdk';
/**
 * Class to manage agent permission
 */
export class CXoneAgentPermission {
    /**
     * get instance for CXonePermission and adminService
     * @example
     * ```
     * const cxonePermission = new CXonePermission();
     * ```
     */
    constructor() {
        this.adminService = AdminService.instance;
    }
    /**
     * Method to return agent permissions
     * @returns - return the agent permissions
     * ```
     * @example
     * getPermissions()
     * ```
     */
    getPermissions() {
        return this.adminService.getPermissions();
    }
    /**
     * Method to return agent permissions
     * @returns - return true if agent has the permissions for respective key
     * otherwise false
     * ```
     * @example
     * checkPermissions()
     * ```
     */
    checkPermissions(permissionKey, permissionValue) {
        return this.getPermissions().then((response) => {
            for (let i = 0; i < response.length; i++) {
                if ((response[i].key.toUpperCase() === permissionKey.toUpperCase()) && (response[i].value.toUpperCase() === permissionValue.toUpperCase())) {
                    return true;
                }
            }
            return false;
        });
    }
    ;
}
//# sourceMappingURL=cxone-agent-permission.js.map