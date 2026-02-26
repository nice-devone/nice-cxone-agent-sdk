/*** This interface is used to show more details for specific entry
 ** It has specify entry if and Entry Details along with addressbook name
 ** @example CcfStandardAddressBookDetailsProps*/
export interface CcfStandardAddressBookProps {
    addressBookId: number;
    renderTwoColumnDesign: boolean;
    fromFavorites?: boolean;
}
/**
 * Component for standard address book
 * @param props - CcfStandardAddressBookProps
 * @example - <CcfStandardAddressBook />
 * @returns
 */
export declare function CcfStandardAddressBook(props: CcfStandardAddressBookProps): JSX.Element;
export default CcfStandardAddressBook;
