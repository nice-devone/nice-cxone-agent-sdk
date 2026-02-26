/**
 * This method to check value of station id is valid or not
 * @param value  - any type of value
 * @example -
 * ```
 * isValidStationId(data);
 * ```
 *
 * @returns  - true/false
 */
export declare const isValidPhoneNumber: (value: string) => boolean;
/**
 * The API used to schedule a dialer retry uses a unique phone number validation, that is matched here.
 * Since the platform uses servral variations, that its APIs use for phone number validations, a
 * standard cannot be used in CXA until those validations are unified.
 * @param value  - any type of value
 * @example - formatPhoneForApiSend('+1 (801) 999-1234'); // returns +18019991234
 *            formatPhoneForApiSend('+1 (801) 999-xxxx'); // returns null
 * ```
 * formatPhoneForApiSend(data);
 * ```
 * @returns  - string
 */
export declare const formatPhoneForApiSend: (phoneNumber: string | undefined) => string | null;
/**
* This method to check value of station id is valid or not
* @param value  - any type of value
* @example -
* ```
* isValidStationId(data);
* ```
*
* @returns  - true/false
*/
export declare const isValidStationId: (value: string) => boolean;
/**
* This method accepts minutes and return hours and min format
* @param value  - any type of number
* @example -
* ```
* converMinutestoHours(min);
* ```
*
* @returns  - 1 hr 30 min
*/
export declare const convertMinutestoHours: (seconds: number) => string;
