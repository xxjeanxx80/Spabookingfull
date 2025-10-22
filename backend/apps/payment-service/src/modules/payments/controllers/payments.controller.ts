import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { PaymentsService } from '../services/payments.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { RefundPaymentDto } from '../dto/refund-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  process(@Body() payload: CreatePaymentDto) {
    return createApiResponse(this.paymentsService.process(payload));
  }

  @Post('refund')
  refund(@Body() payload: RefundPaymentDto) {
    return createApiResponse(this.paymentsService.refund(payload));
  }

  @Get('booking/:bookingId')
  history(@Param('bookingId') bookingId: string, @Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.paymentsService.history(bookingId, pagination));
  }
}
