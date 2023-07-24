import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ReplyTo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  //TODO: Constraint key: parentId && replyId is UNIQUE
  @Column()
  @Field()
  parentId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  parent: Comment;

  @Column()
  @Field()
  replyId: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  reply: Comment;
}
