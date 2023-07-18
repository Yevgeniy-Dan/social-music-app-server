import { Injectable } from '@nestjs/common';
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

  async findOne(username: string) {
    return await this.userRepository.findOneBy({
      username,
    });
  }
}
