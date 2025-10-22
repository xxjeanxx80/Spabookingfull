import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerAggregateService {
  getDashboard(customerId: string) {
    return {
      customerId,
      loyalty: {
        points: 420,
        rank: 'Gold',
        nextReward: 80,
      },
      upcomingBookings: [
        {
          id: 'booking-1',
          spaName: 'Saigon Glow',
          service: 'Aromatherapy Massage',
          scheduledAt: '2024-05-10T14:00:00Z',
          staff: {
            id: 'staff-1',
            name: 'Hoa Pham',
          },
        },
      ],
      quickLinks: {
        searchSpas: '/spas/nearby',
        bookingHistory: `/customers/${customerId}/bookings`,
        loyalty: `/customers/${customerId}`,
      },
    };
  }

  getBookingHistory(customerId: string) {
    return {
      customerId,
      source: 'booking-service',
      items: [
        {
          id: 'booking-1',
          spaName: 'Saigon Glow',
          status: 'completed',
          rating: 5,
          comment: 'Wonderful experience!',
        },
        {
          id: 'booking-2',
          spaName: 'Hanoi Calm',
          status: 'cancelled',
          rating: null,
          comment: null,
        },
      ],
    };
  }

  searchSpas(params: { lat: number; lng: number; radius: number; atHome?: boolean }) {
    return {
      params,
      source: 'spa-service',
      results: [
        {
          id: 'spa-1',
          name: 'Saigon Glow',
          distanceKm: 1.2,
          atHomeAvailable: true,
          highlightServices: ['Facial', 'Massage'],
        },
        {
          id: 'spa-2',
          name: 'Hanoi Calm',
          distanceKm: 3.4,
          atHomeAvailable: false,
          highlightServices: ['Body Scrub'],
        },
      ],
    };
  }
}
