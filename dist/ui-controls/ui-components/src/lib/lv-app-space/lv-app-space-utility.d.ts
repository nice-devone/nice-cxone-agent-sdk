import { LvCustomerType } from './lv-app-space-types';
export declare const LOGGER_MODULE = "LV_APP_SPACE";
export declare const DATA_TEST_ID = "lv-app-space";
export declare const PRE_LOADER_TIMEOUT = 1500;
export declare const LV_VERSION = "26.1";
/**
 * Used to identify if SmartReach is enabled for the current tenant.
 */
export declare const SMARTREACH_PRODUCT_ID = 3500;
/**
 * Used to identify if SmartReach ECC is enabled for the current tenant.
 */
export declare const SMARTREACH_ECC = 3501;
/**
 * Used to identify if SmartReach Desk is enabled for the current tenant.
 */
export declare const SMARTREACH_DESK = 3502;
/**
 * Retrieves the name of a LV Customer. A LV Customer has optional the first and last name
 * So we want to have a helper to just return the LV Customer first name if the last name
 * is not provided, and viceversa.
 * @example
 * ```
 * const customerName = getCustomerName({ firstName: 'Andres' })
 * ```
 */
export declare function getCustomerName(customer: LvCustomerType): string;
