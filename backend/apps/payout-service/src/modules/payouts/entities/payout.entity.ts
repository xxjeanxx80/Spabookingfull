import { randomUUID } from 'crypto';
import { PayoutStatus } from '../dto/update-payout-status.dto';

export class PayoutEntity {
  id: string = randomUUID();
  spaId!: string;
  amount!: number;
  status: PayoutStatus = PayoutStatus.REQUESTED;
  requestedAt: string = new Date().toISOString();
  processedAt?: string;

  constructor(partial: Partial<PayoutEntity>) {
    Object.assign(this, partial);
  }
}
