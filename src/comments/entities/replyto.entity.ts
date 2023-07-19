import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ReplyTo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  parent: Comment;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  reply: Comment;
}
