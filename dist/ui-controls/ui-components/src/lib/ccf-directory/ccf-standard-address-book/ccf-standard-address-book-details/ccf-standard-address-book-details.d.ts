import { AddressBooksEntries } from '@nice-devone/common-sdk';
/**
 * This interface is used to show more details for specific entry
 * It has specify entry if and Entry Details along with addressbook name
 * @example CcfStandardAddressBookDetailsProps
 */
export interface CcfStandardAddressBookDetailsProps {
    standardAddressBookDetails: AddressBooksEntries[];
    addressBookEntryId: number;
    renderTwoColumnDesign: boolean;
}
/**
 * Component for standard address book
 * @param props - CcfStandardAddressBookProps
 * @example - <CcfStandardAddressBook />
 * @returns
 */
export declare function CcfStandardAddressBookDetails(props: CcfStandardAddressBookDetailsProps): JSX.Element;
export default CcfStandardAddressBookDetails;
