import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Hashtag } from './hashtag.entity';

@Entity()
@ObjectType()
export class UserHashtag {
  @PrimaryColumn()
  @Field()
  userId: string;

  @ManyToOne(() => User, (user) => user.userHashtags)
  @Field(() => User)
  user: User;

  @PrimaryColumn()
  @Field()
  hashtagId: string;

  @ManyToOne(() => Hashtag, (tag) => tag.userHashtags)
  @Field(() => Hashtag)
  hashtag: Hashtag;
}
