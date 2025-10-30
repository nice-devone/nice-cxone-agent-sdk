import { PermissionKeys } from '@nice-devone/common-sdk';
import { AgentProfileConfigurationSettings } from '../enum/agent-profile-configurations';
import { Logger } from '../logger/logger';
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
        var _a, _b, _c, _d, _e;
        const data = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.permissions;
        const ACS_PERMISSION = (_b = PermissionKeys.ACS) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        const HIDE_CALLER_NUMBER_PERMISSION = (_c = PermissionKeys.HIDE_CALLER_PHONE_NUMBER) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        const DISABLE_INTEGRATED_SOFTPHONE_SETTINGS = (_d = PermissionKeys.DISABLE_INTEGRATED_SOFTPHONE_SETTINGS) === null || _d === void 0 ? void 0 : _d.toLowerCase();
        const REALTIME_RECORDING_STATUS_UPDATE_SETTING = (_e = PermissionKeys.REALTIME_RECORDING_STATUS_UPDATE) === null || _e === void 0 ? void 0 : _e.toLowerCase();
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
            'voicetranscript',
            ACS_PERMISSION,
            HIDE_CALLER_NUMBER_PERMISSION,
            DISABLE_INTEGRATED_SOFTPHONE_SETTINGS,
            REALTIME_RECORDING_STATUS_UPDATE_SETTING
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
            selectedCxaVersion: data === null || data === void 0 ? void 0 : data.selectedCxaVersion,
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
     * This method to check Agent Profile Data and get desired configuration
     *
     * @param settings  - Agent Profile Data
     * @returns - configuration data
     * @example -
     * ```
     * parseAgentConfiguration(AgentProfileResponse)
     * ```
     */
    parseAgentConfiguration(AgentProfileResponse) {
        var _a;
        const logger = new Logger('AgentProfileUtils', 'CXoneSession');
        const agentProfileResponse = AgentProfileResponse === null || AgentProfileResponse === void 0 ? void 0 : AgentProfileResponse.data;
        const configuration = {
            agentScreenSize: '',
            hideContactHistory: true,
            hideSearch: true,
            hideQueueCounter: true,
            hideSchedule: true,
            hideWEM: true,
            hideLaunch: true,
            hideCustomWorkspace: true,
            hideReporting: true,
            hideConversations: true,
        };
        const mapping = {
            [AgentProfileConfigurationSettings.CONTACT_HISTORY]: (value) => (configuration.hideContactHistory = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.SEARCH]: (value) => (configuration.hideSearch = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.QUEUE_COUNTER]: (value) => (configuration.hideQueueCounter = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.SCHEDULE]: (value) => (configuration.hideSchedule = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.WEM]: (value) => (configuration.hideWEM = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.LAUNCH]: (value) => (configuration.hideLaunch = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.CUSTOM_WORKSPACE]: (value) => (configuration.hideCustomWorkspace = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.REPORTING]: (value) => (configuration.hideReporting = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.CONVERSATIONS]: (value) => (configuration.hideConversations = !JSON.parse(value)),
            [AgentProfileConfigurationSettings.DEFAULT_SCREEN_SIZE]: (value) => (configuration.agentScreenSize = value),
        };
        (_a = agentProfileResponse === null || agentProfileResponse === void 0 ? void 0 : agentProfileResponse.agentProfileConfigurations) === null || _a === void 0 ? void 0 : _a.forEach((config) => {
            const updateConfig = mapping[config.subCategoryName];
            if (updateConfig) {
                updateConfig(config.value[0]);
            }
            else {
                logger.error('Unhandled Agent Profile Configuration: ', config.subCategoryName);
            }
        });
        return configuration;
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
    parseTenantData(tenantDataRepsonse) {
        const data = tenantDataRepsonse.data.tenant;
        const tenantData = {
            tenantId: data.tenantId,
            tenantName: data.tenantName,
            schemaName: data.schemaName,
            parentId: data.parentId,
            partnerId: data.partnerId,
            source: data.source,
            creationDate: data.creationDate,
            expirationDate: data.expirationDate,
            status: data.status,
            type: data.type,
            timezone: data.timezone,
            customerType: data.customertype,
            clusterId: data.clusterId,
            billingId: data.billingId,
            billingCycle: data.billingCycle,
            billingTelephoneNumber: data.billingTelephoneNumber,
            metaData: data.metadata,
            licenses: data.licenses,
            userSoftLimit: data.userSoftLimit,
            brandingProfileId: data.brandingProfileId,
            presenceSyncEnabled: data.presenceSyncEnabled,
            directorySyncEnabled: data.directorySyncEnabled,
            platformVersion: data.platformVersion,
            presenceSyncVersionDetails: data.presenceSyncVersionDetails,
            presenceSyncSettingDetails: data.presenceSyncSettingDetails,
            availableForDeletion: data.availableForDeletion,
            tenantDeletionInfo: data.tenantDeletionInfo,
            errorCode: data.errorCode,
            tenantFlowCheck: data.tenantFlowCheck,
            markedForDeletion: data.markedForDeletion,
            applicationUserDetails: data.applicationUserDetails,
            hasProcessRights: data.hasProcessRights,
            processingStartDate: data.processingStartDate,
            systemType: data.systemType,
            partnerName: data.partnerName,
            templateId: data.templateId,
            templateVersion: data.templateVersion,
            disableImpersonateAndSupport: data.disableImpersonateAndSupport,
            disableImpersonateAndConfigure: data.disableImpersonateAndConfigure,
            converted: data.converted,
            modificationDate: data.modificationDate,
            tenantBusinessOwner: data.tenantBusinessOwner,
            lineOfBusiness: data.lineOfBusiness,
            owner: data.owner,
            segmentationEnabled: data.segmentationEnabled,
            adjustViewsLimitEnabled: data.adjustViewsLimitEnabled,
        };
        return tenantData;
    }
}
//# sourceMappingURL=api-parser.js.map