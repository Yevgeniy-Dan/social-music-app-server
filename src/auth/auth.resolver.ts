import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { SignUpResponse } from './dto/signup-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<SignUpResponse> {
    try {
      await this.authService.signup(loginUserInput);

      return {
        success: true,
        message: 'User was sucessfully signup.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Something went wrong',
        error: error,
      };
    }
  }
}
