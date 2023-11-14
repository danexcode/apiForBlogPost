import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get comment by id' })
  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create comment' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateCommentDto) {
    return this.commentsService.create(payload);
  }

  @ApiOperation({ summary: 'Update comment by id' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete comment by id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id);
  }
}
