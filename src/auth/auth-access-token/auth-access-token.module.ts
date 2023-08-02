import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import config from '../../../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../../config/configuration';
import { AuthAccessTokenService } from './auth-access-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/users/entities/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    PassportModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: { expiresIn: '60m' },
        secret: config().jwt_access_secret,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthAccessTokenService],
  exports: [JwtModule, AuthAccessTokenService, TypeOrmModule],
})
export class AuthAccessTokenModule {}
