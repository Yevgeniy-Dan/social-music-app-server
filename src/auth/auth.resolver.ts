import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { SignUserInput } from './dto/sign-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { SignUpResponse } from './dto/signup-response';
import { MailService } from './mail.service';
import { Response, Request } from 'express';
import { LoginUserInput } from './dto/login-user.input';
import { LogoutResponse } from './dto/logout-response';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { Configuration } from 'configuration.interface';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserNotFoundError } from './errors/UserNotFoundError';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
    private userService: UsersService,
    private configService: ConfigService<Configuration>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
    const loginResponse = await this.authService.login(context.user);
    const response: Response = context.req.res;

    response.cookie('refreshToken', loginResponse.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    return { ...loginResponse };
  }

  @Mutation(() => String)
  async sendReactivation(@Args('email') email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError(`User with ${email} email not found`);
    }

    if (!user.isActivated && user.email) {
      const activationLink = uuidv4();

      user.activationLink = activationLink;
      user.isActivated = false;

      await this.userRepository.save(user);
      await this.mailService.sendActivationMail(
        user.email,
        `${this.configService.get('apiUrl')}/activate?token=${user.activationLink}`
      );
      return 'Reactivation link sent successfully!';
    } else {
      throw new ForbiddenException('Unable to send reactivation link.');
    }
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() context) {
    const { refreshToken } = context.req.cookies;
    const token = await this.authService.logout(refreshToken);
    const response: Response = context.req.res;
    response.clearCookie('refreshToken');
    return { token };
  }

  @Mutation(() => SignUpResponse)
  async signup(
    @Args('signupUserInput') signupUserInput: SignUserInput,
    @Context() context
  ): Promise<SignUpResponse | Error> {
    try {
      const user = await this.authService.signup(signupUserInput);
      const response: Response = context.req.res;
      response.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      });

      const { accessToken, refreshToken } = user;

      return {
        accessToken,
        refreshToken,
        user: user.user,
      };
    } catch (error) {
      console.log(error);
      return new Error(`${error && error?.message}`);
    }
  }

  @Mutation(() => LoginResponse)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Context() context) {
    try {
      const { refreshToken } = context.req.cookies;
      const refreshResponse = await this.authService.refresh(refreshToken, context.req.user);
      const response: Response = context.req.res;

      response.cookie('refreshToken', refreshResponse.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      });

      return { ...refreshResponse };
    } catch (error) {
      return new Error(`${error && error?.message}`);
    }
  }
}
