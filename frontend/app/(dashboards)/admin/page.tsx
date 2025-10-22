import { AppShell } from '@/components/layout/AppShell';
import { AdminOverview } from '@/components/admin/AdminOverview';

export default function AdminDashboard() {
  return (
    <AppShell>
      <AdminOverview />
    </AppShell>
  );
}
