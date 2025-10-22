import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { createApiResponse, PaginationQueryDto } from '@app/common';
import { PayoutsService } from '../services/payouts.service';
import { RequestPayoutDto } from '../dto/request-payout.dto';
import { UpdatePayoutStatusDto } from '../dto/update-payout-status.dto';

@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  request(@Body() payload: RequestPayoutDto) {
    return createApiResponse(this.payoutsService.request(payload));
  }

  @Post('status')
  updateStatus(@Body() payload: UpdatePayoutStatusDto) {
    return createApiResponse(this.payoutsService.updateStatus(payload));
  }

  @Get('spa/:spaId')
  history(@Param('spaId') spaId: string, @Query() pagination: PaginationQueryDto) {
    return createApiResponse(this.payoutsService.history(spaId, pagination));
  }
}
