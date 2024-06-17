import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'TMN123', description: 'Terminal code of the payment' })
  @IsOptional()
  @IsString()
  TmnCode?: string;

  @ApiProperty({ example: 'TRANS456', description: 'Transaction ID' })
  @IsOptional()
  @IsString()
  TransID?: string;

  @ApiProperty({ example: 1, description: 'Status of the payment' })
  @IsOptional()
  @IsInt()
  Status?: number;

  @ApiProperty({ example: 789, description: 'Order ID related to the payment' })
  @IsOptional()
  @IsInt()
  OrderID?: number;

  @ApiProperty({ example: 'USD', description: 'Currency of the payment' })
  @IsOptional()
  @IsString()
  Currency?: string;

  @ApiProperty({ example: 'PAYTRANS987', description: 'Payment transaction ID' })
  @IsOptional()
  @IsString()
  PaymentTransID?: string;

  @ApiProperty({ example: 'BANK001', description: 'Bank code' })
  @IsOptional()
  @IsString()
  BankCode?: string;

  @ApiProperty({ example: 'BANKTRANS123', description: 'Bank transaction ID' })
  @IsOptional()
  @IsString()
  BankTransID?: string;

  @ApiProperty({ example: 'Payment for the advanced coding class', description: 'Additional information about the payment' })
  @IsOptional()
  @IsString()
  Info?: string;

  @ApiProperty({ example: '2024-05-25T15:30:00.000Z', description: 'Transaction date' })
  @IsOptional()
  @IsDateString()
  TransDate?: string;

  @ApiProperty({ example: '2024-05-25T16:00:00.000Z', description: 'Payment date' })
  @IsOptional()
  @IsDateString()
  PaymentDate?: string;

  @ApiProperty({ example: 5000, description: 'Amount paid' })
  @IsOptional()
  @IsInt()
  Amount?: number;

  @ApiProperty({ example: 123, description: 'User ID related to the payment' })
  @IsOptional()
  @IsInt()
  UserId?: number;

  @ApiProperty({ example: 456, description: 'Registration ID related to the payment' })
  @IsOptional()
  @IsInt()
  registration_id?: number;
}
