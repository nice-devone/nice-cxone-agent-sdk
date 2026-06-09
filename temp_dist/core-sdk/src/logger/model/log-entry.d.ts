import { LogLevel } from '../enum/log-level';
import { LogMessage } from './log-message';
export interface LogEntry {
    level: LogLevel;
    module?: string;
    className?: string;
    message: LogMessage;
}
