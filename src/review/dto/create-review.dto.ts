import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID of the product being reviewed' })
  @IsInt()
  product_id: number;

  // @ApiProperty({ description: 'ID of the user submitting the review' })
  @IsInt()
  user_id: number;

  @ApiProperty({ description: 'Rating of the product', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Comment for the review', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
