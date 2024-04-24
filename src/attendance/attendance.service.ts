import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  private prisma = new PrismaClient();

  async checkAdminRole(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'quanTriVien') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  }

  async create(dto: CreateAttendanceDto, userId: number) {
    await this.checkAdminRole(userId);
    return await this.prisma.attendance.create({
      data: {
        ...dto,
        registration_id: dto.registration_id * 1,
        date: new Date(dto.date),
        status: dto.status,
      },
    });
  }

  async findAll() {
    return await this.prisma.attendance.findMany({});
  }

  async findOne(id: number) {
    const attendanceRecord = await this.prisma.attendance.findUnique({
      where: { attendance_id: id },
    });
    if (!attendanceRecord) {
      throw new HttpException('Attendance record not found', HttpStatus.NOT_FOUND);
    }
    return attendanceRecord;
  }

  async update(id: number, dto: UpdateAttendanceDto, userId: number) {
    await this.checkAdminRole(userId);
    return await this.prisma.attendance.update({
      where: { attendance_id: id },
      data: { ...dto },
    });
  }

  async remove(id: number, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.attendance.delete({
      where: { attendance_id: id },
    });
    return `Xóa thành công.`;
  }
}
