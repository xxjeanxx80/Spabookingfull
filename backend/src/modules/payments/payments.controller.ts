import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/create-payment.dto';
import { PaymentResponse } from './response/payment-response.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    const data = await this.paymentsService.create(dto);
    return new ApiResponse(PaymentResponse.fromEntity(data), 'Payment initiated');
  }

  @Get()
  async findAll() {
    const data = await this.paymentsService.findAll();
    return new ApiResponse(data.map(PaymentResponse.fromEntity));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdatePaymentStatusDto) {
    const data = await this.paymentsService.updateStatus(id, dto);
    return new ApiResponse(PaymentResponse.fromEntity(data), 'Payment status updated');
  }
}
