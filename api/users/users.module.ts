import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment])],
  controllers: [UsersController, CommentsController],
  providers: [CommentsService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
