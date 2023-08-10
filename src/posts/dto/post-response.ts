import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserResponse } from 'src/auth/dto/user-response';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class PostResponse {
  @Field()
  id: string;

  @Field()
  mediaUrl: string;

  @Field()
  userId: string;

  @Field(() => UserResponse)
  user: UserResponse;

  @Field((type) => [Like], { nullable: 'items' })
  likes?: Like[];

  @Field(() => Int)
  totalLikes: number;

  @Field(() => Int)
  totalComments: number;

  @Field()
  isLiked: boolean;

  @Field((type) => [Comment], { nullable: 'items' })
  comments?: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
