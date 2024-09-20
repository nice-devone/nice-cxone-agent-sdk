import { LoggerConfig } from './logger-config';
import { LogLevel } from './enum/log-level';
/**
 * This class implements multiple loglevels with different appenders
 */
export class Logger {
    /**
     * Get the module name and class name while create logger object
     *
     * @param module - Module name as an optional
     * @param className - Class name as an optional
     * @example
     * ```
     * const logger = new Logger('module name', class name');
     * ```
     */
    constructor(module, className) {
        this.className = className !== null && className !== void 0 ? className : '';
        this.module = module !== null && module !== void 0 ? module : '';
    }
    /**
     * Set the multiple appenders and log level in Logger
     *
     * @param config - Logger config object
     * @example
     * ```
     * setConfig({appenders:[ConsoleLogAppender], level: 0});
     * ```
     */
    static setConfig(config) {
        Logger.config = config;
    }
    /**
     *
     * @param functionName - Log function message
     * @param message - Log message
     * @param data - Log data object
     * @example
     * ```
     * console.trace('log info');
     * ```
     */
    trace(functionName, message, data) {
        this.doLog(LogLevel.TRACE, { functionName, text: message, data });
    }
    /**
     *
     * @param functionName - Log function message
     * @param message - Log message
     * @param data - Log data object
     * @example
     * ```
     * console.info('log info');
     * ```
     */
    info(functionName, message, data) {
        this.doLog(LogLevel.INFO, { functionName, text: message, data });
    }
    /**
     *
     * @param functionName - Log function message
     * @param message - Log message
     * @param data - Log data object
     * @example
     * ```
     * console.debug('log debug');
     * ```
     */
    debug(functionName, message, data) {
        this.doLog(LogLevel.DEBUG, { functionName, text: message, data });
    }
    /**
     *
     * @param functionName - Log function message
     * @param message - Log message
     * @param data - Log data object
     * @example
     * ```
     * console.warn('log warn');
     * ```
     */
    warn(functionName, message, data) {
        this.doLog(LogLevel.WARN, { functionName, text: message, data });
    }
    /**
     *
     * @param functionName - Log function message
     * @param message - Log message
     * @param data - Log data object
     * @example
     * ```
     * console.error('log error');
     * ```
     */
    error(functionName, message, data) {
        this.doLog(LogLevel.ERROR, { functionName, text: message, data });
    }
    /**
     *
     * @param functionName - Log function message
     * @param message - Log message
     * @param data - Log data object
     * @example
     * ```
     * console.fatal('log fatal');
     * ```
     */
    fatal(functionName, message, data) {
        this.doLog(LogLevel.FATAL, { functionName, text: message, data });
    }
    /**
     *
     * @param level - Log level - 0
     * @param message - Log message
     * @example
     * ```
     * const logMessage: LogMessage
     * doLog(0, logMessage);
     * ```
     */
    doLog(level, message) {
        Logger.config.getAppenders().forEach((appender) => {
            if (level >= Logger.config.getLevel()) {
                appender.append({
                    level: level,
                    className: this.className,
                    module: this.module,
                    message: message,
                });
            }
        });
    }
}
Logger.config = new LoggerConfig();
//# sourceMappingURL=logger.js.map