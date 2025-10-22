import { registerAs } from '@nestjs/config';

export default registerAs('payment-service', () => ({
  serviceName: 'payment-service',
  port: parseInt(process.env.PORT ?? '3015', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'payment-service.queue',
}));
