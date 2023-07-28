import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserNotFoundError } from './errors/UserNotFoundError';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivationService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}
  async activate(activationLink: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ activationLink });
    if (!user) {
      throw new UserNotFoundError('Invalid activation link, user not found.');
    }
    user.isActivated = true;
    return await this.usersRepository.save(user);
  }
}
