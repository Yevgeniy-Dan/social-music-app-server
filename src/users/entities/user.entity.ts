import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, Entity, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Token } from './token.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  @Index({ unique: true })
  username: string;

  @Column()
  @Field()
  @Index({ unique: true })
  email: string;

  @Column({ default: false })
  @Field()
  isActivated: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  activationLink: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  musicGenres?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  socialMedia?: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  education?: string;

  @OneToMany((type) => Post, (post) => post.user, { cascade: true })
  @Field((type) => [Post], { nullable: 'items' })
  posts?: Post[];

  @OneToMany(() => Like, (like) => like.user, { cascade: true })
  @Field((type) => [Like], { nullable: 'items' })
  likes?: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field((type) => [Comment], { nullable: 'items' })
  comments?: Comment[];

  @Column()
  @Field()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Token, (token) => token.user, { cascade: true })
  tokens: Token[];
}
