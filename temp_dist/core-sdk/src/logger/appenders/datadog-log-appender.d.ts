import { Logger as DatadogLogger } from '@datadog/browser-logs';
import { LogAppender } from '../model/log-appender';
import { LogEntry } from '../model/log-entry';
import { LogFormatter } from '../model/log-formatter';
/**
 * DataDog appender for cxone-agent
 */
export declare class DatadogAppender implements LogAppender {
    private datadogLogger;
    private formatter;
    /**
       * Set datadog logger
       * @param logger - Datadog logger instance
       * @param formatter - Formatter to format and stringify LogEntry.
       * @example
       * ```
       * const dataDogAppender = new DatadogAppender()
       * ```
       */
    constructor(logger: DatadogLogger, formatter?: LogFormatter);
    /**
       * Push formatted and stringified logEntry to datadog service.
       * @param entry - Specifies data and log level to be logged.
       * @example - append(logEntry);
       */
    append(entry: LogEntry): void;
    /**
       * clear log data
       * @example NA
       */
    clear(): void;
}
