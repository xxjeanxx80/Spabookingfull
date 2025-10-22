import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { CreateOwnerDto, UpdateOwnerStatusDto } from './dto/create-owner.dto';
import { OwnerEntity } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly repository: Repository<OwnerEntity>,
    private readonly usersService: UsersService
  ) {}

  async create(dto: CreateOwnerDto) {
    const user = await this.usersService.findById(dto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const entity = this.repository.create({
      user,
      businessName: dto.businessName,
      taxId: dto.taxId,
      status: 'pending'
    });

    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Owner not found');
    }
    return entity;
  }

  async updateStatus(id: string, dto: UpdateOwnerStatusDto) {
    const entity = await this.findById(id);
    entity.status = dto.status;
    return this.repository.save(entity);
  }
}
