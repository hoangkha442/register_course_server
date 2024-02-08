import { Module } from '@nestjs/common';
import { ShippingDetailsService } from './shipping-details.service';
import { ShippingDetailsController } from './shipping-details.controller';

@Module({
  controllers: [ShippingDetailsController],
  providers: [ShippingDetailsService],
})
export class ShippingDetailsModule {}
