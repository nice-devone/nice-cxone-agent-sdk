import { InferType } from 'yup';
/**
 * Interface used for custom field Definitions schema
 */
export declare const CustomFieldsSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
   *  field referes to the identifier of custom fields
   */
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the value of custom fields
   */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the label of custom fields
   */
    label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the type of custom fields
   */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the required flag of custom fields
   */
    isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to the editable flag of custom fields
   */
    isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to the if the field is visible in the right panel
   */
    isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to the if the field is visible in the customer card
   */
    isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to LIST type values
   */
    values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
    /**
   *  field referes to selected Value on edit
   */
    selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
   *  field referes to the identifier of custom fields
   */
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the value of custom fields
   */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the label of custom fields
   */
    label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the type of custom fields
   */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
   *  field referes to the required flag of custom fields
   */
    isRequired: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to the editable flag of custom fields
   */
    isEditable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to the if the field is visible in the right panel
   */
    isVisibleInRightPanel: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to the if the field is visible in the customer card
   */
    isVisibleInCustomerCard: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
   *  field referes to LIST type values
   */
    values: import("yup/lib/array").OptionalArraySchema<import("yup").AnySchema<any, any, any>, any, any[]>;
    /**
   *  field referes to selected Value on edit
   */
    selectedValue: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CustomFields = InferType<typeof CustomFieldsSchema>;
