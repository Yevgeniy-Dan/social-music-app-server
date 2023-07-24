import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyTo } from './entities/replyto.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(ReplyTo)
    private readonly replyToRepository: Repository<ReplyTo>
  ) {}

  async findAllByPostId(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { post: { id: postId } } });
  }

  async createComment(commentInput: CreateCommentInput, userId: string): Promise<Comment> {
    const { content, postId, parentId } = commentInput;
    let comment = this.commentRepository.create({
      content,
      postId,
      userId,
    });

    comment = await this.commentRepository.save(comment);

    if (parentId) {
      const replyTo = this.replyToRepository.create({
        parentId,
        replyId: comment.id,
      });
      this.replyToRepository.save(replyTo);
    }

    return comment;
  }
}
