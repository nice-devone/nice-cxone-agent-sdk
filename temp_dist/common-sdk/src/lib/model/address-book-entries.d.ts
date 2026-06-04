export interface AddressBooksEntries {
    /**
    * @remarks first name of customer
    */
    firstName: string;
    /**
    * @remarks middle name of customer
    */
    middleName: string;
    /**
   * @remarks phone number of customer
   */
    lastName: string;
    /**
   * @remarks phone number of customer
   */
    phone: string;
    /**
    * @remarks mobile number of customer
    */
    mobile: string;
    /**
    * @remarks email address of customer
    */
    email: string;
    /**
    * @remarks addressBookName
    */
    addressBookName: string;
    /**
    * @remarks address book entry Id
    */
    addressBookEntryId: number;
    /**
   * @remarks company name of customer
   */
    company: string;
    /**
    * @remarks used for dynamic address book
    */
    externalId: string;
    /**
    * @remarks used for dynamic address book
    */
    externalState: string;
    /**
    * @remarks used for dynamic address book
    */
    stateId: string;
    /**
    * @remarks used for dynamic address book
    */
    isDeleted: boolean;
    /**
    * @remarks  Represents whether Standard Address Book is marked as favorite or not on UI
    */
    isFavorite?: boolean;
    /**
     * @remarks  address book is active or not
     */
    isActive?: boolean;
}
