import { CouponEntity } from '../entities/coupon.entity';

export class CouponResponse {
  id: string;
  code: string;
  discountPercent: number;
  startsAt?: Date;
  expiresAt?: Date;
  active: boolean;

  static fromEntity(entity: CouponEntity): CouponResponse {
    return {
      id: entity.id,
      code: entity.code,
      discountPercent: Number(entity.discountPercent),
      startsAt: entity.startsAt,
      expiresAt: entity.expiresAt,
      active: entity.active
    };
  }
}
