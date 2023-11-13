import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateAt } from '../../database/commonEntities/date-at.entity';
import { User } from './user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'comments' })
export class Comment extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ type: 'text' })
  content: string;
}
