import { randomUUID } from 'crypto';
import { PaymentMethod } from '../dto/create-payment.dto';

export type PaymentStatus = 'pending' | 'succeeded' | 'refunded';

export class PaymentEntity {
  id: string = randomUUID();
  bookingId!: string;
  amount!: number;
  method!: PaymentMethod;
  status: PaymentStatus = 'pending';
  createdAt: string = new Date().toISOString();
  refundedAmount = 0;

  constructor(partial: Partial<PaymentEntity>) {
    Object.assign(this, partial);
  }
}
