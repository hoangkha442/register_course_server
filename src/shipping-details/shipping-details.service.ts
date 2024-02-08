import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ShippingDetailsService {
  prisma = new PrismaClient()
 

  async findOne(id: number) {
    return this.prisma.shipping_details.findUnique({
      where: { shipping_id: id },
    });
  }

 
}
