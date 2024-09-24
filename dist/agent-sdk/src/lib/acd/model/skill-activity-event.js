import { CXoneEvent } from '@nice-devone/common-sdk';
/**
 * Model class for activity
 */
export class SkillActivityEvent extends CXoneEvent {
    /**
     * @remarks isRestricted
     */
    // public isRestricted: boolean;
    /**
     * This method to parse skill activity response
     * @param data -
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.agentsAvailable = data.agentsAvailable;
        this.agentsUnavailable = data.agentsUnavailable;
        this.agentsLoggedIn = data.agentsLoggedIn;
        this.agentsWorking = data.agentsWorking;
        this.campaignId = data.campaignId;
        this.earliestQueueTime = data.earliestQueueTime;
        this.emailFromAddress = data.emailFromAddress;
        this.contactsHandledInSLA = data.inSLA;
        this.isActive = data.isActive;
        this.isPersonalConnection = data.isNaturalCalling;
        this.isOutbound = data.isOutbound;
        this.mediaTypeId = data.mediaTypeId;
        this.mediaTypeName = data.mediaTypeName;
        this.contactsHandledOutSLA = data.outSLA;
        this.personalQueueCount = data.personalQueueCount;
        this.queueCount = data.queueCount;
        this.serviceLevel = data.serviceLevel;
        this.serviceLevelGoal = data.serviceLevelGoal;
        this.skillId = data.skillId;
        this.skillName = data.skillName;
        this.skillQueueCount = data.skillQueueCount;
        //this.isRestricted = data.isRestricted;
    }
}
//# sourceMappingURL=skill-activity-event.js.map