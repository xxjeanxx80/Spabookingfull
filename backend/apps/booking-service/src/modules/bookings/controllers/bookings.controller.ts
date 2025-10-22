import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { BookingsService } from '../services/bookings.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { RateBookingDto } from '../dto/rate-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('customer/:customerId')
  list(@Param('customerId') customerId: string, @Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.bookingsService.list(customerId, pagination));
  }

  @Post()
  create(@Body() payload: CreateBookingDto) {
    return createApiResponse(this.bookingsService.create(payload));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBookingDto) {
    return createApiResponse(this.bookingsService.update(id, payload));
  }

  @Post(':id/reschedule')
  reschedule(@Param('id') id: string, @Body('scheduledAt') scheduledAt: string, @Body('staffId') staffId?: string) {
    return createApiResponse(this.bookingsService.reschedule(id, scheduledAt, staffId));
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return createApiResponse(this.bookingsService.cancel(id));
  }

  @Post('rate')
  rate(@Body() payload: RateBookingDto) {
    return createApiResponse(this.bookingsService.rate(payload));
  }
}
