/**
 * Class to capture commitment PromiseKeeper event
 */
export declare class CommitmentEvent {
    /**
     * @remarks - Agent Id. For Type "S" callbacks set with Max, the agent id will be the agent that schedules callback.
     *  For Type "S" callbacks set with Thin Agent, the agent id will return "-1".
     */
    agentId: string;
    /**
     * @remarks - ISO 8601 time for callback expire
     */
    callbackExpireTime: string;
    /**
     * @remarks - Scheduled Callback Id
     */
    callbackId: string;
    /**
     * @remarks - ISO 8601 time requested for Scheduled Callback
     */
    callbackTime: string;
    /**
     * @remarks - Rescheduled time which is reschedules for 10 minutes if we are not responded commitment
     */
    deliveryTime: string;
    /**
     * @remarks - Phone number to be dialed by Agent
     */
    dialNumber: string;
    /**
     * @remarks - First name of Agent callback is targeted to
     */
    firstName: string;
    /**
    * @remarks - Last name of Agent callback is targeted to
    */
    lastName: string;
    /**
     * @remarks - Any notes entered into the Scheduled Callback
     */
    notes: string;
    /**
     * @remarks - Phone number from which the Scheduled Callback originated
     */
    origNumber: string;
    /**
     * @remarks - Outbound Skill Id to be used for callback
     */
    skillId: string;
    /**
     * @remarks - Targeted type - Agent or Skill
     */
    targetType: string;
    /**
     * This method to parse promise keeper event data
     * @param data -
     * @example -
     * ```
     *parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
