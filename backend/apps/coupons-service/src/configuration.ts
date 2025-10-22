import { registerAs } from '@nestjs/config';

export default registerAs('coupons-service', () => ({
  serviceName: 'coupons-service',
  port: parseInt(process.env.PORT ?? '3017', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'coupons-service.queue',
}));
