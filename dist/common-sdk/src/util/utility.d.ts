import { CcfInteractionSearchFilterValues } from '../lib/model/digital/ccf-interaction-search-filter-values';
import { CXoneDigitalMessageSearchRequest } from '../lib/model/digital/cxone-digital-message-search-request';
import { CXoneDigitalThreadSearchRequest } from '../lib/model/digital/cxone-digital-thread-search-request';
import { HttpHeader } from '../lib/http/http-header/http-header';
/**
 * Use to parse the string properties with "True" or "False" values to corresponding boolean value
 * @param value - string values
 * @example -
 * ```
 * parseBoolean(jsonData)
 * ```
 */
export declare const parseBooleanString: (value: string | boolean) => boolean;
/**
 * Parse input value as integer
 * @param value - input value that needs to be parsed
 *  @example -
 * ```
 * parseInteger('10')
 * ```
 */
export declare const parseInteger: (value: any) => number;
/**
* Computes the elapsed time since the moment the function is called in minutes
* @param time - start time to compute the elapsed time since
* @returns number elapsed time in minutes
*  @example -
 * ```
 * getElapsedMinutes('10')
 * ```
 */
export declare const getElapsedMinutes: (time: Date) => number;
/**
* Function to calculate current hold time for any call
* @returns - time in seconds
* @param dateTime - Date
* @example - getDurationInSeconds(new Date())
*/
export declare const getDurationInSeconds: (dateTime: Date) => number;
/**Returns milliseconds from ISO-8601 duration string (e.g. P1Y2M10DT2H30M)
* after getting confirmation from product will update the logic
* get date and time format
* @param duration - date string
* @returns - Milliseconds
* @example - getMillisecondsFrom8601DurationString("PTOS")
*/
export declare const getMillisecondsFrom8601DurationString: (duration: string) => number;
/**
* This method is used to get the duration out of milliseconds
* @param millisecond - number
* @returns - formatted duration hh:mm:ss
* @example - getTimeStringFromMS(milliseconds)
*/
export declare const getTimeStringFromMS: (milliseconds: number) => string;
/**Returns percentage of value to the total
* @param value - number
* @param total - number
* @returns - number of percentage
* @example - calculatePercentage(10, 100))
*/
export declare const calculatePercentage: (value: number, total: number) => number;
/**
 * creates query url from provided object key values
 * @param requestObject - kev value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLFromObjectKeys(requestObject)
 * ```
 */
export declare const getQueryURLFromObjectKeys: (requestObject: [key: string | number | Array<CcfInteractionSearchFilterValues>]) => string;
/**
 * Method to create query url from provided object key values for search in message tab.
 * @param requestObject - kev value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLForSearchMessagesTab(requestObject)
 * ```
 */
export declare const getQueryURLForSearchMessagesTab: (requestObject: CXoneDigitalMessageSearchRequest) => string;
/**
 *Method to create query url from provided object key values for search customer tab
 * @param requestObject - key value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLForCustomerTab(requestObject)
 * ```
 */
export declare const getQueryURLForCustomerTab: (requestObject: [key: string | number | Array<CcfInteractionSearchFilterValues>]) => string;
/**
 * Method to create query url from provided object key values for search in Threads Tab.
 * @param requestObject - kev value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLForSearchThreadsTab(requestObject)
 * ```
 */
export declare const getQueryURLForSearchThreadsTab: (requestObject: CXoneDigitalThreadSearchRequest) => string;
/**
   * Method to generate a query for filters
   * @returns - new query for filters, status IN (open, close)
   * @example - generateQueryForFilters('status', [open, close])
   * @param filterName - filter name e.g: status, channel, etc
   * @param filterOptions - filter options
*/
export declare const generateQueryForFilters: (filterName: string, filterOptions: CcfInteractionSearchFilterValues[]) => string;
/**
   * Method to generate a query for multi-select filters
   * @returns - new query for filters, channel[]=1395080&channel[]=1395081
   * @example - generateQueryForMultiSelectFilters('channel', [1395080, 1395081])
   * @param filterName - filter name e.g: tag, channel, etc
   * @param filterOptions - filter options
*/
export declare const generateQueryForMultiSelectFilters: (filterName: string, filterOptions: CcfInteractionSearchFilterValues[]) => string;
/**
 * Formats a date string to the current locale
 *
 * @param dateString - The date string to format, in the format "YYYY-MM-DDTHH:mm:ss+00:00"
 * @param locale - browser locale default will be 'en-US'
 * @param hour12 - should the hour cycle be 12 hour (true) or 24 hour (false)
 * @returns The formatted date string in the locale format
 *
 * @example
 * formatDateTime("2020-09-18T06:26:55+00:00", 'en-US'); // Returns "18/09/20 11:56am"
 */
export declare const formatDateTime: (dateString: string, locale?: string, hour12?: boolean) => string;
/**
 * Validate URL
 *
 * @param inputURL - url to validate
 * @returns True if URL is valid else false
 *
 * Also validate against strings passed in from the backend for PageOpen
 *
 * @example validateURLOrACDStrings('https://www.iplt20.com');
 */
export declare const validateURLOrACDStrings: (inputURL: string) => boolean;
/**
 * Method to get current date and time if the string is a valid JSON
 * @example getCurrentDate()
 * @returns '2025-04-11T16:08:27.950+05:30'
 */
export declare const getCurrentDate: () => string;
/**
 * Method to return format the TimeStamp
 * @param timestamp - '2025-04-11T16:19:59+00:00'
 * @param locale - 'en-US'
 * @example - formatTimestamp('en-US', '2025-04-11T16:19:59+00:00');
 * ```typescript
 * formatTimestamp('en-US','2025-04-11T16:19:59+00:00');
 * ```
 * @returns - '9:49 PM'
 */
export declare const formatTimestamp: (locale: string, timestamp: string | Date) => string;
/**
 * Validate Port
 *
 * @param port - port to validate
 * @returns True if port is valid else false
 *
 *
 * @example validatePort('8080');
 */
export declare const validatePort: (port: string | number) => boolean;
/**
 * Normalizing headers into an array with lower-cased header names
 * @param headers - headers to normalize
 * @returns Array of normalized headers
 * @example normalizeHeaders('X-Custom-Header': 'value');
 */
export declare function normalizeHeaders(headers: Headers | Record<string, string> | HttpHeader[] | undefined): [string, string][];
