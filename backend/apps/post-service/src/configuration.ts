import { registerAs } from '@nestjs/config';

export default registerAs('post-service', () => ({
  serviceName: 'post-service',
  port: parseInt(process.env.PORT ?? '3018', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'post-service.queue',
}));
