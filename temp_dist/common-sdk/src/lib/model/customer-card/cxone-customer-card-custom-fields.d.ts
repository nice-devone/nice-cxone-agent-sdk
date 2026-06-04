import { InferType } from 'yup';
declare const CustomFieldsSchema: import("yup/lib/object").OptionalObjectSchema<{
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
    updatedAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isEditable: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isVisibleInRightPanel: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isVisibleInCustomerCard: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneCustomerCardCustomFields = Array<typeof CustomFieldsSchema>;
export declare type CXoneCustomerCardCustomField = InferType<typeof CustomFieldsSchema>;
export {};
