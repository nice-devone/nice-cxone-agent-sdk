import { LogEntry } from './log-entry';
export interface LogFormatter {
    format(entry: LogEntry): string;
}
