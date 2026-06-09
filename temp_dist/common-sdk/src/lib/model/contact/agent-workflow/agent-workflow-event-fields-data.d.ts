/**
* Interface for Workflow field dynamic data to be parsed for customer card
*/
interface WorkflowFieldsData {
    name: string;
    label: string;
    value: string;
}
/**
 * Model class for AgentWorkflowEventFieldsData
 * @example
 * ```
 * const agentWorkflowEventFieldsData = new AgentWorkflowEventFieldsData();
 * ```
 */
export declare class AgentWorkflowEventFieldsData {
    /**
     * name of workflow event field
     */
    name: string;
    /**
     * label of workflow event field
     */
    label: string;
    /**
     * value of workflow event field
     */
    value: string;
    /**
     * Used to parse Workflow field dynamic data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventFieldsData.parse(data);
     * ```
     */
    parse(data: WorkflowFieldsData): void;
}
export {};
