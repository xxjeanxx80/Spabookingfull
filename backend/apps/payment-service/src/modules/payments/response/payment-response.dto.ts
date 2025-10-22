import { PaymentEntity } from '../entities/payment.entity';

export interface PaymentResponseDto {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  refundedAmount: number;
}

export const toPaymentResponse = (entity: PaymentEntity): PaymentResponseDto => ({
  id: entity.id,
  bookingId: entity.bookingId,
  amount: entity.amount,
  method: entity.method,
  status: entity.status,
  createdAt: entity.createdAt,
  refundedAmount: entity.refundedAmount,
});
