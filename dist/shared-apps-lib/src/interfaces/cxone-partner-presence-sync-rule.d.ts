/**
 * Interface used for Agent State Fields
 */
export interface CXonePartnerStateMapping {
    /**
     * @remarks - Represents the inContact agent state. This field is required.
     */
    cxoneAgentState: string;
    /**
     * @remarks - Represents the partner agent state. This field is required.
     */
    partnerAgentState: string;
}
/**
 * Interface used for Presence sync rules
 */
export interface CXonePartnerPresenceSyncRule {
    /**
     * @remarks - Map of publisher states.
     * Each entry is an object conforming to AgentStateFields.
     */
    publisherStateMapping: CXonePartnerStateMapping[];
    /**
     * @remarks - Map of subscriber states.
     * Each entry is an object conforming to AgentStateFields.
     */
    subscriberStateMapping: CXonePartnerStateMapping[];
}
