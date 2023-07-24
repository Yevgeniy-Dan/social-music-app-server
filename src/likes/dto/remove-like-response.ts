import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveLikeResponse {
  @Field()
  success: boolean;
}
