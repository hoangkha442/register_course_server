import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CreateCourseRegistrationDto } from './dto/create-course-registration.dto';
import { UpdateCourseRegistrationDto } from './dto/update-course-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/user/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { CreateMultipleCourseRegistrationsDto } from './dto/create-multiple-course-registrations.dto';
import { DeleteMultipleCourseRegistrationsDto } from './dto/delete-multiple-course-registrations.dto';

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

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('multiple')
  createMultiple(@Body() createMultipleCourseRegistrationsDto: CreateMultipleCourseRegistrationsDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.courseRegistrationService.createMultiple(createMultipleCourseRegistrationsDto, userId);
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
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.courseRegistrationService.findByUserId(+userId);
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
  @Delete('multiple')
  deleteMultiple(@Body() deleteMultipleCourseRegistrationsDto: DeleteMultipleCourseRegistrationsDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.courseRegistrationService.deleteMultiple(deleteMultipleCourseRegistrationsDto, userId);
  }
}
