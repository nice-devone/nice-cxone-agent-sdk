import { AddressBooksEntries } from './address-book-entries';
export interface AddressBookEntriesResponse {
    /**
    * @remarks total count of address book
    */
    totalRecords: number;
    /**
   * @remarks array of the address book entries records
   */
    addressBooksEntries: Array<AddressBooksEntries>;
    /**
   * @remarks address book id
   */
    addressBookId: number;
    /**
 * @remarks address book name
 */
    addressBookName: string;
    /**
  * @remarks server time
  */
    serverTime?: string;
}
