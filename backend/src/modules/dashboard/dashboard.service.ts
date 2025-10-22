import { Injectable } from '@nestjs/common';

import { BookingsService } from '../bookings/bookings.service';
import { CouponsService } from '../coupons/coupons.service';
import { CustomersService } from '../customers/customers.service';
import { OwnersService } from '../owners/owners.service';
import { PayoutsService } from '../payouts/payouts.service';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { DashboardResponse } from './response/dashboard-response.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly customersService: CustomersService,
    private readonly ownersService: OwnersService,
    private readonly payoutsService: PayoutsService,
    private readonly couponsService: CouponsService
  ) {}

  async getSummary(_query: DashboardQueryDto): Promise<DashboardResponse> {
    const [bookings, customers, owners, payouts, coupons] = await Promise.all([
      this.bookingsService.findAll(),
      this.customersService.findAll(),
      this.ownersService.findAll(),
      this.payoutsService.findAll(),
      this.couponsService.findAll()
    ]);

    const totals = [
      { label: 'Bookings', value: bookings.length, change: 12 },
      { label: 'Customers', value: customers.length, change: 8 },
      { label: 'Active Spas', value: owners.filter((owner) => owner.status === 'approved').length, change: 4 },
      { label: 'Payout Requests', value: payouts.length, change: -2 },
      { label: 'Active Coupons', value: coupons.filter((coupon) => coupon.active).length, change: 3 }
    ];

    const charts = [
      {
        label: 'Bookings per Day',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12, 18, 9, 16, 22, 30, 25]
      },
      {
        label: 'Revenue vs. Payouts',
        categories: ['Jan', 'Feb', 'Mar', 'Apr'],
        data: [12000, 14500, 13200, 15800]
      }
    ];

    return { totals, charts };
  }
}
