import { BookingEntity } from '../entities/booking.entity';

export interface BookingResponseDto {
  id: string;
  customerId: string;
  spaId: string;
  serviceId: string;
  staffId: string;
  scheduledAt: string;
  atHome: boolean;
  status: string;
  couponCode?: string;
  rating?: number;
  comment?: string;
}

export const toBookingResponse = (entity: BookingEntity): BookingResponseDto => ({
  id: entity.id,
  customerId: entity.customerId,
  spaId: entity.spaId,
  serviceId: entity.serviceId,
  staffId: entity.staffId,
  scheduledAt: entity.scheduledAt,
  atHome: entity.atHome,
  status: entity.status,
  couponCode: entity.couponCode,
  rating: entity.rating,
  comment: entity.comment,
});
