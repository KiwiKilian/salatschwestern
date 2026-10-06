import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import basicAuth from "express-basic-auth";

import { AppModule } from "@/app.module";
import { EnvironmentVariables } from "@/types/EnvironmentVariables";
import "@/setup/dayjs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService: ConfigService<EnvironmentVariables> = app.get(ConfigService);

  app.enableCors({
    origin: configService.get("CORS_ORIGIN").split(","),
    credentials: true,
  });
  app.disable("x-powered-by");
  app.setGlobalPrefix("api/v1");
  app.enableShutdownHooks();

  if (configService.get("SWAGGER_ENABLED")) {
    const swaggerUsername = configService.get("SWAGGER_USERNAME", { infer: true });
    const swaggerPassword = configService.get("SWAGGER_PASSWORD", { infer: true });
    if (swaggerUsername && swaggerPassword) {
      app.use(
        "/api/docs*",
        basicAuth({
          challenge: true,
          users: { [swaggerUsername]: swaggerPassword },
        }),
      );
    }

    const config = new DocumentBuilder()
      .setTitle("Salatschwestern Backend")
      .setVersion("1.0.0")
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey, methodKey) => methodKey,
    });
    SwaggerModule.setup("api/docs", app, document);
  }

  await app.listen(8080);
}

bootstrap();
