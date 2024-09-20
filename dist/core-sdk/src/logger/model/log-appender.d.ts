import { LogEntry } from '../model/log-entry';
export interface LogAppender {
    append(entry: LogEntry): void;
    clear(): void;
}
