import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { CouponsService } from '../services/coupons.service';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { UpdateCouponDto } from '../dto/update-coupon.dto';
import { ApplyCouponDto } from '../dto/apply-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  list(@Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.couponsService.list(pagination));
  }

  @Post()
  create(@Body() payload: CreateCouponDto) {
    return createApiResponse(this.couponsService.create(payload));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCouponDto) {
    return createApiResponse(this.couponsService.update(id, payload));
  }

  @Post('apply')
  apply(@Body() payload: ApplyCouponDto) {
    return createApiResponse(this.couponsService.apply(payload));
  }
}
