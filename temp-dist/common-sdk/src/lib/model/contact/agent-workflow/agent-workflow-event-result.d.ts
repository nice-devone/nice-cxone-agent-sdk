import { AgentWorkflowEventPinRecords } from './agent-workflow-event-pinrecords';
import { AgentWorkflowEventRecord } from './agent-workflow-event-record';
import { AgentWorkflowEventSystem } from './agent-workflow-event-system';
/**
 * Model class for AgentWorkflowEventResult
 * @example
 * ```
 * const agentWorkflowEventResult = new AgentWorkflowEventResult();
 * ```
 */
export declare class AgentWorkflowEventResult {
    /**
     * CRM system
     */
    system: AgentWorkflowEventSystem;
    /**
     * CRM records
     */
    records: AgentWorkflowEventRecord[];
    /**
     * CRM pin records
     */
    pinRecords?: AgentWorkflowEventPinRecords[];
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventResult.parse(data);
     * ```
     */
    parse(data: any): void;
}
