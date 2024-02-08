import { HttpException, HttpStatus, Injectable, Param, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {updateUserDto, updateUserRole } from './dto/update-user.dto';
import { RequestWithUser } from './interfaces';

@Injectable()
export class UserService {
  prisma = new PrismaClient()

  // GLOBAL FUNCTIONS
  async checkAdminRole(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  }


  // PHÂN TRANG
  async pagination(page: number, pageSize: number, userId: number): Promise<{ data: users[], totalPage: number }> {

    await this.checkAdminRole(userId);
    const skipCount = (page - 1) * pageSize;
    const users = await this.prisma.users.findMany({
      skip: skipCount,
      take: pageSize
    });

    const totalUsers = await this.prisma.users.count();
    const totalPage = Math.ceil(totalUsers / pageSize);

    return { data: users, totalPage };
  }
  

  // TẠO MỚI USER
  async create(createUserDto: CreateUserDto, userId: number) {
    await this.checkAdminRole(userId);
    const emailExists = await this.prisma.users.findUnique({
      where: { email: createUserDto.email }
    });
    if (emailExists) {
      throw new HttpException('Email đã tồn tại!', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.users.create({
      data: createUserDto
    });
  }  

  // LẤY DANH SÁCH NGƯỜI DÙNG
  async findAll(userId: number): Promise<users[]> {
    await this.checkAdminRole(userId);
    return await this.prisma.users.findMany()
  }


  // TÌM NGƯỜI DÙNG THÔNG QUA TÊN
  async findName(uName: string, userId: number){
    await this.checkAdminRole(userId);
    let data = await this.prisma.users.findMany({
      where: { 
        full_name: {
          contains: uName
        }
      }
    })
    return data
  }

  // XEM CHI TIẾT NGƯỜI DÙNG
  async findOne(id: number) {
    const getUser = await this.prisma.users.findUnique({
      where:{
        user_id: id
      }
    })
    if(!getUser){
      return 'Không tìm thấy người dùng!';
    }
    return getUser;
    
  }

  // CẬP NHẬT NGƯỜI DÙNG
  async update(id: number, updateUserDto: updateUserDto) {

    // Check if user exists
    const userExists = await this.prisma.users.findUnique({
      where: { user_id: id }
    });
    
    if (!userExists) {
      return `Không tìm thấy tài khoản!`;
    }
    
    // // Update password if provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    console.log('updateUserDto.password: ', updateUserDto.password);

    // console.log('updateUserDto: ', updateUserDto);
    // await this.prisma.users.update({
    //   where: { user_id: id * 1},
    //   data: updateUserDto
    // });

    await this.prisma.users.update({
      where: { user_id: id * 1},
      data: updateUserDto
    });
  
    return 'Cập nhật thành công!';
  }

  // Update authorization by admin
  async updateUserByAdmin(id: number, updateUserRole: updateUserRole, userId: number) {
    await this.checkAdminRole(userId);

    if (updateUserRole.password) {
      updateUserRole.password = await bcrypt.hash(updateUserRole.password, 10);
    }

    await this.prisma.users.update({
      where: { user_id: id * 1 },
      data: {
        ...updateUserRole,
      },
    });
    return "Cập nhật thông tin thành công!"
}


  // ẨN NGƯỜI DÙNG
  async hidden(id: number, userId: number) {
    await this.checkAdminRole(userId);
    const userToBeHidden = await this.prisma.users.findUnique({
      where: { user_id: id },
      select: { is_visible: true }
    });
  
    if (!userToBeHidden) {
      throw new HttpException("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND);
    }
  
    await this.prisma.users.update({
      where: { user_id: id },
      data: { is_visible: !userToBeHidden.is_visible }
    });
  
    return userToBeHidden.is_visible ? 'Ẩn người dùng thành công!' : 'Hủy ẩn người dùng thành công!';
  }

  // XÓA NGƯỜI DÙNG => CHƯA XỬ LÝ FK CONSTRAIN
  async remove(id: number, requestingUserID: number){
  
    // Prevent users from deleting their own account
    if (requestingUserID === id) {
      throw new HttpException("Bạn không thể xóa tài khoản của chính mình!", HttpStatus.BAD_REQUEST);
    }
  
    // Check if the requesting user has admin privileges
    const requestingUser = await this.prisma.users.findUnique({
      where: { user_id: requestingUserID },
      select: { role: true }
    });
  
    if (requestingUser?.role !== 'admin') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  
    // Delete the user and handle case where user does not exist
    try {
      await this.prisma.users.delete({
        where: { user_id: id }
      });
      return `User deleted successfully.`;
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new HttpException("Không tìm thấy người dùng cần xóa!", HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
  
  // UPLOAD AVATAR
  async uploadAvatar(file: Express.Multer.File, req: RequestWithUser){
    const requestingUserID = req.user.data.userID;

      // Check if the user exists
      const userExists = await this.prisma.users.findUnique({
        where: { user_id: requestingUserID }
      });

      if (!userExists) {
        throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
      }

      // Update the user's avatar
      await this.prisma.users.update({
        where: { user_id: requestingUserID },
        data: { avatar: file.filename }
      });
      return 'Thay đổi ảnh đại diện thành công!';
  }
}