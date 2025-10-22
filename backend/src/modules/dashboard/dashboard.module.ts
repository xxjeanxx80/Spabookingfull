import { Module } from '@nestjs/common';

import { BookingsModule } from '../bookings/bookings.module';
import { CouponsModule } from '../coupons/coupons.module';
import { CustomersModule } from '../customers/customers.module';
import { OwnersModule } from '../owners/owners.module';
import { PayoutsModule } from '../payouts/payouts.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [BookingsModule, CustomersModule, OwnersModule, PayoutsModule, CouponsModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
