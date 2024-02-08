import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/interfaces';


@ApiTags('DanhMucSanPham')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // TẠO DANH MỤC SẢN PHẨM
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: RequestWithUser) {
    return this.categoryService.create(createCategoryDto, req);
  }


  // LẤY TẤT CẢ DANH MỤC SẢN PHẨM
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  // CẬP NHẬT DANH MỤC SẢN PHẨM
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req: RequestWithUser) {
    return this.categoryService.update(+id, updateCategoryDto, req);
  }


  // XÓA DANH MỤC SẢN PHẨM
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.categoryService.remove(+id, req);
  }
}
