import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { Post } from './posts/posts.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { Configuration } from 'configuration.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configuration>) => ({
        type: 'postgres',
        host: configService.get('database').host,
        port: configService.get('database').port,
        username: configService.get('database').username,
        password: configService.get('database').password,
        database: configService.get('database').dbName,
        entities: [User, Post],
        synchronize: configService.get('database').synchronize,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
