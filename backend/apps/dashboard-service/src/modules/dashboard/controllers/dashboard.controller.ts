import { Controller, Get, Query } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardFiltersDto } from '../dto/dashboard-filters.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(@Query() filters: DashboardFiltersDto) {
    return createApiResponse(this.dashboardService.getSummary(filters));
  }

  @Get('trends')
  getTrends() {
    return createApiResponse(this.dashboardService.getTrends());
  }
}
