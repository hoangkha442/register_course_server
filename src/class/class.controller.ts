import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/user/interfaces';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('QuanLyLopHoc')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createClassDto: CreateClassDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.classService.create(createClassDto, userId);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get('most-registrations')
  findClassWithMostRegistrations() {
    return this.classService.findClassWithMostRegistrations();
  }

  @Get('popular-classes')
  findSecondHighestRegisteredClasses() {
    return this.classService.findSecondHighestRegisteredClasses();
  }

  
  @Get('pagination')
  @ApiQuery({ name: 'page', type: Number, required: true, description: 'Page number for pagination' })
  @ApiQuery({ name: 'pageSize', type: Number, required: true, description: 'Number of items per page' })
  pagination(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const sizePage = parseInt(pageSize, 10) || 10;
    return this.classService.pagination(pageNumber, sizePage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.classService.update(+id, updateClassDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.classService.remove(+id, userId);
  }

  
}
