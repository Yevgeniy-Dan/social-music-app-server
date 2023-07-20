import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Configuration } from 'configuration.interface';
import configuration from 'config/configuration';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { CommentTreeService } from 'config/initializeCommentTree';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.sql'),
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
        entities: ['dist/src/**/*.entity.js'],
        synchronize: configService.get('database').synchronize,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommentTreeService],
})
export class AppModule {}
