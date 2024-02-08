import { Module } from '@nestjs/common';
import { PaymentDetailService } from './payment-detail.service';
import { PaymentDetailController } from './payment-detail.controller';

@Module({
  controllers: [PaymentDetailController],
  providers: [PaymentDetailService],
})
export class PaymentDetailModule {}
