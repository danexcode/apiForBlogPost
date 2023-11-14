import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { Post } from './entities/post.entity';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, Tag]), UsersModule],
  controllers: [PostsController, CategoriesController, TagsController],
  providers: [PostsService, CategoriesService, TagsService],
})
export class PostsModule {}
