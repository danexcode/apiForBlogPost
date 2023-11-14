import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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

  @IsNotEmpty()
  @ApiProperty({ description: 'the role of the user' })
  readonly role: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
