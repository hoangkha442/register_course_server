import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/interfaces';

@ApiTags('DiemDanh')
@ApiBearerAuth()
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;    
    
    return this.attendanceService.create(createAttendanceDto, userId);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;    
    
    return this.attendanceService.update(+id, updateAttendanceDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;    
    
    return this.attendanceService.remove(+id,userId);
  }
}
