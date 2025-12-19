import { AgentWorkflowRequestEventRequest } from './agent-workflow-request-event-request';
export interface AgentWorkflowRequestEventType {
    contactId?: string;
    request?: AgentWorkflowRequestEventRequest[];
    /**
     * agent workflow response searchWorkflow
     */
    searchWorkflow?: AgentWorkflowRequestEventRequest[];
    /**
     * agent workflow response timelineWorkflow
     */
    timelineWorkflow?: AgentWorkflowRequestEventRequest[];
    /**  agent workflow response dataMemorializationWorkflow*/
    dataMemorializationWorkflow?: AgentWorkflowRequestEventRequest[];
    payload?: AgentWorkflowRequestEventRequest[];
}
/**
 * Model Class for the AgentWorkflowRequestEvent
 * @example
 * ```
 * const AgentWorkflowRequestEvent = new AgentWorkflowRequestEvent();
 * ```
 */
export declare class AgentWorkflowRequestEvent {
    /**
     * agent workflow contactId
     */
    ContactID: string;
    /**
     * agent workflow response result
     */
    request: AgentWorkflowRequestEventRequest[];
    /**
     * agent workflow response searchWorkflow
     */
    searchWorkflow: AgentWorkflowRequestEventRequest[];
    /**
     * agent workflow response timelineWorkflow
     */
    timelineWorkflow: AgentWorkflowRequestEventRequest[];
    /**
     * agent workflow response dataMemorializationWorkflow
     */
    dataMemorializationWorkflow: AgentWorkflowRequestEventRequest[];
    payload: AgentWorkflowRequestEventRequest[];
    /**
     * used to parse the data
     * @example
     * ```
     * AgentWorkflowRequestEvent.parse(data);
     * ```
     */
    parse(agentWorkflowConfiguration: AgentWorkflowRequestEventType): void;
}
