import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty({ description: 'The ID of the product' })
  @IsInt()
  product_id: number;

  @ApiProperty({ description: 'Quantity of the product' })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: 'Price of the product' })
  @IsInt()
  price: number;
}