import { SelectChangeEvent } from '@mui/material';
import React from 'react';
export interface CcfCustomerCardProps {
    data: CcfCustomerCardFieldDefs;
    handleSelectChange: (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent, ident: string) => void;
    handleEdit: (event: boolean) => void;
    enableError: boolean;
    autofocus: boolean;
    isEditable: boolean;
}
export interface CcfCustomerCardFieldDefValues {
    name: string;
    value: string;
    ident: string;
}
export interface CcfCustomerCardFieldDefs {
    ident: string;
    label: string;
    type: string;
    isRequired: boolean;
    isEditable: boolean;
    isVisibleInRightPanel: boolean;
    isVisibleInCustomerCard: boolean;
    values: Array<CcfCustomerCardFieldDefValues>;
    selectedValue?: string;
    isVisibleInAgentConsole: boolean;
}
/**
   * This enum is used for type of maintianing custom field type
*/
export declare enum FieldDataValues {
    LIST = "list",
    EMAIL = "email",
    TEXT = "text"
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfCustomerCardDetailsEditableRow(props: CcfCustomerCardProps): JSX.Element;
export default CcfCustomerCardDetailsEditableRow;
