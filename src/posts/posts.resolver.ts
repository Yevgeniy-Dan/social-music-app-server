import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
// import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { Like } from 'src/likes/entities/like.entity';
import { LikesService } from 'src/likes/likes.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly likesService: LikesService,
    private readonly usersService: UsersService
  ) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
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
