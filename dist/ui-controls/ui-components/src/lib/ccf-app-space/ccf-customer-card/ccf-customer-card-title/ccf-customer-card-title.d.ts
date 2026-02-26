export interface CcfCustomerCardProps {
    title: string;
    imagePath: string;
    displaySearchResultsCallback: (title: string) => void;
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfCustomerCardDetailsTitle(props: CcfCustomerCardProps): JSX.Element;
export default CcfCustomerCardDetailsTitle;
