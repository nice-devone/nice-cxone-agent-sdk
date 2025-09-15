import { InferType } from 'yup';
/**
 * @returns work item event yup object
 * @example
 */
export declare const WorkItemContactEventYup: import("yup/lib/object").OptionalObjectSchema<{
    agentId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customData: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    closePopoutUponTermination: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    iisHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    inFocus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    lastStateChangeTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    masterId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    omniGroupId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    parenContactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    popDestination: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    popoutWindowHeight: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    popoutWindowWidth: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    refusalTimeout: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    startTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    tabTitle: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    vcHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    workItemId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    workItemPayload: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    workItemType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sessionId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    agentId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    customData: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    closePopoutUponTermination: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    iisHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    inFocus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    lastStateChangeTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    masterId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    omniGroupId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    parenContactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    popDestination: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    popoutWindowHeight: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    popoutWindowWidth: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    refusalTimeout: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    startTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    tabTitle: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    vcHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    workItemId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    workItemPayload: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    workItemType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sessionId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type WorkItemContactEvent = InferType<typeof WorkItemContactEventYup>;
