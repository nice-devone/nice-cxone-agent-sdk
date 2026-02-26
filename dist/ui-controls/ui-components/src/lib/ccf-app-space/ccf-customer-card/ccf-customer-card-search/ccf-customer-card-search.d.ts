import { CustomerCardMergeStatus } from '../ccf-customer-card.slice';
export interface CcfCustomerCardSearchProps {
    /**
     * @remarks - returnToMainScreen - callback on clicking merge button from customer card detail page
    */
    returnToMainScreen: (value?: CustomerCardMergeStatus) => void;
    /**
     * @remarks - customerName - string which is passed from incoming customer card
     */
    customerName: string;
    /**
    * @remarks - External Ids to exclude from the search API
    */
    externalIdsToExclude: string[];
}
/**
 * CcfCustomerCardSearch - used to display the search textfield along with results
 * @param props -?-CcfCustomerCardSearchProps
 * @example <CcfCustomerCardSearch />
 */
export declare function CcfCustomerCardSearch(props: CcfCustomerCardSearchProps): JSX.Element;
export default CcfCustomerCardSearch;
