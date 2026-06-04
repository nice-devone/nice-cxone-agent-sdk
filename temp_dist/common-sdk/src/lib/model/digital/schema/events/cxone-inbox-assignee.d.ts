import { InferType } from 'yup';
export declare const CXoneInboxAssigneeSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    incontactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    loginUsername: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    incontactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    loginUsername: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneInboxAssignee = InferType<typeof CXoneInboxAssigneeSchema>;
