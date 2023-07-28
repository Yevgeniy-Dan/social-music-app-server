import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Token {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @ManyToOne((type) => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  refreshToken: string;
}
