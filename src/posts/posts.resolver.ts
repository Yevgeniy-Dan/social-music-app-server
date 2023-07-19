import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
// import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { Like } from 'src/likes/entities/like.entity';
import { LikesService } from 'src/likes/likes.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PaginationArgs } from './dto/pagination.args';

@Resolver(() => Post)
export class PostsResolver {
  private readonly PER_PAGE = 100;
  constructor(
    private readonly postsService: PostsService,
    private readonly likesService: LikesService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [Post], { name: 'posts' })
  async findAll(@Args() args: PaginationArgs): Promise<Post[]> {
    const { page } = args;
    const offset = (page - 1) * this.PER_PAGE;

    return this.postsService.findAll({ limit: this.PER_PAGE, offset });
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() post: Post): Promise<User> {
    return await this.usersService.findUserById(post.userId);
  }

  @ResolveField('likes', () => [Like])
  getLikes(@Parent() post: Post) {
    const { id } = post;
    return this.likesService.findAllByPostId({ postId: id });
  }
}
