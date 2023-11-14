import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsPositive,
  IsNumber,
  IsOptional,
  Min,
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

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `Post's category id` })
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ description: `Post's tags id` })
  readonly tagsIds: number[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class FilterPostDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: `Pagination limit`, required: false })
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ description: `Pagination offset`, required: false })
  offset: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: `Filter by category`, required: false })
  category: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: `Filter by user`, required: false })
  user: number;
}
