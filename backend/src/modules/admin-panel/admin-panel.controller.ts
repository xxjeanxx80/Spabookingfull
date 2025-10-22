import { Body, Controller, Get, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { AdminPanelService } from './admin-panel.service';
import { AssignRoleDto, UpdateSystemSettingsDto } from './dto/update-settings.dto';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Get('summary')
  async summary() {
    const data = await this.adminPanelService.getSummary();
    return new ApiResponse(data);
  }

  @Patch('settings')
  async updateSetting(@Body() dto: UpdateSystemSettingsDto) {
    const data = await this.adminPanelService.updateSystemSetting(dto);
    return new ApiResponse(data, 'Settings updated');
  }

  @Post('assign-role')
  async assignRole(@Body() dto: AssignRoleDto) {
    const user = await this.adminPanelService.assignRole(dto);
    return new ApiResponse(user, 'Role assigned');
  }

  @Post('campaigns')
  async publishCampaign(@Body() body: { code: string; percent: number }) {
    const data = await this.adminPanelService.publishCampaign(body.code, body.percent);
    return new ApiResponse(data, 'Campaign published');
  }
}
