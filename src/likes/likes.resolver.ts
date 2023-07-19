import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
// import { CreateLikeInput } from './dto/create-like.input';
// import { UpdateLikeInput } from './dto/update-like.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService, private readonly usersService: UsersService) {}

  @Query(() => [Like], { name: 'likes' })
  findAll() {
    return this.likesService.findAll();
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() like: Like): Promise<User> {
    return await this.usersService.findUserById(like.userId);
  }
}
