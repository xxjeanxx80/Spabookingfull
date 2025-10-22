import { registerAs } from '@nestjs/config';

export default registerAs('user-service', () => ({
  serviceName: 'user-service',
  port: parseInt(process.env.PORT ?? '3011', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'user-service.queue',
}));
