import {
  spaServices,
  staffMembers,
  ownerBookings,
  payoutHistory,
  revenueByMonth,
  ownerMetrics,
  staffShifts,
} from '../../data/mockData';

export const fetchOwnerServices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return spaServices;
};

export const fetchOwnerStaff = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return staffMembers;
};

export const fetchIncomingBookings = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return ownerBookings;
};

export const fetchPayoutHistory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return payoutHistory;
};

export const fetchRevenueByMonth = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return revenueByMonth;
};

export const fetchOwnerMetrics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return ownerMetrics;
};

export const fetchStaffShifts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return staffShifts;
};
