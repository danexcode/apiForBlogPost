import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DateAt } from '../../database/commonEntities/date-at.entity';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { Comment } from '../../users/entities/comment.entity';

@Entity({ name: 'posts' })
export class Post extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  image: string;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: Tag[];
}
