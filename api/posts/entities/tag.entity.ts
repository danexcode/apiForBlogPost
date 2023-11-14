import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAt } from '../../database/commonEntities/date-at.entity';
import { Post } from './post.entity';

@Entity({ name: 'tags' })
export class Tag extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];
}
