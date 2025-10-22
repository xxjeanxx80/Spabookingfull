import { Module } from '@nestjs/common';
import { AdminAggregateController } from './controllers/admin.controller';
import { AdminAggregateService } from './services/admin-aggregate.service';

@Module({
  controllers: [AdminAggregateController],
  providers: [AdminAggregateService],
})
export class AdminGatewayModule {}
