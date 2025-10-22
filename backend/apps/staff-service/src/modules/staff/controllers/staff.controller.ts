import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { StaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateStaffDto } from '../dto/update-staff.dto';
import { SetTimeOffDto } from '../dto/set-time-off.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.staffService.findAll(pagination));
  }

  @Get('spa/:spaId')
  findBySpa(@Param('spaId') spaId: string) {
    return createApiResponse(this.staffService.findBySpa(spaId));
  }

  @Get('spa/:spaId/availability')
  findAvailability(@Param('spaId') spaId: string, @Query('shift') shift: string) {
    return createApiResponse(this.staffService.findAvailable(spaId, shift));
  }

  @Post()
  create(@Body() payload: CreateStaffDto) {
    return createApiResponse(this.staffService.create(payload));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateStaffDto) {
    return createApiResponse(this.staffService.update(id, payload));
  }

  @Post('time-off')
  setTimeOff(@Body() payload: SetTimeOffDto) {
    return createApiResponse(this.staffService.setTimeOff(payload));
  }
}
