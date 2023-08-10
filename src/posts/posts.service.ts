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

  findAllByUserId({ userId, offset, limit }: { userId: string; offset: number; limit: number }): Promise<Post[]> {
    return this.postRepository.find({ where: { user: { id: userId } }, skip: offset, take: limit }); //TODO: add offset, limit
  }

  findAll({ offset, limit }: { offset: number; limit: number }) {
    return this.postRepository.find({
      skip: offset,
      take: limit,
    });
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
