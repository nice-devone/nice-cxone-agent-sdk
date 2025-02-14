import { AddressBooks, AddressBookEntriesResponse, AddressBooksEntries, HttpResponse, SAB2AddressBook } from '@nice-devone/common-sdk';
/**
 * This class to parse address book api response
 */
export declare class AddressBookApiParser {
    private validationUtils;
    /**
     * This method to parse address book list
     * @param response - api response
     * @example -
     * ```
     * parseAddressBookList(response);
     * ```
     * @returns - address book list
     */
    parseAddressBookList(response: HttpResponse): Array<AddressBooks>;
    /**
     * This method to parse standard address book 2.0 list
     * @param response - api response
     * @example -
     * ```
     * parseAddressBookList(response);
     * ```
     * @returns - address book list
     */
    parseSAB2List(response: SAB2AddressBook[]): Array<SAB2AddressBook>;
    /**
     * This method to parse standard address book entries
     * @param response - api response
     * @example -
     * ```
     * parseStandardAddressBookEntries(response);
     * ```
     * @returns - standard address book entries
     */
    parseStandardAddressBookEntries(response: HttpResponse): AddressBookEntriesResponse;
    /**
     * This method to formatAddressBookEntries
     * @example -
     * ```
     * formatAddressBookEntries(entries);
     * ```
     * @param entries - address book entries
     * @returns - formatted address book entries
     */
    formatAddressBookEntries(entries: any[], stdAddressBookName: string): Array<AddressBooksEntries>;
}
