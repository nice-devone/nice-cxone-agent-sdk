/**
 * Performance metrics for all agents
 */
export interface AgentPerformance {
    /**
     * @remarks agentId: The unique, system-generated ID assigned to each agent
     */
    agentId: number;
    /**
     * @remarks teamId:The unique, system-generated ID assigned to each Team
     */
    teamId: number;
    /**
     * @remarks agentOffered: The number of Contacts offered to the Agent
     */
    agentOffered: number;
    /**
     * @remarks inboundHandled: The number of inbound calls handled by the Agent
     */
    inboundHandled: number;
    /**
     * @remarks inboundTime: The length of time that the Agent spent on inbound calls
     */
    inboundTime: string;
    /**
     * @remarks : inboundTalkTime: The total combined time that all Agents spent talking to
     * contacts on inbound calls
     */
    inboundTalkTime: string;
    /**
     * @remarks inboundAvgTalkTime: The average time per inbound call for the Agent
     */
    inboundAvgTalkTime: string;
    /**
     * @remarks outboundHandled: Number of outbound calls the Agent handled
     */
    outboundHandled: number;
    /**
     * @remarks outboundTime: The length of time that the Agent spent handling
     * all outbound calls
     */
    outboundTime: string;
    /**
     * @remarks outboundTalkTime:The total combined time that all Agents spent talking to
     * contacts on outbound calls
     */
    outboundTalkTime: string;
    /**
     * @remarks outboundAvgTalkTime: The average time per outbound call the Agent
     * spent talking to contacts
     */
    outboundAvgTalkTime: string;
    /**
     * @remarks totalHandled:Number of calls handled by agent
     */
    totalHandled: number;
    /**
     * @remarks The total length of time the Agent spent talking to contacts on inbound and outbound calls
     */
    totalTalkTime: string;
    /**
     * @remarks totalAvgTalkTime: The average time Agents spent talking to contacts,
     * including hold time and conference time
     */
    totalAvgTalkTime: string;
    /**
     * @remarks totalAvgHandleTime: The average time the Agent spent handling all calls
     */
    totalAvgHandleTime: string;
    /**
     * @remarks consultTime:The length of time that the Agent spent in consult state
     */
    consultTime: string;
    /**
     * @remarks availableTime: The length of time that the Agent spent in the available state
     */
    availableTime: string;
    /**
     * @remarks unavailableTime: The length of time that the Agent spent in the unavailable state
     */
    unavailableTime: string;
    /**
     * @remarks acwTime:The length of time that the Agent spent
     * in the after call work (acw) state
     */
    acwTime: string;
    /**
     * @remarks refused: The total number of calls refused by the Agent
     */
    refused: number;
    /**
     * @remarks percentRefused: The percent of total contacts offered to the Agent
     */
    percentRefused: number;
    /**
     * @remarks loginTime: The length of time the Agent was logged into the system
     */
    loginTime: string;
    /**
     * @remarks workingRate: Percentage of total login time the Agent was available or actively handling Contacts
     */
    workingRate: number;
    /**
     * @remarks occupancy: The percent time the Agent was in the (talk/acw) work state
     */
    occupancy: number;
}
/**
 * Model for Agent Performance Report
 */
export declare class AgentPerformanceResponse {
    /**
     * @remarks Performance attributes of agent
     */
    agentPerformance: {
        (arrayLength: number): AgentPerformance[];
        (...items: AgentPerformance[]): AgentPerformance[];
        new (arrayLength: number): AgentPerformance[];
        new (...items: AgentPerformance[]): AgentPerformance[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
    };
    /**
     * Function to parse the response from API to model
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: AgentPerformanceResponse): void;
}
