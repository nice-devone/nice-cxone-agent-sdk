import { LogAppender } from '../model/log-appender';
import { LogEntry } from '../model/log-entry';
import { LogFormatter } from '../model/log-formatter';
import { LogLevel } from '../enum/log-level';
/**
 * Grafana appender for cxone-agent
 */
export declare class GrafanaAppender implements LogAppender {
    private formatter;
    private logLevelFilter;
    /**
     * Set the log formatter.
     * @param formatter - Formatter to format and stringify LogEntry.
     * @example
     * ```
     * const grafanaAppender = new GrafanaAppender(new BasicFormatter());
     * ```
     */
    constructor(formatter?: LogFormatter, logLevelFilter?: LogLevel);
    /**
     * set required log level to be sent to faro
     * @param level - Specifies log level to be logged.
     * @example
     * ```
     * setLogLevelFilter(1)
     * ```
     */
    setLogLevelFilter(level: LogLevel): void;
    /**
     * Push formatted and stringified logEntry to Grafana Faro service.
     * @param entry - Specifies data and log level to be logged.
     * @example
     * ```
     * grafanaAppender.append(logEntry);
     * ```
     */
    append(entry: LogEntry): void;
    /**
       * clear log data
       * @example NA
       */
    clear(): void;
}
