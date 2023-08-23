import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  activationLink?: string;

  @Field()
  isActivated: boolean;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  bio?: string;

  // @Field({ nullable: true })
  // musicGenres?: string;

  @Field({ nullable: true })
  socialMedia?: string;

  @Field({ nullable: true })
  education?: string;
}
