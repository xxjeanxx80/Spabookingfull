import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { RateBookingDto } from '../dto/rate-booking.dto';
import { BookingEntity } from '../entities/booking.entity';
import { toBookingResponse } from '../response/booking-response.dto';

@Injectable()
export class BookingsService {
  private bookings: BookingEntity[] = [
    new BookingEntity({
      id: 'booking-1',
      customerId: 'cust-1',
      spaId: 'spa-1',
      serviceId: 'service-1',
      staffId: 'staff-1',
      scheduledAt: new Date().toISOString(),
      atHome: false,
      status: 'confirmed',
    }),
  ];

  list(customerId: string, pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const filtered = this.bookings.filter((booking) => booking.customerId === customerId);
    const items = filtered
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toBookingResponse);
    return createPaginatedResponse(items, filtered.length, page, limit);
  }

  create(payload: CreateBookingDto) {
    const entity = new BookingEntity({ id: `booking-${Date.now()}`, status: 'pending', ...payload });
    this.bookings.push(entity);
    return toBookingResponse(entity);
  }

  update(id: string, payload: UpdateBookingDto) {
    const booking = this.findBooking(id);
    Object.assign(booking, payload);
    booking.status = payload.status ?? booking.status;
    return toBookingResponse(booking);
  }

  reschedule(id: string, scheduledAt: string, staffId?: string) {
    const booking = this.findBooking(id);
    booking.scheduledAt = scheduledAt;
    if (staffId) {
      booking.staffId = staffId;
    }
    booking.status = 'confirmed';
    return toBookingResponse(booking);
  }

  cancel(id: string) {
    const booking = this.findBooking(id);
    booking.status = 'cancelled';
    return toBookingResponse(booking);
  }

  rate(payload: RateBookingDto) {
    const booking = this.findBooking(payload.bookingId);
    booking.rating = payload.rating;
    booking.comment = payload.comment;
    booking.status = 'completed';
    return toBookingResponse(booking);
  }

  private findBooking(id: string) {
    const booking = this.bookings.find((item) => item.id === id);
    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`);
    }
    return booking;
  }
}
