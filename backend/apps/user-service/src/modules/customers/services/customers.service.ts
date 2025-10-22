import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreateCustomerDto, CustomerRole } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { toCustomerResponse } from '../response/customer-response.dto';

@Injectable()
export class CustomersService {
  private customers: CustomerEntity[] = [
    new CustomerEntity({
      id: 'cust-1',
      email: 'alice@example.com',
      fullName: 'Alice Nguyen',
      loyaltyPoints: 420,
      rank: 'Gold',
      roles: [CustomerRole.CUSTOMER],
    }),
    new CustomerEntity({
      id: 'cust-2',
      email: 'bao@example.com',
      fullName: 'Bao Tran',
      loyaltyPoints: 120,
      rank: 'Silver',
      roles: [CustomerRole.CUSTOMER, CustomerRole.OWNER],
    }),
  ];

  findAll(pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const start = (page - 1) * limit;
    const items = this.customers.slice(start, start + limit).map(toCustomerResponse);
    return createPaginatedResponse(items, this.customers.length, page, limit);
  }

  findOne(id: string) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return toCustomerResponse(customer);
  }

  create(payload: CreateCustomerDto) {
    const entity = new CustomerEntity({
      id: `cust-${Date.now()}`,
      email: payload.email,
      fullName: payload.fullName,
      roles: payload.roles ?? [CustomerRole.CUSTOMER],
    });
    this.customers.push(entity);
    return toCustomerResponse(entity);
  }

  update(id: string, payload: UpdateCustomerDto) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    Object.assign(customer, payload);
    return toCustomerResponse(customer);
  }

  remove(id: string) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    const [removed] = this.customers.splice(index, 1);
    return toCustomerResponse(removed);
  }

  adjustLoyalty(id: string, delta: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    customer.loyaltyPoints = Math.max(0, customer.loyaltyPoints + delta);
    customer.rank = this.resolveRank(customer.loyaltyPoints);
    return toCustomerResponse(customer);
  }

  private resolveRank(points: number) {
    if (points >= 500) return 'Platinum';
    if (points >= 250) return 'Gold';
    if (points >= 100) return 'Silver';
    return 'Bronze';
  }
}
