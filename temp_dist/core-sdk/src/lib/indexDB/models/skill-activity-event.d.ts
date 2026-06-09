import { CXoneEvent } from '@nice-devone/common-sdk';
/**
 * Model class for activity
 */
export declare class SkillActivityEvent extends CXoneEvent {
    /**
     * @remarks  Count of available agents
     */
    agentsAvailable: number;
    /**
     * @remarks Count of unavailable agents
     */
    agentsUnavailable: number;
    /**
     * @remarks  Count of logged in agents
     */
    agentsLoggedIn: number;
    /**
     * @remarks  Count of working agents
     */
    agentsWorking: number;
    /**
     * @remarks  Unique identifier for Campaign
     */
    campaignId: number;
    /**
     * @remarks  EarliestQueueTime
     */
    earliestQueueTime: string;
    /**
     * @remarks  Agent Email Address
     */
    emailFromAddress: string;
    /**
     * @remarks  The number of contacts agents handled inside the specified service level threshold
     */
    contactsHandledInSLA: number;
    /**
     * @remarks  Indicates if agent is in Active state
     */
    isActive: boolean;
    /**
     * @remarks  Indicates if the Skill is Personal Connection
     */
    isPersonalConnection: boolean;
    /**
     * @remarks  Indicates whether the call is an Outbound or inbound.
     */
    isOutbound: boolean;
    /**
     * @remarks  Unique identifier for the type of media, chat is "3", phone is "4"
     */
    mediaTypeId: number;
    /**
     * @remarks  Name of media type
     */
    mediaTypeName: string;
    /**
     * @remarks  The number of contacts agents handled outside the specified service level threshold
     */
    contactsHandledOutSLA: number;
    /**
     * @remarks  Numbers of items in personal queue
     */
    personalQueueCount: number;
    /**
     * @remarks  Number of items in queue
     */
    queueCount: number;
    /**
     * @remarks  Service level set for the contact
     */
    serviceLevel: number;
    /**
     * @remarks  The minimum service level set by user per contact type
     */
    serviceLevelGoal: number;
    /**
     * @remarks Unique identifier for skill
     */
    skillId: number;
    /**
     * @remarks Name of the skill
     */
    skillName: string;
    /**
     * @remarks Number of skills in queue
     */
    skillQueueCount: number;
    /**
     * @remarks isRestricted
     */
    /**
     * This method to parse skill activity response
     * @param data -
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
