import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export class CreateNotificationDto {
  @IsArray()
  @IsString({ each: true })
  recipientIds!: string[];

  @IsString()
  message!: string;

  @IsEnum(NotificationChannel, { each: true })
  channels!: NotificationChannel[];

  @IsOptional()
  @IsString()
  subject?: string;
}

export { NotificationChannel };
