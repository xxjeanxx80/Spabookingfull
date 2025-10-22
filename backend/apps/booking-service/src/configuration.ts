import { registerAs } from '@nestjs/config';

export default registerAs('booking-service', () => ({
  serviceName: 'booking-service',
  port: parseInt(process.env.PORT ?? '3014', 10),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://user:pass@localhost:5432/beauty',
  queueName: process.env.QUEUE_NAME ?? 'booking-service.queue',
}));
