import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { HttpResponse } from '@nice-devone/common-sdk';
import { amdOverrideType } from '../enum/amd-override-type';
/**
 * Class to handling contact services
 */
export declare class ContactService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private acdSession;
    private TRANSFER_WORK_ITEM_SKILL;
    /**
     * @example
     * ```
     * const contactSvc = new ContactService();
     * ```
     */
    constructor();
    /**
     * Used to set the contact status to active
     * @param contactId -  contact id
     * @example
     * ```
     * activateContact(23423423);
     * ```
     */
    activateContact(contactId: string): Promise<HttpResponse>;
    /**
     * Accept the incoming contact
     * @param contactId -  contact id
     * @example
     * ```
     * acceptContact(23423423);
     * ```
     */
    acceptContact(contactId: string): Promise<HttpResponse>;
    /**
     * Accept the incoming contact for consult
     * @param contactId -  contact id
     * @example
     * ```
     * acceptConsultContact(23423423);
     * ```
     */
    acceptConsultContact(contactId: string): Promise<HttpResponse>;
    /**
     * Reject the incoming contact
     * @param contactId -  contact id
     * @example
     * ```
     * rejectContact(23423423);
     * ```
     */
    rejectContact(contactId: string): Promise<HttpResponse>;
    /**
     * Override AMD
     * @param contactId -  contact id
     * @param type - 'answeringMachine' | 'faxMachine' | 'badMachine'
     * @example
     * ```
     * amdOverride(23423423, 'answeringMachine')
     * ```
     */
    amdOverride(contactId: string, type: amdOverrideType): Promise<HttpResponse>;
    /**
     * End the contact
     * @param contactId -  contact id
     * @example
     * ```
     * endContact(23423423);
     * ```
     */
    endContact(contactId: string): Promise<HttpResponse>;
    /**
     *  Method to transfer work item contact
     *
     *  @example -
     * ```
     * transferWorkItemContact("123", "234");
     * ```
     */
    transferWorkItemContact(contactId: string, agentUserName: string): Promise<HttpResponse>;
    /**
     *  Method to transfer work item contact to a skill
     *
     *  @example -
     * ```
     * transferWorkItemContact("123", "skill name");
     * ```
     */
    transferWorkItemSkill(contactId: string, skillName: string): Promise<HttpResponse>;
    /**
     * This method to override answering machine.
     * This should be used when a call is in active state
     * @param contactId -  contact id
     * @param type - 'faxMachine' | 'badNumber'
     * @example
     * ```
     * answeringMachineOverride(23423423)
     * ```
     */
    answeringMachineOverride(contactId: string, type: amdOverrideType): Promise<HttpResponse>;
}
