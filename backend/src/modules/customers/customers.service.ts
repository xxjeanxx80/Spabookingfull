import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
    private readonly usersService: UsersService
  ) {}

  async create(dto: CreateCustomerDto) {
    const user = await this.usersService.findById(dto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const entity = this.repository.create({
      user,
      phoneNumber: dto.phoneNumber,
      defaultAddress: dto.defaultAddress
    });

    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Customer not found');
    }
    return entity;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const entity = await this.findOne(id);
    if (dto.phoneNumber !== undefined) {
      entity.phoneNumber = dto.phoneNumber;
    }
    if (dto.defaultAddress !== undefined) {
      entity.defaultAddress = dto.defaultAddress;
    }
    return this.repository.save(entity);
  }
}
