import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserHashtag } from './userhashtag.entity';

@Entity()
@ObjectType()
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  tag: string;

  @OneToMany(() => UserHashtag, (userHashtag) => userHashtag.hashtag)
  userHashtags: UserHashtag[];
}
