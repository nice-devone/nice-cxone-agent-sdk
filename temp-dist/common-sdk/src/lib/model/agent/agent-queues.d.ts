import { CXoneEvent } from './cxone-event';
/**
 * Class to capture agent queues API
 */
export declare class Queue extends CXoneEvent {
    /**
     * @remarks - Unique identifier for business unit(Tenant)
     */
    businessUnitId: number;
    /**
     * @remarks - Unique identifier for Skill
     */
    skillId: number;
    /**
     * @remarks - Name of Skill
     */
    skillName: string;
    /**
     * @remarks - Unique identifier for Campaign
     */
    campaignId: number;
    /**
     * @remarks - Type of Media
     */
    mediaType?: number;
    /**
     * @remarks - Channel Number
     */
    channelNo?: number;
    /**
     * @remarks - Channel name
     */
    channelName?: string;
    /**
     * @remarks - Total count of the contact
     */
    queueCount: number;
    /**
     * @remarks - Longest queue time
     */
    longestQueueTimeInSeconds: string;
    /**
     * @remarks - Earliest queue time
     */
    earliestQueueTimeInUTC: Date;
    /**
     * @remarks - Unique identifier for Agent
     */
    agentId: number;
    /**
     * This method to parse agent queue data
     * @param data - Agent queues data
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
export interface AgentQueues {
    [key: string]: Queue;
}
