import { InferType } from 'yup';
export declare const CXoneContactCustomFieldDefinitionValuesSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
       * @remarks - Identifier for Custom field
       */
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
       * @remarks - A string value for Custom Field name.
       */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
       * @remarks - Value of Custom field.
       */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
       * @remarks - String field to map parent id.
       */
    parentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
       * @remarks - Identifier for Custom field
       */
    ident: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
       * @remarks - A string value for Custom Field name.
       */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
       * @remarks - Value of Custom field.
       */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
       * @remarks - String field to map parent id.
       */
    parentId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare const CXoneContactCustomFieldDefinitionSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}>>;
export declare const CXoneContactCustomFieldDefinitionSchemaArray: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - Identifier for Custom field
     */
    ident: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value for Custom Field.
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Type value for Custom field.
     */
    type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string value of Custom Field.
     */
    value: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A string value which Custom data details.
     */
    values: any;
}>>[]>;
export declare type CXoneContactCustomFieldDefinition = InferType<typeof CXoneContactCustomFieldDefinitionSchema>;
export declare type CXoneContactCustomFieldDefinitionValues = InferType<typeof CXoneContactCustomFieldDefinitionValuesSchema>;
