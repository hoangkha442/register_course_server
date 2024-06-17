// cart.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteMultipleCartDto } from './dto/delete-multiple-cart.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:user_id')
  @ApiOperation({ summary: 'Get cart items by user ID' })
  findByUserId(@Param('user_id') user_id: string) {
    return this.cartService.findByUserId(+user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item' })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  

  @UseGuards(AuthGuard('jwt'))
  @Delete('multiple')
  @ApiOperation({ summary: 'Remove multiple cart items' })
  removeMultiple(@Body() deleteMultipleCartDto: DeleteMultipleCartDto) {
    return this.cartService.removeMultiple(deleteMultipleCartDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a cart item' })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
