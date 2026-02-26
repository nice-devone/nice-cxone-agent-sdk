export interface CcfTitleType {
    display: string;
    id: number;
    label: string;
    type: string;
    title: string;
    updated: string;
    phone: string;
    baseUrl: string;
    path: string;
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfCustomerCardActivityTitle(props: CcfTitleType): JSX.Element;
export default CcfCustomerCardActivityTitle;
