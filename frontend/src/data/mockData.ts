import { Booking, LoyaltyTier, Spa, SpaService, StaffMember } from '../types';

export const spas: Spa[] = [
  {
    id: 'spa-aurora',
    name: 'Aurora Bliss Spa',
    address: '45 Luminous Ave, District 1',
    distanceKm: 1.2,
    rating: 4.8,
    servicesOffered: ['Facial Therapy', 'Thai Massage', 'At-home massage'],
    latitude: 10.7758,
    longitude: 106.7004,
    heroImage:
      'https://images.unsplash.com/photo-1556227834-3f48f0f0d962?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'spa-oasis',
    name: 'Urban Oasis Retreat',
    address: '212 Serenity Street, District 3',
    distanceKm: 2.5,
    rating: 4.6,
    servicesOffered: ['Swedish Massage', 'Detox Facial', 'At-home manicure'],
    latitude: 10.7797,
    longitude: 106.6992,
    heroImage:
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'spa-moon',
    name: 'Moonstone Wellness',
    address: '18 Moonlight Road, Thu Duc',
    distanceKm: 4.1,
    rating: 4.9,
    servicesOffered: ['Himalayan Salt Therapy', 'Couple Massage', 'At-home facial'],
    latitude: 10.8006,
    longitude: 106.7382,
    heroImage:
      'https://images.unsplash.com/photo-1618219535092-8bcf0cc0f6e5?auto=format&fit=crop&w=900&q=80',
  },
];

export const spaServices: SpaService[] = [
  {
    id: 'svc-1',
    spaId: 'spa-aurora',
    name: 'Thai Massage',
    durationMinutes: 90,
    price: 49,
    type: 'at-spa',
    description: 'Traditional Thai techniques to relieve tension and improve flexibility.',
  },
  {
    id: 'svc-2',
    spaId: 'spa-aurora',
    name: 'At-home Aromatherapy',
    durationMinutes: 75,
    price: 59,
    type: 'at-home',
    description: 'Luxurious essential oils brought to your doorstep with portable spa equipment.',
  },
  {
    id: 'svc-3',
    spaId: 'spa-oasis',
    name: 'Glow Facial',
    durationMinutes: 60,
    price: 39,
    type: 'at-spa',
    description: 'Personalized facials with LED therapy and nourishing serums.',
  },
  {
    id: 'svc-4',
    spaId: 'spa-moon',
    name: 'Couple Retreat (At-home)',
    durationMinutes: 120,
    price: 119,
    type: 'at-home',
    description: 'A two-therapist synchronized massage with ambient music provided.',
  },
];

export const staffMembers: StaffMember[] = [
  {
    id: 'stf-linh',
    name: 'Linh Nguyen',
    avatar: 'https://i.pravatar.cc/150?img=12',
    skills: ['Thai Massage', 'Deep Tissue'],
    nextAvailable: 'Today · 3:00 PM',
    rating: 4.9,
  },
  {
    id: 'stf-minh',
    name: 'Minh Tran',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['Glow Facial', 'Skincare Consultation'],
    nextAvailable: 'Today · 5:30 PM',
    rating: 4.7,
  },
  {
    id: 'stf-lam',
    name: 'Lam Pham',
    avatar: 'https://i.pravatar.cc/150?img=33',
    skills: ['Couple Retreat (At-home)', 'Swedish Massage'],
    nextAvailable: 'Tomorrow · 10:00 AM',
    rating: 4.8,
    isOnLeave: true,
  },
];

export const customerBookings: Booking[] = [
  {
    id: 'bk-1001',
    spaName: 'Aurora Bliss Spa',
    serviceName: 'Thai Massage',
    date: '2023-10-23T15:00:00Z',
    status: 'Upcoming',
    staffName: 'Linh Nguyen',
    price: 49,
    isAtHome: false,
  },
  {
    id: 'bk-1002',
    spaName: 'Urban Oasis Retreat',
    serviceName: 'Glow Facial',
    date: '2023-09-04T10:00:00Z',
    status: 'Completed',
    staffName: 'Minh Tran',
    price: 39,
    isAtHome: false,
  },
  {
    id: 'bk-1003',
    spaName: 'Moonstone Wellness',
    serviceName: 'Couple Retreat (At-home)',
    date: '2023-08-16T09:00:00Z',
    status: 'Cancelled',
    staffName: 'Lam Pham',
    price: 119,
    isAtHome: true,
  },
];

