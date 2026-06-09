import { CXoneCustomerList } from '@nice-devone/common-sdk';
/**
 * Function to get Customer list on search
 * @param getCustomerList -url: url to hit, reqInit - headerDetails
 * @returns lists of customer
 * @example getCustomerList(url, reqInit)
 */
export declare const getCustomerList: (searchedText: string, externalIds: string[], scrollToken?: string) => Promise<CXoneCustomerList>;
