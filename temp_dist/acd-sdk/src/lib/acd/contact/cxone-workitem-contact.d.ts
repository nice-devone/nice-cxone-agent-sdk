import { CXoneSdkError, HttpResponse, WorkItemContactEvent } from '@nice-devone/common-sdk';
import { CXoneContact } from '@nice-devone/agent-sdk';
/**
 * update the class properties for work item
 * @param workItemEvent - work item event
 * @example -
 */
export declare class CXoneWorkItemContact extends CXoneContact {
    workItemEventData: WorkItemContactEvent;
    private contactService;
    /**
     * @remarks - represent model for last state change time
     */
    lastStateChangeTime: Date;
    /**
     * @remarks - represent model for final state
     */
    finalState: boolean;
    /**
     * @example -
     */
    updateWorkitemControls(workItemEvent?: WorkItemContactEvent): void;
    /**
     * function that will call the end contact endpoint for the work item
     * @example - complete()
     */
    complete(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to transfer a work item contact.
     * @param agentUserName - username of the agent that will receive the transferred contact
     * @example
     * ```
     * transfer('agentUserName');
     * ```
     */
    transfer(agentUserName: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * @example -
     */
    private updateCurrentWorkitemInfo;
}
