import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';
import { CustomerModule } from './modules/customer/customer.module';
import { OwnerModule } from './modules/owner/owner.module';
import { AdminGatewayModule } from './modules/admin/admin.module';
import { AuthGatewayModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    HealthModule,
    CustomerModule,
    OwnerModule,
    AdminGatewayModule,
    AuthGatewayModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
