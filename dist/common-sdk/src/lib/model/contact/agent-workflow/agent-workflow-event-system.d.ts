/**
 * Model class for AgentWorkflowEventSystem
 * @example
 * ```
 * const agentWorkflowEventSystem = new AgentWorkflowEventSystem();
 * ```
 */
export declare class AgentWorkflowEventSystem {
    /**
     * CRM type
     */
    type: string;
    /**
     * CRM label
     */
    label: string;
    /**
     * CRM icon
     */
    icon: string;
    /**
     * CRM icon
     */
    baseUrl: string;
    /**
     * CRM configuration ID — populated by the Multi-CRM search lambda when the backend
     * can attribute a result to a specific CRM configuration. Optional because live
     * (non-cached) responses may omit this field.
     */
    configurationId?: string;
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventSystem.parse(data);
     * ```
     */
    parse(data: any): void;
}
