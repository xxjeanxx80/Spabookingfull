import { IsEnum, IsString } from 'class-validator';

enum PayoutStatus {
  REQUESTED = 'requested',
  PROCESSING = 'processing',
  PAID = 'paid',
  REJECTED = 'rejected',
}

export class UpdatePayoutStatusDto {
  @IsString()
  payoutId!: string;

  @IsEnum(PayoutStatus)
  status!: PayoutStatus;
}

export { PayoutStatus };
