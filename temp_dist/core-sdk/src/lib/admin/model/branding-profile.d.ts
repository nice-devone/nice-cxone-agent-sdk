/**
 * Declare CXone Branding Profile Details
 *
 * Fields -
 *  profileId - Profile ID
 *  profileName - Profile Name
 *  description - Profile Description
 *  brandName - Brand Name
 *  systemEmail - System Email
 *  hostName - Host Name
 *  status - Profile Status
 *  coBrand - Flag to indicate if co branding is enabled
 *  cxoneLoginBgColor - CXone Login Background Color
 *  cxoneHeaderIconTextColor - CXone Header Icon Text Color
 *  maxStylePackName -
 *  supervisorStylePackName -
 *  marketingEnabled - Flag to indicate if Marketing is enabled
 *  marketingUrl - Marketing URL
 *  partnerDefaultBP -
 *  cxoneLoginHeaderLogoUrl - URL of CXone Login Header Logo
 *  cxoneEmailFormLogoUrl - URL of CXone Email Form Logo
 *  maxGlanceBarExpLogoUrl -
 *  maxGlanceBarCollLogoUrl -
 *  supervisorLogoUrl - URL of Supervisor Logo
 *  sfdcLogoUrl - URL of SFDC Logo
 *  fetchTime - Time When API is called;
 *
 */
export interface BrandingProfile {
    profileId: string;
    profileName: string;
    description: string;
    brandName: string;
    systemEmail: string;
    hostName: string;
    status: string;
    coBrand: boolean;
    cxoneLoginBgColor: string;
    cxoneHeaderIconTextColor: string;
    maxStylePackName: string;
    supervisorStylePackName: string;
    marketingEnabled: string;
    marketingUrl: string;
    partnerDefaultBP: boolean;
    cxoneLoginHeaderLogoUrl: string;
    cxoneEmailFormLogoUrl: string;
    cxoneFaviconUrl: string;
    maxGlanceBarExpLogoUrl: string;
    maxGlanceBarCollLogoUrl: string;
    supervisorLogoUrl: string;
    sfdcLogoUrl: string;
    fetchTime: Date;
}
