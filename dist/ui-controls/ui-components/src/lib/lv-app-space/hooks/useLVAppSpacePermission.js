import { shallowEqual, useSelector } from 'react-redux';
import { getApplicationLocale, getLvCustomerCardFeatureToggle, getLvDeskFeatureToggle, getUserCustomAttributes, } from '../../global.app.slice';
import { LocalStorageHelper, LogLevel, StorageKeys, Logger } from '@nice-devone/core-sdk';
import { selectLvClientSettings } from '../lv-app-space.slice';
import { LOGGER_MODULE } from '../lv-app-space-utility';
var LV_ENVS;
(function (LV_ENVS) {
    LV_ENVS["TST2"] = "tst2";
    LV_ENVS["TST3"] = "tst3";
    LV_ENVS["STAGING"] = "stg4";
    LV_ENVS["EU1"] = "eu1";
    LV_ENVS["NA6"] = "na6";
    LV_ENVS["NA5"] = "na5";
    LV_ENVS["NA4"] = "na4";
    LV_ENVS["NA3"] = "na3";
})(LV_ENVS || (LV_ENVS = {}));
const logger = new Logger(LOGGER_MODULE, 'useLVAppSpacePermission');
/**
 * Identifies if LVCustomerCard is enabled for the current tenant
 * Ref:
 * - https://nice-ce-cxone-prod.atlassian.net/browse/CRM-11683
 * - https://nice-ce-cxone-prod.atlassian.net/browse/OB-19327
 * Possible Feature Toggles:
 * - release-acd-SmartReach-OB-19327
 * - release-tm-customerCard-2.0-crm-11684
 * Notes:
 * - Desk enabled then show Desk in App Space and as Icon in the "icon bar" and ignore whatever else is checked for ECC and Customer Card
 * - Enhanced Customer Card is enabled (and Desk not enabled) then show ECC in App Space ignoring if Customer Card is checked
 * - Customer Card enabled (with Desk and ECC not enabled) then displays the CX legacy Customer Card
 * @example
 * ```
 * const { isLvCustomerCardEnabled, isLvDeskEnabled } = useLvAppSpacePermissions()
 * ```
 */
export default function useLVAppSpacePermission() {
    var _a, _b, _c;
    const { hasSmartReachAgentAccess, hasSmartReachUserAccess, smartReachDeskAccess, smartReachECCAccess } = (_a = useSelector(getUserCustomAttributes)) !== null && _a !== void 0 ? _a : {};
    const { smartReachBaseUrl, smartReachClientCode } = useSelector(selectLvClientSettings, shallowEqual);
    const locale = useSelector(getApplicationLocale);
    const logLevel = LocalStorageHelper.getItem(StorageKeys.LOGGING_LEVEL) || LogLevel.ERROR;
    const isLvCustomerCardFeatureToggleEnabled = useSelector(getLvCustomerCardFeatureToggle);
    const isLvDeskFeatureToggleEnabled = useSelector(getLvDeskFeatureToggle);
    const userDetails = (_b = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _b !== void 0 ? _b : {};
    // If hasSmartReachAgentAccess or hasSmartReachUserAccess is selected in User Attributes
    // This flags are important as they triggers the process of User/Agent creation in LV Side
    const hasSmartReachAccess = hasSmartReachAgentAccess || hasSmartReachUserAccess;
    let lvEnvironment = smartReachBaseUrl === null || smartReachBaseUrl === void 0 ? void 0 : smartReachBaseUrl.split('.')[0];
    logger.info('ECC - useLVAppSpacePermission', 'Getting LV App Space Permissions');
    // Default to TST2 if the environment is not recognized
    if (!Object.values(LV_ENVS).includes(lvEnvironment)) {
        lvEnvironment = LV_ENVS.TST2;
    }
    return {
        isAgentIntegrationsEnabled: ((_c = userDetails === null || userDetails === void 0 ? void 0 : userDetails.customAttributes) === null || _c === void 0 ? void 0 : _c.agentIntegrations) === 'true',
        // Enhanced Customer Card is enabled (and Desk not enabled) then show ECC in App Space ignoring if Customer Card is checked
        isLvCustomerCardEnabled: Boolean(
        // If smartReachECCAccess is selected in User Attributes and
        smartReachECCAccess &&
            // If SmartReach is enabled for the business unit and Customer Card Feature Toggle is enabled
            isLvCustomerCardFeatureToggleEnabled &&
            hasSmartReachAccess),
        // Desk enabled then show Desk in App Space and as Icon in the "icon bar"
        // and ignore whatever else is checked for ECC and Customer Card
        isLvDeskEnabled: Boolean(
        // If smartReachDeskAccess is selected in User Attributes and
        smartReachDeskAccess &&
            // If SmartReach is enabled for the business unit and Desk Feature Toggle is enabled
            isLvDeskFeatureToggleEnabled &&
            hasSmartReachAccess),
        locale,
        logLevel,
        lvBaseUrl: smartReachBaseUrl,
        lvClientCode: smartReachClientCode,
        lvEnvironment,
    };
}
//# sourceMappingURL=useLVAppSpacePermission.js.map