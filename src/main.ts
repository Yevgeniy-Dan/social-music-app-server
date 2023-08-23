import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'configuration.interface';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Configuration>);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // app.enableCors({
  //   credentials: true,
  //   origin: configService.get('clientOrigin'),
  // });

  app.enableCors({
    credentials: true,
    origin: '*',
  });

  await app.listen(configService.get('port'));
}
bootstrap();
