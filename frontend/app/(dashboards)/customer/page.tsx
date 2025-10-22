import { AppShell } from '@/components/layout/AppShell';
import { CustomerOverview } from '@/components/customer/CustomerOverview';

export default function CustomerDashboard() {
  return (
    <AppShell>
      <CustomerOverview />
    </AppShell>
  );
}
