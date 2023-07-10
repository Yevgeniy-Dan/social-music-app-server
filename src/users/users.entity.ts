import { Post } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({ type: 'text' })
  bio: string;

  @Column()
  musicGenres: string;

  @Column()
  socialMedia: string;

  @Column({ type: 'text' })
  education: string;

  @OneToMany((type) => Post, (post) => post.userId)
  posts: Post[];
}
