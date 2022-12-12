import { App } from "./app";
import { LoggerService } from "./logger/logger.service";

async function bootstrap() {
  const app = new App(new LoggerService("loggerApp"));
  await app.init();
}

bootstrap();
