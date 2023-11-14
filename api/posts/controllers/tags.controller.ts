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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagsService } from '../services/tags.service';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiOperation({ summary: 'Get list of tags' })
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({ summary: 'Get tag by id' })
  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create tag' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateTagDto) {
    return this.tagsService.create(payload);
  }

  @ApiOperation({ summary: 'Update tag by id' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTagDto) {
    return this.tagsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete tag by id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.remove(id);
  }
}
