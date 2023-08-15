import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchResponse } from './dto/search-response';
import { SearchService } from './search.service';

@Resolver(() => SearchResponse)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [SearchResponse], { name: 'searchByName' })
  async searchUsers(@Args('username') username: string) {
    const filteredUsers = await this.searchService.searchByUsername(username);
    const response = filteredUsers.map((user) => ({ user }));

    return response;
  }

  @Query(() => [SearchResponse], { name: 'searchByHashtag' })
  async searchByHashtag(@Args('hashtagId') hashtagId: string) {
    const users = await this.searchService.searchByHashtag(hashtagId);

    const response = users.map((user) => ({ user }));

    return response;
  }
}
