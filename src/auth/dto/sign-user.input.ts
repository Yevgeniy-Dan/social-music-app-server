import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class SignUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Field()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit',
  })
  @MinLength(8)
  @MaxLength(32)
  @Field()
  readonly password: string;
}
