import { PaymentEntity } from '../entities/payment.entity';

export class PaymentResponse {
  id: string;
  bookingId: string;
  amount: number;
  provider: string;
  status: string;
  referenceId?: string;
  createdAt: Date;

  static fromEntity(entity: PaymentEntity): PaymentResponse {
    return {
      id: entity.id,
      bookingId: entity.booking.id,
      amount: Number(entity.amount),
      provider: entity.provider,
      status: entity.status,
      referenceId: entity.referenceId,
      createdAt: entity.createdAt
    };
  }
}
