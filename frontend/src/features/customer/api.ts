import { spas as spaData, spaServices, staffMembers, customerBookings, loyaltyTiers } from '../../data/mockData';
import { Spa, SpaService, StaffMember, Booking, LoyaltyTier } from '../../types';

export const fetchSpas = async (): Promise<Spa[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return spaData;
};

export const fetchSpaServices = async (): Promise<SpaService[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return spaServices;
};

export const fetchStaff = async (): Promise<StaffMember[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return staffMembers;
};

export const fetchBookings = async (): Promise<Booking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return customerBookings;
};

export const fetchLoyaltyTiers = async (): Promise<LoyaltyTier[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return loyaltyTiers;
};
