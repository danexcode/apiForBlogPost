import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../auth/models/roles.model';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PayloadToken } from '../../auth/models/token.model';
import { AuthService } from '../../auth/services/auth.service';
import { Request } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Get list of users' })
  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @Post('/')
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({
    summary: 'Update user by id',
    description: 'Must be logged as the user you want to update',
  })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
    @Req() req: Request,
  ) {
    const user = req.user as PayloadToken;
    this.authService.isAuthorizated({
      id,
      user,
      allowAdmin: false,
    });
    return this.usersService.update(id, payload);
  }

  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Must be logged as an admin',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
