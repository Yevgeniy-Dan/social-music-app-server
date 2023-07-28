// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { MailService } from './mail.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { AuthAccessTokenModule } from './auth-access-token.module';
import { AuthRefreshTokenModule } from './auth-refresh-token.module';
import { ActivationService } from './activation.service';
import { ActivationController } from './controllers/activation.controller';

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
