import { HttpExceptionFilter, HttpResponseInterceptor } from '@common/http';
import { SwaggerConfig } from '@config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.enableVersioning();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(AppModule.apiPrefix);
  SwaggerConfig(app, AppModule.apiVersion);
  await app.listen(AppModule.port);
  return AppModule.port;
}

bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
