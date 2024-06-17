import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  private prisma = new PrismaClient();

  async checkAdminOrOwnerRole(userId: number, paymentId?: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });

    if (paymentId) {
      const payment = await this.prisma.payment.findUnique({
        where: { payment_id: paymentId },
      });

      if (!payment || (payment.UserId !== userId && user.role !== 'quanTriVien')) {
        throw new HttpException("Access Denied", HttpStatus.FORBIDDEN);
      }
    } else if (!user || user.role !== 'quanTriVien') {
      throw new HttpException("Access Denied", HttpStatus.FORBIDDEN);
    }
  }

  async create(dto: CreatePaymentDto, userId: number) {
    console.log('dto: ', dto);
    return await this.prisma.payment.create({
      data: {
        ...dto,
        UserId: userId,
      },
      
    });
  }

  async findAll() {
    return await this.prisma.payment.findMany({
      include: {
        course_registrations: true,
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { payment_id: id },
      include: {
        course_registrations: true,
      },
    });
    if (!payment) {
      throw new HttpException('Payment record not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto, userId: number) {
    await this.checkAdminOrOwnerRole(userId, id);
    return await this.prisma.payment.update({
      where: { payment_id: id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    await this.checkAdminOrOwnerRole(userId, id);
    await this.prisma.payment.delete({
      where: { payment_id: id },
    });
    return `Payment record removed successfully.`;
  }
}
