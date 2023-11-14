import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAt } from '../../database/commonEntities/date-at.entity';
import { Post } from './post.entity';

@Entity({ name: 'categories' })
export class Category extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @OneToMany(() => Post, (post) => post.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];
}
