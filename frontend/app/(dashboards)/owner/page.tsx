import { AppShell } from '@/components/layout/AppShell';
import { OwnerOverview } from '@/components/owner/OwnerOverview';

export default function OwnerDashboard() {
  return (
    <AppShell>
      <OwnerOverview />
    </AppShell>
  );
}
