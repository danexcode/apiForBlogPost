import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Post's Title` })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Post's Content` })
  readonly content: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `Post's image` })
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `Post's category id` })
  readonly categoryId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ description: `Post's tags id` })
  readonly tagsIds: number[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