export const loyaltyTiers: LoyaltyTier[] = [
  {
    name: 'Blush',
    threshold: 0,
    benefits: ['Birthday facial upgrade', 'Invite-only events'],
  },
  {
    name: 'Glow',
    threshold: 500,
    benefits: ['Priority scheduling', '2x loyalty points on weekdays'],
  },
  {
    name: 'Radiant',
    threshold: 1000,
    benefits: ['Dedicated concierge', 'Complimentary at-home session each quarter'],
  },
];

export const revenueByMonth = [
  { month: 'Jan', revenue: 6800, payouts: 4200 },
  { month: 'Feb', revenue: 7200, payouts: 4600 },
  { month: 'Mar', revenue: 8400, payouts: 5200 },
  { month: 'Apr', revenue: 9100, payouts: 5800 },
  { month: 'May', revenue: 9600, payouts: 6400 },
  { month: 'Jun', revenue: 10300, payouts: 6800 },
];

export const adminMetrics = {
  bookingsToday: 128,
  activeSpas: 54,
  newCustomers: 23,
  revenueToday: 18250,
};

export const pendingSpas = [
  {
    id: 'pending-1',
    name: 'Zen Garden Therapy',
    owner: 'Elena Do',
    submittedAt: '2023-10-20T08:00:00Z',
  },
  {
    id: 'pending-2',
    name: 'Blue Lagoon Retreat',
    owner: 'Quynh Dang',
    submittedAt: '2023-10-21T10:30:00Z',
  },
];

export const flaggedReports = [
  {
    id: 'rpt-1',
    type: 'Service Quality',
    detail: 'Customer reported late arrival for at-home session.',
    priority: 'High',
  },
  {
    id: 'rpt-2',
    type: 'Content',
    detail: 'Inaccurate pricing listed for Detox Facial package.',
    priority: 'Medium',
  },
];

export const campaigns = [
  {
    id: 'cmp-1',
    name: 'Lunar New Year Glow',
    discount: '15% OFF',
    duration: 'Feb 1 - Feb 15',
    status: 'Scheduled',
  },
  {
    id: 'cmp-2',
    name: 'Weekend Spa-cation',
    discount: 'Buy 1 Get 1',
    duration: 'Every Fri - Sun',
    status: 'Active',
  },
];

export const discountCodes = [
  {
    code: 'RELAX10',
    description: '10% off all massages',
    remaining: 120,
    expiresAt: '2023-12-31',
  },
  {
    code: 'GLOW20',
    description: '20% off facials for new customers',
    remaining: 85,
    expiresAt: '2024-01-31',
  },
];

export const ownerBookings = [
  {
    id: 'obk-1',
    customer: 'Chloe Tran',
    service: 'Thai Massage',
    staff: 'Linh Nguyen',
    scheduledFor: '2023-10-23T15:00:00Z',
    status: 'Pending',
    channel: 'At-spa',
  },
  {
    id: 'obk-2',
    customer: 'Daniel Pham',
    service: 'At-home Aromatherapy',
    staff: 'Lam Pham',
    scheduledFor: '2023-10-22T19:00:00Z',
    status: 'Confirmed',
    channel: 'At-home',
  },
  {
    id: 'obk-3',
    customer: 'Linh Do',
    service: 'Glow Facial',
    staff: 'Minh Tran',
    scheduledFor: '2023-10-21T11:00:00Z',
    status: 'Completed',
    channel: 'At-spa',
  },
];

export const payoutHistory = [
  { id: 'pay-1', amount: 860, status: 'Paid', requestedAt: '2023-09-28', paidAt: '2023-09-30' },
  { id: 'pay-2', amount: 1240, status: 'Paid', requestedAt: '2023-08-28', paidAt: '2023-08-30' },
  { id: 'pay-3', amount: 930, status: 'Processing', requestedAt: '2023-10-10', paidAt: null },
];

export const staffShifts = [
  {
    id: 'shift-1',
    staff: 'Linh Nguyen',
    day: 'Monday',
    shift: '09:00 - 17:00',
  },
  {
    id: 'shift-2',
    staff: 'Minh Tran',
    day: 'Tuesday',
    shift: '11:00 - 19:00',
  },
  {
    id: 'shift-3',
    staff: 'Lam Pham',
    day: 'Wednesday',
    shift: '10:00 - 18:00',
  },
];

export const ownerMetrics = {
  revenueThisMonth: 18650,
  atHomeShare: 0.34,
  avgRating: 4.82,
  payoutDue: 2150,
};
