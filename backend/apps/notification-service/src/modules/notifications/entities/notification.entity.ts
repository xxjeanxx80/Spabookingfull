import { randomUUID } from 'crypto';
import { NotificationChannel } from '../dto/create-notification.dto';

export class NotificationEntity {
  id: string = randomUUID();
  recipientIds!: string[];
  message!: string;
  subject?: string;
  channels!: NotificationChannel[];
  status: 'queued' | 'sent' = 'queued';
  createdAt: string = new Date().toISOString();

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
