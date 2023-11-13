import { IsString, IsNotEmpty, IsUrl, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  readonly categoryId: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
