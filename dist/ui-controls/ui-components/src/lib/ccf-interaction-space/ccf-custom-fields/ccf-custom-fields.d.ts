import { CXoneContactCustomFieldDefinition, CXoneCustomFieldDetails } from '@nice-devone/common-sdk';
/**
 * custom fields array against contact
 */
export interface CcfCustomFieldsProps {
    /**
  *  field referes to the customfields array
  */
    customFields: CXoneCustomFieldDetails[];
    /**
     * Field refers to the list of custom fields
     */
    cxoneCustomFieldDefs?: CXoneContactCustomFieldDefinition[];
    /**
     * Function refers to getting the length of updatedCustomFields array
     */
    getUpdatedCustomFieldsLength: (updatedCustomFieldsLengthVal: number) => void;
}
/**
 * custom fields array
 */
export interface CcfCaseCustomFieldValue {
    /**
  *  field referes to the value of custom fields
  */
    value: string;
    /**
  *  field referes to the identifier of custom fields
  */
    ident: string;
}
/**
 *  Interface is used to validate the payload object for custom field update API
*/
export interface CustomerCardCustomFieldDetails {
    /**
    *  customfield array of object for update API
    */
    customFields: Array<CcfCaseCustomFieldValue>;
    /**
    *  field referes to the case id for which API to be called
    */
    id: string;
}
/**
 *  Interface is used for LIST type fields attribute
*/
export interface CcfCaseCustomFieldDefValues {
    /**
    *  field referes to the name of custom field from defeinition
    */
    name?: string;
    /**
    *  field referes to the value of custom field from defeinition
    */
    value?: string;
    /**
    *  field referes to the ident of custom field from defeinition
    */
    ident: string;
    /**
    * @remarks - String field to map parent id.
    */
    parentId?: string;
}
/**
 *  Interface is used for custom field definitions
*/
export interface CcfCaseCustomFieldDefs {
    /**
    *  field referes to the ident of custom field from defeinition
    */
    ident: string;
    /**
    *  field referes to the label of custom field from defeinition
    */
    label: string;
    /**
    *  field referes to the type of custom field from defeinition
    */
    type: string;
    /**
    *  field referes to the is required flag of custom field from defeinition
    */
    isRequired: boolean;
    /**
    *  field referes to the is editable flag of custom field from defeinition
    */
    isEditable: boolean;
    /**
    *  field referes to the isVisibleInAgentConsole of custom field from defeinition
    */
    isVisibleInAgentConsole: boolean;
    /**
    *  field referes to the isVisibleInRightPanel of custom field from defeinition
    */
    isVisibleInRightPanel?: boolean;
    /**
    *  field referes to the values of list type custom field from defeinition
    */
    values: Array<CcfCaseCustomFieldDefValues>;
    /**
    *  field referes to the selected value of custom field from defeinition
    */
    selectedValue?: string;
    /**
    *  field referes to the value of custom field from defeinition
    */
    value?: string;
}
/**
 * Component to displays custom fields in content header
 * @returns custom fields in content header
 * @example
 * ```
 * <CcfCustomFields customFields={props.customFields}
 * ```
 */
export declare function CcfCustomFields(props: CcfCustomFieldsProps): JSX.Element;
export default CcfCustomFields;
