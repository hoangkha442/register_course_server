import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaClient, classes } from '@prisma/client';

@Injectable()
export class ClassService {
  prisma = new PrismaClient();

  async checkAdminRole(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });
    if (!user || user.role !== 'quanTriVien') {
      throw new HttpException("Bạn không có quyền truy cập!", HttpStatus.FORBIDDEN);
    }
  }

  // Tạo lớp học
  async create(createClassDto: CreateClassDto, file: Express.Multer.File, userId: number) {
    console.log('createClassDto: ', createClassDto);

    await this.checkAdminRole(userId);
    const class_data = await this.prisma.classes.create({
      data: {
        class_name: createClassDto.class_name,
        subject_id: Number(createClassDto.subject_id),
        instructor_id: Number(createClassDto.instructor_id),
        schedule: createClassDto.schedule,
        description: createClassDto.description,
        picture: file ? file.filename : undefined,
      },
    });

    if (file) {
      await this.prisma.classes.update({
        where: { class_id: class_data.class_id },
        data: { picture: file.filename }
      });
    }
    return 'Thêm lớp học thành công!'
  }

  // Lấy tất cả các lớp học
  async findAll() {
    return await this.prisma.classes.findMany({
      include: {
        subjects: true,
        users: true,
      }
    });
  }

  // Tìm lớp học có số lượng đăng ký cao nhất
  async findClassWithMostRegistrations() {
    const maxRegistrations = await this.prisma.classes.aggregate({
      _max: {
        registered_students: true,
      },
    });

    if (!maxRegistrations._max.registered_students) {
      throw new HttpException("Không có lớp học nào.", HttpStatus.NOT_FOUND);
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

 // Tìm các lớp học có số lượng đăng ký cao từ thứ hai trở đi
 async findClassesFromSecondHighestRegistrations() {
  const allClasses = await this.prisma.classes.findMany({
    orderBy: {
      registered_students: 'desc'
    },
    include: {
      users: true,
      subjects: true,
    }
  });

  const uniqueRegisteredStudents = allClasses
    .map(cls => cls.registered_students)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => b - a);

  if (uniqueRegisteredStudents.length < 2) {
    throw new HttpException("Không đủ dữ liệu để tìm các lớp học có số lượng đăng ký cao từ thứ hai trở đi.", HttpStatus.NOT_FOUND);
  }

  const secondHighestRegisteredStudents = uniqueRegisteredStudents.slice(1);

  const result = allClasses.filter(cls => secondHighestRegisteredStudents.includes(cls.registered_students)).slice(0, 3);

  return result;
}

  // Phân trang
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

    const totalClasses = await this.prisma.classes.count();
    const totalPage = Math.ceil(totalClasses / pageSize);

    return { data: classes, totalPage };
  }

  // Lấy thông tin lớp học theo ID
  async findOne(id: number) {
    return await this.prisma.classes.findUnique({
      where: {
        class_id: id
      }
    });
  }

  // Cập nhật lớp học
  async update(id: number, updateClassDto: UpdateClassDto, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.classes.update({
      where: { class_id: id },
      data: updateClassDto,
    });
    return "Chỉnh sửa lớp học thành công"
  }

  // Xóa lớp học
  async remove(id: number, userId: number) {
    await this.checkAdminRole(userId);
    await this.prisma.classes.delete({
      where: { class_id: id },
    });
    return `Xóa lớp học thành công`;
  }
}
