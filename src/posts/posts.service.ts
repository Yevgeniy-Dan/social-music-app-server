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
  create(createPostInput: CreatePostInput, userId: string) {
    const post = this.postRepository.create({ mediaUrl: createPostInput.mediaUrl, userId });
    return this.postRepository.save(post);
  }

  findAllByUserId({ userId, offset, limit }: { userId: string; offset: number; limit: number }): Promise<Post[]> {
    return this.postRepository.find({ where: { user: { id: userId } }, skip: offset, take: limit }); //TODO: add offset, limit
  }

  findAll({ offset, limit }: { offset: number; limit: number }) {
    return this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  findOne(id: string) {
    return this.postRepository.findOneBy({ id: id });
  }

  async update(updatePostInput: UpdatePostInput) {
    const updateData: Partial<Post> = {};

    if (updatePostInput.mediaUrl) {
      updateData.mediaUrl = updatePostInput.mediaUrl;
    }

    const updateResult = await this.postRepository.update(updatePostInput.id, updateData);

    if (updateResult.affected > 0) {
      const updatedPost = await this.postRepository.findOneBy({ id: updatePostInput.id });
      return updatedPost;
    }

    return undefined;
  }

  remove(id: string) {
    return this.postRepository.delete(id);
  }
}
