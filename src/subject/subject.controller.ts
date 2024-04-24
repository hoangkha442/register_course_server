import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { RequestWithUser } from 'src/user/interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('QuanLyMonHoc')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.subjectService.create(createSubjectDto, userId);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Get('search/:name')
  searchByName(@Param('name') name: string) {
    return this.subjectService.searchByName(name);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.subjectService.update(+id, updateSubjectDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.subjectService.remove(+id, userId);
  }
}
