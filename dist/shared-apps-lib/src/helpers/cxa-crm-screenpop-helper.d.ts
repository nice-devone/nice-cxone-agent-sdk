import { AgentWorkflowResponseEvent } from '../models/crm-screenpop-helpers';
/**
 * Common helper class to contain shared functions which can be used across apps.
 * @param activityData - The activity data from agent workflow
 * @param action - Optional action parameter
 * @example - triggerCRMScreenPop(screenPopData, 'screenPop');
 */
export declare function triggerCRMScreenPop(activityData: AgentWorkflowResponseEvent, action?: string): void;
export default triggerCRMScreenPop;
