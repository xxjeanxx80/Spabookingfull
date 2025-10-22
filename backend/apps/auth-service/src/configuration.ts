import { registerAs } from '@nestjs/config';

export default registerAs('auth-service', () => ({
  serviceName: 'auth-service',
  port: parseInt(process.env.PORT ?? '3010', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'auth-service.queue',
}));
