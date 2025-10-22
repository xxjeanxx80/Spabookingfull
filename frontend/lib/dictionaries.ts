export type SupportedLocale = 'en' | 'vi';

type Dictionary = Record<string, string>;

const base: Record<SupportedLocale, Dictionary> = {
  en: {
    brand: 'Beauty Booking Hub',
    tagline: 'Seamlessly connect customers and spas.',
    switchTo: 'Switch to Vietnamese',
    switchBack: 'Switch to English',
    dashboards: 'Dashboards',
    customer: 'Customer',
    owner: 'Spa Owner',
    admin: 'Admin',
    login: 'Login',
    discover: 'Discover nearby spas',
    manage: 'Manage spa operations',
    oversee: 'Oversee platform health'
  },
  vi: {
    brand: 'Trung tâm Đặt lịch Spa',
    tagline: 'Kết nối khách hàng và spa một cách liền mạch.',
    switchTo: 'Chuyển sang tiếng Việt',
    switchBack: 'Chuyển sang tiếng Anh',
    dashboards: 'Bảng điều khiển',
    customer: 'Khách hàng',
    owner: 'Chủ spa',
    admin: 'Quản trị viên',
    login: 'Đăng nhập',
    discover: 'Tìm spa gần bạn',
    manage: 'Quản lý hoạt động spa',
    oversee: 'Giám sát hệ thống'
  }
};

export function getDictionary(locale: SupportedLocale): Dictionary {
  return base[locale];
}
