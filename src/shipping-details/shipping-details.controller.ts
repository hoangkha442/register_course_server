import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShippingDetailsService } from './shipping-details.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('ThongTinVanChuyen')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller('shipping-details')
export class ShippingDetailsController {
  constructor(private readonly shippingDetailsService: ShippingDetailsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingDetailsService.findOne(+id);
  }

 
}
