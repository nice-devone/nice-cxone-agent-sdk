import { HttpUtilService, Logger, HttpClient, UrlUtilsService, ApiUriConstants, ValidationUtils, } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { AddressBookApiParser } from '../util/address-book-api-parser';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
/**
 * This class to expose address book services
 */
export class AddressBookService {
    /**
     *
     * ```
     * @example
     * const adminService = new AdminService();
     * ```
     */
    constructor() {
        this.logger = new Logger('addressBook', 'AddressBookService');
        this.urlUtilSvc = new UrlUtilsService();
        this.addressBookApiParser = new AddressBookApiParser();
        this.utilService = new HttpUtilService();
        this.validationUtils = new ValidationUtils();
        this.auth = CXoneAuth.instance;
    }
    /**
     * This method to get all address books for selected agentId
     * @param agentId -  agent id
     * @example
     * ```
     * getAllAddressBooks('23423423');
     * ```
     */
    getAllAddressBooks(agentId, includeEntries = false) {
        const requestParams = {
            includeEntries: includeEntries,
        };
        const cxOneConfig = this.auth.getCXoneConfig();
        const user = CXoneUser.instance.getUserInfo();
        agentId = agentId ? agentId : user.icAgentId;
        const addressBooksUrl = ApiUriConstants.ADDRESS_BOOK_URI.replace('{agentId}', agentId);
        const url = cxOneConfig.acdApiBaseUri + this.urlUtilSvc.appendQueryString(addressBooksUrl, requestParams);
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        return new Promise((resolve, reject) => {
            if (this.validationUtils.isNotNullOrEmpty(agentId)) {
                HttpClient.get(url, reqInit).then((response) => {
                    this.logger.info('getAllAddressBooks', 'Get Address Books Success');
                    let addressBookList = [];
                    addressBookList = this.addressBookApiParser.parseAddressBookList(response);
                    addressBookList.sort((a, b) => {
                        const firstValue = a.addressBookName.toLowerCase();
                        const secondValue = b.addressBookName.toLowerCase();
                        if (firstValue > secondValue) {
                            return 1;
                        }
                        if (firstValue < secondValue) {
                            return -1;
                        }
                        return 0;
                    });
                    resolve(addressBookList);
                }, (error) => {
                    this.logger.error('getAllAddressBooks', 'Get Address Books failed:-' + error.toString());
                    reject(error);
                });
            }
            else {
                this.logger.error('getAllAddressBooks', 'agentId is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'agentId is empty'));
            }
        });
    }
    //below code is commented out for standard address book 2.0 - we will implement this for 25.2 release
    // public getAllAddressBooks(agentId?: string, includeEntries = false, sab2Enabled = false): Promise<(SAB2AddressBook | AddressBooks)[] | CXoneSdkError> {
    //   const requestParams = {
    //     includeEntries: includeEntries,
    //   };
    //   const cxOneConfig = this.auth.getCXoneConfig();
    //   const user = CXoneUser.instance.getUserInfo();
    //   agentId = agentId ? agentId : user.icAgentId;
    //   const addressBooksUrl = ApiUriConstants.ADDRESS_BOOK_URI.replace('{agentId}', agentId);
    //   const url = cxOneConfig.acdApiBaseUri + this.urlUtilSvc.appendQueryString(addressBooksUrl, requestParams);
    //   //standard address book 2.0 
    //   const sab2endpointURL = cxOneConfig.apiFacadeBaseUri + ApiUriConstants.ADDRESS_BOOK_2_URI
    //   const token = this.auth.getAuthToken();
    //   const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
    //   return new Promise((resolve, reject) => {
    //     if (this.validationUtils.isNotNullOrEmpty(agentId)) {
    //       const getAddressBook = HttpClient.get(url, reqInit).then(
    //         (response: HttpResponse) => {
    //           this.logger.info('getAllAddressBooks', 'Get Address Books Success');
    //           let addressBookList: (AddressBooks)[] = [];
    //           addressBookList = this.addressBookApiParser.parseAddressBookList(response);
    //           addressBookList.sort((a, b) => {
    //             const firstValue = a.addressBookName.toLowerCase();
    //             const secondValue = b.addressBookName.toLowerCase();
    //             if (firstValue > secondValue) {
    //               return 1;
    //             }
    //             if (firstValue < secondValue) {
    //               return -1;
    //             }
    //             return 0;
    //           });
    //           return addressBookList;
    //         },
    //         (error: CXoneSdkError) => {
    //           this.logger.error('getAllAddressBooks', 'Get Address Books failed:-' + error.toString());
    //           reject(error);
    //         }
    //       );
    //       //get standard address book 2.0
    //       const getAddressBook2 = HttpClient.get(sab2endpointURL, reqInit).then(
    //         (response: HttpResponse) => {
    //           this.logger.info('getAllAddressBooks2.0', 'Get Standard Address Books 2.0 Success');
    //           let addressBookList: (SAB2AddressBook)[] = [];       
    //           addressBookList = this.addressBookApiParser.parseSAB2List(response.data);
    //           return addressBookList;
    //         },
    //         (error: CXoneSdkError) => {
    //           this.logger.error('getAllAddressBooks2.0', 'Get Standard Address Books 2.0 failed:-' + error.toString());
    //           reject(error);
    //         }
    //       );
    //       const combineAddressBooks = Promise.allSettled([getAddressBook, getAddressBook2]).then((addressbooks) => {
    //         const standardAddressBooks = addressbooks[0].status === 'fulfilled' ? addressbooks[0].value : [];
    //         const sab2AddressBooks = addressbooks[1].status === 'fulfilled' ? addressbooks[1].value : [];
    //         //combine old and sab2 address books
    //         const combineAddressBooks: (SAB2AddressBook | AddressBooks)[] = []
    //         if(standardAddressBooks && standardAddressBooks.length > 0) {
    //           combineAddressBooks.push(...standardAddressBooks)
    //         }
    //         if(sab2Enabled && sab2AddressBooks && sab2AddressBooks.length > 0) {
    //           combineAddressBooks.push(...sab2AddressBooks)
    //         }
    //         return combineAddressBooks
    //       })
    //       resolve(combineAddressBooks)
    //     } else {
    //       this.logger.error('getAllAddressBooks', 'agentId is empty');
    //       reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'agentId is empty'));
    //     }
    //   });
    // }
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
    getStandardEntries(addressBookId, startIndex = 0, recordsToLoad = 50, searchText = '') {
        const requestParams = {
            updatedSince: new Date(0).toISOString(),
            skip: startIndex,
            top: recordsToLoad,
            searchString: searchText,
            orderBy: 'firstName',
        };
        const cxOneConfig = this.auth.getCXoneConfig();
        const standardAddressBookUrl = ApiUriConstants.STANDARD_ADDRESS_BOOK_URI.replace('{addressBookId}', addressBookId);
        const url = cxOneConfig.acdApiBaseUri + this.urlUtilSvc.appendQueryString(standardAddressBookUrl, requestParams);
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getStandardEntries', 'Get Standard Address Books Success');
                const formattedResponse = this.addressBookApiParser.parseStandardAddressBookEntries(response);
                resolve(formattedResponse);
            }, (error) => {
                this.logger.error('getStandardEntries', 'Get Standard Address Books Failed-' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=address-book-service.js.map