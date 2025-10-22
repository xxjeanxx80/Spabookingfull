import { CustomerEntity } from '../entities/customer.entity';

export class CustomerResponse {
  id: string;
  userId: string;
  email: string;
  phoneNumber?: string;
  defaultAddress?: string;
  loyaltyPoints: number;
  loyaltyRank: string;

  static fromEntity(entity: CustomerEntity): CustomerResponse {
    return {
      id: entity.id,
      userId: entity.user.id,
      email: entity.user.email,
      phoneNumber: entity.phoneNumber,
      defaultAddress: entity.defaultAddress,
      loyaltyPoints: entity.user.loyaltyPoints,
      loyaltyRank: entity.user.loyaltyRank
    };
  }
}
