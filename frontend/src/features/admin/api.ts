import {
  adminMetrics,
  pendingSpas,
  flaggedReports,
  campaigns,
  discountCodes,
  revenueByMonth,
} from '../../data/mockData';

export const fetchAdminMetrics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return adminMetrics;
};

export const fetchPendingSpas = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return pendingSpas;
};

export const fetchFlaggedReports = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return flaggedReports;
};

export const fetchCampaigns = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return campaigns;
};

export const fetchDiscountCodes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return discountCodes;
};

export const fetchAdminRevenueSeries = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return revenueByMonth;
};
