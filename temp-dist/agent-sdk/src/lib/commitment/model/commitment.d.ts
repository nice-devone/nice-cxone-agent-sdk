/**
 * Interface for commitment details request
 */
export interface CommitmentRequest {
    /**
     * @remarks First name of the person requesting a callback
     */
    firstName: string;
    /**
     * @remarks Last name of the person requesting a callback
     */
    lastName: string;
    /**
     * @remarks Any notes for the Scheduled Callback
     */
    notes?: string;
    /**
     * @remarks Phone number to be dialed by Agent
     */
    phoneNumber: string;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    scheduleDate: string;
    /**
     * @remarks Outbound Skill Id to be used for callback
     */
    skillId: number;
    /**
     * @remarks The Agent to which to queue the callback
     */
    targetAgentId: number;
}
/**
 * Interface for commitment details response
 */
export interface CommitmentResponse {
    /**
     * @remarks Scheduled Callback Id
     */
    callbackId: number;
    /**
     * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
     */
    target: string;
    /**
     * @remarks Agent Id. For Type "S" callbacks set with Max, the agent id will be the agent that schedules callback.
     * For Type "S" callbacks set with Thin Agent, the agent id will return "-1".
     */
    agentId: number;
    /**
     * @remarks Outbound Skill Id to be used for callback
     */
    skillId: number;
    /**
     * @remarks Phone number to be dialed by Agent
     */
    dialNumber: string;
    /**
     * @remarks Phone number from which the Scheduled Callback originated
     */
    origNumber: string;
    /**
     * @remarks First name of Agent callback is targeted to
     */
    firstName: string;
    /**
     * @remarks Last name of Agent callback is targeted to
     */
    lastName: string;
    /**
     * @remarks Any notes entered into the Scheduled Callback
     */
    notes: string;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    callbackTime: Date;
}
