import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, HttpStatus, Put, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/interfaces';

@ApiTags('DanhGia')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() dto: CreateReviewDto, @Req() req: RequestWithUser) {
    return this.reviewService.createReview(dto, req);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  async updateReview(@Param('id') id: number, @Body() dto: UpdateReviewDto, @Req() req: RequestWithUser) {
    return this.reviewService.updateReview(id, dto, req);
  }

  @Get('product/:productId')
  async getReviewsByProductId(@Param('productId') productId: number) {
    return this.reviewService.getReviewsByProductId(productId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteReview(@Param('id') id: number, @Req() req: RequestWithUser) {
    return this.reviewService.deleteReview(id, req);
  }
}
