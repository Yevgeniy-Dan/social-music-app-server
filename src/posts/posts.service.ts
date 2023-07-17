import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  // create(createPostInput: CreatePostInput) {
  //   return 'This action adds a new post';
  // }

  async findAllByUserId({ userId }: { userId: string }): Promise<Post[]> {
    return this.postRepository.findBy({ userId });
  }

  async findAll() {
    return this.postRepository.find();
  }

  findOne(id: string) {
    return this.postRepository.findOneBy({ id: id });
  }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
