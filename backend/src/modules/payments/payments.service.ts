import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookingsService } from '../bookings/bookings.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/create-payment.dto';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
    private readonly bookingsService: BookingsService
  ) {}

  async create(dto: CreatePaymentDto) {
    const booking = await this.bookingsService.findById(dto.bookingId);
    const payment = this.repository.create({
      booking,
      amount: dto.amount,
      provider: dto.provider,
      referenceId: dto.referenceId,
      status: 'pending'
    });
    return this.repository.save(payment);
  }

  findAll() {
    return this.repository.find();
  }

  async updateStatus(id: string, dto: UpdatePaymentStatusDto) {
    const payment = await this.repository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = dto.status;
    return this.repository.save(payment);
  }
}
