import { Controller, Get } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { HealthService } from '../services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth() {
    return createApiResponse(this.healthService.getStatus());
  }
}
