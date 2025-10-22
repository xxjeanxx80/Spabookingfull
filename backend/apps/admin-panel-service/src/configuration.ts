import { registerAs } from '@nestjs/config';

export default registerAs('admin-panel-service', () => ({
  serviceName: 'admin-panel-service',
  port: parseInt(process.env.PORT ?? '3023', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'admin-panel-service.queue',
}));
