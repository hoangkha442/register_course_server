// cart.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaClient } from '@prisma/client';
import { DeleteMultipleCartDto } from './dto/delete-multiple-cart.dto';

@Injectable()
export class CartService {
  prisma = new PrismaClient();

  async create(createCartDto: CreateCartDto) {
    const existingCartItem = await this.prisma.cart.findFirst({
      where: {
        user_id: createCartDto.user_id,
        class_id: createCartDto.class_id,
      },
    });

    if (existingCartItem) {
      throw new ConflictException('Khóa học đã được thêm vào giỏ hàng rồi.');
    }

    return this.prisma.cart.create({
      data: createCartDto,
    });
  }

  async findAll() {
    return this.prisma.cart.findMany();
  }

  async findOne(id: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { cart_id: id },
    });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async findByUserId(user_id: number) {
    const cartItems = await this.prisma.cart.findMany({
      where: { user_id },
      include: {
        users: true,
        classes: true,
      },
    });
    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException(`No cart items found for user with ID ${user_id}`);
    }
    return cartItems;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { cart_id: id },
      data: updateCartDto,
    });
  }

  

  async removeMultiple(dto: DeleteMultipleCartDto) {
    return this.prisma.cart.deleteMany({
      where: {
        cart_id: {
          in: dto.cartIds,
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.cart.delete({
      where: { cart_id: id },
    });
  }
}
