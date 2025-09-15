import { getUTCDate, stringifyLogLevel, stringifyObject } from './format-utils';
/**
 * BasicFormatter builds message format.
 */
export class BasicFormatter {
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
    format(entry) {
        const module = entry.module ? `[${entry.module}] ` : '';
        const className = entry.className ? `[${entry.className}] ` : '';
        let formatted = `${getUTCDate()} ${stringifyLogLevel(entry.level)} ${module}${className}`;
        if (typeof entry.message !== 'undefined') {
            formatted += stringifyObject(entry.message);
        }
        return formatted;
    }
}
//# sourceMappingURL=basic-formatter.js.map