import { CustomerEntity } from '../entities/customer.entity';

export interface CustomerResponseDto {
  id: string;
  email: string;
  fullName: string;
  loyaltyPoints: number;
  rank: string;
  roles: string[];
}

export const toCustomerResponse = (entity: CustomerEntity): CustomerResponseDto => ({
  id: entity.id,
  email: entity.email,
  fullName: entity.fullName,
  loyaltyPoints: entity.loyaltyPoints,
  rank: entity.rank,
  roles: entity.roles,
});
