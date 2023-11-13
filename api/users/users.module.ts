import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController, CommentsController],
  providers: [CommentsService, UsersService],
})
export class UsersModule {}
