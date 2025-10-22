export interface DashboardMetric {
  label: string;
  value: number;
  change: number;
}

export interface DashboardResponse {
  totals: DashboardMetric[];
  charts: { label: string; data: number[]; categories: string[] }[];
}
