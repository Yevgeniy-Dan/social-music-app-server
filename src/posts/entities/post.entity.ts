import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  mediaUrl: string;

  @Column()
  @Field()
  userId: string;

  @ManyToOne((type) => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @OneToMany(() => Like, (like) => like.post, { cascade: true })
  @Field((type) => [Like], { nullable: 'items' })
  likes?: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field((type) => [Comment], { nullable: 'items' })
  comments?: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
