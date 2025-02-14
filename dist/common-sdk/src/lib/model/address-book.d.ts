import { AddressBooksEntries } from './address-book-entries';
export interface SAB2AddressBook {
    /**
     * @remarks address book name
     */
    addressBookName: string;
    /**
    * @remarks address book id
    */
    addressBookId: number;
    /**
     * @remarks address book status
     */
    status: string;
    /**
    * @remarks address book assignment level
    */
    assignmentLevel: string;
    /**
   * @remarks address book created timestamp
   */
    createdAt: number;
    /**
  * @remarks address book created by
  */
    createdBy: string;
    /**
  * @remarks address book updated timestamp
  */
    updatedAt: number;
    /**
 * @remarks address book updated by
 */
    updatedBy: string;
}
export interface AddressBooks {
    /**
    * @remarks address book name
    */
    addressBookName: string;
    /**
    * @remarks address book id
    */
    addressBookId: number;
    /**
    * @remarks address book type like standard or dynamic
    */
    addressBookType: string;
    /**
    * @remarks address book entries
    */
    addressBooksEntries?: Array<AddressBooksEntries>;
}
