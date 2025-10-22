import { Module } from '@nestjs/common';
import { AuthGatewayController } from './controllers/auth.controller';
import { AuthGatewayService } from './services/auth-gateway.service';

@Module({
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
