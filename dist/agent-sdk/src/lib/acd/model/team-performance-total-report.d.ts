/**
 * Performance attributes for all teams
 */
export interface TeamPerformance {
    /**
     * @remarks teamId: The unique, system-generated ID assigned to each Team
     */
    teamId: number;
    /**
     * @remarks agentOffered: The number of Inbound and Outbound Contacts offered to Agents of the team between the "startDate" and "endDate".
     */
    agentOffered: number;
    /**
     * @remarks inboundHandled:  The number of Inbound contacts handled by Agents of the team between the "startDate" and "endDate".
     */
    inboundHandled: number;
    /**
     * @remarks inboundTime: The number of Inbound contacts handled by Agents of the team between the "startDate" and "endDate".
     */
    inboundTime: string;
    /**
     * @remarks inboundTalkTime: The length of time that Agents of the team spent talking to contacts. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    inboundTalkTime: string;
    /**
     * @remarks inboundAvgTalkTime:     The Average Talk Time for all Inbound contacts handled by Agents of the team. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    inboundAvgTalkTime: string;
    /**
     * @remarks outboundHandled:     The number of outbound contacts handled by the team between the "startDate" and "endDate".
     */
    outboundHandled: number;
    /**
     * @remarks outboundTime: The length of time that Agents of the team spent handling Outbound contacts. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    outboundTime: string;
    /**
     *@remarks outboundTalkTime: The length of time that Agents of the team spent handling Outbound contacts. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    outboundTalkTime: string;
    /**
     * @remarks outboundAvgTalkTime: The Average Talk Time for all outbound contacts handled by Agents of the team. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    outboundAvgTalkTime: string;
    /**
     * @remarks totalHandled: The total number of contacts handled by Agents of the team
     */
    totalHandled: number;
    /**
     * @remarks totalAvgHandled: The total number of contacts handled by Agents of the team
     */
    totalAvgHandled: number;
    /**
     * @remarks totalTalktime: The length of time that Agents of the team spent talking to contacts on Inbound and Outbound calls. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    totalTalkTime: string;
    /**
     * @remarks totalAvgTalkTime: The average length of time that Agents of the team spent speaking with contacts, including hold times and conference times. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    totalAvgTalkTime: string;
    /**
     * @remarks totalAvgHandleTime: The average length of time it took Agents of the team to handle Inbound and Outbound Contact.
     * This is a 'Generic' term used to refer to Inbound Average Handle Time plus Outbound Average Handle Time
     */
    totalAvgHandleTime: string;
    /**
     * @remarks consultTime: The length of time that Agents of the team spent speaking with other agents or supervisors. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    consultTime: string;
    /**
     * @remarks availableTime:The length of time that Agents of the team were available, waiting for Contacts to arrive or be delivered. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    availableTime: string;
    /**
     * @remarks unavailableTime: The length of time that Agents of the team spent in an unavailable state and unable to handle another Contact. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    unavailableTime: string;
    /**
     * @remarks avgAvailableTime: The average length of time that Agents of the team were available, waiting for Contacts to arrive or be delivered. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    avgAvailableTime: string;
    /**
     * @remarks avgUnavailableTime: The average length of time that Agents of the team spent in an unavailable state and unable to handle another Contact. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    avgUnavailableTime: string;
    /**
     * @remarks acwTime: The length of time that agents of the team spent doing after call work. The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    acwTime: string;
    /**
     * @remarks refused: The number of Contacts refused by Agents of the team.
     *  */
    refused: number;
    /**
     * @remarks percentRefused: The percentage of total contacts offered to Agents of the team that the Agents never answered
     */
    percentRefused: number;
    /**
     * @remarks loginTime: The length of time that Agents of the team are logged into the system between the "startDate" and "endDate". The duration time is in the ISO 8601 Durations format. The value "PT0S" means 0 seconds
     */
    loginTime: string;
    /**
     * @remarks workingRate:The percentage of total login time for the Agents of the team when they were either available or actively handling contacts
     */
    workingRate: number;
    /**
     * @remarks occupancy:The percentage of time Agents of the team spend handling contacts versus the waiting time for contacts to arrive. This is also known as "Agent Utilization"
     */
    occupancy: number;
}
/**
 * Oustates attributes for ProductivityOutStates
 */
export interface ProductivityOutStates {
    /**
   * @remarks outStateName:The name of the substate "
   */
    outStateName: string | number;
    /**
     * @remarks outStateDuration:Total duration agent has spend being on respective substate "
     */
    outStateDuration: string | number;
    /**
     * @remarks outStateBarPercentage: Percenatge number of duration agent has spent being on a substate of total login Time "
     */
    outStateBarPercentage: number;
}
/**
  * attributes for ProductivityReport
  */
export interface ProductivityReport {
    /**
  * @remarks stateName:The name of the state ex: Available/Working/Unavailable "
  */
    stateName: string;
    /**
  * @remarks stateAgentPercentage: Percentage of the duration for the state agent spend his time on to total login time"
  */
    stateAgentPercentage: number;
    /**
   * @remarks stateTeamPercentage: Percentage of the duration for the state team spend time on to total login time"
   */
    stateTeamPercentage: number;
    /**
    * @remarks stateTeamDuration: Total duration an team has spent being on a specified state"
    */
    stateTeamDuration: string;
    /**
    * @remarks stateAgentDuration: Total duration an agent has spent being on a specified state"
    */
    stateAgentDuration: string;
    /**
   * @remarks subStates: oustates such as InConsult/OutConsult/Lunch/acw states etc. for productivity states like available/working/Unavailable based on the agentStateId
   */
    subStates: ProductivityOutStates[];
}
/**
* Formatted object to display in UI for PerformanceReport
*/
export interface PerformanceReport {
    /**
    * @remarks channelType: The name of the channel type ex: inbound/outbound "
    */
    channelType: string;
    /**
    * @remarks you: Number of inbound/outbound calls handled by an agent"
    */
    yourCount: number;
    /**
    * @remarks team: Number of inbound/outbound calls handled by the team"
    */
    teamCount: number;
    /**
    * @remarks percentage: Percentage of inbound/outbound calls handled by an agent with the team"
    */
    percentage: number;
}
/**
 * Modal for Performance metrics for all teams
 */
export declare class TeamPerformanceResponse {
    teamPerformanceTotal: {
        (arrayLength: number): TeamPerformance[];
        (...items: TeamPerformance[]): TeamPerformance[];
        new (arrayLength: number): TeamPerformance[];
        new (...items: TeamPerformance[]): TeamPerformance[];
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
    parse(data: TeamPerformanceResponse): void;
}
