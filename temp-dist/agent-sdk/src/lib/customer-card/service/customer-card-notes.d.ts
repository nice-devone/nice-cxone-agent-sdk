import { CustomerCardNote, CustomerCardNoteResponse, CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
import { HttpRequestInit } from '@nice-devone/core-sdk';
/**
 * Method used to fetch customer notes
 * @returns - Updated list of customer notes
 * @example - fetchCustomerNotes(getCustomerNotesUrl, reqInit)
 */
export declare const fetchCustomerNotes: (getCustomerNotesUrl: string, reqInit: HttpRequestInit) => Promise<CustomerCardNoteResponse>;
/**
 * Method to create a Customer note in customer card
 * @param Id - Customer Id of the Customer and content of note
 * @returns - API Returns Response JSON with created note object
 * @example -
 */
export declare const createCustomerNote: (getCustomerNotesUrl: string, reqInit: HttpRequestInit) => Promise<CustomerCardNote | CXoneSdkError>;
/**
 * Method to delete a Customer note in customer card
 * @param Id - Customer Id of the Customer and noteId of note
 * @returns - API Returns Response JSON with deleted note empty object
 * @example -
 */
export declare const deleteCustomerNote: (deleteCustomerNote: string, reqInit: HttpRequestInit) => Promise<HttpResponse | CXoneSdkError>;
/**
 * Method to edit a Customer note in customer card
 * @param Id - Customer Id of the Customer and noteId of note
 * @returns - API Returns Response JSON with edited note object
 * @example -
 */
export declare const editCustomerNote: (editCustomerNoteUrl: string, reqInit: HttpRequestInit) => Promise<CustomerCardNote | CXoneSdkError>;
