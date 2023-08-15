import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from 'src/auth/dto/user-response';

@ObjectType()
export class SearchResponse {
  @Field(() => UserResponse)
  user: UserResponse;
}
