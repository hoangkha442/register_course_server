import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/interfaces';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags('hangTonKho')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createInventory(@Body() dto: CreateInventoryDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.inventoryService.createInventory(dto, userId);
  }

  @Get(':id')
  async getInventoryById(@Param('id') id: number, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.inventoryService.getInventoryById(id, userId);
  }

  @Put(':id')
  async updateInventory(@Param('id') id: number, @Body() dto: UpdateInventoryDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.inventoryService.updateInventory(id, dto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteInventory(@Param('id') id: number, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.inventoryService.deleteInventory(id, userId);
  }

}
