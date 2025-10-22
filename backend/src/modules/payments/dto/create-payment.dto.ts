import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export const PAYMENT_PROVIDERS = ['stripe', 'wallet'] as const;
export const PAYMENT_STATUSES = ['pending', 'succeeded', 'failed'] as const;

export class CreatePaymentDto {
  @IsString()
  bookingId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount: number;

  @IsIn(PAYMENT_PROVIDERS)
  provider: (typeof PAYMENT_PROVIDERS)[number];

  @IsOptional()
  @IsString()
  referenceId?: string;
}

export class UpdatePaymentStatusDto {
  @IsIn(PAYMENT_STATUSES)
  status: (typeof PAYMENT_STATUSES)[number];
}
