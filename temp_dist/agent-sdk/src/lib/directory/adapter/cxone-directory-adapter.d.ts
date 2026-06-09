import { AddressBooksEntries, DirectoryResponse } from '@nice-devone/common-sdk';
/**
 * Directory Adapter class to handle the agent api's data response
 */
export declare class CXoneDirectoryAdapter {
    /**
     * Used to handle the directory response and return the combined directory model object
     * @param response - the directory api response - state,skill and address book
     * @example -
     * ```
     * const directoryAdapter = new CXoneDirectoryAdapter();
     * this.directoryAdapter.handleEvent(data);
     * ```
     */
    handleEvent(response: any): Promise<DirectoryResponse>;
    /**
     * This method to formatAddressBookEntries
     * @example -
     * ```
     * formatAddressBookEntries(entries);
     * ```
     * @param entries - address book entries
     * @returns - formatted address book entries
     */
    formatAddressBookEntries(entries: any[], StdAddressBookName: string): Array<AddressBooksEntries>;
}
