export type ServiceType = 'at-spa' | 'at-home';

export interface Spa {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  servicesOffered: string[];
  latitude: number;
  longitude: number;
  heroImage: string;
}

export interface SpaService {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  type: ServiceType;
  spaId: string;
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  nextAvailable: string;
  rating: number;
  isOnLeave?: boolean;
}

export interface Booking {
  id: string;
  spaName: string;
  serviceName: string;
  date: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  staffName: string;
  price: number;
  isAtHome: boolean;
}

export interface LoyaltyTier {
  name: string;
  threshold: number;
  benefits: string[];
}
