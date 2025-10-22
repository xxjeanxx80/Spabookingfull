import { randomUUID } from 'crypto';
import { CustomerRole } from '../dto/create-customer.dto';

export class CustomerEntity {
  id: string = randomUUID();
  email!: string;
  fullName!: string;
  loyaltyPoints = 0;
  rank = 'Bronze';
  roles: CustomerRole[] = [CustomerRole.CUSTOMER];

  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }
}
