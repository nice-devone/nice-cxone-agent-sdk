import { CustomerCardMergeStatus } from '../../ccf-customer-card.slice';
export interface CcfCustomerCardSearchResultsProps {
    /**
     * @remarks - customerName - string by which results list is published
     */
    customerName: string;
    /**
     * @remarks - returnToMainScreen event triggered on merge button click
     */
    returnToMainScreen: (value?: CustomerCardMergeStatus) => void;
    /**
    * @remarks - External Ids to exclude from the search API
    */
    externalIdsToExclude: string[];
}
/**
 * CcfCustomerCardSearchResults - used to display the search textfield along with results
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCardSearchResults />
 */
export declare function CcfCustomerCardSearchResults(props: CcfCustomerCardSearchResultsProps): JSX.Element;
export default CcfCustomerCardSearchResults;
