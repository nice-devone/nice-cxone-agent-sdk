import { AgentWorkflowEventRecord } from '../contact/agent-workflow/agent-workflow-event-record';
import { AgentWorkflowEventSystem } from '../contact/agent-workflow/agent-workflow-event-system';
/**
 * Interface used as a Model for Response JSON
 * @returns returns - CRM search Response
 * ```
 * @example
 * Array<CXoneCRMSearchRequest>
 * ```
 */
interface CXoneCRMSearch {
    result: {
        records: [];
        system: {
            baseUrl: string;
            icon: string;
            label: string;
            type: string;
        };
    };
}
export declare type CXoneCRMSearchResponse = CXoneCRMSearch;
export interface AgentWorkflowSearchResponse {
    contactId: string;
    result: CXoneAgentWorkflowEventResult[];
}
export interface CXoneAgentWorkflowEventResult {
    system: AgentWorkflowEventSystem;
    records: AgentWorkflowEventRecord[];
}
export declare type CXoneAgentWorkflowSearchResponse = AgentWorkflowSearchResponse;
export {};
