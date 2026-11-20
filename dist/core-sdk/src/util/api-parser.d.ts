import { BusinessUnit } from '../lib/admin/model/business-unit';
import { Permissions } from '../lib/admin/model/permissions';
import { CentralBrandingProfile } from '../lib/admin/model/central-branding-profile';
import { BrandingProfile, BrandingProfileV2 } from '../lib/admin/model/branding-profile';
import { HttpResponse } from '@nice-devone/common-sdk';
import { AgentSettings } from '../lib/admin/model/agent-settings';
import { Tenant } from '../lib/admin/model/tenant';
import { AgentProfileSettings } from '../lib/admin/model/agent-profile-settings';
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
     * Method to derive Business Unit details from tenant licenses, used when the business-unit api fails
     *
     * @param tenantData - Tenant data from /tenants/v2/current, or null when it is unavailable
     * @returns - Business Unit with multi contact handling assumed and features taken from the tenant licenses
     * @example -
     * ```
     * parseBusinessUnitFromTenantData(tenantData)
     * ```
     */
    parseBusinessUnitFromTenantData(tenantData: Tenant | null): BusinessUnit;
    /**
     * This method to check Agent Profile Data and get desired configuration
     *
     * @param settings  - Agent Profile Data
     * @returns - configuration data
     * @example -
     * ```
     * parseAgentConfiguration(AgentProfileResponse)
     * ```
     */
    parseAgentConfiguration(AgentProfileResponse: HttpResponse): AgentProfileSettings;
    /**
     * This method to parse Desktop Profile Response and return configuration
     *
     * @param desktopProfileResponse  - Desktop Profile Response
     * @returns - configuration data
     * @example -
     * ```
     * parseDesktopProfileConfiguration(desktopProfileResponse)
     * ```
     */
    parseDesktopProfileConfiguration(desktopProfileResponse: HttpResponse): AgentProfileSettings;
    /**
     * Strictly parses a Desktop Profile boolean string, anything other than 'true'/'false' is treated as not configured
     *
     * @param value - Desktop Profile element value
     * @returns - parsed boolean, or undefined when the value is missing or malformed
     * @example -
     * ```
     * parseDesktopProfileBoolean('true')
     * ```
     */
    private parseDesktopProfileBoolean;
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
     * Method to parse CXone Branding Profile V2 (`/branding-profiles/v2/current`) response
     *
     * @param settings  - CXoneBrandingProfileV2 response
     * @returns - parsed CXone Branding Profile V2
     * @example -
     * ```
     * parseBrandingProfileV2(brandingProfileResponse)
     * ```
     */
    parseBrandingProfileV2(brandingProfileResponse: HttpResponse): BrandingProfileV2;
    /**
     * Maps a V2 branding profile (`/branding-profiles/v2/current`) onto the legacy V1
     * `BrandingProfile` shape, per the field-name mapping in the UH-77537 version
     * comparison table (e.g. `headerLogoUrl` -\> `cxoneLoginHeaderLogoUrl`,
     * `squareIconUrl` -\> `cxoneFaviconUrl`). Used so existing V1 consumers keep working
     * unchanged when the Lyra feature toggle routes `getBrandingProfile()` to the V2 API.
     * @param brandingProfileV2 - parsed V2 branding profile
     * @returns - the equivalent V1-shaped branding profile
     * @example -
     * ```
     * mapBrandingProfileV2ToV1(brandingProfileV2)
     * ```
     */
    mapBrandingProfileV2ToV1(brandingProfileV2: BrandingProfileV2): BrandingProfile;
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
