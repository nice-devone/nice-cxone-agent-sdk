import { LogLevel } from './enum/log-level';
/**
 * This class configure multiple appenders with different log levels
 */
export class LoggerConfig {
    /**
     * Creates LoggerConfig with loglevel
     *
     * @param level - Log level
     * @example
     * ```
     * const loggerConfig = new LoggerConfig(LogLevel.TRACE);
     * ```
     */
    constructor(level) {
        this.appenders = [];
        this.level = level !== null && level !== void 0 ? level : LogLevel.ERROR;
    }
    /**
     *
     * @param appender - Log appender
     * @example
     * ```
     * addAppender(ConsoleLogAppender);
     * ```
     */
    addAppender(appender) {
        this.appenders.push(appender);
    }
    /**
     *
     * @param level - Set the log level
     * @example
     * ```
     * setLevel(0);
     * ```
     */
    setLevel(level) {
        this.level = level;
    }
    /**
     * Returns the multiple appenders in array
     *
     * @returns Multiple appenders in Array of object
     * @example
     * ```
     * getAppenders();
     * ```
     */
    getAppenders() {
        return this.appenders;
    }
    /**
     * Returns the log level
     *
     * @returns Log Level
     * @example
     * ```
     * getLevel();
     * ```
     */
    getLevel() {
        return this.level;
    }
}
//# sourceMappingURL=logger-config.js.map