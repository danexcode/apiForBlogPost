import { DateAt } from '../../database/commonEntities/date-at.entity';

export class Post extends DateAt {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  image: string;
}
