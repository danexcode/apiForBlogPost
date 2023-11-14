import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsPositive()
  @IsNotEmpty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  readonly postId: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
