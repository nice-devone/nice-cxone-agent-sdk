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
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventSystem.parse(data);
     * ```
     */
    parse(data: any): void;
}
