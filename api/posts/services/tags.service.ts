import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagRepo.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepo.findOne({
      where: { id },
    });
    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    return tag;
  }

  create(data: CreateTagDto) {
    const newTag = this.tagRepo.create(data);
    const tag = this.tagRepo
      .save(newTag)
      .then((res) => res)
      .catch((err) => {
        throw new BadRequestException(`${err.message}` || 'Unexpected Error');
      });
    return tag;
  }

  async update(id: number, changes: UpdateTagDto) {
    const tag = await this.findOne(id);
    this.tagRepo.merge(tag, changes);
    return this.tagRepo.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    const res = await this.tagRepo.delete(id);
    return res;
  }

  async save(tag: Tag) {
    const newTag = this.tagRepo
      .save(tag)
      .then((res) => res)
      .catch((err) => {
        throw new BadRequestException(`${err.message}` || 'Unexpected Error');
      });
    return newTag;
  }
}
