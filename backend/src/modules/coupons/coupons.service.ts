import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCouponDto, UpdateCouponDto } from './dto/create-coupon.dto';
import { CouponEntity } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(CouponEntity)
    private readonly repository: Repository<CouponEntity>
  ) {}

  async create(dto: CreateCouponDto) {
    const entity = this.repository.create({
      ...dto,
      startsAt: dto.startsAt ? new Date(dto.startsAt) : undefined,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined
    });
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async update(id: string, dto: UpdateCouponDto) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Coupon not found');
    }

    Object.assign(entity, {
      ...dto,
      startsAt: dto.startsAt ? new Date(dto.startsAt) : entity.startsAt,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : entity.expiresAt
    });
    return this.repository.save(entity);
  }
}
