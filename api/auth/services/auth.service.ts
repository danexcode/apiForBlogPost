import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { UserAuth } from '../models/userAuth.model';
import { Role } from '../models/roles.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return false;
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return false;
    }
    // generar token
    return user;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  isAuthorizated({ id, user, allowAdmin }: UserAuth) {
    if (allowAdmin) {
      if (user.role === Role.ADMIN) {
        return true;
      }
    }

    if (id !== user.sub) {
      throw new UnauthorizedException('you are not allowed');
    }

    return true;
  }
}
