import { PayloadToken } from './token.model';

export interface UserAuth {
  id: number;
  user: PayloadToken;
  allowAdmin: boolean;
}
