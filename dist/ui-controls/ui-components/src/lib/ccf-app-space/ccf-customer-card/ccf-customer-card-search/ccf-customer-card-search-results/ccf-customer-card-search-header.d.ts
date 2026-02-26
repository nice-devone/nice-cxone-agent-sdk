export interface CcfCustomerCardProps {
    /**
     * @remarks - isSearchBoxUpdated gives the boolean value to check if search input box was updated
     */
    isSearchBoxUpdated?: boolean;
    /**
     * @remarks - searchedText gives the value of the value entered in search box(initally not send on first merge click)
     * Hence marked as optional field
     */
    searchedText?: string;
}
/**
 * CcfCustomerCardSearchHeader - used to display the search header
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCardSearchHeader />
 */
export declare function CcfCustomerCardSearchHeader(props: CcfCustomerCardProps): JSX.Element;
export default CcfCustomerCardSearchHeader;
