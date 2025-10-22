import { PayoutEntity } from '../entities/payout.entity';

export interface PayoutResponseDto {
  id: string;
  spaId: string;
  amount: number;
  status: string;
  requestedAt: string;
  processedAt?: string;
}

export const toPayoutResponse = (entity: PayoutEntity): PayoutResponseDto => ({
  id: entity.id,
  spaId: entity.spaId,
  amount: entity.amount,
  status: entity.status,
  requestedAt: entity.requestedAt,
  processedAt: entity.processedAt,
});
