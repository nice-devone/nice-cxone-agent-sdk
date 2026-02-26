import { CXoneContactData } from './cxone-contact-data';
/**
 * An object holding properties of CXone Voice Contact
 */
export interface CXoneVoiceContactData extends CXoneContactData {
    /**
     * @remarks MasterContactId 64bit number
     * */
    masterContactId?: string;
    /**
     * @remarks One of the options: Regular, PersonalConnection, Consult, PersonalQueue,
     * */
    contactType?: string;
    /**
     * @remarks  Customer's Identity for Inbound (ANI)
     * */
    ani?: string;
    /**
     * @remarks  Customer's Identity for Outbound (DNIS)
     * */
    dnis?: string;
    /**
     * @remarks   Call / Screen recording url
     * */
    recordingUrl?: string;
    /**
     * @remarks   OPTIONAL, Tags selected by agent (comma separated strings)
     * */
    tags?: [string];
    /**
     * @remarks  Timestamp of contact started in ISO-8061 format
    * */
    startTime?: Date;
    /**
     * @remarks  Timestamp of last status changed in ISO-8601 format
     * */
    endTime?: Date;
    /**
     * @remarks - Script Variable Payload
     * */
    scriptVariables?: {
        [key: string]: string;
    };
    /**
     * @remarks - Duration in seconds indicating the total time the interaction remained active.
     * */
    callDurationInSeconds?: number | string;
    /**
     * @remarks - Whether the contact is Inbound or not
     * */
    isInbound?: boolean;
}
