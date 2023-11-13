import { DateAt } from '../../database/commonEntities/date-at.entity';

export class Comment extends DateAt {
  id: number;
  content: string;
}
