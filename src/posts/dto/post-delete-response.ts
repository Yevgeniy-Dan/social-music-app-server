import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostDeleteResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
