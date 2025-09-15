import { AgentWorkflowEventFieldsData } from './agent-workflow-event-fields-data';
/**
 * Model class for AgentWorkflowEventPinRecords
 * @example
 * ```
 * const AgentWorkflowEventPinRecords = new AgentWorkflowEventPinRecords();
 * ```
 */
export declare class AgentWorkflowEventPinRecords {
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
     * CRM Data Memo
     */
    dataMemo: string;
    /**
     * CRM linkable flag
     */
    linkable: boolean;
    /**
     * CRM linked flag to maintain linked data for CT & DM
     */
    linked: string;
    /**
     * Flag to determine if screen pop is required or not
     */
    screenPop: boolean;
    /**
     * CRM fields dynamic data
     */
    fields: AgentWorkflowEventFieldsData[];
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * AgentWorkflowEventPinRecords.parse(data);
     * ```
     */
    parse(data: any): void;
}
/**
 * Interface for managing the flags for Agent workflow response get next event received or not
 */
export interface agentWorkflowResponseEvent {
    contactId: string;
    isConfigAvailable: boolean;
}
/**
 * Interface for managing the flags for Agent workflow config get next event received or not
 */
export interface agentWorkflowConfigurationEvent {
    contactId: string;
    isAgentWFConfigAvailable: boolean;
}
