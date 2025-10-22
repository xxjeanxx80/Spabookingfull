import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SpasService } from '../spas/spas.service';
import { CreateStaffDto, UpdateStaffDto } from './dto/create-staff.dto';
import { StaffEntity } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly repository: Repository<StaffEntity>,
    private readonly spasService: SpasService
  ) {}

  async create(dto: CreateStaffDto) {
    const spa = await this.spasService.findOne(dto.spaId);
    const entity = this.repository.create({
      spa,
      name: dto.name,
      skills: dto.skills,
      workShifts: dto.workShifts,
      timeOff: dto.timeOff
    });
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Staff not found');
    }
    return entity;
  }

  async update(id: string, dto: UpdateStaffDto) {
    const entity = await this.findById(id);

    Object.assign(entity, dto);
    if (dto.spaId) {
      entity.spa = await this.spasService.findOne(dto.spaId);
    }
    return this.repository.save(entity);
  }
}
