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