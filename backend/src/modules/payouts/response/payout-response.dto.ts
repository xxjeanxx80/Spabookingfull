import { PayoutEntity } from '../entities/payout.entity';

export class PayoutResponse {
  id: string;
  ownerId: string;
  amount: number;
  status: string;
  notes?: string;
  createdAt: Date;

  static fromEntity(entity: PayoutEntity): PayoutResponse {
    return {
      id: entity.id,
      ownerId: entity.owner.id,
      amount: Number(entity.amount),
      status: entity.status,
      notes: entity.notes,
      createdAt: entity.createdAt
    };
  }
}
