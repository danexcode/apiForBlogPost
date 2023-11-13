import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    const category = this.categoryRepo
      .save(newCategory)
      .then((res) => res)
      .catch((err) => {
        throw new BadRequestException(`${err.message}` || 'Unexpected Error');
      });
    return category;
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    const res = await this.categoryRepo.delete(id);
    return res;
  }

  async save(category: Category) {
    const newCategory = this.categoryRepo
      .save(category)
      .then((res) => res)
      .catch((err) => {
        throw new BadRequestException(`${err.message}` || 'Unexpected Error');
      });
    return newCategory;
  }
}
