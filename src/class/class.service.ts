import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaClient, classes } from '@prisma/client';

@Injectable()
export class ClassService {
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
  async create(createClassDto: CreateClassDto, userId: number) {
    await this.checkAdminRole(userId);

    await this.prisma.classes.create({
      data: createClassDto,
    });
    return "Thêm lớp học thành công."
  }

  async findAll() {
    return await this.prisma.classes.findMany({
      include: {
        subjects: true,
        users: true,
      }
    })
  }

  async findClassWithMostRegistrations() {
    const maxRegistrations = await this.prisma.classes.aggregate({
      _max: {
        registered_students: true,
      },
    });

    if (!maxRegistrations._max.registered_students) {
      throw new HttpException("No classes found.", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.classes.findFirst({
      where: {
        registered_students: maxRegistrations._max.registered_students
      },
      include: {
        subjects: true,
        users: true,
      }
    });
  }

  async findSecondHighestRegisteredClasses() {
    // Fetch all classes ordered by the number of registered students
    const allClasses = await this.prisma.classes.findMany({
      orderBy: {
        registered_students: 'desc'
      },
      include: {
        users: true,
        subjects: true,
      }
    });

    const groupByRegisteredStudents = (classes) => {
      return classes.reduce((group, classItem) => {
        const { registered_students } = classItem;
        group[registered_students] = group[registered_students] || [];
        group[registered_students].push(classItem);
        return group;
      }, {});
    };

    const groupedClasses = groupByRegisteredStudents(allClasses);
    const sortedKeys = Object.keys(groupedClasses).map(Number).sort((a, b) => b - a);

    if (sortedKeys.length < 2) {
      throw new Error("Insufficient data to find the second highest registered class.");
    }
    const secondHighestClasses = groupedClasses[sortedKeys[1]];

    return secondHighestClasses.slice(0, 3);
  }

  async pagination(page: number, pageSize: number): Promise<{ data: classes[], totalPage: number }> {

    const skipCount = (page - 1) * pageSize;
    const classes = await this.prisma.classes.findMany({
      skip: skipCount,
      take: pageSize,
      include: {
        users: true,
        subjects: true,
      }
    });

    const totalUsers = await this.prisma.classes.count();
    const totalPage = Math.ceil(totalUsers / pageSize);

    return { data: classes, totalPage };
  }

  async findOne(id: number) {
    return await this.prisma.classes.findUnique({
      where: {
        class_id: id
      }
    })
  }

  async update(id: number, updateClassDto: UpdateClassDto, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.classes.update({
      where: { class_id: id },
      data: updateClassDto,
    });
    return "Chỉnh sửa lớp học thành công"
  }

  async remove(id: number, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.classes.delete({
      where: { class_id: id },
    });
    return `Xóa lớp học thành công`;
  }
  
  
}
