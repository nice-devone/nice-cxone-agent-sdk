import { InferType } from 'yup';
export declare const CXoneAuthorEndUserIdentitySchema: import("yup/lib/object").OptionalObjectSchema<{
    idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fullName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    fullName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare const CXoneAuthorUserSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    firstName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    firstName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneAuthorEndUserIdentity = InferType<typeof CXoneAuthorEndUserIdentitySchema>;
export declare type CXoneAuthorUser = InferType<typeof CXoneAuthorUserSchema>;
