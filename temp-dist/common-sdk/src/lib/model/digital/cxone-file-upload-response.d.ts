import { InferType } from 'yup';
export declare const CXoneFileUploadResponseSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    expireAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    uId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    url: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    expireAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    uId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type CXoneFileUploadResponse = InferType<typeof CXoneFileUploadResponseSchema>;
