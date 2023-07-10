import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  find(perPage: number, skip: number): Promise<Post[]> {
    return this.postsRepository.find({
      take: perPage,
      skip: skip,
    });
  }
}
