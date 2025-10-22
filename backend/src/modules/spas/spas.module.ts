import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OwnersModule } from '../owners/owners.module';
import { SpaServiceEntity } from './entities/spa-service.entity';
import { SpaEntity } from './entities/spa.entity';
import { SpasController } from './spas.controller';
import { SpasService } from './spas.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpaEntity, SpaServiceEntity]), OwnersModule],
  controllers: [SpasController],
  providers: [SpasService],
  exports: [SpasService]
})
export class SpasModule {}
