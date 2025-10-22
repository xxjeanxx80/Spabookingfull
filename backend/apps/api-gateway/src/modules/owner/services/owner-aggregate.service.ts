import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnerAggregateService {
  getDashboard(ownerId: string) {
    return {
      ownerId,
      spaSummary: {
        totalSpas: 3,
        pendingApproval: 1,
        atHomeReady: 2,
      },
      revenue: {
        monthly: 52000000,
        upcomingPayout: 8500000,
      },
      nextPayoutRequestLink: `/payouts/${ownerId}`,
      staffAlerts: [
        { staffId: 'staff-5', name: 'Minh', status: 'time-off pending approval' },
      ],
    };
  }

  getBookings(spaId: string) {
    return {
      spaId,
      source: 'booking-service',
      incoming: [
        {
          bookingId: 'booking-10',
          customer: 'Bao Tran',
          scheduledAt: '2024-05-04T09:00:00Z',
          service: 'Hot stone massage',
        },
      ],
    };
  }

  getPayouts(ownerId: string) {
    return {
      ownerId,
      source: 'payout-service',
      history: [
        {
          payoutId: 'payout-1',
          amount: 7500000,
          status: 'paid',
          processedAt: '2024-04-30T08:00:00Z',
        },
      ],
    };
  }
}
