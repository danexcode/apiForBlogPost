import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
  ) {}

  async findOne(id: number) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async create(data: CreateCommentDto) {
    const newComment = this.commentRepo.create(data);
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
