import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OwnersService } from '../owners/owners.service';
import { CreatePayoutDto, UpdatePayoutStatusDto } from './dto/create-payout.dto';
import { PayoutEntity } from './entities/payout.entity';

@Injectable()
export class PayoutsService {
  constructor(
    @InjectRepository(PayoutEntity)
    private readonly repository: Repository<PayoutEntity>,
    private readonly ownersService: OwnersService
  ) {}

  async request(dto: CreatePayoutDto) {
    const owner = await this.ownersService.findById(dto.ownerId);
    const entity = this.repository.create({
      owner,
      amount: dto.amount,
      notes: dto.notes,
      status: 'pending'
    });
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async updateStatus(id: string, dto: UpdatePayoutStatusDto) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Payout not found');
    }
    entity.status = dto.status;
    return this.repository.save(entity);
  }
}
