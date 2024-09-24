import { AddressBooks, AddressBookEntriesResponse, AddressBooksEntries, HttpResponse } from '@nice-devone/common-sdk';
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
    parseAddressBookList(response: any): Array<AddressBooks>;
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
