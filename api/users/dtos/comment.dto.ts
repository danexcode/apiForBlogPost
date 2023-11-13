import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
