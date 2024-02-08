import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from 'src/user/interfaces';

@Injectable()
export class CategoryService {
  prisma = new PrismaClient()

  // TẠO DANH MỤC SẢN PHẨM 
  async create(createCategoryDto: CreateCategoryDto, req: RequestWithUser ) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    let newData = {
      category_name: createCategoryDto.category_name, description: createCategoryDto.description
    }
    await this.prisma.product_categories.create({
      data: newData
    })
    return "Thêm danh mục sản phẩm thành công!"
  }

  // LẤY TẤT CẢ DANH MỤC SẢN PHẨM
  findAll() {
    let data = this.prisma.product_categories.findMany()
    return data;
  }


  // CẬP NHẬT SẢN PHẨM
  async update(id: number, updateCategoryDto: UpdateCategoryDto, req: RequestWithUser) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    await this.prisma.product_categories.update({
      where: { category_id: id },
      data: updateCategoryDto
    });
    return `Cập nhật danh mục sản phẩm thành công!`;
  }

  // XÓA DANH MỤC SẢN PHẨM
  async remove(id: number, req: RequestWithUser) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    await this.prisma.product_categories.delete({
      where: { category_id: id }
    });
    return `Đã xóa sản phẩm thành công.`;
  }
}
