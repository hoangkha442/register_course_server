import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentDetailService } from './payment-detail.service';
import { CreatePaymentDetailDto } from './dto/create-payment-detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('PhuongThucThanhToan')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller('payment-detail')
export class PaymentDetailController {
  constructor(private readonly paymentDetailService: PaymentDetailService) {}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentDetailService.findOne(+id);
  }
}
