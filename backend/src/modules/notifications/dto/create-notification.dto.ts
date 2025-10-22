import { IsIn, IsString } from 'class-validator';

export const NOTIFICATION_CHANNELS = ['email', 'sms', 'push'] as const;

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsIn(NOTIFICATION_CHANNELS)
  channel: (typeof NOTIFICATION_CHANNELS)[number];

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
