import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export const PAYOUT_STATUSES = ['pending', 'processing', 'paid', 'rejected'] as const;

export class CreatePayoutDto {
  @IsString()
  ownerId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdatePayoutStatusDto {
  @IsIn(PAYOUT_STATUSES)
  status: (typeof PAYOUT_STATUSES)[number];
}
