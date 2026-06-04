import { LogLevel } from '../enum/log-level';
import { BasicFormatter } from '../formatter/basic-formatter';
/**
 * ConsoleLogAppender logs data to console.
 */
export class ConsoleLogAppender {
    /**
     * Creates ConsoleLogAppender object with default/input formatter
     * @param formatter - Specifies default/input formatter.
     * @example
     * ```
     * const consoleAppender = new ConsoleLogAppender()
     * ```
     */
    constructor(formatter = new BasicFormatter()) {
        this.formatter = {};
        this.formatter = formatter;
    }
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
    append(entry) {
        try {
            const formatted = this.formatter.format(entry);
            switch (entry.level) {
                case LogLevel.TRACE:
                    this.getConsole().trace(formatted);
                    break;
                case LogLevel.DEBUG:
                    this.getConsole().debug(formatted);
                    break;
                case LogLevel.INFO:
                    this.getConsole().info(formatted);
                    break;
                case LogLevel.WARN:
                    this.getConsole().warn(formatted);
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    this.getConsole().error(formatted);
                    break;
            }
        }
        catch (e) {
            // TODO add Exception handling
            console.error('Error in log append method', e);
        }
    }
    /**
     * Clears the console.
     * @example
     * ```
     * clear()
     * ```
     */
    clear() {
        this.getConsole().clear();
    }
    /**
     * Gets the console object.
     * @example
     * ```
     * getConsole()
     * ```
     * @returns Console object.
     */
    getConsole() {
        return console;
    }
}
//# sourceMappingURL=console-log-appender.js.map