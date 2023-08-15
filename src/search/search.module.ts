import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { UserHashtag } from './entities/userhashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag, UserHashtag]), UsersModule],
  providers: [SearchService, SearchResolver, UsersService],
})
export class SearchModule {}
