import { LogLevel } from '../enum/log-level';
import { LogMessage } from '../model/log-message';
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
export declare function stringifyLogLevel(level: LogLevel): string;
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
export declare function stringifyObject(msg: LogMessage): string;
/**
 * Gets date in UTC format.
 * @example
 * ```
 * // Gets UTC formatted date as Thu, 12 Aug 2021 11:23:33 GMT
 * getUTCDate()
 * ```
 * @returns - Formatted date string.
 */
export declare function getUTCDate(): string;
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
export declare function fomatToDateString(date: Date, locale?: string): string;
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
export declare function fomatToTimeString(date: Date, locale?: string): string;
