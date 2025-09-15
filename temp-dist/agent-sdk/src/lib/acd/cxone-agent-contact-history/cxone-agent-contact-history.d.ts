import { agentCompletedContactsResponse, CXoneTag, MediaType } from '@nice-devone/common-sdk';
/**
 * Interface for contact history index db arguments
 * @param acdContactDetails - Call contact event for voice call, voicemail or workitem details
 * @param mediaType - media type of the contact
 * @param icAgentId - agent id of logged in agent
 * @param dispositionData - disposition data filled into dispo slice
 * @example - ContactHistoryIndexDBArgs
 */
export interface ContactHistoryIndexDBArgs {
    acdContactDetails: any;
    mediaType: MediaType;
    icAgentId: string;
    dispositionData: {
        primaryDispositionId: number;
        dispositionNotes: string;
        tags: CXoneTag[];
    };
}
/**
 * Class to manage agent contact history
 */
export declare class CXoneAgentContactHistory {
    /**
     * Method to get acd contact history data from index db
     * @returns - acdContactHistoryData
     * @example - getACDContactHistoryData()
     *
     */
    getACDContactHistoryData(): Promise<{
        [contactId: string]: import("yup/lib/object").AssertsShape<{
            agentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            contactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            dispositionNotes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            fromAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            lastUpdateTime: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            mediaType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            teamId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            toAddr: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isOutbound: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contactStart: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            totalDurationSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            tags: any;
            primaryDispositionId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        }>;
    }>;
    /**
     * Method to create and return contact history object
     * @param acdContactDetails - voice call, voicemail or workitem details
     * @param mediaType - media type of the contact
     * @param icAgentId - agent id
     * @returns - contact history object
     * @example - createContactHistoryObject(contactHistoryIndexDBArgs)
     *
     */
    createContactHistoryObject(args: ContactHistoryIndexDBArgs): {
        contactId: any;
        agentId: string;
        skillId: any;
        skillName: any;
        teamId: string;
        isOutbound: boolean;
        firstName: string;
        lastName: string;
        mediaType: string;
        lastUpdateTime: string;
        contactStart: string;
        totalDurationSeconds: number;
        fromAddr: string;
        toAddr: string;
        primaryDispositionId: number;
        dispositionNotes: string;
        tags: {
            TagName: string;
        }[];
    };
    /**
     * Method to set acd contact history data for completed contact
     * @param contactHistoryData - contact history data to be set in index DB
     * @example - setACDContactHistoryData(contactHistoryData)
     *
     */
    setACDContactHistoryData(contactHistoryData: {
        [contactId: string]: agentCompletedContactsResponse;
    }): Promise<void>;
    /**
     * Method to clear contact history data
     * @example - clearContactHistoryData()
     *
     */
    clearContactHistoryData(): Promise<void>;
}
