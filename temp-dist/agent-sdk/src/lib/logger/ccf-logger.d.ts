import { AgentLog, ContactLog, SkillLog } from '@nice-devone/common-sdk';
/**
 * Wrapper for Logger component
 */
export declare class CcfLogger {
    private logger;
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
     * console.debug('log debug');
     * ```
     */
    debug(functionName: string, message: string, data?: ContactLog | AgentLog | SkillLog): void;
}
