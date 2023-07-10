import { Controller, Get, Param } from '@nestjs/common';
import { Post } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  private perPage: number;

  constructor(private readonly postsService: PostsService) {
    this.perPage = 20;
  }

  @Get()
  find(): Promise<Post[]> {
    return this.postsService.find(this.perPage, 0);
  }

  @Get(':page')
  findByPage(@Param('page') page): Promise<Post[]> {
    const currentPage = page || 1;
    const skip = (currentPage - 1) * this.perPage;

    return this.postsService.find(this.perPage, skip);
  }
}
