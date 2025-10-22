export const RmqQueues = {
  AUTH: 'auth_queue',
  USERS: 'users_queue',
  SPAS: 'spas_queue',
  STAFF: 'staff_queue',
  BOOKINGS: 'bookings_queue',
  PAYMENTS: 'payments_queue',
  PAYOUTS: 'payouts_queue',
  COUPONS: 'coupons_queue',
  POSTS: 'posts_queue',
  REPORTS: 'reports_queue',
  MEDIA: 'media_queue',
  NOTIFICATIONS: 'notifications_queue',
  DASHBOARD: 'dashboard_queue',
  ADMIN: 'admin_queue',
} as const;

export type QueueName = (typeof RmqQueues)[keyof typeof RmqQueues];

export const SERVICE_NAMES = {
  AUTH: 'AuthService',
  USERS: 'UserService',
  SPAS: 'SpaService',
  STAFF: 'StaffService',
  BOOKINGS: 'BookingService',
  PAYMENTS: 'PaymentService',
  PAYOUTS: 'PayoutService',
  COUPONS: 'CouponsService',
  POSTS: 'PostService',
  REPORTS: 'ReportService',
  MEDIA: 'MediaService',
  NOTIFICATIONS: 'NotificationService',
  DASHBOARD: 'DashboardService',
  ADMIN: 'AdminPanelService',
} as const;
