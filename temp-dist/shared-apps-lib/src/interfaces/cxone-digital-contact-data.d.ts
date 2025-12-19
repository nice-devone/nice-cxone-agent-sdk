import { CXoneContactData } from './cxone-contact-data';
/**
 * An object holding properties of CXone Digital Contact
 */
export interface CXoneDigitalContactData extends CXoneContactData {
    /**
     * @remarks Digital Channel type (Email, Chat, SMS, WhatsApp, Facebook ...)
     * */
    channelType?: string;
    /**
     * @remarks Digital Channel name
     * */
    channelName?: string;
    /**
     * @remarks  Customer's Identity for Inbound
     * */
    from?: string;
    /**
     * @remarks  Customer's Identity for Outbound
     * */
    to?: string;
    /**
     * @remarks Type of websocket events received
     * */
    eventType?: string;
    /**
     * @remarks Customer's Name
     * */
    customerName?: string;
    /**
     * contact start time
     */
    startTime?: Date;
    /**
     * contact end time
     * */
    endTime?: Date;
    /**
   * @remarks - flag to differential case assignment or transfer
   */
    isCaseAssigned?: boolean;
    /**
   * @remarks - Recording Url of the contact
   */
    recordingUrl?: string;
    /**
   * @remarks - Script Variable Payload
   * */
    scriptVariables?: {
        [key: string]: string;
    };
    /**
     * @remarks - Duration in seconds indicating the total time the Digital interaction remained active.
     * */
    callDurationInSeconds?: number | string;
}
