import { Controller, Get } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { AdminAggregateService } from '../services/admin-aggregate.service';

@Controller('admin')
export class AdminAggregateController {
  constructor(private readonly adminAggregateService: AdminAggregateService) {}

  @Get('dashboard')
  getDashboard() {
    return createApiResponse(this.adminAggregateService.getDashboard());
  }

  @Get('logs')
  getLogs() {
    return createApiResponse(this.adminAggregateService.getSystemLogs());
  }
}
