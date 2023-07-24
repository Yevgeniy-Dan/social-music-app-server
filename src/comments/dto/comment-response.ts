import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { ReplyTo } from '../entities/replyto.entity';

@ObjectType()
export class CommentResponse {
  @Field()
  id: string;

  @Field(() => User)
  user: User;

  @Field({ nullable: true })
  parentId: string | null;

  @Field(() => Post)
  post: Post;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
