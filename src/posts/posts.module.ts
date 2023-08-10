import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { LikesModule } from 'src/likes/likes.module';
import { LikesService } from 'src/likes/likes.service';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';
import { CommentTreeService } from 'config/initializeCommentTree';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UsersModule), LikesModule, CommentsModule],
  providers: [PostsResolver, PostsService, LikesService, CommentsService, CommentTreeService],
  exports: [TypeOrmModule, PostsService, PostsResolver],
})
export class PostsModule {}
