import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaUrl: string;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;
}
