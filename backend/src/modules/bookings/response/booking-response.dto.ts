import { BookingEntity } from '../entities/booking.entity';

export class BookingResponse {
  id: string;
  customerId: string;
  spaId: string;
  serviceId: string;
  staffId?: string;
  startTime: Date;
  endTime: Date;
  status: string;
  couponCode?: string;

  static fromEntity(entity: BookingEntity): BookingResponse {
    return {
      id: entity.id,
      customerId: entity.customer.id,
      spaId: entity.spa.id,
      serviceId: entity.service.id,
      staffId: entity.staff?.id,
      startTime: entity.startTime,
      endTime: entity.endTime,
      status: entity.status,
      couponCode: entity.couponCode
    };
  }
}
