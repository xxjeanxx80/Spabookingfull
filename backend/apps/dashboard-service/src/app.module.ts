import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), HealthModule, DashboardModule],
  controllers: [AppController],
})
export class AppModule {}
