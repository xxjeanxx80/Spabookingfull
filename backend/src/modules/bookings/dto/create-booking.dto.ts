import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;

export class CreateBookingDto {
  @IsString()
  customerId: string;

  @IsString()
  spaId: string;

  @IsString()
  serviceId: string;

  @IsOptional()
  @IsString()
  staffId?: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsString()
  couponCode?: string;
}

export class UpdateBookingStatusDto {
  @IsIn(BOOKING_STATUSES)
  status: (typeof BOOKING_STATUSES)[number];
}
