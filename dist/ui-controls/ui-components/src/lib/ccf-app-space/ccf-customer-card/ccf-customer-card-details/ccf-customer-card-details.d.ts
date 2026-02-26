import React from 'react';
import { CXoneCustomFieldDetails } from '@nice-devone/common-sdk';
export interface CcfCustomerCardProps {
    customerID: string;
    isLoading: boolean;
    dnis?: string;
    skillname?: string;
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
    isEdited?: boolean;
    isErrored: boolean;
}
export interface CcfCustomerCardFields {
    ident: string;
    value: string;
    updatedAt: Date;
}
export declare enum fieldDataValues {
    LIST = "list",
    EMAIL = "email",
    TEXT = "text"
}
export interface CcfCustomFieldResponse {
    customFields: Array<CXoneCustomFieldDetails>;
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfCustomerCardDetails(props: CcfCustomerCardProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfCustomerCardDetails>;
export default _default;
