import { LogLevel } from '../enum/log-level';
/**
 * Gets log level value.
 * @param level  - Input for log level.
 * @example
 * ```
 * // Gets value as INFO
 * stringifyLogLevel(2)
 * ```
 * @returns - String value for log level.
 */
export function stringifyLogLevel(level) {
    return LogLevel[level];
}
/**
 * Stringifies the input object.
 * @param msg - LogMessage object that needs to be stringify
 * @example
 * ```
 * // Stringifies input object
 * const logMessage: LogMessage;
 * stringifyObject(logMessage);
 *
 * ```
 * @returns - String representation of object.
 */
export function stringifyObject(msg) {
    return JSON.stringify(msg);
}
/**
 * Gets date in UTC format.
 * @example
 * ```
 * // Gets UTC formatted date as Thu, 12 Aug 2021 11:23:33 GMT
 * getUTCDate()
 * ```
 * @returns - Formatted date string.
 */
export function getUTCDate() {
    const now = new Date();
    return new Date(now.getTime()).toUTCString();
}
/**
 * Gets date in MMMDDYYYY format.
 * @param date - Date string which you want to convert
 * @param locale - Locale of the Date to be formatted
 * @example fomatToDateString('2021-02-25T12:44:59+0000', 'he-IL')
 * ```
 * // Gets UTC formatted date as Jan 24, 2021
 * fomatToDateString()
 * ```
 * @returns - Formatted date string.
 */
export function fomatToDateString(date, locale) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(locale, options);
}
/**
 * Gets time in HHMM format.
 * @param date - DateTime string which you want to convert
 * @param locale - Locale of the DateTime to be formatted
 * @example fomatToTimeString('2021-02-25T12:44:59+0000', 'he-IL')
 * ```
 * // Gets UTC formatted time as 7:29 AM
 * fomatToTimeString()
 * ```
 * @returns - Formatted Time string.
 */
export function fomatToTimeString(date, locale) {
    const options = { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleTimeString(locale, options);
}
//# sourceMappingURL=format-utils.js.map