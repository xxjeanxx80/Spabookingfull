import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ApiResponse } from '../../common/dto/api-response.dto';
import { CreatePayoutDto, UpdatePayoutStatusDto } from './dto/create-payout.dto';
import { PayoutResponse } from './response/payout-response.dto';
import { PayoutsService } from './payouts.service';

@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  async request(@Body() dto: CreatePayoutDto) {
    const data = await this.payoutsService.request(dto);
    return new ApiResponse(PayoutResponse.fromEntity(data), 'Payout requested');
  }

  @Get()
  async findAll() {
    const data = await this.payoutsService.findAll();
    return new ApiResponse(data.map(PayoutResponse.fromEntity));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdatePayoutStatusDto) {
    const data = await this.payoutsService.updateStatus(id, dto);
    return new ApiResponse(PayoutResponse.fromEntity(data), 'Payout status updated');
  }
}
