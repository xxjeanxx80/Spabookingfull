import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { ReportsService } from '../services/reports.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportStatusDto } from '../dto/update-report-status.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  list(@Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.reportsService.list(pagination));
  }

  @Post()
  create(@Body() payload: CreateReportDto) {
    return createApiResponse(this.reportsService.create(payload));
  }

  @Post('status')
  updateStatus(@Body() payload: UpdateReportStatusDto) {
    return createApiResponse(this.reportsService.updateStatus(payload));
  }
}
