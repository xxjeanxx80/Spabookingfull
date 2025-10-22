import { Controller, Get, Param, Query } from '@nestjs/common';
import { createApiResponse } from '@app/common';
import { CustomerAggregateService } from '../services/customer-aggregate.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerAggregateService: CustomerAggregateService) {}

  @Get(':id/dashboard')
  getDashboard(@Param('id') id: string) {
    return createApiResponse(this.customerAggregateService.getDashboard(id));
  }

  @Get(':id/bookings')
  getBookings(@Param('id') id: string) {
    return createApiResponse(this.customerAggregateService.getBookingHistory(id));
  }

  @Get('spas/nearby')
  searchSpas(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius?: string,
    @Query('atHome') atHome?: string,
  ) {
    return createApiResponse(
      this.customerAggregateService.searchSpas({
        lat: Number(lat),
        lng: Number(lng),
        radius: Number(radius ?? 5),
        atHome: atHome === 'true' ? true : atHome === 'false' ? false : undefined,
      }),
    );
  }
}
