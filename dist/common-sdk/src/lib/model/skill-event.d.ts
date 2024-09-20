import { CXoneEvent } from './agent/cxone-event';
/**
 * Model class for skill
 */
export declare class SkillEvent extends CXoneEvent {
    /**
     * @remarks  Media type number
     */
    mediaType: number;
    /**
     * @remarks  Media type name of the channel like Chat, email, call etc..
     */
    mediaName: string;
    /**
     * @remarks  Indicates if skill is in ACTIVE state
     */
    isActive: boolean;
    /**
     * @remarks  Indicates if the skill is an outbound Skill
     */
    isOutbound: boolean;
    /**
     * @remarks  ISO 8601 timestamp of last database poll. Value should be passed in "updatedSince" parameter on next call
     */
    lastPollTime: Date;
    /**
     * @remarks  Time of last record update
     */
    lastUpdateTime: Date;
    /**
     * @remarks  ID of Skill
     */
    skillId: string;
    /**
     * @remarks  Name of Skill
     */
    skillName: string;
    /**
     * This method to parse skill data
     * @param data - key value pair data
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
