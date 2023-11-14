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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from '../dtos/post.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthService } from '../../auth/services/auth.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Get list of posts order by creation date' })
  @Get('/')
  getPosts(@Query() params: FilterPostDto) {
    return this.postsService.findAll(params);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get related posts by post id' })
  @Get('/:id/related')
  getRelated(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findRelatedPosts(id);
  }

  @ApiOperation({ summary: 'Create post', description: 'Must be logged' })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Body() payload: CreatePostDto) {
    return this.postsService.create(payload);
  }

  @ApiOperation({
    summary: 'Add tag to post',
    description: 'Must be logged',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/:postId/tag/:tagId')
  createTagByPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    return this.postsService.addTagByPost(postId, tagId);
  }

  @ApiOperation({ summary: 'Update post by id' })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePostDto,
  ) {
    return this.postsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }

  @ApiOperation({ summary: 'Remove tag to post' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:postId/tag/:tagId')
  deleteCategory(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    return this.postsService.removeTagByPost(postId, tagId);
  }
}
