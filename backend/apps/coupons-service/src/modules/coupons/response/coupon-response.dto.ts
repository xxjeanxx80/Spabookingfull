import { CouponEntity } from '../entities/coupon.entity';

export interface CouponResponseDto {
  id: string;
  code: string;
  discountPercentage: number;
  expiresAt?: string;
  active: boolean;
}

export const toCouponResponse = (entity: CouponEntity): CouponResponseDto => ({
  id: entity.id,
  code: entity.code,
  discountPercentage: entity.discountPercentage,
  expiresAt: entity.expiresAt,
  active: entity.active,
});
