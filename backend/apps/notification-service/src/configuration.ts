import { registerAs } from '@nestjs/config';

export default registerAs('notification-service', () => ({
  serviceName: 'notification-service',
  port: parseInt(process.env.PORT ?? '3021', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'notification-service.queue',
}));
