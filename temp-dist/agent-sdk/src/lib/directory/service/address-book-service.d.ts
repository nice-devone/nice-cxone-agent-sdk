import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { AddressBooks, AddressBookEntriesResponse, CXoneSdkError } from '@nice-devone/common-sdk';
/**
 * This class to expose address book services
 */
export declare class AddressBookService {
    logger: Logger;
    private urlUtilSvc;
    private auth;
    private addressBookApiParser;
    protected utilService: HttpUtilService;
    private validationUtils;
    /**
     *
     * ```
     * @example
     * const adminService = new AdminService();
     * ```
     */
    constructor();
    /**
     * This method to get all address books for selected agentId
     * @param agentId -  agent id
     * @example
     * ```
     * getAllAddressBooks('23423423');
     * ```
     */
    getAllAddressBooks(agentId?: string, includeEntries?: boolean): Promise<AddressBooks[] | CXoneSdkError>;
    /**
     * This method to get standard address book entries
     * @param addressBookId - address book id
     * @param startIndex - starting index for address book list
     * @param recordsToLoad -  number of records to load
     * @param searchText - search text for address book
     * @example
     * ```
     * getStandardEntries('23423423');
     * ```
     * @returns
     */
    getStandardEntries(addressBookId: string, startIndex?: number, recordsToLoad?: number, searchText?: string): Promise<AddressBookEntriesResponse | CXoneSdkError>;
}
