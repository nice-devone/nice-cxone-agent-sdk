import { CXoneDisposition } from '@nice-devone/common-sdk';
import { ValidationUtils } from '@nice-devone/core-sdk';
/**
 * This class to parse api response
 */
export class SkillApiParser {
    constructor() {
        this.validationUtils = new ValidationUtils();
    }
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
    parseAgentSkills(response) {
        const agentSkillAssignments = response.data.agentSkillAssignments;
        const agentSkillLists = [];
        if (this.validationUtils.isNotNullOrEmpty(agentSkillAssignments) && this.validationUtils.isNotNullOrEmptyArray(agentSkillAssignments)) {
            for (let i = 0; i < agentSkillAssignments.length; i++) {
                const respObj = agentSkillAssignments[i];
                if (respObj.isActive && !respObj.isRestricted) {
                    const data = {
                        isOutbound: respObj.isOutbound,
                        strategy: respObj.outboundStrategy,
                        typeId: respObj.mediaTypeId,
                        skillId: respObj.skillId,
                        skillName: respObj.skillName,
                        isNaturalCallingRunning: respObj.isNaturalCallingRunning,
                        isPriorityBlending: respObj.priorityBlending,
                        useACW: respObj.useACW,
                    };
                    agentSkillLists.push(data);
                }
            }
        }
        return agentSkillLists;
    }
    /**
       * Method to parse permissions response
       *
       * @param permissions - permissions response
       * @returns - parsed permissions
       * @example -
       * ```
       * parsePermissions(permissions)
       * ```
       */
    parseAllSkillsList(response) {
        const allSkillAssignments = response.data.skills;
        const allSkillLists = [];
        for (let i = 0; i < allSkillAssignments.length; i++) {
            const respObj = allSkillAssignments[i];
            if (respObj.isActive && !respObj.isRestricted) {
                const data = {
                    skillId: respObj.skillId,
                    skillName: respObj.skillName,
                    mediaTypeId: respObj.mediaTypeId,
                    mediaTypeName: respObj.mediaTypeName,
                    isActive: respObj.isActive,
                    isOutbound: respObj.isOutbound,
                    agentResponseEnabled: respObj.agentResponseEnabled,
                    agentFirstResponseTime: respObj.agentFirstResponseTime,
                    agentFollowOnResponseTime: respObj.agentFollowOnResponseTime,
                    customerResponseEnabled: respObj.customerResponseEnabled,
                    customerIdleTime: respObj.customerIdleTime,
                    timeExtensionEnabled: respObj.timeExtensionEnabled,
                    requireDisposition: respObj.requireDisposition,
                };
                allSkillLists.push(data);
            }
        }
        return allSkillLists;
    }
    /**
       * Used to parse the skill details response from the api response data
       * @param response - http response object from the api
       * @example -
       * ```
       * parseSkillDetails(response);
       * ```
       */
    parseSkillDetails(response) {
        var _a;
        const data = response.data;
        const skills = {};
        skills.skillId = data === null || data === void 0 ? void 0 : data.skillId;
        skills.skillName = data === null || data === void 0 ? void 0 : data.skillName;
        skills.mediaTypeId = data === null || data === void 0 ? void 0 : data.mediaTypeId;
        skills.mediaTypeName = data === null || data === void 0 ? void 0 : data.mediaTypeName;
        skills.workItemQueueType = data === null || data === void 0 ? void 0 : data.workItemQueueType;
        skills.isActive = data === null || data === void 0 ? void 0 : data.isActive;
        skills.campaignId = data === null || data === void 0 ? void 0 : data.campaignId;
        skills.campaignName = data === null || data === void 0 ? void 0 : data.campaignName;
        skills.notes = data === null || data === void 0 ? void 0 : data.notes;
        skills.acwTypeId = data === null || data === void 0 ? void 0 : data.acwTypeId;
        skills.stateIdACW = data === null || data === void 0 ? void 0 : data.stateIdACW;
        skills.stateNameACW = data === null || data === void 0 ? void 0 : data.stateNameACW;
        skills.maxSecondsACW = data === null || data === void 0 ? void 0 : data.maxSecondsACW;
        skills.acwPostTimeoutStateId = data === null || data === void 0 ? void 0 : data.acwPostTimeoutStateId;
        skills.acwPostTimeoutStateName = data === null || data === void 0 ? void 0 : data.acwPostTimeoutStateName;
        skills.requireDisposition = data === null || data === void 0 ? void 0 : data.requireDisposition;
        skills.allowSecondaryDisposition = data === null || data === void 0 ? void 0 : data.allowSecondaryDisposition;
        skills.agentRestTime = data === null || data === void 0 ? void 0 : data.agentRestTime;
        skills.makeTranscriptAvailable = data === null || data === void 0 ? void 0 : data.makeTranscriptAvailable;
        skills.transcriptFromAddress = data === null || data === void 0 ? void 0 : data.transcriptFromAddress;
        skills.displayThankyou = data === null || data === void 0 ? void 0 : data.displayThankyou;
        skills.thankYouLink = data === null || data === void 0 ? void 0 : data.thankYouLink;
        skills.popThankYou = data === null || data === void 0 ? void 0 : data.popThankYou;
        skills.popThankYouURL = data === null || data === void 0 ? void 0 : data.popThankYouURL;
        skills.isOutbound = data === null || data === void 0 ? void 0 : data.isOutbound;
        skills.outboundStrategy = data === null || data === void 0 ? void 0 : data.outboundStrategy;
        skills.isRunning = data === null || data === void 0 ? void 0 : data.isRunning;
        skills.priorityBlending = data === null || data === void 0 ? void 0 : data.priorityBlending;
        skills.callerIdOverride = data === null || data === void 0 ? void 0 : data.callerIdOverride;
        skills.scriptId = data === null || data === void 0 ? void 0 : data.scriptId;
        skills.scriptName = data === null || data === void 0 ? void 0 : data.scriptName;
        skills.emailFromAddress = data === null || data === void 0 ? void 0 : data.emailFromAddress;
        skills.emailFromEditable = data === null || data === void 0 ? void 0 : data.emailFromEditable;
        skills.emailBccAddress = data === null || data === void 0 ? void 0 : data.emailBccAddress;
        skills.emailParking = data === null || data === void 0 ? void 0 : data.emailParking;
        skills.chatWarningThreshold = data === null || data === void 0 ? void 0 : data.chatWarningThreshold;
        skills.agentTypingIndicator = data === null || data === void 0 ? void 0 : data.agentTypingIndicator;
        skills.patronTypingPreview = data === null || data === void 0 ? void 0 : data.patronTypingPreview;
        skills.interruptible = data === null || data === void 0 ? void 0 : data.interruptible;
        skills.callSuppressionScriptId = data === null || data === void 0 ? void 0 : data.callSuppressionScriptId;
        skills.reskillHours = data === null || data === void 0 ? void 0 : data.reskillHours;
        skills.reskillHoursName = data === null || data === void 0 ? void 0 : data.reskillHoursName;
        skills.countReskillHours = data === null || data === void 0 ? void 0 : data.countReskillHours;
        skills.minWFIAgents = data === null || data === void 0 ? void 0 : data.minWFIAgents;
        skills.minWFIAvailableAgents = data === null || data === void 0 ? void 0 : data.minWFIAvailableAgents;
        skills.useScreenPops = data === null || data === void 0 ? void 0 : data.useScreenPops;
        skills.screenPopTriggerEvent = data === null || data === void 0 ? void 0 : data.screenPopTriggerEvent;
        skills.useCustomScreenPops = data === null || data === void 0 ? void 0 : data.useCustomScreenPops;
        skills.screenPopDetail = data === null || data === void 0 ? void 0 : data.screenPopDetail;
        skills.minWorkingTime = data === null || data === void 0 ? void 0 : data.minWorkingTime;
        skills.agentless = data === null || data === void 0 ? void 0 : data.agentless;
        skills.agentlessPorts = data === null || data === void 0 ? void 0 : data.agentlessPorts;
        skills.initialPriority = data === null || data === void 0 ? void 0 : data.initialPriority;
        skills.acceleration = data === null || data === void 0 ? void 0 : data.acceleration;
        skills.maxPriority = data === null || data === void 0 ? void 0 : data.maxPriority;
        skills.serviceLevelThreshold = data === null || data === void 0 ? void 0 : data.serviceLevelThreshold;
        skills.serviceLevelGoal = data === null || data === void 0 ? void 0 : data.serviceLevelGoal;
        skills.enableShortAbandon = data === null || data === void 0 ? void 0 : data.enableShortAbandon;
        skills.shortAbandonThreshold = data === null || data === void 0 ? void 0 : data.shortAbandonThreshold;
        skills.countShortAbandons = data === null || data === void 0 ? void 0 : data.countShortAbandons;
        skills.countOtherAbandons = data === null || data === void 0 ? void 0 : data.countOtherAbandons;
        skills.messageTemplateId = data === null || data === void 0 ? void 0 : data.messageTemplateId;
        skills.smsTransportCodeId = data === null || data === void 0 ? void 0 : data.smsTransportCodeId;
        skills.smsTransportCode = data === null || data === void 0 ? void 0 : data.smsTransportCode;
        skills.dispositions = (_a = data === null || data === void 0 ? void 0 : data.dispositions) === null || _a === void 0 ? void 0 : _a.map((disposition) => {
            const newDis = new CXoneDisposition();
            newDis.parse(disposition);
            return newDis;
        });
        skills.deliverMultipleNumbersSerially = data === null || data === void 0 ? void 0 : data.deliverMultipleNumbersSerially;
        skills.cradleToGrave = data === null || data === void 0 ? void 0 : data.cradleToGrave;
        skills.priorityInterrupt = data === null || data === void 0 ? void 0 : data.priorityInterrupt;
        skills.outboundTelecomRouteId = data === null || data === void 0 ? void 0 : data.outboundTelecomRouteId;
        skills.isRequireManualAccept = data === null || data === void 0 ? void 0 : data.isRequireManualAccept;
        return skills;
    }
}
//# sourceMappingURL=skill-api-parser.js.map