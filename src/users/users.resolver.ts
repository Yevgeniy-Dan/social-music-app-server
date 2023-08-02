import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly postsService: PostsService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard, JwtAccessAuthGuard)
  findAll(@Context() context) {
    // console.log(context.req.user);
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args('username') username: string) {
    return this.usersService.getUserByName(username);
  }

  @ResolveField('posts', () => [Post])
  getPosts(@Parent() user: User) {
    const { id } = user;
    return this.postsService.findAllByUserId({ userId: id });
  }
}
