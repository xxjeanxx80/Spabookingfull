import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMediaDto } from './dto/create-media.dto';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly repository: Repository<MediaEntity>
  ) {}

  create(dto: CreateMediaDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  findByOwner(ownerId: string) {
    return this.repository.find({ where: { ownerId } });
  }
}
