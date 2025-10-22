import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OwnersModule } from '../owners/owners.module';
import { PayoutEntity } from './entities/payout.entity';
import { PayoutsController } from './payouts.controller';
import { PayoutsService } from './payouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayoutEntity]), OwnersModule],
  controllers: [PayoutsController],
  providers: [PayoutsService],
  exports: [PayoutsService]
})
export class PayoutsModule {}
