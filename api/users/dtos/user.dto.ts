import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsUrl()
  @IsOptional()
  readonly image: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
