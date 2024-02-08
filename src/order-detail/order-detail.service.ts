import {  Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from 'src/user/interfaces';

@Injectable()
export class OrderDetailService {
  prisma = new PrismaClient()


  // LẤY CHI TIẾT ĐƠN HÀNG THÔNG QUA ID NGƯỜI DÙNG
  async getOrderDetailsByUserId(userId: number, req: RequestWithUser): Promise<any> {
    return this.prisma.order_details.findMany({
      where: {
        orders: {
          user_id: userId *1,
        },
      },
      include: {
        orders: true, 
        products: true
      },
    });
  }

  // LẤY CHI TIẾT ĐƠN HÀNG THÔNG QUA OrderID
  async getOrderDetailsByOrderId(orderId: number): Promise<any> {
    return this.prisma.order_details.findMany({
      where: {
        order_id: orderId*1,
      },
      include: {
        orders: true,
        products: true
      },
    });
  }

}
