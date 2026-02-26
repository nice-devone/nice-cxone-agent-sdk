export interface CcfIdentityField {
    idOnExternalPlatform: string;
    firstName: string;
    lastName: string;
    nickname: string;
    image: string;
    externalPlatformId: string;
    id: string;
}
export interface CcfCustomFieldField {
    id: string;
    firstName: string;
    surname: string;
    fullName: string;
    customFields: Array<{
        ident: string;
        value: string;
        updatedAt: string;
    }>;
    image: string;
    identities: Array<CcfIdentityField>;
}
export interface CcfCustomerCardChannelProps {
    customerID: string;
    setIsChannelsDisabled?: (data: boolean) => void;
}
/**
 * CcfCustomerCardChannel - Is used to display the channels information of customer under customer card.
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCardChannel />
 */
export declare function CcfCustomerCardChannel(props: CcfCustomerCardChannelProps): JSX.Element;
export default CcfCustomerCardChannel;
