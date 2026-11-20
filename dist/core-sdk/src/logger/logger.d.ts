import { LoggerConfig } from './logger-config';
import { AgentLog, ContactLog, JourneyLogEntry, SkillLog } from '@nice-devone/common-sdk';
/**
 * The global console object augmented with the journey-checkpoint hook installed
 * by `grafanaInit`. The console is shared across module-federation remotes even
 * when each remote has a separate copy of the logger package.
 */
export declare type ConsoleWithJourneyHook = Console & {
    __cxaJourneyCheckpoint?: (entry: JourneyLogEntry) => void;
};
/**
 * This class implements multiple loglevels with different appenders
 */
export declare class Logger {
    private className;
    static config: LoggerConfig;
    private static eventLog;
    private readonly maxEventLogLength;
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
     * Returns the EventLog
     *
     * @example
     *  getEventLog()
     */
    getEventLog(): string[];
    /**
     * Saves messages into an array with the most recent first.
     * It pops the oldest message off the back when it reaches max length
     *
     * @param message - the message string to save into the eventlog
     * @example
     *
     * sendToEventLog(message);
     *
     */
    private saveToEventLog;
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
     * Journey-checkpoint logging. Bypasses Logger.config.getLevel() by design —
     * even LogLevel.OFF does not suppress journey events. The independent
     * DIGITAL_JOURNEY_TELEMETRY_FEATURE_TOGGLE (read inside grafanaInit's journey
     * hook) is the sole opt-out mechanism for this event stream.
     *
     * Invokes the well-known console.__cxaJourneyCheckpoint hook if grafanaInit() has
     * installed one — see the ConsoleWithJourneyHook comment above for why this
     * console-based path is used instead of Logger.config's appenders.
     *
     * @param entry - Journey checkpoint data to forward.
     * @example
     * ```
     * logger.journey({ journeyId, journeyName, journeyPoint, role, status });
     * ```
     */
    journey(entry: JourneyLogEntry): void;
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
