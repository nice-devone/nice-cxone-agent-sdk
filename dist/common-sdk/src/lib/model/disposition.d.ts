import { InferType } from 'yup';
import { MediaType } from '../../enum/media-type';
/**
 * Disposition Model class
 */
export declare class CXoneDisposition {
    /**
     * @remarks Disposition Id
     */
    dispositionId: number;
    /**
     * @remarks Disposition Name
     */
    dispositionName: string;
    /**
     * @remarks Defines the order of display for the Agent
     */
    displayOrder?: number;
    /**
     * @remarks Disposition Classification
     */
    classification?: string;
    /**
     * @remarks Group that contacts can be reported against
     */
    reportingGroup?: string;
    /**
     * @remarks Final outcome of the Contact
     */
    systemOutcome?: string;
    /**
     * @remarks Indicates if commitment amount must be entered
     */
    requireCommitmentAmount?: boolean;
    /**
     * @remarks Indicates if reschedule date must be entered
     */
    requireRescheduleDate?: boolean;
    /**
     * @remarks Indicates if Disposition is unique to Agent
     */
    agentSpecific?: boolean;
    /**
     * @remarks List Only Preview Dispositions
     */
    isPreviewDisposition?: boolean;
    /**
     * @remarks
     */
    priority?: number;
    /**
     * @remarks Contact ID for the current dispositions
     */
    contactId?: string;
    /**
     * @remarks media type added to avoid race condition popping up on dispositions
     */
    mediaType?: MediaType;
    /**
     * Used to parse the disposition data
     * @param data - data to be parsed
     * @example -
     * ```
     * disposition.parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
export declare const CXoneTagYup: import("yup/lib/object").OptionalObjectSchema<{
    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    tagId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    tagName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    isActive: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    notes: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneTag = InferType<typeof CXoneTagYup>;
export interface TagsResponse {
    skillId: number;
    contactId: string;
    tags: CXoneTag[];
}
export declare const DispositionConstants: {
    DISPOSITION: string;
    NOTES: string;
    AMOUNT: string;
};
export declare const CXoneSavedDispositionResponse: import("yup/lib/object").OptionalObjectSchema<{
    dispositionId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    dispositionName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    notes: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    dispositionedByAgendId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    lastUpdated: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    dispositionId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    dispositionName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    notes: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    dispositionedByAgendId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    lastUpdated: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type CXoneSavedDisposition = InferType<typeof CXoneSavedDispositionResponse>;
export declare const CXoneAutoSummary: import("yup/lib/object").OptionalObjectSchema<{
    triggerReason: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    appType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    eventTime: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    mediaType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    masterId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    agentUUId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    triggerReason: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    appType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    eventTime: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    mediaType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    masterId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    agentUUId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneAutoSummaryPayload = InferType<typeof CXoneAutoSummary>;
