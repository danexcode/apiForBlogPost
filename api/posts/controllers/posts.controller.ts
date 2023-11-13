import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from '../dtos/post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'List of posts' })
  @Get('/')
  getPosts(@Query() params: FilterPostDto) {
    return this.postsService.findAll(params);
  }

  @Get('/:postId')
  getOne(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }

  @Post('/')
  create(@Body() payload: CreatePostDto) {
    return this.postsService.create(payload);
  }

  @Post('/:postId/tag/:tagId')
  createCategoryByPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    return this.postsService.addTagByPost(postId, tagId);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePostDto,
  ) {
    return this.postsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }

  @Delete(':postId/category/:categoryId')
  deleteCategory(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.postsService.removeTagByPost(postId, categoryId);
  }
}
