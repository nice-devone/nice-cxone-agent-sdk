import { AgentWorkflowResponseEvent } from '../models/crm-screenpop-helpers';
/**
 * Reads the `screenPopBeforeAccept` parameter the search workflow sets on a record. The
 * parameter is optional and opt-in - a record without it may only be shown once the agent
 * has accepted the interaction. Studio stores the flag as a string, so both forms are
 * accepted here.
 * @param record - record from the agent workflow payload
 * @returns true when the record may be shown before the agent accepts
 * @example - isScreenPopBeforeAcceptFlagged(pinRecord);
 */
export declare function isScreenPopBeforeAcceptFlagged(record?: {
    screenPopBeforeAccept?: boolean | string;
}): boolean;
/**
 * Keeps only the first CRM result of a workflow response. With the multi-CRM toggle OFF the
 * legacy customer card renders only `result[0]`, and `triggerCRMScreenPop` popped only that
 * result before multi-CRM. It now pops every result, so legacy callers pass the response through
 * this first - otherwise a script with two CRM instances pops records the agent cannot see.
 * @param activityData - The activity data from agent workflow
 * @returns the same response holding only its first CRM result
 * @example - triggerCRMScreenPop(limitToFirstCrmResult(activityData));
 */
export declare function limitToFirstCrmResult(activityData: AgentWorkflowResponseEvent): AgentWorkflowResponseEvent;
/**
 * Common helper function to contain shared functions which can be used across apps.
 * @param activityData - The activity data from agent workflow
 * @param action - Optional action parameter
 * @param isBeforeAccept - true when the pop is happening while the contact is still
 * ringing. Only records the workflow flagged `screenPopBeforeAccept` pop in that case;
 * every other record pops once the agent accepts.
 * @param alreadyPoppedRecordIds - ids of the records that already popped for this contact
 * while it was ringing. Those records are skipped on the post-accept pop so the agent is not
 * sent to the same CRM page twice. Every other record - flagged or not - pops as before.
 * @returns ids of the records that were screen popped
 * @example - triggerCRMScreenPop(screenPopData, 'screenPop');
 */
export declare function triggerCRMScreenPop(activityData: AgentWorkflowResponseEvent, action?: string, isBeforeAccept?: boolean, alreadyPoppedRecordIds?: string[]): string[];
export default triggerCRMScreenPop;
