// course-registration.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCourseRegistrationDto } from './dto/create-course-registration.dto';
import { UpdateCourseRegistrationDto } from './dto/update-course-registration.dto';
import { CreateMultipleCourseRegistrationsDto } from './dto/create-multiple-course-registrations.dto';
import { DeleteMultipleCourseRegistrationsDto } from './dto/delete-multiple-course-registrations.dto';

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

  async createMultiple(dto: CreateMultipleCourseRegistrationsDto, userId: number) {
    const createOperations = dto.registrations.map(registration => ({
      student_id: registration.student_id,
      class_id: registration.class_id,
      registration_date: registration.registration_date,
      study_status: registration.study_status,
    }));

    await this.prisma.course_registrations.createMany({
      data: createOperations,
    });

    return "Multiple registrations created successfully";
  }

  async deleteMultiple(dto: DeleteMultipleCourseRegistrationsDto, userId: number) {
    await this.prisma.course_registrations.deleteMany({
      where: {
        registration_id: {
          in: dto.registrationIds,
        },
      },
    });

    return "Multiple registrations deleted successfully";
  }

  async findAll() {
    return await this.prisma.course_registrations.findMany({
      include: {
        users: true,
            classes: {
                include: {
                    users: true
                }
            }
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

  async findByUserId(userId: number) {
    const courseRegistrations = await this.prisma.course_registrations.findMany({
        where: { student_id: userId },
        include: {
            users: true,
            classes: {
                include: {
                    users: true
                }
            }
        }
    });
    return courseRegistrations;
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


}
