import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { toNotificationResponse } from '../response/notification-response.dto';

@Injectable()
export class NotificationsService {
  private notifications: NotificationEntity[] = [];

  send(payload: CreateNotificationDto) {
    const entity = new NotificationEntity({ id: `notification-${Date.now()}`, ...payload, status: 'sent' });
    this.notifications.push(entity);
    return toNotificationResponse(entity);
  }

  history(recipientId: string, pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const filtered = this.notifications.filter((item) => !recipientId || item.recipientIds.includes(recipientId));
    const items = filtered
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toNotificationResponse);
    return createPaginatedResponse(items, filtered.length, page, limit);
  }
}
