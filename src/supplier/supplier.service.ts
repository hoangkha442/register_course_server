import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from 'src/user/interfaces';

@Injectable()
export class SupplierService {
  prisma = new PrismaClient()

  // TẠO MỚI NHÀ CUNG CẤP
  async create(createSupplierDto: CreateSupplierDto, req: RequestWithUser) {
    console.log('CreateSupplierDto: ', CreateSupplierDto);
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
  
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    await this.prisma.suppliers.create({
      data : createSupplierDto
    })
    return "Thêm mới nhà cung cấp thành công!"
  }


  // LẤY DANH SÁCH NHÀ CUNG CẤP
  async findAll(req: RequestWithUser) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
  
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    let data = await this.prisma.suppliers.findMany()
    return data;
  }

  // TÌM MỘT NHÀ CUNG CẤP
  async findOne(id: number, req: RequestWithUser) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
  
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    let data = await this.prisma.suppliers.findUnique({
      where: { supplier_id : id }
    })
    return data;
  }

  // CẬP NHẬT NHÀ CUNG CẤP
  async update(id: number, updateSupplierDto: UpdateSupplierDto, req: RequestWithUser) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
  
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    await this.prisma.suppliers.update({
      where:{
        supplier_id: id
      },
      data: updateSupplierDto
    })

    return "Cập nhật nhà cung cấp thành công!"
  }

  async remove(id: number, req: RequestWithUser) {
    const requestingUserID = req.user.data.userID;
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
    if (!requestingUser || requestingUser.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
    await this.prisma.suppliers.delete({
      where: { supplier_id: id}
    })
    return "Xóa nhà cung cấp thành công!"
  }
}
