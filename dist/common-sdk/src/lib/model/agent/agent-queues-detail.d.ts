import { CXoneApiPerformanceMetrics } from '../api-network-performance';
import { CXoneEvent } from './cxone-event';
/**
 * Class to parse agent queues contact detail
 */
export declare class AgentQueuesDetail extends CXoneEvent {
    /**
     * @remarks - Unique identifier for agent
     */
    agentId: number;
    /**
     * @remarks - Unique identifier for business unit(Tenant)
     */
    businessUnitId: number;
    /**
     * @remarks - Name of the Campaign
     */
    campaignName: string;
    /**
     * @remarks - Unique identifier for Campaign
     */
    campaignId: number;
    /**
     * @remarks - Unique identifier for contact
     */
    contactId: string;
    /**
     * @remarks -
     */
    contactStateCode: number;
    /**
     * @remarks -
     */
    currentContactState?: string;
    /**
     * @remarks - first name of contact
     */
    firstName: string;
    /**
     * @remarks - from address
     */
    fromAddr: string;
    /**
     * @remarks - last name of contact
     */
    lastName: string;
    /**
     * @remarks - last update time for the contact
     */
    lastUpdateTime: Date;
    /**
     * @remarks - Unique identifier for master contact
     */
    masterContactId?: number;
    /**
     * @remarks - Unique identifier for interaction
     */
    interactionId?: number;
    /**
     * @remarks - Name of media
     */
    mediaName?: string;
    /**
     * @remarks - Type of media
     */
    mediaType?: number;
    /**
     * @remarks - Channel number
     */
    channelNo?: number;
    /**
     * @remarks - Channel Name
     */
    channelName?: string;
    /**
     * @remarks - Name of Skill
     */
    skillName: string;
    /**
     * @remarks - Unique identifier for Skill
     */
    skillId: number;
    /**
     * @remarks - Start date of contact
     */
    startDate: Date;
    /**
     * @remarks - Name of Team
     */
    teamName: string;
    /**
     * @remarks - Unique identifier for agent
     */
    teamId: number;
    /**
     * @remarks - to address
     */
    toAddr: string;
    /**
     * This method to parse agent queues contact detail data
     * @param data - Agent queues contact detail
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
/**
 * Interface for Agent queue detail response
 */
export interface AgentQueuesDetailResponse {
    /**
    * @remarks - Object of api network performance metrics
    */
    apiPerformanceMetrics: CXoneApiPerformanceMetrics;
    /**
     * @remarks - object with info of agentQueuesDetail and last poll time
     */
    resultSet: {
        contacts: AgentQueuesDetail[];
        lastPollTime: string;
    };
}
