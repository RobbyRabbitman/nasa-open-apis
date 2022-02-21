/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { createProxy } from "@nasa-open-apis/apis/shared/util/proxy-util";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  createProxy(app, environment.target, process.env.API_KEY);
  if (!environment.production)
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
