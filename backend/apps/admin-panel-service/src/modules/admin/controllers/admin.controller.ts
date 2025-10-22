import { Body, Controller, Get, Post } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { AdminService } from '../services/admin.service';
import { UpdateSettingsDto } from '../dto/update-settings.dto';
import { AssignRoleDto } from '../dto/assign-role.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('settings')
  getSettings() {
    return createApiResponse(this.adminService.getSettings());
  }

  @Post('settings')
  updateSettings(@Body() payload: UpdateSettingsDto) {
    return createApiResponse(this.adminService.updateSettings(payload));
  }

  @Post('roles')
  assignRole(@Body() payload: AssignRoleDto) {
    return createApiResponse(this.adminService.assignRole(payload));
  }

  @Get('audit-logs')
  getAuditLogs() {
    return createApiResponse(this.adminService.getAuditLogs());
  }
}
