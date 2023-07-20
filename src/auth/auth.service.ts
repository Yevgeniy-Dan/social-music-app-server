import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpUserInput } from './dto/signup.input';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'configuration.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<Configuration>
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByName(username);

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
      user,
    };
  }

  async signup(signUpUserInput: SignUpUserInput) {
    const user = await this.usersService.getUserByName(signUpUserInput.username);

    if (user) {
      throw new Error('User aldready exists');
    }

    const password = await bcrypt.hash(signUpUserInput.password, 10);

    const createdUser = await this.usersService.create({
      ...signUpUserInput,

      password,
    });

    const { accessToken, refreshToken } = await this.createTokens(createdUser.id, createdUser.username);

    await this.updateRefreshToken(createdUser.id, refreshToken);

    return { accessToken, refreshToken, createdUser };
  }

  async createTokens(userId: string, username: string) {
    const accessToken = this.jwtService.sign(
      { userId, username },
      {
        expiresIn: '10s',
        secret: this.configService.get('jwt_secret'),
      }
    );
    const refreshToken = this.jwtService.sign(
      { userId, username, accessToken },
      {
        expiresIn: '2d',
        secret: this.configService.get('jwt_refresh_secret'),
      }
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = bcrypt.hash(refreshToken, 10);
    await this.usersService.updateUserById(userId, 'refreshToken', hashedRefreshToken);
  }
}
