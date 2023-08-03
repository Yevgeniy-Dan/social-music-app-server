import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, IsEmail, Length } from 'class-validator';

@InputType()
export class SignUserInput {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
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
  @Length(8, 32)
  @Field()
  readonly password: string;
}
