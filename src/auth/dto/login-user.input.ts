import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Field()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @MinLength(8)
  @Field()
  readonly password: string;
}
