import { InferType } from 'yup';
export declare const CXOneOwnerAssigneeUserSchema: import("yup/lib/object").OptionalObjectSchema<{
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXOneOwnerAssigneeUser = InferType<typeof CXOneOwnerAssigneeUserSchema>;
