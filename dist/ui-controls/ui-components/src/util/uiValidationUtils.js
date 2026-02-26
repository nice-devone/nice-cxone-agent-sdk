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
export const isValidPhoneNumber = (value) => {
    const filter = /^(\+?)([0-9#\\*])+$/;
    if (filter.test(value) && value.length <= 30) {
        return true;
    }
    return false;
};
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
export const formatPhoneForApiSend = (phoneNumber) => {
    const sanitizedPhone = phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.replace(/\(?\)?\s?-?/g, '');
    const retryApiPhoneFormatting = /^(\+[0-9])?([0-9\\*#]{0,28})$/;
    if (sanitizedPhone && retryApiPhoneFormatting.test(sanitizedPhone)) {
        return sanitizedPhone;
    }
    else {
        return null;
    }
};
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
export const isValidStationId = (value) => {
    const filter = /^[0-9]+$/;
    return filter.test(value);
};
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
export const convertMinutestoHours = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    if (days) {
        return days + 'd ' + hrs + 'h ' + mnts + 'm ' + seconds + 's';
    }
    else if (hrs) {
        return hrs + 'h ' + mnts + 'm ' + seconds + 's';
    }
    else if (mnts) {
        return mnts + 'm ' + seconds + 's';
    }
    else {
        return seconds + 's';
    }
};
//# sourceMappingURL=uiValidationUtils.js.map