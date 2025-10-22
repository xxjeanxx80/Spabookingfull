import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OwnersService } from '../owners/owners.service';
import { CreateSpaDto } from './dto/create-spa.dto';
import { UpdateSpaDto } from './dto/update-spa.dto';
import { SpaServiceEntity } from './entities/spa-service.entity';
import { SpaEntity } from './entities/spa.entity';

@Injectable()
export class SpasService {
  constructor(
    @InjectRepository(SpaEntity)
    private readonly spaRepository: Repository<SpaEntity>,
    @InjectRepository(SpaServiceEntity)
    private readonly serviceRepository: Repository<SpaServiceEntity>,
    private readonly ownersService: OwnersService
  ) {}

  async create(dto: CreateSpaDto) {
    const owner = await this.ownersService.findById(dto.ownerId);
    const spa = this.spaRepository.create({
      owner,
      name: dto.name,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
      coverImageUrl: dto.coverImageUrl,
      approved: false,
      services: dto.services?.map((serviceDto) => this.serviceRepository.create(serviceDto)) ?? []
    });
    return this.spaRepository.save(spa);
  }

  findAll() {
    return this.spaRepository.find({ relations: ['services'] });
  }

  async findOne(id: string) {
    const spa = await this.spaRepository.findOne({ where: { id }, relations: ['services'] });
    if (!spa) {
      throw new NotFoundException('Spa not found');
    }
    return spa;
  }

  async update(id: string, dto: UpdateSpaDto) {
    const spa = await this.findOne(id);
    Object.assign(spa, dto);
    if (dto.services) {
      spa.services = dto.services.map((service) => this.serviceRepository.create(service));
    }
    return this.spaRepository.save(spa);
  }

  async approve(id: string, approved: boolean) {
    await this.spaRepository.update(id, { approved });
    return this.findOne(id);
  }
}
