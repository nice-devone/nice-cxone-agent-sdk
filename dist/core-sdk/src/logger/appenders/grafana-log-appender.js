import { faro } from '@grafana/faro-web-sdk';
import { LogLevel } from '../enum/log-level';
import { BasicFormatter } from '../formatter/basic-formatter';
/**
 * Grafana appender for cxone-agent
 */
export class GrafanaAppender {
    /**
     * Set the log formatter.
     * @param formatter - Formatter to format and stringify LogEntry.
     * @example
     * ```
     * const grafanaAppender = new GrafanaAppender(new BasicFormatter());
     * ```
     */
    constructor(formatter = new BasicFormatter(), logLevelFilter = LogLevel.INFO) {
        this.formatter = formatter;
        this.logLevelFilter = logLevelFilter;
    }
    /**
     * set required log level to be sent to faro
     * @param level - Specifies log level to be logged.
     * @example
     * ```
     * setLogLevelFilter(1)
     * ```
     */
    setLogLevelFilter(level) {
        this.logLevelFilter = level;
    }
    /**
     * Push formatted and stringified logEntry to Grafana Faro service.
     * @param entry - Specifies data and log level to be logged.
     * @example
     * ```
     * grafanaAppender.append(logEntry);
     * ```
     */
    append(entry) {
        const entryLevel = Number(entry.level);
        const logLevelFilter = Number(this.logLevelFilter);
        if (entryLevel < logLevelFilter) {
            return;
        }
        const formatted = this.formatter.format(entry);
        try {
            switch (entry.level) {
                case LogLevel.TRACE:
                    faro.api.pushLog(['trace'], {
                        context: {
                            payload: formatted,
                        },
                    });
                    break;
                case LogLevel.DEBUG:
                    faro.api.pushLog(['debug'], {
                        context: {
                            payload: formatted,
                        },
                    });
                    break;
                case LogLevel.INFO:
                    faro.api.pushLog(['info'], {
                        context: {
                            payload: formatted,
                        },
                    });
                    break;
                case LogLevel.WARN:
                    faro.api.pushLog(['warn'], {
                        context: {
                            payload: formatted,
                        },
                    });
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    faro.api.pushLog(['error'], {
                        context: {
                            payload: formatted,
                        },
                    });
                    break;
            }
        }
        catch (e) {
            console.error('Error in grafana log append method', e);
        }
    }
    /**
       * clear log data
       * @example NA
       */
    clear() {
        // this method is not applicable to grafana logger
        return;
    }
}
//# sourceMappingURL=grafana-log-appender.js.map