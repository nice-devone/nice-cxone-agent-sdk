import { AgentWorkflowEventFieldsData } from './agent-workflow-event-fields-data';
/**
 * Model class for AgentWorkflowEventRelatedData
 * @example
 * ```
 * const agentWorkflowEventRelatedData = new AgentWorkflowEventRelatedData();
 * ```
 */
export declare class AgentWorkflowEventRelatedData {
    /**
     * related object display name
     */
    display: string;
    /**
     * related object id
     */
    id: string;
    /**
     * related object label
     */
    label: string;
    /**
     * related object state
     */
    state: string;
    /**
     * related object priority
     */
    priority: string;
    /**
     * related object type
     */
    type: string;
    /**
     * related object title
     */
    title: string;
    /**
     * related object url
     */
    url: string;
    /**
     * related object assigned to
     */
    assignedTo: string;
    /**
     * related object updatedAt
     */
    updatedAt: Date;
    /**
     * linkable flag
     */
    linkable: boolean;
    /**
     * CRM fields dynamic data
     */
    fields: AgentWorkflowEventFieldsData[];
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventRelatedData.parse(data);
     * ```
     */
    parse(data: any): void;
}
