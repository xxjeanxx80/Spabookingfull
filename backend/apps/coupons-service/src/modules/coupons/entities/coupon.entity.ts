import { randomUUID } from 'crypto';

export class CouponEntity {
  id: string = randomUUID();
  code!: string;
  discountPercentage!: number;
  expiresAt?: string;
  active = true;

  constructor(partial: Partial<CouponEntity>) {
    Object.assign(this, partial);
  }
}
