// create-payment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID of the course registration' })
  @IsNotEmpty()
  registration_id: number;

  @ApiProperty({ example: '500.00', description: 'Amount paid' })
  @IsDecimal()
  amount: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Date of payment' })
  @IsDate()
  payment_date: Date;

  @ApiProperty({ example: 'Payment for May 2023', description: 'Payment note', required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
