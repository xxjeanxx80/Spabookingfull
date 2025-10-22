import { NotificationEntity } from '../entities/notification.entity';

export class NotificationResponse {
  id: string;
  userId: string;
  channel: string;
  subject: string;
  message: string;
  sent: boolean;
  createdAt: Date;

  static fromEntity(entity: NotificationEntity): NotificationResponse {
    return {
      id: entity.id,
      userId: entity.userId,
      channel: entity.channel,
      subject: entity.subject,
      message: entity.message,
      sent: entity.sent,
      createdAt: entity.createdAt
    };
  }
}
