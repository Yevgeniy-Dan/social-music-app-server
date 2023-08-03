import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUserInput } from './dto/sign-user.input';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNotFoundError } from './errors/UserNotFoundError';
import { MailService } from '../mail.service';
import { UserResponse } from './dto/user-response';
import { UserExistError } from './errors/UserExistError';
import { Configuration } from 'configuration.interface';
import { ConfigService } from '@nestjs/config';
import { AuthAccessTokenService } from './auth-access-token/auth-access-token.service';
import { AuthRefreshTokenService } from './auth-refresh-token/auth-refresh-token.service';
import { JwtTokenResponse } from './interfaces/jwt-token-response.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<Configuration>,
    private readonly authAccessTokenService: AuthAccessTokenService,
    private readonly authRefreshTokenService: AuthRefreshTokenService,
    private readonly mailService: MailService
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError(`User with email ${email} not found`);
    }

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: User) {
    const accessToken = this.authAccessTokenService.generateToken({
      username: user.username,
      sub: user.id,
    });

    const refreshToken = this.authRefreshTokenService.generateToken({
      username: user.username,
      sub: user.id,
    });

    await this.authRefreshTokenService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refresh(token: string, user: JwtTokenResponse) {
    const { userId } = user;
    const tokenInDb = await this.authRefreshTokenService.find(token);
    if (!tokenInDb) {
      throw new UnauthorizedException();
    }

    const updatedUser = await this.usersService.findUserById(userId);

    const accessToken = this.authAccessTokenService.generateToken({
      username: updatedUser.username,
      sub: updatedUser.id,
    });

    const refreshToken = this.authRefreshTokenService.generateToken({
      username: updatedUser.username,
      sub: updatedUser.id,
    });

    await this.authRefreshTokenService.saveToken(updatedUser.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: updatedUser,
    };
  }

  async logout(refreshToken: string) {
    const tokenData = await this.authRefreshTokenService.remove(refreshToken);
    return tokenData?.refreshToken;
  }

  async signup(signUserInput: SignUserInput) {
    const existedUser = await this.usersService.getUserByEmail(signUserInput.email);

    if (existedUser) {
      throw new UserExistError(`User with email ${existedUser.email} already exists.`);
    }

    const password = await bcrypt.hash(signUserInput.password, 10);

    const user = await this.usersService.create({
      ...signUserInput,
      password,
    });
    await this.mailService.sendActivationMail(
      user.email,
      `${this.configService.get('apiUrl')}/activate?token=${user.activationLink}`
    );

    const accessToken = this.authAccessTokenService.generateToken({
      username: user.username,
      sub: user.id,
    });

    const refreshToken = this.authRefreshTokenService.generateToken({
      username: user.username,
      sub: user.id,
    });

    await this.authRefreshTokenService.saveToken(user.id, refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
