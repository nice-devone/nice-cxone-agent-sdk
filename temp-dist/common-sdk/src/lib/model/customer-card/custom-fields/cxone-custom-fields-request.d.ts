import { InferType } from 'yup';
declare const customFieldsDetailsSchema: import("yup/lib/object").OptionalObjectSchema<{
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
declare const CustomFieldsRequest: import("yup/lib/object").OptionalObjectSchema<{
    customFields: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>;
    customerId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    customFields: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>;
    customerId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneCustomFieldsRequest = InferType<typeof CustomFieldsRequest>;
export declare type CXoneCustomFieldDetails = InferType<typeof customFieldsDetailsSchema>;
export {};
