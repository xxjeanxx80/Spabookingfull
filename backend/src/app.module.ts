import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MediaModule } from './modules/media/media.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { OwnersModule } from './modules/owners/owners.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PayoutsModule } from './modules/payouts/payouts.module';
import { PostsModule } from './modules/posts/posts.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SpasModule } from './modules/spas/spas.module';
import { StaffModule } from './modules/staff/staff.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validationSchema }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    OwnersModule,
    SpasModule,
    StaffModule,
    BookingsModule,
    PaymentsModule,
    PayoutsModule,
    CouponsModule,
    PostsModule,
    ReportsModule,
    MediaModule,
    NotificationsModule,
    DashboardModule,
    AdminPanelModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
