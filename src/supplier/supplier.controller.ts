import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/user/interfaces';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("NhaCungCap")
@Controller('supplier')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto,@Req() req: RequestWithUser) {
    return this.supplierService.create(createSupplierDto, req);
  }

  // LẤY DANH SÁCH NHÀ CUNG CẤP

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.supplierService.findAll(req);
  }


  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.supplierService.findOne(+id, req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto, @Req() req: RequestWithUser) {
    return this.supplierService.update(+id, updateSupplierDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string,  @Req() req: RequestWithUser) {
    return this.supplierService.remove(+id, req);
  }
}
