import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNotFoundError } from './errors/UserNotFoundError';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

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

  async signup(loginUserInput: LoginUserInput): Promise<User> {
    try {
      const user = await this.usersService.getUserByName(loginUserInput.username); //TODO: Change 'getUserByName' method logic
      if (user) {
        throw new Error('User aldready exists');
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        const password = await bcrypt.hash(loginUserInput.password, 10);

        return await this.usersService.create({
          ...loginUserInput,
          password,
        });
      }

      throw error;
    }
  }
}
