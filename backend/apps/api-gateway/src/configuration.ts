import { registerAs } from '@nestjs/config';

export default registerAs('api-gateway', () => ({
  serviceName: 'api-gateway',
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'api-gateway.queue',
}));
