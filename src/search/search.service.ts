import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Hashtag } from './entities/hashtag.entity';
import { Repository } from 'typeorm';
import { UserHashtag } from './entities/userhashtag.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
    @InjectRepository(UserHashtag) private userHashtagRepository: Repository<UserHashtag>
  ) {}

  async searchByUsername(username: string) {
    const allUsers = await this.usersService.findAll();

    const filteredUsers = allUsers.filter((user) => user.username.toLowerCase().startsWith(username.toLowerCase()));

    return filteredUsers;
  }

  async searchByHashtag(hashtagId: string) {
    const userHashtags = await this.userHashtagRepository.find({ where: { hashtagId } });
    const userIds = userHashtags.map((uh) => {
      return uh.userId;
    });

    const users = await this.usersService.findByIds(userIds);

    return users;
  }
}
