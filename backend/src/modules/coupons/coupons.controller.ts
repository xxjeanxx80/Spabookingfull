import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CouponsService } from './coupons.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/create-coupon.dto';
import { CouponResponse } from './response/coupon-response.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  async create(@Body() dto: CreateCouponDto) {
    const data = await this.couponsService.create(dto);
    return new ApiResponse(CouponResponse.fromEntity(data), 'Coupon created');
  }

  @Get()
  async findAll() {
    const data = await this.couponsService.findAll();
    return new ApiResponse(data.map(CouponResponse.fromEntity));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCouponDto) {
    const data = await this.couponsService.update(id, dto);
    return new ApiResponse(CouponResponse.fromEntity(data), 'Coupon updated');
  }
}
