import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaClient } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class SubjectService {
  prisma = new PrismaClient()
  async checkAdminRole(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'quanTriVien') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  }

  async create(createSubjectDto: CreateSubjectDto, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.subjects.create({ data: createSubjectDto })
    return "Thêm khóa học thành công"
  }

  async findAll() {
    return this.prisma.subjects.findMany();
  }

  async findOne(id: number) {
    return this.prisma.subjects.findUnique({
      where: { subject_id: id },
    });
  }

  async searchByName(name: string) {
    return this.prisma.subjects.findMany({
      where: {
        subject_name: {
          contains: name
        },
      },
    });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.subjects.update({
      where: { subject_id: id },
      data: updateSubjectDto,
    });

    return "Cập nhật thành công."
  }

  async remove(id: number, userId: number) {
    await this.checkAdminRole(userId);

    await this.prisma.subjects.delete({
      where: { subject_id: id },
    });
    return `Đã xóa thành công`;
  }
}
