import { LoggerConfig } from './logger-config';
import { AgentLog, ContactLog, SkillLog } from '@nice-devone/common-sdk';
/**
 * This class implements multiple loglevels with different appenders
 */
export declare class Logger {
    static config: LoggerConfig;
    private className;
    private module;
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
    constructor(module?: string, className?: string);
    /**
     * Set the multiple appenders and log level in Logger
     *
     * @param config - Logger config object
     * @example
     * ```
     * setConfig({appenders:[ConsoleLogAppender], level: 0});
     * ```
     */
    static setConfig(config: LoggerConfig): void;
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
    trace(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
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
    info(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
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
    debug(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
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
    warn(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
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
    error(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
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
    fatal(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
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
    private doLog;
}
