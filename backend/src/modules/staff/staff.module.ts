import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpasModule } from '../spas/spas.module';
import { StaffEntity } from './entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity]), SpasModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService]
})
export class StaffModule {}
