import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import config from '../../../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/users/entities/token.entity';
import { AuthRefreshTokenService } from './auth-refresh-token.service';

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
        signOptions: { expiresIn: '7d' },
        secret: config().jwt_refresh_secret,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthRefreshTokenService],
  exports: [JwtModule, TypeOrmModule, AuthRefreshTokenService],
})
export class AuthRefreshTokenModule {}

//  providers: [
//     AuthRefreshTokenService,
//     JwtAccessStrategy,
//     JwtRefreshStrategy,
//     JwtRefreshAuthGuard,
//   ],
