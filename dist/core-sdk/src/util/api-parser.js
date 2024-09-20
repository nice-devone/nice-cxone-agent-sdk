import { PermissionKeys } from '@nice-devone/common-sdk';
/**
 * This class to parse api response
 */
export class ApiParser {
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
    parsePermissions(response) {
        var _a, _b;
        const data = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.permissions;
        const ACS_PERMISSION = (_b = PermissionKeys.ACS) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        const keys = [
            'agentsfsoftphone',
            'recordcontact',
            'masking',
            'muteagent',
            'multipartyconferencing',
            'hideagentidentityinfo',
            'hideagentcallerid',
            'hideagentphonenumber',
            'agentsoftphone',
            'agentphone',
            'agentstation',
            'agentsoftphoneautoaccept',
            'hidecreatecommitments',
            'hideinboundhangup',
            'cxoneagent',
            'desearchcases',
            'desearchmessages',
            'desearchcustomers',
            'desearchposts',
            ACS_PERMISSION
        ];
        const permission = [];
        for (let i = 0; i < keys.length; i++) {
            data.forEach((record) => {
                if (record.Key.toLowerCase() === keys[i]) {
                    permission.push({ key: record.Key, value: record.Value });
                }
            });
        }
        return permission;
    }
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
    parseAgentSettings(settings) {
        const data = settings.data;
        const agentSettings = {
            cxaClientVersion: data === null || data === void 0 ? void 0 : data.cxaClientVersion,
            webRTCType: data.webRTCType,
            webRTCWssUrls: data.webRTCWSSUrls,
            webRTCServerDomain: data.webRTCServerDomain,
            webRTCIceUrls: data.webRTCICEUrls,
            webRTCDnis: data.webRTCDNIS,
            deleteCommitmentString: data.deleteCommitmentString,
            persistentPanels: data.persistentPanels,
            dataDogAppID: data.CXADataDogAppID,
            dataDogClientToken: data.CXADataDogClientToken,
            dataDogSampleRate: data.DataDogSampleRate,
            maxConferenceParties: data.maxConferenceParties,
            vqmIntegratedSoftphoneMonitoring: data.VQMIntegratedSoftPhoneMonitoring,
            vqmMonitoringKey: data.VQMMonitoringKey,
            enableUIQueue: data.EnableUIQueue,
            irisNoiseCancellationKey: data.irisNoiseCancellationKey,
        };
        return agentSettings;
    }
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
    parseBusinessUnit(businessUnitResponse) {
        const data = businessUnitResponse.data;
        const businessUnit = {
            features: data.businessUnits[0].features,
            maxConference: data.businessUnits[0].maxConferenceParties,
            fileExtList: data.businessUnits[0].fileExtensions,
            isMultiContactHandling: data.businessUnits[0].isMultiContactHandling,
            isUnifiedRoutingEnabled: data.businessUnits[0].isUnifiedRoutingEnabled,
        };
        return businessUnit;
    }
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
    parseCentralBrandingProfile(centralBrandingProfileResponse) {
        const data = centralBrandingProfileResponse.data;
        const centralBrandingProfile = {
            profileId: data.profileId,
            profileName: data.profileName,
            brandName: data.brandName,
            adminEmail: data.adminEmail,
            active: data.active,
            subdomain: data.subdomain,
            stylePackName: data.stylePackName,
            clientStyleName: data.clientStyleName,
            description: data.description,
            coBrand: data.coBrand,
            centralLogo: data.centralLogo,
            centralFavicon: data.centralFavicon,
            agentLogo: data.agentLogo,
            chatLogo: data.chatLogo,
            sfdcAgentLogo: data.sfdcAgentLogo,
            maxAgentLogo: data.maxAgentLogo,
            maxGlanceLogo: data.maxGlanceLogo,
            supervisorLogo: data.supervisorLogo,
        };
        return centralBrandingProfile;
    }
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
    parseBrandingProfile(brandingProfileResponse) {
        const data = brandingProfileResponse.data.brandingProfile;
        const brandingProfile = {
            profileId: data.profileId,
            profileName: data.profileName,
            description: data.description,
            brandName: data.brandName,
            systemEmail: data.systemEmail,
            hostName: data.hostName,
            status: data.status,
            coBrand: data.coBrand,
            cxoneLoginBgColor: data.cxoneLoginBgColor,
            cxoneHeaderIconTextColor: data.cxoneHeaderIconTextColor,
            maxStylePackName: data.maxStylePackName,
            supervisorStylePackName: data.supervisorStylePackName,
            marketingEnabled: data.marketingEnabled,
            marketingUrl: data.marketingUrl,
            partnerDefaultBP: data.partnerDefaultBP,
            cxoneLoginHeaderLogoUrl: data.cxoneLoginHeaderLogoUrl,
            cxoneEmailFormLogoUrl: data.cxoneEmailFormLogoUrl,
            cxoneFaviconUrl: data.cxoneFaviconUrl,
            maxGlanceBarExpLogoUrl: data.maxGlanceBarExpLogoUrl,
            maxGlanceBarCollLogoUrl: data.maxGlanceBarCollLogoUrl,
            supervisorLogoUrl: data.supervisorLogoUrl,
            sfdcLogoUrl: data.sfdcLogoUrl,
            fetchTime: new Date(),
        };
        return brandingProfile;
    }
}
//# sourceMappingURL=api-parser.js.map