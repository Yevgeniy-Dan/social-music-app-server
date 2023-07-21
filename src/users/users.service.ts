import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create({
      ...createUserInput,
    });

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async getUserByName(username: string) {
    const user = await this.userRepository.findOneBy({
      username,
    });

    if (!user) {
      throw new Error('User does not exists.');
    }

    return user;
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepository.findOneBy({
      id: userId,
    });
  }

  async updateUserById(userId: string, fieldToUpdate: string, newValue: any): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user[fieldToUpdate] = newValue;
    return this.userRepository.save(user);
  }
}
