import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomersService } from '../customers/customers.service';
import { SpasService } from '../spas/spas.service';
import { StaffService } from '../staff/staff.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
import { BookingEntity } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
    private readonly customersService: CustomersService,
    private readonly spasService: SpasService,
    private readonly staffService: StaffService
  ) {}

  async create(dto: CreateBookingDto) {
    const customer = await this.customersService.findOne(dto.customerId);
    const spa = await this.spasService.findOne(dto.spaId);
    const service = spa.services.find((item) => item.id === dto.serviceId);
    if (!service) {
      throw new NotFoundException('Service not found for spa');
    }

    const booking = this.repository.create({
      customer,
      spa,
      service,
      staff: dto.staffId ? await this.staffService.findById(dto.staffId) : undefined,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      couponCode: dto.couponCode,
      status: 'pending'
    });

    return this.repository.save(booking);
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const booking = await this.repository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    const booking = await this.findById(id);
    booking.status = dto.status;
    return this.repository.save(booking);
  }
}
