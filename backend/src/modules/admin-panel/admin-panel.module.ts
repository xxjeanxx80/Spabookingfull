import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CouponsModule } from '../coupons/coupons.module';
import { OwnersModule } from '../owners/owners.module';
import { PayoutsModule } from '../payouts/payouts.module';
import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { AdminPanelController } from './admin-panel.controller';
import { AdminPanelService } from './admin-panel.service';
import { AuditLogEntity } from './entities/audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLogEntity]),
    OwnersModule,
    PayoutsModule,
    ReportsModule,
    UsersModule,
    CouponsModule
  ],
  controllers: [AdminPanelController],
  providers: [AdminPanelService]
})
export class AdminPanelModule {}
