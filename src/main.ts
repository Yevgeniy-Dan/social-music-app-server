import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'configuration.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Configuration>);

  app.enableCors({
    credentials: true,
    origin: configService.get('clientOrigin'),
  });

  await app.listen(configService.get('port'));
}
bootstrap();
