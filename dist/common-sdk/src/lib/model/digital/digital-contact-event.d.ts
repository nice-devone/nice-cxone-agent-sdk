import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model Class for the DigitalContactEvent
 */
export declare class DigitalContactEvent extends CXoneAgentEvent {
    /**
     * @remarks - The channel type for digital contact.
     */
    channelType: string;
    /**
     * @remarks - The unique contact ID for this contact. This will be unique on the CXone platform.
     * use this field for accept/reject contact.
     */
    contactId: string;
    /**
     * @remarks - Name of the customer who has initiated the digital contact.
     */
    customerName: string;
    /**
     * @remarks - The identifier of case in digital platform of a digital contact.
     * This is id field in case object (case`->`id) in Digital and `DFOContactId` in ACD getNextEvent.
     */
    digitalCaseId: string;
    /**
     * @remarks - Time in seconds after which the digital contact will get refused.
     */
    refusalTimeout: number;
    /**
     * @remarks - Name of the skill to which the digital contact was routed.
     */
    skill: string;
    /**
     * @remarks -  A Date value that is an ISO8601-formatted date/time that shows when the contact started. Tenant time zone?
     */
    startTime: Date;
    /**
     * @remarks -  A Date value that is an ISO8601-formatted date/time that shows when the contact started. This will always be in UTC time.
     */
    startTimeUtc: Date;
    /**
     * @remarks - Current status of the digital contact
     */
    status: string;
    /**
     * @remarks - A string that indicates the contact type.
     */
    type: string;
    /**
     * The parse method will take the data object and assign the values to the DigitalContactEvent class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
