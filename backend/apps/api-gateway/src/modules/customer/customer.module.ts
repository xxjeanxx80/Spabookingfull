import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerAggregateService } from './services/customer-aggregate.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerAggregateService],
})
export class CustomerModule {}
