import { InferType } from 'yup';
export declare const VoiceMailPlayBackEventYup: import("yup/lib/object").OptionalObjectSchema<{
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    playBackPaused: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    playBackPosition: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    iisHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    vcHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    playBackPaused: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    playBackPosition: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    iisHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    vcHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type VoiceMailPlayBackEvent = InferType<typeof VoiceMailPlayBackEventYup>;
