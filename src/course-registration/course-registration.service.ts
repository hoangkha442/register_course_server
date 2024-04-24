// course-registration.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCourseRegistrationDto } from './dto/create-course-registration.dto';
import { UpdateCourseRegistrationDto } from './dto/update-course-registration.dto';

@Injectable()
export class CourseRegistrationService {
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
  async create(dto: CreateCourseRegistrationDto, userId: number) {
    await this.checkAdminRole(userId);
     await this.prisma.course_registrations.create({
      data: {
        users: { connect: { user_id: dto.student_id } },
        classes: { connect: { class_id: dto.class_id } },
        registration_date: dto.registration_date,
        study_status: dto.study_status,
      },
    });

    return "Ghi danh thành công";
  }

  async findAll() {
    return await this.prisma.course_registrations.findMany({
      include: {
        users: true,
        classes: true,
      }
    });
  }

  async findOne(id: number) {
    const courseRegistration = await this.prisma.course_registrations.findUnique({
      where: { registration_id: id },
      include: {
        users: true,
        classes: true, 
      }
    });
    if (!courseRegistration) {
      throw new HttpException('Course registration not found', HttpStatus.NOT_FOUND);
    }
    return courseRegistration;
  }

  async update(id: number, updateCourseRegistrationDto: UpdateCourseRegistrationDto, userId: number) {
    // Optionally, check if the user attempting the update is an admin
    await this.checkAdminRole(userId);

    await this.prisma.course_registrations.update({
      where: { registration_id: id },
      data: updateCourseRegistrationDto,
    });
    return "Cập nhật thành công";
  }

  async remove(id: number, userId: number) {
    await this.checkAdminRole(userId);

    await this.prisma.course_registrations.delete({
      where: { registration_id: id },
    });
    return `Xóa thành công`;
  }
}
