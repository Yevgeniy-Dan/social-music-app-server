import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchResponse } from './dto/search-response';
import { SearchService } from './search.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { Repository } from 'typeorm';

@Resolver(() => SearchResponse)
export class SearchResolver {
  constructor(
    private readonly searchService: SearchService,
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>
  ) {}

  @Query(() => [SearchResponse], { name: 'searchByName' })
  async searchUsers(@Args('username') username: string) {
    const filteredUsers = await this.searchService.searchByUsername(username);
    const response = filteredUsers.map((user) => ({ user }));

    return response;
  }

  @Query(() => [SearchResponse], { name: 'searchByHashtag' })
  async searchByHashtag(@Args('hashtagName') hashtagName: string) {
    const { id } = await this.hashtagRepository.findOneBy({ tag: hashtagName });
    const users = await this.searchService.searchByHashtag(id);

    const response = users.map((user) => ({ user }));

    return response;
  }
}
