import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostsModule } from 'src/posts/posts.module';
import { PostsService } from 'src/posts/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PostsModule)],
  providers: [UsersResolver, UsersService, PostsService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
