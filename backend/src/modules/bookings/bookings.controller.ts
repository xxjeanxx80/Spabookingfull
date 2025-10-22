import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
import { BookingResponse } from './response/booking-response.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    const data = await this.bookingsService.create(dto);
    return new ApiResponse(BookingResponse.fromEntity(data), 'Booking created');
  }

  @Get()
  async findAll() {
    const data = await this.bookingsService.findAll();
    return new ApiResponse(data.map(BookingResponse.fromEntity));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateBookingStatusDto) {
    const data = await this.bookingsService.updateStatus(id, dto);
    return new ApiResponse(BookingResponse.fromEntity(data), 'Status updated');
  }
}
