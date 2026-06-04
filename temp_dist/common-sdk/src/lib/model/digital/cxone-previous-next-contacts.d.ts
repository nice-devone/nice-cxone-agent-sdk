import { InferType } from 'yup';
export declare const CXonePreviousNextContactSchema: import("yup/lib/object").OptionalObjectSchema<{
    previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    previous: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    next: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare const CXoneLoadPreviousContactDetailsSchema: any;
export declare type CXoneLoadPreviousNextContact = InferType<typeof CXonePreviousNextContactSchema>;
export declare type CXoneLoadPreviousContactDetails = InferType<typeof CXoneLoadPreviousContactDetailsSchema>;
