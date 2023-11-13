import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  findAll() {
    return [];
  }

  findOne(id: number) {
    return id;
  }

  create(payload: Post) {
    return payload;
  }

  update(id: number, changes: unknown) {
    return { id, changes };
  }

  delete(id: number) {
    return id;
  }
}
