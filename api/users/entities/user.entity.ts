import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAt } from '../../database/commonEntities/date-at.entity';

@Entity({ name: 'users' })
export class User extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'text' })
  image: string;
}
