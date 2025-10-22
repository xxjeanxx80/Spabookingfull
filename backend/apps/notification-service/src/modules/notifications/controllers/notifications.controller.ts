import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  send(@Body() payload: CreateNotificationDto) {
    return createApiResponse(this.notificationsService.send(payload));
  }

  @Get()
  history(@Query('recipientId') recipientId: string, @Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.notificationsService.history(recipientId, pagination));
  }
}
