interface CXoneCustomFieldDetails {
    ident: string;
    value: string;
}
interface CustomerCardCustomFieldDetails {
    customFields: Array<CXoneCustomFieldDetails>;
    id: string;
}
/**
 * Interface used to delete customField value
 */
export interface CXoneDeleteCustomField {
    /**
    * @remarks - A string value which represents ident name.
    */
    ident: string;
    /**
    * @remarks - A string value which represents customerId.
    */
    customerId: string;
}
export declare type CustomField = CustomerCardCustomFieldDetails;
export {};
