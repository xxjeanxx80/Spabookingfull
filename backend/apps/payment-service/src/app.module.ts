import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), HealthModule, PaymentsModule],
  controllers: [AppController],
})
export class AppModule {}
