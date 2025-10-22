import { registerAs } from '@nestjs/config';

export default registerAs('report-service', () => ({
  serviceName: 'report-service',
  port: parseInt(process.env.PORT ?? '3019', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'report-service.queue',
}));
