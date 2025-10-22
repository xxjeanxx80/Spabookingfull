import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreateReportDto, UpdateReportStatusDto } from './dto/create-report.dto';
import { ReportResponse } from './response/report-response.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() dto: CreateReportDto) {
    const data = await this.reportsService.create(dto);
    return new ApiResponse(ReportResponse.fromEntity(data), 'Report submitted');
  }

  @Get()
  async findAll() {
    const data = await this.reportsService.findAll();
    return new ApiResponse(data.map(ReportResponse.fromEntity));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateReportStatusDto) {
    const data = await this.reportsService.updateStatus(id, dto);
    return new ApiResponse(ReportResponse.fromEntity(data), 'Report status updated');
  }
}
