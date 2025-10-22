import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  customerId!: string;

  @IsString()
  spaId!: string;

  @IsString()
  serviceId!: string;

  @IsString()
  staffId!: string;

  @IsDateString()
  scheduledAt!: string;

  @IsBoolean()
  atHome!: boolean;

  @IsOptional()
  @IsString()
  couponCode?: string;
}
