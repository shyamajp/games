enum Level {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

interface Log {
  level: Level;
  location?: string;
  message: string;
  timestamp: string;
}

/**
 * TODO: revisit this implementation
 * - find better namings
 * - dynamically create methods?
 * - show logs in console and in the UI
 */

export class Logger {
  static data: Log[] = [];

  static debug(message: string, location?: string): void {
    const timestamp = new Date().toISOString();
    this.data.push({ level: Level.DEBUG, location, message, timestamp });
  }

  static info(message: string, location?: string): void {
    const timestamp = new Date().toISOString();
    this.data.push({ level: Level.INFO, location, message, timestamp });
  }

  static warn(message: string, location?: string): void {
    const timestamp = new Date().toISOString();
    this.data.push({ level: Level.WARN, location, message, timestamp });
  }

  static error(message: string, location?: string): void {
    const timestamp = new Date().toISOString();
    this.data.push({ level: Level.ERROR, location, message, timestamp });
  }

  private static format(log: Log): string {
    const location = log.location ? ` (in ${log.location})` : "";
    return `[${log.timestamp}] ${log.level}: ${log.message}${location}`;
  }

  static output(count: number = 100): void {
    this.data.slice(-count).forEach((log) => console.log(this.format(log)));
  }
}
