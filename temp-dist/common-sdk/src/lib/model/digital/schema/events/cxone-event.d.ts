import { InferType } from 'yup';
export declare const CXoneEventSchema: import("yup/lib/object").OptionalObjectSchema<{
    eventId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    eventObject: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    eventType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    eventId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    eventObject: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    eventType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type CXoneDigitalEvent = InferType<typeof CXoneEventSchema>;
