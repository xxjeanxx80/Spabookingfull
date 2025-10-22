import { Controller, Get } from '@nestjs/common';
import { createApiResponse } from '@app/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return createApiResponse({ service: 'payout-service', status: 'running' });
  }
}
