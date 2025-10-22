import { Controller, Get } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { AuthGatewayService } from '../services/auth-gateway.service';

@Controller('gateway-auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Get('providers')
  getProviders() {
    return createApiResponse(this.authGatewayService.getOAuthProviders());
  }
}
