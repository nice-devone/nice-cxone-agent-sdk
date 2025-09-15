/**
 * Declare Central Branding Profile Details
 */
export interface CentralBrandingProfile {
    profileId: number;
    profileName: string;
    brandName: string;
    adminEmail: string;
    active: boolean;
    subdomain: string;
    stylePackName: string;
    clientStyleName: string;
    description: string;
    coBrand: boolean;
    centralLogo: string;
    centralFavicon: string;
    agentLogo: string;
    chatLogo: string;
    sfdcAgentLogo: string;
    maxAgentLogo: string;
    maxGlanceLogo: string;
    supervisorLogo: string;
}
