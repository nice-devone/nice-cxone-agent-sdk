// src/utils/Logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Simple singleton Logger for the automation framework.
 * Outputs timestamped, leveled messages to stdout/stderr.
 * Set LOG_LEVEL env var to control verbosity (default: info).
 */
export class Logger {
  private static instance: Logger;
  private readonly level: LogLevel;

  private constructor() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    this.level = (LOG_LEVELS[env as LogLevel] !== undefined ? env : 'info') as LogLevel;
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
  }

  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (LOG_LEVELS[level] < LOG_LEVELS[this.level]) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase().padEnd(5)}]`;
    const formatted = args.length > 0 ? `${prefix} ${message} ${JSON.stringify(args)}` : `${prefix} ${message}`;

    if (level === 'error') {
      console.error(formatted);
    } else if (level === 'warn') {
      console.warn(formatted);
    } else {
      console.log(formatted);
    }
  }
}
