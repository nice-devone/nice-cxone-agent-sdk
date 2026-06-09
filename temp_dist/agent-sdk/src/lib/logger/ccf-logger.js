import { Logger } from '@nice-devone/core-sdk';
/**
 * Wrapper for Logger component
 */
export class CcfLogger {
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
        this.logger = new Logger(module, className);
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
        this.logger.error(functionName, message, data);
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
        this.logger.info(functionName, message, data);
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
        this.logger.trace(functionName, message, data);
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
        this.logger.debug(functionName, message, data);
    }
}
//# sourceMappingURL=ccf-logger.js.map