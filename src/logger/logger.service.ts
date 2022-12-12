import { Logger } from "tslog";

export class LoggerService {
  public logger: Logger<LoggerService>;

  constructor(name: string) {
    this.logger = new Logger({
      name: name,
      type: "pretty",
    });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    //отправка в sentry/rollbar
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
