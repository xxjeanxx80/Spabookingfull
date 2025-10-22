import { Controller, Get } from '@nestjs/common';
import { createApiResponse } from '@app/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return createApiResponse({ service: 'booking-service', status: 'running' });
  }
}
