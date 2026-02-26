import { CXoneCustomerDetail } from '@nice-devone/common-sdk';
export interface CcfCustomerCardSearchResultProps {
    /**
     * @remarks - customer object with CustomerType which is mentioned in above interfaces
     */
    customer: CXoneCustomerDetail;
}
/**
 * CcfCustomerCardSearchResult - used to display the single search result
 * @param props -?-CcfCustomerCardSearchResultProps
 * @example <CcfCustomerCardSearchResult />
 */
export declare function CcfCustomerCardSearchResult(props: any): JSX.Element;
export default CcfCustomerCardSearchResult;
