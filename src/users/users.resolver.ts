import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import { PaginationArgs } from 'src/posts/dto/pagination.args';
import { PostResponse } from 'src/posts/dto/post-response';
import { PostsResolver } from 'src/posts/posts.resolver';

@Resolver(() => User)
export class UsersResolver {
  private readonly POSTS_PER_PAGE = 15;

  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
    private readonly postsResolver: PostsResolver
  ) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAccessAuthGuard)
  findAll(@Context() context) {
    // console.log(context.req.user);
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args('username') username: string) {
    return this.usersService.getUserByName(username);
  }

  @ResolveField('posts', () => [PostResponse])
  async getPosts(@Args() args: PaginationArgs, @Parent() user: User) {
    const { id } = user;
    const { page } = args;
    const offset = (page - 1) * this.POSTS_PER_PAGE;

    const posts = await this.postsService.findAllByUserId({ userId: id, limit: this.POSTS_PER_PAGE, offset });

    const postResponses: PostResponse[] = [];

    for (const post of posts) {
      const postResponse = await this.postsResolver.preparePostToResponse(post, id);

      postResponses.push(postResponse);
    }

    return postResponses;
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(JwtAccessAuthGuard)
  async update(@Context() context, @Args('updateUserInput') args: UpdateUserInput): Promise<User> {
    const { userId } = context.req.user;

    if (userId !== args.id) {
      throw new Error('You are not authorized to update this user.');
    }

    return this.usersService.update(args);
  }
}
