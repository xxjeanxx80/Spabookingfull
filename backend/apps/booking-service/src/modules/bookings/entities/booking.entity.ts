import { randomUUID } from 'crypto';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export class BookingEntity {
  id: string = randomUUID();
  customerId!: string;
  spaId!: string;
  serviceId!: string;
  staffId!: string;
  scheduledAt!: string;
  atHome!: boolean;
  couponCode?: string;
  status: BookingStatus = 'pending';
  rating?: number;
  comment?: string;

  constructor(partial: Partial<BookingEntity>) {
    Object.assign(this, partial);
  }
}
