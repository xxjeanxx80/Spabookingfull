import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CouponsService } from '../coupons/coupons.service';
import { OwnersService } from '../owners/owners.service';
import { PayoutsService } from '../payouts/payouts.service';
import { ReportsService } from '../reports/reports.service';
import { UserResponse } from '../users/response/user.response';
import { UsersService } from '../users/users.service';
import { AssignRoleDto, UpdateSystemSettingsDto } from './dto/update-settings.dto';
import { AuditLogEntity } from './entities/audit-log.entity';
import { AdminSummaryResponse } from './response/admin-summary.response';

@Injectable()
export class AdminPanelService {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly payoutsService: PayoutsService,
    private readonly reportsService: ReportsService,
    private readonly usersService: UsersService,
    private readonly couponsService: CouponsService,
    @InjectRepository(AuditLogEntity)
    private readonly auditRepository: Repository<AuditLogEntity>
  ) {}

  async getSummary(): Promise<AdminSummaryResponse> {
    const [owners, payouts, reports, audits] = await Promise.all([
      this.ownersService.findAll(),
      this.payoutsService.findAll(),
      this.reportsService.findAll(),
      this.auditRepository.find({ take: 10, order: { createdAt: 'DESC' } })
    ]);

    return {
      pendingSpas: owners.filter((owner) => owner.status === 'pending').length,
      pendingPayouts: payouts.filter((payout) => payout.status !== 'paid').length,
      openReports: reports.filter((report) => report.status !== 'resolved').length,
      lastAuditEntries: audits.map((audit) => ({
        id: audit.id,
        action: audit.action,
        actorId: audit.actorId,
        createdAt: audit.createdAt
      }))
    };
  }

  async updateSystemSetting(dto: UpdateSystemSettingsDto) {
    await this.auditRepository.save(
      this.auditRepository.create({
        action: `update_setting:${dto.key}`,
        actorId: 'system',
        metadata: dto.value
      })
    );
    return { key: dto.key, value: dto.value };
  }

  async assignRole(dto: AssignRoleDto) {
    const user = await this.usersService.update(dto.userId, { roles: [dto.role] });
    await this.auditRepository.save(
      this.auditRepository.create({
        action: `assign_role:${dto.role}`,
        actorId: 'system',
        metadata: { userId: dto.userId }
      })
    );
    return user ? UserResponse.fromEntity(user) : null;
  }

  async publishCampaign(code: string, percent: number) {
    await this.couponsService.create({ code, discountPercent: percent });
    await this.auditRepository.save(
      this.auditRepository.create({
        action: 'publish_campaign',
        actorId: 'system',
        metadata: { code, percent }
      })
    );
    return { code, percent };
  }
}
