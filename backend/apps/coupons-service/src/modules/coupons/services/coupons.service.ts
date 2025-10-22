import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { UpdateCouponDto } from '../dto/update-coupon.dto';
import { ApplyCouponDto } from '../dto/apply-coupon.dto';
import { CouponEntity } from '../entities/coupon.entity';
import { toCouponResponse } from '../response/coupon-response.dto';

@Injectable()
export class CouponsService {
  private coupons: CouponEntity[] = [
    new CouponEntity({
      id: 'coupon-1',
      code: 'WELCOME10',
      discountPercentage: 10,
      active: true,
    }),
  ];

  list(pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const items = this.coupons
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toCouponResponse);
    return createPaginatedResponse(items, this.coupons.length, page, limit);
  }

  create(payload: CreateCouponDto) {
    const entity = new CouponEntity({ id: `coupon-${Date.now()}`, ...payload });
    this.coupons.push(entity);
    return toCouponResponse(entity);
  }

  update(id: string, payload: UpdateCouponDto) {
    const coupon = this.coupons.find((item) => item.id === id);
    if (!coupon) {
      throw new Error(`Coupon ${id} not found`);
    }
    Object.assign(coupon, payload);
    return toCouponResponse(coupon);
  }

  apply({ code, totalAmount }: ApplyCouponDto) {
    const coupon = this.coupons.find((item) => item.code === code && item.active);
    if (!coupon) {
      throw new Error(`Coupon ${code} is not active`);
    }
    const discount = (coupon.discountPercentage / 100) * totalAmount;
    return {
      code: coupon.code,
      discount,
      totalAfterDiscount: Math.max(totalAmount - discount, 0),
    };
  }
}
