import { AgentWorkflowEventRelatedData } from './agent-workflow-event-related-data';
import { AgentWorkflowEventFieldsData } from './agent-workflow-event-fields-data';
/**
 * Model class for AgentWorkflowEventRecord
 * @example
 * ```
 * const agentWorkflowEventRecord = new AgentWorkflowEventRecord();
 * ```
 */
export declare class AgentWorkflowEventRecord {
    /**
     * CRM type
     */
    type: string;
    /**
     * CRM label
     */
    label: string;
    /**
     * record id
     */
    id: string;
    /**
     * CRM url
     */
    url: string;
    /**
     * display name
     */
    display: string;
    /**
     * CRM title
     */
    title: string;
    /**
     * updated at
     */
    updated: Date;
    /**
     * linkable flag
     */
    linkable: boolean;
    /**
     * Flag to determine if screen pop is required or not
     */
    screenPop: boolean;
    /**
     * CRM related data
     */
    related: AgentWorkflowEventRelatedData[];
    /**
     * CRM fields dynamic data
     */
    fields: AgentWorkflowEventFieldsData[];
    /**
     * Flag to determine if the record may be screen popped before the agent accepts the
     * interaction. Absent means accept is required first.
     */
    screenPopBeforeAccept: boolean;
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventRecord.parse(data);
     * ```
     */
    parse(data: any): void;
}
