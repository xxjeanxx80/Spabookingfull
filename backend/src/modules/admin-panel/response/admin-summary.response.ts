export interface AdminSummaryResponse {
  pendingSpas: number;
  pendingPayouts: number;
  openReports: number;
  lastAuditEntries: { id: string; action: string; actorId: string; createdAt: Date }[];
}
