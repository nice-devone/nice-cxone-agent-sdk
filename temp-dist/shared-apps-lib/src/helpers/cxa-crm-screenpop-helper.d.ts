import { AgentWorkflowResponseEvent, WorkflowData, WorkflowExecutePayloadConfig } from '../models/crm-screenpop-helpers';
/**
 * Common helper class to contain shared functions which can be used across apps.
 * @param activityData - The activity data from agent workflow
 * @param action - Optional action parameter
 * @example - triggerCRMScreenPop(screenPopData, 'screenPop');
 */
export declare function triggerCRMScreenPop(activityData: AgentWorkflowResponseEvent, action?: string): void;
/**
 * Common helper class to contain shared functions which can be used across apps.
 * @param param0 - object containing activityData, workflowData and agentId
 * @example - triggerCRMScreenPop(screenPopData);
 */
export declare function triggerEpicScreenPop(params: {
    activityData: AgentWorkflowResponseEvent;
    workflowData: WorkflowData;
    agentId: string;
    executeWorkflow?: (config: WorkflowExecutePayloadConfig) => Promise<void>;
}): void;
export default triggerCRMScreenPop;
