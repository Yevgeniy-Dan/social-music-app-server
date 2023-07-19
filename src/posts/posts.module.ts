import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { LikesModule } from 'src/likes/likes.module';
import { LikesService } from 'src/likes/likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UsersModule), LikesModule],
  providers: [PostsResolver, PostsService, LikesService],
  exports: [TypeOrmModule, PostsService],
})
export class PostsModule {}
