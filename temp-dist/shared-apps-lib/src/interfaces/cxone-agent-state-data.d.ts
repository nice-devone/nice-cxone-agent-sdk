/**
 * An object holding basic properties of CXone Agent State
 */
export interface CXoneAgentStateData {
    /**
     * @remarks state of the agent
     * */
    state: string;
    /**
     * @remarks reason for the state
     * */
    reason: string;
    /**
     * @remarks is after call work required
     * */
    isACW?: boolean;
    /**
     * @remarks start time for agent state
     * */
    startTime: 0;
    /**
     * @remarks after call work timeout
     * */
    acwTimeout: 0;
    /**
     * @remarks state of the agent
     */
    cxoneState: string;
}
