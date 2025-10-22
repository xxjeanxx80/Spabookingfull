import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: string;
}

function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-primary/70 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
        {trend && <span className="text-xs font-semibold text-secondary">{trend}</span>}
      </div>
      <p className="mt-6 text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default StatCard;
