import { InferType } from 'yup';
export declare const CXOneEndUserSchema: import("yup/lib/object").OptionalObjectSchema<{
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    identities: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    fullName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    customFields: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    identities: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        image: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
}>>;
export declare type CXOneEndUser = InferType<typeof CXOneEndUserSchema>;
