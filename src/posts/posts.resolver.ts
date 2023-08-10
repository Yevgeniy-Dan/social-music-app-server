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
import { CommentTree } from 'src/utils/comment-tree';
import { CommentResponse } from 'src/comments/dto/comment-response';
import { CreateLikeInput } from 'src/likes/dto/create-like.input';
import { RemoveLikeResponse } from 'src/likes/dto/remove-like-response';
import { UserResponse } from 'src/auth/dto/user-response';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import { PostResponse } from './dto/post-response';

@Resolver(() => PostResponse)
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

  @Query(() => [PostResponse], { name: 'posts' })
  @UseGuards(JwtAccessAuthGuard)
  async findAll(@Args() args: PaginationArgs, @Context() context) {
    const { userId } = context.req.user;
    const { page } = args;
    const offset = (page - 1) * this.POSTS_PER_PAGE;

    const posts = await this.postsService.findAll({ limit: this.POSTS_PER_PAGE, offset });

    const postResponses: PostResponse[] = [];

    for (const post of posts) {
      const postResponse = await this.preparePostToResponse(post, userId);

      postResponses.push(postResponse);
    }

    return postResponses;
  }

  @Query(() => PostResponse, { name: 'post' })
  @UseGuards(JwtAccessAuthGuard)
  async findOne(@Args('id') id: string, @Context() context): Promise<PostResponse> {
    const { userId } = context.req.user;

    const post = await this.postsService.findOne(id);
    const postResponse = await this.preparePostToResponse(post, userId);

    return postResponse;
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() post: PostResponse): Promise<UserResponse> {
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
  @UseGuards(JwtAccessAuthGuard)
  async getComments(@Parent() post: Post) {
    if (!this.commentTreeSet.has(post.id)) {
      await this.initializeCommentTreeForPost(post);
    }

    const comments = await this.commentTreeSet.get(post.id).sort();

    return comments;
  }

  @UseGuards(JwtAccessAuthGuard)
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

  @UseGuards(JwtAccessAuthGuard)
  @Mutation(() => Like, { name: 'createLike' })
  async createLike(@Context() context, @Args('postId') postId: string) {
    const { userId } = context.req.user;

    return this.likesService.create({
      postId,
      userId,
    });
  }

  @UseGuards(JwtAccessAuthGuard)
  @Mutation(() => Like, { name: 'removeLike' })
  async removeLike(@Context() context, @Args('postId') postId: string) {
    const { userId } = context.req.user;

    const isRemove = await this.likesService.remove({
      userId,
      postId,
    });

    return isRemove;
  }

  async preparePostToResponse(post: Post, userId: string): Promise<PostResponse> {
    const isLiked = await this.likesService.findOneByPostUser(post.id, userId);
    const totalLikes = await this.getTotalLikes(post);
    const totalComments = await this.getTotalComments(post);

    return { ...post, isLiked: !!isLiked, totalLikes, totalComments };
  }
}
