import { Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}
  //TODO: Don't forget below by creating like
  //  async findByUserAndPost(userId: number, postId: number): Promise<Like | null> {
  //   return this.likeRepository.findOne({ where: { userId, postId } });
  // }
  // create(createLikeInput: CreateLikeInput) {
  //   return 'This action adds a new like';
  // }
  async findAllByUserId({ userId }: { userId: string }): Promise<Like[]> {
    return await this.likeRepository.find({ where: { user: { id: userId } } });
  }

  async findAllByPostId({ postId: postId }: { postId: string }): Promise<Like[]> {
    return await this.likeRepository.find({ where: { post: { id: postId } } });
  }

  async findAll() {
    return await this.likeRepository.find();
  }

  async findOne(id: string) {
    return await this.likeRepository.find({ where: { id: id } });
  }

  // update(id: number, updateLikeInput: UpdateLikeInput) {
  //   return `This action updates a #${id} like`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} like`;
  // }
}
