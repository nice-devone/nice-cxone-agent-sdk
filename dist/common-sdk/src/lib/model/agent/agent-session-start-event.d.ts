import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model class for agent session start event
 */
export declare class AgentSessionStartEvent extends CXoneAgentEvent {
    /**
     * @remarks -
     */
    busNo: string;
    /**
     * @remarks -
     */
    agentId: string;
    /**
     * @remarks -
     */
    stationId: string;
    /**
     * @remarks -
     */
    stationPhoneNumber: string;
    /**
     * @remarks -
     */
    stationCallerId: string;
    /**
     * @remarks -
     */
    sessionId: string;
    /**
     * @remarks -
     */
    dialerCampaign: string;
    /**
     * @remarks -
     */
    dialerCampaignStartTime: Date;
    /**
     * @remarks -
     */
    supervisorPermissionLevel: number;
    /**
     * @remarks -
     */
    canMask: boolean;
    /**
     * @remarks -
     */
    agentSchedulePermission: string;
    /**
     * @remarks -
     */
    scoreRecordingsPermission: boolean;
    /**
     * @remarks -
     */
    hideAgentStatePermission: string;
    /**
     * @remarks -
     */
    clientConnectorPort: number;
    /**
     * @remarks -
     */
    canMultiPartyConference: boolean;
    /**
     * @remarks -
     */
    maxConcurrentChats: number;
    /**
     * @remarks -
     */
    canRecord: boolean;
    /**
     * @remarks -
     */
    enabledForMCH: boolean;
    /**
     * @remarks -
     */
    useCustomerCard: boolean;
    /**
     * @remarks -
     */
    agentUUId: string;
    /**
     * @remarks -
     */
    entityMode: boolean;
    /**
     * @remarks - port no. that will be used to connect to screen agent
     */
    screenAgentPort: number;
    /**
     * The parse method will take the data object and assign the values to the AgentSessionStartEvent class properties
     * @param data - Data object received
     * @example -
     * ```
     *parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
