import { registerAs } from '@nestjs/config';

export default registerAs('dashboard-service', () => ({
  serviceName: 'dashboard-service',
  port: parseInt(process.env.PORT ?? '3022', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'dashboard-service.queue',
}));
