import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateShippingDetailDto {

  @ApiProperty({ description: 'Shipping address' })
  @IsNotEmpty()
  shipping_address: string;

  @ApiProperty({ description: 'Estimated delivery date', example: '2024-01-01T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  estimated_delivery_date?: Date;

  @ApiProperty({ description: 'Actual delivery date', example: '2024-01-02T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  actual_delivery_date?: Date;
}
