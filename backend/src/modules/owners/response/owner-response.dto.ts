import { OwnerEntity } from '../entities/owner.entity';

export class OwnerResponse {
  id: string;
  userId: string;
  email: string;
  businessName: string;
  status: 'pending' | 'approved' | 'rejected';
  taxId?: string;

  static fromEntity(entity: OwnerEntity): OwnerResponse {
    return {
      id: entity.id,
      userId: entity.user.id,
      email: entity.user.email,
      businessName: entity.businessName,
      status: entity.status,
      taxId: entity.taxId
    };
  }
}
