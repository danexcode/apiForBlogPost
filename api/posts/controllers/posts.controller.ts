import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  @ApiOperation({ summary: 'List of posts' })
  getPosts() {
    return this.postsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'find a post with id' })
  getOne(@Param('id', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }
}
