import { LogLevel } from '../enum/log-level';
import { BasicFormatter } from '../formatter/basic-formatter';
/**
 * DataDog appender for cxone-agent
 */
export class DatadogAppender {
    /**
       * Set datadog logger
       * @param logger - Datadog logger instance
       * @param formatter - Formatter to format and stringify LogEntry.
       * @example
       * ```
       * const dataDogAppender = new DatadogAppender()
       * ```
       */
    constructor(logger, formatter = new BasicFormatter()) {
        this.formatter = {};
        this.datadogLogger = logger;
        this.formatter = formatter;
    }
    /**
       * Push formatted and stringified logEntry to datadog service.
       * @param entry - Specifies data and log level to be logged.
       * @example - append(logEntry);
       */
    append(entry) {
        const formatted = this.formatter.format(entry);
        try {
            switch (entry.level) {
                case LogLevel.TRACE:
                    this.datadogLogger.log(formatted);
                    break;
                case LogLevel.DEBUG:
                    this.datadogLogger.debug(formatted);
                    break;
                case LogLevel.INFO:
                    this.datadogLogger.info(formatted);
                    break;
                case LogLevel.WARN:
                    this.datadogLogger.warn(formatted);
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    this.datadogLogger.error(formatted);
                    break;
            }
        }
        catch (e) {
            console.error('Error in DataDog log append method', e);
        }
    }
    /**
       * clear log data
       * @example NA
       */
    clear() {
        // this method is not applicable to datadog logger
        return;
    }
}
//# sourceMappingURL=datadog-log-appender.js.map