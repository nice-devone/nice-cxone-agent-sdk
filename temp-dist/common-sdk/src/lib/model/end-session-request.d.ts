export interface EndSessionRequest {
    /**
     * @remarks boolean values that forces agent to end session
     */
    forceLogoff: boolean;
    /**
     * @remarks boolean value indicating if an existing contact should end
     */
    endContacts: boolean;
    /**
     * @remarks boolean indicating the agent session to end, regardless of the personal queue
     */
    ignorePersonalQueue: boolean;
}
