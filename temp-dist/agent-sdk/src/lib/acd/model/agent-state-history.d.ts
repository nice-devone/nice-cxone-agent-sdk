/**
 * Attributes for Agent State History Response
 */
export interface AgentStateHistory {
    /**
     * @remarks stateIndex: Cardinal order of states for the Agent.
     * A step-by-step accounting of the different states that
     * the Agent was in throughout their shift.
     */
    stateIndex: number;
    /**
     * @remarks startDate: The ISO 8601 formatted time that the state change took place,
     * based on the UTC time zone
     */
    startDate: string;
    /**
     * @remarks contactId: Add contact ID
     */
    contactId: string;
    /**
     * @remarks agentId: This is a unique, system-generated ID assigned to each Agent
     */
    agentId: number;
    /**
     * @remarks agentStateId: Numeric identifier for the agent state
     */
    agentStateId: string | number;
    /**
     * @remarks agentStateName: The name of state for the Agent
     */
    agentStateName: string;
    /**
     * @remarks agentSessionId: The session ID created when the agent logs in, and ends when they log out
     */
    agentSessionId: number;
    /**
     *@remarks skillId: The unique, system-generated ID of the skill
     */
    skillId: number;
    /**
     * @remarks skillName: The text description of the skill. It displays the name assigned to the skill
     */
    skillName: string;
    /**
     * @remarks mediaTypeId: The numeric ID of the Media Type.
     * It will be one of the following values: 1, 2, 3, 4, 5, 6, 7, 8, 9
     */
    mediaTypeId: number;
    /**
     * @remarks mediaTypeName: The name of the Media Type
     */
    mediaTypeName: string;
    /**
     * @remarks fromAddress: The ANI, email, or chat address of the source Contact
     */
    fromAddress: string;
    /**
     * @remarks toAddress: The DNIS, email, or chat address of the destination Contact
     */
    toAddress: string;
    /**
     * @remarks outStateId: ID of the OutState if the agent state is "Unavailable"
     */
    outStateId: number;
    /**
     * @remarks outStateDescription: The descpription of the OutState or Unavailable Code
     */
    outStateDescription: string;
    /**
     * @remarks duration: The number of seconds that the Agent was in the state.
     * Changed duration field in milliseconds (ISO-8601 format).
     */
    duration: string;
    /**
     * @remarks isOutbound: True or False, indicates if the Contact is outbound
     */
    isOutbound: boolean;
    /**
     * @remarks isNaturalCalling: True or False, indicates if the Contact is NaturalCalling
     */
    isNaturalCalling: boolean;
    /**
     * @remarks stationId: The unique, system-generated ID of the Station used by the Agent when logging in
     */
    stationId: number;
    /**
     * @remarks stationName: The name of Station used by Agent when logging in
     */
    stationName: string;
    /**
     * @remarks teamNo: The unique, system-generated ID assigned to each Team.
     */
    teamNo: number;
}
/**
 * Modal for Agent State History Report
 */
export declare class AgentStateHistoryResponse {
    agentStateHistory: {
        (arrayLength: number): AgentStateHistory[];
        (...items: AgentStateHistory[]): AgentStateHistory[];
        new (arrayLength: number): AgentStateHistory[];
        new (...items: AgentStateHistory[]): AgentStateHistory[];
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
    parse(data: AgentStateHistoryResponse): void;
}
