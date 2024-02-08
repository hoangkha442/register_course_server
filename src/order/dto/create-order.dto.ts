import { IsInt, IsOptional, IsEnum, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { orders_status } from '@prisma/client';
import { CreateOrderDetailDto } from 'src/order-detail/dto/create-order-detail.dto';
import { CreatePaymentDetailDto } from 'src/payment-detail/dto/create-payment-detail.dto';
import { CreateShippingDetailDto } from 'src/shipping-details/dto/create-shipping-detail.dto';
// import { CreateOrderDetailDto } from './create-order-detail.dto';
// import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID of the company', required: false })
  @IsInt()
  @IsOptional()
  company_id?: number;

  @ApiProperty({ description: 'Date and time of the order', example: '2024-01-01T00:00:00.000Z' })
  @IsDateString()
  order_date: string;

  @ApiProperty({ description: 'Status of the order', enum: orders_status })
  @IsEnum(orders_status)
  status: orders_status;

  @ApiProperty({ description: 'Total amount of the order' })
  @IsInt()
  total_amount: number;

  @ApiProperty({ description: 'Details of the order', type: [CreateOrderDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  details: CreateOrderDetailDto[];

  

  // @ApiProperty({ type: [CreatePaymentDetailDto] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreatePaymentDetailDto)
  // shippingDetail: CreatePaymentDetailDto[];

  // @ApiProperty({ type: [CreateShippingDetailDto] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateShippingDetailDto)
  // paymentDetail: CreateShippingDetailDto[];

  @ApiProperty({ type: CreatePaymentDetailDto })
  paymentDetail: CreatePaymentDetailDto;

  @ApiProperty({ type: CreateShippingDetailDto })
  shippingDetail: CreateShippingDetailDto;
}
