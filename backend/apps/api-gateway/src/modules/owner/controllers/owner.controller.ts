import { Controller, Get, Param } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { OwnerAggregateService } from '../services/owner-aggregate.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerAggregateService: OwnerAggregateService) {}

  @Get(':id/dashboard')
  getDashboard(@Param('id') id: string) {
    return createApiResponse(this.ownerAggregateService.getDashboard(id));
  }

  @Get('spas/:spaId/bookings')
  getBookings(@Param('spaId') spaId: string) {
    return createApiResponse(this.ownerAggregateService.getBookings(spaId));
  }

  @Get(':id/payouts')
  getPayouts(@Param('id') id: string) {
    return createApiResponse(this.ownerAggregateService.getPayouts(id));
  }
}
