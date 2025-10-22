import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('http.port', 3000);

  const rmqUrl = configService.get<string>('rabbitmq.url');
  if (rmqUrl) {
    const queue = configService.get<string>('rabbitmq.queue', 'beauty_booking_events');
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true
        }
      }
    });
    await app.startAllMicroservices();
  }

  await app.listen(port);
  Logger.log(`HTTP service running on port ${port}`, 'Bootstrap');
}

bootstrap().catch((error) => {
  Logger.error(error, 'Bootstrap');
});
