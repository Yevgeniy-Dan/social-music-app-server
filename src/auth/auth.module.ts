// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { MailService } from '../mail.service';
import { AuthAccessTokenModule } from './auth-access-token/auth-access-token.module';
import { AuthRefreshTokenModule } from './auth-refresh-token/auth-refresh-token.module';
import { ActivationService } from './activation.service';
import { ActivationController } from './controllers/activation.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [UsersModule, AuthAccessTokenModule, AuthRefreshTokenModule],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    MailService,
    ActivationService,
    ActivationService,
  ],
  controllers: [ActivationController],
})
export class AuthModule {}
