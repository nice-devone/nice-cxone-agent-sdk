import { LogAppender } from './model/log-appender';
import { LogLevel } from './enum/log-level';
/**
 * This class configure multiple appenders with different log levels
 */
export declare class LoggerConfig {
    private appenders;
    private level;
    /**
     * Creates LoggerConfig with loglevel
     *
     * @param level - Log level
     * @example
     * ```
     * const loggerConfig = new LoggerConfig(LogLevel.TRACE);
     * ```
     */
    constructor(level?: LogLevel);
    /**
     *
     * @param appender - Log appender
     * @example
     * ```
     * addAppender(ConsoleLogAppender);
     * ```
     */
    addAppender(appender: LogAppender): void;
    /**
     *
     * @param level - Set the log level
     * @example
     * ```
     * setLevel(0);
     * ```
     */
    setLevel(level: LogLevel): void;
    /**
     * Returns the multiple appenders in array
     *
     * @returns Multiple appenders in Array of object
     * @example
     * ```
     * getAppenders();
     * ```
     */
    getAppenders(): LogAppender[];
    /**
     * Returns the log level
     *
     * @returns Log Level
     * @example
     * ```
     * getLevel();
     * ```
     */
    getLevel(): LogLevel;
}
