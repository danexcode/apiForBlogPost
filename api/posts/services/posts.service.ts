import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '../../users/services/users.service';
import { CreatePostDto, FilterPostDto, UpdatePostDto } from '../dtos/post.dto';
import { Tag } from '../entities/tag.entity';
import { Post } from '../entities/post.entity';
import { CategoriesService } from './categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
  ) {}

  findAll(query?: FilterPostDto) {
    const options: FindManyOptions = {
      relations: ['category', 'tags'],
      order: { createdAt: 'DESC' },
    };
    if (query) {
      const where: FindOptionsWhere<Post> = {};
      const { limit, offset, category, user } = query;
      if (category) {
        where.category = In([category]);
      }
      if (user) {
        where.user = In([user]);
      }
      options['take'] = limit;
      options['skip'] = offset;
      options['where'] = where;
    }
    return this.postRepo.find(options);
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      relations: ['category', 'comments', 'tags', 'user'],
      where: { id },
    });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }

  async findRelatedPosts(id: number) {
    const post = await this.postRepo.findOne({
      relations: ['tags'],
      where: { id },
    });
    const tags = post.tags.map((item) => item.id);

    const related = await this.postRepo.find({
      where: {
        tags: { id: In(tags) },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 20,
    });
    return related;
  }

  async create(data: CreatePostDto) {
    const newPost = this.postRepo.create(data);
    const category = await this.categoriesService.findOne(data.categoryId);
    newPost.category = category;

    const user = await this.usersService.findOne(data.userId);
    newPost.user = user;

    const tags = await this.tagRepo.findBy({
      id: In(data.tagsIds),
    });
    newPost.tags = tags;

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
      const category = await this.categoriesService.findOne(changes.categoryId);
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

  async remove(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    const res = await this.postRepo.delete(id);
    return res;
  }
}
