import { BusinessUnit } from '../lib/admin/model/business-unit';
import { Permissions } from '../lib/admin/model/permissions';
import { CentralBrandingProfile } from '../lib/admin/model/central-branding-profile';
import { BrandingProfile } from '../lib/admin/model/branding-profile';
import { HttpResponse } from '@nice-devone/common-sdk';
import { AgentSettings } from '../lib/admin/model/agent-settings';
import { Tenant } from '../lib/admin/model/tenant';
/**
 * This class to parse api response
 */
export declare class ApiParser {
    /**
       * Method to parse agent permissions response
       *
       * @param permissions - permissions response
       * @returns - parsed permissions
       * @example -
       * ```
       * parsePermissions(permissions)
       * ```
       */
    parsePermissions(response: HttpResponse): Permissions[];
    /**
     * Method to parse Agent settings response
     *
     * @param settings  - AgentSettings response
     * @returns - parsed Agent settings
     * @example -
     * ```
     * parseAgentSettings(settings)
     * ```
     */
    parseAgentSettings(settings: HttpResponse): AgentSettings;
    /**
     * Method to parse Business Unit response
     *
     * @param settings  - BusinessUnit response
     * @returns - parsed Business Unit
     * @example -
     * ```
     * parseBusinessUnit(businessUnitResponse)
     * ```
     */
    parseBusinessUnit(businessUnitResponse: HttpResponse): BusinessUnit;
    /**
     * Method to parse Central Branding Profile response
     *
     * @param settings  - CentralBrandingProfile response
     * @returns - parsed Central Branding Profile
     * @example -
     * ```
     * parseCentralBrandingProfile(centralBrandingProfileResponse)
     * ```
     */
    parseCentralBrandingProfile(centralBrandingProfileResponse: HttpResponse): CentralBrandingProfile;
    /**
     * Method to parse CXone Branding Profile response
     *
     * @param settings  - CXoneBrandingProfile response
     * @returns - parsed CXone Branding Profile
     * @example -
     * ```
     * parseBrandingProfile(brandingProfileResponse)
     * ```
     */
    parseBrandingProfile(brandingProfileResponse: HttpResponse): BrandingProfile;
    /**
     * Method to parse Tenant Data response
     *
     * @param tenantDataRepsonse  - Tenant Data response
     * @returns - parsed Tenant Data
     * @example -
     * ```
     * parseTeneantData(tenantDataRepsonse)
     * ```
     */
    parseTenantData(tenantDataRepsonse: HttpResponse): Tenant;
}
