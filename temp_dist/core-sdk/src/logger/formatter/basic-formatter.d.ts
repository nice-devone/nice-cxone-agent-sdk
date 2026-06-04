import { LogEntry } from '../model/log-entry';
import { LogFormatter } from '../model/log-formatter';
/**
 * BasicFormatter builds message format.
 */
export declare class BasicFormatter implements LogFormatter {
    /**
     * Formats data to be logged to console.
     * @param entry - Specifies data and log level to be logged.
     * @example
     * ```
     * // Formats the input object
     * const logEntry: LogEntry;
     * format(logEntry);
     * ```
     * @returns - Formatted string message.
     */
    format(entry: LogEntry): string;
}
