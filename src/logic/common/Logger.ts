import { logs } from "../../store";

enum Level {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export interface Log {
  level: Level;
  location?: string;
  message: string;
  timestamp: string;
}

/**
 * TODO: revisit this implementation
 * - find better namings
 * - dynamically create methods?
 */

export class Logger {
  static data: Log[] = [];

  static debug(message: string, location?: string): void {
    this.update(Level.DEBUG, message, location);
  }

  static info(message: string, location?: string): void {
    this.update(Level.INFO, message, location);
  }

  static warn(message: string, location?: string): void {
    this.update(Level.WARN, message, location);
  }

  static error(message: string, location?: string): void {
    this.update(Level.ERROR, message, location);
  }

  private static update(level: Level, message: string, location?: string) {
    const timestamp = new Date().toISOString();
    const log = { level, location, message, timestamp };
    console[level](this.format(log));
    this.data.push(log);
    // Update store for Svelte components
    logs.update((logs) => [...logs, this.format(log)]);
  }

  private static format(log: Log): string {
    const location = log.location ? ` (in ${log.location})` : "";
    return `[${log.timestamp}] ${log.level}: ${log.message}${location}`;
  }
}
