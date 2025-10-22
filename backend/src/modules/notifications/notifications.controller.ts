import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponse } from './response/notification-response.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async queue(@Body() dto: CreateNotificationDto) {
    const data = await this.notificationsService.queue(dto);
    return new ApiResponse(NotificationResponse.fromEntity(data), 'Notification queued');
  }

  @Get()
  async findAll() {
    const data = await this.notificationsService.findAll();
    return new ApiResponse(data.map(NotificationResponse.fromEntity));
  }
}
