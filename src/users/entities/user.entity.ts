import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field()
  avatar: string;

  @Column({ type: 'text' })
  @Field()
  bio: string;

  @Column()
  @Field()
  musicGenres: string;

  @Column()
  @Field()
  socialMedia: string;

  @Column({ type: 'text' })
  @Field()
  education: string;

  @OneToMany((type) => Post, (post) => post.userId)
  @Field((type) => [Post], { nullable: 'items' })
  posts: Post[];
}
