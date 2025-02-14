import { ValidationUtils, ParseUtil } from '@nice-devone/core-sdk';
/**
 * This class to parse address book api response
 */
export class AddressBookApiParser {
    constructor() {
        this.validationUtils = new ValidationUtils();
    }
    /**
     * This method to parse address book list
     * @param response - api response
     * @example -
     * ```
     * parseAddressBookList(response);
     * ```
     * @returns - address book list
     */
    parseAddressBookList(response) {
        const addressBookList = [];
        const data = response.data ? response.data : response;
        if (this.validationUtils.isNotNullOrEmpty(data) && this.validationUtils.isNotNullOrEmptyArray(data.addressBooks)) {
            data.addressBooks.forEach((addressBook) => {
                const addressBooks = {
                    addressBookName: addressBook.addressBookName,
                    addressBookId: addressBook.addressBookId,
                    addressBookType: addressBook.addressBookType,
                };
                if ((addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookEntries) &&
                    this.validationUtils.isNotNullOrEmptyArray(addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookEntries)) {
                    addressBooks.addressBooksEntries = this.formatAddressBookEntries(addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookEntries, addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookName);
                }
                addressBookList.push(addressBooks);
            });
        }
        return addressBookList;
    }
    /**
     * This method to parse standard address book 2.0 list
     * @param response - api response
     * @example -
     * ```
     * parseAddressBookList(response);
     * ```
     * @returns - address book list
     */
    parseSAB2List(response) {
        const addressBookList = [];
        if (this.validationUtils.isNotNullOrEmpty(response) && this.validationUtils.isNotNullOrEmptyArray(response)) {
            response.sort((a, b) => {
                const firstValue = a.addressBookName.toLowerCase();
                const secondValue = b.addressBookName.toLowerCase();
                if (firstValue > secondValue) {
                    return 1;
                }
                if (firstValue < secondValue) {
                    return -1;
                }
                return 0;
            }).forEach((addressBook) => {
                const SAB2AddressBook = {
                    addressBookName: addressBook.addressBookName,
                    addressBookId: addressBook.addressBookId,
                    status: addressBook.status,
                    assignmentLevel: addressBook.assignmentLevel,
                    createdAt: addressBook.createdAt,
                    createdBy: addressBook.createdBy,
                    updatedAt: addressBook.updatedAt,
                    updatedBy: addressBook.updatedBy,
                };
                addressBookList.push(SAB2AddressBook);
            });
        }
        return addressBookList;
    }
    /**
     * This method to parse standard address book entries
     * @param response - api response
     * @example -
     * ```
     * parseStandardAddressBookEntries(response);
     * ```
     * @returns - standard address book entries
     */
    parseStandardAddressBookEntries(response) {
        var _a, _b, _c;
        let totalRecords = 0;
        let addressBookId = '';
        let addressBookName = '';
        let standardAddressBookEntries = [];
        if (this.validationUtils.isNotNullOrEmpty(response.data)) {
            const data = response.data;
            totalRecords = data.totalRecords;
            addressBookId = (_a = data.addressBook) === null || _a === void 0 ? void 0 : _a.addressBookId;
            addressBookName = (_b = data.addressBook) === null || _b === void 0 ? void 0 : _b.addressBookName;
            if (this.validationUtils.isNotNullOrEmptyArray((_c = data.addressBook) === null || _c === void 0 ? void 0 : _c.addressBookEntries)) {
                standardAddressBookEntries = this.formatAddressBookEntries(data.addressBook.addressBookEntries, addressBookName);
            }
        }
        const formattedResponse = {
            totalRecords: totalRecords,
            addressBooksEntries: standardAddressBookEntries,
            addressBookId: ParseUtil.toNumber(addressBookId),
            addressBookName: addressBookName,
        };
        return formattedResponse;
    }
    /**
     * This method to formatAddressBookEntries
     * @example -
     * ```
     * formatAddressBookEntries(entries);
     * ```
     * @param entries - address book entries
     * @returns - formatted address book entries
     */
    formatAddressBookEntries(entries, stdAddressBookName) {
        const standardAddressBookEntries = [];
        entries.forEach((addressBook) => {
            const addressBooksEntries = {
                firstName: addressBook.firstName,
                middleName: addressBook === null || addressBook === void 0 ? void 0 : addressBook.middleName,
                lastName: addressBook.lastName,
                phone: addressBook.phone,
                mobile: addressBook.mobile,
                email: addressBook.email,
                addressBookName: stdAddressBookName,
                addressBookEntryId: addressBook.addressBookEntryId,
                externalId: addressBook === null || addressBook === void 0 ? void 0 : addressBook.externalId,
                externalState: addressBook === null || addressBook === void 0 ? void 0 : addressBook.externalState,
                company: addressBook === null || addressBook === void 0 ? void 0 : addressBook.company,
                stateId: addressBook === null || addressBook === void 0 ? void 0 : addressBook.stateId,
                isDeleted: addressBook === null || addressBook === void 0 ? void 0 : addressBook.isDeleted,
            };
            standardAddressBookEntries.push(addressBooksEntries);
        });
        return standardAddressBookEntries;
    }
}
//# sourceMappingURL=address-book-api-parser.js.map