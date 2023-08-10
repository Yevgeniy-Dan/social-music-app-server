import { Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { RemoveLikeResponse } from './dto/remove-like-response';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async create(createLikeInput: CreateLikeInput): Promise<Like> {
    const { postId, userId } = createLikeInput;

    const isExist = await this.likeRepository.findOne({ where: { userId, postId } });

    if (isExist) {
      throw new Error('Like already on this post');
    }

    const like = this.likeRepository.create({
      ...createLikeInput,
    });

    return await this.likeRepository.save(like);
  }
  async findAllByUserId({ userId }: { userId: string }): Promise<Like[]> {
    return this.likeRepository.find({ where: { user: { id: userId } } });
  }

  async findAllByPostId({ postId: postId }: { postId: string }): Promise<Like[]> {
    return this.likeRepository.find({ where: { post: { id: postId } } });
  }

  async findOneByPostUser(postId: string, userId: string): Promise<Like> {
    return this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
  }

  async findAll() {
    return this.likeRepository.find();
  }

  async findOne(id: string) {
    return this.likeRepository.find({ where: { id: id } });
  }

  // update(id: number, updateLikeInput: UpdateLikeInput) {
  //   return `This action updates a #${id} like`;
  // }

  async remove(likeInput: CreateLikeInput) {
    const { userId, postId } = likeInput;
    const like = await this.likeRepository.findOne({ where: { userId, postId } });

    if (!like) {
      throw new Error('Like not found.');
    }

    return await this.likeRepository.remove(like);
  }
}
