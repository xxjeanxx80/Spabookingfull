import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportStatusDto } from '../dto/update-report-status.dto';
import { ReportEntity } from '../entities/report.entity';
import { toReportResponse } from '../response/report-response.dto';

@Injectable()
export class ReportsService {
  private reports: ReportEntity[] = [];

  list(pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const items = this.reports
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toReportResponse);
    return createPaginatedResponse(items, this.reports.length, page, limit);
  }

  create(payload: CreateReportDto) {
    const entity = new ReportEntity({ id: `report-${Date.now()}`, ...payload });
    this.reports.push(entity);
    return toReportResponse(entity);
  }

  updateStatus(payload: UpdateReportStatusDto) {
    const report = this.reports.find((item) => item.id === payload.reportId);
    if (!report) {
      throw new Error(`Report ${payload.reportId} not found`);
    }
    report.status = payload.status;
    return toReportResponse(report);
  }
}
