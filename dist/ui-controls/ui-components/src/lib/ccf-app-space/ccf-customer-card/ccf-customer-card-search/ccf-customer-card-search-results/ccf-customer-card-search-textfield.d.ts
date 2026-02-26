import { CustomerCardMergeStatus } from '../../ccf-customer-card.slice';
interface CcfCustomerCardSearchProps {
    /**
     * @remarks - returnToMainScreen event triggered on merge button click
     */
    returnToMainScreen: (value?: CustomerCardMergeStatus) => void;
    /**
     * @remarks - searchedText gives the value of the value entered in search box
     */
    searchedText: (searchedText: string) => void;
    /**
     * @remarks - isSearchTextUpdated gets boolean value if search text input was updated
     */
    isSearchTextUpdated: (isSearchTextUpdated: boolean) => void;
    /**
    * @remarks - External Ids to exclude from the search API
    */
    externalIdsToExclude: string[];
}
/**
 * CcfCustomerCardSearchTextfield - used to display the search header
 * @example <CcfCustomerCardSearchTextfield />
 */
export declare function CcfCustomerCardSearchTextfield(props: CcfCustomerCardSearchProps): JSX.Element;
export default CcfCustomerCardSearchTextfield;
