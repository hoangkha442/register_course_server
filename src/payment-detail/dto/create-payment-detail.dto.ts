import { ApiProperty } from '@nestjs/swagger';
import { IsInt,  IsDateString, IsString } from 'class-validator';

export class CreatePaymentDetailDto {

  @ApiProperty({ description: 'Payment date', example: '2024-01-01T00:00:00.000Z' })
  @IsDateString()
  payment_date: Date;

  @ApiProperty({ description: 'Amount paid' })
  @IsInt()
  amount: number;

  @ApiProperty({ description: 'Payment method', example: 'Thanh toán qua ngân hàng!' })
  @IsString()
  payment_method: string;


  @ApiProperty({ description: 'Đã nhận!' })
  @IsString()
  payment_status: string;
}
