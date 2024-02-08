import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from 'src/user/interfaces';

@Injectable()
export class ProductService {
  prisma = new PrismaClient()

  // Global function
  async checkAdminRole(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  }
  // LẤY DANH SÁCH SẢN PHẨM
  async findAll() {
    let data = await this.prisma.products.findMany()
    return data
  }

  // PHÂN TRANG SẢN PHẨM 
  async getPagination(page: number, pageSize: number){
    const skipCount = (page - 1) * pageSize;
    const products = await this.prisma.products.findMany({
      skip: skipCount,
      take: pageSize
    });
    const totalUsers = await this.prisma.products.count();
    const totalPage = Math.ceil(totalUsers / pageSize);
    return { data: products, totalPage };
  }

  // TÌM SẢN PHẨM THÔNG QUA TÊN SẢN PHẨM
  async productName(prdName: string){
    let data = await this.prisma.products.findMany({
      where: { product_name: {
        contains: prdName
      }}
    })
    return data
  }

  // LẤY CHI TIẾT SẢN PHẨM
  async findOne (id: number){
    const product = await this.prisma.products.findMany({
      where: {
        product_id : id
      }
    })
    return product;
  }

  // TẠO MỚI SẢN PHẨM
  async create(createProductDto: CreateProductDto, file: Express.Multer.File , userId: number) {

    await this.checkAdminRole(userId);
    const product = await this.prisma.products.create({
      data: {...createProductDto, price: createProductDto.price * 1, quantity_in_stock: createProductDto.quantity_in_stock *1, category_id: createProductDto.category_id * 1, supplier_id: createProductDto.supplier_id * 1}
    });

    if (file) {
      await this.prisma.products.update({
        where: { product_id: product.product_id },
        data: { product_picture: file.filename }
      });
    }
    return 'Thêm sản phẩm thành công!'
  }


  // CẬP NHẬT SẢN PHẨM
  async update(id: number, updateProductDto: UpdateProductDto, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.products.update({
      where: { product_id: id },
      data: updateProductDto
    });
    return `Cập nhật thành công!`;
  }
  

  // CẬP NHẬT HÌNH ẢNH SẢN PHẨM
  async updatePictue(id: number ,file: Express.Multer.File, userId: number){
    await this.checkAdminRole(userId);
    await this.prisma.products.update({
      where: { product_id: id },
      data: {product_picture: file.filename}
    });
    return 'Cập nhật ảnh sản phẩm thành công!'
  }

  // ẨN / HIỆN SẢN PHẨM
  async hidden(id: number, userId: number) {
    await this.checkAdminRole(userId);
    const productToBeHidden = await this.prisma.products.findUnique({
      where: { product_id: id },
      select: { is_visible: true }
    });
  
    if (!productToBeHidden) {
      throw new HttpException("Không tìm thấy sản phẩm!", HttpStatus.NOT_FOUND);
    }
  
    await this.prisma.products.update({
      where: { product_id: id },
      data: { is_visible: !productToBeHidden.is_visible }
    });
  
    return productToBeHidden.is_visible ? 'Ẩn sản phẩm thành công!' : 'Hủy ẩn sản phẩm thành công!';
  }

  // XÓA SẢN PHẨM
  async remove(id: number, userId: number) {
    await this.checkAdminRole(userId);

    try {
      await this.prisma.products.delete({
        where: { product_id: id }
      });
      return `Đã xóa sản phẩm thành công.`;
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new HttpException("Không tìm thấy sản phẩm cần xóa!", HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
