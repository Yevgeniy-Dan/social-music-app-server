import { IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  avatar?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  bio?: string;

  // @IsString()
  // @IsOptional()
  // @Field({ nullable: true })
  // musicGenres?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  socialMedia?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  education?: string;
}
