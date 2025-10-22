import { NotificationEntity } from '../entities/notification.entity';

export interface NotificationResponseDto {
  id: string;
  recipientIds: string[];
  message: string;
  subject?: string;
  channels: string[];
  status: string;
  createdAt: string;
}

export const toNotificationResponse = (entity: NotificationEntity): NotificationResponseDto => ({
  id: entity.id,
  recipientIds: entity.recipientIds,
  message: entity.message,
  subject: entity.subject,
  channels: entity.channels,
  status: entity.status,
  createdAt: entity.createdAt,
});
