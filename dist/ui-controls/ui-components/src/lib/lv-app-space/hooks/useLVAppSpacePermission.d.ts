declare enum LV_ENVS {
    TST2 = "tst2",
    TST3 = "tst3",
    STAGING = "stg4",
    EU1 = "eu1",
    NA6 = "na6",
    NA5 = "na5",
    NA4 = "na4",
    NA3 = "na3"
}
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
export default function useLVAppSpacePermission(): {
    isAgentIntegrationsEnabled: boolean;
    isLvCustomerCardEnabled: boolean;
    isLvDeskEnabled: boolean;
    locale: string;
    logLevel: any;
    lvBaseUrl: string;
    lvClientCode: string;
    lvEnvironment: LV_ENVS;
};
export {};
