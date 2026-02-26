export const LOGGER_MODULE = 'LV_APP_SPACE';
export const DATA_TEST_ID = 'lv-app-space';
export const PRE_LOADER_TIMEOUT = 1500;
export const LV_VERSION = '26.1';
/**
 * Used to identify if SmartReach is enabled for the current tenant.
 */
export const SMARTREACH_PRODUCT_ID = 3500;
/**
 * Used to identify if SmartReach ECC is enabled for the current tenant.
 */
export const SMARTREACH_ECC = 3501;
/**
 * Used to identify if SmartReach Desk is enabled for the current tenant.
 */
export const SMARTREACH_DESK = 3502;
/**
 * Retrieves the name of a LV Customer. A LV Customer has optional the first and last name
 * So we want to have a helper to just return the LV Customer first name if the last name
 * is not provided, and viceversa.
 * @example
 * ```
 * const customerName = getCustomerName({ firstName: 'Andres' })
 * ```
 */
export function getCustomerName(customer) {
    var _a, _b;
    const first = ((_a = customer === null || customer === void 0 ? void 0 : customer.firstName) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    const last = ((_b = customer === null || customer === void 0 ? void 0 : customer.lastName) === null || _b === void 0 ? void 0 : _b.trim()) || '';
    return first && last ? `${first} ${last}` : first || last;
}
//# sourceMappingURL=lv-app-space-utility.js.map