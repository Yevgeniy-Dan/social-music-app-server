import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService, private readonly usersService: UsersService) {}

  @ResolveField(() => User, { name: 'user' })
  async getUsers(@Parent() comment: Comment): Promise<User> {
    return await this.usersService.findUserById(comment.userId);
  }
}
