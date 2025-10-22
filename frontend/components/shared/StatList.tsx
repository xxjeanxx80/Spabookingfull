import { ReactNode } from 'react';

type Stat = { label: string; value: ReactNode; accent?: 'primary' | 'secondary' };

type Props = { items: Stat[] };

export function StatList({ items }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className={`mt-2 text-2xl font-semibold ${item.accent === 'secondary' ? 'text-secondary' : 'text-primary'}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
