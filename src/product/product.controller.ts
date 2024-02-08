import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@ApiTags('QuanLySanPham')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/get-product/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get('pagination')
  @ApiQuery({ name: 'page', type: Number, required: true, description: 'Page number for pagination' })
  @ApiQuery({ name: 'pageSize', type: Number, required: true, description: 'Number of items per page' })
  getPagination(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const sizePage = parseInt(pageSize, 10) || 10;
    return this.productService.getPagination(pageNumber, sizePage);
  }

  @Get('/search/:prdName')
  productName(@Param('prdName') prdName: string) {
    return this.productService.productName(prdName);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  @UseInterceptors(FileInterceptor('product_picture', {
    storage: diskStorage({
      destination: process.cwd() + '/public/img/prds',
      filename: (req, file, callback) => { 
        callback(null, new Date().getTime() + '_' + file.originalname);
      }
    })
  }))
  create(
    @Body() createProductDto: CreateProductDto, 
    @UploadedFile() file: Express.Multer.File, 
    @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.productService.create(createProductDto,file, userId);
  }

  

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.productService.update(+id, updateProductDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put('/picture/:id')
  @UseInterceptors(FileInterceptor('product_picture', {
    storage: diskStorage({
      destination: process.cwd() + '/public/img/prds',
      filename: (req, file, callback) => { 
        callback(null, new Date().getTime() + '_' + file.originalname);
      }
    })
  }))
  updatePictue(@Param('id') id: string,
  @UploadedFile() file: Express.Multer.File, 
   @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.productService.updatePictue(+id, file, userId);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put('hidden-product/:id')
  hidden(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.productService.hidden(+id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.data.userID;
    return this.productService.remove(+id, userId);
  }
}

