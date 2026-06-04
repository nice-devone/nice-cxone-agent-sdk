import { CXoneContact, ContactService, ContactType } from '@nice-devone/agent-sdk';
/**
 * update the class properties for work item
 * @param workItemEvent - work item event
 * @example -
 */
export class CXoneWorkItemContact extends CXoneContact {
    constructor() {
        super(...arguments);
        this.contactService = new ContactService();
    }
    /**
     * @example -
     */
    updateWorkitemControls(workItemEvent) {
        if (workItemEvent) {
            this.updateCurrentWorkitemInfo(workItemEvent);
        }
    }
    /**
     * function that will call the end contact endpoint for the work item
     * @example - complete()
     */
    complete() {
        return new Promise((resolve, reject) => {
            this.contactService.endContact(this.workItemEventData.contactId).then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * Method to transfer a work item contact.
     * @param agentUserName - username of the agent that will receive the transferred contact
     * @example
     * ```
     * transfer('agentUserName');
     * ```
     */
    transfer(agentUserName) {
        const contactId = this.contactID;
        return new Promise((resolve, reject) => {
            this.contactService
                .transferWorkItemContact(contactId, agentUserName)
                .then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * @example -
     */
    updateCurrentWorkitemInfo(workItemInfo) {
        this.workItemEventData = workItemInfo;
        this.type = ContactType.WORKITEM_CONTACT;
        this.skill = workItemInfo.skillId || '';
        this.lastStateChangeTime = workItemInfo.lastStateChangeTime;
        this.finalState = workItemInfo.finalState;
        this.status = workItemInfo.status;
        this.contactID = workItemInfo.contactId;
    }
}
//# sourceMappingURL=cxone-workitem-contact.js.map