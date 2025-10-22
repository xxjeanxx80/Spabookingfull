import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter, LoggingInterceptor, CorrelationIdMiddleware } from '@app/common';

const SERVICE_NAME = 'post-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const correlation = new CorrelationIdMiddleware();
  app.use(correlation.use.bind(correlation));
  const config = app.get(ConfigService);
  const port =
    config.get<number>(`${SERVICE_NAME}.port`) ??
    config.get<number>('port') ??
    parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
}

bootstrap();
