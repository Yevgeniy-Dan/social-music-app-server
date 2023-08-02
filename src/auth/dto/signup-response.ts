import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { UserResponse } from './user-response';

@ObjectType()
export class SignUpResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
