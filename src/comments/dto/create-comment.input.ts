import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  postId: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  parentId?: string;
}
