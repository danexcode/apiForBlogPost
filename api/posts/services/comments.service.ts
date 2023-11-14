import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { UsersService } from '../../users/services/users.service';
import { PostsService } from './posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  async findOne(id: number) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['post', 'user'],
    });
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async create(data: CreateCommentDto) {
    const newComment = this.commentRepo.create(data);

    const user = await this.usersService.findOne(data.userId);
    newComment.user = user;

    const post = await this.postsService.findOne(data.postId);
    newComment.post = post;

    const comment = this.commentRepo
      .save(newComment)
      .then((res) => res)
      .catch((err) => {
        throw new BadRequestException(`${err.message}` || 'Unexpected Error');
      });
    return comment;
  }

  async update(id: number, changes: UpdateCommentDto) {
    const comment = await this.findOne(id);
    this.commentRepo.merge(comment, changes);
    return this.commentRepo.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    const res = await this.commentRepo.delete(id);
    return res;
  }
}
