import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReplyTo } from './replyto.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  userId: string;

  @ManyToOne((type) => User, (user) => user.comments)
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  postId: string;

  @ManyToOne((type) => Post, (post) => post.comments)
  @Field(() => Post)
  post: Post;

  @OneToMany(() => ReplyTo, (replyTo) => replyTo.parent)
  replies: ReplyTo[];

  @Column()
  @Field()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
