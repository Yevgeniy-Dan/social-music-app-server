import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
  @Field()
  postId: string;

  @Field()
  userId: string;
}
