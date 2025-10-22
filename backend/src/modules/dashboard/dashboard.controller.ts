import { Controller, Get, Query } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  async summary(@Query() query: DashboardQueryDto) {
    const data = await this.dashboardService.getSummary(query);
    return new ApiResponse(data);
  }
}
