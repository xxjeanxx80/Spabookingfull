import { Module } from '@nestjs/common';
import { SpasController } from './controllers/spas.controller';
import { SpasService } from './services/spas.service';

@Module({
  controllers: [SpasController],
  providers: [SpasService],
  exports: [SpasService],
})
export class SpasModule {}
