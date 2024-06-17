import { Controller, Get, Post, Body, Param, Delete, Query, Req, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/user/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('QuanLyLopHoc')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // Tạo lớp học với file ảnh
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img/class',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + '_' + file.originalname);
        },
      }),
    }),
  )
  create(
    @Body() createClassDto: CreateClassDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.data.userID;
    return this.classService.create(createClassDto, file, userId);
  }

  // Lấy tất cả các lớp học
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  // Lấy lớp học có số lượng đăng ký cao nhất
  @Get('most-registrations')
  findClassWithMostRegistrations() {
    return this.classService.findClassWithMostRegistrations();
  }

  // Lấy các lớp học có số lượng đăng ký cao từ thứ hai trở đi
  @Get('popular-classes')
  findClassesFromSecondHighestRegistrations() {
    return this.classService.findClassesFromSecondHighestRegistrations();
  }

  // Phân trang
  @Get('pagination')
  @ApiQuery({ name: 'page', type: Number, required: true, description: 'Số trang để phân trang' })
  @ApiQuery({ name: 'pageSize', type: Number, required: true, description: 'Số mục mỗi trang' })
  pagination(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const sizePage = parseInt(pageSize, 10) || 10;
    return this.classService.pagination(pageNumber, sizePage);
  }

  // Lấy thông tin lớp học theo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  // Cập nhật lớp học
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.classService.update(+id, updateClassDto, userId);
  }

  // Xóa lớp học
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.classService.remove(+id, userId);
  }
}
