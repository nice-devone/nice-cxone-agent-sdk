/**
 * Interface used for CXone partner State mapping Fields
 */
interface CXonePartnerStateMapping {
    /**
     * @remarks - Represents the CXone agent state. This field is required.
     */
    cxoneAgentState: string;
    /**
     * @remarks - Represents the partner agent state. This field is required.
     */
    partnerAgentState: string;
}
/**
 * Model class for CXone Partner Presence Sync Rule
 */
export declare class CXonePartnerPresenceSyncRuleMapping {
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
    /**
     * The constructor will take the data object and assign the values to the cxone partner presence sync rule
     * @param data - Data object received
     * @example -
     * ```
     * CXonePartnerPresenceSyncRule.parse(data);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
export {};
