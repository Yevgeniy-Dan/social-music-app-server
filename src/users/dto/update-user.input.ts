import { IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @IsString()
  @Field({ nullable: true })
  avatar?: string;

  @IsString()
  @Field({ nullable: true })
  bio?: string;

  @IsString()
  @Field({ nullable: true })
  musicGenres?: string;

  @IsString()
  @Field({ nullable: true })
  socialMedia?: string;

  @IsString()
  @Field({ nullable: true })
  education?: string;
}
