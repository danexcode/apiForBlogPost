import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAt } from '../../database/commonEntities/date-at.entity';
import { Exclude } from 'class-transformer';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'users' })
export class User extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  role: string;

  @Column({ type: 'text', nullable: false })
  image: string;

  @OneToMany(() => Post, (post) => post.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  posts: Post[];
}
