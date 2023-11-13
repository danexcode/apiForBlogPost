import { DateAt } from '../../database/commonEntities/date-at.entity';

export class Category extends DateAt {
  id: number;
  name: string;
}
