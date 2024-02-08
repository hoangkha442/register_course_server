import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDetailDto } from './create-payment-detail.dto';

export class UpdatePaymentDetailDto extends PartialType(CreatePaymentDetailDto) {}
