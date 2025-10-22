import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReportDto, UpdateReportStatusDto } from './dto/create-report.dto';
import { ReportEntity } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly repository: Repository<ReportEntity>
  ) {}

  create(dto: CreateReportDto) {
    const entity = this.repository.create({
      reporterId: dto.reporterId,
      subjectId: dto.subjectId,
      subjectType: dto.subjectType,
      description: dto.description,
      status: 'open'
    });
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async updateStatus(id: string, dto: UpdateReportStatusDto) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Report not found');
    }

    entity.status = dto.status;
    return this.repository.save(entity);
  }
}
