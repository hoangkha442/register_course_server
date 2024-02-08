import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiProperty({ description: 'Quantity change', required: false })
  @IsInt()
  @IsOptional()
  quantity_change?: number;

  @ApiProperty({ description: 'Reason for change', required: false })
  @IsString()
  @IsOptional()
  reason_for_change?: string;
}