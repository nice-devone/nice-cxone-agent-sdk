import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { ApiUriConstants, HttpClient, HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Function to get Customer list on search
 * @param getCustomerList -url: url to hit, reqInit - headerDetails
 * @returns lists of customer
 * @example getCustomerList(url, reqInit)
 */
export const getCustomerList = (searchedText, externalIds, scrollToken) => {
    const logger = new Logger('acd', 'Customer Card Service');
    const baseUrl = CXoneAuth.instance.getCXoneConfig().dfoApiBaseUri;
    const authToken = CXoneAuth.instance.getAuthToken().accessToken;
    const utilService = new HttpUtilService();
    const externalIdsToExclude = externalIds.join(', ');
    let searchCustomerUrl = baseUrl + ApiUriConstants.GET_CUSTOMER_DETAILS_BY_ID + '?query=identityIdOnExternalPlatform NOT IN (' + externalIdsToExclude + ') AND fullName LIKE ' + searchedText + '&size=10';
    if (scrollToken) {
        searchCustomerUrl = searchCustomerUrl + '&scrollToken=' + scrollToken;
    }
    const reqInit = {
        headers: utilService.initHeader(authToken, 'application/json')
            .headers,
    };
    return new Promise((resolve, reject) => {
        HttpClient.get(searchCustomerUrl, reqInit).then((response) => {
            resolve(response.data);
        }, (error) => {
            const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Fetching customer details failed', error);
            logger.error('getCustomerList', errorResponse.toString());
            reject(errorResponse);
        });
    });
};
//# sourceMappingURL=customer-card-search.js.map