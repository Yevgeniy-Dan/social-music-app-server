import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Req } from '@nestjs/common';
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

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private readonly mailService: MailService) {}

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
        user: {
          ...user.result,
        },
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
      console.log(refreshResponse);
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
