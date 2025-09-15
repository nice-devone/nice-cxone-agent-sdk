import { AgentWorkflowEventResult } from './agent-workflow-event-result';
/**
 * Model Class for the AgentWorkflowResponseEvent
 * ```
 * const agentWorkflowResponseEvent = new AgentWorkflowResponseEvent();
 * ```
 */
export declare class AgentWorkflowResponseEvent {
    /**
     * agent workflow contactId
     */
    contactId: string;
    /**
     * agent workflow response result
     */
    result: AgentWorkflowEventResult[];
    /**
     * used to parse the data
     * @example
     * ```
     * agentWorkflowResponseEvent.parse(data);
     * ```
     */
    parse(data: any): void;
}
/**
 * Interface for the CustomEvent details
 */
export interface CustomEventDetails {
    /**
     * Contact Id
     */
    contactId?: string;
    /**
     * Flag to check if custom event received or not
     */
    isCustomEventReceived?: boolean;
    /**
     * Is screen pop happened incase of custom event not received
     */
    isScreenPopInitiated?: boolean;
}
