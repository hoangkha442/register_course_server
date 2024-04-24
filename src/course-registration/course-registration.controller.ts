import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CreateCourseRegistrationDto } from './dto/create-course-registration.dto';
import { UpdateCourseRegistrationDto } from './dto/update-course-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/user/interfaces';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('QuanLyDangKyKhoaHoc')
@Controller('course-registration')
export class CourseRegistrationController {
  constructor(private readonly courseRegistrationService: CourseRegistrationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createCourseRegistrationDto: CreateCourseRegistrationDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;    
    return this.courseRegistrationService.create(createCourseRegistrationDto, userId);

  }

  @Get()
  findAll() {
    return this.courseRegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseRegistrationService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseRegistrationDto: UpdateCourseRegistrationDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;    
    return this.courseRegistrationService.update(+id, updateCourseRegistrationDto, userId);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.courseRegistrationService.remove(+id, userId);
  }
}
