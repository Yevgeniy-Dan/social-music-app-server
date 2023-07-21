import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ReplyTo } from './entities/replyto.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, ReplyTo]), UsersModule],
  providers: [CommentsResolver, CommentsService, UsersService],
  exports: [TypeOrmModule, CommentsService],
})
export class CommentsModule {}
