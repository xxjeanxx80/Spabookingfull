import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>
  ) {}

  async queue(dto: CreateNotificationDto) {
    const entity = this.repository.create({ ...dto, sent: false });
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }
}
