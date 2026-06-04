import { Permissions } from '@nice-devone/core-sdk';
import { CXoneSdkError, PermissionKeys, PermissionValues } from '@nice-devone/common-sdk';
/**
 * Class to manage agent permission
 */
export declare class CXoneAgentPermission {
    private adminService;
    /**
     * get instance for CXonePermission and adminService
     * @example
     * ```
     * const cxonePermission = new CXonePermission();
     * ```
     */
    constructor();
    /**
     * Method to return agent permissions
     * @returns - return the agent permissions
     * ```
     * @example
     * getPermissions()
     * ```
     */
    getPermissions(): Promise<Permissions[] | CXoneSdkError>;
    /**
     * Method to return agent permissions
     * @returns - return true if agent has the permissions for respective key
     * otherwise false
     * ```
     * @example
     * checkPermissions()
     * ```
     */
    checkPermissions(permissionKey: PermissionKeys, permissionValue: PermissionValues): Promise<boolean>;
}
