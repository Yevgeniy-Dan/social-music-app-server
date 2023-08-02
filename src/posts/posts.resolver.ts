import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
// import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { Like } from 'src/likes/entities/like.entity';
import { LikesService } from 'src/likes/likes.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PaginationArgs } from './dto/pagination.args';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommentsService } from 'src/comments/comments.service';
import { CommentTreeService } from 'config/initializeCommentTree';
import { UseGuards } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { CreateCommentInput } from 'src/comments/dto/create-comment.input';
import { CommentTree, IComment } from 'src/utils/comment-tree';
import { CommentResponse } from 'src/comments/dto/comment-response';
import { CreateLikeInput } from 'src/likes/dto/create-like.input';
import { RemoveLikeResponse } from 'src/likes/dto/remove-like-response';
import { UserResponse } from 'src/auth/dto/user-response';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';

@Resolver(() => Post)
export class PostsResolver {
  private readonly POSTS_PER_PAGE = 15;
  private readonly commentTreeSet: Map<string, CommentTree> = new Map<string, CommentTree>();

  constructor(
    private readonly postsService: PostsService,
    private readonly likesService: LikesService,
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
    private readonly commentTreeService: CommentTreeService
  ) {}

  private async initializeCommentTreeForPost(post: Post) {
    const comments = await this.commentsService.findAllByPostId(post.id);
    //TODO: deinitialize comment tree to avoid memory problem
    const commentTree = await this.commentTreeService.initializeCommentTree(comments);
    this.commentTreeSet.set(post.id, commentTree);
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll(@Args() args: PaginationArgs): Promise<Post[]> {
    const { page } = args;
    const offset = (page - 1) * this.POSTS_PER_PAGE;

    return this.postsService.findAll({ limit: this.POSTS_PER_PAGE, offset });
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() post: Post): Promise<UserResponse> {
    const user = await this.usersService.findUserById(post.userId);
    return user;
  }

  @ResolveField('likes', () => [Like])
  async getLikes(@Parent() post: Post): Promise<Like[]> {
    const { id } = post;
    return this.likesService.findAllByPostId({ postId: id });
  }

  @ResolveField('totalLikes', () => Int)
  async getTotalLikes(@Parent() post: Post) {
    const { id } = post;
    const likes = await this.likesService.findAllByPostId({ postId: id });
    return likes.length;
  }

  @ResolveField('totalComments', () => Int)
  async getTotalComments(@Parent() post: Post) {
    const { id } = post;
    const comments = await this.commentsService.findAllByPostId(id);
    return comments.length;
  }

  @ResolveField('comments', () => [CommentResponse])
  @UseGuards(GqlAuthGuard, JwtAccessAuthGuard)
  async getComments(@Parent() post: Post) {
    if (!this.commentTreeSet.has(post.id)) {
      await this.initializeCommentTreeForPost(post);
    }

    const comments = await this.commentTreeSet.get(post.id).sort();

    // console.log(comments);

    return comments;
  }

  @UseGuards(GqlAuthGuard, JwtAccessAuthGuard)
  @Mutation(() => Comment, { name: 'createComment' })
  async createCommentOnPost(@Context() context, @Args('createCommentInput') args: CreateCommentInput) {
    const { userId } = context.req.user;
    const comment = await this.commentsService.createComment(
      {
        ...args,
      },
      userId
    );

    if (!this.commentTreeSet.has(args.postId)) {
      const post = await this.postsService.findOne(args.postId);
      await this.initializeCommentTreeForPost(post);
    }

    const { addComment, addReplyIdObj, addEdge } = this.commentTreeSet.get(comment.postId);

    if (args.parentId) {
      addReplyIdObj(args.parentId, comment.id);
      addComment(comment);
      addEdge(args.parentId, comment.id);
    } else {
      addComment(comment);
    }

    return comment;
  }

  @UseGuards(GqlAuthGuard, JwtAccessAuthGuard)
  @Mutation(() => Like, { name: 'createLike' })
  async createLike(@Context() context, @Args('postId') postId: string) {
    const { userId } = context.req.user;

    return this.likesService.create({
      postId,
      userId,
    });
  }

  @UseGuards(GqlAuthGuard, JwtAccessAuthGuard)
  @Mutation(() => Like, { name: 'removeLike' })
  async removeLike(@Context() context, @Args('postId') postId: string) {
    const { userId } = context.req.user;

    const isRemove = await this.likesService.remove({
      userId,
      postId,
    });

    return isRemove;
  }
}
