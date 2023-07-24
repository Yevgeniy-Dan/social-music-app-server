import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { ReplyTo } from 'src/comments/entities/replyto.entity';
import { CommentTree } from 'src/utils/comment-tree';
import { Repository } from 'typeorm';

@Injectable()
export class CommentTreeService {
  private commentTree: CommentTree;

  constructor(
    // @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(ReplyTo) private replyToRepository: Repository<ReplyTo>
  ) {}

  async initializeCommentTree(comments: Comment[]): Promise<CommentTree> {
    // const [comments, replies] = await Promise.all([this.commentRepository.find(), this.replyToRepository.find()]);

    // if the order in which the queries are executed is important
    //   const comments = await Comment.find();

    this.commentTree = new CommentTree();
    const replies = await this.replyToRepository.find();

    for (const r of replies) {
      this.commentTree.addReplyIdObj(r.parentId, r.replyId);
    }

    for (const c of comments) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { post, user, replies, ...result } = c;
      this.commentTree.addComment(result);
    }

    for (const r of replies) {
      this.commentTree.addEdge(r.parentId, r.replyId);
    }

    return this.commentTree;
  }
  getCommentTree(): CommentTree {
    return this.commentTree;
  }
}
