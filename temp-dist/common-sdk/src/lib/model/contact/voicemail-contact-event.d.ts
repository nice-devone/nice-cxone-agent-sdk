import { InferType } from 'yup';
/**
 * Used to transform the value to null if the value is an empty string
 * @param currentValue -
 * @param originalValue -
 * @example
 */
export declare const VoiceMailContactEventYup: import("yup/lib/object").OptionalObjectSchema<{
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdDate: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    customData: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    fileDuration: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    fileName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    from: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInbound: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    masterID: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    omniGroupId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    parentContactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    requireDisposition: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    skill: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    to: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    voiceMailType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdDate: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    customData: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    fileDuration: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    fileName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    from: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isInbound: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    masterID: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    omniGroupId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    parentContactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    requireDisposition: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    skill: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    to: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    voiceMailType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type VoiceMailContactEvent = InferType<typeof VoiceMailContactEventYup>;
