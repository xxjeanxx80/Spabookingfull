import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { RefundPaymentDto } from '../dto/refund-payment.dto';
import { PaymentEntity } from '../entities/payment.entity';
import { toPaymentResponse } from '../response/payment-response.dto';

@Injectable()
export class PaymentsService {
  private payments: PaymentEntity[] = [];

  process(payload: CreatePaymentDto) {
    const entity = new PaymentEntity({
      id: `payment-${Date.now()}`,
      bookingId: payload.bookingId,
      amount: payload.amount,
      method: payload.method,
      status: 'succeeded',
    });
    this.payments.push(entity);
    return toPaymentResponse(entity);
  }

  refund(payload: RefundPaymentDto) {
    const payment = this.payments.find((item) => item.id === payload.paymentId);
    if (!payment) {
      throw new Error(`Payment ${payload.paymentId} not found`);
    }
    payment.refundedAmount += payload.amount;
    payment.status = payment.refundedAmount >= payment.amount ? 'refunded' : payment.status;
    return toPaymentResponse(payment);
  }

  history(bookingId: string, pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const filtered = this.payments.filter((item) => item.bookingId === bookingId);
    const items = filtered
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toPaymentResponse);
    return createPaginatedResponse(items, filtered.length, page, limit);
  }
}
