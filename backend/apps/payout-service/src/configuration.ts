import { registerAs } from '@nestjs/config';

export default registerAs('payout-service', () => ({
  serviceName: 'payout-service',
  port: parseInt(process.env.PORT ?? '3016', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'payout-service.queue',
}));
