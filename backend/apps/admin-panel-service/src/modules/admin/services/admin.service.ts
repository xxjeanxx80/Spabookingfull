import { Injectable } from '@nestjs/common';
import { AssignRoleDto, UserRole } from '../dto/assign-role.dto';
import { UpdateSettingsDto } from '../dto/update-settings.dto';

interface AuditLog {
  id: string;
  action: string;
  actorId: string;
  createdAt: string;
}

@Injectable()
export class AdminService {
  private settings = {
    maintenanceMode: false,
    defaultCommissionRate: 0.15,
  };

  private roles = new Map<string, UserRole[]>([
    ['cust-1', [UserRole.CUSTOMER]],
    ['owner-1', [UserRole.CUSTOMER, UserRole.OWNER]],
  ]);

  private auditLogs: AuditLog[] = [];

  getSettings() {
    return this.settings;
  }

  updateSettings(payload: UpdateSettingsDto) {
    this.settings = { ...this.settings, ...payload };
    this.auditLogs.push({
      id: `log-${Date.now()}`,
      action: `Update settings: ${JSON.stringify(payload)}`,
      actorId: 'admin-system',
      createdAt: new Date().toISOString(),
    });
    return this.settings;
  }

  assignRole(payload: AssignRoleDto) {
    const existing = this.roles.get(payload.userId) ?? [];
    if (!existing.includes(payload.role)) {
      existing.push(payload.role);
      this.roles.set(payload.userId, existing);
    }
    this.auditLogs.push({
      id: `log-${Date.now()}`,
      action: `Assign ${payload.role} to ${payload.userId}`,
      actorId: 'admin-system',
      createdAt: new Date().toISOString(),
    });
    return { userId: payload.userId, roles: existing };
  }

  getAuditLogs() {
    return this.auditLogs.slice(-50);
  }
}
