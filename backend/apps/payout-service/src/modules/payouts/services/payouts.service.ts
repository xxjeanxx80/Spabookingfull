import { Injectable } from '@nestjs/common';
import { createPaginatedResponse, PaginationQueryDto } from '@app/common';
import { RequestPayoutDto } from '../dto/request-payout.dto';
import { UpdatePayoutStatusDto, PayoutStatus } from '../dto/update-payout-status.dto';
import { PayoutEntity } from '../entities/payout.entity';
import { toPayoutResponse } from '../response/payout-response.dto';

@Injectable()
export class PayoutsService {
  private payouts: PayoutEntity[] = [];

  request(payload: RequestPayoutDto) {
    const entity = new PayoutEntity({
      id: `payout-${Date.now()}`,
      spaId: payload.spaId,
      amount: payload.amount,
      status: PayoutStatus.REQUESTED,
    });
    this.payouts.push(entity);
    return toPayoutResponse(entity);
  }

  updateStatus(payload: UpdatePayoutStatusDto) {
    const payout = this.payouts.find((item) => item.id === payload.payoutId);
    if (!payout) {
      throw new Error(`Payout ${payload.payoutId} not found`);
    }
    payout.status = payload.status;
    payout.processedAt = payload.status === PayoutStatus.PAID ? new Date().toISOString() : payout.processedAt;
    return toPayoutResponse(payout);
  }

  history(spaId: string, pagination: PaginationQueryDto) {
    const { page = 1, limit = 20 } = pagination;
    const filtered = this.payouts.filter((item) => item.spaId === spaId);
    const items = filtered
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toPayoutResponse);
    return createPaginatedResponse(items, filtered.length, page, limit);
  }
}
