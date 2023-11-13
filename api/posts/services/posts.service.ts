import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { Post } from '../entities/post.entity';
import { Category } from '../entities/category.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  findAll() {
    return this.postRepo.find();
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }

  async create(data: CreatePostDto) {
    const newPost = this.postRepo.create(data);
    if (data.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: data.categoryId,
      });
      newPost.category = category;
    }

    if (data.tagsIds) {
      const tags = await this.tagRepo.findBy({
        id: In(data.tagsIds),
      });
      newPost.tags = tags;
    }

    const post = this.postRepo
      .save(newPost)
      .then((res) => res)
      .catch((err) => {
        throw new BadRequestException(`${err.message}` || 'Unexpected Error');
      });
    return post;
  }

  async update(id: number, changes: UpdatePostDto) {
    const post = await this.findOne(id);

    if (changes.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: changes.categoryId,
      });
      if (!category) {
        throw new NotFoundException('category not found');
      }
      post.category = category;
    }

    if (changes.tagsIds) {
      const tags = await this.tagRepo.findBy({
        id: In(changes.tagsIds),
      });
      post.tags = tags;
    }
    this.postRepo.merge(post, changes);
    return this.postRepo.save(post);
  }

  async addTagByPost(postId: number, tagId: number) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['tags'],
    });

    const tag = await this.tagRepo.findOne({
      where: { id: tagId },
    });

    if (!post || !tag) {
      throw new BadRequestException('data is wrong');
    }
    post.tags.forEach((item) => {
      if (item.id === tag.id) {
        throw new BadRequestException('tag alredy belongs to this post');
      }
    });
    post.tags.push(tag);
    return this.postRepo.save(post);
  }

  async removeTagByPost(postId: number, tagId: number) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['tags'],
    });
    post.tags = post.tags.filter((item) => item.id !== tagId);
    return this.postRepo.save(post);
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    const res = await this.postRepo.delete(id);
    return res;
  }
}
