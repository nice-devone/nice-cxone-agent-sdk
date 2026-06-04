import { LogAppender } from '../model/log-appender';
import { LogEntry } from '../model/log-entry';
import { LogFormatter } from '../model/log-formatter';
/**
 * ConsoleLogAppender logs data to console.
 */
export declare class ConsoleLogAppender implements LogAppender {
    private formatter;
    /**
     * Creates ConsoleLogAppender object with default/input formatter
     * @param formatter - Specifies default/input formatter.
     * @example
     * ```
     * const consoleAppender = new ConsoleLogAppender()
     * ```
     */
    constructor(formatter?: LogFormatter);
    /**
     * Appends input log entry data to console.
     * @param entry - Specifies data and log level to be logged.
     * @example
     * ```
     * // Prints stringified object to console
     * const logEntry: LogEntry;
     * append(logEntry);
     * ```
     */
    append(entry: LogEntry): void;
    /**
     * Clears the console.
     * @example
     * ```
     * clear()
     * ```
     */
    clear(): void;
    /**
     * Gets the console object.
     * @example
     * ```
     * getConsole()
     * ```
     * @returns Console object.
     */
    private getConsole;
}
