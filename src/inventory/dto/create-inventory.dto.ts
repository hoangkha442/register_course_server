import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({ description: 'Product ID' })
  @IsInt()
  product_id: number;

  @ApiProperty({ description: 'Quantity change' })
  @IsInt()
  quantity_change: number;

  @ApiProperty({ description: 'Reason for change', required: false })
  @IsString()
  @IsOptional()
  reason_for_change?: string;
}