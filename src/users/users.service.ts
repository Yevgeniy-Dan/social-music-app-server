import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from 'src/auth/errors/UserNotFoundError';
import { plainToClass } from 'class-transformer';
import { UserResponse } from 'src/auth/dto/user-response';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserInput: CreateUserInput) {
    const activationLink = uuidv4();

    const user = this.userRepository.create({ ...createUserInput, activationLink });

    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;

    return result;
  }

  findAll() {
    return this.userRepository.find();
  }

  async getUserByName(username: string): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({
      username,
    });

    if (!user) {
      throw new UserNotFoundError('User with the provided username not found.');
    }

    const { password, ...result } = user;
    return result;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    const { password, ...result } = user;
    return result;
  }

  async update(user: UpdateUserInput): Promise<User> {
    const existedUser = await this.userRepository.findOneBy({ id: user.id });

    if (!existedUser) {
      throw new NotFoundException('User not found');
    }

    Object.assign(existedUser, user);

    return await this.userRepository.save(existedUser);
  }
}
