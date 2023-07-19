import { Module, forwardRef } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), forwardRef(() => UsersModule)],
  providers: [LikesResolver, LikesService],
  exports: [TypeOrmModule],
})
export class LikesModule {}
