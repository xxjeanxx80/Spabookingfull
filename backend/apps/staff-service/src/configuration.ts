import { registerAs } from '@nestjs/config';

export default registerAs('staff-service', () => ({
  serviceName: 'staff-service',
  port: parseInt(process.env.PORT ?? '3013', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'staff-service.queue',
}));
