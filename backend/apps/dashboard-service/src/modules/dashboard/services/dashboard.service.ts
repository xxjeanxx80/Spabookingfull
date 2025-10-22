import { Injectable } from '@nestjs/common';
import { DashboardFiltersDto } from '../dto/dashboard-filters.dto';

@Injectable()
export class DashboardService {
  getSummary(filters: DashboardFiltersDto) {
    return {
      filters,
      totals: {
        bookings: 1250,
        revenue: 185000000,
        activeSpas: 42,
        newCustomers: 320,
      },
      loyalty: {
        pointsIssued: 52000,
        redemptions: 4800,
      },
    };
  }

  getTrends() {
    return {
      bookings: [
        { date: '2024-05-01', count: 32 },
        { date: '2024-05-02', count: 45 },
        { date: '2024-05-03', count: 50 },
      ],
      revenue: [
        { date: '2024-05-01', amount: 5200000 },
        { date: '2024-05-02', amount: 6900000 },
        { date: '2024-05-03', amount: 7100000 },
      ],
    };
  }
}
