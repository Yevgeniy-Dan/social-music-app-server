import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { UserResponse } from './user-response';

@ObjectType()
export class SignUpResponse {
  // @Field()
  // success: boolean;

  // @Field()
  // message: string;

  // @Field({ nullable: true })
  // error?: string | null;
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
