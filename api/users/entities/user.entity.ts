import { DateAt } from '../../database/commonEntities/date-at.entity';

export class User extends DateAt {
  id: number;
  username: string;
  password: string;
  name: string;
  lastName: string;
  image: string;
}
