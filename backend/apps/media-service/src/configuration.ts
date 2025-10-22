import { registerAs } from '@nestjs/config';

export default registerAs('media-service', () => ({
  serviceName: 'media-service',
  port: parseInt(process.env.PORT ?? '3020', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'media-service.queue',
}));
