import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminAggregateService {
  getDashboard() {
    return {
      metrics: {
        bookings: 1250,
        revenue: 185000000,
        customerGrowth: 0.18,
        activeSpas: 42,
      },
      pendingApprovals: {
        spas: 3,
        reports: 7,
      },
      campaignPerformance: [
        { code: 'WELCOME10', redemptions: 420 },
        { code: 'SUMMERBLISS', redemptions: 120 },
      ],
      links: {
        spaApprovals: '/spas?approved=false',
        reports: '/reports',
        campaigns: '/coupons',
      },
    };
  }

  getSystemLogs() {
    return {
      items: [
        { id: 'log-1', message: 'Spa spa-2 submitted documents', level: 'info' },
        { id: 'log-2', message: 'Payment-service heartbeat OK', level: 'debug' },
      ],
    };
  }
}
