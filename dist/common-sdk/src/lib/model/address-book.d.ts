import { AddressBooksEntries } from './address-book-entries';
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
