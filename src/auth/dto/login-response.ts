import { ObjectType, Field } from '@nestjs/graphql';
import { UserResponse } from './user-response';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
