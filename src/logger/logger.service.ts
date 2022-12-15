import { injectable } from "inversify";
import { Logger } from "tslog";
import { ILogger } from "./logger.interface";
import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<LoggerService>;

  constructor(name = "Logger") {
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
