/**
 * Interface used as a Model for Response JSON for Agent Contact History
 * @returns returns - Agent Contact History Data
 * ```
 * @example
 * Array<AgentVoiceContactHistoryResponse>
 * ```
 */
import { InferType } from 'yup';
export declare const completedContactsArray: import("yup/lib/object").OptionalObjectSchema<{
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
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
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
}>>;
export declare type agentCompletedContactsResponse = InferType<typeof completedContactsArray>;
export declare const completedContactsArrayReponse: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
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
}>>[]>;
