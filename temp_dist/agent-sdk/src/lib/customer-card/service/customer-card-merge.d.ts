import { HttpRequestInit } from '@nice-devone/core-sdk';
import { HttpResponse, CXoneSdkError } from '@nice-devone/common-sdk';
/**
 * Method used to merge customer card
 * @returns - Updated customer contact
 * @example - mergeCustomerCardRequest(mergeCustomerCardUrl, reqInit)
 */
export declare const mergeCustomerCardRequest: (mergeCustomerCardUrl: string, reqInit: HttpRequestInit) => Promise<HttpResponse | CXoneSdkError>;
