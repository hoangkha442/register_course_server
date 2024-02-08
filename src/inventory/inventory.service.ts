import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InventoryService {
  prisma = new PrismaClient();

  async checkAdminRole(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  }

  async createInventory(dto: CreateInventoryDto, userId: number) {
    await this.checkAdminRole(userId);
    return this.prisma.inventory.create({ data: dto });
  }

  async getInventoryById(id: number, userId: number) {
    await this.checkAdminRole(userId);
    return this.prisma.inventory.findUnique({ 
      where: { inventory_id: id *1 }, 
      include: { products: true } 
    });
  }

  async updateInventory(id: number, dto: UpdateInventoryDto, userId: number) {
    await this.checkAdminRole(userId);
    return this.prisma.inventory.update({
      where: { inventory_id: id * 1},
      data: dto,
    });
  }

  async deleteInventory(id: number, userId: number) {
    await this.checkAdminRole(userId);
    return this.prisma.inventory.delete({
      where: { inventory_id: id * 1},
    });
  }
}
