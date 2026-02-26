import { CXoneAttachment, CXoneAuthorEndUserIdentity, CXoneAuthorUser, CXoneMessage, ContactData, DraftMessagePayload, ReplyAPIStatus } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { Dispatch } from '@reduxjs/toolkit';
/**
 * Function to formate timer
 * @returns - time in format hh:mm:ss or mm:ss
 * @example - formattedCounter  = formatTimer(number);
 */
export declare const formatTimer: (count: number) => string;
/**
* Function to formate time
* @returns - time in format mm:ss or mm min or hh.mm hr
* @example - formattedCounter  = formatTime(number);
*/
export declare const formatTime: (count: number) => string;
/**
* Function to calculate current hold time for any call
* @returns - time in seconds
* @example - calculateHoldDuration("")
*/
export declare const getDurationInSeconds: (dateTime: Date) => number;
/**
* Function to calculate the current timzone offset in utc
* @returns - time zone offset in utc format
* @example - getUtcTimezoneOffset()
*/
export declare const getUtcTimezoneOffset: () => string;
/**
 * after getting confirmation from product will update the logic
* get date and time format
* @param date - date string
* @returns - Required formatted date and time stamp.
* @example - getDateAndTimeFormat("2022-05-23T06:26:13+00:00")
*/
export declare const getDateAndTimeFormat: (date: string) => string;
/**
 * returns if the current timezone has Daylight Savings
* @param date - date object
* @returns - true if the timezone has Daylight savings
* @example - isDST("2022-05-23T06:26:13+00:00")
*/
export declare const isDST: (date: Date) => boolean;
/**
 * returns the unique id for the contactCard
* @param contact - ContactCard object
* @returns - a string, caseId for digital and contactId for everything else
* @example - idForDigitalOrACD(contact)
*/
export declare const idForDigitalOrACD: (contact: ContactData) => string;
/**
     * Associate auth based on direction
     * @param message - received cxone message
     * @example -
     * ```
     * const author = getMessageAuthor(message);
     * ```
     * @returns - author details
     */
export declare const getMessageAuthor: (message: CXoneMessage) => any;
/**
 * Prepare forward email message body
 * @param message - message content
 * @param author - author details
 * @param createdAt - created date
 * @param isFromEditor - indicate whether message displaying in editor or interaction space
 * @example
 * ```
 * const forwardedText = createForwardedEmailInHtml(
                message.messageContent.text,
                getMessageAuthor(message),
                message.createdAt,
                isFromEditor
              );
  * ```
  * @returns - forward email content
  */
export declare const createForwardedEmailInHtml: (message: string, author: CXoneAuthorEndUserIdentity | CXoneAuthorUser, createdAt: string, isFromEditor?: boolean) => string;
/**
     * Checks if email address present
     * @param author - author details
     * @example
     * ```
     * isUser(author)
     * ```
     */
export declare const isUser: (author: CXoneAuthorUser) => boolean;
/**
     * Checks if idOnExternalPlatform present
     * @param author - author details
     * @example
     * ```
     * isEndUserIdentity(author)
     * ```
     */
export declare const isEndUserIdentity: (author: CXoneAuthorEndUserIdentity) => boolean;
/**
 * Method to update the draft messages into state
 * @param draftMessagePayload - draft message payload
 * @param messageSendStatus - Reply API send status
 * @param selectedDigitalContactDetails - selected contact object
 * @param dispatch - dispatch from redux toolkit
 * @example
 * ```
 * updateDraftMessageIntoState(draftMessagePayload, messageSendStatus, selectedDigitalContactDetails, dispatch)
 * ```
 */
export declare const updateDraftMessageIntoState: (draftMessagePayload: DraftMessagePayload, messageSendStatus: ReplyAPIStatus, selectedDigitalContactDetails: CXoneDigitalContact, dispatch: Dispatch) => void;
/**
 * Update source links from Attachments
 * also update image source to use the external-link
 *
 * @param src - email content
 * @param attachments - email attachment Array
 *
 * @example updateEmailContentDigitalSource(src, attachments)
 */
export declare const updateEmailContentDigitalSource: (src: string, attachments: CXoneAttachment[] | undefined) => Document;
/**
 * Method to download file
 * @param fileUrl - file url
 * @param fileName - file name
 * @example
 * ```
 * previewTemplateFile(fileUrl, fileName)
 * ```
 */
export declare const previewTemplateFile: (fileUrl: string, fileName: string) => void;
export declare const DEFAULT_CXA_VERSION = "25.4-Agent";
/**
 * Create header line for print view
 * Appends label and text as separate span elements to a container
 * @param container - HTMLElement to append the spans to
 * @param label - Label text to display
 * @param text - Text content to display
 * @example
 * ```
 * createHeaderLine(container, 'From: ', 'user\@example.com')
 * ```
 */
export declare const createHeaderLine: (container: HTMLElement, label: string, text: string) => void;
/**
   * Extracts storage data from a StorageEvent or CustomEvent.
   * @param event - StorageEvent or CustomEvent
   * @example - extractStorageData(event)
   * @returns object with key and newValue or null if key is not present
   */
export declare const extractStorageData: (event: StorageEvent | CustomEvent) => {
    key: string;
    newValue: string | null;
} | null;
