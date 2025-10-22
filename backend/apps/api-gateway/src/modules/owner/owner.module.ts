import { Module } from '@nestjs/common';
import { OwnerController } from './controllers/owner.controller';
import { OwnerAggregateService } from './services/owner-aggregate.service';

@Module({
  controllers: [OwnerController],
  providers: [OwnerAggregateService],
})
export class OwnerModule {}
