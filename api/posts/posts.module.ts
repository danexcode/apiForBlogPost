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

import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Category, Tag, Comment]),
    UsersModule,
  ],
  controllers: [
    PostsController,
    CategoriesController,
    TagsController,
    CommentsController,
  ],
  providers: [PostsService, CategoriesService, TagsService, CommentsService],
})
export class PostsModule {}
